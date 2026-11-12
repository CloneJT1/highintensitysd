import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import { TOURNAMENTS, scheduleJsonLd } from '@/lib/schedule';

const POSTER_ALT =
  'High Intensity Football 2027 National 7v7 Tournament Schedule poster. Four athletes in red, white, and purple uniforms stand under the High Intensity logo, above the January through May tournament list.';

export const metadata: Metadata = {
  title: '2027 National 7v7 Tournament Schedule',
  description:
    'High Intensity Football 2027 National 7v7 tournament schedule. Ten stops from January through May, including Red Zone Elite 7v7, Battle 7v7, Pylon Mecca I, and Passing Down 7v7.',
  keywords: [
    '2027 7v7 schedule',
    'High Intensity Football schedule',
    'national 7v7 tournament',
    'Red Zone Elite 7v7',
    'Battle 7v7',
    'Pylon Mecca',
    'Passing Down 7v7',
    'youth 7v7 San Diego',
  ],
  alternates: { canonical: 'https://highintensityfootball.com/schedule' },
  openGraph: {
    type: 'website',
    url: 'https://highintensityfootball.com/schedule',
    title: '2027 National 7v7 Tournament Schedule',
    description:
      'Ten national 7v7 tournaments from January through May. Dates, events, and cities for High Intensity Football.',
    images: [
      {
        url: 'https://highintensityfootball.com/media/2027-national-7v7-schedule-og.jpg',
        width: 1200,
        height: 630,
        alt: 'High Intensity Football 2027 National 7v7 Tournament Schedule',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '2027 National 7v7 Tournament Schedule',
    description:
      'Ten national 7v7 tournaments from January through May. Dates, events, and cities for High Intensity Football.',
    images: ['https://highintensityfootball.com/media/2027-national-7v7-schedule-og.jpg'],
  },
  robots: { index: true, follow: true },
};

export default function SchedulePage() {
  const jsonLd = scheduleJsonLd();

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteNav />

      <div className="pt-32 xl:pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <header className="mb-10 lg:mb-14">
            <p className="text-xs font-black tracking-[0.3em] uppercase mb-4" style={{ color: '#CC0000' }}>
              High Intensity Football
            </p>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <h1 className="text-[clamp(2.4rem,6vw,4.5rem)] font-black uppercase leading-[0.9]">
                  2027 National 7v7
                  <br />
                  Tournament Schedule
                </h1>
                <p className="mt-5 text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                  Ten tournaments from January through May. The graphic is the official schedule. The list below is the same lineup in text.
                </p>
              </div>
              <Link
                href="/#join"
                className="inline-flex shrink-0 items-center justify-center font-black text-xs tracking-widest uppercase px-8 py-4 rounded text-white transition-all hover:scale-105 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                style={{ backgroundColor: '#CC0000' }}
              >
                Inquire Now
              </Link>
            </div>
          </header>

          <div className="grid xl:grid-cols-[minmax(300px,520px)_minmax(0,1fr)] gap-10 xl:gap-14 items-start">
            <figure className="mx-auto w-full max-w-2xl xl:sticky xl:top-28 xl:max-w-none">
              <Image
                src="/media/2027-national-7v7-schedule.webp"
                alt={POSTER_ALT}
                width={1024}
                height={1536}
                priority
                quality={90}
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 672px, 520px"
                className="h-auto w-full rounded-2xl border border-white/10 bg-black"
              />
              <figcaption className="mt-3 flex items-center justify-between gap-3 text-xs text-gray-500">
                <span>Official 2027 schedule graphic</span>
                <a
                  href="/media/2027-national-7v7-schedule.webp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold uppercase tracking-widest hover:text-white transition-colors"
                  style={{ color: '#CC0000' }}
                >
                  Full size
                </a>
              </figcaption>
            </figure>

            <div>
              <h2 className="text-xs font-black tracking-[0.3em] uppercase mb-4" style={{ color: '#CC0000' }}>
                Every stop
              </h2>
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <table className="schedule-table w-full border-collapse text-left">
                  <caption className="sr-only">
                    2027 National 7v7 Tournament Schedule with date, tournament, and location
                  </caption>
                  <thead>
                    <tr className="text-[11px] font-black tracking-[0.22em] uppercase text-gray-500">
                      <th scope="col" className="px-4 py-3 font-black">Date</th>
                      <th scope="col" className="px-4 py-3 font-black">Tournament</th>
                      <th scope="col" className="px-4 py-3 font-black">Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TOURNAMENTS.map((stop) => (
                      <tr key={stop.startDate} className="border-t border-white/10">
                        <th scope="row" className="px-4 py-4 align-top font-black whitespace-nowrap text-sm sm:text-base" style={{ color: '#CC0000' }}>
                          <time dateTime={stop.startDate}>{stop.dateLabel}</time>
                        </th>
                        <td className="px-4 py-4 align-top font-black text-sm sm:text-base" data-label="Tournament">
                          {stop.name}
                        </td>
                        <td className="px-4 py-4 align-top text-sm sm:text-base text-gray-300" data-label="Location">
                          {stop.location}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-gray-500">
                Battle 7v7 Nationals and Red Zone 7v7 Elite Nationals are listed as TBD.
              </p>

              <div className="mt-8 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5" style={{ backgroundColor: '#CC0000' }}>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black uppercase">Inquire Now</h2>
                  <p className="mt-2 text-sm text-white/90 max-w-md leading-relaxed">
                    Tell us about your athlete. A coach will follow up about flag football and boys 7-on-7.
                  </p>
                </div>
                <Link
                  href="/#join"
                  className="inline-flex shrink-0 items-center justify-center font-black text-xs tracking-widest uppercase px-8 py-4 rounded bg-black text-white hover:bg-white hover:text-black transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Inquire Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-12 px-6 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 relative rounded overflow-hidden">
              <Image src="/hi-logo-mark.jpg" alt="" fill className="object-cover" />
            </div>
            <div>
              <div className="font-black text-xs tracking-[0.2em] uppercase" style={{ color: '#CC0000' }}>High Intensity</div>
              <div className="font-black text-xs tracking-[0.3em] uppercase text-gray-600">Football · San Diego</div>
            </div>
          </Link>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs font-bold uppercase tracking-widest text-gray-600">
            <Link href="/schedule" className="hover:text-white transition-colors" aria-current="page">Schedule</Link>
            <Link href="/#story" className="hover:text-white transition-colors">Story</Link>
            <Link href="/#achievements" className="hover:text-white transition-colors">Wins</Link>
            <Link href="/championships" className="hover:text-white transition-colors">Record</Link>
            <Link href="/#join" className="hover:text-white transition-colors">Join</Link>
          </div>
          <div className="flex gap-5">
            <a href="https://instagram.com/highintensitysd" target="_blank" rel="noopener noreferrer" className="text-xs font-black uppercase tracking-widest hover:underline" style={{ color: '#CC0000' }}>IG</a>
            <a href="https://tiktok.com/@highintensitysd" target="_blank" rel="noopener noreferrer" className="text-xs font-black uppercase tracking-widest hover:underline" style={{ color: '#CC0000' }}>TikTok</a>
            <a href="https://x.com/highintensitysd" target="_blank" rel="noopener noreferrer" className="text-xs font-black uppercase tracking-widest hover:underline" style={{ color: '#CC0000' }}>X</a>
          </div>
        </div>
        <div className="text-center text-gray-700 text-xs mt-8">© 2026 High Intensity Football · San Diego, California · Est. 2014</div>
      </footer>
    </main>
  );
}
