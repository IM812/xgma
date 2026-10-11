import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowDownRight, ArrowUpRight } from 'lucide-react'

export function MachineryHero() {
  return (
    <section className="machine-hero" aria-labelledby="hero-title">
      <div className="site-container">
        <div className="hero-topline">
          <p className="eyebrow"><span className="brand-square" />Техника XGMA. Поставка по России</p>
          <span className="hidden text-sm text-muted-foreground sm:block">Погрузчики · Экскаваторы · Дорожная техника</span>
        </div>
        <div className="hero-stage">
          <h1 id="hero-title" className="hero-title font-heading animate-rise">
            <span>ДЛЯ БОЛЬШИХ</span>
            <span className="text-primary">ДЕЛ.</span>
          </h1>
          <div className="hero-description animate-rise [animation-delay:100ms]">
            <p className="max-w-72 text-pretty text-base leading-relaxed text-muted-foreground">
              Машины с характером.<br />Партнёр, на которого можно положиться.
            </p>
            <Link href="/catalog" className="industrial-button">
              Выбрать технику <ArrowUpRight className="size-5" aria-hidden="true" />
            </Link>
          </div>
          <figure className="hero-machine animate-rise [animation-delay:180ms]">
            <Image
              src="/photos/loader-957-cutout.webp"
              alt="Фронтальный погрузчик XGMA XG957N — настоящая фотография техники"
              width={1394}
              height={772}
              priority
              sizes="(min-width: 1024px) 72vw, 100vw"
              className="h-auto w-full"
            />
            <figcaption className="hero-machine-caption">
              <span className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground">Фронтальный погрузчик</span>
                <span className="font-heading text-2xl font-bold tracking-tight">XGMA XG957N</span>
              </span>
              <ArrowDownRight className="size-6 text-primary" aria-hidden="true" />
            </figcaption>
          </figure>
        </div>
        <div className="hero-bottom">
          <a href="#equipment" className="group flex items-center gap-3 text-sm font-medium">
            <span className="flex size-10 items-center justify-center rounded-full border border-foreground/20 transition-colors group-hover:border-primary group-hover:text-primary"><ArrowDown className="size-4" aria-hidden="true" /></span>
            Знакомьтесь с XGMA
          </a>
          <p className="hidden max-w-60 text-sm leading-relaxed text-muted-foreground lg:block">От выбора первой машины<br />до сервиса на вашем объекте.</p>
          <div className="flex items-center gap-6 text-sm font-medium sm:gap-10">
            <Link href="/contacts" className="flex items-center gap-2 hover:text-primary">Лизинг <ArrowUpRight className="size-4" aria-hidden="true" /></Link>
            <a href="#service" className="hidden items-center gap-2 hover:text-primary sm:flex">Сервис и запчасти <ArrowUpRight className="size-4" aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </section>
  )
}
