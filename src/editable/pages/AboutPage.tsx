import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#fffdf6] px-4 py-14 text-[#08090a] sm:px-6 lg:px-8">
        <section className="mx-auto max-w-[var(--editable-container)]">
          <article className="grid gap-8 rounded-[8px] bg-[#101214] p-7 text-[#FEFDDF] shadow-[0_24px_70px_rgba(0,0,0,0.16)] lg:grid-cols-[1.05fr_0.95fr] lg:p-10">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#E87F24]">{pagesContent.about.badge}</p>
              <h1 className="mt-5 max-w-3xl font-serif text-5xl font-black leading-[0.95] sm:text-7xl">About {SITE_CONFIG.name}</h1>
              <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-[#cfc7ab]">{pagesContent.about.description}</p>
            </div>
            <div className="rounded-[8px] bg-[#FEFDDF] p-6 text-[#08090a]">
              <h2 className="text-3xl font-black leading-tight">{pagesContent.about.title}</h2>
              <div className="mt-6 space-y-4 text-sm font-semibold leading-8 text-black/68">
              {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
          </article>
          <aside className="mt-8 grid gap-4 md:grid-cols-3">
            {pagesContent.about.values.map((value) => (
              <div key={value.title} className="rounded-[8px] border border-black/10 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-black">{value.title}</h2>
                <p className="mt-3 text-sm font-semibold leading-7 text-black/65">{value.description}</p>
              </div>
            ))}
          </aside>
        </section>
      </main>
    </EditableSiteShell>
  )
}
