import Input from "./../UI/Inputs/Input";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Button from "./../UI/Buttons/Button";
import { postFetch } from "../../utils/fetch";
import { useHistory } from "react-router";
import css from "./LoginForm.module.css";
import { useAuthCtx } from "../../store/AuthContext";

const beURL = process.env.REACT_APP_BE_API;

const formFields = [
  { name: "email", placeholder: "Email" },
  { name: "password", placeholder: "Password", type: "password" },
];

const initInputs = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [response, setResponse] = useState([]);
  const authCtx = useAuthCtx();
  const history = useHistory();

  const formik = useFormik({
    initialValues: { ...initInputs },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    }),
    onSubmit: (values) => {
      postContactForm(values);
    },
  });

  const formikErrors = formik.setErrors;
  useEffect(() => {
    const errorObj = responceToErrors(response);
    formikErrors(errorObj);
  }, [response, formikErrors]);

  async function postContactForm(values) {
    const data = await postFetch(`${beURL}/users/login`, values);

    if (data.error) {
      setResponse(data.error);
      toast.error("Please check the form");
    }
    if (data.msg) {
      const token = data.loggedInUser.token;
      const id = data.loggedInUser.id;

      authCtx.login(formik.values.email, token, id);
      setTimeout(() => {
        history.push("/");
      }, 1000);
    }
  }

  return (
    <div className={css.container}>
      <form onSubmit={formik.handleSubmit} className={css.formContainer}>
        <h1>Login here</h1>
        {formFields.map(({ name, placeholder, type }) => (
          <Input
            key={name}
            value={formik.values[name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name={name}
            type={type}
            placeholder={placeholder}
            error={formik.touched[name] && formik.errors[name]}
          />
        ))}
        <Button type='submit'>Login</Button>
      </form>
    </div>
  );
};

export default LoginForm;

function responceToErrors(response) {
  const arrayStructure = response.map((errObj) => ({
    [errObj.field]: errObj.errorMsg,
  }));

  return Object.assign({}, ...arrayStructure);
}
