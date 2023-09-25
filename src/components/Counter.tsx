import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../state/store.ts";
import {Button} from "./Button.tsx";
import {
  CounterState,
  increment,
  reset
} from "../features/counter/counterSlice.ts";
import {useState} from "react";
import {CounterConfig} from "./CounterConfig.tsx";

export const Counter = () => {
  const dispatch = useDispatch()
  const {value, config} = useSelector<RootState, CounterState>(state => state.counter)
  const {maxValue, minValue} = config

  const [isConfigured, setIsConfigured] = useState(false)

  return (
    <div className="border-8 border-cyan-500 rounded-md border-box p-8 flex flex-col gap-8 w-1/3">
      {
        !isConfigured
          ? <>
            <div className="bg-cyan-500 border-box font-bold flex justify-center rounded border-box p-6 cursor-default">
              <h2 className={`${value === maxValue ? "text-red-600" : ""} text-6xl`}>{value}</h2>
            </div>

            <div className="flex flex-row gap-8 justify-evenly border-8 border-cyan-500 rounded-md border-box p-8">
              <Button title="inc" active={value < maxValue} callBack={() => dispatch(increment())}/>
              <Button title="reset" active={value > minValue} callBack={() => dispatch(reset())}/>
              <Button title="set" callBack={() => setIsConfigured(true)}/>
            </div>
          </>
          : <CounterConfig setIsConfigured={setIsConfigured}/>
      }
    </div>
  );
};