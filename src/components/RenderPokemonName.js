import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'


export const RenderPokemonName = ({name}) => {
    const [types,setTypes] = useState([])
    const [status,setStatus] = useState([])
    const [pokemonName,setPokemonName] = useState(null)   
    const {path} = useRouteMatch() 
    
    useEffect(()=>{
        if(name){
          const getName = async () => {
            const res = await axios({
              method:"GET",
              url:`pokemon/${encodeURI(name.toLowerCase())}`,
              baseURL:"https://pokeapi.co/api/v2/"          
            })            
            setPokemonName(res.data)        
          }
          getName()
        }
      },[name])
    

    useEffect(() => {
        if(pokemonName){
            setTypes(pokemonName.types)
            setStatus(pokemonName.stats)
        }
    }, [pokemonName])      

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

    const listTypes = types.map( e => (<h4 key={e.type.url} className="text-capitalize text-white" >{e.type.name}</h4>))
    const listStatus = status.map( e => (<h4 key={e.stat.url} className="status text-capitalize" style={{ display: "flex", flexDirection: "row", justifyContent:"space-between" }}  > {e.stat.name}: <span> {e.base_stat} </span> </h4> ))

    if(!pokemonName){
      return null
    }
    
    return (      
        <div className="col-md-3  offset-lg-4 render-type" >
            <h4 className="text-uppercase text-center" style={{color:"#DC3646", fontWeight:"bolder"}} >{pokemonName.name}</h4>
            <Link to={`${path}/${pokemonName.id}`} >
              <div className="d-flex justify-content-center" >
                <img src={pokemonName.sprites.front_default} alt={pokemonName.name} />   
              </div>                  
            </Link> 
            <div className="d-flex flex-row justify-content-between" >
                {listTypes}
            </div>            
            {listStatus}    
            <Link to={`${path}/${pokemonName.id}`} >
              <div className="text-center mt-3" >
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-file-plus more-info" viewBox="0 0 16 16">
                  <path d="M8.5 6a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V10a.5.5 0 0 0 1 0V8.5H10a.5.5 0 0 0 0-1H8.5V6z"/>
                  <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"/>
                </svg>
              </div>              
            </Link>
            <br/>
        </div>
    )
}
