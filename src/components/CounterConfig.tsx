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
        <div className="flex flex-row justify-between gap-8">
          <h3 className="text-4xl">Max value:</h3>
          <Input type="number" callBack={setMaxInputValue} value={maxInputValue}
                 error={maxInputValue <= minInputValue}/>
        </div>
        <div className="flex flex-row justify-between gap-8">
          <h3 className="text-4xl">Min value:</h3>
          <Input type="number" callBack={setMinInputValue} value={minInputValue}
                 error={minInputValue < minAllowed}/>
        </div>
      </div>

      <div className="flex flex-row justify-center gap-8 border-8 border-cyan-500 rounded-md border-box p-8">
        <Button title="set" active={minInputValue >= minAllowed && maxInputValue > minInputValue}
                callBack={confirmNewConfig}/>
      </div>
    </>
  );
}
