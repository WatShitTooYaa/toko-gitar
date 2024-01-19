export default function Footer(){
    return(
        <footer className="relative bg-[#EEEEEE] h-[350px] shadow-inner">
            <div className="flex w-full h-full flex-col">
                
                <div className="flex w-full h-full items-center relative top-0">
                    <div className="w-[35vw] h-[250px] ml-8 flex flex-col">
                        <div className="flex font-bold">
                            <p>
                                TOKO MUSIK
                            </p>
                        </div>
                        <div className="flex h-3/4 mt-auto">
                            <p>
                                TOKO MUSIK adalah website untuk mencari toko musik
                                terbaik. TOKO MUSIK adalah perantara pelanggan untuk
                                menemukan toko atau jasa yang menjual alat musik. TOKO
                                MUSIK akan selalu memberikan informasi terbaik untuk
                                memuaskan anda sebagai pecinta musik.
                            </p>
                        </div>
                    </div>

                    <div className="flex relative w-[100vh] h-[250px] ml-auto mr-[20px] flex-row">
                        <div className="flex w-full flex-col">
                            <h1 className="text-[1.5vw] ">
                                Toko Musik
                            </h1>   
                            <ul className="flex flex-col mt-auto justify-between">
                                <li className="my-3"><a href="">Fuji Studio</a> </li>
                                <li className="my-3"><a href="">Airlangga Music</a> </li>
                                <li className="my-3"><a href="">ALV Studio</a> </li>
                                <li className="my-3"><a href="">Andromeda Music</a> </li>
                            </ul>
                        </div>
                        
                        <div className="flex w-full flex-col">
                            <h1 className="text-[1.5vw] ">
                                Kategori
                            </h1>
                            <ul className="flex flex-col mt-auto justify-between">
                                <li className="my-3"> 
                                    <a href="">Gitar Akustik</a>
                                </li>
                                <li className="my-3">
                                    <a href="">Drum & Piano</a>
                                </li>
                                <li className="my-3">
                                    <a href="">Gitar Bass & Elektrik</a>
                                </li>
                                <li className="my-3">
                                    <a href="">Ampli & Pedal</a>
                                </li>
                            </ul>
                        </div>

                        <div className="flex w-full flex-col">
                            <h1 className="text-[1.5vw] ">
                                About Us
                            </h1>
                            <ul className="flex flex-col mt-auto justify-between">
                                <li className="my-3">
                                    <a href="/about">Info Saya</a>
                                </li>
                                <li className="my-3">
                                    <a href="">Grup Kami</a>
                                </li>
                                <li className="my-3">
                                    <a href="">Penilaian Pelanggan</a>
                                </li>
                                <li className="my-3">
                                    <a href="">Hubungi Kami</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <p>
                        COPYRIGHT 2023 TOKO MUSIC
                    </p>
                </div>
            </div>
        </footer>
    )
}