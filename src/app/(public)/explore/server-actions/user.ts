"use server"

import { GitHubUser } from "@/@types/user"

interface getUserByGithubUsernameProps {
  username: string
}

export async function getUserByGithubUsername({ username }: getUserByGithubUsernameProps): Promise<GitHubUser> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_GITHUB_API_URL}/users/${username}`, {
    method: 'GET',
    cache: 'no-store'
  })
  
  if (!response.ok) {
    throw new Error('Não foi possível realizar a autenticação')
  }

  return response.json()
}