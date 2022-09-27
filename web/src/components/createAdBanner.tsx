import { MagnifyingGlassPlus } from "phosphor-react"
import * as Dialog from '@radix-ui/react-dialog'



export const CreateAdBanner = () => {
    return (
        <div className='pt-1 bg-nlw-gradient self-stretch rounded-lg mt-8 overflow-hidden'>
            <div className='bg-[#2A2634] px-8 py-6 self-stretch flex flex-row justify-between'>
            <div className='flex flex-col'>
                <strong className='font-black text-white text-2xl'>Não encontrou seu duo?</strong>
                <span className='font-thin text-zinc-400'>Publique um anúncio para encontrar novos players!</span>
            </div>
            <Dialog.Trigger className='py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded-md flex items-center gap-3'>
                <MagnifyingGlassPlus size={24}/>
                Publicar Anúncio
            </Dialog.Trigger>
            </div>
        </div>
    )
}