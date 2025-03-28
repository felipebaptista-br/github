import { useMemo } from "react"

export function useTokenValidation(token: string) {
  const isValid = useMemo(() => {
    const cleaned = token.trim()

    const patterns = [
      /^ghp_[A-Za-z0-9_]{36}$/,           // Personal Token
      /^github_pat_[A-Za-z0-9_]{30,}$/,   // Fine-grained Token
      /^gho_[A-Za-z0-9_]{36}$/,           // OAuth Token
    ]

    return patterns.some((pattern) => pattern.test(cleaned))
  }, [token])

  return { isValid }
}
