/_ Copilot Instructions for AI-Powered Resume Builder _/

## Project Overview

This is an AI-Powered Resume Builder application built with React, Vite, TailwindCSS, Firebase, and OpenAI.

## Tech Stack

- Frontend: React with Vite
- Styling: TailwindCSS v4
- Authentication: Firebase Auth (Email/Password + Google OAuth)
- Database: Firebase Firestore
- Storage: Firebase Storage
- AI: OpenAI API for content suggestions
- PDF Export: html2canvas + jsPDF
- Routing: React Router v6
- Icons: Lucide React

## Project Structure

- `/src/components` - Reusable UI components
- `/src/contexts` - React Context providers (Auth, Resume)
- `/src/pages` - Page components
- `/src/config` - Firebase and OpenAI configuration

## Key Features

1. User authentication with Firebase
2. Resume builder with sections: Personal Info, Education, Experience, Skills, Projects
3. AI-powered suggestions for professional summaries, job descriptions, skills
4. Multiple resume templates (Modern, Minimalist, Creative, Professional)
5. Real-time preview
6. PDF export functionality
7. User dashboard with resume management
8. Completion certificates

## Environment Variables Required

- VITE_FIREBASE_API_KEY
- VITE_FIREBASE_AUTH_DOMAIN
- VITE_FIREBASE_PROJECT_ID
- VITE_FIREBASE_STORAGE_BUCKET
- VITE_FIREBASE_MESSAGING_SENDER_ID
- VITE_FIREBASE_APP_ID
- VITE_OPENAI_API_KEY

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
