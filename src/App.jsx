//Components
import { TextInput } from "./components/TextInput.component";
import { ViewFinder } from "./components/canvas/ViewFinder.component";

function App() {
  return (
    <main className="min-h-[100vh] bg-neutral-900 flex flex-col justify-center items-center">
      <ViewFinder />
      <TextInput />
    </main>
  );
}

export default App;
