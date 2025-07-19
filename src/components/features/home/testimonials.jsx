import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      text: "RecruitConnect helped me find my dream job in just two weeks! The platform is so easy to use and the job matches were spot on.",
      name: "Sarah Johnson",
      role: "UX Designer at TechCorp",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 2,
      text: "As an employer, I've found amazing talent through RecruitConnect. The applicant quality is consistently high and the platform saves us so much time.",
      name: "Michael Chen",
      role: "HR Director at InnovateCo",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 3,
      text: "I was skeptical at first, but after getting three interviews in my first week, I'm a believer. The job recommendations are incredibly accurate.",
      name: "David Martinez",
      role: "Senior Developer at WebSolutions",
      image: "https://randomuser.me/api/portraits/men/65.jpg"
    }
  ];

  return (
    <section className="testimonials-section">
      <h2 className="section-title">What Our Users Say</h2>
      <div className="testimonials-grid">
        {testimonials.map((testimonial) => (
          <div className="testimonial-card" key={testimonial.id}>
            <p className="testimonial-text">"{testimonial.text}"</p>
            <div className="testimonial-author">
              <img 
                src={testimonial.image} 
                alt={testimonial.name} 
                className="author-image"
              />
              <div className="author-info">
                <span className="author-name">{testimonial.name}</span>
                <span className="author-role">{testimonial.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;