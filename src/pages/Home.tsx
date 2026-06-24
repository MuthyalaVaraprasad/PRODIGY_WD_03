import { motion, AnimatePresence } from "framer-motion"
import { useSnapshot } from "valtio"
import state from "../store"
import { CustomButton } from "../components"
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "../config/motion"
import { resetBoard } from "../config/constants"

const Home = () => {
  const snap = useSnapshot(state)

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home" {...slideAnimation("left")}>
          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="head-text">
                TIC <br className="xl:block hidden" /> TAC TOE
              </h1>
              <h2 className="head-subtext">By Clement Foo</h2>
            </motion.div>
            <motion.div
              {...headContentAnimation}
              className="flex flex-row gap-5">
              <CustomButton
                type="filled"
                title="2-Player"
                handleClick={() => {
                  state.intro = false
                  state.gameMode = "human"
                  resetBoard()
                }}
                customStyles="w-32 px-4 py-2.5 font-bold text-sm"
              />
              <CustomButton
                type="filled"
                title="Computer"
                handleClick={() => {
                  state.intro = false
                  state.gameMode = "ai"
                  resetBoard()
                }}
                customStyles="w-32 px-4 py-2.5 font-bold text-sm"
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default Home
