# CodeFixo SaaS Platform

🌐 **Live App:** https://code-fixo.vercel.app/

**CodeFixo** is an AI-powered code analysis and learning platform designed to help developers master data structures and write better code.

---

## 🚀 Live Preview

Experience CodeFixo instantly without any setup:

👉 **Try it here:** https://code-fixo.vercel.app/

Test the AI code analysis, explore DSA questions, and see the dashboard in action.

---

## 🚀 Key Features

* **AI Code Analysis**: Instant feedback on complexity, bugs, and edge cases for any language.  
* **DSA Practice**: Structured modules (Arrays, Strings) with 60+ curated questions.  
* **Virtual Coach**: Get AI hints and reviews on your practice solutions.  
* **Progress Dashboard**: Track your solved questions and global ranking.  
* **Google OAuth**: Seamless one-click sign-in.  
* **Dark Mode**: Professional, developer-focused UI.  

---

## 🛠️ Tech Stack

**Frontend**: React (Vite), Tailwind CSS, Monaco Editor, Lucide React  
**Backend**: Node.js, Express, MongoDB, Mongoose  
**AI**: Hugging Face Inference API (MoonshotAI / Kimi-K2)  
**Auth**: Passport.js (Google Strategy), JWT  

---

## 🏃‍♂️ Local Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/codefixo.git
cd codefixo
2️⃣ Backend Setup
cd backend
npm install
# Create .env file with your credentials (see .env.example)
npm run data:import # Seed the database
npm start
3️⃣ Frontend Setup
cd frontend
npm install
# Create .env file
npm run dev
4️⃣ Open App
Visit http://localhost:5173 in your browser.
