export type Topic = {
  slug: string
  title: string
  rubric: 'Обзор' | 'Эксплуатация' | 'Сервис' | 'Выбор техники' | 'Сравнение'
  brief: string
}

export const topics: Topic[] = [
  {
    slug: 'obzor-xg955h',
    title: 'Обзор фронтального погрузчика XGMA XG955H',
    rubric: 'Обзор',
    brief: 'Конструкция, ключевые узлы, сферы применения и сильные стороны модели XG955H.',
  },
  {
    slug: 'xg955h-vs-xg958h',
    title: 'XG955H или XG958H: какой погрузчик выбрать',
    rubric: 'Сравнение',
    brief: 'Сравнение двух популярных моделей 5-тонного класса XGMA для разных задач.',
  },
  {
    slug: 'pogruzchik-zimoy',
    title: 'Эксплуатация погрузчика XGMA зимой: подготовка и советы',
    rubric: 'Эксплуатация',
    brief: 'Подготовка к морозам, масла и жидкости, предпусковой подогрев, работа на снегу.',
  },
  {
    slug: 'to-pogruzchika-xgma',
    title: 'Регламент ТО фронтального погрузчика XGMA',
    rubric: 'Сервис',
    brief: 'Интервалы технического обслуживания, расходники, на что обращать внимание.',
  },
  {
    slug: 'vybor-ekskavatora-xgma',
    title: 'Как выбрать гусеничный экскаватор XGMA под задачи',
    rubric: 'Выбор техники',
    brief: 'Класс массы, ковш, ходовая, гидравлика — критерии выбора экскаватора XGMA.',
  },
  {
    slug: 'obzor-xg822',
    title: 'Экскаватор XGMA XG822: обзор 22-тонного класса',
    rubric: 'Обзор',
    brief: 'Характеристики, кабина, гидравлическая система и применение экскаватора XG822.',
  },
  {
    slug: 'avtogreyder-xgma',
    title: 'Автогрейдеры XGMA в дорожном строительстве',
    rubric: 'Обзор',
    brief: 'Задачи автогрейдера, особенности моделей XGMA, рабочее оборудование.',
  },
  {
    slug: 'katok-xgma-uplotnenie',
    title: 'Вибрационные катки XGMA: как добиться качественного уплотнения',
    rubric: 'Эксплуатация',
    brief: 'Режимы вибрации, число проходов, работа с разными типами грунта.',
  },
  {
    slug: 'kitayskaya-tehnika-mify',
    title: 'Китайская спецтехника: мифы и реальность на примере XGMA',
    rubric: 'Выбор техники',
    brief: 'История XGMA, качество, ресурс, сервис и стоимость владения.',
  },
  {
    slug: 'zapchasti-xgma',
    title: 'Запчасти для техники XGMA: оригинал, аналоги и сроки',
    rubric: 'Сервис',
    brief: 'Какие запчасти нужны чаще всего, как их подбирать и хранить на складе.',
  },
  {
    slug: 'vilochnyy-pogruzchik-xgma',
    title: 'Вилочные погрузчики XGMA для склада: на что смотреть при покупке',
    rubric: 'Выбор техники',
    brief: 'Грузоподъёмность, мачта, шины, двигатель и навесное оборудование.',
  },
  {
    slug: 'lizing-spetstehniki',
    title: 'Лизинг спецтехники XGMA: как купить погрузчик без больших вложений',
    rubric: 'Выбор техники',
    brief: 'Как работает лизинг спецтехники, документы, налоговые преимущества.',
  },
]

export function getTopic(slug: string) {
  return topics.find((t) => t.slug === slug)
}

/** Rotates the featured topics every week so the home page stays fresh. */
export function weeklyTopics(count: number) {
  const week = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000))
  const start = week % topics.length
  return Array.from({ length: count }, (_, i) => topics[(start + i) % topics.length])
}
