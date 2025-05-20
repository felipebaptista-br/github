import React from "react"
import ProcessingOAuthModal from "./_components/processing-oauth"
import AuthForm from "./_components/form"
import Logo from "@/components/logo"
import Link from "next/link"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Search,
  Github,
  Activity,
  TrendingUp,
  Lock,
  EyeOff,
  GitPullRequest,
  GaugeCircle,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { version } from "@/version"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

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
      <div className="w-1/2 h-full flex items-center justify-center p-14">
        <Tabs defaultValue="explore" className="w-1/2">
          <TabsList className="w-full">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="w-1/2 flex items-center justify-center">
                    <TabsTrigger disabled value="control"><Lock size={15} /> Control</TabsTrigger>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  Temporariamente indisponível
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TabsTrigger value="explore">Explore</TabsTrigger>
          </TabsList>
          <TabsContent value="control">
            <div className="w-full flex flex-col items-center justify-center gap-20 pt-10">
              <div className="w-full flex flex-col items-center justify-center gap-6">
                <h1 className="text-4xl font-bold text-neutral-900 dark:text-white">
                  Entrar
                </h1>
                <p className="text-neutral-800 dark:text-neutral-100 text-center">
                  Aqui você poderá logar com seu Access-Token para acessar a plataforma logado ou entrar através do próprio GitHub.
                </p>
              </div>
              <div className="w-full">
                <AuthForm code={code} />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="explore">
            <div className="w-full flex flex-col items-center justify-center gap-20 pt-10">
              <div className="h-[440px] w-full flex flex-col items-start justify-start gap-5">
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
                  Explore
                </h1>
                <p className="text-neutral-800 dark:text-neutral-100 text-start">
                  O Explore é a versão pública da aplicação, onde você pode visualizar informações abertas do GitHub sem precisar fazer login.
                </p>
                <Accordion
                  defaultValue="features"
                  type="single"
                  collapsible
                  className="w-full max-w-xl mx-auto"
                >
                  <AccordionItem value="features">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span>O que você pode fazer</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <Search className="w-4 h-4 text-muted-foreground" />
                          Buscar usuários e repositórios públicos
                        </li>
                        <li className="flex items-center gap-2">
                          <Activity className="w-4 h-4 text-muted-foreground" />
                          Visualizar atividade recente como commits e releases
                        </li>
                        <li className="flex items-center gap-2">
                          <Github className="w-4 h-4 text-muted-foreground" />
                          Acompanhar estatísticas de contribuição de repositórios
                        </li>
                        <li className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-muted-foreground" />
                          Explorar projetos populares ou em destaque
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="limitations">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-yellow-600" />
                        <span>Limitações</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <Lock className="w-4 h-4 text-muted-foreground" />
                          Somente dados públicos estão disponíveis
                        </li>
                        <li className="flex items-center gap-2">
                          <EyeOff className="w-4 h-4 text-muted-foreground" />
                          Não é possível visualizar repositórios privados
                        </li>
                        <li className="flex items-center gap-2">
                          <GitPullRequest className="w-4 h-4 text-muted-foreground" />
                          Não é possível interagir com issues, pull requests ou notificações
                        </li>
                        <li className="flex items-center gap-2">
                          <GaugeCircle className="w-4 h-4 text-muted-foreground" />
                          Limite de até <strong>60 requisições por hora</strong> sem autenticação
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Link href='/explore'>
                  <Button>
                    Entrar sem fazer login
                  </Button>
                </Link>
              </div>
            </div>
          </TabsContent>
        </Tabs>
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