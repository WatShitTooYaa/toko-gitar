import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const extractAndFilterNames = (data, index) => {
    const uniqueNames = [];
    const extractedNames = [];
  
    data.attributes.images.data.map((item) => {
        
        // Ganti dengan properti sesuai struktur objek Anda
        const fullName = item.attributes.nama; 
  
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

    const [id, setId] = useState('')
    const [data, setData] = useState([]);
    const [nama, setNama] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [alamat, setAlamat] = useState('');
    const [rating, setRating] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    const [relation, setRelation] = useState('');
    const [selectRel, setRel] = useState([])
    
    const [openDialog, setOpenDialog] = useState(false)
    const [isEdit, setIsEdit] = useState(false)

    const [loading, setLoading] = useState(true);

    const [isUpdating, setIsUpdating] = useState(false);

    const updateToko = async (e) => {
        // if(!selectedFile || !relation || !nama){
        //     e.preventDefault()
        //     return
        // }
        
        // Simpan fungsi deleteToko sebagai promise
        
        try {
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
            window.location.reload();
            // navigate('/list-toko');
        }
        catch (err) {
            console.log(err)
            // navigate('/list-toko');
        }
    }

    
    const deleteToko = async () => {
        const url = `http://localhost:1337/api/tokos/${id}`
        const response = await axios.request({
            url,
            method: 'delete',
            timeout: 4000,
        });

        return response
        // try {
              
        //     console.log(response)
        // } catch (error) {
        //     console.log(error.message)
        // }
    }
    
    const editToko = async (e) => {
        try {
          // Call deleteToko
            const tes = await deleteToko();
            
            console.log(tes)
            // Introduce a delay of 3 seconds (optional)
            new Promise((resolve) => {
                setTimeout(resolve, 3000);
            });
      
        //   Call updateToko
          await updateToko(e);
      
          // Additional logic or code after the update is complete
          // ...
      
          // Close the dialog or perform other actions
          // ...
        } catch (error) {
          console.error("Error editing toko:", error);
        }
      };
      
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

    const createToko = async (e) => {
        if(!selectedFile || !relation || !nama)
        e.preventDefault()
        const url = "http://localhost:1337/api/tokos"
        let formData = new FormData();
        let newArr = []

        const config = {     
    headers: { 'content-type': 'multipart/form-data' }
}


        relation.split(',').map((val) => {
            if(!isNaN(val)){
                selectRel.push({ id : val.trim() })
            }
        })

        setRel(newArr)

        console.log("selRel", selectRel)

        const datas = {
            nama : "nama",
            email : "email",
            whatsapp : "0891238",
            alamat_toko : "alamat",
            rating : "88",
            images : 1,
        }
        // nama : nama,
        // email : email,
        // whatsapp : whatsapp,
        // alamat_toko : alamat,
        // rating : rating,
        // images : selectRel
 
        formData.append("data", JSON.stringify(datas));
        // formData.append("nama", "arkan")
        formData.append("files.gambar_toko", selectedFile);
        // formData.append("message", message);

        try {
            if(!selectedFile) throw console.log("err")

            const config = {     
                headers: { 'content-type': 'multipart/form-data' }
            }
            const response = await axios.post(url, formData, config)
            // const response = await fetch(url, {
            //     method: 'post',
            //     body: formData,
            // });

            console.log(response)
        }
        catch (err) {
            console.log(err.message)
        }
    }

    const openDialogEdit = (id) => {
        setId(id)
        setIsEdit(true)
        setOpenDialog(!openDialog)
        console.log(id)
    }

    const closeDialog = () => {
        setIsEdit(false)
        setOpenDialog(false)
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
            <ul className="relative flex w-full flex-col min-h-[300vh] mt-10 items-center">
                {data.map((item, index) => (
                    <li key={item.id} className="flex border border-black items-center bg-[#F4F4F4] w-11/12 h-[40vh] my-10">
                        <div className="flex w-1/3 h-5/6 ml-[2vw]">
                            <Link to={`/detail-toko/${item.id}`} className="w-full h-full">
                                {item.attributes.gambar_toko && item.attributes.gambar_toko.data && item.attributes.gambar_toko.data.length > 0 ? (
                                    <img
                                    src={`http://localhost:1337${item.attributes.gambar_toko.data[0].attributes.url}`}
                                    className="object-cover w-full h-full"
                                    alt="gambar"
                                    loading="auto"
                                    />
                                ) : (
                                    <img
                                    src={null} // Atau ganti dengan URL placeholder atau default
                                    className="object-cover w-full h-full"
                                    alt="gambar"
                                    loading="auto"
                                    />
                                )}
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
                        <button onClick={() =>openDialogEdit(item.id)}>edit</button>
                        {/* <button onClick={() =>openDialogEdit(item.id)}>delete</button> */}
                    </li>
                ))}

                {/* <div > */}
                    <button className="my-10 bg-red-400 flex w-[10vw] h-[5vh] justify-center items-center   " onClick={() => setOpenDialog(!openDialog)}> Tambah Toko </button>
                {/* </div> */}
            </ul>
            {
                openDialog ?
                    isEdit ? 
                    <div className="fixed flex w-1/2 z-10 h-1/2 translate-x-1/2 translate-y-1/2 bg-gray-100 top-0">
                        <div className="absolute top-0 right-0">
                            <button onClick={closeDialog}> close </button>
                        </div>
                        <form className="ml-4 flex flex-row">
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

                            
                            <button onClick={() => editToko()} type="button"> edit </button>
                        </form>
                    </div>
                            : 
                        <div className="fixed flex w-1/2 z-10 h-1/2 translate-x-1/2 translate-y-1/2 bg-gray-100 top-0">
                            <div className="absolute top-0 right-0">
                                <button onClick={closeDialog}> close </button>
                            </div>
                            <form onSubmit={createToko} className="ml-4 flex flex-row">
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