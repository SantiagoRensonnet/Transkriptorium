import { useParams } from "react-router-dom";
//Context
import { TranscriptsProvider } from "../contexts/Transcripts.context";
//Components
import { FileError } from "../components/FileError.component";
import { TextInput } from "../components/TextInput.component";
import { ViewFinder } from "../components/canvas/ViewFinder.component";
export const Editor = () => {
  const draftsArray = ["Albatross_vol009of055-050-0"];
  const { fileId } = useParams();
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
