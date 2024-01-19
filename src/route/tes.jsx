import { useState, useEffect } from "react";
import axios from "axios";


export default function Tes(){
    const [data, setData] = useState([]);
    const [nama, setNama] = useState([]);
    
    // const tes = await 
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:1337/api/tokos?populate=*');
            setData(response.data.data);
            // console.log(response.data.data)
            console.log(data)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []); // [] sebagai dependensi akan menjalankan efek hanya setelah komponen pertama kali dimuat
    
    const checkName = (tes) => {
        setNama(extractAndFilterNames(tes))
        console.log(nama)
    }

    return(
        <>
            <div className="mt-14">
                Gasjdhui
            </div>
        </>
    )
}