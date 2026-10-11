import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { writeFile, readFile, mkdir } from 'node:fs/promises'

const exec = promisify(execFile)
const root = new URL('../', import.meta.url)
const assetDir = new URL('public/photos/catalog/', root)
const indexFile = new URL('scripts/catalog-photo-sources.json', root)
async function download(url) {
  const { stdout } = await exec('curl', ['-fLs', '--max-time', '25', url], { encoding: 'buffer', maxBuffer: 20 * 1024 * 1024 })
  return stdout
}
async function pool(items, fn) {
  let cursor = 0
  await Promise.all(Array.from({ length: 5 }, async () => {
    while (cursor < items.length) await fn(items[cursor++])
  }))
}

if (process.argv.includes('--discover')) {
  const categories = ['wheel_loader', 'crawler_excavator', 'large_excavator', 'small_excavator', 'roller', 'grader', 'bulldozer', 'forklift_truck', 'forklift_loader', 'wheel_excavators', 'skid_steer_loader', 'backhoe_loader', 'shield_machine', 'dump_station', 'truck_crane']
  const records = new Map()
  async function scan(url, paginate = false) {
    try {
      const html = (await download(url)).toString()
      for (const match of html.matchAll(/<a\s+href="([^"]+)"[^>]*>\s*<img\s+src="([^"]+)"\s+alt="(XGMA[^"]+)"/g)) {
        records.set(match[1], { page: match[1], image: match[2], name: match[3] })
      }
      if (paginate) {
        const pages = [...new Set([...html.matchAll(/href="([^"]+\?p=\d+)"/g)].map(m => m[1]))]
        for (const page of pages) await scan(page)
      }
      console.log('Scanned', url, records.size)
    } catch (error) { console.error('Source unavailable', url, error.message.slice(0, 100)) }
  }
  await pool(categories, category => scan(`https://product.global-ce.com/${category}/xgma/`, true))
  await writeFile(indexFile, JSON.stringify([...records.values()], null, 2) + '\n')
  console.log('Indexed', records.size, 'photographs')
}

if (process.argv.includes('--select')) {
  const records = JSON.parse(await readFile(indexFile, 'utf8'))
  const choices = {
    xg958n: 'XGMA XG958N Wheel loader', xg956n: 'XGMA XG956N Wheel loader',
    xg955n: 'XGMA XG955N Wheel loader', xg968n: 'XGMA XG968N Wheel loader',
    xg931h: 'XGMA XG931H Wheel Loader', xg932h: 'XGMA XG932H Wheel Loader',
    xg935h: 'XGMA XG935H Wheel Loader', xg955h: 'XGMA XG955H Wheel Loader',
    xg958h: 'XGMA XG958H Wheel Loader', xg920: 'XGMA XG920 Loader',
    xg765e: 'XGMA XG765E Backhoe Loader', xg9280y: 'XGMA XG9280Y Fork loader',
    xg809f: 'XGMA XG809F Crawler Excavator', xg815fl: 'XGMA XG815FL Crawler hydraulic excavator',
    xg825el: 'XGMA XG825EL Excavator', xg836fl: 'XGMA XG836FL Crawler hydraulic excavator',
    xg848el: 'XGMA XG848EL Crawler Excavator',
    'motor-grader': 'XGMA XG3180C Motor grader', 'vibratory-roller': 'XGMA XG620H Fully hydraulic single drum roller',
    'pneumatic-roller': 'XGMA XG6201P Tyre roller', 'tandem-roller': 'XGMA XG6033D Small Double Steel Wheel Roller',
    'walk-behind-roller': 'XGMA XG60051S Walk-behind roller', bulldozer: 'XGMA XG4161L Bulldozer',
    'diesel-forklift-2-3-5t': 'XGMA 2-3.5Ton Forklift Truck', 'diesel-forklift-3-5t': 'XGMA 3-5Ton Forklift Truck',
    'diesel-forklift-5-10t': 'XGMA 8-10Ton Forklift Truck',
    'electric-forklift-li': 'XGMA 1.6-3.5Ton（Lithium Battery） Forklift Truck',
    'electric-forklift-lead-acid': 'XGMA 1.6-3.5ton ( Lead-acid Battery) Forklift Truck',
    'xg560s-dt2': 'XGMA XG560S-DT2 Forklift Truck', 'epb-tbm': 'XGMA Earth pressure balance shield',
    'skid-steer': 'XGMA S10R/XG30090/S08V/S07R Skid Steer Loader',
  }
  const selections = Object.entries(choices).map(([key, name]) => {
    const record = records.find(record => record.name === name)
    if (!record) throw new Error(`Missing source: ${name}`)
    return { ...record, file: `${key}.webp` }
  })
  selections.push(
    { file: 'xg931n.webp', name: 'XGMA XG931N', page: 'https://xgma.ru/frontal_loaders', image: 'https://static.tildacdn.com/tild6537-3865-4133-a238-653833333239/931.png' },
    { file: 'xg936n.webp', name: 'XGMA XG936N', page: 'https://xgma.ru/frontal_loaders', image: 'https://static.tildacdn.com/tild3466-3939-4438-b739-383436303237/936n.jpg' },
    { file: 'xg918h.webp', name: 'XGMA XG918H', page: 'https://xgma.ru/frontal_loaders', image: 'https://static.tildacdn.com/tild3936-3961-4261-a631-376161636139/918.png' },
  )
  await writeFile(new URL('scripts/catalog-photo-selection.json', root), JSON.stringify(selections, null, 2) + '\n')
}

if (process.argv.includes('--illustrations') || process.argv.includes('--sheet')) {
  const { default: sharp } = await import(process.env.SHARP_MODULE || 'sharp')
  const { readdir } = await import('node:fs/promises')
  if (process.argv.includes('--illustrations')) {
    for (const name of ['mining-truck', 'fire-truck', 'stacker']) {
      const cropped = await sharp(new URL(`${name}-illustration.png`, assetDir).pathname).flatten({ background: '#ffffff' }).trim({ background: '#ffffff', threshold: 24 }).toBuffer()
      await sharp(cropped).resize(1000, 720, { fit: 'contain', background: '#ffffff' }).webp({ quality: 86 }).toFile(new URL(`${name}-illustration.webp`, assetDir).pathname)
    }
  }
  if (process.argv.includes('--sheet')) {
    const files = (await readdir(assetDir)).filter(name => name.endsWith('.webp')).sort()
    const tiles = await Promise.all(files.map(async (name, index) => ({ input: await sharp(new URL(name, assetDir).pathname).resize(240, 180, { fit: 'contain', background: '#ffffff' }).extend({ bottom: 28, top: 0, left: 0, right: 0, background: '#ffffff' }).composite([{ input: Buffer.from(`<svg width="240" height="28"><text x="6" y="20" font-size="13" fill="#172330">${name}</text></svg>`), top: 180, left: 0 }]).png().toBuffer(), left: (index % 4) * 240, top: Math.floor(index / 4) * 208 })))
    await sharp({ create: { width: 960, height: Math.ceil(files.length / 4) * 208, channels: 3, background: '#ffffff' } }).composite(tiles).jpeg({ quality: 85 }).toFile('/tmp/catalog-contact-sheet.jpg')
    console.log('Contact sheet created:', files.length, 'images')
  }
}

if (process.argv.includes('--prepare')) {
  const { default: sharp } = await import(process.env.SHARP_MODULE || 'sharp')
  await mkdir(assetDir, { recursive: true })
  const selections = JSON.parse(await readFile(new URL('scripts/catalog-photo-selection.json', root), 'utf8'))
  await pool(selections, async item => {
    try {
      const bytes = item.file === 'xg931n.webp' ? await readFile(new URL('xg931n-dealer.png', assetDir)) : await download(item.image)
      const input = sharp(bytes).rotate().flatten({ background: '#ffffff' })
      const cropped = await input.trim({ background: '#ffffff', threshold: 24 }).toBuffer()
      await sharp(cropped).resize(1000, 720, { fit: 'contain', background: '#ffffff' }).webp({ quality: 88 }).toFile(new URL(item.file, assetDir).pathname)
      console.log('Prepared', item.file)
    } catch (error) { console.error('FAILED', item.file, error.message.slice(0, 200)); process.exitCode = 1 }
  })
}
