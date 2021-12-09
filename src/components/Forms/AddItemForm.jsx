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
  { name: "title", placeholder: "Title" },
  { name: "body", placeholder: "Description", type: "textarea" },
  { name: "price", placeholder: "Price", type: "number" },
  { name: "image", placeholder: "Image" },
];

const initInputs = {
  title: "",
  body: "",
  price: "",
  image: "",
};
const AddItemForm = () => {
  const [response, setResponse] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const errorObj = responceToErrors(response);
    formik.setErrors(errorObj);
  }, [response]);

  const formik = useFormik({
    initialValues: { ...initInputs },
    validationSchema: Yup.object({
      title: Yup.string().min(5).max(25).required(),
      body: Yup.string().min(10).max(300).required(),
      price: Yup.number().required(),
      image: Yup.string().url().required(),
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
        <h1>Post new AD</h1>
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

        <Button type='submit'>Post</Button>
      </form>
    </>
  );
};

export default AddItemForm;

function responceToErrors(response) {
  const arrayStructure = response.map((errObj) => ({
    [errObj.field]: errObj.errorMsg,
  }));

  return Object.assign({}, ...arrayStructure);
}
