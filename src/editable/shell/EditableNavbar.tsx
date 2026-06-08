'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const navItems = useMemo(
    () => SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => ({ label: task.label, href: task.route })),
    []
  )
  const browseItems = navItems.slice(0, 6)

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#fffdf6]/96 text-[#08090a] backdrop-blur-xl">
      <nav className="mx-auto flex min-h-[64px] w-full max-w-[var(--editable-container,1440px)] items-center gap-5 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-3" aria-label={SITE_CONFIG.name}>
          <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-9 w-9 object-contain" />
          </span>
        </Link>

        <div className="hidden items-center gap-6 text-sm font-black md:flex">
          <Link href="/pdf" className="inline-flex items-center gap-1.5">{SITE_CONFIG.name}</Link>
        </div>

        <form action="/search" className="mx-auto hidden min-w-0 flex-1 justify-center md:flex">
          <label className="relative flex h-10 w-full max-w-sm items-center rounded-[6px] border border-black/15 bg-white px-3 shadow-sm transition focus-within:border-[#E87F24]">
            <Search className="h-4 w-4 opacity-55" />
            <input name="q" type="search" placeholder="Search PDF" className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-black/55" />
          </label>
        </form>

        <div className="hidden items-center gap-1 xl:flex">
          {browseItems.slice(0, 3).map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link key={item.href} href={item.href} className={`rounded-full px-3 py-2 text-sm font-black transition ${active ? 'bg-[#101214] text-[#FEFDDF]' : 'hover:bg-black/5'}`}>
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          {session ? (
            <>
              <Link href="/create" className="hidden items-center gap-1.5 px-3 py-2 text-sm font-black sm:inline-flex">Write</Link>
              <button type="button" onClick={logout} className="hidden rounded-full px-3 py-2 text-sm font-black hover:bg-black/5 sm:inline-flex">Logout</button>
            </>
          ) : (
            <>
              <Link href="/create" className="hidden items-center gap-1.5 px-3 py-2 text-sm font-black lg:inline-flex">Write</Link>
              <Link href="/login" className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-black hover:bg-black/5 sm:inline-flex">Log in</Link>
              <Link href="/signup" className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-black hover:bg-black/5 sm:inline-flex">Sign Up</Link>
            </>
          )}
          <button type="button" onClick={() => setOpen((value) => !value)} className="rounded-full border border-black/15 bg-white p-2 lg:hidden" aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-black/10 bg-[#fffdf6] px-4 py-4 lg:hidden">
          <form action="/search" className="mb-4 flex rounded-xl border border-black/15 bg-white px-3 py-2">
            <Search className="mt-1 h-4 w-4 opacity-55" />
            <input name="q" type="search" placeholder="Search PDF" className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none" />
          </form>
          <div className="grid gap-2">
            {[{ label: 'Home', href: '/' }, ...browseItems, { label: 'Contact', href: '/contact' }, ...(session ? [{ label: 'Create', href: '/create' }] : [{ label: 'Login', href: '/login' }, { label: 'Sign up', href: '/signup' }])].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-black">
                {item.label}
              </Link>
            ))}
            {session ? <button type="button" onClick={logout} className="rounded-xl border border-black/10 bg-white px-4 py-3 text-left text-sm font-black">Logout</button> : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}
