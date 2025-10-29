# AI-Powered Hiring System

### Smart Resume Screening & Job Matching Portal

A comprehensive web-based platform leveraging Artificial Intelligence and Machine Learning to revolutionize the recruitment process through automated resume screening and intelligent job-candidate matching.

This project is the Final Year Project for the BS in Computer Science (2022-2026) at the Federal Urdu University of Arts, Science & Technology, Islamabad.

-----

## 🚀 Key Features

This application is built with three distinct user roles, each with a dedicated workflow.

### 👨‍💻 Job Seeker Features

  * **Authentication:** Secure registration and JWT-based login.
  * **Job Search:** Public page to find and view all "active" job postings.
  * **Job Details:** View detailed information for a single job.
  * **Resume Management:** Upload PDF/DOCX resumes, which are stored securely on Cloudinary.
  * **AI Parsing:** Manually trigger AI parsing for uploaded resumes to extract skills.
  * **Application:** Apply for jobs using a parsed resume.
  * **Dashboard:** Protected dashboard to view the status of all submitted applications.

### 👩‍💼 Recruiter Features

  * **Post Jobs:** A protected form to create new job postings, which are submitted for admin approval.
  * **Dashboard:** Protected dashboard listing all jobs posted by the recruiter.
  * **View Applicants:** View a list of all candidates who applied for a specific job, sorted by their AI-generated match score.
  * **Manage Applicants:** Update an applicant's status (e.g., "Shortlisted", "Rejected") in real-time.

### ⚙️ Admin Features

  * **Dashboard:** A protected admin-only dashboard.
  * **Job Approval:** View a list of all "pending" jobs awaiting approval.
  * **Moderate Jobs:** Approve or reject job postings. Approved jobs become publicly visible.

### 🧠 AI/ML Features

  * **Resume Parsing:** A separate Python/Flask microservice that downloads a resume from a URL and uses `pdfminer.six` to extract its raw text.
  * **Skill Extraction:** Scans the raw resume text for a predefined list of technical skills (e.g., "React", "Python", "MongoDB").
  * **Intelligent Matching:** Automatically calculates a "Match Score" (based on 40% skill matching) the instant a job seeker applies for a job.

-----

## 🛠️ Technology Stack

This project uses a decoupled microservice architecture.

### 🖥️ Frontend (Client-Side)

  * **React.js (v18+)**
  * **Vite:** Fast frontend tooling.
  * **React Router:** For all client-side routing.
  * **Axios:** For making all API requests.
  * **React Context:** For global state management (Authentication).

### ☁️ Backend (Server-Side)

  * **Node.js**
  * **Express.js**
  * **MongoDB:** NoSQL database for all application data.
  * **Mongoose:** Object Data Modeling (ODM) for MongoDB.
  * **JSON Web Tokens (JWT):** For secure user authentication.
  * **bcrypt.js:** For password hashing.
  * **CORS:** To handle cross-origin requests.
  * **Cloudinary:** For cloud-based storage of resume files.

### 🤖 AI/ML Service

  * **Python 3**
  * **Flask:** A micro-framework to serve the AI model as an API.
  * **pdfminer.six:** For extracting text from PDF documents.

-----

## 📁 Project Structure
ai-hiring-system/
├── 📁 ai-ml/ # The Python/Flask AI microservice
│ ├── 📁 resume_parser/
│ ├── main.py # AI API server
│ └── requirements.txt
├── 📁 backend/ # The Node.js/Express.js backend API
│ ├── 📁 src/
│ │ ├── controllers/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── middleware/
│ │ └── services/
│ ├── server.js # Main backend server
│ └── package.json
├── 📁 frontend/ # The React.js (Vite) frontend
│ ├── 📁 src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── services/
│ │ ├── context/
│ │ └── hooks/
│ ├── index.html
│ └── package.json
└── README.md


-----

## 🔌 Setup and Installation

You must run three separate servers for the application to be fully functional.

### Prerequisites

  * [Node.js](https://nodejs.org/) (v18+)
  * [Python](https://www.python.org/) (v3.8+)
  * [MongoDB](https://www.mongodb.com/try/download/community) (running locally on port `27017`)
  * [Cloudinary](https://cloudinary.com/) account (for API key, secret, and cloud name)

### 1. Backend Server (Port 5000)

```bash
# 1. Navigate to the backend folder
cd backend

# 2. Install dependencies
npm install

# 3. Create a .env file
touch .env

# 4. Add your secrets to the .env file
MONGO_URI="mongodb://127.0.0.1:27017/aiHiringSystem"
JWT_SECRET="your_jwt_secret"
JWT_EXPIRES_IN="30d"
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# 5. Run the server
node server.js

# 1. Navigate to the AI folder
cd ai-ml

# 2. Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # On macOS/Linux
# venv\Scripts\activate   # On Windows

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run the AI server
python main.py

# 1. Navigate to the frontend folder
cd frontend

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev

👥 Team
Developed By:
Muhammad Usama
Roll No: BSCS-2022-37326
Federal Urdu University of Arts, Science & Technology, Islamabad

Syed Qamar Abbas
Roll No: BSCS-2022-37392
Federal Urdu University of Arts, Science & Technology, Islamabad

Supervised By:
Ma'am Sabeen
Project Supervisor
Department of Computer Science

Sir Naeem Malik
Project Coordinator
Department of Computer Science

Academic Session:
2022-2026
Department of Computer Science
Federal Urdu University of Arts, Science & Technology, Islamabad

📄 License
This project is developed for academic purposes as part of the Final Year Project requirement for BS Computer Science at Federal Urdu University of Arts, Science & Technology, Islamabad.

🙏 Acknowledgments
We would like to express our sincere gratitude to our supervisor Ma'am Sabeen and project coordinator Sir Naeem Malik for their continuous guidance, support, and valuable feedback throughout the development of this project.

We also thank the Department of Computer Science, Federal Urdu University of Arts, Science & Technology, Islamabad for providing the resources and environment to complete this project successfully.



## 🎯 Key Changes Made:

1. **Added proper team section** with both your names and roll numbers
2. **Enhanced the supervisor section** with proper titles and department
3. **Added academic session details** 
4. **Included an acknowledgments section** to show gratitude to your supervisors
5. **Removed citation markers** for cleaner reading
6. **Added a license/acknowledgments section** at the bottom

## 📋 Final Checklist:

- [x] **Muhammad Usama** - Name and roll number included
- [x] **Syed Qamar Abbas** - Name and roll number included  
- [x] **Ma'am Sabeen** - Properly credited as supervisor
- [x] **Sir Naeem Malik** - Properly credited as coordinator
- [x] **University details** - Complete and accurate
- [x] **Academic session** - 2022-2026 included

Your README.md is now complete and ready for submission! It properly credits all team members and supervisors while maintaining a professional appearance. 🚀