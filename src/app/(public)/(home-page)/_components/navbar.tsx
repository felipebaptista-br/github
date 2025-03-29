import React from "react"
import Logo from "@/components/logo"
import Link from "next/link"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { Button } from "@/components/ui/button"
import { MoveRight } from "lucide-react"


export default function NavBar() {
  return (
    <div className="w-screen h-16 fixed flex items-center justify-between px-32 bg-blue-950 shadow dark:shadow-neutral-600 dark:bg-neutral-950 z-20">
      <Logo mode="light" size={20} />
      <div className="w-auto flex items-center gap-3">
        <ModeToggle />
        <div className="flex items-end">
          <MoveRight size={25} className="animate-bounce text-white" />
          <Link href='/auth'>
            <Button>
              Começar
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}