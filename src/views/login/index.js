import React from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import { Link, withRouter } from 'react-router-dom';
import * as yup from 'yup';
import styled from 'styled-components';

const LPContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
    margin-top: 30px;
    background: grey;
    border-radius: 5px;
`;

const Header = styled.h2`
    justify-self: center;
    text-align: center;
    font-family: "Noto Sans JP", sans-serif;
    font-size: 2rem;
`;

const FormField = styled.div`
    justify-self: center;
    padding: 15px;
`;

const SubmitButton = styled.button`
    display: flex;
    box-shadow: inset 0px 34px 0px -15px red;
    background-color: darkred;
    border: 1px solid #241d13;
    border-radius: 5px;
    margin: auto;
    cursor: pointer;
    color: #ffffff;
    font-family: Arial;
    font-size: 15px;
    font-weight: bold;
    padding: 9px 23px;
    text-decoration: none;
    text-shadow: 0px -1px 0px #7a2a1d;
    &&:hover {
        box-shadow: inset 0px 34px 0px -15px #FF3C3C;
        background-color: #b34332;
    }
    &&:active {
        position: relative;
	    top: 1px;
    }
`;

function Login({ errors, touched }) {
    return(
        <LPContainer>
            <div className='login-page'>
                <Header>Welcome back!</Header>
                <Form className='login-form-field' >
                    <FormField>
                        {touched.username && errors.username && <p>{errors.username}</p>}
                        Username:
                        <Field className="field" type= 'username' name='username' placeholder='Username' />
                    </FormField>
                    <FormField>
                        {touched.password && errors.password && <p>{errors.password}</p>}
                        Password:
                        <Field className="field" type= 'password' name='password' placeholder='Password' />
                    </FormField>
                    <SubmitButton type='submit'>Submit</SubmitButton>
                    <Link className="link-text" to="/register">
                        <p>Don't have an account? Create one here!</p>
                    </Link>
                </Form>
            </div>
        </LPContainer>
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
        .required("Username is required"),
        password: yup.string().required("Password is required"),
    }),
    handleSubmit(user, { props }){
        axios.post('http://localhost:5000/api/auth/login', user)
        .then(res => {
            localStorage.setItem('token', res.data.token);
            const user_id = res.data.user_id;
            props.history.push(`/dashboard/${user_id}`);
        })
        .catch(err => console.log(err))
    }
})(Login));

export default FormikLogin;