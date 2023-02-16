// import { Alert } from "@mui/material";
import Axios from "axios";
import React, { useState, useEffect } from "react";
// import { Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const loadData = async () => {
    const response = await Axios("http://localhost:1500/dashboard");
    setData(response.data);
  };
  useEffect(() => {
    loadData();
  }, []);
  const handleDelete = (id) => {
    if (window.confirm("Are You Sure You Want To Delete")) {
      Axios.delete(`http://localhost:1500/delete/${id}`);
      toast.success("Deleted Successfully");
      setTimeout(() => loadData(), 500);
    }
  };
  return (
    <div>
      <ToastContainer theme="colored" />
      <Link to="/add">
        <button
          style={{
            height: "80px",
            width: "150px",
            fontSize: "40px",
            borderRadius: "10px",
          }}
        >
          Add
        </button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email Id</th>
            <th>Mobile No.</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <>
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.number}</td>
                  <td>{item.password}</td>
                  {/* <td>{item.c_password}</td> */}
                  <td>
                    <button
                      style={{ borderRadius: "5px" }}
                      className="alert alert-primary"
                      role="alert"
                      onClick={() => navigate(`/update/${item.id}`)}
                    >
                      Edit
                    </button>{" "}
                    &nbsp;
                    <button
                      style={{ borderRadius: "5px" }}
                      onClick={() => handleDelete(item.id)}
                      className="alert alert-danger"
                      role="alert"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
