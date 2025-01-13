import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/barplot', label: 'Circular Barplot' },
  { to: '/animated-background', label: 'Animated Background' },
]

function Root() {
  return (
    <>
      <div className="relative w-full z-20 px-4 pt-2 flex justify-start gap-3 font-semibold bg-slate-200">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.label.replace(' ', '-').toLowerCase()}
            to={link.to}
            className="no-underline p-2 text-blue-900 hover:underline"
          >
            {link.label}
          </Link>
        ))}
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}

export const Route = createRootRoute({
  component: Root,
})
