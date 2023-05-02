//Components
import { TextView } from "./components/TextView.component";
import { ViewFinder } from "./components/canvas/ViewFinder.component";

function App() {
  return (
    <main className="min-h-[100vh] bg-neutral-900 flex flex-col justify-center items-center">
      <ViewFinder />
      <TextView />
    </main>
  );
}

export default App;
