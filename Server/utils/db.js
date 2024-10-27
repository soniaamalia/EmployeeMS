import mysql from "mysql"

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_employee"
})

conn.connect(function(err){
    if(err){
        console.log("Connection Error")
    }else{
        console.log("Connected")
    }
})

export default conn;