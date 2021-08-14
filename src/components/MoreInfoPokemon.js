import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom'
import { Encounters } from './Encounters'

export const MoreInfoPokemon = () => {
    const {params,path,url} = useRouteMatch()
    const [pokemonMore,setPokemonMore] = useState(null)
    const [types,setTypes] = useState([])
    const [status,setStatus] = useState([])
    const [ability,setAbility] = useState([])
    const [allMoves,setAllMoves] = useState([])
    const [moves,setMoves] = useState([])    
    const [useFilter,setUseFilter] = useState(true) 

    
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
        if(pokemonMore){
            setTypes(pokemonMore.types)
            setStatus(pokemonMore.stats)
            setAbility(pokemonMore.abilities)  
            setAllMoves(pokemonMore.moves)          
        }
    }, [pokemonMore])      

    let many = 0
    let position =[]

    status.forEach((e,i)=>{
        const search = e.stat.name         
        if(search !== "hp" && search !== "attack" && search !== "defense" && search !== "speed" ){
            many++
            position.push(i)   
            status.splice(position,many)         
        }          
    })  

    useEffect(() => {
        if (allMoves) {
            allMoves.splice(10, allMoves.length)
            setMoves(allMoves)
        }
    }, [allMoves])    

    const listTypes = types.map( e => (<h4 key={e.type.url} className="text-capitalize" >{e.type.name}</h4>))
    const listStatus = status.map( e => (<h4 key={e.stat.url} className="text-capitalize"  > {e.stat.name}: {e.base_stat} </h4> ))
    const listAbilities = ability.map( e => (<h4 key={e.ability.url} > Skill: {e.ability.name} </h4> ))
    const listMoves = moves.map( e => (<h4 key={e.move.url} className="text-capitalize" >{e.move.name}</h4>))

    


    if(!pokemonMore){
        return null
    }

    return (
        <div>            
            <Switch>
                <Route path={`${path}/encounters`} >  
                    <Encounters/>                  
                </Route> 
                <Route path={path} >  
                    <div className="d-flex flex-row justify-content-between bg-primary" >
                        <div>
                            <h4 className="text-uppercase" >{pokemonMore.name}</h4>
                            <h4># {pokemonMore.order}</h4>
                        </div>                    
                        <img src={pokemonMore.sprites.front_default} alt={pokemonMore.name} /> 
                        <div>
                            {listTypes} 
                            {listStatus} 
                        </div>
                    </div>                    
                    <div>
                        <button onClick={()=>{setUseFilter(true)}} >ABOUT</button>
                        <button onClick={()=>{setUseFilter(false)}} >MOVES</button>
                    </div>
                    <div className="d-flex flex-column justify-content-between bg-primary" >
                        { useFilter ? <h4>Height: {pokemonMore.height}</h4> : null}
                        { useFilter ? <h4>Weight: {pokemonMore.weight}</h4> : null}                                    
                        { useFilter ? listAbilities : null}
                    </div>                     
                    <aside className="d-flex flex-column justify-content-between bg-primary" >
                    { !useFilter ? listMoves :null}   
                    </aside>                                
                    <Link to={`${url}/encounters`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
                        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                        </svg>
                    </Link>  
                </Route>               
            </Switch>
        </div>
    )
}
