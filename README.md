# Femacare CMS Platform

A comprehensive, full-stack CMS platform for women's health and fertility services. This application includes both a public-facing website and a powerful admin dashboard for content management.

## 🌟 Features

### Public Website
- **Homepage**: Hero section with motion graphics background, journey selector cards, and package highlights
- **Solutions**: Browse and purchase fertility & hormonal health packages
- **Experts Network**: Find in-house experts and partnered clinics
- **Learning Hub (Healthopedia)**: Evidence-based articles on women's health
- **Success Stories**: Real patient journeys and testimonials
- **Science & Research**: Research timeline and case studies
- **Booking System**: Multi-step consultation booking with file uploads
- **Contact Form**: Get in touch with the team

### Admin CMS
- **Dashboard**: Analytics overview with charts and key metrics
- **Solutions Management**: Create and edit health packages with full details
- **Leads/CRM**: Manage consultation requests and contact form submissions with CSV export
- **Experts Management**: Add and edit expert profiles
- **Articles (Blog)**: Create and manage educational content with relational authors
- **Success Stories**: Manage patient testimonials and case studies
- **Site Settings**: Control announcement bar and global content
- **Team Access**: Role-based access control (Super Admin, Content Editor, Sales/Support)

### Role-Based Access Control
- **Super Admin**: Full access to all modules
- **Content Editor**: Manage articles and success stories
- **Sales/Support**: Access to leads, view-only access to most modules

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Femacare
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📦 Tech Stack

- **React 18**: Modern React with hooks
- **Lucide React**: Beautiful icon library
- **Recharts**: Data visualization for admin dashboard
- **Three.js**: 3D motion graphics background
- **Tailwind CSS**: Utility-first CSS (via inline classes)

## 🎨 Key Components

### Website Components
- `HomePage`: Landing page with hero and feature sections
- `SolutionsOverviewPage`: Browse all health packages
- `SolutionDetailPage`: Detailed view with testimonials and FAQs
- `MultiStepConsultation`: 3-step booking form
- `CarePartnerNetwork`: Filterable expert directory
- `LearningHubPage`: Searchable article library
- `SuccessStoriesPage`: Patient journey timelines
- `CustomerLoginPage`: Customer authentication (demo)

### Admin Components
- `AdminDashboard`: Analytics and metrics overview
- `AdminSolutionEditor`: Full WYSIWYG-style editor for packages
- `AdminLeadsDashboard`: CRM with status management
- `AdminArticleEditor`: Blog post creation with relational authors
- `AdminTeamPanel`: Team member and permission management

## 🔐 Demo Accounts

### Admin Login
- **Super Admin**: Access to all modules
- **Content Editor**: Articles and stories only
- **Sales/Support**: Limited access (no team/settings)

### Customer Login (Demo)
- Email: `customer@example.com`
- Password: `password`

## 🗂️ Project Structure

```
Femacare/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── App.js          # Main application component
│   ├── index.js        # Entry point
│   └── index.css       # Global styles
├── package.json
└── README.md
```

## 🎯 Mock API Functions

The application uses mock API functions to simulate backend operations:
- `mockGetSolutions`: Fetch solutions list
- `mockGetExperts`: Fetch experts with filters
- `mockSubmitConsultation`: Submit booking form
- `mockUpdateSolution`: Create/update solutions
- `mockUpdateLeadStatus`: Update CRM lead status
- `mockNotificationService`: Simulate email/SMS/WhatsApp notifications

## 🚧 Future Enhancements

- [ ] Real backend API integration
- [ ] User authentication (JWT/OAuth)
- [ ] Payment gateway integration
- [ ] Email automation
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Mobile app version

## 📄 License

This project is proprietary software developed for Femacare.

## 👥 Contributors

Built with ❤️ by the Femacare team

## 📞 Support

For support, email support@femacare.com or visit our Contact page.

---

**Note**: This is a demo application with mock data. For production use, integrate with a real backend API and database.
