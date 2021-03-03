const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

//create instance of express
const app = express();

//use modules
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


//create a mysql connection pool
const db = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "meal-project",
});

//use connections to create endpoints
//get all students
app.get("/api/getstudents", (req, res) => {

    db.getConnection((err, connection) =>{
        if (err) console.log(err);
        else{
            //console.log(`connected as ${connection.threadId}`);
    
            connection.query('select * from students', (err, result) =>{
                connection.release();

                if(!err){
                    res.send(result);
                }else{
                    console.log(err);
                }
            })
        }
    })

})
//get student by id
app.get("/api/getstudent/:id", (req, res) => {

    db.getConnection((err, connection) =>{
        if (err) console.log(err);
        else{
            //console.log(`connected as ${connection.threadId}`);
    
            connection.query('select * from students where id = ?', [req.params.id], (err, result) =>{
                connection.release();

                if(!err){
                    res.send(result);
                }else{
                    console.log(err);
                }
            })
        }
    })

})

//delete student by id

app.delete("/api/deletestudent/:id", (req, res) => {

    db.getConnection((err, connection) =>{
        if (err) console.log(err);
        else{
            //console.log(`connected as ${connection.threadId}`);
    
            connection.query('delete from students where id =?',  [req.params.id], (err, result) =>{
                connection.release();

                if(!err){
                    res.send("Deleted");
                }else{
                    console.log(err);
                }
            })
        }
    })

})

//update student
app.put("/api/updatestudent", (req, res) => {

    db.getConnection((err, connection) =>{
        if (err) console.log(err);
        else{
            //console.log(`connected as ${connection.threadId}`);

            const { id, firstname, lastname, username, password, age} = req.body;
    
            connection.query('update students set firstname = ?, lastname = ?, age = ? where id = ?', [ firstname, lastname, age, id], (err, result) =>{
                connection.release();

                if(!err){
                    res.send("updated");
                }else{
                    console.log(err);
                }
            })
        }
    })

})

//insert student
app.post("/api/insertstudent", (req, res) => {

    db.getConnection((err, connection) =>{
        if (err) console.log(err);
        else{
            //console.log(`connected as ${connection.threadId}`);

            const { firstname, lastname, username, password, age } = req.body;
                
            connection.query('insert into students (firstname, lastname, username, password, age) values(?,?,?,?,?)', [firstname, lastname, username, password, age ], (err, result) =>{
                connection.release();

                if(!err){
                    res.send("Inserted");
                }else{
                    console.log(err);
                }
            })
        }
    })

})


//get all foods
app.get("/api/getfoods", (req, res) => {

    db.getConnection((err, connection) =>{
        if (err) console.log(err);
        else{
            //console.log(`connected as ${connection.threadId}`);
    
            connection.query('select * from food', (err, result) =>{
                connection.release();

                if(!err){
                    res.send(result);
                }else{
                    console.log(err);
                }
            })
        }
    })

})
//get food by id
app.get("/api/getfood/:day", (req, res) => {

    db.getConnection((err, connection) =>{
        if (err) console.log(err);
        else{
            //console.log(`connected as ${connection.threadId}`);
    
            connection.query('select * from food where day = ?', [req.params.day], (err, result) =>{
                connection.release();

                if(!err){
                    res.send(result);
                }else{
                    console.log(err);
                }
            })
        }
    })

})

//delete food by day

app.delete("/api/deletefood/:day", (req, res) => {

    db.getConnection((err, connection) =>{
        if (err) console.log(err);
        else{
            //console.log(`connected as ${connection.threadId}`);
    
            connection.query('delete from food where day =?',  [req.params.day], (err, result) =>{
                connection.release();

                if(!err){
                    res.send("Deleted");
                }else{
                    console.log(err);
                }
            })
        }
    })

})

//update food
app.put("/api/updatefood", (req, res) => {

    db.getConnection((err, connection) =>{
        if (err) console.log(err);
        else{
            //console.log(`connected as ${connection.threadId}`);

            const { day, meal_1, meal_2, meal_3} = req.body;
    
            connection.query('update food set meal_1 = ?, meal_2 = ?, meal_3 = ? where day = ?', [ meal_1, meal_2, meal_3, day], (err, result) =>{
                connection.release();

                if(!err){
                    res.send("updated");
                }else{
                    console.log(err);
                }
            })
        }
    })

})

//insert food
app.post("/api/insertfood", (req, res) => {

    db.getConnection((err, connection) =>{
        if (err) console.log(err);
        else{
            //console.log(`connected as ${connection.threadId}`);

            const { day, meal_1, meal_2, meal_3} = req.body;
                
            connection.query('insert into food (day, meal_1, meal_2, meal_3) values(?,?,?,?)', [day, meal_1, meal_2, meal_3 ], (err, result) =>{
                connection.release();

                if(!err){
                    res.send("Inserted");
                }else{
                    console.log(err);
                }
            })
        }
    })

})

//insert orders
app.post("/api/insertOrder", (req, res) => {

    db.getConnection((err, connection) =>{
        if (err) console.log(err);
        else{
            //console.log(`connected as ${connection.threadId}`);

            const { day, meal} = req.body;
                
            connection.query('insert into orders (day, meal) values(?,?)', [day, meal], (err, result) =>{
                connection.release();

                if(!err){
                    res.send("Inserted");
                }else{
                    console.log(err);
                }
            })
        }
    })

})

//get all orders
app.get("/api/getorders", (req, res) => {

    db.getConnection((err, connection) =>{
        if (err) console.log(err);
        else{
            //console.log(`connected as ${connection.threadId}`);
    
            connection.query('select * from orders', (err, result) =>{
                connection.release();

                if(!err){
                    res.send(result);
                }else{
                    console.log(err);
                }
            })
        }
    })

})

app.delete("/api/deleteorder/:day", (req, res) => {

    db.getConnection((err, connection) =>{
        if (err) console.log(err);
        else{
            //console.log(`connected as ${connection.threadId}`);
    
            connection.query('delete from orders where day =?',  [req.params.day], (err, result) =>{
                connection.release();

                if(!err){
                    res.send("Deleted");
                }else{
                    console.log(err);
                }
            })
        }
    })

})

app.put("/api/updateorder", (req, res) => {

    db.getConnection((err, connection) =>{
        if (err) console.log(err);
        else{
            //console.log(`connected as ${connection.threadId}`);

            const { id, day, meal} = req.body;
    
            connection.query('update orders set day =? , meal = ? where id = ?', [ id, day, meal], (err, result) =>{
                connection.release();

                if(!err){
                    res.send("updated");
                }else{
                    console.log(err);
                }
            })
        }
    })

})

//get all foods
app.get("/api/getfoods", (req, res) => {

    db.getConnection((err, connection) =>{
        if (err) console.log(err);
        else{
            //console.log(`connected as ${connection.threadId}`);
    
            connection.query('select * from food', (err, result) =>{
                connection.release();

                if(!err){
                    res.send(result);
                }else{
                    console.log(err);
                }
            })
        }
    })

})
//get food by id
app.post("/api/getuser", (req, res) => {


    db.getConnection((err, connection) =>{
        if (err) console.log(err);
        else{
            //console.log(`connected as ${connection.threadId}`);

            const { username, password} = req.body;
    
            connection.query('select * from users where Username = ? and Password =?', [username, password], (err, result) =>{
                connection.release();

                if(err){
                    res.send({ err: err});
                }
                if(result.length > 0){
                    res.send(result);
                }
                else{
                    res.send({message: "Wrong username and password combination"})
                }
            })
        }
    })

})




app.listen(3001, ()=>{
    console.log("running on port 3001");
})