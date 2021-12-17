import Input from "./../UI/Inputs/Input";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Button from "./../UI/Buttons/Button";
import { postFetch } from "../../utils/fetch";
import css from "./LoginForm.module.css";
import { useHistory } from "react-router-dom";

const beURL = process.env.REACT_APP_BE_API;

const formFields = [
  { name: "username", placeholder: "Username" },
  { name: "email", placeholder: "Email" },
  { name: "city", placeholder: "City" },
  { name: "phone_number", placeholder: "Phone number" },
  { name: "image", placeholder: "Image" },
  { name: "password", placeholder: "Password", type: "password" },
  { name: "password2", placeholder: "Repeat Password", type: "password" },
];

const initInputs = {
  username: "",
  email: "",
  city: "",
  phone_number: "",
  image:
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.logolynx.com%2Fimages%2Flogolynx%2F03%2F039b004617d1ef43cf1769aae45d6ea2.png&f=1&nofb=1",
  password: "",
  password2: "",
};
const RegisterForm = () => {
  const history = useHistory();
  const [response, setResponse] = useState([]);

  const formik = useFormik({
    initialValues: { ...initInputs },
    validationSchema: Yup.object({
      username: Yup.string().required(),
      email: Yup.string().email().required(),
      city: Yup.string().min(3).required(),
      phone_number: Yup.string().min(9).max(12).required(),
      image: Yup.string().required(),
      password: Yup.string().min(6).required(),
      password2: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("This field is required"),
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
    const data = await postFetch(`${beURL}/users/register`, values);

    if (data.error) {
      setResponse(data.error);
      toast.error("Please check the form");
    }
    if (data.msg) {
      toast.success("Successfully registered");
      setTimeout(() => {
        history.push("/login");
      }, 1000);
    }
  }

  return (
    <div className={css.container}>
      <form onSubmit={formik.handleSubmit} className={css.formContainer}>
        <h1>Register here</h1>
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
        <Button type='submit'>Register</Button>
      </form>
    </div>
  );
};

export default RegisterForm;

function responceToErrors(response) {
  const arrayStructure = response.map((errObj) => ({
    [errObj.field]: errObj.errorMsg,
  }));

  return Object.assign({}, ...arrayStructure);
}
