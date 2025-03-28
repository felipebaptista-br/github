import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Loader2, Github } from "lucide-react"

export default function ProcessingOAuthModal() {
  return (
    <div className="w-screen h-screen flex items-center justify-center fixed inset-0 bg-neutral-950/80 z-50">
      <Card className="w-[360px] bg-neutral-900 text-white border border-neutral-700 shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-white">
            <Github size={22} />
            Autenticando com GitHub
          </CardTitle>
          <CardDescription className="text-neutral-400 mt-2">
            Aguarde enquanto finalizamos sua autenticação.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-4">
            <Loader2 className="animate-spin text-white" size={36} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-xs text-neutral-500">
            Isso pode levar alguns segundos...
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
