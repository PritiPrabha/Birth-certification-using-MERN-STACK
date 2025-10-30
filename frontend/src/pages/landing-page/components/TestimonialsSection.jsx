import React from 'react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      quote: "LifeCert made getting my child's birth certificate incredibly easy and stress-free. The process was fast, and the digital certificate is so convenient!",
      author: "Ritika Singh",
      location: "Hydrabad",
      rating: 5,
    },
    {
      id: 2,
      quote: "I was impressed by the security and efficiency of LifeCert. Knowing it's government-approved gives me great peace of mind. Highly recommend!",
      author: "Ajay Kumar",
      location: "Goa",
      rating: 5,
    },
    {
      id: 3,
      quote: "Navigating official documents can be a headache, but LifeCert's platform is so user-friendly. A truly essential service for new parents.",
      author: "Emily Kumar",
      location: "New Delhi",
      rating: 4,
    },
  ];

  return (
    <section className="py-5 bg-background">
      <div className="container">
        <h2 className="text-center display-5 fw-bold text-headings mb-5">
          What Our Families Say
        </h2>
        <div className="row g-4 justify-content-center">
          {testimonials.map((testimonial) => (
            <div className="col-md-6 col-lg-4" key={testimonial.id}>
              <div className="card h-100 shadow-sm border-0 rounded-4 p-4 bg-background card-hover">
                <div className="card-body d-flex flex-column">
                  <p className="card-text text-text-general flex-grow-1">"{testimonial.quote}"</p>
                  <div className="mt-3">
                    <div className="text-primary-button mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <i key={i} className="bi bi-star-fill me-1"></i>
                      ))}
                      {[...Array(5 - testimonial.rating)].map((_, i) => (
                        <i key={i} className="bi bi-star me-1 text-muted"></i>
                      ))}
                    </div>
                    <h4 className="h6 fw-bold text-headings mb-0">{testimonial.author}</h4>
                    <p className="text-muted small mb-0">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
