"use server"

import { AuthGitHubUser } from "@/@types/auth"

interface AuthByAccessTokenProps {
  accessToken: string
}

export async function authByAccessToken({ accessToken }: AuthByAccessTokenProps): Promise<AuthGitHubUser> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_GITHUB_WEB_URL}/user`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/vnd.github+json'
    }
  })

  if (!response.ok) {
    throw new Error('Não foi possível realizar a autenticação')
  }

  return response.json()
}