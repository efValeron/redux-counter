import {CounterState} from "../features/counter/counterSlice.ts";

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) {
      return undefined
    }
    const parsedState = JSON.parse(serializedState)

    if (isACounter(parsedState.counter)) {
      return parsedState
    }

    return undefined
  } catch (err) {
    return undefined
  }
}

export const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch {
    // ignore write errors
  }
}

export const isACounter = (obj: any): obj is CounterState => {
  return (
    'value' in obj &&
    'config' in obj &&
    'maxValue' in obj.config &&
    'minValue' in obj.config &&
    'minAllowed' in obj.config
  )
}
