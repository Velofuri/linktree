import { ReactNode } from 'react'

type SocialProps = {
  children: ReactNode
  url: string
}

export function Social({ children, url }: SocialProps) {
  return (
    <a href={url} target='_blank'>
      {children}
    </a>
  )
}
