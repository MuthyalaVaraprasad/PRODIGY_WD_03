export function hexOpacity(hex: string, opacity: number): string {
  // Remove the "#" character if it exists
  if (hex.startsWith("#")) {
    hex = hex.slice(1)
  }

  const alpha = opacity.toString(16).padStart(2, "0").toUpperCase()
  console.log(`#${alpha}${hex}`)

  return `#${hex}${alpha}`
}

export function delayFunction(time: number, callback: () => void): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(() => {
      callback()
      resolve()
    }, time)
  )
}
