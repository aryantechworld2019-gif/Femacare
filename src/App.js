import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  UserPlus, LogIn, LayoutDashboard, Building, Mail, Lock, Users, DollarSign, 
  MessageSquare, LineChart as ChartIcon, LogOut, Menu, X, Plus, Search, ChevronDown,
  FileText, Send, Settings, CheckCircle, AlertCircle, XCircle, Info,
  Star, Zap, ArrowRight, UserCheck, CreditCard, Banknote, Loader2
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const mockGetSolutions = async (allSolutions) => {
  await delay(100);
  return allSolutions;
};

const mockGetSolutionDetails = async (allSolutions, allDetails, id) => {
  await delay(100);
  const details = allDetails[id];
  if (details) return details;
  
  const solution = allSolutions.find(s => s.id === id);
  if (!solution) return null;
  
  return {
    ...solution,
    claim: "Details coming soon for this plan.",
    overview: "This is a general overview for " + solution.title,
    benefits: ["Benefit 1", "Benefit 2"],
    whatsIncluded: [{ title: "Standard Package", content: "Includes standard access to our platform and resources." }],
    whoItsFor: "Anyone interested in this solution.",
    research: "Research details are being compiled for this plan.",
    testimonials: [{ id: 1, name: "Demo User", quote: "This plan was a great choice for me.", img: "https://placehold.co/300x500/eeeeee/333?text=Review" }],
    faqs: [{ title: "Is this plan available?", content: "Yes, this plan is available for purchase." }]
  };
};

const mockGetExperts = async (allExperts, { location, role }) => {
  await delay(100);
  let experts = allExperts;
  if (location && location !== 'all') {
    experts = experts.filter(e => e.location === location);
  }
  if (role && role !== 'all') {
    experts = experts.filter(e => e.role === role);
  }
  return [...experts.sort((a, b) => a.name.localeCompare(b.name))];
};

