import { useContext } from "react";
import { TranscriptsContext } from "../../contexts/Transcripts.context";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

export const DiscardChangesModal = ({ open, setOpen, instructions }) => {
  const {
    setSelectedTranscriptId,
    setCachedTranscripts,
    transcripts,
    setIsFirstSelection,
  } = useContext(TranscriptsContext);
  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
        <AlertDialog.Content className="fixed data-[state=open]:animate-contentShow  top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <div className="flex gap-3">
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>
            <div>
              <AlertDialog.Title className="text-mauve12 m-0 text-base font-medium">
                Descartar Cambios
              </AlertDialog.Title>
              <AlertDialog.Description className="text-mauve11 mt-3 mb-5 text-sm leading-normal">
                ¿Está seguro que desea descartar los cambios?
              </AlertDialog.Description>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <AlertDialog.Cancel asChild>
              <button
                className=" text-sm text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancelar
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                className="text-sm  text-red11 bg-red4 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
                onClick={() => {
                  if (instructions.onDiscard) {
                    setSelectedTranscriptId(instructions.onDiscard);
                  } else {
                    setSelectedTranscriptId(null);
                    setIsFirstSelection(true);
                  }
                  setCachedTranscripts(transcripts);
                  setOpen(false);
                }}
              >
                Descartar
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
