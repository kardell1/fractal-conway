import React, { useState } from 'react'
import Loading from '../components/Loading';
import Fractal from '../components/Fractal';
import cantor from "../assets/Conjunto_de_Cantor.png"
const ContainerFractal = () => {
    const [config, setConfig] = useState({
        repeat: "",
        width: "",
      });
      const [isLoading, setIsLoading] = useState(true);
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const validate = /^[0-9]*$/;
        if (validate.test(value)) {
          setConfig((prev) => ({
            ...prev,
            [name]: value,
          }));
        }
      };
    
      const handleClickButton = async () => {
        setIsLoading(true);
        if (config.width == "" && config.repeat == "") {
          return;
        }
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      };
      return (
        <>
          {/* hero */}
          <div className="h-full bg-slate-100 p-20 flex flex-col gap-5 text-slate-500  ">
            <h1 className="text-5xl font-semibold   ">
              El Fractal de Cantor
            </h1>
            <div className="flex flex-col gap-3"  >
              <p>
              Se construye de modo recursivo dando
                los siguientes pasos: 
              </p>
              <ul className="flex flex-col gap-5 list-disc" >
                <li>El primer paso es tomar el intervalo [0, 1].</li>
                <li>
                  El segundo paso es quitarle su tercio interior, es decir el
                  intervalo abierto (1/3; 2/3).
                </li>
                <li>
                  El tercero es quitar a los dos segmentos restantes sus respectivos
                  tercios interiores, es decir los intervalos abiertos (1/9; 2/9) y
                  (7/9; 8/9).
                </li>
                <li>
                  Los pasos siguientes son idénticos: quitar el tercio de todos los
                  intervalos que quedan.
                </li>
                <li>El proceso no tiene fin.</li>
              </ul>
            </div>
            <img src={cantor} alt="" />
          </div>
          {/* main */}
          <div className="h-full bg-slate-100">
            {/* inputs */}
            <div className="flex justify-center gap-4">
              <div className="">
                <label className="text-2xl text-slate-800">Repeticiones</label>
                <input
                  value={config.repeat}
                  onChange={handleInputChange}
                  className="focus:outline-none border-2 border-slate-300 mx-2  p-2 "
                  name="repeat"
                  type="text"
                />
              </div>
              <div className="">
                <label className="text-2xl text-slate-800">Largo</label>
                <input
                  value={config.width}
                  onChange={handleInputChange}
                  className="focus:outline-none border-2 border-slate-300 mx-2  p-2 "
                  name="width"
                  type="text"
                />
              </div>
              <button
                onClick={handleClickButton}
                className="p-1 px-2 bg-blue-400 text-2xl text- font-medium cursor-pointer "
              >
                Observar
              </button>
            </div>
            {/* grafica */}
            <div>
              {isLoading ? (
                <Loading />
              ) : (
                <Fractal repeat={config.repeat} width={config.width} />
              )}
            </div>
          </div>
        </>
      );
}

export default ContainerFractal