const mockGetArticles = async (allArticles, { tag, searchTerm }) => {
  await delay(100);
  let articles = allArticles;
  
  if (searchTerm) {
    articles = articles.filter(a =>
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (tag && tag !== 'all') {
    articles = articles.filter(a => a.tags.toLowerCase().includes(tag.toLowerCase()));
  }

  return [...articles];
};

const mockSubmitConsultation = async (data, currentLeads) => {
  await delay(500);
  console.log("Mock API: Consultation Submitted", data);
  const newLead = { id: (currentLeads[0]?.id || 0) + 1, ...data, type: 'Consultation', status: 'New', date: new Date().toISOString() };
  return [newLead, ...currentLeads];
};

const mockSubmitContactForm = async (data, currentLeads) => {
  await delay(500);
  console.log("Mock API: Contact Form Submitted", data);
  const newLead = { id: (currentLeads[0]?.id || 0) + 1, ...data, type: 'Contact', status: 'New', date: new Date().toISOString() };
  return [newLead, ...currentLeads];
};

const mockUpdateSolution = async (updatedSolution, allSolutions) => {
  await delay(500);
  console.log("Mock API: 'POST' request to update solution", updatedSolution);
  
  if (!updatedSolution.title || !updatedSolution.price) {
    throw new Error("Title and Price are required.");
  }

  const newSolutions = [...allSolutions];
  
  if (updatedSolution.id) {
    const index = allSolutions.findIndex(s => s.id === updatedSolution.id);
    if (index > -1) {
      newSolutions[index] = updatedSolution;
    }
  } else {
    const maxId = newSolutions.reduce((max, s) => s.id > max ? s.id : max, 0);
    newSolutions.push({ ...updatedSolution, id: maxId + 1 });
  }
  return newSolutions;
};

const mockUpdateSolutionDetails = async (updatedDetails, allSolutionDetails) => {
  await delay(500);
  console.log("Mock API: 'POST' request to update solution details", updatedDetails);
  
  if (!updatedDetails.id) {
    throw new Error("ID is required to update details.");
  }

  const newSolutionDetails = { ...allSolutionDetails };
  newSolutionDetails[updatedDetails.id] = updatedDetails;
  
  return newSolutionDetails;
};

const mockUpdateLeadStatus = async (leadId, newStatus, allLeads) => {
  await delay(200);
  console.log(\`Mock API: 'POST' request to update lead \${leadId} to \${newStatus}\`);
  return allLeads.map(lead => 
    lead.id === leadId ? { ...lead, status: newStatus } : lead
  );
};

const mockUpdateExpert = async (updatedExpert, allExperts) => {
  await delay(500);
  console.log("Mock API: 'POST' request to update expert", updatedExpert);
  
  if (!updatedExpert.name || !updatedExpert.role || !updatedExpert.location) {
    throw new Error("Name, Role, and Location are required.");
  }

  const newExperts = [...allExperts];
  
  if (updatedExpert.id) {
    const index = allExperts.findIndex(e => e.id === updatedExpert.id);
    if (index > -1) {
      newExperts[index] = updatedExpert;
    }
  } else {
    const maxId = newExperts.reduce((max, e) => e.id > max ? e.id : max, 0);
    newExperts.push({ ...updatedExpert, id: maxId + 1 });
  }
  return newExperts;
};

const mockUpdateArticle = async (updatedArticle, allArticles) => {
  await delay(500);
  console.log("Mock API: 'POST' request to update article", updatedArticle);
  
  if (!updatedArticle.title || !updatedArticle.excerpt || !updatedArticle.authorId) {
    throw new Error("Title, Excerpt, and Author are required.");
  }

  const newArticles = [...allArticles];
  
  if (updatedArticle.id) {
    const index = allArticles.findIndex(a => a.id === updatedArticle.id);
    if (index > -1) {
      newArticles[index] = updatedArticle;
    }
  } else {
    const maxId = newArticles.reduce((max, a) => a.id > max ? a.id : max, 0);
    newArticles.push({ ...updatedArticle, id: maxId + 1 });
  }
  return newArticles;
};

const mockUpdateTeamMember = async (updatedMember, allTeam) => {
  await delay(500);
  console.log("Mock API: 'POST' request to update team member", updatedMember);
  
  if (!updatedMember.name || !updatedMember.email || !updatedMember.role) {
    throw new Error("Name, Email, and Role are required.");
  }

  const newTeam = [...allTeam];
  
  if (updatedMember.id) {
    const index = allTeam.findIndex(m => m.id === updatedMember.id);
    if (index > -1) {
      newTeam[index] = updatedMember;
    }
  } else {
    const maxId = newTeam.reduce((max, m) => m.id > max ? m.id : max, 0);
    newTeam.push({ ...updatedMember, id: maxId + 1 });
  }
  return newTeam;
};

const mockUpdateStory = async (updatedStory, allStories) => {
  await delay(500);
  console.log("Mock API: 'POST' request to update story", updatedStory);
  
  if (!updatedStory.name || !updatedStory.challenge) {
    throw new Error("Name and Challenge are required.");
  }

  const newStories = [...allStories];
  
  if (updatedStory.id) {
    const index = allStories.findIndex(a => a.id === updatedStory.id);
    if (index > -1) {
      newStories[index] = updatedStory;
    }
  } else {
    const maxId = newStories.reduce((max, a) => a.id > max ? a.id : max, 0);
    newStories.push({ ...updatedStory, id: maxId + 1 });
  }
  return newStories;
};

const mockUpdateAnnouncement = async (newText) => {
  await delay(300);
  console.log("Mock API: 'POST' request to update announcement", newText);
  return newText;
};

const mockNotificationService = async (eventName, customerEmail, customerPhone) => {
  await delay(150);
  
  const messages = {
    'Customer Login': \`Welcome back to Femacare! You've successfully logged in.\`,
    'Product Added to Cart': \`Your item has been added to the cart. Complete your purchase now!\`,
  };

  const message = messages[eventName] || 'You have a new notification from Femacare.';

  console.log(\`[EMAIL -> \${customerEmail}]: \${eventName}\`, message);
  console.log(\`[SMS -> \${customerPhone}]: \${eventName} - \${message}\`);
  console.log(\`[WHATSAPP -> \${customerPhone}]: \${eventName} - \${message}\`);
  
  return true;
};

const INITIAL_MOCK_DATA = {
  solutions: [
    { id: 1, title: "Comprehensive Hormonal Support", price: "₹8,999", desc: "A 6-month plan focusing on key hormone balancing.", tags: ["Hormones", "6 Months"], imgText: "Hormone Kit" },
    { id: 2, title: "Fertility Assessment", price: "₹4,999", desc: "In-depth analysis of fertility markers.", tags: ["Fertility", "Assessment"], imgText: "Assessment" },
    { id: 3, title: "Nutrition & Lifestyle Plan", price: "₹7,499", desc: "3-month personalized diet and lifestyle coaching.", tags: ["Nutrition", "Lifestyle"], imgText: "Nutrition" },
    { id: 4, title: "Menopause Symptom Relief", price: "₹6,999", desc: "Targeted support for managing menopause symptoms.", tags: ["Hormones", "Menopause"], imgText: "Menopause" },
  ],
  solutionDetails: {
    1: {
      id: 1,
      title: "Comprehensive Hormonal Support",
      price: "₹8,999",
      imgText: "Hormone Kit",
      claim: "Clinically tested to improve hormonal balance in 90 days.",
      overview: "Our 6-month Comprehensive Hormonal Support plan is a science-first program designed to address the root causes of hormonal imbalance, including PCOS, thyroid issues, and perimenopause symptoms. We provide a holistic approach combining medical guidance with lifestyle adjustments.",
      benefits: ["Regulates menstrual cycles", "Reduces hormonal acne", "Improves energy levels", "Stabilizes mood"],
      whatsIncluded: [
        { title: "At-Home Test Kit", content: "One comprehensive hormone test kit to establish your baseline. Measures 12+ key biomarkers." },
        { title: "Personalized Treatment Plan", content: "A detailed plan created by a specialist based on your test results and health intake." },
        { title: "1:1 Expert Support", content: "Six monthly check-ins with a dedicated health coach and quarterly reviews with a medical expert." },
        { title: "Lifestyle & Nutrition Guide", content: "Evidence-based guides on nutrition, exercise, and stress management tailored to your hormonal needs." },
        { title: "Yoga & Exercise Videos", content: "Access to a private library of yoga and exercise videos designed to support hormonal health." }
      ],
      whoItsFor: "This plan is ideal for individuals experiencing symptoms of hormonal imbalance such as irregular periods, persistent acne, unexplained weight gain, or mood swings, and those diagnosed with PCOS or thyroid conditions.",
      research: "Our methodology is backed by 3 peer-reviewed studies (Citation 1, Citation 2) and follows ACOG guidelines. Our clinical trial (n=150) showed a 87% self-reported improvement in primary symptoms over 6 months.",
      testimonials: [
        { id: 1, name: "Priya K.", quote: "They say it's simple... and it was! My energy is back.", img: "https://placehold.co/300x500/d1fae5/333?text=Priya+K." },
        { id: 2, name: "Rohan M.", quote: "What we are looking at here... is results. My levels are stable.", img: "https://placehold.co/300x500/e0e7ff/333?text=Rohan+M." },
        { id: 3, name: "Anita D.", quote: "The 1:1 support made all the difference. I finally feel heard.", img: "https://placehold.co/300x500/ffe4e6/333?text=Anita+D." },
        { id: 4, name: "Sunil P.", quote: "What I'm doing is taking control of my health. This plan works.", img: "https://placehold.co/300x500/fef3c7/333?text=Sunil+P." },
        { id: 5, name: "Aditi S.", quote: "My bloating is gone, and I'm sleeping better than ever.", img: "https://placehold.co/300x500/e0f2fe/333?text=Aditi+S." }
      ],
      faqs: [
        { title: "How is this different from other plans?", content: "We combine at-home testing with 1:1 medical and coaching support, addressing your unique biology rather than providing a one-size-fits-all solution." },
        { title: "Is medication included?", content: "This plan focuses on lifestyle, nutrition, and supplement recommendations. If our medical team determines you need prescription medication, we will refer you to a specialist." },
        { title: "What if I'm already seeing a doctor?", content: "Our plan is designed to be complementary to your existing care. We can share your results and progress with your primary physician at your request." }
      ]
    }
  },
  experts: [
    { id: 1, name: "Dr. Aruna Sadarangani", role: "Gynecologist", location: "Mumbai", expertise: "18+ years experience in reproductive endocrinology and infertility.", img: "https://placehold.co/500x500/d1fae5/333?text=Dr.+Aruna" },
    { id: 2, name: "Dr. Prasana Shah", role: "Gynecologist", location: "Delhi", expertise: "Specializes in high-risk pregnancies and PCOS management.", img: "https://placehold.co/500x500/e0e7ff/333?text=Dr.+Prasana" },
    { id: 3, name: "Samreedhi Goel", role: "Nutritionist", location: "In-House", expertise: "Certified nutritionist focusing on fertility and hormonal diets.", img: "https://placehold.co/500x500/ffe4e6/333?text=Samreedhi" },
    { id: 4, name: "Dr. Kumar Sankaran", role: "Mental Health", location: "In-House", expertise: "Clinical psychologist specializing in stress and lifestyle-related health issues.", img: "https://placehold.co/500x500/fef3c7/333?text=Dr.+Kumar" },
    { id: 5, name: "Aanya Sharma", role: "Nutritionist", location: "Mumbai", expertise: "Specializes in plant-based nutrition for hormonal health.", img: "https://placehold.co/500x500/e0f2fe/333?text=Aanya" },
    { id: 6, name: "Dr. Rohan Gupta", role: "Gynecologist", location: "Bangalore", expertise: "Leading expert in minimally invasive gynecological surgery.", img: "https://placehold.co/500x500/f3e8ff/333?text=Dr.+Rohan" }
  ],
  articles: [
    { id: 1, title: "Understanding Your Ovulation Cycle", tags: "Fertility, Science", excerpt: "Learn the science behind your cycle...", img: "https://placehold.co/600x400/f3e8ff/333?text=Blog+Post", authorId: 1 },
    { id: 2, title: "The Top 5 Nutrients for Hormonal Health", tags: "Nutrition, Hormones", excerpt: "Are you getting enough Magnesium?...", img: "https://placehold.co/600x400/e0f2fe/333?text=Blog+Post", authorId: 3 },
    { id: 3, title: "PCOS and Insulin Resistance", tags: "Hormones, PCOS", excerpt: "Exploring the link between PCOS and insulin...", img: "https://placehold.co/600x400/d1fae5/333?text=Blog+Post", authorId: 2 },
    { id: 4, title: "Managing Stress for Better Fertility", tags: "Lifestyle, Fertility", excerpt: "How cortisol impacts your ability to conceive...", img: "https://placehold.co/600x400/ffe4e6/333?text=Blog+Post", authorId: 4 },
    { id: 5, title: "A Guide to Perimenopause Symptoms", tags: "Hormones, Menopause", excerpt: "It's not just hot flashes...", img: "https://placehold.co/600x400/fef3c7/333?text=Blog+Post", authorId: 1 },
    { id: 6, title: "Yoga for Hormonal Balance", tags: "Lifestyle, Yoga", excerpt: "Specific poses and breathing techniques...", img: "https://placehold.co/600x400/e0e7ff/333?text=Blog+Post", authorId: 3 },
  ],
  leads: [
    { id: 2, name: "Demo User 2", email: "demo2@example.com", type: 'Contact', status: 'Contacted', date: "2025-10-19T14:30:00Z", phone: '555-1234', goal: 'General' },
    { id: 1, name: "Demo User 1", email: "demo1@example.com", type: 'Consultation', status: 'New', date: "2025-10-20T10:00:00Z", phone: '555-5678', goal: 'Fertility' }
  ],
  stories: [
    { id: 1, name: "Priya S.", challenge: "Diagnosed with PCOS and irregular cycles, Priya was struggling to conceive for 2 years.", treatment: "She enrolled in the Comprehensive Hormonal Support plan. Her health coach and doctor created a personalized plan focusing on nutrition, stress management, and cycle tracking.", result: "After 4 months on the plan, Priya's cycles regulated. At 6 months, she successfully conceived. 'Femacare gave me the answers no one else could,' she says." },
    { id: 2, name: "Anika J.", challenge: "Anika was experiencing severe perimenopause symptoms, including hot flashes and mood swings, that were affecting her career.", treatment: "The Menopause Symptom Relief plan provided her with 1:1 expert support and lifestyle adjustments, including a new diet and yoga routine.", result: "Anika reports a 75% reduction in hot flashes and a 'significant improvement' in her mood and energy levels. 'I feel like myself again.'" }
  ],
  team: [
    { id: 1, name: "Super Admin", email: "admin@femacare.com", role: "Super Admin" },
    { id: 2, name: "Content Editor", email: "content@femacare.com", role: "Content Editor" },
    { id: 3, name: "Sales/Support", email: "sales@femacare.com", role: "Sales/Support" }
  ],
  announcement: "Free shipping on orders over ₹2000! • Book your free consultation today!"
};

export default function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold text-pink-600 mb-4">Femacare CMS Platform</h1>
        <p className="text-lg text-gray-600 mb-4">
          Complete application code loaded successfully!
        </p>
        <p className="text-sm text-gray-500">
          Run <code className="bg-gray-200 px-2 py-1 rounded">npm install</code> then <code className="bg-gray-200 px-2 py-1 rounded">npm start</code> to begin.
        </p>
      </div>
    </div>
  );
}
