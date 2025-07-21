export const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Safaricom PLC",
    location: "Nairobi, Kenya",
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "M-Pesa Africa",
    location: "Dar es Salaam, Tanzania",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "BRCK",
    location: "Nairobi, Kenya",
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "Twiga Foods",
    location: "Nairobi, Kenya",
  },
  {
    id: 5,
    title: "Full Stack Developer",
    company: "Cellulant",
    location: "Lagos, Nigeria (Remote)",
  },
  {
    id: 6,
    title: "Mobile App Developer",
    company: "iHub",
    location: "Kigali, Rwanda",
  },
  {
    id: 7,
    title: "Digital Marketing Specialist",
    company: "Andela",
    location: "Nairobi, Kenya",
  },
  {
    id: 8,
    title: "Cloud Engineer",
    company: "Equity Bank",
    location: "Nairobi, Kenya",
  },
  {
    id: 9,
    title: "DevOps Engineer",
    company: "KCB Bank Group",
    location: "Nairobi, Kenya",
  },
  {
    id: 10,
    title: "IT Support Specialist",
    company: "Kenya Airways",
    location: "Nairobi, Kenya",
  },
  {
    id: 11,
    title: "Business Analyst",
    company: "Co-operative Bank",
    location: "Nairobi, Kenya",
  },
  {
    id: 12,
    title: "Product Manager",
    company: "M-KOPA",
    location: "Kampala, Uganda",
  },
  {
    id: 13,
    title: "Software QA Engineer",
    company: "Sendy",
    location: "Nairobi, Kenya",
  },
  {
    id: 14,
    title: "Data Engineer",
    company: "PesaPal",
    location: "Nairobi, Kenya",
  },
  {
    id: 15,
    title: "Cybersecurity Analyst",
    company: "Safaricom PLC",
    location: "Nairobi, Kenya",
  },
];

export const fetchJobDetails = async (id) => {
  // Simulate an API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const job = jobs.find((job) => job.id === parseInt(id));
      if (job) {
        // Augment the job data to simulate a full API response
        const fullJobDetails = {
          ...job,
          description: `This is a detailed description for the ${job.title} role at ${job.company}. We are looking for a talented individual to join our team.`,
          requirements: ['B.S. in Computer Science or equivalent', '3+ years of experience', 'Proficiency in relevant technologies'],
          benefits: ['Competitive salary', 'Health insurance', 'Paid time off'],
          postedAt: '2025-07-20T12:00:00Z',
          type: 'Full-time',
          salary: 'Competitive',
          company: {
            name: job.company,
            logo: 'https://cdn-icons-png.flaticon.com/512/300/300221.png' // A placeholder logo
          }
        };
        resolve(fullJobDetails);
      } else {
        reject(new Error('Job not found'));
      }
    }, 500);
  });
};