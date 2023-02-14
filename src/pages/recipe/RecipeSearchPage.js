import { BottomNavigation } from '@mui/material';
import React from 'react'
import { useSearchParams } from 'react-router-dom';
import useSearch from '../../hooks/useSearch';
import CardList from './CardList'
import SearchBar from './SearchBar'
import BottomNav from "../../components/BottomNav";

const RecipeSearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const q= searchParams.get("query")
    console.log(q)
    const results = useSearch("recipes", q);
    console.log("幹",results)
  
    return (
        <div>
            <SearchBar />
            <CardList data={results}/>
            <BottomNav/>
        </div>
    )
}

export default RecipeSearchPage
