import React, { useState } from 'react';
import { Link , Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import {addItem} from './cartHelpers';

const Card = ({ product, showViewProductButton = true }) => {

    const [redirect, setRedirect] = useState(false);

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true);
        });
    };

    const shouldRedirect = (redirect) => {
        if (redirect)
            return <Redirect to="/cart" />
    };

    const showStock = (quantity) => {
        return quantity > 0 ? (
            <span className="badge badge-primary badge-pill">In Stock</span>
        ) : (
            <span className="badge badge-primary badge-pill">Out of Stock</span>
        );
    };

    const showViewButton = (showViewProductButton) => {
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`} className="mr-2">
                    <button className="btn btn-outline-primary mt-2 mb-2 mr-2 font-weight-bold">
                        View Product
                    </button>
                </Link>
            )
        );
        
    };

    const showAddToCartButton = () => {
        return (
            <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2 font-weight-bold">
                Add to Cart
            </button>
        );
    };

    return (
            <div className="card">
                <div className="card-header name">{product.name}</div>
                <div className="card-body">
                    {shouldRedirect(redirect)}
                    <ShowImage item={product} url="product"/>
                    <p className="lead mt-2">{product.description.substring(0,100)}</p>
                    <p className="black-10">${product.price}</p>
                    <p className="black-9">
                        Category: {product.category && product.category.name}
                    </p>
                    <p className="black-8">
                        Added {moment(product.createdAt).fromNow()}
                    </p>
                        {showStock(product.quantity)}
                        <br/>
                        {showViewButton(showViewProductButton)}
                        {showAddToCartButton()}
                </div>   
            </div>
    );
};

export default Card;