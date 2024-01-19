import { useState, useEffect } from "react";
import axios from "axios";

export default function Products(){

    const [data, setData] = useState([]);
    const [nama, setNama] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // const tes = await 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/images?populate=*');
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
            console.log("Kode setelah  fech selesai:", data);
        }
    }, [data, loading])

    return(
        <>
        {loading ? (
            <p>gek</p>
            ) : (
                <div className="flex min-h-[90vh] mt-14">
                    <div className="grid w-full grid-cols-4 justify-items-center">
                        {data.map((item) => (
                            <div className="flex w-3/4 h-[100vh] flex-col mt-6 mb-3">
                                <img className="h-5/6 w-full object-contain" src={"http://localhost:1337"+item.attributes.alat.data[0].attributes.url} alt="" />
                                <div className="text-[20px] italic font-semibold">
                                    {item.attributes.nama}
                                </div>
                                <div className="flex w-1/6">
                                    <img src="../../asset/icon/star.png" className="mx-1" alt="" />
                                    <img src="../../asset/icon/star.png" className="mx-1" alt="" />
                                    <img src="../../asset/icon/star.png" className="mx-1" alt="" />
                                </div>
                                <div className="flex font-bold italic">
                                    $ {item.attributes.harga}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}