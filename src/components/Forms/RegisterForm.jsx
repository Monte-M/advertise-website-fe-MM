import Input from "./../UI/Inputs/Input";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Button from "./../UI/Buttons/Button";
import { postFetch } from "../../utils/fetch";
import { useHistory } from "react-router";
import css from "./LoginForm.module.css";

const formFields = [
  { name: "email", placeholder: "Email" },
  { name: "password", placeholder: "Password" },
  { name: "repeatPassword", placeholder: "Repeat Password" },
];

const initInputs = {
  email: "",
  password: "",
  repeatPassword: "",
};
const RegisterForm = () => {
  const [response, setResponse] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const errorObj = responceToErrors(response);
    formik.setErrors(errorObj);
  }, [response]);

  const formik = useFormik({
    initialValues: { ...initInputs },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
      repeatPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("This field is required"),
    }),
    onSubmit: (values) => {
      postContactForm(values);
    },
  });

  async function postContactForm(values) {
    const data = await postFetch("http://194.5.157.135:3001/clients", values);

    if (data.error) {
      setResponse(data.error);
      toast.error("Please check the form");
    }
    if (data.msg) {
      toast.success("Client added");
      history.push("/orders/2");
    }
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit} className={css.formContainer}>
        <h1>Register here</h1>
        {formFields.map(({ name, placeholder }) => (
          <Input
            key={name}
            value={formik.values[name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name={name}
            placeholder={placeholder}
            error={formik.touched[name] && formik.errors[name]}
          />
        ))}
        <Button type='submit'>Register</Button>
      </form>
    </>
  );
};

export default RegisterForm;

function responceToErrors(response) {
  const arrayStructure = response.map((errObj) => ({
    [errObj.field]: errObj.errorMsg,
  }));

  return Object.assign({}, ...arrayStructure);
}
