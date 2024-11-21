# Dicoding Generative AI Web Application

## Executive Summary

Indonesia’s educational technology sector faces significant challenges in leveraging Generative AI, particularly with Large Language Models (LLMs) like Google's Gemini for Bahasa Indonesia on Google Cloud. This project addresses these challenges by building a Generative AI system tailored for Dicoding, enabling automated, curriculum-aligned content generation and improving contextual accuracy in forums and chats. 

Our solution integrates Gemini LLM with a MERN (MongoDB, Express, React, Node.js) web application, streamlining content creation, enhancing accessibility, and boosting learner engagement. By automating manual processes, this system establishes a scalable foundation for advancing AI-driven education in Indonesia.

---

## Features

- **Content Generation**: Automates the creation of curriculum-aligned content, reducing manual workload.
- **Improved Bahasa Indonesia Accuracy**: Fine-tuned responses for forums and chat support.
- **Dynamic Assessments**: Generates quizzes and assessments with varying complexity.
- **Seamless Integration**: Built on MERN architecture with Gemini LLM integration for Google Cloud.

---

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **AI Model**: Google Cloud Gemini LLM
- **Hosting**: Google Cloud Platform (GCP)

---

## Installation

### Prerequisites

1. Node.js and npm installed on your machine.
2. MongoDB instance running locally or on a cloud server.
3. Google account for Gemini API.

### Setup Instructions

#### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

#### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```

---

## Environment Variables

### Frontend `.env` Example
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_IMAGE_KIT_ENDPOINT=your_imagekit_endpoint
VITE_IMAGE_KIT_PUBLIC_KEY=your_imagekit_public_key
VITE_GEMINI_PUBLIC_KEY=your_gemini_public_key
VITE_API_URL=http://localhost:3000
```

### Backend `.env` Example
```env
IMAGE_KIT_ENDPOINT=your_imagekit_endpoint
IMAGE_KIT_PUBLIC_KEY=your_imagekit_public_key
IMAGE_KIT_PRIVATE_KEY=your_imagekit_private_key
CLIENT_URL=http://localhost:5173
MONGO=your_mongodb_connection_string
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

---

## Usage

### Generating Content

1. Navigate to the web application.
2. Input prompts in Bahasa Indonesia for curriculum-aligned content or assessments.
3. View the generated output, fine-tuned for Dicoding's needs.

### Chat and Forum Support

- Use the chat/forum feature to ask questions. The system provides contextually accurate responses in Bahasa Indonesia.

---

## How It Works

1. **Frontend**: React handles user input and communicates with the backend via API calls.
2. **Backend**: Node.js processes requests, interacts with Gemini API, and fetches data from MongoDB.
3. **Gemini Integration**:
   - Prompts sent to Google Cloud's Gemini API.
   - Responses generated and returned to the user.

---

## Deployment

1. Deploy the frontend using services like Vercel or Netlify.
2. Deploy the backend on a cloud hosting platform (e.g., Google Cloud or Heroku).
3. Ensure `.env` files are securely managed and credentials are not exposed.

---

## Contribution Guidelines

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature description"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## Acknowledgements

- [Google Cloud Gemini API](https://cloud.google.com/gemini)
- [Dicoding](https://www.dicoding.com)
- [MERN Stack](https://www.mongodb.com/mern-stack)
