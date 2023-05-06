import * as Form from "@radix-ui/react-form";
import { UploadIcon } from "@radix-ui/react-icons";
import { useContext, useEffect, useState, useRef } from "react";
/*Components*/
//Layout
import { CustomTooltip } from "./containers/CustomTooltip.component";
//Context
import { TranscriptsContext } from "../contexts/Transcripts.context";
//Modals
import { ConfirmChangesModal } from "./modals/ConfirmChangesModal.component";

//utils
function debounce(cb, delay = 1000) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => cb(...args), delay);
  };
}
export const TextInput = () => {
  const { selectedTranscriptId, transcripts, setCachedTranscripts } =
    useContext(TranscriptsContext);
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

  const updateCacheText = debounce((text) => {
    setCachedTranscripts((prevState) =>
      prevState.map((transcript) =>
        selectedTranscriptId === transcript.id
          ? { ...transcript, text }
          : transcript
      )
    );
  }, 500);
  //Event handlers
  const handleButtonClick = (e) => {
    e.preventDefault();
    setOpenModal(true);
  };
  const handleInputChange = (e) => {
    setInputText(e.target.value);
    //hacer debounce y meterlo en array
    updateCacheText(e.target.value);
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
                ? "text-input--container border-[#8a90ff] shadow-[0_0_0.3rem_#b3b6ff] transition-all duration-200"
                : "text-input--container border-neutral-300 opacity-90"
            }
          >
            <Form.Control asChild>
              <input
                ref={inputRef}
                className={
                  !selectedTranscriptId
                    ? "text-input--input bg-neutral-50"
                    : "text-input--input transition-all duration-200"
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
                    ? "text-input--btn bg-neutral-50"
                    : "text-input--btn transition-all duration-200"
                }
              >
                <CustomTooltip title={"submit changes"}>
                  <UploadIcon />
                </CustomTooltip>
              </button>
            </Form.Submit>
          </div>
        </Form.Field>
      </Form.Root>
    </>
  );
};
