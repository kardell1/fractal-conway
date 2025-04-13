import { useState } from "react";
import ContainerFractal from "./pages/ContainerFractal";
import ContainerConway from "./pages/ContainerConway";
function App() {
  const [component, setComponent] = useState("");
  const handleClick = (name: string) => {
    setComponent(name);
  };
  return (
    <>
      <div className="min-h-screen bg-slate-100"
      >
        <div className=" py-20 flex justify-center items-center gap-5">
          <button
            className="font-semibold text-2xl p-3 bg-blue-600"
            onClick={() => handleClick("fractal")}
          >
            Fractal
          </button>
          <button
            className="font-semibold text-2xl p-3 bg-blue-600"
            onClick={() => handleClick("conway")}
          >
            Conway
          </button>
        </div>
        {component == "fractal" ? <ContainerFractal /> : <ContainerConway />}
      </div>
    </>
  );
}

export default App;
