import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useState, useRef, useContext } from "react";
import { TranscriptsContext } from "../../contexts/Transcripts.context";
export const ConfirmChangesModal = ({
  open,
  setOpen,
  inputText,
  setInputText,
}) => {
  const {
    selectedTranscriptId,
    setSelectedTranscriptId,
    viewFinderScale,
    setTranscripts,
    cachedTranscripts,
  } = useContext(TranscriptsContext);

  const textAreaRef = useRef();
  const [areaText, setAreaText] = useState(inputText);
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  //Event Handlers
  const confirmChanges = () => {
    const { x, y, width, height } = cachedTranscripts.find(
      (transcript) => transcript.id === selectedTranscriptId
    );
    setTranscripts((prevState) =>
      prevState.map((transcript) =>
        transcript.id !== selectedTranscriptId
          ? transcript
          : { ...transcript, x, y, width, height, text: areaText }
      )
    );
    localStorage.setItem(
      selectedTranscriptId,
      JSON.stringify({
        x: x / viewFinderScale,
        y: y / viewFinderScale,
        width: width / viewFinderScale,
        height: height / viewFinderScale,
        text: areaText,
      })
    );
    setSelectedTranscriptId(null);
  };

  const handleDragStart = (e) => {
    setStartPosition({ x: e.clientX, y: e.clientY });
  };
  const handleDragEnd = (e) => {
    setCurrentPosition({
      x: window.innerWidth / 2 + e.clientX - startPosition.x,
      y: window.innerHeight / 2 + e.clientY - startPosition.y,
    });
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 " />

        <Dialog.Content
          className={
            currentPosition.x !== 0 && currentPosition.y !== 0
              ? "modal-container"
              : "modal-container top-[50%] left-[50%]"
          }
          style={
            currentPosition.x !== 0 &&
            currentPosition.y !== 0 && {
              left: currentPosition.x,
              top: currentPosition.y,
            }
          }
        >
          <div
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            className="cursor-move"
          >
            <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
              Editar Polígono
            </Dialog.Title>
            <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
              ¿Desea guardar los siguientes cambios en el polígono seleccionado?
              <span className="text-[13px]">
                <br />
                (Puede seguir modificando la posición y dimensiones del mismo al
                salir de esta ventana)
              </span>
            </Dialog.Description>
          </div>
          <fieldset className="flex flex-col justify-center">
            <label
              className="text-[hsl(235,43%,48%)] w-full text-[15px] mb-1"
              htmlFor="polygon-text"
            >
              Texto del Polígono seleccionado
            </label>
            <textarea
              ref={textAreaRef}
              className="p-2 text-[hsl(235,43%,48%)] shadow-text-[hsl(237,71%,83.7%)] focus:shadow-[hsl(237,68.6%,76.3%)] inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              id="polygon-text"
              cols="30"
              rows="10"
              value={areaText}
              onChange={(e) => setAreaText(e.target.value)}
            ></textarea>
          </fieldset>

          <div className="mt-[25px] flex items-center justify-end">
            <div
              className="h-8 w-full cursor-move"
              draggable
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            ></div>
            <Dialog.Close asChild>
              <button
                className="bg-[hsl(90,58.7%,91%)] text-[hsl(102,67%,28.5%)] hover:bg-[hsl(91,43.5%,86%)] focus:shadow-[hsl(96,38.5%,69%)] inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                onClick={() => {
                  confirmChanges();
                  setOpen(false);
                }}
              >
                Guardar
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-[hsl(235,43%,48%)] hover:bg-[hsl(237,91.5%,95.5%)] focus:shadow-[hsl(237,71%,83.7%)] absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
              onClick={() => {
                setInputText(areaText);
                setOpen(false);
              }}
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
