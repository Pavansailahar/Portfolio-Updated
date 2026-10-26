/** Deterministic pseudo-data for decorative/illustrative charts (no real metrics). */
export function wave(n: number, seed = 1, base = 50, amp = 18) {
  return Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1)
    const v =
      base +
      amp * Math.sin(t * Math.PI * 2.2 + seed) * 0.6 +
      amp * Math.sin(t * Math.PI * 5.3 + seed * 2) * 0.25 +
      t * amp * 0.9
    return Math.round(v * 10) / 10
  })
}
