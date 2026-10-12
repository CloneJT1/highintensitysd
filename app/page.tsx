'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({ parentName: '', kidName: '', age: '', grade: '', position: '', email: '', program: '' as string });
  const programs = ['Boys Flag Football', 'Girls Flag Football', 'Boys 7-on-7'];
  const toggleProgram = (p: string) => {
    const current = form.program ? form.program.split(', ') : [];
    const updated = current.includes(p) ? current.filter(x => x !== p) : [...current, p];
    setForm({...form, program: updated.join(', ')});
  };
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState('');

  return (
    <main className="min-h-screen bg-[#080808] text-white overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 relative rounded overflow-hidden">
              <Image src="/hi-logo-mark.jpg" alt="HI" fill className="object-cover" />
            </div>
            <div className="leading-none">
              <div className="font-black text-xs tracking-[0.2em] uppercase" style={{ color: '#CC0000' }}>High Intensity</div>
              <div className="font-black text-xs tracking-[0.3em] uppercase text-gray-400">Football</div>
            </div>
          </div>
          <div className="hidden md:flex gap-8 text-xs font-bold tracking-widest uppercase text-gray-400">
            <a href="#origins" className="hover:text-white transition-colors">Origins</a>
            <a href="#story" className="hover:text-white transition-colors">Story</a>
            <a href="#achievements" className="hover:text-white transition-colors">Wins</a>
            <a href="#the-road" className="hover:text-white transition-colors">The Road</a>
            <a href="/championships" className="hover:text-white transition-colors">Record</a>
            <a href="#coaches" className="hover:text-white transition-colors">Leadership</a>
            <a href="#highlights" className="hover:text-white transition-colors">Highlights</a>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://instagram.com/highintensitysd" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" title="Instagram">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://tiktok.com/@highintensitysd" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" title="TikTok">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.78a4.85 4.85 0 01-1.01-.09z"/></svg>
            </a>
            <a href="https://x.com/highintensitysd" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors font-black text-sm" title="X">𝕏</a>
            <a href="#join" className="text-xs font-black tracking-widest uppercase px-5 py-2.5 rounded text-white transition-all hover:scale-105" style={{ backgroundColor: '#CC0000' }}>
              Get Involved
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <video autoPlay muted loop playsInline preload="none" className="w-full h-full object-cover"
            poster="/hi-highlight-poster.jpg">
            <source src="/hi-highlight.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(8,8,8,0.3) 0%, rgba(8,8,8,0.5) 40%, rgba(8,8,8,0.97) 100%)' }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 pt-32 w-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-red-700/40" />
            <span className="text-xs font-black tracking-[0.3em] uppercase" style={{ color: '#CC0000' }}>2022 NFL Flag National Champions · 150+ Championships · Nationals Every Year Since 2014</span>
            <div className="h-px flex-1 bg-red-700/40" />
          </div>
          <h1 className="text-[clamp(3rem,12vw,9rem)] font-black leading-[0.85] tracking-tight mb-8 uppercase">
            HIGH<br />
            <span style={{ color: '#CC0000', WebkitTextStroke: '0px' }}>INTENSITY</span><br />
            FOOTBALL
          </h1>
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full mb-6" style={{ backgroundColor: '#CC0000' }}>
            <span className="text-lg">🏆</span>
            <span className="text-sm font-black tracking-widest uppercase">2022 NFL Flag Pro Bowl National Champions</span>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="text-gray-300 text-lg max-w-lg leading-relaxed">
                San Diego&apos;s most competitive youth flag football program.
                Founded in 2014. Built on family, hard work, and the relentless pursuit of excellence.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <a href="#join" className="font-black text-xs tracking-widest uppercase px-8 py-4 rounded text-white transition-all hover:scale-105 hover:brightness-110" style={{ backgroundColor: '#CC0000' }}>
                How to Join
              </a>
              <a href="#story" className="font-black text-xs tracking-widest uppercase px-8 py-4 rounded border border-white/20 hover:border-white/50 transition-all hover:scale-105">
                Our Story
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="relative overflow-hidden py-4 border-y border-red-900/40" style={{ backgroundColor: '#CC0000' }}>
        <div className="flex gap-12 whitespace-nowrap">
          {['🏆 2022 NFL FLAG NATIONAL CHAMPIONS', '🏆 2026 LA REGIONAL CHAMPIONS · 14U & 12U', '📍 SAN DIEGO, CALIFORNIA', '🏈 150+ CHAMPIONSHIPS', '🏼 2025 CANTON FINAL FOUR', '📅 NATIONALS EVERY YEAR SINCE 2014', '🏟️ 3 TEAMS AT FLORIDA NATIONALS SIMULTANEOUSLY', '🎖️ NFL FLAG SD HALL OF FAME · CLASS OF 2018', '🏅 FINAL FOUR AT NATIONALS 2016', '🎮 USA FOOTBALL PLAYMAKER OF THE YEAR 2016', '🌟 MET JARED GOFF AT THE PRO BOWL', '🐭 DISNEY WORLD AFTER NATIONALS', '💍 CHAMPIONSHIP RINGS', '🔥 HIGH INTENSITY FOOTBALL', '🏆 2022 NFL FLAG PRO BOWL NATIONAL CHAMPIONS', '🏆 2026 LA REGIONAL CHAMPIONS', '📍 SAN DIEGO, CALIFORNIA', '🏈 BATTLE 5 BOYS 14U #3 NATIONAL RANKING'].map((item, i) => (
            <span key={i} className="text-xs font-black tracking-widest shrink-0">{item}</span>
          ))}
        </div>
      </div>

      {/* LATEST NEWS */}
      <section className="py-16 px-6 border-b border-white/5" style={{ backgroundColor: '#0d0d0d' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full animate-pulse" style={{ backgroundColor: '#CC0000', color: 'white' }}>🔴 Latest News</span>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Featured story */}
            <div className="relative rounded-2xl overflow-hidden group cursor-pointer" style={{ minHeight: '320px' }}>
              <Image src="/seahawks-regional-champs-2026.jpg" alt="2026 Seahawks Regional Champions" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.2) 100%)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#CC0000' }}>June 6, 2026 · Regional Championship</div>
                <h3 className="text-2xl font-black text-white leading-tight mb-2">High Intensity Wins 2026 NFL Flag Seahawks Regional</h3>
                <p className="text-gray-300 text-sm leading-relaxed">Our 14U boys squad claimed the Seahawks Regional title in dominant fashion, punching their ticket to Nationals. Another chapter in the HI legacy.</p>
                <a href="/championships" className="inline-block mt-4 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full transition-all hover:scale-105" style={{ backgroundColor: '#CC0000', color: 'white' }}>View Championships →</a>
              </div>
            </div>
            {/* Side stories */}
            <div className="flex flex-col gap-4">
              <div className="rounded-xl p-5 border border-white/10 hover:border-white/20 transition-colors" style={{ backgroundColor: '#111' }}>
                <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#CC0000' }}>2026 Season</div>
                <h4 className="font-black text-lg text-white mb-1">2026 LA Regional Champions — 14U & 12U</h4>
                <p className="text-gray-400 text-sm">Two 2026 NFL Flag Regional titles: 14U Boys won the Seahawks Regional and 12U Boys won the Rams Regional. Nationals every year since 2014.</p>
              </div>
              <div className="rounded-xl p-5 border border-white/10 hover:border-white/20 transition-colors" style={{ backgroundColor: '#111' }}>
                <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#CC0000' }}>Program Milestone</div>
                <h4 className="font-black text-lg text-white mb-1">150+ Championships and Counting</h4>
                <p className="text-gray-400 text-sm">Over 48 league titles, 65+ tournament wins, and 39 7v7 championships since 2014. The record keeps growing.</p>
              </div>
              <div className="rounded-xl p-5 border border-white/10 hover:border-white/20 transition-colors" style={{ backgroundColor: '#111' }}>
                <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#CC0000' }}>Now Enrolling</div>
                <h4 className="font-black text-lg text-white mb-1">Join High Intensity Football</h4>
                <p className="text-gray-400 text-sm">Boys &amp; Girls Flag Football · Boys 7-on-7 · All skill levels welcome.</p>
                <a href="#join" className="inline-block mt-3 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full border border-white/20 hover:border-white transition-colors">Inquire / Get Evaluated →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ORIGINS TIMELINE */}
      <section id="origins" className="py-24 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-6 mb-6">
            <div className="text-xs font-black tracking-[0.3em] uppercase" style={{ color: '#CC0000' }}>The Full Story</div>
          </div>
          <div className="flex items-center gap-6 mb-16">
            <h2 className="text-5xl font-black uppercase shrink-0">Origins</h2>
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs font-black tracking-widest text-gray-600 uppercase">2014 — 2026</span>
          </div>
          <div className="space-y-0">
            {[
              { year: '2014', title: 'The Beginning', desc: 'Brothers John and Charlie Taumoepeau start High Intensity Football in San Diego. These nine kids in gray and gold Chargers jerseys had no idea what they were starting. Nobody knew it would become a dynasty.', tag: 'Est. 2014', img: '/archive/2014-original-squad.jpg' },
              { year: '2015', title: 'First Regional Championship', desc: 'High Intensity wins their first regional tournament. Nationals every year since 2014. Carson Taumoepeau leads the charge.', tag: '🏆 First Regional Title', img: '/archive/first-regional-champs-2015.jpg' },
              { year: '2016', title: 'Final Four at Nationals', desc: 'Carson, Chris, MJ, Miles, Luke, and Willie go to San Francisco for NFL Flag Nationals and finish in the Final Four — Top 4 in the country. Carson Taumoepeau also wins the USA Football x EA Sports Madden NFL 16 Playmaker of the Year award.', tag: '🏅 Final Four · Playmaker of the Year', img: '/archive/nationals-sf-2016-championship-banner.jpg', imgPos: 'object-top' },
              { year: '2018', title: 'Pro Bowl Nationals', desc: 'High Intensity competes at the NFL Flag Championships at the Pro Bowl in Orlando, Florida. Featured in the official NFL program. 7-0 record, championship game appearance, lost 22-21 on a 2-point conversion. Post-tournament: Disney World.', tag: '🏟️ Pro Bowl · Championship Game · Disney World', img: '/archive/pro-bowl-squad-photo.jpg', imgPos: 'object-bottom' },
              { year: '2018', title: 'Hall of Fame Class', desc: 'Three High Intensity players inducted into the NFL Flag San Diego Hall of Fame in a single year: Miles Wingfield, Carson Taumoepeau, and Marquez White. One program. Three Hall of Famers.', tag: '🏛️ 3 Hall of Famers', img: '/archive/hof-class-2018-real.jpg', imgPos: 'object-contain' },
              { year: '2018', title: 'The 7v7 Era Begins', desc: 'The flag football kids grew up. High Intensity launches their first High School 7v7 team and makes their first trip to Mesquite, Nevada. The same program, the same culture, the next chapter.', tag: '🏈 First 7v7 Trip', img: '/archive/7v7-era-begins-mesquite.jpg', imgPos: 'object-top' },
              { year: '2022', title: 'National Champions', desc: 'Ty Cortes, X, Landon, Trevor, Braden, Zach, Pete, Thomas, and Gray — their last flag run. NFL Flag Championships at the Pro Bowl in Las Vegas. Ty seals it with a game-winning interception. Championship belts. Championship rings. San Diego on top.', tag: '🏆 NFL Flag Pro Bowl National Champions', img: '/archive/2022-national-champions.jpg' },
              { year: '2026', title: '2026 LA Regional Champions', desc: '2026 LA Regional Champions — 14U Seahawks Regional and 12U Rams Regional. 2025 Canton Final Four. The program keeps delivering, with 150+ championships behind it.', tag: '🏆 LA Regional Champions 2026', img: '/archive/2025-nashville-squad-mesquite-black.jpg' },
            ].map((era, i) => (
              <div key={era.year + era.title} className="grid md:grid-cols-2 gap-0 border border-white/5 hover:border-red-900/30 transition-colors">
                <div className={`relative aspect-video overflow-hidden bg-black ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                  <Image src={era.img} alt={era.title} fill quality={90} className={`${(era as any).imgPos || 'object-cover'} hover:scale-105 transition-transform duration-700`} />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="text-6xl font-black opacity-20 leading-none">{era.year}</div>
                  </div>
                </div>
                <div className={`p-10 flex flex-col justify-center ${i % 2 === 1 ? 'md:order-1' : ''}`} style={{ backgroundColor: i % 2 === 1 ? '#0d0000' : '#080808' }}>
                  <div className="text-xs font-black tracking-[0.3em] uppercase mb-3" style={{ color: '#CC0000' }}>{era.year}</div>
                  <h3 className="text-3xl font-black uppercase mb-4">{era.title}</h3>
                  <p className="text-gray-400 leading-relaxed mb-6">{era.desc}</p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-900/40 text-xs font-black tracking-widest uppercase w-fit" style={{ color: '#CC0000' }}>
                    {era.tag}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BIG NUMBERS */}
      <section className="py-20 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-1">
          {[
            { n: '48', label: 'League Championships' },
            { n: '65+', label: 'Tournament Titles' },
            { n: '39', label: '7v7 Championships' },
            { n: '14×', label: 'Nationals Appearances' },
          ].map(s => (
            <div key={s.label} className="py-10 text-center border border-white/5 hover:border-red-900/40 transition-colors">
              <div className="text-5xl md:text-6xl font-black leading-none mb-2" style={{ color: '#CC0000' }}>{s.n}</div>
              <div className="text-xs font-bold tracking-widest uppercase text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROMO VIDEO */}
      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <video
            src="/media/highintensity-promo-1080p.mp4"
            poster="/media/highintensity-promo-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="High Intensity Football: San Diego 7v7 and flag football training, Nationals every year since 2014, 2026 LA Regional Champions"
            style={{ width: '100%', height: 'auto', aspectRatio: '16/9', borderRadius: 12, background: '#080808', display: 'block' }}
          />
        </div>
      </section>

      {/* OUR STORY */}
      <section id="story" className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="text-xs font-black tracking-[0.3em] uppercase mb-6" style={{ color: '#CC0000' }}>Est. 2014 · San Diego, CA</div>
            <h2 className="text-5xl font-black leading-tight mb-8 uppercase">
              Built here.<br />
              <span className="text-gray-500">Competing</span><br />
              everywhere.
            </h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                High Intensity Football was founded in 2014 by brothers <span className="text-white font-semibold">John and Charlie Taumoepeau</span> in San Diego.
                John played Linebacker at the University of Oregon. Charlie played at USD.
                Together, they built something that started with 10 kids and grew to 100+ athletes across multiple teams.
              </p>
              <p>
                We run <span className="text-white font-semibold">flag football for all ages</span> and a competitive <span className="text-white font-semibold">High School 7-on-7 program</span> —
                developing athletes from youth through high school and getting them ready to compete at the next level.
                What began as a flag football team quickly became one of the top programs in the country.
                High Intensity has qualified for Nationals <span className="text-white font-semibold">every year since 2014</span> — competing nationally in the NFL Flag Pro Bowl Nationals,
                the HC Athletics National Championship Circuit, and now the Battle Flag Football circuit.
              </p>
              <p className="text-white italic font-semibold border-l-2 pl-4" style={{ borderColor: '#CC0000' }}>
                &ldquo;It doesn&apos;t matter if we win or lose — go out and give your best effort on every play.&rdquo;
              </p>
              <p>
                That&apos;s the mission. That&apos;s why we chose the name High Intensity. And that&apos;s why families keep coming back year after year.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              '/archive/dylan-curry-qb.jpg',
              '/archive/hof-class-2018.jpg',
              '/archive/hi-brand-coaches.jpg',
              '/archive/desmond-pass-rush.jpg',
              '/archive/carson-playmaker-2016.jpg',
              '/archive/dylan-curry-red-plaid.jpg',
            ].map(src => (
              <div key={src} className="rounded overflow-hidden aspect-square relative group">
                <Image src={src} alt="High Intensity Football" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements" className="py-24 px-6" style={{ backgroundColor: '#0d0000' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-6 mb-16">
            <h2 className="text-5xl font-black uppercase shrink-0">What We&apos;ve Built</h2>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { icon: '🏆', title: '2022 National Champions', desc: 'NFL Flag Championships at the Pro Bowl. Las Vegas. Championship rings. The whole program on the stage.', tag: '🏆 National Champions' },
              { icon: '🏆', title: '2025 SF 49ers Regional Champs', desc: 'Official NFL Flag Regional Championship. 14U High Intensity. Championship rings. Nationals qualifier.', tag: '🏆 NFL Regional Champs' },
              { icon: '🏆', title: '2026 LA Regional Champs', desc: '14U Seahawks Regional and 12U Rams Regional. Two brackets won.', tag: 'Champions' },
              { icon: '🥉', title: '#3 National Ranking', desc: 'Battle 5 Boys 14U circuit. Top 3 in the country.', tag: '#3 Nationally' },
              { icon: '🏟️', title: '3 Teams at Florida Nationals', desc: 'High Intensity sent three teams to NFL Flag Nationals simultaneously — 10U, 12U, and 14U.', tag: 'Dynasty' },
              { icon: '🏅', title: 'Final Four · 2016', desc: 'NFL Flag Nationals, San Francisco. Top 4 in the country our first year at Nationals.', tag: 'Final Four' },
              { icon: '🏛️', title: 'Hall of Fame', desc: '14 High Intensity players inducted into the NFL Flag San Diego Hall of Fame. One program.', tag: '14 Hall of Famers' },
              { icon: '🎮', title: 'Playmaker of the Year', desc: 'Carson Taumoepeau. USA Football x EA Sports Madden NFL 16. 2016.', tag: 'National Award' },
              { icon: '🔥', title: 'Nationals Every Year', desc: 'Qualified for national championship competition every year since 2014.', tag: 'The Streak' },
            ].map(a => (
              <div key={a.title} className="border border-white/10 rounded-xl p-6 hover:border-red-900/60 transition-colors group">
                <div className="text-3xl mb-4">{a.icon}</div>
                <div className="text-xs font-black uppercase tracking-widest mb-2 group-hover:text-red-400 transition-colors" style={{ color: '#CC0000' }}>{a.tag}</div>
                <h3 className="font-black text-base mb-2 leading-tight">{a.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ALUMNI WALL - coming soon */}
      <section id="alumni" className="py-16 px-6 border-t border-white/5" style={{ display: 'none' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-6 mb-6">
            <div className="text-xs font-black tracking-[0.3em] uppercase" style={{ color: '#CC0000' }}>The Pipeline</div>
          </div>
          <div className="flex items-center gap-6 mb-4">
            <h2 className="text-5xl font-black uppercase shrink-0">Alumni</h2>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <p className="text-gray-500 text-sm mb-16 max-w-2xl">High Intensity Football is a pipeline. These are some of the athletes who came through this program and went on to compete at the next level.</p>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="md:col-span-2 relative rounded-xl overflow-hidden aspect-video group border border-white/10 hover:border-red-900/40 transition-colors">
              <Image src="/archive/xavier-trevor-hof-2025.jpg" alt="Xavier St. John and Trevor Taumoepeau" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.2) 60%)' }} />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-xs font-black tracking-[0.3em] uppercase mb-1" style={{ color: '#CC0000' }}>NFL Flag SD Hall of Fame · Class of 2025</div>
                <div className="text-2xl font-black uppercase">Xavier St. John &amp; Trevor Taumoepeau</div>
                <div className="text-gray-400 text-sm">Inducted together. One program. Two legends. High Intensity Football.</div>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden aspect-video group border border-white/10 hover:border-red-900/40 transition-colors">
              <Image src="/archive/jadyen-virgin-boise-state.jpg" alt="Jadyen Virgin" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.2) 60%)' }} />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-xs font-black tracking-[0.3em] uppercase mb-1" style={{ color: '#CC0000' }}>The Pipeline</div>
                <div className="text-2xl font-black uppercase">Jadyen Virgin</div>
                <div className="text-gray-400 text-sm">High Intensity 7v7 → Mt. Carmel High School → Boise State University Football</div>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-4 gap-3">
            {[
              { name: 'Jadyen Virgin', path: 'HI 7v7 → Mt. Carmel HS → Boise State University Football', tag: 'Mountain West' },
              { name: 'Faulkner', path: 'High Intensity Football → CSU-Pueblo Thunderwolves Football', tag: 'College Football' },
              { name: 'Desmond Taua', path: 'HI OG → Vista HS → University of San Diego Football', tag: 'College Football' },
              { name: 'Chris Howell', path: 'HI Flag Football → University of New Mexico Basketball', tag: 'College Basketball' },
              { name: 'Carson Taumoepeau', path: 'HI QB1 → Mt. Carmel HS → USA Football Playmaker of Year 2016', tag: 'National Award' },
              { name: 'Miles Wingfield', path: 'HI Flag → NFL Flag SD Hall of Fame 2018 → UC Berkeley (Cal Bears)', tag: 'Cal Bears 🐻' },
              { name: 'Marquez White', path: 'HI Flag → NFL Flag SD Hall of Fame 2018', tag: 'Hall of Fame' },
              { name: 'Jadyen Williams', path: 'HI 7v7 GOAT · Red Zone Elite MVP', tag: 'The GOAT' },
            ].map(a => (
              <div key={a.name} className="border border-white/10 rounded-xl p-5 hover:border-red-900/40 transition-colors">
                <div className="w-10 h-10 rounded-full mb-3 flex items-center justify-center text-xs font-black" style={{ backgroundColor: '#CC0000' }}>
                  {a.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                </div>
                <div className="font-black text-sm mb-1">{a.name}</div>
                <div className="text-gray-600 text-xs leading-relaxed mb-3">{a.path}</div>
                <div className="text-xs font-black uppercase tracking-widest" style={{ color: '#CC0000' }}>{a.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE ROAD */}
      <section id="the-road" className="py-24 px-6 border-t border-white/5" style={{ backgroundColor: '#0d0000' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-6 mb-6">
            <div className="text-xs font-black tracking-[0.3em] uppercase" style={{ color: '#CC0000' }}>More Than Football</div>
          </div>
          <div className="flex items-center gap-6 mb-8">
            <h2 className="text-5xl font-black uppercase shrink-0">The Road</h2>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <p className="text-gray-500 text-sm mb-16 max-w-2xl">The games are the destination. The road trips are the memories. Every High Intensity team travels — and every trip becomes part of the story.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
            {[
              { img: '/archive/disney-world-cinderella.jpg', caption: 'Disney World · Orlando, FL' },
              { img: '/archive/glendale-arizona-roadtrip.jpg', caption: 'Westgate · Glendale, AZ' },
              { img: '/archive/hotel-room-chaos.jpg', caption: 'The Night Before. Every Time.' },
              { img: '/archive/disney-mickey-waffles.jpg', caption: 'Pre-game fuel. Mickey waffles.' },
              { img: '/archive/team-dinner-harbor.jpg', caption: 'After the game comes the table.' },
              { img: '/archive/road-trip-dinner-sandwich.jpg', caption: 'Road trip fuel.' },
              { img: '/archive/pro-bowl-stadium-seats.jpg', caption: 'Camping World Stadium · Pro Bowl' },
              { img: '/archive/pro-bowl-venue-inside.jpg', caption: 'Pro Bowl Championships · Florida' },
            ].map((item) => (
              <div key={item.img} className="relative aspect-square rounded overflow-hidden group">
                <Image src={item.img} alt={item.caption} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-xs font-bold">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border border-white/10 rounded-xl p-8 text-center">
            <p className="text-xl font-black uppercase mb-2">&ldquo;Six months on the road, great times.&rdquo;</p>
            <p className="text-gray-600 text-sm">— John Taumoepeau, Co-Founder</p>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section id="highlights" className="py-24 px-6 border-t border-white/5" style={{ backgroundColor: '#0d0000' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-6 mb-12">
            <h2 className="text-5xl font-black uppercase shrink-0">Highlights</h2>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-xl overflow-hidden bg-black border border-white/10 hover:border-red-900/40 transition-colors">
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/8rRBY2DNTSc"
                  title="Hail Mary for the Win! Trevor to Ty for the Super Bowl Win!"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="px-4 py-3">
                <span className="text-xs font-black uppercase tracking-widest text-gray-500">Hail Mary for the Win — Trevor to Ty · Super Bowl</span>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden bg-black border border-white/10 hover:border-red-900/40 transition-colors">
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/hAnzHiQVS7U"
                  title="14U 2017 NFL Flag National Championship Tournament"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="px-4 py-3">
                <span className="text-xs font-black uppercase tracking-widest text-gray-500">14U — 2017 NFL Flag National Championship Tournament</span>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden bg-black border border-white/10 hover:border-red-900/40 transition-colors">
              <div className="aspect-video">
                <iframe src="https://www.youtube.com/embed/WQGRo03-nPI" title="The Catch That Went Viral on MaxPreps — Taumoepeau to Wingfield" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" />
              </div>
              <div className="px-4 py-3">
                <span className="text-xs font-black uppercase tracking-widest text-gray-500">The Catch That Went Viral on MaxPreps — Taumoepeau to Wingfield</span>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden bg-black border border-white/10 hover:border-red-900/40 transition-colors flex flex-col items-center justify-center p-4">
              <blockquote
                className="instagram-media w-full"
                data-instgrm-permalink="https://www.instagram.com/reel/DSqm_0wEmP2/"
                data-instgrm-version="14"
                style={{maxWidth: '100%', minWidth: '280px'}}
              />
              <script async src="https://www.instagram.com/embed.js" />
              <div className="px-4 py-3 w-full">
                <span className="text-xs font-black uppercase tracking-widest text-gray-500">Carson to Vance — The Viral Catch · @highintensitysd</span>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden bg-black border border-white/10 hover:border-red-900/40 transition-colors flex flex-col items-center justify-center p-4">
              <blockquote
                className="instagram-media w-full"
                data-instgrm-permalink="https://www.instagram.com/reel/ClU3YlyJhx-/"
                data-instgrm-version="14"
                style={{maxWidth: '100%', minWidth: '280px'}}
              />
              <div className="px-4 py-3 w-full">
                <span className="text-xs font-black uppercase tracking-widest text-gray-500">Carson to Vance — Last Play to Win the Game · @highintensitysd</span>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden bg-black border border-white/10 hover:border-red-900/40 transition-colors flex flex-col items-center justify-center p-4">
              <blockquote
                className="instagram-media w-full"
                data-instgrm-permalink="https://www.instagram.com/reel/CzPRoVIPCjd/"
                data-instgrm-version="14"
                style={{maxWidth: '100%', minWidth: '280px'}}
              />
              <div className="px-4 py-3 w-full">
                <span className="text-xs font-black uppercase tracking-widest text-gray-500">Jadyen Virgin — One-Handed INT · @highintensitysd</span>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden bg-black border border-white/10 hover:border-red-900/40 transition-colors flex flex-col items-center justify-center p-4">
              <blockquote
                className="instagram-media w-full"
                data-instgrm-permalink="https://www.instagram.com/p/CHeWcmTnO9N/"
                data-instgrm-version="14"
                style={{maxWidth: '100%', minWidth: '280px'}}
              />
              <div className="px-4 py-3 w-full">
                <span className="text-xs font-black uppercase tracking-widest text-gray-500">There Goes That Man Vance Again! · @highintensitysd</span>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden bg-black border border-white/10 hover:border-red-900/40 transition-colors flex flex-col items-center justify-center p-4">
              <blockquote
                className="instagram-media w-full"
                data-instgrm-permalink="https://www.instagram.com/p/BeCpobOhYYm/"
                data-instgrm-version="14"
                style={{maxWidth: '100%', minWidth: '280px'}}
              />
              <div className="px-4 py-3 w-full">
                <span className="text-xs font-black uppercase tracking-widest text-gray-500">Des Taua Breaks the Championship Wide Open — Big Pick 6 · @highintensitysd</span>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden bg-black border border-white/10 hover:border-red-900/40 transition-colors flex flex-col items-center justify-center p-4">
              <blockquote
                className="instagram-media w-full"
                data-instgrm-permalink="https://www.instagram.com/p/BuhVjIhgAlQ/"
                data-instgrm-version="14"
                style={{maxWidth: '100%', minWidth: '280px'}}
              />
              <div className="px-4 py-3 w-full">
                <span className="text-xs font-black uppercase tracking-widest text-gray-500">Josh Butler with the Head Top — Before They Called It That · @highintensitysd</span>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden bg-black border border-white/10 hover:border-red-900/40 transition-colors flex flex-col items-center justify-center p-4">
              <blockquote
                className="tiktok-embed w-full"
                cite="https://www.tiktok.com/@highintensitysd/video/6792790222284410118"
                data-video-id="6792790222284410118"
                style={{maxWidth: '100%', minWidth: '280px'}}
              ><section /></blockquote>
              <script async src="https://www.tiktok.com/embed.js" />
              <div className="px-4 py-3 w-full">
                <span className="text-xs font-black uppercase tracking-widest text-gray-500">Amir With the Juke · @highintensitysd</span>
              </div>
            </div>
            {[
              { src: '/hi-highlight.mp4', label: 'Tournament Highlights' },
              { src: '/hi-200.mp4', label: 'National Champs Celebrate Oakley Style' },
              { src: '/hi-201.mp4', label: 'Ajani Shelton Trying to Teach the Boys How to Dance' },
            ].map((v, i) => (
              <div key={i} className="rounded-xl overflow-hidden bg-black border border-white/10 hover:border-red-900/40 transition-colors">
                <video controls className="w-full aspect-video bg-black" playsInline>
                  <source src={v.src} type="video/mp4" />
                </video>
                <div className="px-4 py-3">
                  <span className="text-xs font-black uppercase tracking-widest text-gray-500">{v.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-6 mb-4">
            <h2 className="text-5xl font-black uppercase shrink-0">Photo Gallery</h2>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <p className="text-gray-500 text-sm mb-12">12 years of High Intensity Football — from San Diego to Indianapolis.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
                            '/archive/10u-florida-nationals.jpg',
              '/archive/10u-pro-bowl-field.jpg',
              '/archive/12u-7v7-coastal-fog.jpg',
              '/archive/12u-champs-hands-raised.jpg',
              '/archive/12u-champs-medals-trophy.jpg',
              '/archive/12u-florida-nationals.jpg',
              '/archive/12u-mesquite-pink-cleats-blur.jpg',
              '/archive/12u-nfl-flag-regional-2023.jpg',
              '/archive/13-14u-red-hi-golden-hour.jpg',
              '/archive/14u-action-shot.jpg',
              '/archive/14u-battle-norcal-champs.jpg',
              '/archive/14u-cardinals-arizona.jpg',
              '/archive/14u-champs-cougars.jpg',
              '/archive/14u-chargers-socal.jpg',
              '/archive/14u-daygo-white-jerseys-18-deep.jpg',
              '/archive/14u-florida-nationals-hh-logo.jpg',
              '/archive/15u-mesquite-night-stadium.jpg',
              '/archive/15u-yellow-polynesian-contested-catch.jpg',
              '/archive/19-battle-jersey-polynesian-tattoo.jpg',
              '/archive/2014-original-squad.jpg',
              '/archive/2019-offseason-h-logo-era.jpg',
              '/archive/2022-15u-squad.jpg',
              '/archive/2022-champions-stage.jpg',
              '/archive/2022-champs-nfl-backdrop.jpg',
              '/archive/2022-national-champions.jpg',
              '/archive/2023-hs-squad-snow-mountains.jpg',
              '/archive/2023-nationals-gray-sweatsuits.jpg',
              '/archive/2023-squad-throwback.jpg',
              '/archive/2023-vegas-nationals-hotel.jpg',
              '/archive/2024-highlight-reel-trevor-pocket.jpg',
              '/archive/2025-nashville-squad-fire.jpg',
              '/archive/2025-nashville-squad-mesquite-black.jpg',
              '/archive/2026-offseason-18-deep-signing-day.jpg',
              '/archive/2026-offseason-ace-crew-jersey.jpg',
              '/archive/2026-offseason-vegas-full-squad.jpg',
              '/archive/2026-white-hh-nashville-squad.jpg',
              '/archive/3-mid-celebration-laughing.jpg',
              '/archive/49ers-regional-2025-champions-official.jpg',
              '/archive/49ers-regional-2025-squad.jpg',
              '/archive/7v7-era-begins-mesquite.jpg',
              '/archive/7v7-red-hh-jerseys.jpg',
              '/archive/7v7-sunny-day-squad.jpg',
              '/archive/7v7-team-dinner.jpg',
              '/archive/andrew-ho-mvp-throne.jpg',
              '/archive/atticus-full-extension-catch.jpg',
              '/archive/axel-denver-red-zone-porsche.jpg',
              '/archive/battle-champions-early.jpg',
              '/archive/battle-hh-logo-reveal-highlight.jpg',
              '/archive/battle-tournament-fun.jpg',
              '/archive/battle-vegas-pt4k-lineup.jpg',
              '/archive/battle5-la-regional-champs-check.jpg',
              '/archive/ben-williams-two-belts-daygo.jpg',
              '/archive/bray-jake-trick-play-mesquite.jpg',
              '/archive/cale-4-daygo-philippine-flag.jpg',
              '/archive/carson-playmaker-2016.jpg',
              '/archive/carson-robbie-jared-goff.jpg',
              '/archive/carson-to-willie-td.jpg',
              '/archive/carson-vance-tiktok-cant-guard.jpg',
              '/archive/championship-ring-comic-book.jpg',
              '/archive/champs-5th-6th-2016.jpg',
              '/archive/charcoal-orange-2026-jerseys.jpg',
              '/archive/chargers-squad-2016.jpg',
              '/archive/charlie-gerald-sideline.jpg',
              '/archive/chilling-between-games-signing-day.jpg',
              '/archive/coaches-belt-flag-bowl.jpg',
              '/archive/coaches-cujo-denver.jpg',
              '/archive/coaches-jake-denver.jpg',
              '/archive/coby-trev-baseball-jerseys.jpg',
              '/archive/coby-williams-red-rocks.jpg',
              '/archive/daygo-handshake-western-green-cleats.jpg',
              '/archive/daygo-helmet-design-golden-hour.jpg',
              '/archive/daygo-player-pregame-concourse.jpg',
              '/archive/deebo-pacifier-hand-on-hip.jpg',
              '/archive/desmond-championship-td.jpg',
              '/archive/desmond-highlights-mesquite.jpg',
              '/archive/desmond-mikhail-dylan-jalen.jpg',
              '/archive/desmond-open-field.jpg',
              '/archive/desmond-pass-rush.jpg',
              '/archive/desmond-taua-td-catch.jpg',
              '/archive/disney-mickey-waffles.jpg',
              '/archive/disney-world-cinderella.jpg',
              '/archive/dylan-curry-qb.jpg',
              '/archive/dylan-curry-red-plaid.jpg',
              '/archive/early-7v7-full-squad-2.jpg',
              '/archive/early-7v7-full-squad.jpg',
              '/archive/ethan-pacheco-pink-jersey.jpg',
              '/archive/fame-stadium-youth-champs.jpg',
              '/archive/faulkner-family-csu-pueblo.jpg',
              '/archive/first-7v7-mesquite-2018.jpg',
              '/archive/first-regional-champs-2015.jpg',
              '/archive/florida-nationals-chargers.jpg',
              '/archive/full-squad-night-game-red-jerseys.jpg',
              '/archive/gavin-marini-18.jpg',
              '/archive/gavin-robinson-pt4k-portrait.jpg',
              '/archive/gerald-hi-player.jpg',
              '/archive/gerald-trophy-unbothered.jpg',
              '/archive/glendale-arizona-roadtrip.jpg',
              '/archive/goat-sunset-stadium-lights.jpg',
              '/archive/golden-hour-arizona-red-hh.jpg',
              '/archive/golden-hour-sd-2026-black-jerseys.jpg',
              '/archive/good-job-boys-san-diego.jpg',
              '/archive/gray-flores-champion.jpg',
              '/archive/gray-flores-sack-nationals.jpg',
              '/archive/hard-count-champs-golden-bulldog.jpg',
              '/archive/hi-brand-coaches.jpg',
              '/archive/hi-family-mesquite.jpg',
              '/archive/hi-script-jersey-tsc-sports.jpg',
              '/archive/hi-x-mission-hills-graphic.jpg',
              '/archive/highlight-reel-pylon-mesquite.jpg',
              '/archive/highlight-reel-vegas-nationals.jpg',
              '/archive/hof-class-2018-real.jpg',
              '/archive/hof-class-2018.jpg',
              '/archive/hotel-room-chaos.jpg',
              '/archive/hs-squad-denver-black-jerseys.jpg',
              '/archive/hs-squad-denver-pink-thumbsup.jpg',
              '/archive/hs-squad-icon-series-charcoal.jpg',
              '/archive/hs-squad-red-battle-daygo-2026.jpg',
              '/archive/inside-huddle-fists-in.jpg',
              '/archive/jacob-johnson-int-red-zone-la.jpg',
              '/archive/jacob-johnson-mvp-two-belts.jpg',
              '/archive/jadyen-ethan-denver-pink.jpg',
              '/archive/jadyen-micd-up-red-zone-la.jpg',
              '/archive/jadyen-mullen-denver-john-watching.jpg',
              '/archive/jadyen-virgin-boise-state.jpg',
              '/archive/jadyen-williams-cant-guard-mesquite.jpg',
              '/archive/jadyen-williams-goat-catch-mesquite.jpg',
              '/archive/jadyen-williams-goat.jpg',
              '/archive/jadyen-williams-tiktok-pylon.jpg',
              '/archive/jake-jay-all-time-greats.jpg',
              '/archive/jake-lockdown-corner.jpg',
              '/archive/jared-brecht-chrome-hearts-cleats.jpg',
              '/archive/jared-brecht-coaching-pregame.jpg',
              '/archive/jersey-0-battle-patch-close-up.jpg',
              '/archive/joey-ace-crew-portrait.jpg',
              '/archive/joey-charlie-golden-bulldog.jpg',
              '/archive/joey-jt-sideline-nationals.jpg',
              '/archive/joey-sb7-champs-rings-trophy.jpg',
              '/archive/john-ace-crew-sideline-interview.jpg',
              '/archive/john-allegiant-stadium.jpg',
              '/archive/john-charlie-jadyen-disney.jpg',
              '/archive/john-charlie-nashville-hotel.jpg',
              '/archive/john-charlie-tucson-turf-vegas.jpg',
              '/archive/john-coaching-gavin-atticus.jpg',
              '/archive/john-family-shirt-7on7-association.jpg',
              '/archive/john-hell-yeah-championship.jpg',
              '/archive/john-on-throne-red-zone-elite.jpg',
              '/archive/john-passing-down-mvp-family-shirt.jpg',
              '/archive/john-trevor-battle5-regional-sign.jpg',
              '/archive/junior-sb7-mvp-2025.jpg',
              '/archive/kam-jersey-presentation-denver.jpg',
              '/archive/kam-pt4k-vegas-explosive.jpg',
              '/archive/kobe-hi-youth-pacifier.jpg',
              '/archive/kobe-mvp-crown-slides.jpg',
              '/archive/krete-makihele-flag.jpg',
              '/archive/krete-sara-pro-photo-2.jpg',
              '/archive/krete-sara-pro-photo.jpg',
              '/archive/la-rams-nationals-qualifier.jpg',
              '/archive/lahs-defender-on-ground.jpg',
              '/archive/landon-schromm-td-nationals.jpg',
              '/archive/limo-to-nationals.jpg',
              '/archive/little-14-red-hi-locked-in.jpg',
              '/archive/media-day-nfl-backdrop.jpg',
              '/archive/mesquite-2024-nashville-squad.jpg',
              '/archive/mesquite-jump-ball.jpg',
              '/archive/mesquite-night-game-youth-red-rocks.jpg',
              '/archive/mesquite-qb-pocket.jpg',
              '/archive/mesquite-throwback-2018-og-squad.jpg',
              '/archive/mesquite-wide-action.jpg',
              '/archive/miles-wingfield-cal-berkeley.jpg',
              '/archive/mission-hills-nolan-cujo-jay.jpg',
              '/archive/ms-squad-red-hi-norcal.jpg',
              '/archive/nashville-nationals-49ers-jerseys.jpg',
              '/archive/nashville-nfl-flag-stage-tracksuits.jpg',
              '/archive/nashville-squad-on-field-game-day.jpg',
              '/archive/nashville-vip-press-box.jpg',
              '/archive/nationals-2018-14u.jpg',
              '/archive/nationals-sf-2016-final4.jpg',
              '/archive/nationals-sf-2016-real.jpg',
              '/archive/nikita-hi-player.jpg',
              '/archive/nine-players-blessing-gesture-vegas.jpg',
              '/archive/nissan-stadium-nashville-tracksuits.jpg',
              '/archive/og-founding-four-7v7.jpg',
              '/archive/og-logo-chrome.jpg',
              '/archive/og-qb-carson.jpg',
              '/archive/og-team-last-huddle.jpg',
              '/archive/og-trio-andrew-trevor-ty.jpg',
              '/archive/passing-down-14u-champs-2025.jpg',
              '/archive/passing-down-highlight-6.jpg',
              '/archive/passing-down-hs-champs-2025.jpg',
              '/archive/passing-down-hs-champs-clap.jpg',
              '/archive/passing-down-ms-champs-basketball.jpg',
              '/archive/passing-down-ms-champs.jpg',
              '/archive/passing-down-sideline-walk-ace-crew.jpg',
              '/archive/practice-sd-fieldhouse.jpg',
              '/archive/preston-pt4k-yellow-gloves.jpg',
              '/archive/pro-bowl-19-official-10u.jpg',
              '/archive/pro-bowl-19-official-12u.jpg',
              '/archive/pro-bowl-19-official-14u.jpg',
              '/archive/pro-bowl-squad-photo.jpg',
              '/archive/pro-bowl-stadium-seats.jpg',
              '/archive/pro-bowl-venue-inside.jpg',
              '/archive/purple-hh-jerseys-2026-east-county.jpg',
              '/archive/pylon-mesquite-2024-motion-blur.jpg',
              '/archive/pylon-mesquite-crew-little-sibling.jpg',
              '/archive/qb-red-script-jersey-pocket.jpg',
              '/archive/raiders-nationals-pro-bowl-2024.jpg',
              '/archive/raiders-regional-champs-2023.jpg',
              '/archive/red-zone-champs-full-squad-throne.jpg',
              '/archive/red-zone-elite-celebration-blur.jpg',
              '/archive/red-zone-elite-champs.jpg',
              '/archive/red-zone-elite-chaos-fits.jpg',
              '/archive/red-zone-elite-highlight-reel.jpg',
              '/archive/red-zone-elite-la-2024-champs.jpg',
              '/archive/red-zone-la-golden-hour.jpg',
              '/archive/red-zone-youth-red-jerseys.jpg',
              '/archive/riley-ty-alumni.jpg',
              '/archive/riley-velacruz-incredible-catch.jpg',
              '/archive/riley-velacruz-mvp-throne.jpg',
              '/archive/road-trip-dinner-sandwich.jpg',
              '/archive/san-jose-2023-pink-jerseys.jpg',
              '/archive/sd-state-five-players-crocs.jpg',
              '/archive/smoothie-fun-florida-nationals.jpg',
              '/archive/squad-2023-offseason.jpg',
              '/archive/stalz-touchdown-end-zone-smile.jpg',
              '/archive/t-and-j-chilling-vegas.jpg',
              '/archive/t-to-j-coach-watching.jpg',
              '/archive/team-dinner-current-squad.jpg',
              '/archive/team-dinner-harbor.jpg',
              '/archive/thomas-gru-pt4k-route.jpg',
              '/archive/thomas-pick-six-nationals.jpg',
              '/archive/trev-jukes-snow-mountains.jpg',
              '/archive/trev-trevor-ty-national-champs.jpg',
              '/archive/trevor-coaching-younger-player.jpg',
              '/archive/trevor-dominating-nationals.jpg',
              '/archive/trevor-dropping-back-ref-extending.jpg',
              '/archive/trevor-nfc-allstar.jpg',
              '/archive/trevor-pete-krete-battle.jpg',
              '/archive/trevor-pocket-joey-watching.jpg',
              '/archive/trevor-qb-workout-highlight.jpg',
              '/archive/trevor-real-all-teams.jpg',
              '/archive/trevor-taumoepeau-ace-crew-portrait.jpg',
              '/archive/trevor-thomas-walking-off.jpg',
              '/archive/trevor-to-thomas-vegas-nationals.jpg',
              '/archive/trevor-to-zeke-pylon-mesquite.jpg',
              '/archive/trevor-xavier-hail-mary.jpg',
              '/archive/troy-faulkner-og-28.jpg',
              '/archive/ty-cortes-game-winning-int.jpg',
              '/archive/ty-cortes-joker-mask.jpg',
              '/archive/vegas-battle-night-game.jpg',
              '/archive/vegas-strip-hi-jerseys.jpg',
              '/archive/vohnn-ben-kobe-grass.jpg',
              '/archive/vohnn-brown-gold-cleats-route.jpg',
              '/archive/white-floral-hi-jerseys-vegas.jpg',
              '/archive/white-jerseys-night-game.jpg',
              '/archive/x-babas-red-rocks.jpg',
              '/archive/x-man-jump-ball.jpg',
              '/archive/xavier-running-girl-player-denver.jpg',
              '/archive/xavier-st-john-crocs-denver.jpg',
              '/archive/xavier-st-john-mvp-chain.jpg',
              '/archive/xavier-st-john-mvp-deadpan.jpg',
              '/archive/xavier-trevor-hof-2025.jpg',
              '/archive/young-hh-jersey-intense-look.jpg',
              '/archive/young-squad-smiles.jpg',
              '/archive/youth-pink-floral-henderson-nv.jpg',
              '/archive/zach-velasco-red-rocks.jpg',
              '/archive/jadyen-virgin-one-handed-snag.jpg',
              '/archive/ty-cortes-championship-int-field.jpg',
            ].map((src, i) => (
              <div key={src} className={`rounded overflow-hidden relative group ${i === 0 || i === 12 || i === 24 ? 'md:col-span-2 aspect-video' : 'aspect-square'}`}>
                <Image src={src} alt="High Intensity Football" fill className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section id="coaches" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-6 mb-16">
            <h2 className="text-5xl font-black uppercase shrink-0">Leadership</h2>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Charlie Taumoepeau', title: 'CEO & Co-Founder', initials: 'CT', note: 'USD Football', ig: null },
              { name: 'John Taumoepeau', title: 'Co-Founder', initials: 'JT', note: 'Oregon Ducks Football', ig: null },
              { name: 'Joey Williams', title: 'Chief Strategy Officer', initials: 'JW', note: '', ig: null },
              { name: 'Gale Flores', title: 'Chief Opportunities Officer', initials: 'GF', note: '', ig: null },
              { name: 'Anthony Bayro', title: 'Head Coach & Media Director', initials: 'AB', note: '', ig: 'bayromedia' },
              { name: 'Cale Bayro', title: 'Head Coach & Visual Producer', initials: 'CB', note: '', ig: 'cales.photos' },
              { name: 'Jayden Williams', title: 'Head Coach & Dynamic Playmaker', initials: 'JW', note: '', ig: null },
              { name: 'Brayden Williams', title: 'Head Coach & Tactics Officer', initials: 'BW', note: '', ig: null },
            ].map(p => (
              <div key={p.name} className="border border-white/10 rounded-xl p-6 hover:border-red-900/40 transition-colors group">
                <div className="w-14 h-14 rounded-full mb-4 flex items-center justify-center text-lg font-black" style={{ backgroundColor: '#CC0000' }}>
                  {p.initials}
                </div>
                <div className="font-black text-white text-sm mb-1">{p.name}</div>
                <div className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: '#CC0000' }}>{p.title}</div>
                {p.note && <div className="text-xs text-gray-600">{p.note}</div>}
                {(p as any).ig && (
                  <a href={`https://instagram.com/${(p as any).ig}`} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-xs text-gray-500 hover:text-white transition-colors">
                    IG: @{(p as any).ig}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* THE RECORD TEASER */}
      <section className="py-20 px-6 border-t border-white/5 text-center" style={{ backgroundColor: '#0d0000' }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-xs font-black tracking-[0.3em] uppercase mb-4" style={{ color: '#CC0000' }}>150+ Championships</div>
          <h2 className="text-5xl font-black uppercase mb-4">The Record</h2>
          <p className="text-gray-400 mb-8">48 league championships. 65 tournament titles. 39 7v7 championships. 14 Hall of Famers. Nationals every year since 2014.</p>
          <div className="flex justify-center gap-4 mb-8">
            {[
              { n: '48', label: 'League Titles' },
              { n: '65+', label: 'Tournament Titles' },
              { n: '39', label: '7v7 Titles' },
              { n: '14', label: 'Hall of Famers' },
            ].map(s => (
              <div key={s.label} className="text-center px-4">
                <div className="text-3xl font-black" style={{ color: '#CC0000' }}>{s.n}</div>
                <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <a href="/championships" className="inline-block font-black text-xs tracking-widest uppercase px-8 py-4 rounded text-white transition-all hover:scale-105 hover:brightness-110" style={{ backgroundColor: '#CC0000' }}>
            View Full Record →
          </a>
        </div>
      </section>

      {/* JOIN */}
      <span id="contact" aria-hidden="true" style={{ display: 'block', height: 0 }} />
      <section id="join" className="py-24 px-6 border-t border-white/5" style={{ backgroundColor: '#0d0000' }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
          <div>
            <div className="text-xs font-black tracking-[0.3em] uppercase mb-6" style={{ color: '#CC0000' }}>Get Your Athlete Involved</div>
            <h2 className="text-5xl font-black leading-tight mb-8 uppercase">
              How to join<br />
              <span className="text-gray-600">High Intensity</span>
            </h2>
            <div className="space-y-8">
              {[
                { n: '01', title: 'Reach Out', desc: 'Fill out the inquiry form or DM us on Instagram. Tell us about your athlete — age, experience, position, and goals.' },
                { n: '02', title: 'Connect', desc: 'A coach will get back to you to answer your questions and walk you through what our program looks like day-to-day.' },
                { n: '03', title: 'Evaluation', desc: 'Players come out for an evaluation. We look at ability, coachability, and how they fit within our culture.' },
                { n: '04', title: 'Welcome to the Family', desc: 'Once accepted, your athlete joins the High Intensity program and starts competing alongside some of the best youth players in SD.' },
              ].map(s => (
                <div key={s.n} className="flex gap-5 group">
                  <div className="text-3xl font-black w-10 shrink-0 group-hover:text-red-500 transition-colors" style={{ color: '#CC0000' }}>{s.n}</div>
                  <div className="pt-1">
                    <div className="font-black text-white mb-1">{s.title}</div>
                    <div className="text-gray-500 text-sm leading-relaxed">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-black uppercase mb-6">Inquire Now</h3>
            {sent ? (
              <div className="border border-white/10 rounded-xl p-12 text-center">
                <div className="text-5xl mb-4">🔥</div>
                <h3 className="text-2xl font-black uppercase mb-2">We Got You</h3>
                <p className="text-gray-500">A coach will be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={async e => {
                e.preventDefault();
                // Honeypot — bots fill this, humans don't
                if ((e.target as HTMLFormElement).querySelector<HTMLInputElement>('[name="_honey"]')?.value) return;
                setSubmitError('');
                try {
                  const res = await fetch('/api/inquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
                  if (res.ok) {
                    setSent(true);
                  } else {
                    setSubmitError('Couldn\'t send — try again or email director@highintensityfootball.com');
                  }
                } catch {
                  setSubmitError('Couldn\'t send — try again or email director@highintensityfootball.com');
                }
              }} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Parent Name</label>
                    <input type="text" required placeholder="Full name" value={form.parentName}
                      onChange={e => setForm({...form, parentName: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-700 focus:outline-none focus:border-red-700 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Kid's Name</label>
                    <input type="text" required placeholder="Athlete's full name" value={form.kidName}
                      onChange={e => setForm({...form, kidName: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-700 focus:outline-none focus:border-red-700 text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Age</label>
                    <input type="text" required placeholder="e.g. 13" value={form.age}
                      onChange={e => setForm({...form, age: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-700 focus:outline-none focus:border-red-700 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Grade</label>
                    <input type="text" required placeholder="e.g. 8th" value={form.grade}
                      onChange={e => setForm({...form, grade: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-700 focus:outline-none focus:border-red-700 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Position</label>
                    <input type="text" required placeholder="e.g. WR, QB" value={form.position}
                      onChange={e => setForm({...form, position: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-700 focus:outline-none focus:border-red-700 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Interested In (select all that apply)</label>
                  <div className="flex flex-col gap-2">
                    {programs.map(p => (
                      <label key={p} className="flex items-center gap-3 cursor-pointer group">
                        <div
                          onClick={() => toggleProgram(p)}
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                            form.program.includes(p) ? 'border-red-600 bg-red-600' : 'border-white/20 bg-transparent'
                          }`}
                        >
                          {form.program.includes(p) && <span className="text-white text-xs">✓</span>}
                        </div>
                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors" onClick={() => toggleProgram(p)}>{p}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Email</label>
                  <input type="email" required placeholder="you@email.com" value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-700 focus:outline-none focus:border-red-700 text-sm"
                  />
                </div>
                {/* Honeypot — hidden from humans, bots fill it */}
                <input name="_honey" type="text" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                <button type="submit" className="w-full font-black text-xs tracking-widest uppercase py-4 rounded-lg text-white transition-all hover:scale-105 hover:brightness-110" style={{ backgroundColor: '#CC0000' }}>
                  Submit Inquiry
                </button>

                {submitError && (
                  <p className="text-red-400 text-sm text-center">{submitError}</p>
                )}

              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 relative rounded overflow-hidden">
              <Image src="/hi-logo-mark.jpg" alt="HI" fill className="object-cover" />
            </div>
            <div>
              <div className="font-black text-xs tracking-[0.2em] uppercase" style={{ color: '#CC0000' }}>High Intensity</div>
              <div className="font-black text-xs tracking-[0.3em] uppercase text-gray-600">Football · San Diego</div>
            </div>
          </div>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-gray-600">
            <a href="#story" className="hover:text-white transition-colors">Story</a>
            <a href="#achievements" className="hover:text-white transition-colors">Wins</a>
            <a href="#highlights" className="hover:text-white transition-colors">Film</a>
            <a href="#join" className="hover:text-white transition-colors">Join</a>
          </div>
          <div className="flex gap-5">
            <a href="https://instagram.com/highintensitysd" target="_blank" rel="noopener noreferrer"
              className="text-xs font-black uppercase tracking-widest hover:underline" style={{ color: '#CC0000' }}>IG</a>
            <a href="https://tiktok.com/@highintensitysd" target="_blank" rel="noopener noreferrer"
              className="text-xs font-black uppercase tracking-widest hover:underline" style={{ color: '#CC0000' }}>TikTok</a>
            <a href="https://x.com/highintensitysd" target="_blank" rel="noopener noreferrer"
              className="text-xs font-black uppercase tracking-widest hover:underline" style={{ color: '#CC0000' }}>X</a>
          </div>
        </div>
        <div className="text-center text-gray-700 text-xs mt-8">© 2026 High Intensity Football · San Diego, California · Est. 2014</div>
      </footer>
    </main>
  );
}
