import { CalendarDays } from 'lucide-react';
export default function BeritaCard({gambar,judul,tanggal,deskripsi}){
    return(<>
        <div className=" group flex h-full w-full flex-col gap-3 overflow-hidden rounded-xl bg-white shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3p 1px_rgba(60,64,67,0.15)] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_8px_20px_rgba(60,64,67,0.18)] cursor-pointer active:scale-[0.98]">
            <div className="w-full h-[45%]">
                <img src = {gambar} alt = {judul}  className="object-cover rounded-t-xl w-full h-full"/>
            </div>
            <div className="w-full h-full flex flex-col px-2 gap-2">
                <p className="text-md font-bold w-full ">{judul}</p>
                <div className='flex w-full gap-4'>
                    <CalendarDays size={18} />
                    <p>{tanggal}</p>
                </div>
            </div>
        </div>
    </>)
}