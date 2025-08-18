import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: ['./src/**/*.{ts,tsx,md,mdx}'],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [typography],
}
export default config
