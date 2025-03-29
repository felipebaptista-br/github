import React from "react"
import { Github } from "lucide-react"

type ModeProps = 'dark' | 'light' | 'default'

interface LogoProps {
  size?: number
  mode?: ModeProps
}

export default function Logo({ size = 25, mode = 'default' }: LogoProps) {
  return (
    <div className="flex items-center gap-2">
      <Github
        size={size}
        style={{
          color: mode === 'dark' ? 'black' : mode === 'light' ? 'white' : ''
        }}
        className="animate-pulse select-none"
      />
      <h1
        style={{
          fontSize: size,
          color: mode === 'dark' ? 'black' : mode === 'light' ? 'white' : ''
        }}
        className="font-semibold select-none"
      >
        GitHub
      </h1>
    </div>
  )
}