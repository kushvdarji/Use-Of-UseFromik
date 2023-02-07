import React,{useState} from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import { formSchema } from "../schemas";
import Axios from "axios"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
function Register() {
    const navigate=useNavigate();
  const initialValues = {
    name: "",
    number: "",
    email: "",
    password: "",
    c_password: "",
  };
  const [show, setShow] = useState(false);
  const handleShow=()=>{
    setShow(!show)
  }
  const { values,handleSubmit,handleChange, handleBlur, touched, errors } = useFormik({
    initialValues,
    validationSchema: formSchema,
    
    onSubmit:(values)=>{ 
      alert("hello")
    Axios.post("http://localhost:1500/register",values).then((res)=>{
      console.log(res.data.success);
        if(res.data.success === true){
          navigate("/login");
          console.log(res.data.message);  
          // navigate('/login')
        }
        else{
          toast.error(res.data.message);
        }
      })
    }
    });
  return (
    <div>
    <ToastContainer/>
      <Form onSubmit={handleSubmit}
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
        <h1>Register</h1>
        <br />
        <br />
        <TextField
          type="text"
          label="Enter Your Name"
          varient="outlined"
          className="kush"
          name="name"
          placeholder="Enter Your Name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="off"
        />
        <br />
        <p>
        {errors.name && touched.name ? errors.name : null}</p>
        {/* <br /> */}
        <TextField
          type="email"
          label="Enter Your Email"
          varient="outlined"
          className="kush"
          placeholder="Enter Your Email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="off"
          name="email"
        />
        <br />
        <p>
        {errors.email && touched.email ? errors.email : null}</p>

        {/* <br /> */}
        <TextField
          type="number"
          label="Enter Your Mobile No."
          varient="outlined"
          className="kush"
          placeholder="Enter Your Name"
          value={values.number}
          onChange={handleChange}
          onBlur={handleBlur}
          name="number"
          autoComplete="off"
          onInput={(e) =>
                    (e.target.value = e.target.value.slice(0, 10))
                  }
        />
        <br />
        <p>
        {errors.number && touched.number ? errors.number : null}</p>

        {/* <br /> */}
        <div>
        <TextField
          type={show?"text":"password"}
          label="Enter Your Password"
          varient="outlined"
          className="kush"
          placeholder="Enter Your Password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          name="password"
          autoComplete="off"
        />
        {/* <br /> */}
        <p style={{width:"30%",margin:"auto",textAlign:"center"}}>
        {errors.password && touched.password ? errors.password : null}</p>
        {/* <br /> */}</div>

        <input type="checkbox" onClick={handleShow} style={{height:"20px",width:"20px",cursor:"pointer"}}></input> Show Password
        <br />  
        <TextField
          type="password"
          label="Confirm Your Password"
          varient="outlined"
          className="kush"
          placeholder="Confirm Your Password"
          value={values.c_password}
          onChange={handleChange}
          name="c_password"
          onBlur={handleBlur}
          autoComplete="off"
        />
        <br />
        <p>
        {errors.c_password && touched.c_password ? errors.c_password : null}</p>

        {/* <br /> */}
        <Button variant="primary" type="submit" >Submit</Button>
        <br />
        <br />

        Already Have An Account : <Link to="/login"><b>Login</b></Link>
        <br/>
        <br/>
      </Form>
    </div>
  );
}

export default Register;
