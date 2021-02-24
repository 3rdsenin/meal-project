const express = require("express");
const app = express();
const mysql = require("mysql");


const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "meal-project",
});

app.get("/", (req, res)=>{

  
    const sqlinsert = "insert into users (Username, Password) values ('paul','solomon')";
    db.query(sqlinsert, (err, result)=>{
        if (err) throw err;
        else res.send("Hello");
    });
    
     
})

app.listen(3001, ()=>{
    console.log("running on port 3001");
})