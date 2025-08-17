import { useState } from 'react'
import './index.css'
import 'leaflet/dist/leaflet.css'
import IpAdress from './Component/IPAddress/IpAdress'
import Map from './Component/Map/Map'
import { useEffect } from 'react'

function App() {
  const  [address, setAddress] = useState(null);
     
     
  
    useEffect(() => {
      const getData = async () => {
        try {
          const res = await fetch(
            'https://geo.ipify.org/api/v2/country,city?apiKey=at_NIHvthwDkHuOfyNqqFYXrd3763NQw&ipAddress=8.8.8.8'
          );
          const data = await res.json();
          setAddress(data)
          
        } catch (error) {
          console.trace(error);
        }
      };
      getData();
    }, []);


  return (
    <>
<IpAdress address={address} setAddress={setAddress}/>
<Map address={address}/>

    </>
  )
}

export default App
