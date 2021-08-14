import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { RenderPokemon } from './components/RenderPokemon';
import { RenderPokemonName } from './components/RenderPokemonName';
import { SearchBox } from './components/SearchBox';

import React from 'react'
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import { MoreInfoPokemon } from './components/MoreInfoPokemon';

export const Pokedex = () => {

    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [allType, setAllType] = useState([])
    const [pokemonType, setPokemonType] = useState("")
    const [pokemonTypeCut, setPokemonTypeCut] = useState([])
    const [flag, setFlag] = useState(false)
    const {path} = useRouteMatch()

    const handleSearchName = (e) => {        
        setName(e)
        setType("")
    }

    const handleSearchType = (e) => {
        setType(e)
        setName("")
    }

    useEffect(() => {
        const getAllType = async () => {
            const res = await axios({
                method: "GET",
                url: "/type",
                baseURL: "https://pokeapi.co/api/v2"
            })
            setAllType(res.data.results)
        }
        getAllType()
    }, [])

    useEffect(() => {
        if (type) {
            const getType = async () => {
                const res = await axios({
                    method: "GET",
                    url: `/type/${type}`,
                    baseURL: "https://pokeapi.co/api/v2"
                })
                setPokemonType(res.data.pokemon)
            }
            getType()
        }
    }, [type])

    useEffect(() => {
        if (pokemonType) {
            pokemonType.splice(4, pokemonType.length)
            setPokemonTypeCut(pokemonType)
        }
    }, [pokemonType])

    const listTypePokemon = pokemonTypeCut.map(e => <RenderPokemon key={e.pokemon.url} url={e.pokemon.url} />)

    useEffect(() => {
        if (type.trim() !== '') {
            setFlag(true)
        } else {
            setFlag(false)
        }

    }, [type, name])

    

    return (
        <div className="App">            
            <header className="App-header">  
            <span className="iconify" data-icon="simple-icons:pokemon"></span>
            <Switch>                
                <Route path={`${path}/:id`} >                
                    <MoreInfoPokemon/>                                                
                </Route> 
                <Route path={path}>
                    <div className="container">
                        <div className="row">
                            {flag ? listTypePokemon : null}
                            {!flag ? <RenderPokemonName name={name} /> : null}
                        </div>
                    </div>                     
                    <SearchBox onSearchName={handleSearchName} onSearchType={handleSearchType} allType={allType} />                                     
                </Route>               
            </Switch>           
            <Link to="/pokedex" >                
                <div className="title-pokemon" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-house-fill" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                    <path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
                    </svg>
                </div>                
            </Link>                         
            </header>
        </div>
    );

}