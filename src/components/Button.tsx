type Props = {
  title: string
  callBack: () => void
  active?: boolean
};

export const Button = ({title, callBack, active = true}: Props) => {
  const clickHandler = () => {
    if (active) callBack()
  }

  return (
    <button
      onClick={clickHandler}
      className={`${active ? "bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700" : "bg-cyan-800 cursor-default"} text-gray-800 border-box p-2 md:p-4 rounded-md duration-100`}
    >
      <p className="text-center text-base md:text-xl xl:text-3xl font-bold">{title}</p>
    </button>
  )
}
