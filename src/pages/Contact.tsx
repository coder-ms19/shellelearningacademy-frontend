import { Navigation } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      detail: "support@shellelearningacademy.com",
      description: "We'll respond within 24 hours",
    },
    {
      icon: Phone,
      title: "Call Us",
      detail: "+919406688303",
      description: "Mon-Fri, 9am-6pm IST",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      detail: "Vijay Nagar, Scheme No. 78, New Road, Indore MP 452010",
      description: "Stop by during business hours",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-accent/20 to-background py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Get In <span className="text-gradient">Touch</span>
              </h1>
              <p className="text-lg text-muted-foreground sm:text-xl">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {contactInfo.map((info, index) => (
                <Card key={index} className="p-6 text-center hover-lift">
                  <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <info.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-display text-lg font-semibold">{info.title}</h3>
                  <p className="mb-1 text-sm font-medium text-foreground">{info.detail}</p>
                  <p className="text-xs text-muted-foreground">{info.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="border-t border-border py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl">
              <div className="mb-10 text-center">
                <h2 className="mb-4 font-display text-3xl font-bold">Send Us a Message</h2>
                <p className="text-muted-foreground">
                  Fill out the form below and our team will get back to you within 24 hours
                </p>
              </div>

              <Card className="p-8">
                <form className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="firstName">
                        First Name
                      </label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="lastName">
                        Last Name
                      </label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="email">
                      Email Address
                    </label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="subject">
                      Subject
                    </label>
                    <Input id="subject" placeholder="How can we help you?" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="message">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                    />
                  </div>

                  <Button className="w-full smooth-transition hover:scale-105" size="lg">
                    Send Message
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </section>

        {/* Map/Location Section (Placeholder) */}
        <section className="border-t border-border bg-accent/30 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="mb-4 font-display text-3xl font-bold">Visit Our Office</h2>
              <p className="mb-8 text-lg text-muted-foreground">
                We're located in Vijay Nagar, Indore. Drop by for a coffee and a chat!
              </p>
              <div className="overflow-hidden rounded-xl border border-border bg-muted">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.0!2d75.8917633!3d22.7684867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDQ2JzA2LjYiTiA3NcKwNTMnMzAuNCJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Shell E-learning Academy Location"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
