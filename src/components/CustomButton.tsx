import state from "../store"
import { useSnapshot } from "valtio"
import { hexOpacity } from "../utils/utils"

interface ButtonProps {
  type: "filled" | "glass"
  title: string
  handleClick: () => void
  customStyles: string
}

const CustomButton = ({
  type,
  title,
  handleClick,
  customStyles,
}: ButtonProps) => {
  const snap = useSnapshot(state)
  const generateStyle = (type: string) => {
    if (type === "filled") {
      return {
        backgroundColor: snap.color,
        color: "#000",
      }
    } else if (type === "glass") {
      return {
        backgroundColor: hexOpacity(snap.color, 64),
        color: "#000",
      }
    }
  }

  return (
    <button
      className={`px-2 py-1.5 flex-initial rounded-md ${
        type === "glass" ? "glassmorphismColor" : ""
      } ${customStyles}`}
      style={generateStyle(type)}
      onClick={handleClick}>
      {title}
    </button>
  )
}

export default CustomButton
