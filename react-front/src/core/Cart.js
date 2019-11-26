import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import Card from './Card';
import { getCart, removeItem } from './cartHelpers';
import Checkout from './Checkout';


const Cart = () => {

    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect( () => {
        setItems(getCart());
    }, [run]);

    const showItems = (items) => {
        return (
            <div>
                <h2>Your Cart Contains {`${items.length}`} Items</h2>
                <hr/>
                {items.map((product, index) => (
                    <Card 
                        key={index}
                        product={product}
                        showAddToCartButton={false}
                        cartUpdate={true}
                        showRemoveProductButton={true}
                        setRun={setRun}
                        run={run}
                    />
                ))}
            </div>
        );
    };

    const noItemsMessage = () => (
        <h2>
            Your Cart is Empty. <hr/> <Link to="/shop"> Continue Shopping </Link> 
        </h2>
    );

    return (
        <Layout 
            title="Shopping Cart"
            description="Manage Your Cart Items. Add, Remove, Checkout or Continue Shopping."
            className="container-fluid"
        >
           <div className="row">
               <div className="col-6">
                   { (items.length > 0) ? showItems(items) : noItemsMessage() }
               </div>
               <div className="col-6">
                   <h2 className="mb-4">Your Cart Summary:</h2>
                   <hr/>
                   <Checkout products={items} setRun={setRun} run={run}/>
               </div>
           </div>
        </Layout>
    );
};

export default Cart;