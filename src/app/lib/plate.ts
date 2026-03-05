export function formatPlate(value: string) {
  const clean = value.replace(/[^A-Z0-9]/gi, "").toUpperCase()

  if (clean.length <= 2) return clean

  if (clean.length <= 4) {
    return clean.slice(0,2) + "-" + clean.slice(2)
  }

  return clean.slice(0,2) + "-" + clean.slice(2,4) + "-" + clean.slice(4,6)
}