"use client"
import {
  Star,
  GitFork
} from "lucide-react"
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent
} from "@/components/ui/card"
import { GitHubUserRepo } from "@/@types/repositories"
import { formatDistanceToNow } from "date-fns"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ptBR } from "date-fns/locale"

interface RepoCardProps {
  repo: GitHubUserRepo
}

export function RepoCard({ repo }: RepoCardProps) {
  const {
    name,
    description,
    language,
    stargazers_count,
    forks_count,
    updated_at,
    owner
  } = repo

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          <a
            href={`https://github.com/${owner.login}/${name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {name}
          </a>
        </CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          {language && <Badge variant="outline">{language}</Badge>}
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4" /> {stargazers_count}
          </div>
          <div className="flex items-center gap-1">
            <GitFork className="h-4 w-4" /> {forks_count}
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Atualizado {formatDistanceToNow(new Date(updated_at), { addSuffix: true, locale: ptBR })}
        </p>

        <Button asChild className="w-full">
          <a href={`/explore/repo/${owner.login}/${name}`}>Ver detalhamento</a>
        </Button>
      </CardContent>
    </Card>
  )
}
