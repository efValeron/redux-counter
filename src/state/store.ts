import {configureStore} from "@reduxjs/toolkit";
import {CounterReducer, counterInitialState} from "../features/counter/counterSlice.ts";
import {loadState, saveState} from "../utils/localStorage.ts";
import {throttle} from "lodash";
import objectAssignDeep from 'object-assign-deep';

const loadedState = loadState()

const preloadedState = {
  counter: objectAssignDeep(structuredClone(counterInitialState), loadedState.counter)
}

export const store = configureStore({
  reducer: {
    counter: CounterReducer
  },
  preloadedState
})

store.subscribe(throttle(() => {
  saveState(store.getState())
}, 1000))

export type RootState = ReturnType<typeof store.getState>

// @ts-ignore
window.store = store