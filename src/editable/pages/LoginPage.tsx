import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: pagesContent.auth.login.metadataDescription })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#fffdf6] text-[#08090a]">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[var(--editable-container)] items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div className="rounded-[8px] bg-[#101214] p-7 text-[#FEFDDF] shadow-[0_24px_70px_rgba(0,0,0,0.16)] lg:p-10">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#E87F24]">{pagesContent.auth.login.badge}</p>
            <h1 className="mt-5 max-w-xl font-serif text-5xl font-black leading-[0.98] sm:text-6xl">{pagesContent.auth.login.title}</h1>
            <p className="mt-6 max-w-lg text-sm font-semibold leading-8 text-[#cfc7ab]">{pagesContent.auth.login.description}</p>
          </div>
          <div className="rounded-[8px] border border-black/10 bg-white p-6 text-[#08090a] shadow-[0_24px_70px_rgba(16,36,31,0.10)] sm:p-8">
            <h2 className="text-2xl font-black">{pagesContent.auth.login.formTitle}</h2>
            <EditableLocalLoginForm />
            <p className="mt-5 text-sm text-black/70">New here? <Link href="/signup" className="font-black text-[#007780] underline-offset-4 hover:underline">{pagesContent.auth.login.createCta}</Link></p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
