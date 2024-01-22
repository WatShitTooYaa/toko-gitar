import { useState, useEffect } from "react";
import axios from "axios";


export default function Tes(){
    const [data, setData] = useState([]);
    const [nama, setNama] = useState([]);
    const [relation, setRelation] = useState([])
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectRel, setRel] = useState([])

    const [loading, setLoading] = useState(true)
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [alamat, setAlamat] = useState('');
    const [rating, setRating] = useState('');
    const [openDialog, setOpenDialog] = useState(false)

    // const tesArr = () => {
    //     // let images
    //     let newArr = []
       
    //     relation.split(',').map((val) => {
    //         if(!isNaN(val)){
    //             selectRel.push({ id : val.trim()})
    //         }
    //     })

    //     setRel(newArr)

    //     console.log("selRel",selectRel)
    // }


    
    const postData = async (e) => {
        if(!selectedFile || !relation || !nama)
        e.preventDefault()
        const url = "http://localhost:1337/api/tests"
        let formData = new FormData();
        let newArr = []


        relation.split(',').map((val) => {
            if(!isNaN(val)){
                selectRel.push({ id : val.trim() })
            }
        })

        setRel(newArr)

        console.log("selRel",selectRel)

        const datas = {
            id: 100,
            nama : nama,
            umur : "200",
            images : selectRel
        }
 
        formData.append("data", JSON.stringify(datas));
        // formData.append("nama", "arkan")
        formData.append("files.tes_gambar", selectedFile);
        // formData.append("message", message);

        try {
            if(!selectedFile) throw console.log("err")
            const response = await axios.post(url, formData)
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


    const imageHandler = (event) => {
        setSelectedFile(event.target.files[0])
    }

    const nameHandler = (event) => {
        setNama(event.target.value)
    }

    const relationHandler = (event) => {
        setRelation(event.target.value)
    }

    // const tes = await 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/upload/files?populate=*');
                setData(response.data);
                // console.log(response.data.data)
                // console.log(data)
                setLoading(false)
            } 
            catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []); // [] sebagai dependensi akan menjalankan efek hanya setelah komponen pertama kali dimuat
    
    useEffect(() => {
        if(!loading){
            console.log(data)
        }
    }, [data])

    // const checkName = (tes) => {
    //     setNama(extractAndFilterNames(tes))
    //     console.log(nama)
    // }

    return(
        <>
            <div className="m-14">
                {loading ? 
                    <div>
                        tes
                    </div> :
                    data.map((item) => (
                        <div key={item.id}>
                            {item.name}
                        </div>
                    ))
                    // <div>
                    //     tes
                    // </div>
                }
                <form onSubmit={postData} encType="multipart/form-data" className="m-16">
                    <div>
                        <p>nama</p>
                        <input  
                            onChange={nameHandler} 
                            type="text" 
                            name="" id="" 
                            className="border border-black" 
                        />
                    </div>

                    
                    <input
                        type="text"
                        value={relation}
                        onChange={relationHandler}
                        placeholder="Masukkan nilai terpisah koma"
                    />

                    <input
                        type="file"
                        name="files"
                        onChange={imageHandler}
                        alt="image"
                        className=""
                    />

                    <br />
                    <button type="submit">Send</button>
                </form>
            </div> 
            <div>

            

            </div>
            {/* <div className="mt-14">
                Gasjdhui
            </div> */}
        </>
    )
}