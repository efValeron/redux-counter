import {isACounter} from "./localStorage.ts";
import {CounterState} from "../features/counter/counterSlice.ts";

describe('isACounter func should', () => {
  test('return false, obj is empty', () => {
    expect(isACounter({})).toBeFalsy()
  })

  test('return true, obj is CounterState', () => {
    const obj: CounterState = {
      value: 0,
      config: {
        maxValue: 5,
        minValue: 0,
        minAllowed: -2,
      },
    }
    expect(isACounter(obj)).toBeTruthy()
  })

  test('return false, obj is missing value', () => {
    const obj = {
      config: {
        maxValue: 5,
        minValue: 0,
        minAllowed: -2,
      },
    }
    expect(isACounter(obj)).toBeFalsy()
  })

  test('return false, obj is missing config.minValue', () => {
    const obj = {
      value: 0,
      config: {
        maxValue: 5,
        minAllowed: -2,
      },
    }
    expect(isACounter(obj)).toBeFalsy()
  })
});