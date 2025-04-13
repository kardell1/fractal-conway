import { useEffect, useState } from "react";
type Props = {
  repeat: string;
  width: string;
};
function generateItems(value: string): string[] {
  const num = parseFloat(value);
  const result = num / 3;
  let new_items: string[] = [];
  for (let i = 0; i < 3; i++) {
    if (i % 2 === 0) {
      new_items.push(result.toString());
    }
  }
  return new_items;
}
function calculateFractal(
  repeat: string,
  acum: string[][],
  setAcum: (acum: string[][]) => void
) {
  let result_array = [...acum];
  for (let i = 0; i < parseInt(repeat); i++) {
    let pointer = result_array[result_array.length - 1]; //puntero que indica la ultima pocision
    let new_level: string[] = [];
    for (let value of pointer) {
      const generated = generateItems(value);
      new_level.push(...generated);
    }
    //agregar el nuevo nivel
    result_array.push(new_level);
  }
  setAcum(result_array);
}
const Fractal = ({ width, repeat }: Props) => {
  const [acum, setAcum] = useState<string[][]>([[width]]); //array de arrays , matriz :V
  useEffect(() => {
    calculateFractal(repeat, acum, setAcum);
  }, []);
  const handleClick = () => {
    console.log(acum);
  };
  return (
    <div className="overflow-x-auto w-full">
      <button onClick={handleClick}>mostrar</button>
      <div className="flex flex-col gap-5  w-full items-center py-16 ">
        {acum.map((item, ix) => (
          <div
            key={ix}
            className="flex  justify-between  "
            style={{ width: `${width}px` }}
          >
            {item.map((value, i) => (
              <div key={i} style={{ width: `${item}px` }}>
                <div
                  className="h-[10px] bg-green-400  "
                  style={{ width: `${value != "-1" ? value : "0"}px` }}
                ></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fractal;
