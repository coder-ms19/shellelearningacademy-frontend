import { Navigation } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Code, Palette, Megaphone, LineChart, Shield, Zap, Users, GraduationCap, Briefcase, BookOpen } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: "Professional E-Learning Courses",
      description: "Gain job-ready skills through practical, industry-based learning programs designed for real-world success.",
      features: [
        "Digital Marketing",
        "AI for Marketing",
        "Stock Market & Financial Investment",
        "Data Analytics with Power BI",
        "UI/UX & Graphic Design",
        "Advanced Photoshop",
        "E-commerce & Affiliate Marketing",
        "Get certified and become industry-ready with hands-on knowledge"
      ]
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Live Mentorship & Career Guidance",
      description: "Every learner receives personalized mentorship from industry professionals to build a confident career path.",
      features: [
        "One-on-one mentorship sessions",
        "Career roadmap planning",
        "Interview and job preparation guidance"
      ]
    },
    {
      icon: <Briefcase className="w-12 h-12" />,
      title: "Internship & Placement Assistance",
      description: "We connect students with real industry projects and internship opportunities to gain professional experience.",
      features: [
        "Internship programs with Shell Entertainment & partner companies",
        "Resume and portfolio support",
        "Placement training and guidance"
      ]
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Corporate Training Solutions",
      description: "Customized digital skill training programs designed for companies and professionals to enhance team performance.",
      features: [
        "Corporate workshops and webinars",
        "Skill development for employees",
        "Project-based learning modules"
      ]
    },
    {
      icon: <GraduationCap className="w-12 h-12" />,
      title: "College & Institutional Partnerships",
      description: "We collaborate with colleges and educational institutions to make digital learning more accessible.",
      features: [
        "Campus certification programs",
        "Student skill development initiatives",
        "Expert-led seminars and guest lectures"
      ]
    },
    {
      icon: <Megaphone className="w-12 h-12" />,
      title: "Webinars & Community Events",
      description: "Join our regular live sessions with industry leaders and mentors to stay ahead in the digital world.",
      features: [
        "Free learning webinars",
        "Networking and growth opportunities"
      ]
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "24×7 Support & Lifetime Learning Access",
      description: "All students receive lifetime access to learning materials and 24×7 academic support through our online portal.",
      features: []
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <Navigation />

      <main className="container mx-auto px-4 pt-32 pb-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
            Our Services
          </h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive solutions to help your business thrive in the digital world
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <Card
              key={index}
              className="p-8 hover-lift smooth-transition bg-card/50 backdrop-blur-sm border-primary/10 group"
            >
              <div className="mb-6 text-primary">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-muted-foreground mb-6">
                {service.description}
              </p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant="ghost" className="w-full group/btn">
                Learn More
                <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 smooth-transition" />
              </Button>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-primary p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg mb-8 opacity-90 text-[black] ">
            Let's discuss how we can help transform your business
          </p>
          <Button size="lg" variant="secondary" className="shadow-elegant">
            Schedule a Consultation
          </Button>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Services;