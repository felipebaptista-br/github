"use client"

import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

interface DotLottieAnimationProps {
  url: string
}

export default function DotLottieAnimation({ url }: DotLottieAnimationProps) {
  return (
    <DotLottieReact
      src={url}
      loop
      autoplay
    />
  )
}