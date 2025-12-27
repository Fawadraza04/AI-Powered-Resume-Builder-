# AI-Powered Resume Builder

A modern, AI-powered resume builder application built with React, Firebase, and OpenAI.

## Features

- 🔐 **User Authentication** - Email/Password and Google OAuth sign-in
- 📝 **Interactive Resume Builder** - Create and edit resumes with real-time preview
- 🤖 **AI-Powered Suggestions** - Get smart suggestions for professional summaries, job descriptions, and skills
- 🎨 **Multiple Templates** - Choose from Modern, Minimalist, Creative, and Professional designs
- 📄 **PDF Export** - Download your resume as a professional PDF
- ☁️ **Cloud Storage** - All resumes saved to Firebase
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🏆 **Completion Certificates** - Generate certificates for your achievements

## Tech Stack

- **Frontend**: React + Vite
- **Styling**: TailwindCSS
- **Backend/Database**: Firebase (Auth, Firestore, Storage)
- **AI Integration**: OpenAI API
- **PDF Generation**: html2canvas + jsPDF
- **Icons**: Lucide React
- **Routing**: React Router

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase account
- OpenAI API key

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd ai-powered-resume-builder
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Copy `.env.example` to `.env.local`
   - Fill in your Firebase and OpenAI credentials:

   ```
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_OPENAI_API_KEY=your_openai_api_key
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

### Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication with Email/Password and Google providers
3. Create a Firestore database
4. Enable Storage
5. Copy your Firebase config to the environment variables

### OpenAI Setup

1. Create an account at [OpenAI](https://platform.openai.com/)
2. Generate an API key
3. Add the API key to your environment variables

## Project Structure

```
src/
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.jsx
│   ├── layout/
│   │   ├── Footer.jsx
│   │   ├── Layout.jsx
│   │   └── Navbar.jsx
│   └── resume/
│       ├── EducationForm.jsx
│       ├── ExperienceForm.jsx
│       ├── PersonalInfoForm.jsx
│       ├── ProjectsForm.jsx
│       ├── ResumePreview.jsx
│       ├── SkillsForm.jsx
│       └── templates/
│           ├── CreativeTemplate.jsx
│           ├── MinimalistTemplate.jsx
│           ├── ModernTemplate.jsx
│           └── ProfessionalTemplate.jsx
├── config/
│   ├── firebase.js
│   └── openai.js
├── contexts/
│   ├── AuthContext.jsx
│   └── ResumeContext.jsx
├── pages/
│   ├── Builder.jsx
│   ├── Dashboard.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   └── Templates.jsx
├── App.jsx
├── index.css
└── main.jsx
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Resume Sections

1. **Personal Information** - Name, email, phone, location, LinkedIn, website, summary
2. **Education** - Schools, degrees, dates, GPA
3. **Work Experience** - Companies, positions, dates, descriptions
4. **Skills** - Technical and soft skills
5. **Projects** - Personal or professional projects with descriptions

## AI Features

- **Professional Summary Generator** - Creates compelling summaries based on your info
- **Job Description Improver** - Enhances bullet points with action verbs and metrics
- **Skill Suggestions** - Recommends relevant skills based on job title
- **Project Description Enhancer** - Improves project descriptions with impact statements

## Templates

1. **Modern** - Clean design with colored sidebar
2. **Minimalist** - Simple, elegant serif typography
3. **Creative** - Bold gradients for creative roles
4. **Professional** - Traditional corporate layout

## Deployment

### Vercel

```bash
npm run build
vercel deploy
```

### Firebase Hosting

```bash
npm run build
firebase deploy
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - feel free to use this project for personal or commercial purposes.
