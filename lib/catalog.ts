export type Category = {
  slug: string
  name: string
  image: string
  description: string
}

export type Machine = {
  slug: string
  model: string
  category: string
  summary: string
  specs: { label: string; value: string }[]
}

export const categories: Category[] = [
  {
    slug: 'wheel-loaders',
    name: 'Фронтальные погрузчики',
    image: '/images/wheel-loader.png',
    description:
      'Основная специализация XGMA. Машины для карьеров, складов сыпучих материалов, строительства и коммунальных работ.',
  },
  {
    slug: 'excavators',
    name: 'Экскаваторы',
    image: '/images/excavator.png',
    description:
      'Гусеничные экскаваторы среднего и тяжёлого класса для земляных работ, карьеров и инфраструктурных проектов.',
  },
  {
    slug: 'motor-graders',
    name: 'Автогрейдеры',
    image: '/images/motor-grader.png',
    description: 'Планировка оснований, строительство и содержание дорог, профилирование откосов.',
  },
  {
    slug: 'road-rollers',
    name: 'Дорожные катки',
    image: '/images/road-roller.png',
    description: 'Вибрационные катки для уплотнения грунта, щебня и асфальтобетона.',
  },
  {
    slug: 'forklifts',
    name: 'Вилочные погрузчики',
    image: '/images/forklift.png',
    description: 'Дизельные погрузчики для складов, производств и терминалов.',
  },
]

export const machines: Machine[] = [
  {
    slug: 'xg955h',
    model: 'XG955H',
    category: 'wheel-loaders',
    summary: 'Универсальный 5-тонный погрузчик — самая востребованная модель для стройки и карьера.',
    specs: [
      { label: 'Грузоподъёмность', value: '5 т' },
      { label: 'Объём ковша', value: '≈ 3 м³' },
      { label: 'Двигатель', value: 'Дизель, ≈ 162 кВт' },
      { label: 'Эксплуатационная масса', value: '≈ 17 т' },
    ],
  },
  {
    slug: 'xg958h',
    model: 'XG958H',
    category: 'wheel-loaders',
    summary: 'Усиленная версия 5-тонного класса для интенсивной работы на сыпучих и скальных грунтах.',
    specs: [
      { label: 'Грузоподъёмность', value: '5–5,5 т' },
      { label: 'Объём ковша', value: '≈ 3–3,5 м³' },
      { label: 'Двигатель', value: 'Дизель, ≈ 162 кВт' },
      { label: 'Эксплуатационная масса', value: '≈ 17,5 т' },
    ],
  },
  {
    slug: 'xg935h',
    model: 'XG935H',
    category: 'wheel-loaders',
    summary: 'Компактный 3-тонный погрузчик для коммунальных служб, складов и небольших объектов.',
    specs: [
      { label: 'Грузоподъёмность', value: '3 т' },
      { label: 'Объём ковша', value: '≈ 1,8 м³' },
      { label: 'Двигатель', value: 'Дизель, ≈ 92 кВт' },
      { label: 'Эксплуатационная масса', value: '≈ 10 т' },
    ],
  },
  {
    slug: 'xg822',
    model: 'XG822',
    category: 'excavators',
    summary: 'Гусеничный экскаватор 22-тонного класса — оптимальный баланс производительности и расхода.',
    specs: [
      { label: 'Эксплуатационная масса', value: '≈ 22 т' },
      { label: 'Объём ковша', value: '≈ 1 м³' },
      { label: 'Двигатель', value: 'Дизель, ≈ 120 кВт' },
      { label: 'Макс. глубина копания', value: '≈ 6,6 м' },
    ],
  },
  {
    slug: 'xg836',
    model: 'XG836',
    category: 'excavators',
    summary: 'Тяжёлый экскаватор для карьеров и крупных земляных работ.',
    specs: [
      { label: 'Эксплуатационная масса', value: '≈ 36 т' },
      { label: 'Объём ковша', value: '≈ 1,6 м³' },
      { label: 'Двигатель', value: 'Дизель, ≈ 200 кВт' },
      { label: 'Макс. глубина копания', value: '≈ 7,4 м' },
    ],
  },
  {
    slug: 'xg3200',
    model: 'XG3200',
    category: 'motor-graders',
    summary: 'Автогрейдер мощностью около 200 л.с. для дорожного строительства и содержания дорог.',
    specs: [
      { label: 'Мощность', value: '≈ 200 л.с.' },
      { label: 'Ширина отвала', value: '≈ 3,9 м' },
      { label: 'Эксплуатационная масса', value: '≈ 16 т' },
      { label: 'Привод', value: '6×4' },
    ],
  },
  {
    slug: 'xg6203',
    model: 'XG6203',
    category: 'road-rollers',
    summary: 'Одновальцовый вибрационный каток 20-тонного класса для уплотнения грунтов.',
    specs: [
      { label: 'Рабочая масса', value: '≈ 20 т' },
      { label: 'Ширина вальца', value: '≈ 2,1 м' },
      { label: 'Тип', value: 'Вибрационный, одновальцовый' },
      { label: 'Двигатель', value: 'Дизель' },
    ],
  },
  {
    slug: 'xf30',
    model: 'XF30',
    category: 'forklifts',
    summary: 'Дизельный вилочный погрузчик грузоподъёмностью 3 т для складов и производств.',
    specs: [
      { label: 'Грузоподъёмность', value: '3 т' },
      { label: 'Высота подъёма', value: '3 м (опции до 6 м)' },
      { label: 'Двигатель', value: 'Дизель' },
      { label: 'Шины', value: 'Пневматические / суперэластик' },
    ],
  },
]

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug)
}

export function getMachine(slug: string) {
  return machines.find((m) => m.slug === slug)
}
