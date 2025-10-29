'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { name: 'Notes', href: '/notes' },
    { name: 'Todos', href: '/todos' },
    { name: 'Groceries', href: '/groceries' },
    { name: 'Form', href: '/form' },
    { name: 'Unsplash API', href: '/unsplash' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800 shadow-md">
      <div className="max-w-3xl mx-auto flex justify-center space-x-10 py-4">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`text-lg font-medium transition-colors duration-200 ${
                isActive
                  ? 'text-blue-400 border-b-2 border-blue-500 pb-1'
                  : 'text-gray-300 hover:text-blue-400'
              }`}
            >
              {item.name}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
