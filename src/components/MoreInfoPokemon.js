import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom'
import { Encounters } from './Encounters'

export const MoreInfoPokemon = () => {
    const { params, path, url } = useRouteMatch()
    const [pokemonMore, setPokemonMore] = useState(null)
    const [types, setTypes] = useState([])
    const [status, setStatus] = useState([])
    const [ability, setAbility] = useState([])
    const [allMoves, setAllMoves] = useState([])
    const [moves, setMoves] = useState([])
    const [useFilter, setUseFilter] = useState(true)

    const [holdAb, setHoldAb] = useState("")
    const [holdM, setHoldM] = useState("")
    const [holdAbT, setHoldAbT] = useState("")
    const [holdMT, setHoldMT] = useState("")



    useEffect(() => {
        const getMore = async () => {
            const res = await axios({
                method: "GET",
                url: `/pokemon/${params.id}`,
                baseURL: "https://pokeapi.co/api/v2"
            })
            setPokemonMore(res.data)
        }
        getMore()
    }, [params])

    useEffect(() => {
        if (pokemonMore) {
            setTypes(pokemonMore.types)
            setStatus(pokemonMore.stats)
            setAbility(pokemonMore.abilities)
            setAllMoves(pokemonMore.moves)
        }
    }, [pokemonMore])

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

    useEffect(() => {
        if (allMoves) {
            allMoves.splice(10, allMoves.length)
            setMoves(allMoves)
        }
    }, [allMoves])

    const listTypes = types.map(e => (<h4 key={e.type.url} className="text-capitalize" >{e.type.name}</h4>))
    const listStatus = status.map(e => (<h4 key={e.stat.url} className="status text-capitalize" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}  > {e.stat.name}: <span> {e.base_stat} </span> </h4>))
    const listAbilities = ability.map(e => (    
        <h4 key={e.ability.url} className="info-moreInfo text-capitalize "  >            
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </svg>
            {e.ability.name} 
        </h4>))
    const listMoves = moves.map(e => (
        <h4 key={e.move.url} className="text-capitalize info-moreInfo" >
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </svg>
            {e.move.name}
        </h4>))

    useEffect(() => {
        if (useFilter === true) {
            setHoldAb("#DC3646")
            setHoldM("")

            setHoldAbT("#FFFFFF")
            setHoldMT("#000000")
        } else {
            setHoldAb("")
            setHoldM("#DC3646")

            setHoldAbT("#000000")
            setHoldMT("#FFFFFF")
        }
    }, [useFilter])   


    if (!pokemonMore) {
        return null
    }

    return (
        <div>
            <Switch>
                <Route path={`${path}/encounters`} >
                    <Encounters />
                </Route>
                <Route path={path} >
                    <div className="d-flex flex-row justify-content-between jumbotron card-more-info" >
                        <div>
                            <h4 className="text-uppercase display-4" style={{color:"#DC3646"}} >{pokemonMore.name}</h4>
                            <h4 className="display-4 text-white" ># {pokemonMore.order}</h4>
                        </div>
                        <img src={pokemonMore.sprites.other["official-artwork"].front_default} alt={pokemonMore.name} className="img-fluid" />
                        <div>
                            <h3 className="text-uppercase" style={{color:"#DC3646"}}  >Types</h3>
                            <hr />
                            {listTypes}
                            <h3 className="text-uppercase mt-5" style={{color:"#DC3646"}} >Base Stats</h3>
                            <hr />
                            {listStatus}
                            <hr />
                            <Link to={`${url}/encounters`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-geo-alt mt-3" viewBox="0 0 16 16">
                                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <nav>
                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <button onClick={() => { setUseFilter(true) }} className="nav-link" style={{ backgroundColor: holdAb, color: holdAbT }} >ABOUT</button>
                                </li>
                                <li className="nav-item">
                                    <button onClick={() => { setUseFilter(false) }} className="nav-link" style={{ backgroundColor: holdM, color: holdMT }}  >MOVES</button>
                                </li>
                            </ul>
                        </nav>

                    </div>

                    <div className="d-flex flex-row justify-content-around mt-5" >
                        {useFilter ? <div className="jumbotron card-more-info col-3" >
                            <h4 style={{ color: "#DC3646" }} className="text-uppercase" >
                                Height
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-down-up" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z" />
                                </svg>
                            </h4>
                            <hr />
                            {useFilter ? <h4 className="info-moreInfo">{pokemonMore.height}</h4> : null}
                        </div> : null}
                        {useFilter ? <div className="jumbotron card-more-info col-3" >
                            <h4 style={{ color: "#DC3646" }} className="text-uppercase" >
                                Weight
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left-right" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z" />
                                </svg>
                            </h4>
                            <hr />
                            {useFilter ? <h4 className="info-moreInfo" >{pokemonMore.weight}</h4> : null}
                        </div> : null}
                        {useFilter ? <div className="jumbotron card-more-info col-3" >
                            <h4 style={{ color: "#DC3646" }} className="text-uppercase" >
                                Skill
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-stars" viewBox="0 0 16 16">
                                    <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z" />
                                </svg>
                            </h4>
                            <hr/>
                            {useFilter ? listAbilities : null}
                        </div> : null}
                    </div>

                    {!useFilter ? <div className="jumbotron card-more-info d-flex flex-row flex-wrap justify-content-between" >
                        {!useFilter ? listMoves : null}
                    </div> : null}
                </Route>
            </Switch>
        </div>
    )
}
