"use server"

import { GitHubUserRepo } from "@/@types/repositories"

interface getUserRepositoriesByUsernameProps {
  username: string
}

export async function getUserRepositoriesByUsername({ username }: getUserRepositoriesByUsernameProps) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_GITHUB_API_URL}/users/${username}/repos?per_page=100&sort=updated`, {
    method: 'GET',
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error("Não foi possível buscar os repositórios do usuário.")
  }

  return await response.json()
}
