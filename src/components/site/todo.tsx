/**
 * Visible placeholder for a fact we don't have yet (legal data, contact details).
 * Search the code for "<Todo" before going live: every one must be replaced.
 */
export function Todo({ children }: { children: React.ReactNode }) {
  return (
    <mark className="rounded bg-amber-200 px-1 text-amber-950 dark:bg-amber-300">
      [Angabe fehlt: {children}]
    </mark>
  )
}
