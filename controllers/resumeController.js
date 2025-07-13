const Resume = require("../models/Resume");
const { parseResume } = require("../utils/fileParser");
const JobDescription = require('../models/JobDescription');
const { computeSimilarity } = require('../services/aiService');
const { sendShortlistEmail } = require('../services/emailService')

exports.showUploadForm = (req, resp) => {
  resp.render("upload", {
    title: "Upload Resume ",
  });
};

exports.handleUpload = async (req, resp) => {
  try {
    const file = req.file;

    if (!file) return resp.status(400).send("No file uploaded");

    const text = await parseResume(file.path)

    console.log(text)

    const jobDescriptionEntry = await JobDescription.findOne().sort({ createdAt: -1 });
    console.log("jhv",jobDescriptionEntry)
    if (!jobDescriptionEntry) {
      return resp.status(400).send("No job description available. Please submit one first.");
    }

    const jdText = jobDescriptionEntry.description;
    const score = await computeSimilarity(text, jdText);

    const name = "Unknown Candidate";
    const email = "unknown@example.com";

    const newResume = new Resume({
      name,
      email,
      text,
      score
    });

    await newResume.save();

    resp.redirect("/resume/results");

  } catch (error) {
    console.error("Error uploading resume:", error);
    resp.status(500).send("Error uploading and scoring resume.");
  }
};


exports.showResults = async (req, resp) => {
  try {
    const resumes = await Resume.find().sort({ score: -1 });
    resp.render("results", { title: "Screening Results", resumes });
  } catch (err) {
    console.error("Error fetching results:", err);
    resp.status(500).send("Error fetching screening results.");
  }
};



exports.shortlistAndNotify = async (req, resp) => {
  try {
    const threshold = 75;
    const shortlisted = await Resume.find({ score: { $gte: threshold } });

    if (shortlisted.length === 0) {
      return resp.render("shortlisted", {
        title: "Shortlisted Candidates",
        shortlisted: [],
        message: "No candidates shortlisted."
      });
    }

    // Send emails to shortlisted candidates
    for (const candidate of shortlisted) {
      await sendShortlistEmail(candidate.email, candidate.name);
    }

    resp.render("shortlisted", {
      title: "Shortlisted Candidates",
      shortlisted,
      message: null
    });
  } catch (err) {
    console.error("Error shortlisting candidates:", err);
    resp.status(500).send("Error during shortlisting process.");
  }
};