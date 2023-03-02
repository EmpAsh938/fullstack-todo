require("dotenv").config();

const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const mongoose = require("mongoose");

const taskRouter = require("./backend/route/taskRoute");
const subtaskRouter = require("./backend/route/subtaskRoute");
const errorHandler = require("./backend/middleware/error");
const notFound = require("./backend/route/notFound");

const app = express();
const PORT = process.env.PORT || 9001;

if(process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));    
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/task",taskRouter);
app.use("/subtask",subtaskRouter);
app.use("*", notFound);

mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
    })
}).catch(err => {
    throw Error(err);
})

app.use(errorHandler);

