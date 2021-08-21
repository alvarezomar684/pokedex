import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

export const RenderPokemon = ({ url, quantity }) => {
    const [pokemon, setPokemon] = useState(null)
    const [types, setTypes] = useState([])
    const [status, setStatus] = useState([])
    const { path } = useRouteMatch()

    useEffect(() => {
        if (url && quantity) {
            const getAllType = async () => {
                const res = await axios({
                    method: "GET",
                    url: url
                })
                setPokemon(res.data)
            }
            getAllType()
        }
    }, [url, quantity])

    useEffect(() => {
        if (pokemon) {
            setTypes(pokemon.types)
            setStatus(pokemon.stats)
        }
    }, [pokemon])

    let many = 0
    let position = []

    status.forEach((e, i) => {
        const search = e.stat.name
        if (search !== "hp" && search !== "attack" && search !== "defense" && search !== "speed") {
            many++
            position.push(i)
            status.splice(position, many)
        }
    })

    const listTypes = types.map(e => (<h4 key={e.type.url} className="text-capitalize text-white " >{e.type.name}</h4>))
    const listStatus = status.map(e => (<h4 key={e.stat.url} className="status text-capitalize" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}  > {e.stat.name}: <span> {e.base_stat} </span> </h4>))

    if (!pokemon) {
        return null
    }

    return (
        <div className=" col-12 col-sm-3  col-md-1  col-lg-1  col-xl-2  render-type" >
            <h4 className="text-uppercase text-center" style={{color:"#DC3646", fontWeight:"bolder"}} >{pokemon.name}</h4>
            <Link to={`${path}/${pokemon.id}`} >
                <div className="d-flex justify-content-center">
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                </div>                
            </Link>
            <div className="d-flex flex-row justify-content-between" >
                {listTypes}
            </div>
            {listStatus}
            <Link to={`${path}/${pokemon.id}`} >
                <div className="text-center mt-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-file-plus more-info" viewBox="0 0 16 16">
                        <path d="M8.5 6a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V10a.5.5 0 0 0 1 0V8.5H10a.5.5 0 0 0 0-1H8.5V6z" />
                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
                    </svg>
                </div>
            </Link>
            <br />

        </div>
    )
}
