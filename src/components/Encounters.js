import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

export const Encounters = () => {
    const {params} = useRouteMatch()
    const [url,setUrl] = useState("")
    const [allLocation,setAllLocation] = useState([])
    const [locations,setLocations] = useState([])
    const [locationStatus,setLocationStatus] = useState(false)

    useEffect(() => {
        const getURL = async () => {
            const res = await axios({
                method: "GET",
                url: `/pokemon/${params.id}`,
                baseURL: "https://pokeapi.co/api/v2"
            })            
            setUrl(res.data.location_area_encounters)
        }
        getURL()
    }, [params])    

    useEffect(() => {
        if (url) {
            const getAllLocation = async () => {
                const res = await axios({
                    method: "GET",
                    url: url
                })
                setAllLocation(res.data)
            }
            getAllLocation()
        }
    }, [url])    

    useEffect(() => {
        if (allLocation) {
            allLocation.splice(10, allLocation.length)
            setLocations(allLocation)
        }
    }, [allLocation])    

    const listLocations = locations.map( e => (<h4 key={e.location_area.url} > Location: {e.location_area.name} </h4>))

    

    useEffect(() => {
       if(listLocations.length === 0){
            setLocationStatus(false)
       } else {
            setLocationStatus(true)
       }       
    }, [listLocations])    
    
    
    return (
        <div className="d-flex flex-column justify-content-between bg-primary" >            
            {locationStatus ? listLocations : "No Existe Region De Localizacion" }
            <Link to={`pokedex/${params.id}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left arrow" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                </svg>
            </Link> 
        </div>
    )
}
