'use client'

import { Building2, FileText, Image as ImageIcon, Mail, MapPin, Phone, Sparkles, Bookmark } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

function getTone(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return {
      shell: 'bg-[#fffdf6] text-[#08090a]',
      panel: 'border border-black/10 bg-white',
      soft: 'border border-black/10 bg-[#FEFDDF]',
      muted: 'text-black/65',
      action: 'bg-[#007780] text-white hover:bg-[#006a72]',
    }
  }
  if (kind === 'editorial') {
    return {
      shell: 'bg-[#fffdf6] text-[#08090a]',
      panel: 'border border-black/10 bg-white',
      soft: 'border border-black/10 bg-[#FEFDDF]',
      muted: 'text-black/65',
      action: 'bg-[#007780] text-white hover:bg-[#006a72]',
    }
  }
  if (kind === 'visual') {
    return {
      shell: 'bg-[#fffdf6] text-[#08090a]',
      panel: 'border border-black/10 bg-white',
      soft: 'border border-black/10 bg-[#FEFDDF]',
      muted: 'text-black/65',
      action: 'bg-[#007780] text-white hover:bg-[#006a72]',
    }
  }
  return {
    shell: 'bg-[#fffdf6] text-[#08090a]',
    panel: 'border border-black/10 bg-white',
    soft: 'border border-black/10 bg-[#FEFDDF]',
    muted: 'text-black/65',
    action: 'bg-[#007780] text-white hover:bg-[#006a72]',
  }
}

export default function ContactPage() {
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const tone = getTone(productKind)

  const lanes =
    productKind === 'directory'
      ? [
          { icon: Building2, title: 'Business onboarding', body: 'Add listings, verify operational details, and bring your business surface live quickly.' },
          { icon: Phone, title: 'Partnership support', body: 'Talk through bulk publishing, local growth, and operational setup questions.' },
          { icon: MapPin, title: 'Coverage requests', body: 'Need a new geography or category lane? We can shape the directory around it.' },
        ]
      : productKind === 'editorial'
        ? [
            { icon: FileText, title: 'Editorial submissions', body: 'Pitch essays, columns, and long-form ideas that fit the publication.' },
            { icon: Mail, title: 'Newsletter partnerships', body: 'Coordinate sponsorships, collaborations, and issue-level campaigns.' },
            { icon: Sparkles, title: 'Contributor support', body: 'Get help with voice, formatting, and publication workflow questions.' },
          ]
        : productKind === 'visual'
          ? [
              { icon: ImageIcon, title: 'Creator collaborations', body: 'Discuss gallery launches, creator features, and visual campaigns.' },
              { icon: Sparkles, title: 'Licensing and use', body: 'Reach out about usage rights, commercial requests, and visual partnerships.' },
              { icon: Mail, title: 'Media kits', body: 'Request creator decks, editorial support, or visual feature placement.' },
            ]
          : [
              { icon: Bookmark, title: 'Collection submissions', body: 'Suggest resources, boards, and links that deserve a place in the library.' },
              { icon: Mail, title: 'Resource partnerships', body: 'Coordinate curation projects, reference pages, and link programs.' },
              { icon: Sparkles, title: 'Curator support', body: 'Need help organizing shelves, collections, or profile-connected boards?' },
            ]

  return (
    <EditableSiteShell className={tone.shell}>
      <main className="mx-auto max-w-[var(--editable-container,1440px)] px-4 py-14 text-[#08090a] sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#E87F24]">{pagesContent.contact.eyebrow}</p>
            <h1 className="mt-4 max-w-2xl font-serif text-5xl font-black leading-[0.96] text-white sm:text-7xl">{pagesContent.contact.title}</h1>
            <p className="mt-5 max-w-2xl text-sm font-semibold leading-8 text-white/85">{pagesContent.contact.description}</p>
            <div className="mt-8 space-y-4">
              {lanes.map((lane) => (
                <div key={lane.title} className={`rounded-[8px] p-5 ${tone.soft}`}>
                  <lane.icon className="h-5 w-5 text-[#007780]" />
                  <h2 className="mt-3 text-xl font-black">{lane.title}</h2>
                  <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-[8px] p-7 text-[#08090a] shadow-[0_24px_70px_rgba(0,0,0,0.10)] ${tone.panel}`}>
            <h2 className="text-2xl font-black">{pagesContent.contact.formTitle}</h2>
            <EditableContactLeadForm />
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
