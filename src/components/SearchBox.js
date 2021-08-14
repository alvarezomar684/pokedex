import React, { useEffect, useState } from 'react'

export const SearchBox = ({onSearchName,onSearchType,allType}) => {
    const [searchName,setSearchName] = useState("")
    const [searchType,setSearchtype] = useState("")
    const [filter,setFilter] = useState("")
    const [useFilter,setUseFilter] = useState(false)  
    const [many,setMany] = useState("")  

    useEffect(() => {
        if(filter === "By Name"){
            setUseFilter(true)            
        } else {
            setUseFilter(false)
        }
    }, [filter])
    
    const listAllType = allType.map( e => (<option key={e.name} value={e.name} >{e.name}</option>))    

    return (
        <div>
            <select onChange={ e => setFilter(e.target.value)} >
                <option>Change Search</option>
                <option>By Name</option>             
                <option>By Type</option>
            </select>

            { useFilter ? <input value={searchName} onChange={ e => setSearchName(e.target.value)} placeholder="Pokemon Name" /> : null}
            { useFilter ? <button onClick={()=>{onSearchName(searchName)}} className="btn-search" ></button> : null }

            { !useFilter ? <select onChange={ e => setSearchtype(e.target.value)}>
                <option value="" >select type pokemon</option>
                {listAllType}
            </select> : null }
            { !useFilter ? <button onClick={()=>{onSearchType(searchType,many)}} className="btn-search" ></button> : null }
            { !useFilter ? <label style={{color:"#b33131",fontWeight:"bold",textShadow:"0px 2px 3px white"}} >Seleccione La Cantidad de Pokemones</label>: null }
            { !useFilter ? <input className="choose-quantity" type="number" value={many} onChange={ e => setMany(e.target.value) } /> : null }
        </div>
    )
}
