# AutoCV - AI-Powered Resume Builder 🚀

[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-06B6D4?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.8.2-2D3748?logo=prisma&logoColor=white)](https://prisma.io/)

> Build professional resumes with AI-powered analysis and optimization. Land your dream job with confidence.

## 🌟 Features

- **🤖 AI-Powered Analysis**: Get intelligent feedback on your resume content, formatting, and keywords
- **🎨 Professional Templates**: Choose from multiple ATS-friendly templates designed by professionals
- **📊 Real-time Scoring**: See your resume score improve as you make AI-suggested improvements
- **🎯 Job-Specific Optimization**: Tailor your resume for specific job postings with keyword optimization
- **📄 Multiple Export Formats**: Download in PDF, Word, or plain text formats
- **🔒 Privacy Protected**: Your data is encrypted and secure
- **🌙 Dark Mode**: Toggle between light and dark themes
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 Live Demo

[**Try AutoCV Now**](https://your-deployment-url.com) <!-- Replace with your actual deployment URL -->

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk
- **AI Integration**: Google Generative AI (Gemini)
- **PDF Generation**: @react-pdf/renderer
- **File Upload**: Vercel Blob
- **Payments**: Razorpay
- **State Management**: Zustand

## 🏗️ Project Structure

```
AutoCV-AI-Resume-Builder/
├── prisma/                  # Database schema
├── public/                  # Static assets
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── (auth)/         # Authentication pages
│   │   ├── (main)/         # Main application pages
│   │   ├── (public)/       # Public landing pages
│   │   └── api/            # API routes
│   ├── components/         # React components
│   │   ├── custom/         # Custom components
│   │   └── ui/             # shadcn/ui components
│   ├── lib/                # Utility functions
│   └── hooks/              # Custom React hooks
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sudip-2/AutoCV-AI-Resume-Builder.git
   cd AutoCV-AI-Resume-Builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/autocv"
   
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
   CLERK_SECRET_KEY="your_clerk_secret_key"
   
   # Google AI
   GOOGLE_AI_API_KEY="your_google_ai_api_key"
   
   # Vercel Blob (for file uploads)
   BLOB_READ_WRITE_TOKEN="your_blob_token"
   
   # Razorpay (for payments)
   RAZORPAY_KEY_ID="your_razorpay_key_id"
   RAZORPAY_SECRET="your_razorpay_secret"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 Usage

### Creating a Resume

1. **Sign up/Login** using Clerk authentication
2. **Create a new resume** from the dashboard
3. **Fill in your details** using the step-by-step editor
4. **Choose a template** from the available professional designs
5. **Get AI feedback** on your resume content and formatting
6. **Download** your resume in PDF, Word, or text format

### AI Analysis

The AI analyzes your resume for:
- Content quality and relevance
- Keyword optimization
- ATS compatibility
- Professional formatting
- Industry-specific recommendations

## 🔧 API Endpoints

### Resume Operations
- `GET /api/resumes` - Get user's resumes
- `POST /api/resumes` - Create new resume
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume

### AI Analysis
- `POST /api/analyze` - Analyze resume content

### Payments
- `POST /api/razorpay-webhook` - Handle payment webhooks

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Sudip Paul**
- GitHub: [@Sudip-2](https://github.com/Sudip-2)
- Email: p452570@gmail.com

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Clerk](https://clerk.com/) for authentication
- [Prisma](https://prisma.io/) for database management
- [Google AI](https://ai.google/) for AI capabilities

## 📊 Support

If you like this project, please consider giving it a ⭐ on GitHub!

---

<p align="center">Built with ❤️ by Sudip Paul</p>
