const Job = require("../model/Job");
const JobUtils = require("../utils/JobUtils");
const Profile = require("../model/Profile");

module.exports = {
  create(req, res) {
    const jobs = Job.get();
    const lastId = jobs[jobs.length - 1]?.id || 0;

    //req.body = {name: "adsadasda", 'daily-hours': "44", 'total-hours': 44 }
    jobs.push({
      id: lastId + 1, // id de uma nova "vaga" no array
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      created_at: Date.now(), // atribuindo data de hoje
    });

    return res.redirect("/");
  },

  show(req, res) {
    const jobs = Job.get();
    const profile = Profile.get();
    const JobId = req.params.id;

    const job = jobs.find((job) => Number(job.id) === Number(JobId));

    if (!job) {
      res.send("Job not found!");
    }

    job.budget = JobUtils.calculateBudget(job, profile["value-per-hour"]);

    return res.render("job-edit", { job });
  },

  update(req, res) {
    const jobs = Job.get();
    const jobId = req.params.id;

    const job = jobs.find((job) => Number(job.id) === Number(jobId));

    if (!job) {
      res.send("Job not found!");
    }

    const updatedJob = {
      ...job,
      name: req.body.name,
      "total-hours": req.body["total-hours"],
      "daily-hours": req.body["daily-hours"],
    };

    const newJobs = jobs.map((job) => {
      if (Number(job.id) === Number(jobId)) {
        job = updatedJob;
      }

      return job;
    });

    Job.update(newJobs);

    res.redirect("/job/" + jobId);
  },

  delete(req, res) {
    // const jobs = Job.get();
    const jobId = req.params.id;

    Job.delete(jobId);

    return res.redirect("/");
  },
};
