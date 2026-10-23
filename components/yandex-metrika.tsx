'use client'

import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    ym?: (id: number, method: string, ...args: unknown[]) => void
  }
}

const goalByLink: [prefix: string, goal: string][] = [
  ['tel:', 'phone_click'],
  ['mailto:', 'email_click'],
]

export function YandexMetrika({ id }: { id: number }) {
  const pathname = usePathname()
  const isFirstHit = useRef(true)

  useEffect(() => {
    // The init call already records the landing page; only SPA navigations need a manual hit.
    if (isFirstHit.current) {
      isFirstHit.current = false
      return
    }
    window.ym?.(id, 'hit', window.location.href, { referer: document.referrer })
  }, [id, pathname])

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest('a')
      const href = link?.getAttribute('href') ?? ''
      const goal = goalByLink.find(([prefix]) => href.startsWith(prefix))?.[1]
      if (goal) window.ym?.(id, 'reachGoal', goal)
    }
    const onSubmit = (event: SubmitEvent) => {
      const form = event.target as HTMLFormElement | null
      window.ym?.(id, 'reachGoal', form?.dataset.goal ?? 'form_submit')
    }
    document.addEventListener('click', onClick)
    document.addEventListener('submit', onSubmit)
    return () => {
      document.removeEventListener('click', onClick)
      document.removeEventListener('submit', onSubmit)
    }
  }, [id])

  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');ym(${id},'init',{ssr:true,webvisor:true,clickmap:true,trackLinks:true,accurateTrackBounce:true});`}
      </Script>
      <noscript>
        <div>
          <img src={`https://mc.yandex.ru/watch/${id}`} style={{ position: 'absolute', left: '-9999px' }} alt="" />
        </div>
      </noscript>
    </>
  )
}
