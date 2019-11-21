import React, { useState , useEffect, Fragment} from 'react';

const Radiobox = ( {prices }) => {
    const [value, setValue] = useState(0);

    const handleChange = () => {

    };

    return prices.map( (price, index) => (
        <div key={index}>
            <input 
                onChange={handleChange}
                type="radio"
                value={`${prices._id}`} 
                className="mr-2 ml-4"
            />
            <label className="form-check-label"> {price.name} </label>
        </div>
    ));
}; 

export default Radiobox;