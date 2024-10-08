import { Link } from '@tanstack/react-router'
import preview from '../../data/preview.svg'

export function LargeButton({ route }: { route: '/barplot' | '/wordcloud' }) {
  return (
    <Link to={route}>
      <button
        className="group h-[300px] w-[400px] border hover:border-blue-500 text-blue-500 rounded-lg overflow-hidden border-white hover:h-[400px] hover:w-[500px] transition-all duration-500"
        // style={{ transition: '', paddingTop: '50px' }}
      >
        <div className="absolute z-10 pt-4 h-[300px] w-[400px] bg-blue-500 group-hover:bg-transparent text-white group-hover:text-transparent rounded-lg transition-all duration-500">
          circular barplot
        </div>
        <div
          className="h-[380px] w-[500px] mt-12 bg-bottom bg-no-repeat bg-contain -translate-x-10 -translate-y-6 group-hover:translate-x-0 transition-all duration-500"
          style={{
            backgroundImage: `url(${preview})`,
          }}
        />
      </button>
      {/* <img src={preview} /> */}
    </Link>
  )
}
