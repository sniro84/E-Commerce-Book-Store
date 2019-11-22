import React, { useState , useEffect, Fragment} from 'react';

const Radiobox = ( {prices, handleFilters }) => {
    const [value, setValue] = useState(0);

    const handleChange = (event) => {
        handleFilters(event.target.value);
        setValue(event.target.value);
    };

    return prices.map( (price, index) => (
        <div key={index}>
            <input 
                onChange={handleChange}
                type="radio"
                value={`${price._id}`}
                name={price} 
                className="mr-2 ml-4"
            />
            <label className="form-check-label"> {price.name} </label>
        </div>
    ));
}; 

export default Radiobox;