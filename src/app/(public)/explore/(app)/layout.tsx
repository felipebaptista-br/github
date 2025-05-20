import React, { ReactNode } from "react"

type ExploreProps = Promise<{ sidebar: string }>

export default async function LayoutExplore(props: {
  children: ReactNode
  searchParams: ExploreProps
}) {
  const { children } = props

  return (
    <div>
      {children}
    </div>
  )
}