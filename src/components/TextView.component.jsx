import * as Form from "@radix-ui/react-form";
import { UploadIcon } from "@radix-ui/react-icons";
import { useContext, useEffect, useState, useRef } from "react";
//Context
import { TranscriptsContext } from "../contexts/Transcripts.context";
export const TextView = () => {
  const {
    selectedTranscriptId,
    setSelectedTranscriptId,
    viewFinderScale,
    transcripts,
    setTranscripts,
    cachedTranscripts,
  } = useContext(TranscriptsContext);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  useEffect(() => {
    if (selectedTranscriptId === null) {
      setInputValue("");
    } else {
      setInputValue(
        transcripts.find((transcript) => transcript.id === selectedTranscriptId)
          .text
      );
      inputRef.current.focus();
    }
  }, [selectedTranscriptId, transcripts]);

  //Event handlers
  const commitChanges = (e) => {
    e.preventDefault();
    const { x, y, width, height } = cachedTranscripts.find(
      (transcript) => transcript.id === selectedTranscriptId
    );
    setTranscripts((prevState) =>
      prevState.map((transcript) =>
        transcript.id !== selectedTranscriptId
          ? transcript
          : { ...transcript, x, y, width, height, text: inputValue }
      )
    );
    //Aca hay que guardar en local storage
    localStorage.setItem(
      selectedTranscriptId,
      JSON.stringify({
        x: x / viewFinderScale,
        y: y / viewFinderScale,
        width: width / viewFinderScale,
        height: height / viewFinderScale,
        text: inputValue,
      })
    );
    setSelectedTranscriptId(null);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
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
                  ? "input-text-area bg-neutral-50"
                  : "input-text-area transition-all duration-200"
              }
              autoComplete="off"
              required
              disabled={!selectedTranscriptId}
              value={inputValue}
              onChange={handleInputChange}
            />
          </Form.Control>
          <Form.Submit asChild>
            <button
              onClick={commitChanges}
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
  );
};
