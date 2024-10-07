import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="w-full p-2 flex justify-center gap-6 font-semibold">
        <Link to="/" className={'text-blue-900 no-underline hover:underline'}>
          Home
        </Link>
        <Link
          to={'/barplot'}
          className={'text-blue-900 no-underline hover:underline'}
        >
          Circular Barplot
        </Link>
        <Link
          to={'/wordcloud'}
          className={'text-blue-900 no-underline hover:underline'}
        >
          Word Cloud
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
