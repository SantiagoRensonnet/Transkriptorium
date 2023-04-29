import { useState } from "react";
//Components
import { Canvas } from "./components/views/Canvas.component";
import { DialogBox } from "./components/containers/DialogBox.component";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
function App() {
  const [selectedTranscriptId, setSelectedTranscriptId] = useState(null);
  return (
    <main className="min-h-[100vh] flex flex-col justify-center items-center">
      <DialogBox />
      <div className=" h-[90vh] max-w-[80%] overflow-scroll">
        <TransformWrapper
          disabled={selectedTranscriptId !== null}
          wheel={{ activationKeys: ["Control"] }}
        >
          <TransformComponent>
            <Canvas
              selectedTranscriptId={selectedTranscriptId}
              setSelectedTranscriptId={setSelectedTranscriptId}
            />
          </TransformComponent>
        </TransformWrapper>
      </div>
    </main>
  );
}

export default App;
