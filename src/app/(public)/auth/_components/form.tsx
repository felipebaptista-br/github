'use client'

import React, {
  useCallback,
  useEffect,
  useState
} from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { authByAccessToken } from "../server-actions/auth"
import { useTokenValidation } from "@/hooks/use-token-validation"
import { Github, Loader2 } from "lucide-react"
import { AuthGitHubUser } from "@/@types/auth"
import { oAuthByCode } from "../server-actions/oauth"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

type TypeToken = 'ghp_' | 'github_pat_' | 'gho_'

interface AuthFormProps {
  code?: string
}

export default function AuthForm({ code }: AuthFormProps) {
  const router = useRouter()
  // => Variável que controla o estado do input digitado
  const [accessToken, setAccessToken] = useState<string>('')
  const [typeToken, setTypeToken] = useState<TypeToken>('ghp_')
  // => Variáveis de controle da aplicação
  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  // => Hook que faz a validação do AccessToken antes de submeter
  const { isValid } = useTokenValidation(accessToken)

  // => Função Client-Side para realizar a chamada para a Server-Action
  const onSubmitAuth = async () => {
    setIsSubmit(true)
    try {
      const response: AuthGitHubUser = await authByAccessToken({ accessToken })
      console.log(response)
      // => Retornando ao usuário um alerta
      toast.success('Autenticação realizada com sucesso', {
        description: 'Redirecionamento iniciado...'
      })
      // => Redirecionando o usuário para a tela autenticado
      router.push('/')
    } catch (error) {
      console.log(error)
      // => Retornando ao usuário um alerta
      toast.error('Access-Token inválido.', {
        description: 'Tente logar usando outro Access-Token ou acesse diretamente usando o GitHub. Se precisar de ajuda, use a opção: Não sei onde encontrar meu access-token.'
      })
      // => Setando os estados para permitir as ações do usuário
      setIsError(true)
      setIsSubmit(false)
    }
  }

  const onSubmitOAuth = useCallback(async (code: string) => {
    try {
      const response = await oAuthByCode({ code })
      console.log(response)
      // => Retornando ao usuário um alerta
      toast.success('Autenticação realizada com sucesso', {
        description: 'Redirecionamento iniciado...'
      })
      // => Redirecionando o usuário para a tela autenticado
      router.push('/')
    } catch (error) {
      console.log(error)
      // => Retornando ao usuário um alerta
      toast.error('Não foi possível logar usando o GitHub.', {
        description: 'Tente novamente ou use um Access-Token diretamente no campo para acessar.'
      })
      // => Setando os estados para permitir as ações do usuário
      setIsSubmit(false)
      // => Alterando a rota para remover o componente de modal
      router.push('/auth')
    }
  }, [router])

  // => Função para identificar um Token ao digitar
  const getTokenType = (token: string): TypeToken | null => {
    // => Removendo espaços extras entre o início e o fim
    const cleaned = token.trim().toLowerCase()
    // => Identificando se os valores iniciais condizem com algum tipo de Token válido
    if (cleaned.startsWith('ghp_')) return 'ghp_'
    if (cleaned.startsWith('github_pat_')) return 'github_pat_'
    if (cleaned.startsWith('gho_')) return 'gho_'
    // => Caso não encontremos, apenas retornamos null
    return null
  }

  useEffect(() => {
    // => Caso receber um code por parâmetro, significa que existe um callBack de autênticação do GitHub
    // => Nesse caso, vamos chamar o submit do OAuth enviando o parâmetro e receber um Token
    if (code) {
      setIsSubmit(true)
      onSubmitOAuth(code)
    }
  }, [code, onSubmitOAuth])

  useEffect(() => {
    // => Sincroniza o valor do input ao mudar manualmente o tipo no select
    setAccessToken(typeToken)
  }, [typeToken])

  useEffect(() => {
    const detectedType = getTokenType(accessToken)
    // => Aqui, validamos se o valor detectado condiz com um tipo válido de token
    // => Caso encontremos, vamos setar e atualizar o valor de type-token
    if (detectedType && detectedType !== typeToken) { setTypeToken(detectedType) }
  }, [accessToken])

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="w-full flex flex-col gap-2">
        <Select
          value={typeToken}
          defaultValue={typeToken}
          onValueChange={(value: string) => setTypeToken(value as TypeToken)}
          disabled={isSubmit}
        >
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder="Selecione o tipo de Token"
              className="uppercase"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              value="ghp_"
            >
              Token Pessoal
            </SelectItem>
            <SelectItem
              value="github_pat_"
            >
              Token Fine-Grained
            </SelectItem>
            <SelectItem
              value="gho_"
            >
              Token OAuth
            </SelectItem>
          </SelectContent>
        </Select>
        <div className="w-full flex items-center gap-2.5">
          <Badge>
            {typeToken}
          </Badge>
          <Input
            value={accessToken}
            onChange={(event) => setAccessToken(event.target.value)}
            placeholder="Access-Token"
            className={`${isError && 'border border-red-500'}`}
            disabled={isSubmit}
          />
        </div>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens"
          className="text-[12px] text-blue-900 dark:text-blue-100 hover:decoration-1"
        >
          Não sabe onde encontrar seu access-token?
        </a>
      </div>
      <div className="w-full flex flex-col gap-2">
        <Button
          disabled={!isValid || isSubmit}
          onClick={onSubmitAuth}
        >
          {!isSubmit ? (
            <span>
              Enviar
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Loader2 size={15} className="animate-spin" />
              Enviando...
            </span>
          )}
        </Button>
        <Button
          variant='outline'
          disabled={isSubmit}
          onClick={() => {
            window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&scope=read:user`
          }}
        >
          <Github size={15} />
          Entrar com GitHub
        </Button>
      </div>
    </div>
  )
}