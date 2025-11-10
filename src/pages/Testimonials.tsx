import { Navigation } from "@/components/Navbar";

import { Star } from "lucide-react";
// giv eme that all from 8 
import img1 from "../assets/students/1.jpg"
import img2 from "../assets/students/2.jpg"
import img3 from "../assets/students/3.jpg"
 import img4 from "../assets/students/4.jpg"
 import img5 from "../assets/students/5.jpg"
 import img6 from "../assets/students/6.jpg"
 import img7 from "../assets/students/7.jpg"
 import img8 from "../assets/students/8.jpg"
 import dummy from "../assets/students/dummy.png"



const Testimonials = () => {
  // Dummy testimonials data with Indian names and photos
  const testimonials = [
    {
      id: 1,
      name: "Rohit Verma",
      role: " Digital Marketing",
      quote: "This was the most practical digital marketing course I’ve done. Every session was hands-on, and the mentors personally guided us. I even got freelance clients during the course itself!",
      rating: 5,
      avatar: img1,
    },
    {
      id: 2,
      name: "Kunal Mehta",
      role: "Cybersecurity",
      quote: "Shell Academy helped me understand real-world cybersecurity threats and ethical hacking tools. The labs and case studies were very practical. I recently cleared my CEH certification with confidence.",
      rating: 5,
      avatar: img2,
    },
    {
      id: 3,
      name: "Vikrant Singh ",
      role: " Advanced Paid Marketing (Meta & Google Ads)",
      quote: "i’ve done many online marketing courses before, but this one actually focused on results. I was able to scale my e-commerce ad campaigns from ₹10,000/month to ₹1 lakh/month after applying the strategies taught here.",
      rating: 5,
      avatar: img3,
    },
    {
      id: 4,
      name: "Ankit Raj ",
      role: "Dropshipping Mastery",
      quote: "The Dropshipping Mastery program was completely practical. They helped me set up my first store, find suppliers, and even run profitable ads. I made my first sale within 10 days!",
      rating: 5,
      avatar:img4,
    },
    {
      id: 5,
      name: "Manish Tiwari ",
      role: "Mastering SEO & SEM",
      quote: "Earlier I struggled to rank websites. After learning from Shell E-Learning Academy, I ranked 3 local business sites on Google’s first page. Their step-by-step teaching style is the best!",
      rating: 5,
      avatar:img5,
    },
    {
      id: 6,
      name: "Sneha Patel",
      role: "Prompt Engineering Masterclass",
      quote: "I never knew how powerful AI tools could be until I joined this program. The Prompt Engineering Masterclass was a game-changer — now I create content for 5 brands using ChatGPT and Midjourney.",
      rating: 5,
      avatar:dummy,
    },
    {
      id: 7,
      name: "Megha Rathi",
      role: "Cloud Computing (AWS, Azure, Google Cloud)",
      quote: "The Cloud Computing course gave me the clarity I needed to switch from IT support to cloud architecture. The live AWS demos and mentor guidance were top-notch.",
      rating: 4,
      avatar:dummy,
    },
    
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 pt-32 pb-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            What Our Learners Say
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of successful students who transformed their careers
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-card rounded-lg p-6 border border-border shadow-md hover:shadow-lg transition-shadow space-y-4"
            >
              {/* Quote */}
              <div className="text-muted-foreground italic">
                <p>&ldquo;{testimonial.quote}&rdquo;</p>
              </div>

              {/* Stars */}
              <div className="flex space-x-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Avatar and Info */}
              <div className="flex items-center space-x-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/48?text=👤";
                  }}
                />
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

    </div>
  );
};

export default Testimonials;