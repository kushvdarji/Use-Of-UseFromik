const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "last",
});
app.post("/register", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const number = req.body.number;
  const password = req.body.password;
  const c_password = req.body.c_password;

  if (
    req.body.name == "" ||
    req.body.email == "" ||
    req.body.number == "" ||
    req.body.password == "" ||
    req.body.c_password == ""
  ) {
    res.json({ success: false, message: "Please Fill details" });
  } else {
    db.query(
      "INSERT INTO `day` (name,email,number,password,c_password) VALUES(?,?,?,?,?)",
      [name, email, number, password, c_password],
      (err, result) => {
        if (result) {
          res.json({ success: true, message: "User Register Successfully" });
        }
        if (err) {
          console.log(err);
        }
      }
    );
  }
});
app.post("/verify",(req,res)=>{
  const email=req.body.email;
  const password=req.body.password;
  
  db.query("SELECT * FROM `day` WHERE email=? AND password=?",
  [email,password],
  (err,result)=>{
      if(err){
          res.json({success:true,err:err,message:"Registered Successfully"});
      }else{
          if(result.length>0){
              res.json({success:false,result:result,message:"User Already Registered"})
          }
          else{
              res.json({success:true,err:err,message:"Registered Successfully"})
          }
      }
  })
})
app.post("/login",(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;

    db.query("SELECT * FROM `day` WHERE email=? AND password=?",
    [email,password],
    (err,result)=>{
        if(err){
            res.json({success:false,err:err,message:"User Doesnot Match"})
        }
        else{
            if(result.length>0){
                res.json({success:true,result:result,message:"User Matched Successfully"})
            }else{
                res.json({success:false,message:"User Does Not Matched"})
            }
        }
    })
})

app.get("/dashboard",(req,res)=>{
  db.query("SELECT * FROM `day`",(err,result)=>{
    res.send(result)
    // console.log(result)
  })
})

app.post("/add", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const number = req.body.number;
  const password = req.body.password;
  const c_password = req.body.c_password;

  if (
    req.body.name == "" ||
    req.body.email == "" ||
    req.body.number == "" ||
    req.body.password == "" ||
    req.body.c_password == ""
  ) {
    res.json({ success: false, message: "Please Fill details" });
  } else {
    db.query(
      "INSERT INTO `day` (name,email,number,password,c_password) VALUES(?,?,?,?,?)",
      [name, email, number, password, c_password],
      (err, result) => {
        if (result) {
          res.json({ success: true, message: "User Added Successfully" });
        }
        if (err) {
          console.log(err);
        }
      }
    );
  }
});
app.post("/verifyadd",(req,res)=>{
  const email=req.body.email;
  const password=req.body.password;
  
  db.query("SELECT * FROM `day` WHERE email=? AND password=?",
  [email,password],
  (err,result)=>{
      if(err){
          res.json({success:true,err:err,message:"Registered Successfully"});
      }else{
          if(result.length>0){
              res.json({success:false,result:result,message:"User Already Added"})
          }
          else{
              res.json({success:true,err:err,message:"Added Successfully"})
          }
      }
  })
})

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM `day` WHERE id=?";
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

app.get("/api/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlget = "SELECT * FROM `day` WHERE id=?";
  db.query(sqlget, id, (error, result) => {
    if (error) {
      res.json({ success: false, error: error });
      console.log(error);
    } else {
      res.json({ success: true, result: result });
    }
  });
});
app.put("/api/put/:id", (req, res) => {
  const { id } = req.params;
  const { name,email, number, password,c_password } = req.body;
  const sqlupdate =
    "UPDATE `day` SET name=?,email=?,number=?,password=?,c_password=? WHERE id=?";
  db.query(
    sqlupdate,
    [name,email, number, password,c_password ,id],
    (error, result) => {
      if (error) {
        res.json({ success: false, error: error });
        console.log(error);
      } else {
        res.json({ success: true, result: result });
      }
    }
  );
});
app.listen(1500, () => {
  console.log("port is working");
});
