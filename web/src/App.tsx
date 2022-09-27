import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

import './styles/main.css'

import { GameBanner } from './components/gameBanner'
import { CreateAdBanner } from './components/createAdBanner'
import { CreateAdModal } from './components/createAdModal'
import logoImg from './assets/Logo.svg'
import axios from 'axios'

interface Game {
  id: string,
  title: string,
  bannerUrl: string,
  _count: {
    ads: number
  },
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios('http://localhost:3000/games')
    .then(response => {
      setGames(response.data)
    })
  }, [])

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} alt="" />
      <h1 className='text-7xl text-white font-black mt-20'>
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.
      </h1>
      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.length ? 
          games.map((game) => (
            <GameBanner
              key={game.id}
              title={game.title}
              adsCount={game._count.ads}
              bannerUrl={game.bannerUrl}
            />
          )) : null
        }
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
