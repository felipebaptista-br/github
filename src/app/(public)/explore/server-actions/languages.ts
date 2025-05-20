"use server"

interface getUserTopLanguagesByUsernameProps {
  username: string
}

export async function getUserTopLanguagesByUsername({
  username
}: getUserTopLanguagesByUsernameProps): Promise<string[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_GITHUB_API_URL}/users/${username}/repos?per_page=100`, {
    method: "GET",
    cache: "no-store"
  })

  if (!response.ok) {
    throw new Error("Não foi possível buscar os repositórios")
  }

  const repos = await response.json()

  const languageCount: Record<string, number> = {}

  for (const repo of repos) {
    const lang = repo.language
    if (lang) {
      languageCount[lang] = (languageCount[lang] || 0) + 1
    }
  }

  const topLanguages = Object.entries(languageCount)
    // => Filtrando do mais usado para o menos usado
    .sort((a, b) => b[1] - a[1])
    // => Pegando as top 3 linguagens mais usadas
    .slice(0, 3)
    .map(([lang]) => lang)

  return topLanguages
}
