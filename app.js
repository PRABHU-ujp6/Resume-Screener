const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const resumeRoutes = require('./routes/resumeRoutes')
const jobRoutes = require('./routes/jobRoutes')

dotenv.config();



const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.use("/public", express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//routes...

app.get("/", (req, res) => {
  res.render("home", { title: "Home" });
});

app.use("/resume", resumeRoutes);
app.use('/jobdesc', jobRoutes)


app.use((req, res) => {
  res.status(404).render("404", { title: "Page Not Found" });
});


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Database Connection Established.."))
    .catch(err => console.log(err));

let port = process.env.PORT;
app.listen(port, () => {
      console.log(`Server started on http://localhost:${port}`);
})
