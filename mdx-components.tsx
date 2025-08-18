export function useMDXComponents(components: Record<string, any>) {
  return {
    // You could map Markdown components here (e.g., a → Next Link).
    ...components,
  }
}
