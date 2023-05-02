//Libraries
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useContext, useState } from "react";
import { TranscriptsContext } from "../../contexts/Transcripts.context";
//Components
import { Canvas } from "./Canvas.component";
import { FrameScroll } from "../FrameScroll.component";

export const ViewFinder = () => {
  const { selectedTranscriptId, setSelectedTranscriptId } =
    useContext(TranscriptsContext);
  const [zoomScale, setZoomScale] = useState(1);

  //For mobile
  // const { imageData } = useContext(TranscriptsContext);
  // const initScale = window.innerWidth / imageData.width;
  return (
    <FrameScroll frameDimensions={""}>
      <TransformWrapper
        // initialScale={(window.innerWidth / imageData.width) * 1}
        // centerZoomedOut={true}
        // minScale={0.3}
        onZoomStop={(e) => {
          setZoomScale(e.state.scale);
        }}
        disablePadding={true}
        disabled={selectedTranscriptId !== null}
        wheel={{ activationKeys: ["Control"] }}
      >
        <TransformComponent>
          <Canvas
            zoomScale={zoomScale}
            selectedTranscriptId={selectedTranscriptId}
            setSelectedTranscriptId={setSelectedTranscriptId}
          />
        </TransformComponent>
      </TransformWrapper>
    </FrameScroll>
  );
};
