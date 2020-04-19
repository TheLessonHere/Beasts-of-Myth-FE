import React from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import { Link, withRouter } from 'react-router-dom';
import * as yup from 'yup';
import styled from 'styled-components';
// Components
import { SubmitButton } from '../../utils/components/SubmitButton';

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
        axios.post('http://localhost:8000/api/auth/login', user)
        .then(res => {
            localStorage.setItem('token', res.data.token);
            const user_id = res.data.user_id;
            props.history.push(`/dashboard/${user_id}`);
        })
        .catch(err => console.log(err))
    }
})(Login));

export default FormikLogin;