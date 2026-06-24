import { SketchPicker } from "react-color"
import { useSnapshot } from "valtio"
import { motion } from "framer-motion"
import { tabSlideAnimation } from "../config/motion"

import state from "../store"

const ColorPicker = () => {
  const snap = useSnapshot(state)

  return (
      !snap.intro && (
        <motion.div
          className="absolute left-full ml-3"
          {...tabSlideAnimation("left")}>
          <SketchPicker
            color={snap.color}
            disableAlpha
            onChange={(color) => (state.color = color.hex)}
          />
        </motion.div>
      )
  )
}

export default ColorPicker
