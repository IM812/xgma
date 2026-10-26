const isDev = process.env.NODE_ENV !== 'production'
const isPreviewDeploy = Boolean(process.env.VERCEL_ENV) && process.env.VERCEL_ENV !== 'production'

// Yandex Metrika (incl. Webvisor) loads from these origins; the Vercel toolbar is injected only on preview deployments.
const metrika = 'https://mc.yandex.ru https://mc.yandex.com https://yastatic.net'
const vercelLive = isPreviewDeploy ? ' https://vercel.live https://*.pusher.com wss://*.pusher.com' : ''

// Next.js emits inline hydration scripts, so 'unsafe-inline' stays until a nonce-based proxy is introduced;
// the policy still blocks foreign script hosts, plugins, base-tag hijacking, form redirection and framing.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} ${metrika}${vercelLive}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${metrika}${vercelLive}`,
  "font-src 'self' data:",
  `connect-src 'self' ${metrika} wss://mc.yandex.ru wss://mc.yandex.com${vercelLive}`,
  `frame-src ${metrika}${vercelLive}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' mailto:",
  "frame-ancestors 'self'",
  ...(isDev ? [] : ['upgrade-insecure-requests']),
].join('; ')

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: contentSecurityPolicy },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()',
          },
          ...(isPreviewDeploy ? [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] : []),
        ],
      },
    ]
  },
}

export default nextConfig
