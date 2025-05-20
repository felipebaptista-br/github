import React from "react"
// import { getUserRepositoriesByUsername } from "../../server-actions/repositories"
import { getUserTopLanguagesByUsername } from "../../server-actions/languages"
import { getUserByGithubUsername } from "../../server-actions/user"
// import { GitHubUserRepo } from "@/@types/repositories"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { GitHubUser } from "@/@types/user"
// import { RepoCard } from "@/components/layout/repos-card"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import UserGitHubCard from "@/components/layout/user-github"
import FormGitHubUser from "../../_components/form-user"
import Maintance from "@/components/layout/maintance"
import Logo from "@/components/logo"
// import Link from "next/link"

export default async function ExploreRepositories({
  searchParams,
}: {
  searchParams: { username?: string }
}) {
  try {
    // => Recuperando o user-name pelos parâmetros da url
    const username = searchParams?.username
    // => Caso não haja user-name, retornaremos para a página de busca de user-name
    if (!username) { redirect('/explore') }

    // => Fazendo as requisições para a API do GitHub
    const user: GitHubUser = await getUserByGithubUsername({ username })
    // const repos: GitHubUserRepo[] | [] = await getUserRepositoriesByUsername({ username })
    const langs: string[] = await getUserTopLanguagesByUsername({ username })

    // => Renderizando caso o usuário seja encontrado
    return (
      <div className="w-screen h-screen flex flex-col">
        <div className="w-screen flex items-center justify-between py-3.5 px-5 dark:bg-black shadow-md bg-background">
          <Logo size={20} />
          <FormGitHubUser className="w-[400px]" />
          <div className="w-auto flex items-center justify-center gap-2.5">
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
        </div>
        <div className="w-full h-full flex">
          <div className="w-1/4 h-full">
            <UserGitHubCard gitHubUser={user} langs={langs} />
          </div>
          <div className="w-3/4 h-full overflow-y-auto">
            {/* {repos.map((repo) => (
              <RepoCard key={repo.full_name} repo={repo} />
            ))} */}
            <Maintance />
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.log(error)
    // => Se não encontrarmos o usuário via api, vamos retornar a página de busca
    // => Essa medida é para tornar a aplicação robusta caso o usuário tente selecionar um user-name por Search-Params manualmente
    redirect('/explore')
  }
}