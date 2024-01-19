import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";

export default function DetailToko(){

    const {id} = useParams();

    const [data, setData] = useState([]);
    const [imageData, setImageData] = useState([])

    const [loading, setLoading] = useState(true);
    
    // const tes = await 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:1337/api/tokos/${id}?populate=*`);
                setData(response.data.data);
                // console.log(response.data.data)
                console.log(data)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false)
            }
        };
    
        fetchData();
    }, []);

    useEffect(() => {
        if (!loading) {
            // Contoh kode yang dijalankan setelah fetchData selesai
            console.log("Kode setelah fetchData selesai:", data);
            console.log(data.attributes.images.data);
    
            // Menggunakan Promise.all untuk melakukan fetch semua gambar secara bersamaan
            const fetchImageData = async () => {
                const imageDataArray = await Promise.all(data.attributes.images.data.map(async (item) => {
                    try {
                        const response = await axios.get(`http://localhost:1337/api/images/${item.id}?populate=*`);
                        return response.data.data;
                    } catch (error) {
                        console.error('Error fetching image data:', error);
                        return null;
                    }
                }));
    
                // Setelah selesai fetch semua gambar, simpan ke dalam state setImageData
                setImageData(imageDataArray);
                setLoading(false);
            };
    
            fetchImageData();
        }
    }, [data, loading]);

    useEffect(() => {
        if (!loading) {
            // Contoh kode yang dijalankan setelah fetchData selesai
            console.log("Kode setelah image fetch selesai:", imageData);
        }
    }, [data, loading, imageData])

    const test = () => {
        console.log(imageData)
    }



    return(
        <>
        {loading && imageData ? (
            <p>gek</p>
            ) : (
                <div className="flex flex-col min-h-[50vh] w-[full] my-32 mx-10">
                    <div className="t font-bold ml-2 p-3">
                        {data.attributes.nama}
                        <button onClick={test}> test </button>
                    </div>
                    <div className="flex flex-row h-full">
                        <div className="flex h-[30vw] w-[30vw]">
                            <img src={"http://localhost:1337"+data.attributes.gambar_toko.data[0].attributes.url} className="b object-cover" alt="" />
                        </div>
                        <div className="flex mx-4 flex-col h-full w-[70vw]">
                            
                            <div className="my-2 text-xl">
                                Barang yang Dijual
                            </div>

                            <ul className="flex w-full h-[12vw] mx-auto overflow-x-auto flex-wrap flex-col space-x-4">
                                {imageData.map((item) => (
                                        <li className="flex border border-black h-full w-[12vw] object-cover">
                                            <img src={"http://localhost:1337"+item.attributes.alat.data[0].attributes.url} className="flex object-cover w-full h-full" alt="" />
                                        </li>
                                ))}
                            </ul>
                            
                            <div className="my-4 text-xl">
                                Kunjungi Toko :
                            </div>
                            
                            <li className="flex border border-black w-[12vw] h-[3vw] justify-center mx-auto">
                                <button className="w-full bg-gray-300">Link Gmaps</button>
                            </li>
                            
                            <div className="my-4 text-xl">
                                Whats App :
                            </div>
                            
                            <li className="flex border border-black w-[12vw] h-[3vw]  justify-center mx-auto">
                                <a href={"https://wa.me/"+data.attributes.whatsapp} className="w-full bg-gray-300 flex justify-center items-center">
                                    Link Whatsapp
                                </a>
                            </li>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}