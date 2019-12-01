import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { listOrders } from './apiAdmin';
import moment from 'moment';

const Orders = () => {

    const [orders, setOrders] = useState([]);
    
    useEffect( () => {
        loadOrders();
    }, []);

    const { user, token } = isAuthenticated();

    const loadOrders = () => {
        listOrders(user._id, token).then( (data) => {
            if (data.error)
                console.log(data.error);
            else
                setOrders(data);    
        });
    };

    const showOrdersLength = () => {
        if (orders.length > 0) {
            return (
                <h1 className="text-danger display-2">Total Orders: {orders.length} </h1>
            );
        }
        else 
            return <h1 className="text-danger">No Orders.</h1>;

    };

    return (
        <Layout 
            title="Add Category" 
            description={`Welcome, ${user.name}! Mange Your Orders.`}
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    { showOrdersLength() }
                    {orders.map( (order, ordIndex) => (
                        <div 
                            className="mt-5" 
                            key={ordIndex}
                            style={{ borderBottom: "5px solid indigo" }}
                        >
                            <h2 className="mb-5">
                                <span className="bg-primary">
                                    Order ID: {order._id}
                                </span>
                            </h2>

                            <ul className="list-group mb-2">
                                <li className="list-group-item">
                                    {order.status}
                                </li>
                                <li className="list-group-item">
                                    Transaction ID: {order.transaction_id}
                                </li>
                                <li className="list-group-item">
                                    Amount: ${order.amount}
                                </li>
                                <li className="list-group-item">
                                    Ordered By: {order.user.name}
                                </li>
                                <li className="list-group-item">
                                    Ordered On: { moment(order.createdAt).fromNow() }
                                </li>
                                <li className="list-group-item">
                                    Delivery Address: {order.address}
                                </li>
                            </ul>

                            <h3 className="mt-4 mb-4 font-italic">
                                Total Products In The Order: {order.products.length}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>    
        </Layout>
    );
};

export default Orders;