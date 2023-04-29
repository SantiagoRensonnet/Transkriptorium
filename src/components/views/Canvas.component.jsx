import { useContext } from "react";
import { Stage, Layer, Image } from "react-konva";
import { TranscriptsContext } from "../../contexts/Transcripts.context";
import useImage from "use-image";

//Components
import { TranscriptBox } from "../containers/TranscriptBox.component";

const ArtImage = () => {
  const { imageData } = useContext(TranscriptsContext);
  const [image] = useImage("/" + imageData.name);
  return (
    <Image width={imageData.width} height={imageData.height} image={image} />
  );
};

export const Canvas = ({ selectedTranscriptId, setSelectedTranscriptId }) => {
  const { transcripts, setTranscripts, imageData, resizeFactor } =
    useContext(TranscriptsContext);

  //Event Handlers
  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty =
      e.target === e.target.getStage() || e.target.attrs.image;
    if (clickedOnEmpty) {
      setSelectedTranscriptId(null);
    }
  };
  const handleChange = (newAttrs) => {
    setTranscripts((prevState) =>
      prevState.map((transcript) =>
        newAttrs.id === transcript.id ? newAttrs : transcript
      )
    );
  };
  return resizeFactor > 0 && transcripts ? (
    <Stage
      width={imageData.width}
      height={imageData.height}
      className="canvas"
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
    >
      <Layer>
        <ArtImage />
        {transcripts?.map((transcript) => {
          return (
            <TranscriptBox
              key={transcript.id}
              transcriptId={transcript.id}
              shapeProps={transcript}
              isSelected={transcript.id === selectedTranscriptId}
              onSelect={() => {
                setSelectedTranscriptId(transcript.id);
              }}
              onChange={handleChange}
            />
          );
        })}
      </Layer>
    </Stage>
  ) : (
    <></>
  );
};
