"use server"

import { AuthGitHubUser } from "@/@types/auth"

interface oAuthByCodeProps {
  code: string
}

export async function oAuthByCode({ code }: oAuthByCodeProps): Promise<AuthGitHubUser> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_GITHUB_URL}/login/oauth/access_token`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
      code,
    }),
  })

  // => Convertendo os dados para JSON
  const res = await response.json()

  // => Verificando a existência do Access-Token
  if (!res.access_token) {
    throw new Error('Não foi possível realizar a autenticação')
  }

  return res.access_token
}