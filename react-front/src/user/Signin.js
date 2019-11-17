import React , { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import { signin , authenticate } from '../auth';


const Signin = () => {
    const [values, setValues] = useState({
        email: "sniro@example.com",
        password: "dugi123",
        error: "",
        loading: false,
        redirectToReferrer: false
    });

    const { email , password, error, loading, redirectToReferrer } = values;

    const handleChange = (field) => (event) => {
        setValues({ ...values, error: false, [field]: event.target.value });
    };

    
    
    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values , error: false , loading: true });
        signin({ email, password })
            .then( (data) => {
                if (data.error)
                    setValues({ ...values , error: data.error , loading: false });
                else {
                    authenticate(data , () => {
                        setValues({ ...values, redirectToReferrer: true });
                    });
                }    
            });
    };

    const signInForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input 
                    onChange={handleChange("email")} 
                    type="email" 
                    className="form-control"
                    value={email}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input 
                    onChange={handleChange("password")} 
                    type="password" 
                    className="form-control"
                    value={password}
                />
            </div>

            <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{display: (error) ? "" : "none"}}>
            {error}
        </div>
    );

    const showLoading = () => (
        loading && 
            <div classname="alert alert-info">
                <h2>Loading...</h2>
            </div>            
    );

    const redirectUser = () => {
        if (redirectToReferrer)
            return <Redirect to="/" />
    };

    return (
        <Layout 
            title="Signin" 
            description="Signin to Node React E-Commerce App"
            className="container col-md-8 offset-md-2">

                { showLoading() }
                { showError() }
                { signInForm() }
                { redirectUser() }

        </Layout>
    );
}
    


export default Signin;
