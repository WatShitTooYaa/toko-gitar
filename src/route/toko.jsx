import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";

export default function DetailToko(){

    const navigate = useNavigate()

    const {id} = useParams();

    const [data, setData] = useState([]);
    const [imageData, setImageData] = useState([])

    const [loading, setLoading] = useState(true);

    const [nama, setNama] = useState([]);   
    const [relation, setRelation] = useState([])
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectRel, setRel] = useState([])

    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [alamat, setAlamat] = useState('');
    const [rating, setRating] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [openDialog, setOpenDialog] = useState(false)

    const updateToko = async (e) => {
        if(!selectedFile || !relation || !nama){
            e.preventDefault()
            return
        }
        
        // Simpan fungsi deleteToko sebagai promise
        
        try {
            
            await new Promise((resolve) => {
                setTimeout( async () => {
                    await deleteToko(false)
                    resolve()
                }, 3000);
            })
            
            const url = `http://localhost:1337/api/tokos`
            let formData = new FormData();
            let newArr = []


            relation.split(',').map((val) => {
                if(!isNaN(val)){
                    selectRel.push({ id : val.trim() })
                }
            })

            setRel(newArr)

            console.log("selRel", selectRel)

            const datas = {
                id: id,
                nama : nama,
                email : email,
                whatsapp : whatsapp,
                alamat_toko : alamat,
                rating : rating,
                images : selectRel,
            }
    
            formData.append("data", JSON.stringify(datas));
            // formData.append("nama", "arkan")
            formData.append("files.gambar_toko", selectedFile);
            // formData.append("message", message);

            if(!selectedFile) throw console.log("err")

            // Tunggu hingga proses delete selesai
            const response = await axios.post("http://localhost:1337/api/tokos", formData)

            console.log(response)
            navigate('/list-toko');
        }
        catch (err) {
            console.log(err)
            navigate('/list-toko');
        }
    }

    
    const deleteToko = async (shouldNavigate = true) => {
        const url = `http://localhost:1337/api/tokos/${id}`
        try {
            const response = await axios.delete(url)
            console.log(response)
            if (shouldNavigate) {
                navigate('/list-toko');
            }
            // else{
            //     return response.status
            // }
        } catch (error) {
            console.log(error.message)
        }
    }

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
            // setLoading(false)
        }
    }, [data, loading, imageData])
    
    useEffect(() => {
        if (!isUpdating) {
            // Contoh kode yang dijalankan setelah fetchData selesai
            console.log("Kode setelah image fetch selesai:", imageData);
            // setLoading(false)
        }
    }, [isUpdating])




    const test = () => {
        console.log(`http://localhost:1337/api/tokos/${id}`)
    }

    const imageHandler = (event) => {
        setSelectedFile(event.target.files[0])
    }

    const nameHandler = (event) => {
        setNama(event.target.value)
    }

    const relationHandler = (event) => {
        setRelation(event.target.value)
    }

    const emailHandler = (event) => {
        setEmail(event.target.value)
    }

    const whatsappHandler = (event) => {
        setWhatsapp(event.target.value)
    }
    
    const alamatHandler = (event) => {
        setAlamat(event.target.value)
    }
    
    const ratingHandler = (event) => {
        setRating(event.target.value)
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

                            <ul  className="flex w-full h-[12vw] mx-auto overflow-x-auto flex-wrap flex-col space-x-4">
                                {imageData.map((item) => (
                                        <li key={item.id} className="flex border border-black h-full w-[12vw] object-cover">
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

                            <div className="my-4 text-xl">
                                Hapus Toko :
                            </div>
                            
                            <li className="flex border border-black w-[12vw] h-[3vw]  justify-center mx-auto">
                                <button onClick={() => deleteToko()} className="w-full bg-gray-300 flex justify-center items-center">
                                    Hapus
                                </button>
                            </li>
                            
                            <div className="my-4 text-xl">
                                Edit Toko :
                            </div>
                            
                            <li className="flex border border-black w-[12vw] h-[3vw]  justify-center mx-auto">
                                <button onClick={() => setOpenDialog(!openDialog)} className="w-full bg-gray-300 flex justify-center items-center">
                                    Edit
                                </button>
                            </li>

                        </div>
                    </div>
                </div>
            )
        }
        {
        openDialog ?
            <div className="fixed flex w-1/2 z-10 h-1/2 translate-x-1/2 translate-y-1/2 bg-gray-100 top-0">
                <div className="absolute top-0 right-0">
                    <button onClick={() => setOpenDialog(!openDialog)}> close </button>
                </div>
                <form onSubmit={updateToko} encType="multipart/form-data" method="post" className="ml-4 flex flex-row">
                    <div className="">
                        <div>
                            <p> nama</p>
                            <input  
                                onChange={nameHandler} 
                                type="text" 
                                value={nama}
                                name="" id="" 
                                className="border border-black" 
                            />
                        </div>

                        <div>
                            <p> email</p>
                            <input  
                                onChange={emailHandler} 
                                type="text" 
                                name="" id="" 
                                value={email}
                                className="border border-black" 
                            />
                        </div>
                        
                        <div>
                            <p> whatsapp</p>
                            <input  
                                onChange={whatsappHandler} 
                                type="text" 
                                name="" id="" 
                                value={whatsapp}
                                className="border border-black" 
                            />
                        </div>
                    </div>

                    <div>
                        <div>
                            <p> relation </p>
                                <input
                                type="text"
                                value={relation}
                                onChange={relationHandler}
                                placeholder="Masukkan nilai terpisah koma"
                            />
                        </div>
                        <div>
                            <p> images </p>
                            <input
                                type="file"
                                name="files"
                                onChange={imageHandler}
                                alt="image"
                                className=""
                            />
                        </div>

                        <div>
                            <p> alamat </p>
                            <input  
                                onChange={alamatHandler} 
                                type="text" 
                                name="" id="" 
                                value={alamat}
                                className="border border-black" 
                            />
                        </div>

                        <div>
                            <p> rating </p>
                            <input  
                                onChange={ratingHandler} 
                                type="text" 
                                name="" id="" 
                                value={rating}
                                className="border border-black" 
                            />
                        </div>

                    </div>

                    
                    <button type="submit"> tambah </button>
                </form>
            </div>
            :
            <div className="absolute -z-10">
                close
            </div>
        }
           
        </>
    )
}