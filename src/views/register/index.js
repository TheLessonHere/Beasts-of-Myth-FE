import React from "react";
import axios from "axios";
import { Form, Field, withFormik} from "formik";
import { Link, withRouter } from "react-router-dom";
import * as yup from "yup";
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

const Register = ({ errors, touched, values }) => {
  return (

    <LPContainer>
      <div className="sign-up-page-body">
        <div className="form-intro">
          <Header>Become a Beastmaster!</Header>
        </div>
      <div className="signup-form">
        <Form>
          <FormField>
            {touched.username && errors.username && <p>{errors.username}</p>}
            Username:
            <Field className="field" type="text" name="username" placeholder="Username" />
          </FormField>
          <div className="signup-form-password">
            <FormField>
              {touched.password && errors.password && <p>{errors.password}</p>}
              Password:
              <Field className="field" type="password" name="password" placeholder="Password" />
            </FormField>
            <FormField>
              {touched.confirmPassword && errors.confirmPassword && <p>{errors.confirmPassword}</p>}
              Confirm Password:
              <Field className="field" type="password" name="confirmPassword" placeholder="Password" />
            </FormField>
          </div>
          <label className="checkbox-container">
            <Field type="checkbox" name="tos" checked={values.tos} />
            {" "}I accept the Beasts of Myth <a href="https://www.w3schools.com">terms of service</a> and <a href="https://www.w3schools.com">privacy policy.</a>
          </label>
          <SubmitButton type="submit">Sign Up</SubmitButton>
          <Link className="link-text" to="/">
            <p>Have an account already? Log in here!</p>
          </Link>
        </Form>
        </div>
      </div>
    </LPContainer>
  );
};

const FormikRegister = withRouter(withFormik({
  mapPropsToValues({ username, password, confirmPassword, tos }) {
    return {
      username: username || '',
      password: password || '',
      confirmPassword: confirmPassword || '',
      tos: tos || false
    };
  },

  validationSchema: yup.object().shape({
    username: yup.string()
    .min(2, "Username must be at least 2 characters")
    .max(20, "Username can not be longer than 20 characters")
    .required("Username is required"),

    password: yup.string().required("Password is required"),
    confirmPassword: yup.string()
      .required("Please confirm password")
      .test("passwords-match", "Passwords must match", function(value) {
        return this.parent.password === value}),
    tos: yup.boolean()
        .oneOf([true], "Users must accept the Terms of Service"),
  }),
  handleSubmit(values, { props }) {
    const credentials = {"username": values.username,
                         "password": values.password}
    axios.post("http://localhost:5000/api/auth/register", credentials)
      .then(res => {
        console.log("User successfully added.");
        props.history.push("/");
      })
      .catch(err => console.log(err.response));
  }
})(Register));

export default FormikRegister;