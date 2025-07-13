# 📄 Smart Resume Screening System

An AI-powered Node.js application to automatically screen, score, and shortlist resumes based on a job description using OpenAI embeddings, with clean UI via EJS templates and MongoDB for data persistence.

---

## 🚀 Features

- 📄 **Resume Upload** (PDF/DOCX parsing via `pdf-parse` and `mammoth`)
- 🔍 **AI-Powered Similarity Scoring** (OpenAI Embeddings + Cosine Similarity)
- 📊 **Candidate Ranking** based on job relevance
- 📬 **Email Notifications to Shortlisted Candidates** (via Nodemailer)
- 📝 **Submit and Manage Job Descriptions**
- 📑 **Clean EJS-based Frontend UI**


---

## 📚 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose
- **AI**: OpenAI API (text-embedding-ada-002)
- **Templating**: EJS
- **File Parsing**: `pdf-parse`, `mammoth`
- **File Upload**: Multer
- **Email Service**: Nodemailer

---

## 📁 Project Structure

```
/controllers        → Route handler logic (Resume & JobDescription)
/models             → Mongoose schemas (Resume & JobDescription)
/routes             → Express route definitions
/services           → AI similarity scoring, Email service utilities
/utils              → File parsing utilities (PDF & DOCX)
/views              → EJS templates for pages
/public/css         → CSS styling
/uploads            → Uploaded resumes
server.js           → Main server entrypoint
.env.example        → Environment variable template
README.md
```

---

## ⚙️ Environment Variables Setup

Create a `.env` file at the root of your project based on this template:

```
# MongoDB connection URI
MONGO_URI=mongodb+srv://<your-cluster-url>

# OpenAI API Key
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Nodemailer SMTP credentials
EMAIL_USER=your_email@gmail.com
STRIPE_SECRET_KEY  = your_stripe_secret_key

# App Port
PORT=5000
```

---

## 🖥️ Local Development Setup

1️⃣ **Clone the repository**

```bash
git clone {Github_Url}
cd resume-screening-system
```

2️⃣ **Install dependencies**

```bash
npm install
```

3️⃣ **Create your `.env` file**

Based on `.env.example`  
*(copy the file and update your keys)*

4️⃣ **Run the app**

```bash
npm start
```




MongoDB is accessible at `mongodb://localhost:27017`  
App runs at 👉 [http://localhost:5000/](http://localhost:5000/)

---



---

## 📑 API Routes Overview

| Method | Route             | Description                               |
|:--------|:--------------------|:---------------------------------|
| `GET`  | `/`                | Home page                               |
| `GET`  | `/resume/upload`          | Resume upload form                      |
| `POST` | `/resume/upload`          | Upload and AI-score a resume             |
| `GET`  | `/resume/results`         | View screening results sorted by score   |
| `GET`  | `/resume/shortlist`       | Shortlist candidates (score ≥ 75)        |
| `GET`  | `/jobdesc/jobdescription`  | Add new job description form             |
| `POST` | `/jobdesc/jobdescription`  | Save job description to database         |

---

## 🤝 Contribution Guidelines

- Follow clean, modular, well-commented code practices.
- Use meaningful commit messages.
- Submit PRs with a clear description of changes.
- Adhere to ES6+ and RESTful practices.

---


## 📣 Author

Developed by **Your Name**  
Connect via [LinkedIn](https://www.linkedin.com) | [GitHub](https://github.com/yourusername)

---




