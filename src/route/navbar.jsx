export default function Navbar(){
    return(
        <div className="fixed top-0 z-10 flex h-14 border border-b bg-white border-black w-full">
            <div className="flex w-20 justify-center items-center text-center"> 
                <a href="/" className="text-[1vw] font-bold">TOKO MUSIK</a> 
            </div>

            <nav className="relative h-full w-[400px] m-auto">
                <ul className="flex justify-around items-center h-full">
                    <li>
                        <a href="/list-toko">List Toko</a> 
                    </li>
                    <li>
                        <a href="/product">Product Toko</a>
                    </li>
                    <li>
                        <a href="/category">Kategori</a> 
                    </li>
                </ul>
            </nav>

            <div className="flex shadow-sm items-center ">
                <input type="text" className="flex border border-opacity-80 p-1 mr-3" placeholder="Cari Sesuatu"/>
            </div>
        </div>
    )
}