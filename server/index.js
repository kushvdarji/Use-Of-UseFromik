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

app.listen(1500, () => {
  console.log("port is working");
});
