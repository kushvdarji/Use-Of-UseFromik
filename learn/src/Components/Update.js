import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import { formSchema } from "../schemas";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
const initialValues = {
  name: "",
  number: "",
  email: "",
  password: "",
  c_password: "",
};
function Update() {
  const { id } = useParams();
  useEffect(() => {
    console.log(id);
    Axios.get(`http://localhost:1500/api/get/${id}`).then((res) => {
      if (res.data.success === false) {
        console.log(res.data.message);
      } else {
        // values({...res.data.result[0]})
        setKush({ ...res.data.result[0] });
      }
      toast.success(res.data.message);
    });
  }, [id]);
  const [kush, setKush] = useState(initialValues);
  const { name, email, number, password, c_password } = kush;
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };
  const { touched, errors } = useFormik({
    initialValues,
    validationSchema: formSchema,
  });
  const handleSubmit=()=>{
    Axios.put(`http://localhost:1500/api/put/${id}`, {
        name,
        email,
        number,
        password,c_password
      })
        .then(() => {
          setKush({ name:"",email: "", mobile: "", password: "",c_password:"" });
        })
        .catch((error) => toast.error(error.resp.data));
      toast.success("updated successfully");
        navigate("/dashboard");
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setKush({ ...kush, [name]: value });
  };
  return (
    <div>
      <ToastContainer />
      <Form
        onSubmit={handleSubmit}
        style={{
          alignItems: "center",
          margin: "auto",
          textAlign: "center",
          justifyContent: "center",
          marginTop: "2%",
          backgroundColor: "lightgray",
          borderRadius: "20px",
          width: "50%",
        }}
      >
        <br />
        <br />
        <h1>Edit</h1>
        <br />
        <br />
        <TextField
          type="text"
          label="Enter Your Name"
          varient="outlined"
          className="kush"
          name="name"
          placeholder="Enter Your Name"
          value={name}
          onChange={handleChange}
          //   onBlur={handleBlur}
          autoComplete="off"
        />
        <br />
        <p>{errors.name && touched.name ? errors.name : null}</p>
        {/* <br /> */}
        <TextField
          type="email"
          label="Enter Your Email"
          varient="outlined"
          className="kush"
          placeholder="Enter Your Email"
          value={email}
          onChange={handleChange}
          //   onBlur={handleBlur}
          autoComplete="off"
          name="email"
        />
        <br />
        <p>{errors.email && touched.email ? errors.email : null}</p>
        {/* <br /> */}
        <TextField
          type="number"
          label="Enter Your Mobile No."
          varient="outlined"
          className="kush"
          placeholder="Enter Your Name"
          value={number}
          onChange={handleChange}
          //   onBlur={handleBlur}
          name="number"
          autoComplete="off"
          onInput={(e) => (e.target.value = e.target.value.slice(0, 10))}
        />
        <br />
        <p>{errors.number && touched.number ? errors.number : null}</p>
        {/* <br /> */}
        <div>
          <TextField
            type={show ? "text" : "password"}
            label="Enter Your Password"
            varient="outlined"
            className="kush"
            placeholder="Enter Your Password"
            value={password}
            onChange={handleChange}
            // onBlur={handleBlur}
            name="password"
            autoComplete="off"
          />
          {/* <br /> */}
          <p style={{ width: "30%", margin: "auto", textAlign: "center" }}>
            {errors.password && touched.password ? errors.password : null}
          </p>
          {/* <br /> */}
        </div>
        <input
          type="checkbox"
          onClick={handleShow}
          style={{ height: "20px", width: "20px", cursor: "pointer" }}
        ></input>{" "}
        Show Password
        <br />
        <TextField
          type="password"
          label="Confirm Your Password"
          varient="outlined"
          className="kush"
          placeholder="Confirm Your Password"
          value={c_password}
          onChange={handleChange}
          name="c_password"
          //   onBlur={handleBlur}
          autoComplete="off"
        />
        <br />
        <p>
          {errors.c_password && touched.c_password ? errors.c_password : null}
        </p>
        <br />
        <Button variant="primary" type="submit">
          Update
        </Button>
        <br />
        <br />
        <br />
        {/* <br/> */}
      </Form>
    </div>
  );
}

export default Update;
