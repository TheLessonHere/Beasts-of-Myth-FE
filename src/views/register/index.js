import React from "react";
import axios from "axios";
import { Form, Field, withFormik} from "formik";
import { Link, withRouter } from "react-router-dom";
import * as yup from "yup";


const Register = ({ errors, touched, values }) => {
  return (

    <div className= "sign-up-page-container">
      <div className="sign-up-page-body">
        <div className="form-intro">
          <h1>Become a Beastmaster!</h1>
        </div>
      <div className="signup-form">
        <Form>
          <div className="signup-form-field">
            {touched.username && errors.username && <p>{errors.username}</p>}
            Username:
            <Field type="text" name="username" placeholder="Username" />
          </div>
          <div className="signup-form-password">
            <div className="signup-form-field">
              {touched.password && errors.password && <p>{errors.password}</p>}
              Password:
              <Field type="password" name="password" placeholder="Password" />
            </div>
            <div className="signup-form-field">
              {touched.confirmPassword && errors.confirmPassword && <p>{errors.confirmPassword}</p>}
              Confirm Password:
              <Field type="password" name="confirmPassword" placeholder="Password" />
            </div>
          </div>
          <label className="checkbox-container">
            <Field type="checkbox" name="tos" checked={values.tos} />
            I accept the Beasts of Myth <a href="https://www.w3schools.com">terms of service</a> and <a href="https://www.w3schools.com">privacy policy.</a>
          </label>
          <button className="sign-up-button" type="submit">Sign Up</button>
          <Link to="/">
            <p>Have an account already? Log in here!</p>
          </Link>
        </Form>
        </div>
      </div>
    </div>
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