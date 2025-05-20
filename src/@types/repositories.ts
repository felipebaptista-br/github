export interface GitHubUserRepo {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  fork: boolean
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  created_at: string
  owner: {
    login: string
    id: number
    avatar_url: string
    html_url: string
  }
}
