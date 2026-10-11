export type CatalogImage = {
  src: string
  alt: string
  note?: string
}

const photo = (file: string, model: string, representative = false): CatalogImage => ({
  src: `/photos/catalog/${file}.webp`,
  alt: `Техника XGMA ${model} на нейтральном фоне`,
  ...(representative ? { note: `На фото ${model} — представитель типа техники` } : {}),
})
const illustration = (file: string, type: string): CatalogImage => ({
  src: `/photos/catalog/${file}-illustration.webp`,
  alt: `Иллюстрация: ${type}. Не фотография конкретной модели.`,
  note: 'Иллюстрация типа техники, не фото модели',
})

export const catalogImages: Record<string, CatalogImage> = {
  xg931n: photo('xg931n', 'XG931N'),
  xg936n: photo('xg936n', 'XG936N'),
  xg955n: photo('xg955n', 'XG955N'),
  xg956n: photo('xg956n', 'XG956N'),
  xg958n: photo('xg958n', 'XG958N'),
  xg968n: photo('xg968n', 'XG968N'),
  xg931h: photo('xg931h', 'XG931H'),
  xg932h: photo('xg932h', 'XG932H'),
  xg935h: photo('xg935h', 'XG935H'),
  xg955h: photo('xg955h', 'XG955H'),
  xg958h: photo('xg958h', 'XG958H'),
  xg918h: photo('xg918h', 'XG918H'),
  xg920n: photo('xg920', 'XG920', true),
  xg765n: photo('xg765e', 'XG765E', true),
  'xg765h-4tx': photo('xg765e', 'XG765E', true),
  ...Object.fromEntries(['xg9180t', 'xg9210t', 'xg9230t', 'xg9280t', 'xg9420t', 'xg9500t'].map(slug => [slug, photo('xg9280y', 'XG9280Y', true)])),
  'xg806f-xg809f': photo('xg809f', 'XG809F'),
  xg815: photo('xg815fl', 'XG815FL'),
  'xg822-xg825': photo('xg825el', 'XG825EL'),
  xg836: photo('xg836fl', 'XG836FL'),
  ...Object.fromEntries(['xg839el', 'xg852fl', 'xg870el', 'xg880el', 'xg899el', 'xg8110el', 'xg8135el'].map(slug => [slug, photo('xg848el', 'XG848EL', true)])),
  ...Object.fromEntries(['xg8075ws', 'xg8085wh', 'xg8105wj', 'xg8150w'].map(slug => [slug, photo('xg8125wh', 'XG8125WH', true)])),
  xg8125wh: photo('xg8125wh', 'XG8125WH'),
  ...Object.fromEntries(['xg3080r', 'xg3120r', 'xg3140r'].map(slug => [slug, photo('skid-steer', 'мини-погрузчик XGMA', true)])),
  'motor-grader': photo('motor-grader', 'XG3180C'),
  'vibratory-roller': photo('vibratory-roller', 'XG620H'),
  'pneumatic-roller': photo('pneumatic-roller', 'XG6201P'),
  'tandem-roller': photo('tandem-roller', 'XG6033D'),
  'walk-behind-roller': photo('walk-behind-roller', 'XG60051S'),
  bulldozer: photo('bulldozer', 'XG4161L'),
  'diesel-forklift-2-3-5t': photo('diesel-forklift-2-3-5t', 'дизельный погрузчик 2–3,5 т'),
  'diesel-forklift-3-5t': photo('diesel-forklift-3-5t', 'дизельный погрузчик 3–5 т'),
  'diesel-forklift-5-10t': photo('diesel-forklift-5-10t', 'дизельный погрузчик 8–10 т'),
  'electric-forklift-li': photo('electric-forklift-li', 'электрический погрузчик с литиевой АКБ'),
  'electric-forklift-lead-acid': photo('electric-forklift-lead-acid', 'электрический погрузчик со свинцово-кислотной АКБ'),
  'stacker-1-2t': illustration('stacker', 'электрический штабелёр'),
  'stacker-2-4t': illustration('stacker', 'электрический штабелёр'),
  'xg560s-dt2': photo('xg560s-dt2', 'XG560S-DT2'),
  ...Object.fromEntries(['xg90', 'xg105', 'xg136'].map(slug => [slug, illustration('mining-truck', 'карьерный самосвал')])),
  xg5400jxfjp48: illustration('fire-truck', 'пожарный автоподъёмник'),
  'epb-tbm': photo('epb-tbm', 'тоннелепроходческий щит EPB'),
}

export const categoryLabels: Record<string, string> = {
  'n-series': 'Фронтальный погрузчик · N-серия',
  'wheel-loaders': 'Фронтальный погрузчик · H-серия',
  'compact-loaders': 'Компактный погрузчик',
  'backhoe-loaders': 'Экскаватор-погрузчик',
  'fork-loaders': 'Тяжёлый вилочный погрузчик',
  excavators: 'Гусеничный экскаватор',
  'wheel-excavators': 'Колёсный экскаватор',
  'skid-steer': 'Мини-погрузчик',
  road: 'Дорожная техника',
  industrial: 'Складская техника',
  'mining-trucks': 'Карьерный самосвал',
  'fire-trucks': 'Пожарная техника',
  tbm: 'Тоннелепроходческий комплекс',
}
