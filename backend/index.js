if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const formData = require('express-form-data');
const expressError = require("./utils/ExpressError");
const bodyParser = require('body-parser');


const DB_URL = process.env.DB_URL;
mongoose.connect(DB_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database connected")
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(formData.parse());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}));
 


const userRoute = require("./routes/userRoute");
app.use("/user", userRoute);
const adminRoute = require("./routes/adminRoute");
app.use("/admin", adminRoute);






app.all("*", (req, res, next) => {
    next(new expressError('page not found', 404));
})


app.use((err, req, res, next) => {
    const { statusCode = 500} = err;
    if(!err.message) err.message = "Something went wrong"
    console.log(err);
    res.status(statusCode).json(err.message);
})



const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server started on port ${port}`);
})