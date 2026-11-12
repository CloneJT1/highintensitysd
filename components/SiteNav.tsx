'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/schedule', label: 'Schedule' },
  { href: '/#origins', label: 'Origins' },
  { href: '/#story', label: 'Story' },
  { href: '/#achievements', label: 'Wins' },
  { href: '/#the-road', label: 'The Road' },
  { href: '/championships', label: 'Record' },
  { href: '/#coaches', label: 'Leadership' },
  { href: '/#highlights', label: 'Highlights' },
] as const;

function linkClass(href: string, pathname: string) {
  const active = href === pathname;
  if (active) {
    return 'text-white underline decoration-[#CC0000] decoration-2 underline-offset-[6px]';
  }
  if (href === '/schedule') {
    return 'text-[#CC0000] hover:text-white';
  }
  return 'text-gray-400 hover:text-white';
}

function NavLinks({ className }: { className: string }) {
  const pathname = usePathname();

  return (
    <div className={className}>
      {NAV_LINKS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={item.href === pathname ? 'page' : undefined}
          className={`shrink-0 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#CC0000] ${linkClass(item.href, pathname)}`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export default function SiteNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5" aria-label="Primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        <Link href="/" aria-label="High Intensity Football" className="flex items-center gap-3 shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#CC0000] rounded-sm">
          <div className="h-9 w-9 relative rounded overflow-hidden">
            <Image src="/hi-logo-mark.jpg" alt="" fill className="object-cover" />
          </div>
          <div className="leading-none hidden min-[380px]:block" aria-hidden="true">
            <div className="font-black text-xs tracking-[0.2em] uppercase" style={{ color: '#CC0000' }}>High Intensity</div>
            <div className="font-black text-xs tracking-[0.3em] uppercase text-gray-400">Football</div>
          </div>
        </Link>
        <NavLinks className="hidden xl:flex items-center gap-4 2xl:gap-6 text-[11px] 2xl:text-xs font-bold tracking-[0.14em] 2xl:tracking-widest uppercase" />
        <div className="flex items-center gap-3 shrink-0">
          <a href="https://instagram.com/highintensitysd" target="_blank" rel="noopener noreferrer" className="hidden sm:block text-gray-400 hover:text-white transition-colors" title="Instagram">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            <span className="sr-only">Instagram</span>
          </a>
          <a href="https://tiktok.com/@highintensitysd" target="_blank" rel="noopener noreferrer" className="hidden sm:block text-gray-400 hover:text-white transition-colors" title="TikTok">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.78a4.85 4.85 0 01-1.01-.09z"/></svg>
            <span className="sr-only">TikTok</span>
          </a>
          <a href="https://x.com/highintensitysd" target="_blank" rel="noopener noreferrer" className="hidden sm:block text-gray-400 hover:text-white transition-colors font-black text-sm" title="X">
            <span aria-hidden="true">𝕏</span>
            <span className="sr-only">X</span>
          </a>
          <Link href="/#join" className="text-xs font-black tracking-widest uppercase px-3 sm:px-5 py-2.5 rounded text-white transition-all hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" style={{ backgroundColor: '#CC0000' }}>
            Get Involved
          </Link>
        </div>
      </div>
      <div className="xl:hidden nav-scroll flex items-center gap-5 overflow-x-auto border-t border-white/5 px-4 sm:px-6 py-2.5">
        <NavLinks className="flex gap-5 text-[11px] font-bold tracking-[0.18em] uppercase" />
        <div className="flex sm:hidden items-center gap-4 pr-1">
          <a href="https://instagram.com/highintensitysd" target="_blank" rel="noopener noreferrer" className="text-gray-400" aria-label="Instagram">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
          <a href="https://tiktok.com/@highintensitysd" target="_blank" rel="noopener noreferrer" className="text-gray-400" aria-label="TikTok">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.78a4.85 4.85 0 01-1.01-.09z"/></svg>
          </a>
          <a href="https://x.com/highintensitysd" target="_blank" rel="noopener noreferrer" className="text-gray-400 font-black text-sm" aria-label="X">
            <span aria-hidden="true">𝕏</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
