const JobDescription = require('../models/JobDescription');

exports.showJobDescriptionForm = async(req, resp) =>{
    resp.render('jobdescription', {
        title: "Add Job Description"
    })
}

exports.submitJobDescription = async(req, resp) => {
   try {
    const { description } = req.body;

    if (!description) {
      return resp.status(400).send("Job description cannot be empty.");
    }

    const newJob = new JobDescription({ description });
    await newJob.save();

    resp.redirect("/resume/upload");
  } catch (err) {
    console.error("Error saving job description:", err);
    resp.status(500).send("Error saving job description.");
  } 
}