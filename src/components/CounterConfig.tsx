import {Button} from "./Button";
import {Input} from "./Input";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../state/store.ts";
import {CounterState, setNewConfig} from "../features/counter/counterSlice.ts";
import {useState} from "react";

export const CounterConfig = ({setIsConfigured}: { setIsConfigured: (value: boolean) => void }) => {
  const dispatch = useDispatch()
  const {maxValue, minValue, minAllowed} = useSelector<RootState, CounterState["config"]>(state => state.counter.config)

  const [maxInputValue, setMaxInputValue] = useState(maxValue)
  const [minInputValue, setMinInputValue] = useState(minValue)

  const confirmNewConfig = () => {
    dispatch(setNewConfig({
      maxValue: maxInputValue,
      minValue: minInputValue
    }))
    setIsConfigured(false)
  }

  return (
    <>
      <div
        className="bg-cyan-500 border-box font-bold flex flex-col gap-4 justify-center rounded border-box p-6 cursor-default">
        <div className="flex flex-row justify-between gap-4 md:gap-8 items-center">
          <p className="text-base md:text-xl xl:text-2xl w-1/3">Max value:</p>
          <Input type="number" callBack={setMaxInputValue} value={maxInputValue}
                 error={maxInputValue <= minInputValue}
                 className="w-full p-3 md:p-4 lg:text-lg"
          />
        </div>
        <div className="flex flex-row justify-between gap-4 md:gap-8 items-center">
          <p className="text-base md:text-xl xl:text-2xl w-1/3">Min value:</p>
          <Input type="number" callBack={setMinInputValue} value={minInputValue}
                 error={minInputValue < minAllowed}
                 className="w-full p-3 md:p-4 lg:text-lg"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-evenly border-4 md:border-8 border-cyan-500 rounded-md border-box p-4 md:p-8">
        <Button title="set" active={minInputValue >= minAllowed && maxInputValue > minInputValue}
                callBack={confirmNewConfig}/>
      </div>
    </>
  );
}
