import { useEffect, useRef, useState } from "react";

type CellProps = {
  axis_x: number;
  axis_y: number;
  isSelect: boolean;
  status: "lives" | "dies";
};

const generateMatrix = (rows: number, cols: number): CellProps[][] => {
  return Array.from({ length: rows }, (_, x) =>
    Array.from({ length: cols }, (_, y) => ({
      axis_x: x,
      axis_y: y,
      isSelect: false,
      status: "dies",
    }))
  );
};

const generateNextGeneration = (
  currentMatrix: CellProps[][],
  rows: number,
  cols: number
): CellProps[][] => {
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  return currentMatrix.map((row, x) =>
    row.map((cell, y) => {
      let brothers = 0;
      //sacamos las posiciones de "x" y "y" en base a su posicion relativa
      directions.forEach(([dx, dy]) => {
        const nx = x + dx;
        const ny = y + dy;
        //verificar estado en la matriz
        if (
          nx >= 0 &&
          nx < rows &&
          ny >= 0 &&
          ny < cols &&
          currentMatrix[nx][ny].status === "lives" //verificar si el vecino esta vivo
        ) {
          brothers++; //sumar si tiene un pariente vivo
        }
      });

      let newStatus: "lives" | "dies" = cell.status;

      if (cell.status === "lives" && (brothers < 2 || brothers > 3)) {
        newStatus = "dies";
      } else if (cell.status === "dies" && brothers === 3) {
        newStatus = "lives";
      }

      return {
        ...cell,
        status: newStatus,
        isSelect: newStatus === "lives",
      };
    })
  );
};

const ContainerConway = () => {
  const [rows, setRows] = useState(15);
  const [cols, setCols] = useState(15);
  const [matrix, setMatrix] = useState(() => generateMatrix(rows, cols));
  const [isSimulated, setIsSimulated] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    setMatrix(generateMatrix(rows, cols));
  }, [rows, cols]);

  useEffect(() => {
    if (isSimulated) {
      intervalRef.current = window.setInterval(() => {
        setMatrix((prev) => generateNextGeneration(prev, rows, cols));
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isSimulated]);

  const handleCellClick = (row: number, col: number) => {
    setMatrix((prev) =>
      prev.map((rowData, rowIndex) =>
        rowData.map((cell, colIndex) => {
          if (rowIndex === row && colIndex === col) {
            const newStatus = cell.status === "lives" ? "dies" : "lives";
            return {
              ...cell,
              status: newStatus,
              isSelect: newStatus === "lives",
            };
          }
          return cell;
        })
      )
    );
  };

  const handleSimulated = () => {
    setIsSimulated((prev) => !prev);
  };

  return (
    <div className="bg-slate-100 flex flex-col items-center gap-10 py-10">
      <div className="flex justify-center items-center gap-2">
        <label>
          Filas:
          <input
            type="number"
            value={rows}
            min={1}
            className="border ml-2 px-1"
            onChange={(e) => setRows(Number(e.target.value))}
          />
        </label>
        <label>
          Columnas:
          <input
            type="number"
            value={cols}
            min={1}
            className="border ml-2 px-1"
            onChange={(e) => setCols(Number(e.target.value))}
          />
        </label>
        <button
          className="p-2 bg-blue-500 text-white rounded"
          onClick={handleSimulated}
        >
          {isSimulated ? "Detener" : "Simular"}
        </button>
      </div>

      <div  >
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${cols}, 20px)`,
          }}
        >
          {matrix.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                className={`w-[20px] h-[20px] border-[1px] border-slate-400 cursor-pointer 
                ${cell.status === "lives" ? "bg-slate-700" : "bg-slate-100"}`}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ContainerConway;
