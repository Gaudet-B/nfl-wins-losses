import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

function Root() {
  // const isHome = window.location.pathname === '/'
  // const isBarplot = window.location.pathname === '/barplot'
  return (
    <>
      <div className="relative w-full z-20 px-4 pt-2 flex justify-start gap-3 font-semibold bg-slate-200">
        <Link
          to="/"
          // className={`no-underline p-2 translate-y-[1px] ${isHome ? 'bg-white border-s border-t border-e rounded-t text-blue-400' : 'text-blue-900 hover:underline'}`}
          className="no-underline p-2 text-blue-900 hover:underline"
          // disabled={isHome}
        >
          Home
        </Link>
        <Link
          to={'/barplot'}
          // className={`no-underline p-2 translate-y-[1px] ${isBarplot ? 'bg-white border-s border-t border-e rounded-t text-blue-400' : 'text-blue-900 hover:underline'}`}
          className="no-underline p-2 text-blue-900 hover:underline"
          // disabled={isBarplot}
        >
          Circular Barplot
        </Link>
        {/* <Link
        to={'/wordcloud'}
        className={'text-blue-900 no-underline hover:underline'}
      >
        Word Cloud
      </Link> */}
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
