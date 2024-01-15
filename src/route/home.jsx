import "../assets/img.css"

export default function Home(){
    return(
        <div className="relative border-xl min-h-[300px] mt-14 border-black border-b-[1px]">
            {/* <div className=""> */}
                {/* Gambar */}
                <img className="border w-full" src="../../asset/poster/poster.png" alt="" />
            {/* </div> */}
            <div className="flex justify-center my-14 text-xl font-bold italic">
                --- Hot Recommendation ---
            </div>

            <div className="flex w-full items-center justify-around">
                <div className="flex relative w-1/5 justify-center ">
                    <img src="../../asset/rekomendasi/Steel_guitar.jpg" className="object-cover opacity-70" alt="" />
                    <a href="" className="absolute inset-0 flex items-center justify-center border-white border-solid border-[5px] h-3/4 w-3/4 m-auto">
                        <p className="text-white text-[2vw] italic font-bold text-center">
                            Rekomendasi Toko
                        </p>
                    </a>
                </div>
                <div className="flex relative w-1/5 justify-center">
                    <img src="../../asset/rekomendasi/Steel_guitar.jpg" className="object-cover opacity-70" alt="" />
                    <a href="" className="absolute inset-0 flex items-center justify-center border-white border-solid border-[5px] h-3/4 w-3/4 m-auto">
                        <p className="text-white text-[2vw] italic font-bold text-center">
                            Rekomendasi Gitar
                        </p>
                    </a>
                </div>
                <div className="flex relative w-1/5 justify-center">
                    <img src="../../asset/rekomendasi/Steel_guitar.jpg" className="object-cover opacity-70" alt="" />
                    <a href="" className="absolute inset-0 flex items-center justify-center border-white border-solid border-[5px] h-3/4 w-3/4 m-auto">
                        <p className="text-white text-[2vw] italic font-bold text-center">
                            Rekomendasi Drum & Piano
                        </p>
                    </a>
                </div>
                <div className="flex relative w-1/5 justify-center">
                    <img src="../../asset/rekomendasi/Steel_guitar.jpg" className="object-cover opacity-70" alt="" />
                    <a href="" className="absolute inset-0 flex items-center justify-center border-white border-solid border-[5px] h-3/4 w-3/4 m-auto">
                        <p className="text-white text-[2vw] italic font-bold text-center">
                            Rekomendasi Ampli & P Efek
                        </p>
                    </a>
                </div>
            </div>

            <div className="flex justify-center my-14 text-xl font-bold italic">
                --- Best Selling ---
            </div>

            <div>
                <ul className=" flex flex-row w-full justify-around">
                    <div className="w-1/5">
                        <img src="../../asset/gitar/gibson_les.jpg" className="w-full" alt="" />
                        <div className="text-[20px] italic">
                            Gitar Gibson Less Paul Gold Edition
                        </div>
                        <div className="my-10 font-bold italic">
                            Sold Out
                        </div>
                    </div>
                    <div className="w-1/5">
                        <img src="../../asset/gitar/gibson_les.jpg" className="w-full" alt="" />
                        <div className="text-[20px] italic">
                            Gitar Gibson Less Paul Gold Edition
                        </div>
                        <div className="my-10 font-bold italic">
                            Sold Out
                        </div>
                    </div>
                    <div className="w-1/5">
                        <img src="../../asset/gitar/gibson_les.jpg" className="w-full" alt="" />
                        <div className="text-[20px] italic">
                            Gitar Gibson Less Paul Gold Edition
                        </div>
                        <div className="my-10 font-bold italic">
                            Sold Out
                        </div>
                    </div>
                    <div className="w-1/5">
                        <img src="../../asset/gitar/gibson_les.jpg" className="w-full" alt="" />
                        <div className="text-[20px] italic">
                            Gitar Gibson Less Paul Gold Edition
                        </div>
                        <div className="my-10 font-bold italic">
                            Sold Out
                        </div>
                    </div>
                </ul>
            </div>

            <div className="flex justify-center m-20">
                <button className="border-2 border-black tetx-[2vw] p-3 ">Lihat Semua Produk</button>
            </div>
        </div>
    )
}