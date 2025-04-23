import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

const navLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/questions', label: 'Manage questions' },
  { href: '/questionnaires', label: 'Manage previsit forms' },
  { href: '/ehr-field-mappings', label: 'Ehr field mappings' },
  { href: '/submissions', label: 'Patient responses' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen">
      <aside className="w-64 bg-gray-100 p-4 border-r">
        <h2 className="text-xl font-bold mb-6">Previsit Console</h2>
        <nav className="space-y-2">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'block px-3 py-2 rounded hover:bg-gray-200 text-sm font-medium'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Separator className="my-4" />
        <p className="text-xs text-muted-foreground">Tenant: <strong>clinic_xyz</strong></p>
      </aside>

      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  )
}
