import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight, FileSearch, Search } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

function Rail({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`flex snap-x gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className}`}>{children}</div>
}

function PdfPoster({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const image = getEditablePostImage(post)
  return (
    <Link href={href} className="group block w-[190px] shrink-0 snap-start sm:w-[210px]">
      <article className="overflow-hidden rounded-[6px] border border-white/10 bg-[#1a1d21] shadow-[0_18px_48px_rgba(0,0,0,0.28)] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_26px_70px_rgba(0,0,0,0.38)]">
        <div className="relative aspect-[2/3] overflow-hidden bg-[#24282d]">
          <img src={image} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-88 transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.72))]" />
          <span className="absolute left-3 top-3 rounded-full bg-[#FEFDDF] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#101214]">PDF {index + 1}</span>
          <h3 className="absolute bottom-3 left-3 right-3 line-clamp-3 text-base font-black leading-tight text-white">{post.title}</h3>
        </div>
      </article>
    </Link>
  )
}

function FeaturedCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group relative min-h-[390px] overflow-hidden rounded-[8px] bg-[#08090a] p-6 text-[#FEFDDF] shadow-[0_24px_70px_rgba(0,0,0,0.34)]">
      <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-46 transition duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,9,10,0.12),rgba(8,9,10,0.88))]" />
      <div className="relative z-10 flex min-h-[330px] flex-col justify-end">
        <p className="text-xs font-black uppercase tracking-[0.26em] text-[#FFC81E]">Editor's PDF</p>
        <h3 className="mt-4 line-clamp-3 text-4xl font-black leading-[0.95] tracking-[-0.05em]">{post.title}</h3>
        <p className="mt-4 line-clamp-3 text-sm leading-7 text-white/72">{getEditableExcerpt(post, 160)}</p>
        <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#E87F24] px-5 py-3 text-sm font-black text-[#08090a]">Open document <ArrowRight className="h-4 w-4" /></span>
      </div>
    </Link>
  )
}

function CompactCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group rounded-[8px] border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07]">
      <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#73A5CA]">Shelf {String(index + 1).padStart(2, '0')}</p>
      <h3 className="mt-3 line-clamp-2 text-xl font-black leading-tight text-[#FEFDDF]">{post.title}</h3>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#cfc7ab]">{getEditableExcerpt(post, 115)}</p>
    </Link>
  )
}

function HorizontalCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid overflow-hidden rounded-[8px] border border-black/10 bg-[#FEFDDF] text-[#101214] shadow-[0_16px_46px_rgba(0,0,0,0.13)] transition duration-300 hover:-translate-y-1 sm:grid-cols-[150px_minmax(0,1fr)]">
      <div className="relative min-h-[150px] bg-[#24282d]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <div className="min-w-0 p-5">
        <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#E87F24]">Guide {index + 1}</p>
        <h3 className="mt-3 line-clamp-2 text-2xl font-black leading-tight">{post.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-black/65">{getEditableExcerpt(post, 130)}</p>
      </div>
    </Link>
  )
}

function EditorialListItem({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid grid-cols-[52px_minmax(0,1fr)] gap-4 border-t border-white/10 py-5">
      <span className="font-serif text-4xl leading-none text-[#E87F24]">{String(index + 1).padStart(2, '0')}</span>
      <span className="min-w-0">
        <span className="text-[11px] font-black uppercase tracking-[0.22em] text-[#FFC81E]">{getEditableCategory(post)}</span>
        <span className="mt-2 block line-clamp-2 text-xl font-black leading-tight text-[#FEFDDF] transition group-hover:text-[#FFC81E]">{post.title}</span>
      </span>
    </Link>
  )
}

function ImageFirstCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group block overflow-hidden rounded-[8px] bg-[#FEFDDF] text-[#101214] shadow-[0_18px_54px_rgba(0,0,0,0.16)] transition duration-300 hover:-translate-y-1">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#24282d]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#E87F24]">Preview</p>
        <h3 className="mt-3 line-clamp-2 text-2xl font-black leading-tight">{post.title}</h3>
      </div>
    </Link>
  )
}

