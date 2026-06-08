import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: pagesContent.auth.signup.metadataDescription })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#fffdf6] text-[#08090a]">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[var(--editable-container)] items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1fr] lg:px-8">
          <div className="rounded-[8px] border border-black/10 bg-white p-6 text-[#08090a] shadow-[0_24px_70px_rgba(16,36,31,0.10)] sm:p-8">
            <h1 className="text-3xl font-black">{pagesContent.auth.signup.formTitle}</h1>
            <EditableLocalSignupForm />
            <p className="mt-5 text-sm text-black/70">Already have an account? <Link href="/login" className="font-black text-[#007780] underline-offset-4 hover:underline">{pagesContent.auth.signup.loginCta}</Link></p>
          </div>
          <div className="rounded-[8px] bg-[#101214] p-7 text-[#FEFDDF] shadow-[0_24px_70px_rgba(0,0,0,0.16)] lg:p-10">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#E87F24]">{pagesContent.auth.signup.badge}</p>
            <h2 className="mt-5 max-w-xl font-serif text-5xl font-black leading-[0.98] sm:text-6xl">{pagesContent.auth.signup.title}</h2>
            <p className="mt-6 max-w-lg text-sm font-semibold leading-8 text-[#cfc7ab]">{pagesContent.auth.signup.description}</p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
