"use client"
import React, { HTMLAttributes, useState } from "react"
import { Loader2, MoveLeft, MoveRight } from "lucide-react"
import { getUserByGithubUsername } from "../server-actions/user"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export default function FormGitHubUser({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const router = useRouter()
  // => Variável de contole de estado do input
  const [username, setUsername] = useState<string>('')
  const [isSubmit, setIsSubmit] = useState<boolean>(false)

  // => Submetendo o formulário para a chamada de Server-Action
  const onSubmitGitHubUser = async (username: string) => {
    setIsSubmit(true)
    try {
      await getUserByGithubUsername({ username })
      // => Vamos retornar ao usuário o encontro do user-name
      toast.success("Show!", {
        description: `Redirecionando para a listagem de repositórios do usuário ${username}`
      })

      // => Encontramos o user-name? Show! Agora vamos redirecionar para a página de repositórios
      // => O user-name será enviado por searchParams e recuperado na outra página
      router.push(`/explore/repositories?username=${username}`)

    } catch (error) {
      console.log(error)
      toast.error("Oops", {
        description: `Não conseguimos encontrar o user-name ${username}`
      })
    } finally {
      // => Alterando o controlador para liberar o campo ao usuário
      setIsSubmit(false)
    }
  }

  return (
    <div
      className={cn("w-2/3 flex items-center gap-4", className)}
      {...props}
    >
      <div className="flex-1 flex items-end">
        {!username && (
          <MoveRight size={25} className="animate-bounce" />
        )}
        <Input
          placeholder="username github"
          value={username}
          onChange={(event) => {
            const valueRemoveSpaces = event.target.value.replace(/\s/g, '')
            setUsername(valueRemoveSpaces)
          }}
          onKeyDown={(event) => {
            if (event.key === ' ') {
              event.preventDefault()
            }
          }}
          disabled={isSubmit}
        />
        {!username && (
          <MoveLeft size={25} className="animate-bounce" />
        )}
      </div>
      <div className="flex items-end">
        {username && (
          <MoveRight
            size={25}
            className="animate-bounce text-blue-500"
          />
        )}
        <Button
          disabled={!username || isSubmit}
          onClick={() => onSubmitGitHubUser(username)}
        >
          {!isSubmit ? 'Procurar' : (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin" size={15} />
              Procurando...
            </span>
          )}
        </Button>
      </div>
    </div>
  )
}