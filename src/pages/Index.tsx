import { Navigation } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CourseCard } from "@/components/CourseCard";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, BookOpen, Users, Award, Zap } from "lucide-react";
import FeaturedCourses from "./Course/FeaturedCourses";
import certificate1 from "@/assets/certificate1.png";
import certificate2 from "@/assets/certificate2.png";
import { CategoriesSection } from "./CategoriesSection"
import Testimonials from "./Testimonials";
import WhyChooseShell from "./WhyChooseShell";
import NewsletterSection from "./NewsletterSection";

const Index = () => {

  const features = [
    {
      icon: BookOpen,
      title: "Expert-Led Courses",
      description: "Learn from industry professionals with years of real-world experience.",
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Join a thriving community of learners and mentors who support your growth.",
    },
    {
      icon: Award,
      title: "Certified Programs",
      description: "Earn recognized certifications that boost your career prospects.",
    },
    {
      icon: Zap,
      title: "Hands-On Projects",
      description: "Build real-world projects that showcase your skills to employers.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />

      <main className="flex-1">
        <Hero />
        <CategoriesSection />
        <FeaturedCourses />


        <WhyChooseShell />
        <Testimonials />
        <NewsletterSection />

      </main>

      <Footer />
    </div>
  );
};

export default Index;
