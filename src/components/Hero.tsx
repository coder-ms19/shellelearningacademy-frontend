

import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Play, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import hero_img from "../assets/hero_img.jpg"
import img1 from "../assets/new_student/1.jpg"
import img2 from "../assets/new_student/2.jpg"
import img3 from "../assets/new_student/3.jpg"
import img4 from "../assets/new_student/4.jpg"
import img5 from "../assets/new_student/5.jpg"
import img6 from "../assets/new_student/6.jpg"
import img12 from "../assets/new_student/12.jpg"

export const Hero = () => {
  const navigate = useNavigate();


  const images = [

    {
      id: 2,

      avatar: img2,
    },
    {
      id: 3,

      avatar: img3,
    },

    {
      id: 6,

      avatar: img5,
    },
    {
      id: 4,

      avatar: img5,
    },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background pt-20 pb-16 lg:pt-32 lg:pb-24">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      {/* Floating Educational Animations (New) */}
      <div className="absolute inset-0 pointer-events-none opacity-50 z-0">
        {/* Add floating keyframes in your global CSS or use Tailwind's arbitrary values if supported for complex animations */}
        {/* For demonstration, we'll use utility classes and a custom 'animate-float' class placeholder */}
        {/* You would define the 'animate-float' and 'animate-float-delay-X' in your CSS */}

        {/* Placeholder for custom CSS:
        @keyframes float { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(3deg); } }
        .animate-float { animation: float 10s ease-in-out infinite; }
        .animate-float-delay-1 { animation-delay: 1.5s; }
        .animate-float-delay-2 { animation-delay: 3s; }
        */}

        {/* 💡 Idea/Lightbulb */}
        <svg
          className="absolute top-1/2 left-3/4 h-10 w-10 text-secondary/70 animate-float"
          style={{ animationDuration: '12s', animationDelay: '2s' }} // Inline styles for quick demo
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l2.5-2.5 2.5 2.5v13m-5 0h5m-5 0h-2a2 2 0 01-2-2V8a2 2 0 012-2h2" />
        </svg>
        {/* 🚀 Rocket/Growth */}
        <svg
          className="absolute bottom-1/4 right-1/4 h-6 w-6 text-primary/70 animate-float"
          style={{ animationDuration: '8s', animationDelay: '4s' }} // Inline styles for quick demo
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 10.5V6.5m0 0a4 4 0 10-4-4 4 4 0 004 4zM13.5 6.5l-3 3M19 14.5a3 3 0 00-3-3H8a3 3 0 00-3 3m14 0c0 4.418-4.03 8-9 8s-9-3.582-9-8h18z" />
        </svg>
      </div>
      {/* End Floating Educational Animations */}


      <div className="container relative mx-auto px-4 md:px-6 z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left Content (Unchanged) */}
          <div className="flex-1 text-center lg:text-left space-y-8 max-w-2xl mx-auto lg:mx-0">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                New Courses Available
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
                Learn The  <br />
                <span className="text-primary">Future
                  TODAY</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                Unlock your potential with expert-led courses designed for real-world success. Join a community of learners and transform your future today.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button
                size="lg"
                className="h-12 px-8 text-base font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                onClick={() => navigate("/all-courses")}
              >
                Explore Courses
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 text-base font-semibold rounded-full border-2 hover:bg-muted/50 transition-all duration-300"
                onClick={() => navigate("/demo")}
              >
                <Play className="mr-2 h-4 w-4 fill-current" />
                Watch Demo
              </Button>
            </div>

            <div className="pt-4 flex items-center justify-center lg:justify-start gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {images.map((i) => (
                    <div key={i.id} className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden">
                      <img src={i.avatar} alt="User" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <span className="font-medium">2k+ Learners</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4 text-primary hidden" />
                <span className="font-medium">50+ Courses</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 w-full max-w-xl lg:max-w-none relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-card">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay z-10" />
              <img
                src={hero_img}
                alt="Students learning together"
                className="w-full h-auto object-cover aspect-[4/3] transform transition-transform duration-700 hover:scale-105"
              />

              {/* Floating Card (Modified) */}
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <div className="bg-background/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-border/50 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <CheckCircle className="h-6 w-6 text-primary fill-primary/20" /> {/* Changed icon to CheckCircle for progress */}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Your Learning Progress</p> {/* Updated Title */}
                    <p className="text-lg font-bold text-foreground">8 / 10 Courses Completed</p> {/* Updated Progress */}
                  </div>
                  {/* Progress Bar (New) */}
                  <div className="ml-auto w-24">
                    <div className="text-xs font-semibold text-primary mb-1 text-right">80%</div>
                    <div className="w-full bg-muted-foreground/20 rounded-full h-2">
                      {/* Calculation for 80% width */}
                      <div className="bg-primary h-2 rounded-full transition-all duration-500" style={{ width: '80%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Dots (Unchanged) */}
            <div className="absolute -z-10 -bottom-6 -right-6 w-24 h-24 opacity-20">
              <div className="grid grid-cols-6 gap-2">
                {/* {[...Array(36)].map((_, i) => (
                  <div key={i} className="w-1 h-1 rounded-full bg-foreground" />
                ))} */}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};