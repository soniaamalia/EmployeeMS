import express from "express"
import conn from "../utils/db.js"
import jwt from "jsonwebtoken"
import bcrypt, { hash } from "bcrypt"
import multer from "multer"
import path from "path"

const router = express.Router()

router.post("/adminlogin", (req, res) => {
    const sql = "SELECT * from admin where email = ? and password = ?"
    conn.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query Error" });
        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign(
                { role: "admin", email: email, id: result[0].id }, 
                "jwt_secret_key", 
                { expiresIn: "1d" }
            );
            res.cookie("token", token)
            return res.json({ loginStatus: true });
        } else {
            return res.json({ loginStatus: false, Error: "Wrong Email or Password" });
        }
    });
});

router.get("/category", (req, res) => {
    const sql = "SELECT * from category";
    conn.query(sql, (err, result) => {
        if (err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.post("/addCategory", (req, res) => {
    const sql = "INSERT INTO category (`name`) VALUES (?)"
    conn.query(sql, [req.body.category], (err, result) => {
        if (err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true})
    })
})

//Upload Image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }  
})
const upload = multer({
    storage: storage
})
//=====

router.post("/addEmployee", upload.single('image'), (req, res) => {
    const sql = "INSERT INTO employee \
                (`name`, `email`, `password`, `salary`, `address`, `image`, `category_id`) \
                VALUE (?)";
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return res.json({Status: false, Error: "Query Error"})
        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.salary,
            req.body.address,
            req.file.filename,
            req.body.category_id
        ]
        conn.query(sql, [values], (err, result) => {
            if (err) return res.json({Status: false, Error: err})
            return res.json({Status: true})
        })
    })
})

router.get("/employee", (req, res) => {
    const sql = "SELECT * from employee";
    conn.query(sql, (err, result) => {
        if (err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.get("/employee/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * from employee WHERE id = ?";
    conn.query(sql,[id], (err, result) => {
        if (err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.put("/editEmployee/:id", (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE employee set name = ?, email = ?, salary = ?, 
                address = ?, category_id = ? WHERE id = ?`;
    const values = [
        req.body.name,
        req.body.email,
        req.body.salary,
        req.body.address,
        req.body.category_id
    ]
    conn.query(sql,[...values, id], (err, result) => {
        if (err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.delete("/deleteEmployee/:id", (req, res) => {
    const id = req.params.id;
    const sql = `DELETE from employee WHERE id = ?`;
    conn.query(sql,[id], (err, result) => {
        if (err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get("/adminSum", (req, res) => {
    const sql = `SELECT count(id) as admin from admin`;
    conn.query(sql, (err, result) => {
        if (err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get("/employeeSum", (req, res) => {
    const sql = `SELECT count(id) as employee from employee`;
    conn.query(sql, (err, result) => {
        if (err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get("/salarySum", (req, res) => {
    const sql = `SELECT sum(salary) as salary from employee`;
    conn.query(sql, (err, result) => {
        if (err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get("/admRecords", (req, res) => {
    const sql = `SELECT * from admin`;
    conn.query(sql, (err, result) => {
        if (err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get("/logout", (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
})

export { router as adminRouter }