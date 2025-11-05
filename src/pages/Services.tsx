import { Navigation } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Code, Palette, Megaphone, LineChart, Shield, Zap } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies",
      features: ["Responsive Design", "Performance Optimized", "SEO Ready", "Scalable Architecture"]
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "UI/UX Design",
      description: "Beautiful and intuitive interfaces that users love",
      features: ["User Research", "Wireframing", "Prototyping", "Visual Design"]
    },
    {
      icon: <Megaphone className="w-8 h-8" />,
      title: "Digital Marketing",
      description: "Grow your business with strategic digital marketing campaigns",
      features: ["Social Media", "Content Marketing", "Email Campaigns", "Brand Strategy"]
    },
    {
      icon: <LineChart className="w-8 h-8" />,
      title: "Analytics & Insights",
      description: "Data-driven decisions with comprehensive analytics",
      features: ["Performance Tracking", "User Behavior", "Conversion Optimization", "Custom Reports"]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Security Solutions",
      description: "Protect your digital assets with enterprise-grade security",
      features: ["Vulnerability Assessment", "Security Audits", "Compliance", "24/7 Monitoring"]
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Performance Optimization",
      description: "Lightning-fast experiences that engage and convert",
      features: ["Speed Optimization", "Code Splitting", "CDN Integration", "Caching Strategies"]
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
              <div className="mb-6 text-primary group-hover:scale-110 smooth-transition">
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