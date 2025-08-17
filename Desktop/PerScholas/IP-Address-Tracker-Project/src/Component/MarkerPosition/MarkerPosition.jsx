import React from 'react'
import { Marker } from 'react-leaflet'
import Icon from '../Icon/Icon'
import { Popup } from 'react-leaflet'
import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
function MarkerPosition({address}) {
   if (!address || !address.location) return null
      const position=[address.location.lat,address.location.lng]
      const map=useMap()
        useEffect(()=>{
            map.flyTo(position, 13, {
                animate:true
            })
        },[map,position])
  return (
    <>
    <Marker icon={Icon}  position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker >
    </>
    
  )
}

export default MarkerPosition