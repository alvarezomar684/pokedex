import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

export const Encounters = () => {
    const { params } = useRouteMatch()
    const [url, setUrl] = useState("")
    const [allLocation, setAllLocation] = useState([])
    const [locations, setLocations] = useState([])
    const [locationStatus, setLocationStatus] = useState(null)
    const [pokemonMore, setPokemonMore] = useState(null)


    useEffect(() => {
        const getURL = async () => {
            const res = await axios({
                method: "GET",
                url: `/pokemon/${params.id}`,
                baseURL: "https://pokeapi.co/api/v2"
            })
            setUrl(res.data.location_area_encounters)
            console.log(res.data)
            setPokemonMore(res.data)
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

    const listLocations = locations.map(e => (

        <h4 key={e.location_area.url} className="info-moreInfo " >
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-geo-alt mr-1" viewBox="0 0 16 16">
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
            {e.location_area.name}

        </h4>))



    useEffect(() => {
        if (listLocations.length === 0) {
            setLocationStatus(false)
        } else {
            setLocationStatus(true)
        }
    }, [listLocations])

    if (!pokemonMore) {
        return null
    }


    return (
        <>
            <h4 className="text-uppercase display-4 display-lg-3 text-center" style={{ marginTop:"7rem", color: "#DC3646", textShadow: "7px 10px 5px #DC3646", fontWeight: "bolder" }} >{pokemonMore.name}</h4>
            <img src={pokemonMore.sprites.other["official-artwork"].front_default} alt={pokemonMore.name} className="img-fluid rounded mx-auto d-block mt-3 " />
            <div className="col-12">
                <h4 className=" display-4 display-lg-3  text-uppercase " style={{ color: "#DC3646", textShadow: "5px 7px 5px #DC3646", fontWeight: "bolder" }} >location</h4>
            </div>
            <div className="jumbotron card-more-info d-flex flex-column flex-lg-row flex-wrap justify-content-between" >
                {locationStatus ? listLocations : <h4 className="text-white display-5 display-lg-4 " >No Existe Region De Localizacion </h4>}
                <Link to={`pokedex/${params.id}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-arrow-left arrow align-middle" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                    </svg>
                </Link>
            </div>
        </>
    )
}
