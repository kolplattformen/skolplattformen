export const parseDate = (input?: string): string | undefined => {
  if (!input) {
    return undefined
  }

  return new Date(input).toISOString()
}
