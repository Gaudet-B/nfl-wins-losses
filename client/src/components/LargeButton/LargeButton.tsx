import { Link } from '@tanstack/react-router'
import preview from '../../data/preview.svg'

export function LargeButton({ route }: { route: '/barplot' | '/wordcloud' }) {
  return (
    <Link to={route}>
      <button
        className="group h-[300px] w-[400px] border  text-start hover:border-blue-500 rounded-lg overflow-hidden border-white transition-transform duration-1000"
        // style={{ transition: '', paddingTop: '50px' }}
      >
        <div className="relative z-10 pt-4 h-[380px] w-[500px] bg-blue-500 rounded-lg transition-transform duration-500 group-hover:-translate-y-full">
          {/* circular barplot */}
        </div>
        <div
          className="h-[300px] w-[400px] mt-12 bg-bottom bg-no-repeat bg-contain group-hover:translate-x-0 transition-transform duration-0 -translate-y-96"
          style={{
            backgroundImage: `url(${preview})`,
          }}
        />
        <span className="absolute z-30 text-white group-hover:text-transparent -translate-y-[500px] translate-x-36 text-lg">
          circular barplot
        </span>
      </button>
      {/* <img src={preview} /> */}
    </Link>
  )
}
