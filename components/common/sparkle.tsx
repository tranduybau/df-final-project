"use client"

import React from "react"

const DEFAULT_COLOR = "bg-yellow-400"

const range = (start: number, step: number = 1) => {
  let output = []
  let end

  if (typeof end === "undefined") {
    end = start
    start = 0
  }
  for (let i = start; i < end; i += step) {
    output.push(i)
  }
  return output
}

const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min

const generateSparkle = (color: string) => {
  const sparkle = {
    id: String(random(10000, 99999)),
    createdAt: Date.now(),
    color,
    size: `h-${random(10, 20)} w-${random(10, 20)}`,
    style: {
      top: `top-${random(0, 100)}`,
      left: `left-${random(0, 100)}`,
    },
  }
  return sparkle
}

const useRandomInterval = (
  callback: () => void,
  minDelay: number,
  maxDelay: number
) => {
  const timeoutId = React.useRef<number | null>(null)
  const savedCallback = React.useRef(callback)

  React.useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  React.useEffect(() => {
    let isEnabled = typeof minDelay === "number" && typeof maxDelay === "number"

    if (isEnabled) {
      const handleTick = () => {
        const nextTickAt = random(minDelay, maxDelay)
        timeoutId.current = window.setTimeout(() => {
          savedCallback.current()
          handleTick()
        }, nextTickAt)
      }
      handleTick()
    }

    return () => window.clearTimeout(timeoutId.current!)
  }, [minDelay, maxDelay])

  const cancel = React.useCallback(function () {
    window.clearTimeout(timeoutId.current!)
  }, [])

  return cancel
}

const Sparkles = ({ color = DEFAULT_COLOR, children, ...delegated }: any) => {
  const [sparkles, setSparkles] = React.useState(() => {
    return range(3).map(() => generateSparkle(color))
  })

  useRandomInterval(
    () => {
      const sparkle = generateSparkle(color)
      const now = Date.now()
      const nextSparkles = sparkles.filter((sp) => {
        const delta = now - sp.createdAt
        return delta < 750
      })
      nextSparkles.push(sparkle)
      setSparkles(nextSparkles)
    },
    50,
    450
  )

  return (
    <span className="relative" {...delegated}>
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className={`absolute animate-ping ${sparkle.size} ${sparkle.style}`}
          style={{ backgroundColor: color }}
        />
      ))}
      <strong className="relative z-10 font-bold">{children}</strong>
    </span>
  )
}

export default Sparkles
