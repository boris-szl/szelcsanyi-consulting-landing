/*
  Fails if an English string leaks onto a German page.

  Localisation regressions are quiet: a missing translation renders the
  English source and nothing errors. These markers are things that can only
  come from untranslated data — "— now" from a project period, English UI
  labels from a dictionary miss.
*/
import { readFileSync } from 'node:fs'
import { globSync } from 'node:fs'

const MARKERS = [
  '— now',
  'All writing',
  'Read the case',
  'Book a call',
  'Next up',
  'About the role',
  'How to apply',
  'Related reading',
  'In short',
  'Vienna &amp; St. Gallen',
]

const pages = globSync('dist/de/**/index.html')
let failures = 0

for (const file of pages) {
  const html = readFileSync(file, 'utf8')
  for (const marker of MARKERS) {
    if (html.includes(marker)) {
      failures++
      console.error(`  ${file.replace('dist', '')}: untranslated "${marker}"`)
    }
  }
}

if (failures) {
  console.error(`\ni18n check failed: ${failures} untranslated string(s) on German pages`)
  process.exit(1)
}
console.log(`i18n check passed — ${pages.length} German pages clean`)
