import React from "react"
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent
} from "@/components/ui/card"
import {
  Avatar,
  AvatarImage,
  AvatarFallback
} from "@/components/ui/avatar"
import {
  Globe,
  MapPin,
  Github,
  UserPlus
} from "lucide-react"
import { GitHubUser } from "@/@types/user"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface UserGitHubCardProps {
  gitHubUser: GitHubUser
  langs: string[]
}

const languageColors: Record<string, string> = {
  JavaScript: "bg-yellow-400 text-black",
  TypeScript: "bg-blue-500 text-white",
  Python: "bg-green-500 text-white",
  HTML: "bg-orange-500 text-white",
  CSS: "bg-indigo-500 text-white",
  Java: "bg-red-500 text-white",
  C: "bg-gray-500 text-white",
  "C++": "bg-purple-600 text-white",
  Go: "bg-cyan-600 text-white",
  Ruby: "bg-pink-500 text-white",
}

export default function UserGitHubCard({ gitHubUser, langs }: UserGitHubCardProps) {
  // => Desestruturando o objeto para facilitar o acesso às propriedades
  const {
    bio,
    blog,
    name,
    login,
    company,
    location,
    followers,
    following,
    created_at,
    avatar_url,
    public_repos,
  } = gitHubUser

  return (
    <Card className="w-full h-full shadow-md rounded-none">
      <div className="p-6 flex gap-5">
        <Avatar className="h-24 w-24 border-2 border-white shadow-lg">
          <AvatarImage src={avatar_url} alt={name || login} />
          <AvatarFallback>{(name || login)?.[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center space-y-1">
          <CardTitle className="text-2xl font-bold text-foreground">{name || login}</CardTitle>
          <p className="text-sm text-muted-foreground">@{login}</p>
          {bio && <p className="text-sm text-muted-foreground">{bio}</p>}
        </div>
      </div>

      <CardContent className="space-y-6 pt-6 pb-8 px-6">
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {location}
            </span>
          )}
          {company && (
            <span className="flex items-center gap-1">
              <UserPlus className="h-4 w-4" />
              {company}
            </span>
          )}
          {blog && (
            <span className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              <a
                href={blog.startsWith("http") ? blog : `https://${blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary transition-colors"
              >
                Website
              </a>
            </span>
          )}
        </div>

        <div className="grid grid-cols-3 text-center border rounded-lg divide-x text-muted-foreground shadow-inner overflow-hidden">
          <div className="py-3">
            <div className="text-xl font-bold text-foreground">{public_repos}</div>
            <div className="text-xs">Repositórios</div>
          </div>
          <div className="py-3">
            <div className="text-xl font-bold text-foreground">{followers}</div>
            <div className="text-xs">Seguidores</div>
          </div>
          <div className="py-3">
            <div className="text-xl font-bold text-foreground">{following}</div>
            <div className="text-xs">Seguindo</div>
          </div>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-1">📅 Membro desde:</p>
          <span className="text-sm font-medium">
            {new Date(created_at).toLocaleDateString("pt-BR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </span>
        </div>

        {langs.length > 0 && (
          <div className="flex flex-col gap-2.5">
            <p className="text-xs text-muted-foreground mb-1">🏷️ Linguagens mais usadas:</p>
            <div className="flex flex-wrap gap-2">
              {langs.slice(0, 3).map((lang) => (
                <Badge
                  key={lang}
                  className={`rounded-full px-2 py-1 text-xs font-medium ${languageColors[lang] || "bg-gray-300 text-black"
                    }`}
                >
                  {lang}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}