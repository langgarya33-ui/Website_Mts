import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
export default function PublicLayout(){
    const { pathname } = useLocation();

    // Kembali ke atas setiap pindah halaman
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return(<>
        <Navbar/>
        <main>
         <Outlet/>
        </main>
        <Footer/>
    </>)
}
