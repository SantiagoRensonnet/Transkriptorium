import { useParams } from "react-router-dom";
//Context
import { TranscriptsProvider } from "../editor/contexts/Transcripts.context";
//Components
import { FileError } from "../editor/components/FileError.component";
import { TextInput } from "../editor/components/TextInput.component";
import { ViewFinder } from "../editor/components/canvas/ViewFinder.component";
export const Editor = () => {
  const { fileId } = useParams();
  //This is a hardcoded solution to what must be a API calling to check for all previously created drafts
  const draftsArray = ["Albatross_vol009of055-050-0"];
  const isIdValid = draftsArray.includes(fileId);

  return isIdValid ? (
    <TranscriptsProvider fileId={fileId}>
      <main className="min-h-[100vh] bg-neutral-900 flex flex-col justify-center items-center">
        <ViewFinder />
        <TextInput />
      </main>
    </TranscriptsProvider>
  ) : (
    <FileError fileName={fileId} />
  );
};