function PdfIllustration() {
  return (
    <div className="relative min-h-[360px] overflow-hidden rounded-bl-[120px] bg-[#FEFDDF] md:min-h-[430px]">
      <div className="absolute -right-12 top-5 h-64 w-64 rounded-full bg-[#E87F24]" />
      <div className="absolute right-16 top-16 h-52 w-40 rotate-12 rounded-[8px] bg-white shadow-2xl">
        <div className="h-12 rounded-t-[8px] bg-[#E87F24]" />
        <div className="space-y-3 p-5">
          <div className="h-3 rounded-full bg-black/20" />
          <div className="h-3 w-2/3 rounded-full bg-black/20" />
          <div className="mt-6 grid grid-cols-2 gap-2">
            <div className="h-16 rounded bg-[#73A5CA]/60" />
            <div className="h-16 rounded bg-[#FFC81E]/70" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-10 h-44 w-32 -rotate-6 rounded-[8px] bg-[#73A5CA] shadow-xl">
        <div className="p-5 text-center text-4xl font-black text-[#101214]">PDF</div>
        <div className="mx-5 h-2 rounded-full bg-[#101214]/30" />
        <div className="mx-5 mt-3 h-2 w-2/3 rounded-full bg-[#101214]/30" />
      </div>
      <div className="absolute left-1/2 top-1/2 flex h-24 w-[360px] max-w-[80%] -translate-x-1/2 -translate-y-1/2 items-center gap-4 rounded-full bg-white px-7 shadow-[0_18px_45px_rgba(0,0,0,0.18)]">
        <Search className="h-7 w-7 text-[#101214]" />
        <span className="text-sm font-black text-[#101214]">invoice templates</span>
      </div>
    </div>
  )
}

export function EditableHomeHero({ primaryTask: _primaryTask, primaryRoute }: HomeSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#101214] text-[#FEFDDF]">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-8 lg:py-20">
        <div>
          <h1 className="mt-5 max-w-3xl font-serif text-5xl font-black leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">Documents better than messy folders.</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#cfc7ab]">Search, read, and discover practical PDF resources with a polished magazine feel made for people who love well-kept documents.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={primaryRoute} className="rounded-full bg-[#E87F24] px-8 py-3.5 text-sm font-black text-[#08090a]">Get started</Link>
            <Link href="/search" className="rounded-full border border-white/15 px-8 py-3.5 text-sm font-black text-[#FEFDDF]">Search PDFs</Link>
          </div>
        </div>
        <PdfIllustration />
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const railPosts = posts.slice(0, 12)
  if (!railPosts.length) return null
  return (
    <section className="relative overflow-hidden bg-[#FEFDDF] text-[#101214]">
      <div className="absolute bottom-0 right-[-8%] h-80 w-[46%] rounded-tl-full bg-white" />
      <div className="relative mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-4xl font-black tracking-[-0.04em]">Trending now</h2>
          <Link href={primaryRoute} className="hidden rounded-full bg-[#101214] px-5 py-3 text-sm font-black text-[#FEFDDF] sm:inline-flex">See all</Link>
        </div>
        <Rail className="mt-8">
          {railPosts.map((post, index) => <PdfPoster key={post.id || post.slug || post.title} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
        </Rail>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const featured = posts.slice(0, 9)
  if (!featured.length) return null
  return (
    <section className="bg-[#15171a] text-[#FEFDDF]">
      <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[8px] bg-[#b7c7f4] p-8 text-[#101214] sm:p-12">
          <h2 className="text-center text-4xl font-black tracking-[-0.04em] sm:text-5xl">Must-read {taskLabel(primaryTask).toLowerCase()}</h2>
          <Rail className="mt-10 justify-start lg:justify-center">
            {featured.slice(0, 7).map((post, index) => <PdfPoster key={post.id || post.slug || post.title} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
          </Rail>
        </div>
      </div>
      <div className="mx-auto grid max-w-[1440px] gap-5 px-4 pb-16 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.1fr_0.9fr_0.9fr] lg:px-8">
        {featured[0] ? <FeaturedCard post={featured[0]} href={postHref(primaryTask, featured[0], primaryRoute)} /> : null}
        {featured.slice(1, 5).map((post, index) => <CompactCard key={post.id || post.slug || post.title} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = timeSections.flatMap((section) => section.posts).length ? timeSections.flatMap((section) => section.posts) : posts.slice(4)
  const feature = pool[0] || posts[0]
  const horizontal = pool.slice(1, 5)
  const list = pool.slice(5, 11)
  const imageCards = pool.slice(11, 15)
  return (
    <section className="bg-[#f4f4f4] text-[#101214]">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8">
        <div>
          <h2 className="max-w-xl text-5xl font-black leading-tight tracking-[-0.05em]">All the formats. All the notes. All in one shelf.</h2>
          <p className="mt-5 max-w-lg text-lg leading-8 text-black/68">Find your next useful PDF by category, title, or mood. The layout keeps browsing fast without losing the premium reading feel.</p>
          <form action="/search" className="mt-8 flex max-w-xl rounded-full bg-white p-2 shadow-[0_16px_42px_rgba(0,0,0,0.12)]">
            <input name="q" placeholder="Search PDF topics" className="min-w-0 flex-1 bg-transparent px-5 text-sm font-semibold outline-none" />
            <button className="inline-flex items-center gap-2 rounded-full bg-[#101214] px-6 py-3 text-sm font-black text-white"><Search className="h-4 w-4" /> Search</button>
          </form>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {horizontal.map((post, index) => <HorizontalCard key={post.id || post.slug || post.title} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
        </div>
      </div>

      <div className="bg-[#101214]">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:px-8">
          {feature ? <FeaturedCard post={feature} href={postHref(primaryTask, feature, primaryRoute)} /> : null}
          <div>
            <h2 className="font-serif text-4xl font-black tracking-[-0.04em] text-[#FEFDDF]">Editor's index</h2>
            <div className="mt-6">
              {list.map((post, index) => <EditorialListItem key={post.id || post.slug || post.title} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
            </div>
          </div>
        </div>
      </div>

      {imageCards.length ? (
        <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black tracking-[-0.04em]">Read. Save. Use.</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {imageCards.map((post) => <ImageFirstCard key={post.id || post.slug || post.title} post={post} href={postHref(primaryTask, post, primaryRoute)} />)}
          </div>
        </div>
      ) : null}
    </section>
  )
}

export function EditableHomeCta() {
  return (
    <section id="get-app" className="relative overflow-hidden bg-[#73A5CA] text-[#101214]">
      <div className="absolute inset-y-0 left-0 w-1/2 bg-[#E87F24]" style={{ clipPath: 'polygon(0 0, 88% 0, 66% 100%, 0 100%)' }} />
      <div className="relative mx-auto grid max-w-[1440px] gap-8 px-4 py-20 sm:px-6 lg:items-center lg:px-8">
        <div className="min-h-[360px]">
          <div className="h-64 max-w-xl rounded-[8px] bg-[#FEFDDF]/82 p-8 shadow-2xl">
            <FileSearch className="h-12 w-12" />
            <h2 className="mt-8 max-w-md text-5xl font-black leading-tight tracking-[-0.05em]">Your PDF reading is going places</h2>
          </div>
        </div>
      </div>
    </section>
  )
}
