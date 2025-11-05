import { Navigation } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Target, Users, Award, Zap } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To make industry-ready education accessible to everyone, everywhere, at any time.",
    },
    {
      icon: Users,
      title: "Community First",
      description: "We're building a global community of learners and professionals who support, inspire, and grow together.",
    },
    {
      icon: Award,
      title: "Excellence in Learning",
      description: "We're committed to delivering top-quality, practical, and future-focused education through expert trainers and structured learning paths.",
    },
    {
      icon: Zap,
      title: "Innovation & Growth",
      description: "We constantly upgrade our teaching methods and course content to ensure our learners stay ahead of industry trends.",
    },
  ];

  // const stats = [
  //   { value: "50K+", label: "Students Worldwide" },
  //   { value: "1000+", label: "Expert Instructors" },
  //   { value: "500+", label: "Courses Available" },
  //   { value: "98%", label: "Satisfaction Rate" },
  // ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-accent/20 to-background py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                About <span className="text-gradient">Shell E-Learning Academy</span>
              </h1>
              <p className="text-lg text-muted-foreground sm:text-xl">
                At Shell E-Learning Academy, we're on a mission to make career-focused education accessible, engaging, and affordable for learners across the globe.
                We believe learning should not just give knowledge — it should build skills, confidence, and real opportunities for growth.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-6 font-display text-3xl font-bold">Our Story</h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>

                  Shell E-Learning Academy was founded with a simple yet powerful vision — “Empowering learners through practical and industry-driven education.”
                </p>
                <p>

                  We observed that traditional education often fails to meet the evolving needs of modern learners. To bridge this gap, Shell E-Learning Academy was created — combining live interactive sessions, hands-on projects, and recognized certifications that help students gain real-world expertise.

                </p>
                <p>
                  Today, we are proud to have empowered thousands of students across India with digital-age skills in fields like Digital Marketing, Artificial Intelligence, Data Analytics, UI/UX Design, and more.

                </p>
                <p>
                  Our programs are designed not only to educate but to prepare students for real-world success with internship support, placement guidance, and continuous mentorship.

                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Founders Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="mb-4 font-display text-3xl font-bold sm:text-4xl">
                Our Founders
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              <div className="rounded-xl border border-border bg-card p-8 text-center hover-lift">
                <h3 className="mb-2 font-display text-xl font-bold">Kartik Gupta</h3>
                <p className="mb-4 text-primary font-medium">Founder & Director</p>
                <p className="text-muted-foreground">
                  A visionary entrepreneur with a mission to transform education through innovation and digital learning.
                  Kartik believes in creating opportunities that empower learners to achieve personal and professional success.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-8 text-center hover-lift">
                <h3 className="mb-2 font-display text-xl font-bold">Mayank Jain</h3>
                <p className="mb-4 text-primary font-medium">Associate Founder</p>
                <p className="text-muted-foreground">
                  A creative mind and strategic thinker who focuses on building meaningful learning experiences.
                  Mayank ensures that every course at Shell E-Learning Academy aligns with industry demand and student goals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="border-y border-border bg-accent/30 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="mb-4 font-display text-3xl font-bold sm:text-4xl">
                Our Core Values
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                These principles guide everything we do
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-border bg-card p-6 text-center hover-lift"
                >
                  <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 font-display text-lg font-semibold">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        {/* <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="mb-2 font-display text-4xl font-bold text-primary sm:text-5xl">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* CTA Section */}
        <section className="border-t border-border bg-gradient-to-br from-primary/5 via-background to-primary/10 py-20">
          <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 font-display text-3xl font-bold sm:text-4xl">
              Join Our Community
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              Be part of a global learning community that's shaping the future
            </p>
            <Button size="lg" className="smooth-transition hover:scale-105">
              Get Started Today
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
