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

const formFields = [
  { name: "email", placeholder: "Email" },
  { name: "password", placeholder: "Password", type: "password" },
];

const initInputs = {
  email: "mantas@mantas.com",
  password: "123456",
};
const LoginForm = () => {
  const [response, setResponse] = useState([]);
  const authCtx = useAuthCtx();
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
    }),
    onSubmit: (values) => {
      postContactForm(values);
    },
  });

  async function postContactForm(values) {
    const data = await postFetch("http://localhost:3001/users/login", values);

    if (data.error) {
      setResponse(data.error);
      toast.error("Please check the form");
    }
    if (data.msg) {
      // history.push("/orders/2");
      const token = data.loggedInUser.token;
      const id = data.loggedInUser.id;
      console.log(id);
      authCtx.login(formik.values.email, token, id);
      history.push("/");
    }
  }

  return (
    <>
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
    </>
  );
};

export default LoginForm;

function responceToErrors(response) {
  const arrayStructure = response.map((errObj) => ({
    [errObj.field]: errObj.errorMsg,
  }));

  return Object.assign({}, ...arrayStructure);
}
