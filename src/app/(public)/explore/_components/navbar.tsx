import React from "react"
// import Link from "next/link"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface NavBarProviderProps {
  isAuthenticated: boolean
  name?: string
}

export function NavBar({  }: NavBarProviderProps) {

  return (
    <nav className="absolute top-0 w-screen h-28 flex items-center justify-end px-24">
      <div className="flex items-center gap-2.5">
        <ModeToggle />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-full flex items-center justify-center">
                {/* <Link href='/auth'> */}
                <Button disabled className="flex items-center">
                  <LogIn className="w-4 h-4" />
                  Entrar com LogIn
                </Button>
                {/* </Link> */}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              Temporariamente indisponível
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </nav>
  )
}