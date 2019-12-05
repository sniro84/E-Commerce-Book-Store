import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { getProduct , getCategories , updateProduct } from './apiAdmin';

const UpdateProduct = ({ match }) => {

    const [ values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        categories: "",
        category: "",
        shipping: "",
        quantity: "",
        photo: "",
        loading: false,
        error: "",
        createdProduct: "",
        redirectToProfile: false,
        formData: ""
    });

    const { user, token } = isAuthenticated();

    const {
        name, 
        description, 
        price, 
        categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData    
    } = values;

    const init = (productId) => {
        getProduct(productId).then( (data) => {
            if (data.error)
                setValues({ ...values, error: data.error });
            else {
                setValues ({
                    ...values,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    category: data.category._id,
                    shipping: data.shipping,
                    quantity: data.quantity,
                    formData: new FormData()
                });
                initCategories();
            }
                    
        });
    };

    // load categories and set form data
    const initCategories = () => {
        getCategories().then( (data) => {
            if (data.error)
                setValues({ ...values , error: data.error});
            else
                setValues({ categories: data , formData: new FormData() });    
        });
    };

    useEffect( () => {
         init(match.params.productId);
    } , []); 

    
    const handleChange = (field) => (event) => {
        const value = (field === "photo") ? event.target.files[0] : event.target.value;
        formData.set(field, value);
        setValues({ ...values , [field]: value});
    };
    
    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values , error: "", loading: true });
        updateProduct(match.params.productId, user._id, token, formData)
            .then( (data) => {
                if (data.error) 
                    setValues({ ...values, error: data.error, createdProduct: null }); 
                else {
                    setValues({
                         ...values,
                         name: "",
                         description: "",
                         photo: "",
                         price: "",
                         quantity: "",
                         loading: false,
                         error: "",
                         createdProduct: data.name,
                         redirectToProfile: true,
                         formData: new FormData()
                  })
                }    
            });
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input 
                        onChange={handleChange("photo")} 
                        type="file" 
                        name="photo"
                        accept="image/*"
                    /> 
                </label>
            </div>

            <div className="form-group">
                <label className="text-muted">Name</label>
                <input 
                    onChange={handleChange("name")}
                    type="text"
                    className="form-control"
                    value={name}
                /> 
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea 
                    onChange={handleChange("description")}
                    className="form-control"
                    value={description}
                /> 
            </div>

            <div className="form-group">
                <label className="text-muted">Price</label>
                <input 
                    onChange={handleChange("price")}
                    type="number"
                    className="form-control"
                    value={price}
                /> 
            </div>

            <div className="form-group">
                <label className="text-muted">Category</label>
                <select onChange={handleChange("category")} className="form-control">
                    <option>Select Category</option>
                    { categories && categories.map( (category, index) => (
                        <option key={index} value={category._id}>
                             {category.name}
                        </option>
                    )) }
                </select>     
            </div>

            <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select onChange={handleChange("shipping")} className="form-control">
                    <option>Select Shipping</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>     
            </div>

            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input 
                    onChange={handleChange("quantity")}
                    type="number"
                    className="form-control"
                    value={quantity}
                /> 
            </div>
            <button className="btn btn-outline-primary mt-3">
                    Update Product
            </button>
        </form>
    ); 

    const showError = () => (  
        <div 
            className="alert alert-danger" 
            style={{ display: (error) ? "" : "none" }}
        >
            { error }
        </div>
    );
    
    const showSuccess = () => (
        <div 
            className="alert alert-info" 
            style={{ display: (createdProduct) ? "" : "none" }}
        >
            <h2> {`'${createdProduct}' has been updated successfully.`} </h2>
        </div> 
    );

    const showLoading = () => (
        loading && (
            <div className="alert alert-info">
                <h2> Loading... </h2>
            </div>
        )
    );

    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/" />
            }
        }
    };
        

    return (
        <Layout 
            title="Add Product" 
            description={`Welcome, ${user.name}! Ready To Add A New Product?`}
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    { showLoading() }
                    { showSuccess() }
                    { showError() }
                    { newPostForm() }
                    { redirectUser() }
                </div>
            </div>    
        </Layout>
    );
};

export default UpdateProduct;
