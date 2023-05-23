import { PropsWithChildren } from 'react'
import './globals.css'
import NavBar from './navbar'

export const metadata = {
  title: 'Footballsim',
  description: 'Generated by create next app',
}

function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-gray-100">
        <div className="min-h-screen p-2 flex flex-col gap-2">
          <header className="bg-gray-900 rounded flex gap-8">
            <NavBar />
          </header>
          <main className="bg-gray-900 flex-1 rounded p-2">{children}</main>
        </div>
      </body>
    </html>
  )
}

export default Layout
