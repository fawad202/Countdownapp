import { useState, useEffect } from "react";

export default function App() {
  const [value, setValue] = useState("");
  const [toDiv, setToDiv] = useState<number>(0);

  const [counting, setCounting] = useState(false);
  const [intervalId, setIntervalId] = useState<number>();
  const putValue = () => {
    setToDiv(Number(value));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const start = () => {
    if (!counting) {
      clearInterval(intervalId);
      setCounting(true);

      const id = setInterval(() => {
        setToDiv((preTodiv) => {
          const newValue = preTodiv - 1;
          if (newValue <= 0) {
            clearInterval(intervalId);
            setCounting(false);
            return 0;
          }
          return newValue;
        });
      }, 1000);
      setIntervalId(id);
    }
  };

  useEffect(() => {
    if (counting) {
      setValue("");
    }
  }, [counting]);

  const reset = () => {
    setToDiv(0);
  };
  return (
    <div className="w-full h-screen text-center bg-blue-600 select-none">
      <div className="py-3">
        <div>
          <input onChange={handleChange} type="number" value={value} />
        </div>
        <div className="py-5 text-white flex justify-center items-center gap-3">
          <button
            disabled={counting}
            onClick={() => {
              start();
              putValue();
            }}
            className="w-20 h-8 text-black bg-white rounded-md"
          >
            Start
          </button>
          <button
            onClick={reset}
            className="w-20 h-8 text-black bg-white rounded-md"
          >
            Reset
          </button>
        </div>
        <div className="text-3xl text-white">{toDiv}</div>
      </div>
    </div>
  );
}
