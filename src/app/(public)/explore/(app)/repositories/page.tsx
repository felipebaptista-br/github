import React from "react"
import { getUserRepositoriesByUsername } from "@/server-actions/repositories"
import { getUserTopLanguagesByUsername } from "@/server-actions/languages"
import { getUserByGithubUsername } from "@/server-actions/user"
import { GitHubUserRepo } from "@/@types/repositories"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { GitHubUser } from "@/@types/user"
import { RepoCard } from "@/components/layout/repos-card"
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
import Logo from "@/components/logo"
// import Link from "next/link"

type ExploreRepositoriesProps = Promise<{ username?: string }>

export default async function ExploreRepositories(props: {
  searchParams: ExploreRepositoriesProps
}) {
  // => Recuperando o user-name pelos parâmetros da url
  const { username } = await props.searchParams
  // => Caso não haja user-name, retornaremos para a página de busca de user-name
  if (!username) { redirect('/explore') }

  try {
    // => Fazendo as requisições para a API do GitHub
    const user: GitHubUser = await getUserByGithubUsername({ username })
    const repos: GitHubUserRepo[] | [] = await getUserRepositoriesByUsername({ username })
    const langs: string[] = await getUserTopLanguagesByUsername({ username })

    // => Renderizando caso o usuário seja encontrado
    return (
      <div className="w-screen h-screen flex flex-col overflow-hidden">
        <div className="w-screen flex items-center justify-between py-3.5 px-5 dark:bg-black border dark:border-zinc-800 shadow-md bg-background">
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
        <div className="w-full flex flex-1 overflow-hidden">
          <div className="w-1/5 h-full">
            <UserGitHubCard gitHubUser={user} langs={langs} />
          </div>
          {repos.length > 0
            ? (
              <div className="w-4/5 h-full max-h-full p-5 bg-zinc-100 dark:bg-zinc-950 overflow-y-auto">
                <div className="grid grid-cols-4 auto-rows-[minmax(0,1fr)] gap-5">
                  {repos.map((repo) => (
                    <RepoCard key={repo.full_name} repo={repo} />
                  ))}
                </div>
              </div>
            )
            : (
              <div className="w-4/5 h-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-950">
                <div className="text-center space-y-2">
                  <div className="flex justify-center text-zinc-500 dark:text-zinc-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 9.75h.008v.008H9.75V9.75zM14.25 9.75h.008v.008h-.008V9.75zM12 15.75c1.5 0 2.75-1.25 2.75-2.75h-5.5c0 1.5 1.25 2.75 2.75 2.75z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-zinc-600 dark:text-zinc-300">
                    Nenhum repositório encontrado
                  </h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    O usuário pode não ter repositórios públicos ou o nome está incorreto.
                  </p>
                </div>
              </div>
            )}
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