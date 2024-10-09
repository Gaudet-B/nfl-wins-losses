import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

function Root() {
  return (
    <>
      <div className="relative w-full z-20 px-4 pt-2 flex justify-start gap-3 font-semibold bg-slate-200">
        <Link to="/" className="no-underline p-2 text-blue-900 hover:underline">
          Home
        </Link>
        <Link
          to={'/barplot'}
          className="no-underline p-2 text-blue-900 hover:underline"
        >
          Circular Barplot
        </Link>
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
