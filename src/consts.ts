export type Site = {
  TITLE: string
  DESCRIPTION: string
  EMAIL: string
  NUM_POSTS_ON_HOMEPAGE: number
  POSTS_PER_PAGE: number
  SITEURL: string
}

export type Link = {
  href: string
  label: string
}

export const SITE: Site = {
  TITLE: 'henry',
  DESCRIPTION:
    'LOG',
    EMAIL: 'c.henry.9209@gmail.com',
    NUM_POSTS_ON_HOMEPAGE: 5,
  POSTS_PER_PAGE: 4,
  SITEURL: 'https://henry-alpha.vercel.app',
}

export const NAV_LINKS: Link[] = [
  { href: '/blog', label: 'blog' },
  // { href: '/authors', label: 'authors' },
  { href: '/about', label: 'about' },
  // { href: '/tags', label: 'tags' },
]

export const SOCIAL_LINKS: Link[] = [
  { href: 'https://github.com/o-henry', label: 'GitHub' },
  // { href: 'https://twitter.com/enscry', label: 'Twitter' },
  { href: 'c.henry.9209@gmail.com', label: 'Email' },
  { href: '/rss.xml', label: 'RSS' },
]
