import React from "react";
import { Navigation } from "@/components/Navbar";
import { Star, MessageCircle } from "lucide-react";

// Assuming these images are correctly resolved by your bundler/Webpack/Vite setup
import img1 from "../assets/new_student/1.jpg"
import img2 from "../assets/new_student/2.jpg"
import img3 from "../assets/new_student/3.jpg"
import img4 from "../assets/new_student/4.jpg"
import img5 from "../assets/new_student/5.jpg"
// import img6 from "../assets/new_student/6.jpg"
// import img7 from "../assets/new_student/7.jpg"
// import img8 from "../assets/new_student/8.jpg"
import dummy from "../assets/students/dummy.png"


const Testimonials = () => {
    // Dummy testimonials data with Indian names and photos, completed up to ID 8
    const testimonials = [
        {
            id: 1,
            name: "Rohit Verma",
            role: "Digital Marketing",
            quote: "This was the most practical digital marketing course I’ve done. Every session was hands-on, and the mentors personally guided us. I even got freelance clients during the course itself!",
            rating: 4,
            avatar: img1,
        },
        {
            id: 2,
            name: "Kunal Mehta",
            role: "Cybersecurity",
            quote: "Shell Academy helped me understand real-world cybersecurity threats and ethical hacking tools. The labs and case studies were very practical. I recently cleared my CEH certification with confidence.",
            rating: 5,
            avatar: img2,
        },
        {
            id: 3,
            name: "Vikrant Singh",
            role: "Advanced Paid Marketing (Meta & Google Ads)",
            quote: "I’ve done many online marketing courses before, but this one actually focused on results. I was able to scale my e-commerce ad campaigns from ₹10,000/month to ₹1 lakh/month after applying the strategies taught here.",
            rating: 3,
            avatar: img3,
        },
        {
            id: 4,
            name: "Ankit Raj",
            role: "Dropshipping Mastery",
            quote: "The Dropshipping Mastery program was completely practical. They helped me set up my first store, find suppliers, and even run profitable ads. I made my first sale within 10 days!",
            rating: 4,
            avatar: img4,
        },
        // {
        //     id: 5,
        //     name: "Manish Tiwari",
        //     role: "Mastering SEO & SEM",
        //     quote: "Earlier I struggled to rank websites. After learning from Shell E-Learning Academy, I ranked 3 local business sites on Google’s first page. Their step-by-step teaching style is the best!",
        //     rating: 5,
        //     avatar: img5,
        // },
        {
            id: 6,
            name: "Sneha Patel",
            role: "Prompt Engineering Masterclass",
            quote: "I never knew how powerful AI tools could be until I joined this program. The Prompt Engineering Masterclass was a game-changer — now I create content for 5 brands using ChatGPT and Midjourney.",
            rating: 5,
            avatar: img5 || dummy,
        },
        // {
        //     id: 7,
        //     name: "Megha Rathi",
        //     role: "Cloud Computing (AWS, Azure, Google Cloud)",
        //     quote: "The Cloud Computing course gave me the clarity I needed to switch from IT support to cloud architecture. The live AWS demos and mentor guidance were top-notch. Highly recommend for career shifters.",
        //     rating: 5,
        //     avatar: img5|| dummy,
        // },
        // {
        //     id: 8,
        //     name: "Ravi Kumar",
        //     role: "Full Stack Development",
        //     quote: "The dedicated support and deep-dive sessions on MERN stack were invaluable. I moved from basic HTML/CSS to launching my own SaaS product in just 6 months, thanks to the structured curriculum.",
        //     rating: 4,
        //     avatar: img5 || dummy,
        // },
    ];

    // Sub-component for a single testimonial card
    const TestimonialCard = ({ testimonial }) => (
        <div
            key={testimonial.id}
            className="bg-card rounded-3xl p-6 border border-border/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 space-y-4 dark:shadow-gray-900/50"
        >
            {/* Rating Stars */}
            <div className="flex space-x-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                ))}
            </div>
            
            {/* Quote */}
            <div className="relative text-foreground">
                <MessageCircle className="absolute -top-3 -left-3 w-8 h-8 text-primary/10 dark:text-primary/20" />
                <p className="text-base italic leading-relaxed text-foreground/80 pl-4 pt-2">
                    &ldquo;{testimonial.quote}&rdquo;
                </p>
            </div>

            {/* Avatar and Info */}
            <div className="flex items-center space-x-4 pt-2 border-t border-border/70">
                <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-primary/20"
                    onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/56?text=👤";
                    }}
                />
                <div>
                    <h4 className="font-bold text-lg text-primary">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground font-medium">{testimonial.role}</p>
                </div>
            </div>
        </div>
    );

    return (
        // Added distinct py spacing and potential background effect
        <section className="py-20 lg:py-32 bg-background">
            {/* Assuming Navigation is placed outside of this component, or correctly imported */}
            {/* <Navigation /> */}
            
            <div className="container mx-auto px-4 max-w-7xl">
                
                {/* Header Section */}
                <div className="text-center mb-16">
                    <p className="text-lg font-semibold text-primary mb-2">Success Stories</p>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 ">
                        What Our Learners Say
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Join **hundreds of successful students** who transformed their careers through practical, mentor-led programs.
                    </p>
                </div>

                {/* Testimonials Grid (Staggered/Masonry Layout for visual interest) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {/* The .map function below ensures all 8 items in the 'testimonials' array are rendered */}
                    {testimonials.map((testimonial) => {
                        // Apply custom class to stagger height on desktop views
                        let colSpan = 'lg:col-span-1';
                        let rowSpan = '';
                        
                        // Example staggering based on ID (adjust as needed for content height)
                        if (testimonial.id % 3 === 0) {
                            rowSpan = 'xl:row-span-2'; // Make every 3rd card taller (if using masonry plugin, otherwise relies on auto-flow)
                        } else if (testimonial.id % 4 === 1) {
                            colSpan = 'md:col-span-2 lg:col-span-1'; // Wider on tablet, standard on large desktop
                        }

                        return (
                            <div key={testimonial.id} className={`${colSpan} ${rowSpan}`}>
                                <TestimonialCard testimonial={testimonial} />
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default Testimonials;