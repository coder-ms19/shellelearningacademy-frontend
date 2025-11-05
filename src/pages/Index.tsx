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

        {/* Features Section */}
        <section className="border-t border-border bg-accent/30 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="mb-4 font-display text-xl font-bold sm:text-4xl">
                Why Choose Shell E-Learning Academy?

              </h2>
              <p className="mx-auto max-w-2xl text-sm sm:text-lg text-muted-foreground">
                At Shell E-Learning Academy, we don’t just teach — we help you build your career.

                Practical, project-based learning,
                Live sessions with industry experts,
                Dual certification programs,
                Job & internship assistance,
                Affordable, high-value learning,
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group rounded-xl border border-border bg-card p-6 smooth-transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-md"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 smooth-transition group-hover:bg-primary/20">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-display text-base sm:text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FeaturedCourses />

        {/* Certification Section */}
        <section className="py-20 bg-gradient-to-b from-background to-secondary/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Award className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="mb-4 font-display text-xl font-bold sm:text-4xl">
                Earn Industry-Recognized Certificates
              </h2>
              <p className="mx-auto max-w-2xl text-sm sm:text-lg text-muted-foreground">
                Complete our courses and receive professional certificates that validate your skills and boost your career prospects.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto ">
              {/* <Card className="p-6 hover-lift smooth-transition">
                <img 
                  src={certificate1} 
                  alt="Professional Certificate" 
                  className="w-full rounded-lg mb-4 shadow-md"
                />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Professional Certificate</h3>
                <p className="text-muted-foreground text-sm">
                  Awarded upon successful completion of our comprehensive courses with practical projects.
                </p>
              </Card> */}
              
              <Card className="p-6 hover-lift smooth-transition">
                <img 
                  src={certificate2} 
                  alt="Achievement Certificate" 
                  className="w-full rounded-lg mb-4 shadow-md"
                />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Achievement Certificate</h3>
                <p className="text-muted-foreground text-sm">
                  Recognition for outstanding performance and mastery of advanced skills in your chosen field.
                </p>
              </Card>
            </div>
{/* 
            <div className="text-center mt-12">
              <Button size="lg" className="gap-2">
                View Sample Certificate
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div> */}
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-y border-border bg-gradient-to-br from-primary/5 via-background to-primary/10 py-20">
          <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 font-display text-xl font-bold sm:text-4xl lg:text-5xl">
              Ready to Start Your Journey?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-sm sm:text-lg text-muted-foreground">
              Join thousands of learners who have transformed their careers with Shell Entertainment
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="smooth-transition hover:scale-105">
                Get Started Free
              </Button>
              <Button size="lg" variant="outline">
                Schedule a Demo
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
