const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const employee = require("./models/employee")
const { employeesmodel } = require("./models/employee")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://anjali2003:anjali2003@cluster0.wy6js.mongodb.net/employeenewdb?retryWrites=true&w=majority&appName=Cluster0")

app.post("/", (req, res) => {
    let input = req.body
    console.log(input)
    let employee = new employeesmodel(input)
    employee.save()
    res.json({ "status": "success" })
})
app.post("/search", (req, res) => {
    let input = req.body
    employeesmodel.find(input).then(
        (data) => {
            res.json(data)
        }
    ).catch(
        (error) => {
            res.json(error)
        }
    )
})
app.post("/delete", (req, res) => {
    let input = req.body
    employeesmodel.findByIdAndDelete(input._id).then(
        (response) => {
            console.log("DELETE")
            res.json({ "status": "success" })
        }
    ).catch(
        (error)=> {
        res.json({"status": "error"})
    }
)
})

app.listen(8081, () => {
    console.log("server started")
})