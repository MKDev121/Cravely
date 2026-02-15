import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from './Components/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Cravely',
  description: 'Find nearby restaurants and cafés with the best prices for your desired food.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
