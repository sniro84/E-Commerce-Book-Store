import React, { useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createCategory } from './apiAdmin';

const AddCategory = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const {user, token} = isAuthenticated();


    const handleChange = (event) => {
        setError("");
        setSuccess(false);
        setName(event.target.value);
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false);

        // make a request to API to create category
        createCategory(user._id, token, {name})
            .then( (data) => {
                if (data.error)
                    setError(true);                    
                else {
                    setError("");
                    setSuccess(true);
                }    
            });                           
    };

    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-gruop">
                <label className="text-muted">Name</label>
                <input 
                    type="text" 
                    className="form-control" 
                    onChange={handleChange}
                    value={name}
                    autoFocus
                    required
                />
            </div>
            <button className="btn btn-outline-primary mt-3">
                    Create Category
            </button>
        </form>
    );

    const showSuccess = () => {
        if (success)
            return <h3 className="text-success"> '{name}' category has been created successfully.</h3>
    };

    const showError = () => {
        if (error)
            return <h3 className="text-danger"> '{name}' category already exists.</h3>
    };

    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-secondary">
                Back to Dashboard
            </Link>
        </div>
    );

    return (
        <Layout 
            title="Add Category" 
            description={`Welcome, ${user.name}! ready to add a new category?`}
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    { showSuccess() }
                    { showError() }
                    { newCategoryForm() }
                    { goBack() }
                </div>
            </div>    
        </Layout>
    );
};

export default AddCategory;