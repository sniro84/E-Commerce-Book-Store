import React, { useState, useEffect } from 'react';
import { getCategories, list } from './apiCore';
import Card from './Card';

const Search = () => {

    const [data, setData] = useState({
        categories: [],
        pickedCategory: "",
        searchValue: "",
        results: [],
        searched: false
    });

    const { 
        categories,
        pickedCategory,
        searchValue,
        results,
        searched
    } = data;

    const loadCategories = () => {
        getCategories().then( (data) => {
            if (data.error)
                console.log(data.error);
            else 
                setData({ ...data, categories: data});    
        });
    };

    useEffect( () => {
        loadCategories();
    } , []);

    const searchData = () => {
        // console.log(searchValue, pickedCategory);
        if (searchValue) {
            list({ searchValue: searchValue || undefined, pickedCategory: pickedCategory })
                .then( (response) => {
                    if (response.error)
                        console.log(response.error);
                    else
                        setData({ ...data, results: response, searched: true });    
                });
        }
            
    };

    const searchSubmit = (event) => {
        event.preventDefault();
        searchData();
    };

    const handleChange = (field) => (event) => {
        setData({ ...data, [field]: event.target.value, searched: false });
    };

    const searchMessage = (searched, results) => {
        if (searched && results.length > 1)
            return `Found ${results.length} products`;
        if (searched && results.length === 1)
            return "Found 1 product";
        if (searched && results.length < 1)
            return "No products were found";
    
    };

    const searchProducts = (results = []) => {
        return (
            <div>
                <h2 className="mt-4 mb-4">
                    {searchMessage(searched, results)}
                </h2>
                <div className="row">
                {results.map( (product, index) => (
                    <Card key={index} product={product} />
                ))}
            </div>
            </div>
        );
    };

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select 
                            className="btn mr-2" 
                            onChange={handleChange("pickedCategory")}
                        >
                            <option value="All">All Categories</option>
                            {categories.map( (category, index) => (
                                <option key={index} value={category._id}>
                                    {category.name}
                                </option>                         
                            ))}
                        </select>
                    </div>
                    <input
                        type="search"
                        className="form-control"
                        onChange={handleChange("searchValue")}
                        placeholder="Search By Name"
                    />
                </div>
                <div className="btn input-group-append" style={{ border: "none" }}>
                    <button className="input-group-text"> Search </button>
                </div>
            </span>
        </form>
    );

    return(
        <div className="row">
            <div className="container mb-4">
                { searchForm() }
            </div>

            <div className="container-fluid mb-4">
                { searchProducts(results) }
            </div>
        </div>
    );
};

export default Search;