import { Navigation } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Target, Users, Award, Zap, Building2, Globe } from "lucide-react";
import { Link } from "react-router-dom";
// Assuming logo1 is accessible via this relative path
import logo1 from "../assets/logo1.png";

// --- Data Definitions (Unchanged) ---

const values = [
    {
        icon: Target,
        title: "Our Mission",
        description: "To make industry-ready education accessible to everyone, everywhere, at any time.",
    },
    {
        icon: Users,
        title: "Community First",
        description: "Building a global community of learners and professionals who support, inspire, and grow together.",
    },
    {
        icon: Award,
        title: "Excellence in Learning",
        description: "Delivering top-quality, practical, and future-focused education through expert trainers and structured learning paths.",
    },
    {
        icon: Zap,
        title: "Innovation & Growth",
        description: "Constantly upgrading our teaching methods and course content to ensure our learners stay ahead of industry trends.",
    },
];

const stats = [
    { value: "2K+", label: "Students Worldwide" },
    { value: "20+", label: "Courses Available" },
    { value: "60+", label: "Expert Instructors" },
    { value: "98%", label: "Satisfaction Rate" },
];

// --- Sub-Components (Unchanged) ---

const StatItem = ({ value, label }) => (
    <div className="text-center p-4 bg-card rounded-xl shadow-md border border-border/70 hover:shadow-lg transition-all duration-300">
        <div className="mb-2 font-display text-4xl font-bold text-primary sm:text-5xl">
            {value}
        </div>
        <div className="text-muted-foreground font-medium text-sm sm:text-base">{label}</div>
    </div>
);

// --- Main Component ---

const About = () => {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <Navigation />

            <main className="flex-1 pt-16">

                {/* 1. Hero Section */}
                <section className="bg-gradient-to-b from-primary/10 to-background py-20 lg:py-32">
                    <div className="container mx-auto px-4 max-w-7xl">
                        <div className="mx-auto max-w-4xl text-center">
                            <h1 className="mb-6 font-display text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl leading-tight">
                                About <span className="text-primary">Shell E-Learning Academy</span>
                            </h1>
                            <p className="text-lg text-muted-foreground sm:text-xl max-w-3xl mx-auto">
                                At Shell, we're on a mission to make career-focused education accessible, engaging, and affordable for learners across the globe. We build skills, confidence, and real opportunities.
                            </p>
                            <Link to="/all-courses">
                                <Button size="lg" className="mt-8 shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90 font-bold">
                                    Explore Our Learning Paths
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* 2. Stats Section */}
                <section className="py-12 bg-card/50 border-y border-border/70">
                    <div className="container mx-auto px-4 max-w-7xl">
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {stats.map((stat, index) => (
                                <StatItem key={index} {...stat} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3. Story Section */}
                <section className="py-20 lg:py-32">
                    <div className="container mx-auto px-4 max-w-7xl">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left: Content */}
                            <div>
                                <h2 className="mb-6 font-bold text-4xl text-foreground">Our Story & Vision</h2>
                                <div className="space-y-6 text-base text-muted-foreground leading-relaxed">
                                    <p className="font-semibold">
                                        Shell E-Learning Academy was founded with a powerful vision — **“Empowering learners through practical and industry-driven education.”**
                                    </p>
                                    <p>
                                        We observed that traditional education often fails to meet the evolving needs of modern careers. To bridge this gap, we created a platform combining live interactive sessions, intensive hands-on projects, and recognized certifications that give students real-world expertise.
                                    </p>
                                    <p>
                                        Today, we are proud to have empowered thousands of students across India with essential digital-age skills in fields like Digital Marketing, AI, Data Analytics, and UI/UX Design. Our commitment is to prepare students for success with internship support, placement guidance, and continuous mentorship.
                                    </p>
                                    <p>
                                        <Link to="/contact" className="text-primary font-bold hover:underline">Connect with us →</Link>
                                    </p>
                                </div>
                            </div>
                            {/* Right: Image Placeholder */}
                            <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-2xl shadow-gray-400/30">
                                {/* Background element: Use a large abstract image to fill the space */}
                                <img
                                    src="https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="Abstract learning background"
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                />

                                {/* Primary/Green Overlay for Theme Consistency */}
                                <div className="absolute inset-0 bg-primary/80" />

                                {/* Centered Logo with Best Style (Z-indexed above overlay) */}
                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                    <div className="p-8 bg-card/80 rounded-full shadow-2xl border-4 border-primary/50 backdrop-blur-md transition-all duration-500 hover:scale-110">
                                        <img
                                            src={logo1} // Your Shell E-learning Academy logo
                                            alt="Shell E-learning Academy Logo"
                                            // Ensure logo is highly visible and constrained
                                            className="w-28 h-28 sm:w-36 sm:h-36 object-contain"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. Founders Section (LOGOS USED HERE) */}
                <section className="bg-muted/30 py-20">
                    <div className="container mx-auto px-4 max-w-7xl">
                        <div className="mb-16 text-center">
                            <h2 className="mb-4 font-bold text-4xl text-foreground">Meet Our Leadership</h2>
                            <p className="text-lg text-muted-foreground">The visionaries steering Shell E-Learning Academy</p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">

                            {/* Founder 1 - Kartik Gupta */}
                            <div className="bg-card rounded-3xl p-8 text-center shadow-lg border border-border/70 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20">
                                <img
                                    src={logo1} // Using the imported logo
                                    alt="Kartik Gupta - Founder"
                                    className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-primary/50 object-contain p-2 bg-primary/5"
                                />
                                <h3 className="mb-1 font-bold text-xl text-foreground">Kartik Gupta</h3>
                                <p className="mb-4 text-primary font-semibold">Founder & Director</p>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    A visionary entrepreneur focused on transforming education through digital learning. Kartik ensures every learner is empowered for professional success.
                                </p>
                            </div>

                            {/* Founder 2 - Mayank Jain */}
                            <div className="bg-card rounded-3xl p-8 text-center shadow-lg border border-border/70 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20">
                                <img
                                    src={logo1} // Using the imported logo
                                    alt="Mayank Jain - Associate Founder"
                                    className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-primary/50 object-contain p-2 bg-primary/5"
                                />
                                <h3 className="mb-1 font-bold text-xl text-foreground">Mayank Jain</h3>
                                <p className="mb-4 text-primary font-semibold">Associate Founder</p>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    A strategic and creative leader who ensures that the curriculum aligns perfectly with evolving industry demands and student career goals.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. Values Section */}
                <section className="py-20 lg:py-24">
                    <div className="container mx-auto px-4 max-w-7xl">
                        <div className="mb-16 text-center">
                            <h2 className="mb-4 font-bold text-4xl text-foreground">Our Core Values</h2>
                            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                                These four principles guide every decision and every course we deliver
                            </p>
                        </div>

                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {values.map((value, index) => (
                                <div
                                    key={index}
                                    className="bg-card rounded-3xl p-6 text-center shadow-lg border border-border/70 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1 group"
                                >
                                    <div className="mx-auto mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 shadow-inner">
                                        <value.icon className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                                    </div>
                                    <h3 className="mb-2 font-bold text-xl text-foreground">{value.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 6. CTA Section */}
                <section className="bg-gradient-to-br from-primary/5 via-background to-primary/10 py-20 border-t border-border/70">
                    <div className="container mx-auto px-4 text-center max-w-7xl">
                        <h2 className="mb-4 font-bold text-4xl text-foreground">
                            Ready to Transform Your Career?
                        </h2>
                        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
                            Join our community of future-ready learners and start building real-world skills today.
                        </p>
                        <Link to="/auth">
                            <Button size="lg" className="h-12 px-8 shadow-xl shadow-primary/30 transition-all duration-300 bg-primary hover:bg-primary/90 font-bold text-lg hover:scale-105">
                                Get Started Now
                            </Button>
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default About;