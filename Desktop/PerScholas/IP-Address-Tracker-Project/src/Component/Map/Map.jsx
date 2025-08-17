import React, { useEffect } from 'react'
import { MapContainer } from 'react-leaflet'
import { TileLayer } from 'react-leaflet'


import MarkerPosition from '../MarkerPosition/MarkerPosition'
function Map({address}) {
     
    if (!address || !address.location) return null
    const position =[address.location.lat,address.location.lng]
    
  return (
    
    <MapContainer center={position}
     zoom={13} 
     scrollWheelZoom={true}
    
    className="h-[400px] w-full"
>

     
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <MarkerPosition address={address}/>
    
  </MapContainer>
  )
}

export default Map