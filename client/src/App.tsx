// import { useState } from 'react'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className={'flex flex-row gap-3'}>
      <a href={'/circular-barplot'} className={'text-blue-900 no-underline'}>
        Circular Barplot
      </a>
      <a href={'/word-cloud'} className={'text-blue-900 no-underline'}>
        Word Cloud
      </a>
    </div>
  )
}

export default App
