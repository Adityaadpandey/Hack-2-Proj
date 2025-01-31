# 🏥 Pulse-AI: AI-Powered Healthcare Chatbot

<!--[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)-->
[![Next.js](https://img.shields.io/badge/Next.js-15.1.6-blue)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4.1-blue)](https://tailwindcss.com/)
<!--[![AI-Powered](https://img.shields.io/badge/AI-Powered-🚀-blue)](https://ai.google.dev/)-->

## 🌟 Overview

**Pulse-AI** is an AI-powered healthcare chatbot designed to provide **instant** and **reliable** medical assistance for minor health concerns. Our goal is to bridge the gap between patients and professional medical guidance by offering preliminary advice using cutting-edge AI technology.


## 📚 Why Pulse-AI Stands Outs
✅ 📞 **24/7 Online AI Assistance** – Get instant health-related responses.  
✅ 🏥 **Basic Medical Guidance** – Provides preliminary advice for minor health concerns.  
✅ 🛡️ **Privacy First** – No sensitive personal data is stored.  
✅ **AI-Driven Healthcare Access** - Provides quick and accurate health guidance using AI models.  
✅ **Secure & Private** - Implements secure authentication to ensure data safety.  
✅ **Real-Time Assistance** - Offers immediate AI-based emergency help.  
✅ **Advanced Image Processing** - Uses OCR and OpenCV to interpret medical documents.  
✅ **Scalable & Modern Tech Stack** - Built with Next.js, TypeScript, Prisma, and Tailwind CSS for high performance and scalability.   

---

## 🛠️ **Tech Stack**

| Technology  | Description |
|-------------|------------|
| **Next.js** | Fast and scalable React framework for server-side rendering. |
| **React 19** | Latest React version for a seamless front-end experience. |
| **Tailwind CSS** | Utility-first styling for modern UI design. |
| **Spline** | Used for 3D components |
| **Clerk** | Used for authentication |
| **Prisma** | ORM for managing the database efficiently. |
| **Google Generative AI** | AI-powered responses for healthcare queries. |
| **Multer** | Middleware for handling file uploads. |
| **Framer Motion** | Smooth animations for an interactive UI. |

---

## 🚀 **Getting Started**

### 📥 **Installation**
To set up the project locally, follow these steps:

```sh
# Clone the repository
git clone https://github.com/Trex-roars/Hack-2-Proj.git

cd Hack-2-Proj

# Install dependencies
bun install

# Set up environment variables
cp .env.local .env
```

## 🛠 Configuration
Edit the .env file with the necessary API keys:

```sh
NEXT_PUBLIC_CLERK_FRONTEND_API=<your-clerk-api-key>
GOOGLE_AI_API_KEY=<your-google-ai-api-key>
DATABASE_URL=<your-database-url>
```
### 🔄 Run the Development Server
```sh
bun run dev
```
Visit `http://localhost:3000` to see the chatbot in action! 🚀

## ⚡ Features
### 🔹 Real-time Chatbot

- AI-driven chatbot that provides health advice and answers medical queries.

- Integrates generative AI models for intelligent responses.

### 🔹 Authentication

- Secure user authentication with Clerk.js.

- Ensures privacy and data protection.

### 🔹 Real-time Emergency AI Call Assistant

- 24/7 AI-powered emergency consultation service.

- Provides immediate responses for urgent medical concerns.

### 🔹 OCR-based Health Suggestions

- Uses Optical Character Recognition (OCR) to analyze medical prescriptions.

- Suggests relevant healthcare recommendations.

### 🔹 OpenCV-powered AI Vision
- Recognizes medical documents and symptoms through image analysis.

- Enhances accuracy in health diagnostics.


## 🏗️ Project Structure
```bash
📦 healthcare-chatbot
├── 📂 .next
├── 📂 prisma
├── 📂 public
├── 📂 src
│   ├── 📂 app
│   │   ├── 📂 (auth)
│   │   ├── 📂 api
│   │   ├── 📂 chat
│   │   ├── 📂 doctors
│   │   ├── 📂 Form
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   ├── 📂 components
│   │   ├── 📂 Floating-Navbar
│   │   ├── 📂 form-builder
│   │   ├── 📂 Loop
│   │   ├── 📂 Main
│   │   ├── 📂 ui
│   │   ├── cursor.tsx
│   ├── 📂 lib
│   ├── 📂 prompts
├── middleware.ts
├── .env.local
├── .gitignore
├── bun.lock
├── components.json
├── eslint.config.mjs
```


<!--## 📬 Contact & Support
📧 Email: support@trexhealth.com  
🌐 Website: T-Rex Healthcare  
🐦 Twitter: @trex_health   
📘 LinkedIn: T-Rex AI Health  -->
  
**🚀 Pulse-AI: Your AI-Powered Health Assistant! 🏥💙**
