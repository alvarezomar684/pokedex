import React, { useEffect, useState } from 'react'

export const SearchBox = ({onSearchName,onSearchType,allType}) => {
    const [searchName,setSearchName] = useState("")
    const [searchType,setSearchtype] = useState("")
    const [filter,setFilter] = useState("")
    const [useFilter,setUseFilter] = useState(false)    

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
            { !useFilter ? <button onClick={()=>{onSearchType(searchType)}} className="btn-search" ></button> : null }
        </div>
    )
}
