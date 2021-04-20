const express = require("express");
const routes = express.Router();
const ProfileController = require("./Controllers/ProfileController");
const JobController = require("./Controllers/JobController");
const DashboardController = require("./Controllers/DashboardController");

routes.get("/", DashboardController.index);
routes.get("/job", (req, res) => res.render("job"));
routes.post("/job", JobController.create);
routes.get("/job/:id", JobController.show);
routes.post("/job/:id", JobController.update);
routes.post("/job/delete/:id", JobController.delete);
routes.get("/profile", ProfileController.index);
routes.post("/profile", ProfileController.update);

module.exports = routes;
