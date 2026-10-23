import { absoluteUrl, isIndexable, siteUrl } from '@/lib/seo'

// Route handler instead of app/robots.ts: Next's robots API can't emit Yandex's Clean-param directive.
const trackingParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'yclid', 'gclid', 'fbclid', 'ysclid', '_openstat', 'from']

export function GET() {
  const body = isIndexable
    ? [
        'User-agent: *',
        'Allow: /',
        'Disallow: /api/',
        `Clean-param: ${trackingParams.join('&')}`,
        '',
        `Host: ${siteUrl}`,
        `Sitemap: ${absoluteUrl('/sitemap.xml')}`,
        '',
      ]
    : ['User-agent: *', 'Disallow: /', '']

  return new Response(body.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  })
}
