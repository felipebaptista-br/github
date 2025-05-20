import React from "react"
import { Coffee } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface MaintanceProps {
  href?: string
  message?: string
}

export default function Maintance({ href, message }: MaintanceProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-background text-foreground px-4 text-center">
      <div className="flex flex-col items-center gap-4 max-w-md">
        <Coffee className="w-14 h-14 text-muted-foreground animate-bounce" />
        <h1 className="text-2xl font-semibold">Estamos passando um cafézinho ☕</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {message ||
            "Às vezes, até os melhores sistemas precisam de uma pausa. Enquanto isso, aproveite um café por nossa conta e volte em instantes."}
        </p>
        {href && (
          <Link href={href}>
            <Button
              variant="default"
              className="mt-6"
            >
              Tentar novamente
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
