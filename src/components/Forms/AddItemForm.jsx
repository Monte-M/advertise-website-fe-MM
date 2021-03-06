import Input from "./../UI/Inputs/Input";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Button from "./../UI/Buttons/Button";
import { getFetchData } from "../../utils/fetch";
import { useHistory } from "react-router";
import css from "./AddItemForm.module.css";
import { useAuthCtx } from "../../store/AuthContext";

const beURL = process.env.REACT_APP_BE_API;

const formFields = [
  { name: "user_id", placeholder: "User ID", type: "hidden" },
  { name: "title", placeholder: "Title" },
  { name: "description", placeholder: "Description", type: "textarea" },
  { name: "city", placeholder: "City" },
  { name: "price", placeholder: "Price", type: "number" },
];

const AddItemForm = () => {
  const [response, setResponse] = useState([]);
  const [categoriesArr, setCategoriesArr] = useState([]);
  const history = useHistory();
  const authCtx = useAuthCtx();
  const token = authCtx.token;
  const user_id = authCtx.id;

  const initInputs = {
    user_id: user_id,
    category_id: "1",
    title: "",
    description: "",
    price: "",
    city: "",
    item_condition: "New",
    image: "",
  };

  const getCategories = async () => {
    const data = await getFetchData(`${beURL}/categories`);
    setCategoriesArr(data.data);
  };

  useEffect(() => {
    getCategories();
    return () => {
      setCategoriesArr([]);
    };
  }, []);

  const formik = useFormik({
    initialValues: { ...initInputs },
    validationSchema: Yup.object({
      user_id: Yup.number().required(),
      category_id: Yup.number().required(),
      title: Yup.string().min(5).max(19).required(),
      description: Yup.string().min(10).max(300).required(),
      city: Yup.string().required(),
      price: Yup.number().required(),
      item_condition: Yup.string().required(),
      image: Yup.mixed().required(),
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
    const formData = new FormData();
    formData.append("user_id", values.user_id);
    formData.append("item_condition", values.item_condition);
    formData.append("category_id", values.category_id);
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("city", values.city);
    formData.append("price", values.price);
    formData.append("image", values.image);

    const resp = await fetch(`${beURL}/items`, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await resp.json();

    if (data.error) {
      setResponse(data.error);
      toast.error("Please check the form");
    }
    if (data.msg) {
      toast.success("Advertise successfully added");
      history.push("/myAds");
    }
  }

  return (
    <div className={css.container}>
      <form onSubmit={formik.handleSubmit} className={css.formContainer}>
        <h1>Post new AD</h1>
        <label htmlFor='category_id'>Select category:</label>
        <select
          className={css.select}
          id='category_id'
          name='category_id'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={Number(formik.values.category_id)}
          error={formik.touched.category_id && formik.errors.category_id}
        >
          {categoriesArr.map(({ id, category }) => (
            <option key={id} value={id}>
              {category}
            </option>
          ))}
        </select>
        <label htmlFor='item_condition'>Item condition:</label>
        <select
          className={css.select}
          id='item_condition'
          name='item_condition'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.item_condition}
          error={formik.touched.item_condition && formik.errors.item_condition}
        >
          <option value='New'>New</option>
          <option value='Used'>Used</option>
        </select>

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
        <Input
          onChange={(e) =>
            formik.setFieldValue("image", e.currentTarget.files[0])
          }
          type='file'
          name='image'
        />

        <Button type='submit'>Post</Button>
      </form>
    </div>
  );
};

export default AddItemForm;

function responceToErrors(response) {
  const arrayStructure = response.map((errObj) => ({
    [errObj.field]: errObj.errorMsg,
  }));

  return Object.assign({}, ...arrayStructure);
}
