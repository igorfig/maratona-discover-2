const Job = require("../model/Job");
const JobUtils = require("../utils/JobUtils");
const Profile = require("../model/Profile");

module.exports = {
  async create(req, res) {
    //req.body = {name: "adsadasda", 'daily-hours': "44", 'total-hours': 44 }
    await Job.create({
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      created_at: Date.now(), // atribuindo data de hoje
    })

    return res.redirect("/");
  },

  async show(req, res) {
    const jobs = await Job.get();
    const profile = await Profile.get();
    const JobId = req.params.id;

    const job = jobs.find((job) => Number(job.id) === Number(JobId));

    if (!job) {
      res.send("Job not found!");
    }

    job.budget = JobUtils.calculateBudget(job, profile["value-per-hour"]);

    return res.render("job-edit", { job });
  },

  async update(req, res) {
    const jobId = req.params.id;

    const updatedJob = {
      name: req.body.name,
      "total-hours": req.body["total-hours"],
      "daily-hours": req.body["daily-hours"],
    };

    await Job.update(updatedJob, jobId);

    res.redirect("/job/" + jobId);
  },

  delete(req, res) {
    // const jobs = Job.get();
    const jobId = req.params.id;

    Job.delete(jobId);

    return res.redirect("/");
  },
};
