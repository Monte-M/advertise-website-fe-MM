import Input from "../UI/Inputs/Input";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Button from "../UI/Buttons/Button";
import { getFetchData } from "../../utils/fetch";
import { useHistory } from "react-router";
import css from "./AddItemForm.module.css";
import { useAuthCtx } from "../../store/AuthContext";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const beURL = process.env.REACT_APP_BE_API;

const formFields = [
  { name: "title", placeholder: "Title" },
  { name: "description", placeholder: "Description", type: "textarea" },
  { name: "city", placeholder: "City" },
  { name: "price", placeholder: "Price", type: "number" },
  { name: "id", placeholder: "ID", type: "hidden" },
];

const ModifyItem = () => {
  const { id } = useParams();
  const [singleAd, setSingleAd] = useState([]);
  const [response, setResponse] = useState([]);
  const [categoriesArr, setCategoriesArr] = useState([]);
  const history = useHistory();
  const authCtx = useAuthCtx();
  const token = authCtx.token;
  const user_id = authCtx.id;

  const getSinglePost = async () => {
    const data = await getFetchData(`${beURL}/items/single/${id}`);
    setSingleAd(data.data);
  };

  const initInputs = {
    title: `${singleAd[0]?.title}`,
    description: `${singleAd[0]?.description}`,
    city: `${singleAd[0]?.city}`,
    price: `${singleAd[0]?.price}`,
    id: id,
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initInputs,
    validationSchema: Yup.object({
      title: Yup.string().min(5).max(19).required(),
      description: Yup.string().min(10).max(300).required(),
      city: Yup.string().required(),
      price: Yup.number().required(),
      id: Yup.number().required(),
    }),
    onSubmit: (values) => {
      postContactForm(values);
    },
  });

  useEffect(() => {
    getSinglePost();
    return () => {
      setSingleAd([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const formikErrors = formik.setErrors;
  useEffect(() => {
    const errorObj = responceToErrors(response);
    formikErrors(errorObj);
  }, [response, formikErrors]);

  async function postContactForm(values) {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("city", values.city);
    formData.append("price", values.price);
    formData.append("id", values.id);

    const resp = await fetch(`${beURL}/items/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });
    const data = await resp.json();

    if (data.error) {
      setResponse(data.error);
      toast.error("Please check the form");
    }
    if (data.msg) {
      toast.success("Advertise successfully modified");
      setTimeout(() => {
        history.push("/myAds");
      }, 1000);
    }
  }

  console.log("id", id);

  return (
    <div className={css.container}>
      <form onSubmit={formik.handleSubmit} className={css.formContainer}>
        <h1>Modify you AD</h1>
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
    </div>
  );
};

export default ModifyItem;

function responceToErrors(response) {
  const arrayStructure = response.map((errObj) => ({
    [errObj.field]: errObj.errorMsg,
  }));

  return Object.assign({}, ...arrayStructure);
}
