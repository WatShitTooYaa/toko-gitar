import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const extractAndFilterNames = (data, index) => {
    const uniqueNames = [];
    const extractedNames = [];
  
    data.attributes.images.data.map((item) => {
        const fullName = item.attributes.nama; // Ganti dengan properti sesuai struktur objek Anda
  
    //     // Mengambil depan dari nama jika memiliki beberapa suku kata
        const firstName = fullName.split(' ')[0];
    
    //     // Menyaring nama yang sudah ada
        if (!uniqueNames.includes(firstName)) {
            uniqueNames.push(firstName);
            extractedNames.push(firstName);
        }
    });

    const resultString = extractedNames.join(', ');
  
    // console.log(extractedNames)
    return resultString;
}


export default function List(){

    const [data, setData] = useState([]);
    const [nama, setNama] = useState([]);
    
    // const tes = await 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/tokos?populate=*');
                setData(response.data.data);
                // console.log(response.data.data)
                // console.log(data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);



    return(
        <>
            <ul className="relative flex w-full flex-col min-h-[300vh] mt-10 items-center">
                {data.map((item, index) => (
                    <li key={item.id} className="flex border border-black items-center bg-[#F4F4F4] w-11/12 h-[40vh] my-10">
                        <div className="flex w-1/3 h-5/6 ml-[2vw]">
                            <Link to={`/detail-toko/${item.id}`} className="w-full h-full">
                                <img src={"http://localhost:1337"+item.attributes.gambar_toko.data[0].attributes.url} className="object-cover w-full h-full" alt="gambar" loading="auto" />
                            </Link>
                        </div>
                        
                        <ul className="flex ml-10 w-2/3 flex-col justify-around h-5/6">
                            <li className="flex flex-row">
                                <div className="flex w-[10vw] text-xl ">
                                    Nama Toko
                                </div>
                                <div className="text-xl">
                                    : {item.attributes.nama}
                                </div>
                            </li>

                            <li className="flex flex-row">
                                <div className="flex w-[10vw] text-xl">
                                    Alamat Toko
                                </div>
                                <div className="text-xl w-4/6">
                                    : {item.attributes.alamat_toko}
                                </div>
                            </li>
                            
                            <li className="flex flex-row">
                                <div className="flex w-[10vw] text-xl">
                                    Dijual
                                </div>
                                <div className="text-xl">
                                    : {extractAndFilterNames(item, index)}
                                </div>
                            </li>
                            <li className="flex flex-row">
                                <div className="flex w-[10vw] text-xl">
                                    Rating
                                </div>
                                <div className="text-xl">
                                    : {item.attributes.rating}
                                </div>
                            </li>
                        </ul>
                    </li>
                ))}
            </ul>
        </>
    )
}