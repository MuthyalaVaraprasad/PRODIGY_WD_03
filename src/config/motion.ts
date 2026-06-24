export const transition = { type: "spring", duration: 0.8 }

export const slideAnimation = (direction: string) => {
  return {
    initial: {
      x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0,
      transition: { ...transition, delay: 0.5 },
    },
    animate: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: { ...transition, delay: 0 },
    },
    exit: {
      x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      transition: { ...transition, delay: 0 },
    },
  }
}

export const tabSlideAnimation = (direction: string) => {
  return {
    initial: {
      x: direction === "left" ? -300 : direction === "right" ? 300 : 0,
      y: direction === "up" ? 300 : direction === "down" ? -300 : 0,
      opacity: 0,
      transition: { ...transition, delay: 0.5 },
    },
    animate: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: { ...transition, delay: 0 },
    },
    exit: {
      x: direction === "left" ? -300 : direction === "right" ? 300 : 0,
      y: direction === "up" ? 300 : direction === "down" ? -300 : 0,
      opacity: 0,
      transition: { ...transition, delay: 0 },
    },
  }
}

export const fadeAnimation = {
  initial: {
    opacity: 0,
    transition: { ...transition, delay: 0.5 },
  },
  animate: {
    opacity: 1,
    transition: { ...transition, delay: 0 },
  },
  exit: {
    opacity: 0,
    transition: { ...transition, delay: 0 },
  },
}

export const headTextAnimation = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: {
    type: "spring",
    damping: 5,
    stiffness: 40,
    restDelta: 0.001,
    duration: 0.3,
  },
}

export const headContentAnimation = {
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: {
    type: "spring",
    damping: 7,
    stiffness: 30,
    restDelta: 0.001,
    duration: 0.6,
    delay: 0.2,
    delayChildren: 0.2,
  },
}

export const headContainerAnimation = {
  initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
  animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
  exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } },
}

function randomUnitVector() {
  // Generate random theta between 0 and 2 * PI
  const theta = Math.random() * 2 * Math.PI

  // Generate random z between -1 and 1
  const z = Math.random() * 2 - 1

  // Calculate x and y coordinates
  const x = Math.sqrt(1 - z * z) * Math.cos(theta)
  const y = Math.sqrt(1 - z * z) * Math.sin(theta)

  // Return the x and y coordinates as an array
  return [x, y]
}

export const tileAnimation = (
  isNew: boolean,
  finalPos: number[],
  direction: "left" | "right" | "random"
) => {
  const directionVector =
    direction === "random"
      ? randomUnitVector()
      : [direction === "left" ? -1 : 1, 0]
  return {
    initial: isNew
      ? {
          x: directionVector[0],
          y: directionVector[1],
          z: 0,
          transition: { ...transition, delay: 0.5 },
        }
      : false,
    animate: {
      x: finalPos[0],
      y: finalPos[1],
      z: finalPos[2],
      transition: { ...transition, delay: 0 },
    },
    exit: {
      x: directionVector[0],
      y: directionVector[1],
      z: 0,
      transition: { ...transition, delay: 0 },
    },
  }
}

export const lineAnimation = (isNew: boolean, finalPos: number[]) => {
  return {
    initial: isNew
      ? {
          x: 0,
          y: 0,
          z: 1,
          transition: { ...transition, delay: 0.5 },
        }
      : false,
    animate: {
      x: finalPos[0],
      y: finalPos[1],
      z: finalPos[2],
      transition: { ...transition, delay: 0 },
    },
    exit: {
      x: 0,
      y: 0,
      z: 1,
      transition: { ...transition, delay: 0 },
    },
  }
}
