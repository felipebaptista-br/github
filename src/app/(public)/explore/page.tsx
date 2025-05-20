import React from "react"
import DotLottieAnimation from "@/components/dot-lottie-animation"
import FormGitHubUser from "./_components/form-user"
import { NavBar } from "./_components/navbar"

export default function Explore() {

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <NavBar isAuthenticated={false} />
      <div className="w-1/3 flex flex-col items-center justify-center gap-10">
        <h1 className="text-4xl text-center">
          <span className="font-bold mr-1 bg-gradient-to-r from-blue-500 to-blue-300 dark:from-blue-400 dark:to-blue-600 text-transparent bg-clip-text">
            Explore,
          </span>
          <span>
            começe procurando por um nome de usuário no Github
          </span>
        </h1>
        <FormGitHubUser />
        <DotLottieAnimation url="https://lottie.host/170dd3a2-707a-422f-9398-95c9180cd563/1TI3CIdHSd.lottie" />
      </div>
    </div>
  )
}