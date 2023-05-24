'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PropsWithChildren } from 'react'

interface Props {
  href: string
}

function NavBarItem({ href, children }: PropsWithChildren<Props>) {
  const pathName = usePathname()

  return (
    <li
      className={`p-2 rounded ${
        href.length > 1 && pathName.startsWith(href) && 'bg-gray-600'
      }`}
    >
      <Link href={href}>{children}</Link>
    </li>
  )
}

export default NavBarItem
