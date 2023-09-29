import {ChangeEvent} from "react";

type Props = {
  type: string
  callBack: (value: number) => void
  value: number
  error: boolean
  className?: string
}

export const Input = ({type, callBack, value, error, className=""}: Props) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      callBack(JSON.parse(e.currentTarget.value))
    }
    catch {
      callBack(0)
    }
  }

  return (
    <input
      value={value}
      onChange={onChangeHandler}
      type={type}
      className={`${error ? "border-2 border-red-500 bg-red-200" : "border-0"} text-gray-800 border-box rounded-md ` + className}
    />
  )
}