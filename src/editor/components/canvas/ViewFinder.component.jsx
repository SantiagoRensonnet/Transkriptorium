//Libraries
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useContext, useState } from "react";
import { TranscriptsContext } from "../../contexts/Transcripts.context";
//Components
import { Canvas } from "./Canvas.component";
import { FrameScroll } from "../../components/containers/FrameScroll.component";
import { DiscardChangesModal } from "../../components/modals/DiscardChangesModal.component";

export const ViewFinder = () => {
  const { selectedTranscriptId } = useContext(TranscriptsContext);
  const [zoomScale, setZoomScale] = useState(1);

  //Modal setup for discard changes
  /*********************************************** */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [discardInstructions, setDiscardInstructions] = useState({});
  const openModal = (command) => {
    setDiscardInstructions(command);
    setIsModalOpen(true);
  };

  /********************************************** */
  //For mobile
  // const { imageData } = useContext(TranscriptsContext);
  // const initScale = window.innerWidth / imageData.width;
  return (
    <>
      {isModalOpen && (
        <DiscardChangesModal
          instructions={discardInstructions}
          open={isModalOpen}
          setOpen={setIsModalOpen}
        />
      )}
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
            <Canvas openDiscardChangesModal={openModal} zoomScale={zoomScale} />
          </TransformComponent>
        </TransformWrapper>
      </FrameScroll>
    </>
  );
};
