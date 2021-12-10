import Input from "./../UI/Inputs/Input";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Button from "./../UI/Buttons/Button";
import { postAuthenticatedFetch } from "../../utils/fetch";
import { useHistory } from "react-router";
import css from "./LoginForm.module.css";
import { useAuthCtx } from "../../store/AuthContext";

const formFields = [
  { name: "user_id", placeholder: "User ID", type: "hidden" },
  { name: "category_id", placeholder: "Category ID" },
  { name: "title", placeholder: "Title" },
  { name: "description", placeholder: "Description", type: "textarea" },
  { name: "city", placeholder: "City" },
  { name: "price", placeholder: "Price", type: "number" },
  { name: "item_condition", placeholder: "Item condition" },
  { name: "image", placeholder: "Image" },
];

const AddItemForm = () => {
  const [response, setResponse] = useState([]);
  const history = useHistory();
  const authCtx = useAuthCtx();
  const token = authCtx.token;
  const user_id = authCtx.id;
  console.log(token);
  console.log(authCtx.id);

  const initInputs = {
    user_id: user_id,
    category_id: "1",
    title: "Macbook Air 2019",
    description: "A very good computer",
    price: "500",
    city: "Kaunas",
    item_condition: "Used",
    image: "",
  };

  useEffect(() => {
    const errorObj = responceToErrors(response);
    formik.setErrors(errorObj);
  }, [response]);

  const formik = useFormik({
    initialValues: { ...initInputs },
    validationSchema: Yup.object({
      user_id: Yup.number().required(),
      category_id: Yup.number().required(),
      title: Yup.string().min(5).max(25).required(),
      description: Yup.string().min(10).max(300).required(),
      city: Yup.string().required(),
      price: Yup.number().required(),
      item_condition: Yup.string().required(),
      image: Yup.string().url().required(),
    }),
    onSubmit: (values) => {
      postContactForm(values);
    },
  });

  async function postContactForm(values) {
    const data = await postAuthenticatedFetch(
      "http://localhost:3001/items",
      values,
      token
    );

    console.log(data);

    if (data.error) {
      setResponse(data.error);
      toast.error("Please check the form");
    }
    if (data.msg) {
      toast.success("Advertise successfully added");

      // history.push("/orders/2");
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
