import { useContext, useEffect, useRef } from "react";
import { Stage, Layer, Image } from "react-konva";
import { TranscriptsContext } from "../../contexts/Transcripts.context";
import useImage from "use-image";

//Components
import { TranscriptBox } from "./TranscriptBox.component";

const ArtImage = () => {
  const { imageData } = useContext(TranscriptsContext);
  const [image] = useImage("/" + imageData.name);
  return (
    <Image
      width={imageData.width}
      height={imageData.height}
      image={image}
      cornerRadius={4}
    />
  );
};

export const Canvas = ({
  selectedTranscriptId,
  setSelectedTranscriptId,
  zoomScale,
}) => {
  const stageRef = useRef(null);
  const {
    transcripts,
    cachedTranscripts,
    setCachedTranscripts,
    imageData,
    viewFinderScale,
  } = useContext(TranscriptsContext);

  useEffect(() => {
    if (stageRef && stageRef.current) {
      if (zoomScale === 1) {
        stageRef.current.content.style.cursor = selectedTranscriptId
          ? "move"
          : "default";
      } else {
        stageRef.current.content.style.cursor = selectedTranscriptId
          ? "move"
          : "grab";
      }
    }
  }, [selectedTranscriptId, zoomScale]);

  //Event Handlers
  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty =
      e.target === e.target.getStage() || e.target.attrs.image;
    if (clickedOnEmpty) {
      setSelectedTranscriptId(null);
      setCachedTranscripts(transcripts);
    }
  };
  const handleChange = (newAttrs) => {
    setCachedTranscripts((prevState) =>
      prevState.map((transcript) =>
        newAttrs.id === transcript.id ? newAttrs : transcript
      )
    );
  };
  return viewFinderScale > 0 && cachedTranscripts ? (
    <Stage
      ref={stageRef}
      width={imageData.width}
      height={imageData.height}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
    >
      <Layer>
        <ArtImage />
        {cachedTranscripts?.map((transcript) => {
          return (
            <TranscriptBox
              key={transcript.id}
              transcriptId={transcript.id}
              shapeProps={transcript}
              isSelected={transcript.id === selectedTranscriptId}
              onSelect={() => {
                setCachedTranscripts(transcripts);
                setSelectedTranscriptId(transcript.id);
              }}
              onChange={handleChange}
              zoomScale={zoomScale}
              stageRef={stageRef}
            />
          );
        })}
      </Layer>
    </Stage>
  ) : (
    <></>
  );
};
