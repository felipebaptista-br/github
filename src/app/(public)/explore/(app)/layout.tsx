import React, { ReactNode } from "react"

export default async function LayoutExplore(props: {
  children: ReactNode
}) {
  const { children } = props

  return (
    <div>
      {children}
    </div>
  )
}