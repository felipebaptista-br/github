import React from "react"
import ProcessingOAuthModal from "./_components/processing-oauth"
import AuthForm from "./_components/form"
import Logo from "@/components/logo"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { version } from "@/version"
import { Badge } from "@/components/ui/badge"

type AuthParamsProps = Promise<{ code: string }>

export default async function Auth(props: {
  searchParams: AuthParamsProps
}) {
  // => Recebendo o callback de autenticação com Github
  const { code } = await props.searchParams

  return (
    <div className="h-screen w-screen flex">
      <div className="w-screen h-20 absolute flex items-center justify-end px-14">
        <ModeToggle />
      </div>
      <IntroductionSection />
      <div className="w-1/2 h-full flex flex-col items-center justify-center gap-20 p-14">
        <div className="w-1/2 flex flex-col items-center justify-center gap-6">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white">
            Entrar
          </h1>
          <p className="text-neutral-800 dark:text-neutral-100 text-center">
            Aqui você poderá logar com seu Access-Token para acessar a plataforma logado ou entrar através do próprio GitHub.
          </p>
        </div>
        <div className="w-1/2">
          <AuthForm code={code} />
        </div>
      </div>
      {code && (<ProcessingOAuthModal />)}
    </div>
  )
}

function IntroductionSection() {
  return (
    <div className="w-1/2 h-full flex flex-col items-start justify-between bg-blue-950 p-14">
      <span />
      <div className="flex flex-col gap-4">
        <Logo
          size={50}
          mode="light"
        />
        <div className="w-full pr-28">
          <p className="text-neutral-100 text-xl italic pr-5">
            Visualize seu perfil do GitHub usando seu token pessoal.
            Acesse nome, bio, avatar, repositórios e estatísticas com segurança.
            Pronto para ser expandido com issues, linguagens e contribuições.
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col items-start gap-2">
        <p className="text-neutral-200 text-lg">
          © 2025
        </p>
        <p className="text-sm">Felipe Baptista Dev</p>
        <p className="text-white text-sm">
          Versão <Badge>{version}</Badge>
        </p>
      </div>
    </div>
  )
}