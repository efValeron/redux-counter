import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type CounterState = {
  value: number
  config: {
    maxValue: number
    minValue: number
    minAllowed: number
  }
}

export const counterInitialState: CounterState = {
  value: 0,
  config: {
    maxValue: 5,
    minValue: 0,
    minAllowed: -10,
  },
}

export const counterSlice = createSlice({
  name: "counter",
  initialState: counterInitialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    reset: (state) => {
      state.value = state.config.minValue
    },
    setNewConfig: (state, action: PayloadAction<{maxValue: number, minValue: number}>) => {
      state.config = {
        ...state.config,
        maxValue: action.payload.maxValue,
        minValue: action.payload.minValue
      }
      state.value = state.config.minValue
    },
  }
})

export const {
  increment,
  reset,
  setNewConfig
} = counterSlice.actions

export const CounterReducer = counterSlice.reducer