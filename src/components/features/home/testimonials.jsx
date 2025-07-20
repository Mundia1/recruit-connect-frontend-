import React from 'react';
import { Card } from '../../ui/Card';
import Avatar from '../../ui/Avatar';

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
    <section className="max-w-7xl mx-auto px-[var(--spacing-lg)] py-[var(--spacing-3xl)]">
      <h2 className="text-[var(--text-3xl)] font-bold text-[var(--text-primary)] mb-[var(--spacing-2xl)] text-center">
        What Our Users Say
      </h2>
      <div className="grid gap-[var(--spacing-2xl)] sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="p-[var(--spacing-xl)] flex flex-col items-center text-center">
            <p className="text-[var(--text-base)] text-[var(--text-primary)] italic mb-[var(--spacing-md)]">"{testimonial.text}"</p>
            <div className="flex items-center mt-[var(--spacing-md)]">
              <Avatar 
                src={testimonial.image} 
                alt={testimonial.name} 
                size="sm"
                className="mr-[var(--spacing-md)]"
              />
              <div className="flex flex-col items-start">
                <span className="font-semibold text-[var(--green-primary)]">{testimonial.name}</span>
                <span className="text-[var(--text-sm)] text-[var(--text-muted)]">{testimonial.role}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
