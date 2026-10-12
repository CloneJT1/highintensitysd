import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'The Record | Championships | High Intensity Football',
  description: '150+ championships. 14 Hall of Famers. Nationals every year since 2014. San Diego\'s premier flag and 7v7 football program.',
  alternates: { canonical: 'https://highintensityfootball.com/championships' },
  openGraph: {
    url: 'https://highintensityfootball.com/championships',
    title: 'The Record | Championships | High Intensity Football',
  },
  robots: { index: true, follow: true },
};

export default function Championships() {
  return (
    <main className="min-h-screen bg-[#080808] text-white">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-9 w-9 relative rounded overflow-hidden">
              <Image src="/hi-logo-mark.jpg" alt="HI" fill className="object-cover" />
            </div>
            <div className="leading-none">
              <div className="font-black text-xs tracking-[0.2em] uppercase" style={{ color: '#CC0000' }}>High Intensity</div>
              <div className="font-black text-xs tracking-[0.3em] uppercase text-gray-400">Football</div>
            </div>
          </Link>
          <Link href="/" className="text-xs font-black tracking-widest uppercase px-5 py-2.5 rounded border border-white/20 hover:border-white/50 transition-all">
            ← Back to Site
          </Link>
        </div>
      </nav>

      <div className="pt-24 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="mb-16">
            <div className="text-xs font-black tracking-[0.3em] uppercase mb-4" style={{ color: '#CC0000' }}>High Intensity Football · San Diego, CA</div>
            <h1 className="text-[clamp(3rem,10vw,7rem)] font-black leading-[0.85] uppercase mb-6">
              THE<br />
              <span style={{ color: '#CC0000' }}>RECORD</span>
            </h1>
            <div className="flex flex-wrap gap-8 mt-8">
              {[
                { n: '48', label: 'League Super Bowls' },
                { n: '65+', label: 'Tournament Titles' },
                { n: '39', label: '7v7 Championships' },
                { n: '14×', label: 'Nationals Appearances' },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <div className="text-4xl font-black" style={{ color: '#CC0000' }}>{s.n}</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* FEATURED: 2026 Seahawks Regional */}
          <div className="mb-12 rounded-2xl overflow-hidden relative">
            <img src="/seahawks-regional-champs-2026.jpg" alt="2026 NFL Flag Seahawks Regional Champions" className="w-full object-cover max-h-[500px]" />
            <div className="absolute bottom-0 left-0 right-0 p-6" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)' }}>
              <div className="inline-block text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2" style={{ backgroundColor: '#CC0000', color: 'white' }}>🏆 Regional Champions</div>
              <h3 className="text-2xl font-black text-white">2026 NFL Flag Seahawks Regional — 14U Boys</h3>
              <p className="text-gray-300 text-sm mt-1">High Intensity earns $1,000 and a trip to Nationals · June 6, 2026</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* NATIONALS */}
            <div>
              <h2 className="text-xl font-black uppercase mb-6 pb-3 border-b border-white/10" style={{ color: '#CC0000' }}>🏟️ NFL Flag Nationals (14×)</h2>
              <div className="space-y-0">
                {[
                  { year: '2014', desc: 'Arizona · Chargers 12U' },
                  { year: '2015', desc: 'San Francisco · Chargers 12U' },
                  { year: '2016', desc: 'Orlando · Chargers 14U' },
                  { year: '2017', desc: 'Orlando · Rams 14U' },
                  { year: '2018', desc: 'Orlando · Rams 10U / 12U / 14U' },
                  { year: '2019', desc: 'Orlando · Chargers 14U' },
                  { year: '2020', desc: 'Orlando · Chargers 14U' },
                  { year: '2022', desc: 'Las Vegas · 49ers 14U — 🏆 NATIONAL CHAMPIONS', gold: true },
                  { year: '2023', desc: 'Las Vegas · Raiders 14U — 🥈 Runner-Up' },
                  { year: '2023', desc: 'Washington D.C. · All 32 · Chargers' },
                  { year: '2024', desc: 'Orlando · Raiders 12U / 14U' },
                  { year: '2024', desc: 'Canton · 49ers 14U' },
                  { year: '2025', desc: 'Canton · 49ers 14U — 🏅 Final Four' },
                  { year: '2026', desc: 'Indianapolis · Rams 12U' },
                ].map((item, i) => (
                  <div key={i} className={`flex gap-4 py-2.5 border-b border-white/5 ${item.gold ? 'bg-yellow-900/10' : ''}`}>
                    <span className="text-xs font-black w-10 shrink-0" style={{ color: item.gold ? '#FFD700' : '#CC0000' }}>{item.year}</span>
                    <span className={`text-xs leading-relaxed ${item.gold ? 'text-yellow-300 font-bold' : 'text-gray-400'}`}>{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* TOURNAMENTS */}
            <div>
              <h2 className="text-xl font-black uppercase mb-6 pb-3 border-b border-white/10" style={{ color: '#CC0000' }}>🏆 Tournament Titles (65+)</h2>
              <div className="space-y-0">
                {[
                  '2015 – NFL Flag Arizona Regional – 12U',
                  '2015 – Best of the West – 12U',
                  '2016 – NFL Flag Charger Regional – 14U',
                  '2016 – Southwest Showdown – 10U & 12U',
                  '2016 – Best of the West – 14U',
                  '2016 – Hardcount – 6U & 8U',
                  '2017 – NFL Flag LA Rams Regional – 14U',
                  '2017 – Best of the West – 14U',
                  '2017 – Southwest Showdown – 14U',
                  '2017 – Hardcount Nationals Las Vegas – 10U',
                  '2018 – NFL Flag LA Regional – 10U / 12U / 14U',
                  '2019 – NFL Flag Arizona Regional – 14U',
                  '2019 – Hardcount LA – 12U',
                  '2019 – Hardcount Las Vegas – 10U / 11U / 14U',
                  '2019 – Hardcount Nationals – 14U Panthers',
                  '2020 – Hardcount LA – 13U & 14U',
                  '2020 – Hardcount Turkey Bowl – 14U',
                  '2021 – Hardcount LA – 12U / 13U / 14U',
                  '2021 – Hardcount Bay Area – 6U / 8U / 12U',
                  '2021 – FNL Holiday Tournament – 7th/8th & 9th/10th',
                  '2022 – NFL FLAG BOWL NATIONAL CHAMPIONS – 14U 🏆',
                  '2022 – NFL Flag Las Vegas Regional – 14U',
                  '2022 – Hardcount Nationals – 14U',
                  '2023 – NFL Flag Raider Regional – 12U & 14U',
                  '2023 – Hardcount Nationals – 14U',
                  '2023 – SoFi Summer Showdown – 3rd/4th & 7th/8th',
                  '2023 – FNL Holiday Bowl – 5th/6th & 7th/8th',
                  '2023 – All 32 Summer Invitational – 14U Top 16',
                  '2024 – NFL Flag SF 49ers Regional – 15U',
                  '2024 – Southwest Showdown – 12U / 13U / 14U',
                  '2024 – LA Rams Invitational – 10U',
                  '2024 – NFL Flag Summer Nationals "B" – 15U',
                  '2024 – Hardcount Grinch Games – 14U',
                  '2024 – NFL Flag SD Fall Classic – 5th/6th',
                  '2025 – NFL Flag SF 49ers Regional – 14U',
                  '2025 – Hardcount OC – 11U & 14U',
                  '2025 – Hardcount Nationals Championship – 14U',
                  '2025 – NFL Flag Nationals Canton – Top 4 14U',
                  '2025 – NFL Flag SD Fall Classic – 12U Boys',
                  '2025 – FNL Holiday Bowl – 3rd/4th Girls & 7th/8th Girls',
                  '2026 – NFL Flag SD Winter – 12U Boys',
                  '2026 – Battle 5v5 Flag – 14U Boys',
                  '2026 – NFL Flag Rams Regional – 12U Boys',
                  '2026 – Hardcount OC – 12U Boys',
                  '2026 – NFL Flag Spring Classic – 12U Boys',
                  '2026 – NFL Flag Seahawks Regional – 14U Boys 🏆',
                ].map((item, i) => (
                  <div key={i} className="py-2 border-b border-white/5">
                    <span className={`text-xs leading-relaxed ${item.includes('🏆') ? 'text-yellow-300 font-bold' : 'text-gray-400'}`}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 7V7 */}
            <div>
              <h2 className="text-xl font-black uppercase mb-6 pb-3 border-b border-white/10" style={{ color: '#CC0000' }}>🏈 7v7 Championships (39)</h2>
              <div className="space-y-0">
                {[
                  '2018 – San Diego Spring/Fall – 10U',
                  '2019 – Proway Champions Pasadena – 12U',
                  '2020 – Passing Down Fontana – 7th/8th',
                  '2020 – Shook 7v7 Henderson – 7th/8th',
                  '2021 – Pyramid Rankings SD – Varsity & 2024',
                  '2021 – OC Elite – 10U & 14U',
                  '2021 – Extreme Alpha 7v7 – 10U',
                  '2021 – Faith Tournament – 10U',
                  '2022 – Quick6 Bay Area – 12U',
                  '2022 – Turf Wars – 10U & 12U',
                  '2022 – Battle 7v7 Las Vegas – 10U',
                  '2023 – Red Zone Elite Costa Mesa – 9U & 18U',
                  '2023 – Red Zone Elite San Jose – 9U / 14U / 15U / 18U',
                  '2023 – Red Zone Elite Covina – 12U & 14U',
                  '2023 – Passing Down Best of West – 14U',
                  '2023 – Showdown Series 4th & Goal – 12U',
                  '2024 – Redzone Western Regional – 18U Fire',
                  '2024 – Redzone Western Regional – Sr Family',
                  '2024 – OT7 LA – 14U Ignite',
                  '2024 – Redzone San Diego – 13U & 15U',
                  '2024 – Battle of the Valley CIA – 12U',
                  '2024 – Passing Down Best of West – 13U/14U',
                  '2025 – Passing Down SoCal Regional – HS & 14U',
                  '2025 – Showdown Tournament of Champions – 14U',
                  '2025 – 7on7 Association – HS Girls & 15U',
                  '2026 – Get Sports Focus – HS Champs',
                  '2026 – Get Sports Focus – #1 Power Rankings',
                ].map((item, i) => (
                  <div key={i} className="py-2 border-b border-white/5">
                    <span className="text-xs text-gray-400 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* PLAYER AWARDS */}
          <div className="border-t border-white/10 pt-12 mb-12">
            <h2 className="text-2xl font-black uppercase mb-8" style={{ color: '#CC0000' }}>🏅 Player Accomplishments</h2>
            <div className="grid md:grid-cols-2 gap-0 max-w-2xl">
              {[
                { name: 'Carson Taumoepeau', award: '2015 Youth Football National Player of the Year' },
                { name: 'Carson Taumoepeau', award: '2015 Madden Football Player of the Year' },
                { name: 'Miles Wingfield', award: '2015 Skills Player of the Year' },
                { name: 'Troy Faulkner', award: '2016 Skills Player of the Year' },
                { name: 'Xavier St. John', award: '2024 Oakley National Player Nomination' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col py-3 border-b border-white/5">
                  <span className="text-sm font-black text-white">{item.name}</span>
                  <span className="text-xs text-gray-500 mt-0.5">{item.award}</span>
                </div>
              ))}
            </div>
          </div>

          {/* HOF */}
          <div className="border-t border-white/10 pt-12">
            <h2 className="text-2xl font-black uppercase mb-2" style={{ color: '#CC0000' }}>🏛️ NFL Flag San Diego Hall of Fame</h2>
            <p className="text-gray-500 text-sm mb-8">14 High Intensity players inducted. One program.</p>
            <div className="flex flex-wrap gap-3">
              {[
                'Carson Taumoepeau', 'Miles Wingfield', 'Marquez White', 'Troy Faulkner',
                'Robbie Ramos', 'Chris Howell', 'Vance Jefferson', 'Desmond Taua',
                'Trevor Taumoepeau', 'Jadyen Williams', 'Ty Cortes', 'Curtis Johnson',
                'Landon Schrom', 'Xavier St. John'
              ].map(name => (
                <div key={name} className="px-4 py-2 border border-white/10 rounded-full text-xs font-black text-white hover:border-red-900/60 hover:text-red-400 transition-colors cursor-default">
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
