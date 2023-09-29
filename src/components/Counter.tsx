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
    <div className="border-4 md:border-8 border-cyan-500 rounded-md border-box p-6 md:p-8 flex flex-col gap-6 md:gap-8 w-5/6 md:w-1/2 xl:w-1/3">
      {
        !isConfigured
          ? <>
            <div className="bg-cyan-500 border-box font-bold flex justify-center rounded border-box p-2 md:p-6 cursor-default">
              <p className={`${value === maxValue ? "text-red-600" : ""} text-xl md:text-3xl xl:text-5xl`}>{value}</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-evenly border-4 md:border-8 border-cyan-500 rounded-md border-box p-4 md:p-8">
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