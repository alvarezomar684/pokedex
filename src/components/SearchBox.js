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
        <div className="row d-flex flex-column justify-content-between" >
            <div className="col-2 col-lg-6 d-flex flex-column justify-content-between flex-lg-row " style={{margin:"0 auto"}} >
                <select className="form-control" onChange={ e => setFilter(e.target.value)} >
                    <option>Change Search</option>
                    <option>By Name</option>             
                    <option>By Type</option>
                </select>
                
                { useFilter ? <input className="form-control"  value={searchName} onChange={ e => setSearchName(e.target.value)} placeholder="Pokemon Name" /> : null}             

                { !useFilter ? <select className="form-control" onChange={ e => setSearchtype(e.target.value)}>
                    <option value="" >select type pokemon</option>
                    {listAllType}
                </select> : null }
                
                { !useFilter ? <input className="choose-quantity form-control" placeholder="Cantidad de Pokemones" type="number" value={many} onChange={ e => setMany(e.target.value) } /> : null }
                
            </div>
            <div className="mt-5 row" >
                    { useFilter ? <button onClick={()=>{onSearchName(searchName)}} className="btn-search col-6" style={{margin:"0 auto"}} ></button> : null }
                </div>
            <div className="mt-5 row" >
                { !useFilter ? <button onClick={()=>{onSearchType(searchType,many)}} className="btn-search col-6" style={{margin:"0 auto"}} ></button> : null }    
            </div>
             
        </div>
        
    )
}
