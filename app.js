const bodyParser = require("body-parser");
const express = require("express");
require("dotenv").config();
const ipDataRoutes = require("./routes/ipData");
const mongoose = require("mongoose");
// const { log } = require("node:console");
const app = express();
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
	next();
});

app.use(bodyParser.json());
app.use("/ipdata", ipDataRoutes);
app.get("/", (req, res, next) => {
	return res.send("<h1>This is ip tracker backend</h1>");
});
mongoose
	.connect(process.env.MONGOOSE_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((e) => {
		app.listen(3050);
	})
	.catch((err) => {
		console.log(err);
	});
