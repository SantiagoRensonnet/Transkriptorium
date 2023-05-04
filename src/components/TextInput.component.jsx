import * as Form from "@radix-ui/react-form";
import { UploadIcon } from "@radix-ui/react-icons";
import { useContext, useEffect, useState, useRef } from "react";
//Context
import { TranscriptsContext } from "../contexts/Transcripts.context";
//Modals
import { ConfirmChangesModal } from "./modals/ConfirmChangesModal.component";
export const TextInput = () => {
  const { selectedTranscriptId, transcripts } = useContext(TranscriptsContext);
  const [inputText, setInputText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const inputRef = useRef(null);
  useEffect(() => {
    if (selectedTranscriptId === null) {
      setInputText("");
    } else {
      setInputText(
        transcripts.find((transcript) => transcript.id === selectedTranscriptId)
          .text
      );
      inputRef.current.focus();
    }
  }, [selectedTranscriptId, transcripts]);

  //Event handlers

  const handleButtonClick = (e) => {
    e.preventDefault();
    setOpenModal(true);
  };
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };
  return (
    <>
      {openModal && (
        <ConfirmChangesModal
          open={openModal}
          setOpen={setOpenModal}
          inputText={inputText}
          setInputText={setInputText}
        />
      )}
      <Form.Root className="fixed bottom-[1vh] z-10 w-10/12">
        <Form.Field className="flex flex-col" name="transcript-text">
          <div className="flex items-baseline justify-between">
            <Form.Message
              className="text-[13px] text-[hsl(237,100%,60%)] font-medium"
              match="valueMissing"
            >
              Please enter text
            </Form.Message>
          </div>
          <div
            className={
              selectedTranscriptId
                ? "input-container border-[#8a90ff] shadow-[0_0_0.3rem_#b3b6ff] transition-all duration-200"
                : "input-container border-neutral-300 opacity-90"
            }
          >
            <Form.Control asChild>
              <input
                ref={inputRef}
                className={
                  !selectedTranscriptId
                    ? "input-polygon-text bg-neutral-50"
                    : "input-polygon-text transition-all duration-200"
                }
                autoComplete="off"
                required
                disabled={!selectedTranscriptId}
                value={inputText}
                onChange={handleInputChange}
              />
            </Form.Control>
            <Form.Submit asChild>
              <button
                onClick={handleButtonClick}
                disabled={!selectedTranscriptId}
                className={
                  !selectedTranscriptId
                    ? "btn-input bg-neutral-50"
                    : "btn-input transition-all duration-200"
                }
              >
                <UploadIcon />
              </button>
            </Form.Submit>
          </div>
        </Form.Field>
      </Form.Root>
    </>
  );
};
