import React from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import { Link, withRouter } from 'react-router-dom';
import * as yup from 'yup';

function Login({ errors, touched }) {
    return(
        <div className='login-page-container'>
            <div className='login-page'>
                <h2 className='login-header'>Welcome Back!</h2>
                <Form className='login-form-field' >
                    <div className='form-field'>
                        {touched.username && errors.username && <p>{errors.username}</p>}
                        Username:
                        <Field type= 'username' name='username' placeholder='Username' />
                    </div>
                    <div className='form-field'>
                        {touched.password && errors.password && <p>{errors.password}</p>}
                        Password:
                        <Field type= 'password' name='password' placeholder='Password' />
                        </div>
                    <button className='button' type='submit'>Submit</button>
                    <Link to="/register">
                        <p>Don't have an account? Create one here!</p>
                    </Link>
                </Form>
            </div>
        </div>
    )
}

const FormikLogin = withRouter(withFormik({
    mapPropsToValues({ username, password }){
        return{
            username: username || '',
            password: password || ''
        };
    },
    validationSchema: yup.object().shape({
        username: yup.string()
        .min(2, "Username must be at least 2 characters")
        .max(20, "Username can not be longer than 20 characters")
        .required('Username is required'),
        password: yup.string().required('Password is required'),
    }),
    handleSubmit(user, { props }){
        axios.post('https://lifegpa-api.herokuapp.com/auth/login', user)
        .then(res => {
            localStorage.setItem('token', res.data.token);
            const user_id = res.data.id;
            props.history.push(`/dashboard/${user_id}`);
        })
        .catch(err => console.log(err))
    }
})(Login));

export default FormikLogin;