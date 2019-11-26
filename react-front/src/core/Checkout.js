import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';

const Checkout = ({ products, setRun = (f) => f, run = undefined }) => {

    const getTotal = () => {
        return products.reduce( (currValue, nextValue) => {
            return currValue + nextValue.count * nextValue.price;
        }, 0);
    };

    const showCheckout = () => {
        return isAuthenticated() ? (
            <button className="btn btn-success">Checkout</button>
        ) : (
            <Link to="/signin">
                <button className="btn btn-primary">Sign In</button>
            </Link> 
        )
    }

    return (
        <div>
            <h2>Total: ${getTotal()}</h2>
            {showCheckout()}
            
        </div>
    ); 
};

export default Checkout;