import { Routes, Route } from "react-router-dom";
//Routes Components
import { Layout } from "./components/layout/Layout.component";
import { Home } from "./routes/Home.component";
import { Error404 } from "./routes/Error404.component";
import { Editor } from "./routes/Editor.component";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/editor" element={<Editor />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default App;
