import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useSnapshot } from "valtio"
import state from "../store"
import { EditorTabs, resetBoard } from "../config/constants"
import { slideAnimation } from "../config/motion"
import { ColorPicker, Tab } from "../components"
import { back, restart } from "../assets"

const Customizer = () => {
  const snap = useSnapshot(state)

  const [activeEditorTab, setActiveEditorTab] = useState("")

  // show tab content depending on the activeTab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />
      default:
        return null
    }
  }

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}>
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() =>
                      setActiveEditorTab(
                        activeEditorTab === tab.name ? "" : tab.name
                      )
                    }
                  />
                ))}
                <AnimatePresence>{generateTabContent()}</AnimatePresence>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}>
            <Tab
              tab={{
                name: "back",
                icon: back,
              }}
              isFilterTab={true}
              handleClick={() => (state.intro = true)}
            />
            <Tab
              tab={{
                name: "restart",
                icon: restart,
              }}
              isFilterTab={true}
              handleClick={() => resetBoard()}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer
