import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CourseCard } from "@/components/CourseCard";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, BookOpen, Users, Award, Zap } from "lucide-react";
import FeaturedCourses from "./Course/FeaturedCourses";
import { CategoriesSection } from "./CategoriesSection"
import Testimonials from "./Testimonials";
import WhyChooseShell from "./WhyChooseShell";
import NewsletterSection from "./NewsletterSection";
import { CertificationsSection } from "@/components/CertificationsSection";
import { SponsorsSection } from "@/components/SponsorsSection";
import { UniversitySection } from "@/components/UniversitySection";
import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect } from "react";
import { LocomotiveScrollWrapper } from "@/components/LocomotiveScrollWrapper";

// import { TrustedCompanies } from "@/components/TrustedCompanies";
// import { InstructorsSection } from "@/components/InstructorsSection";

// Smooth scroll configuration - slower and smoother
const smoothScrollConfig = {
    damping: 30,
    stiffness: 60,
    mass: 0.8
};

// Animation variants for different directions with smooth spring physics
const fadeInVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1] // Smooth easeOutExpo for elegant motion
        }
    }
};

const slideFromLeft = {
    hidden: { opacity: 0, x: -80 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            damping: 30,
            stiffness: 60,
            mass: 0.8,
            duration: 1.2
        }
    }
};

const slideFromRight = {
    hidden: { opacity: 0, x: 80 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            damping: 30,
            stiffness: 60,
            mass: 0.8,
            duration: 1.2
        }
    }
};

const slideFromBottom = {
    hidden: { opacity: 0, y: 80 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            damping: 35,
            stiffness: 65,
            mass: 0.9,
            duration: 1.3
        }
    }
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            damping: 25,
            stiffness: 70,
            mass: 0.8,
            duration: 1.4
        }
    }
};

// Enhanced AnimatedSection component with Framer Motion
const AnimatedSection = ({
    children,
    variant = "fadeIn",
    delay = 0,
    className = ""
}: {
    children: React.ReactNode;
    variant?: "fadeIn" | "slideLeft" | "slideRight" | "slideBottom" | "scale";
    delay?: number;
    className?: string;
}) => {
    const variants = {
        fadeIn: fadeInVariants,
        slideLeft: slideFromLeft,
        slideRight: slideFromRight,
        slideBottom: slideFromBottom,
        scale: scaleIn
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15, margin: "-50px" }}
            variants={variants[variant]}
            transition={{ delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const Index = () => {
    // Smooth scroll progress
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, smoothScrollConfig);

    // Remove CSS smooth scroll as Locomotive Scroll handles it
    useEffect(() => {
        // Locomotive Scroll will handle smooth scrolling
        return () => {
            document.documentElement.style.scrollBehavior = 'auto';
        };
    }, []);

    return (
        <div className="flex min-h-screen flex-col">
            {/* Smooth scroll progress indicator */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-50"
                style={{ scaleX }}
            />

            <Navbar />

            <LocomotiveScrollWrapper>
                <main className="flex-1 overflow-hidden">
                    {/* Hero - Fade in with scale */}
                    <AnimatedSection variant="fadeIn" delay={0}>
                        <div data-scroll>
                            <Hero />
                        </div>
                    </AnimatedSection>

                    {/* Sponsors - Slide from left with spring */}
                    <AnimatedSection variant="slideLeft" delay={0.1}>
                        <div data-scroll>
                            <SponsorsSection />
                        </div>
                    </AnimatedSection>

                    {/* University - Slide from right with spring */}
                    <AnimatedSection variant="slideRight" delay={0.15}>
                        <div data-scroll>
                            <UniversitySection />
                        </div>
                    </AnimatedSection>

                    {/* Categories - Slide from bottom */}
                    <AnimatedSection variant="slideBottom" delay={0.1}>
                        <div data-scroll>
                            <CategoriesSection />
                        </div>
                    </AnimatedSection>

                    {/* Featured Courses - Slide from left */}
                    <AnimatedSection variant="slideLeft" delay={0.15}>
                        <div data-scroll>
                            <FeaturedCourses />
                        </div>
                    </AnimatedSection>

                    {/* Why Choose Shell - Slide from right */}
                    <AnimatedSection variant="slideRight" delay={0.1}>
                        <div data-scroll>
                            <WhyChooseShell />
                        </div>
                    </AnimatedSection>

                    {/* Testimonials - Scale animation with spring */}
                    <AnimatedSection variant="scale" delay={0.15}>
                        <div data-scroll>
                            <Testimonials />
                        </div>
                    </AnimatedSection>

                    {/* Certifications - Slide from left */}
                    <AnimatedSection variant="slideLeft" delay={0.1}>
                        <div data-scroll>
                            <CertificationsSection />
                        </div>
                    </AnimatedSection>

                    {/* Newsletter - Slide from bottom */}
                    <AnimatedSection variant="slideBottom" delay={0.15}>
                        <div data-scroll>
                            <NewsletterSection />
                        </div>
                    </AnimatedSection>

                </main>

                <Footer />
            </LocomotiveScrollWrapper>
        </div>
    );
};

export default Index;
