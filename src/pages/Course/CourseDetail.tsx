import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// Assuming these imports work for your specific project structure
import { Navigation } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Star, Check, User, Clock, ChevronDown, Circle, Play, Download, FileText, Eye, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import toast from "react-hot-toast";
import { courseService } from "@/service/course.service"; // Adjust the import path as needed

// --- Helper Components for Clean Code & Theme Consistency ---

// Component for a styled "What You'll Learn" list item
const LearnListItem = ({ children }) => (
    <div className="flex items-start gap-3 p-4 bg-muted/20 dark:bg-card rounded-xl border border-border/70">
        <Circle className="w-4 h-4 text-primary mt-1 flex-shrink-0 fill-primary/20 stroke-1" />
        <span className="text-foreground font-medium leading-relaxed">{children}</span>
    </div>
);

// Component for a styled 'Course Include' item in the enroll box
const CourseIncludeItem = ({ children }) => (
    <div className="flex items-center gap-2">
        <Check className="w-4 h-4 text-white flex-shrink-0" />
        <span className="text-sm font-light opacity-80">{children}</span>
    </div>
);

// --- Main Course Detail Component ---

const CourseDetail = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [showPdfViewer, setShowPdfViewer] = useState(false);
    const [expandedSections, setExpandedSections] = useState(new Set([0])); // Default: first section expanded

    // Mocked state for enrollment checks
    const token = null;
    const user = null;

    const fetchCourseDetails = async () => {
        if (!courseId) return;

        try {
            setIsLoading(true);
            
            // --- MOCK DATA STRUCTURE (REPLACE WITH REAL API CALL LATER) ---
            // Simulating API call delay and data mapping to the required structure
            await new Promise(resolve => setTimeout(resolve, 500)); 
            const data = {
                _id: courseId,
                courseName: "Complete Digital Marketing Masterclass",
                courseDescription: "Master digital marketing from SEO to social media campaigns. Learn strategies used by top agencies to grow your online presence.",
                finalPrice: 4999,
                originalPrice: 9999,
                discountPercent: 50,
                courseDuration: "12 Weeks",
                courseLevel: "Beginner",
                studentsEnrolled: new Array(2450).fill(0), 
                whatYouWillLearn: "SEO and content marketing fundamentals\r\n\r\nSocial media marketing strategies\r\n\r\nEmail marketing and automation\r\n\r\nGoogle Ads and PPC campaigns\r\n\r\nAnalytics and performance tracking\r\n\r\nMarketing funnel optimization",
                courseOverview: "This comprehensive course is designed to take you from beginner to proficient in Digital Marketing. You'll work on real-world projects, receive personalized feedback from Sarah Johnson, and gain the skills needed to excel in your career.",
                courseContent: [
                    { sectionName: "Section 1: Intro & Marketing Fundamentals", subSection: [{ title: "What is Digital Marketing?" }, { title: "Digital Marketing Landscape" }, { title: "Setting Goals" }] },
                    { sectionName: "Section 2: SEO Fundamentals & Strategy", subSection: [{ title: "Understanding Keywords" }, { title: "On-Page SEO Techniques" }, { title: "Link Building Strategies" }] },
                    { sectionName: "Section 3: Social Media & Paid Campaigns", subSection: [{ title: "Platform Selection & Strategy" }, { title: "Content Creation for Social Media" }, { title: "Running Paid Campaigns" }] }
                ],
                category: { name: "Digital Marketing" },
                thumbnail: "https://images.unsplash.com/photo-1542831371-29b0f74f9d13?q=80&w=1200", // Using a relevant image
                brochures: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", 
            };

            const mappedCourse = {
                id: data._id,
                title: data.courseName,
                description: data.courseDescription,
                price: data.finalPrice,
                originalPrice: data.originalPrice,
                discountPercent: data.discountPercent,
                rating: 4.8, reviews: 2400, students: data.studentsEnrolled.length,
                duration: data.courseDuration, level: data.courseLevel,
                instructor: {
                    name: "Sarah Johnson",
                    bio: "Sarah is a digital marketing expert with over 10 years of industry experience, specializing in brand strategy and performance marketing.",
                    avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Sarah+Johnson&facialHair=none&clothingColor=white&top=shortHair&backgroundColor=emerald",
                },
                whatYouLearn: data.whatYouWillLearn ? data.whatYouWillLearn.split("\r\n\r\n").filter(item => item.trim()) : [],
                overview: data.courseOverview,
                includes: [`${data.courseDuration} of video content`, "Lifetime access", "Certificate of completion", "Downloadable resources"],
                curriculum: data.courseContent ? data.courseContent.map(section => ({ section: section.sectionName, subsections: section.subSection || [] })) : [],
                category: data.category?.name || "Uncategorized",
                thumbnail: data.thumbnail,
                brochure: data.brochures,
            };

            setCourse(mappedCourse);
            setIsEnrolled(false);

        } catch (error) {
            console.error("Failed to fetch course details:", error);
            toast.error("Failed to load course details.");
            setCourse(null);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleSection = (sectionIndex) => {
        setExpandedSections(prev => {
            const newExpanded = new Set(prev);
            if (newExpanded.has(sectionIndex)) newExpanded.delete(sectionIndex);
            else newExpanded.add(sectionIndex);
            return newExpanded;
        });
    };

    const handleDownloadBrochure = async () => {
        if (!course.brochure) {
            toast.error("Brochure not available.");
            return;
        }
        toast.success("Initiating brochure download...");
        try {
            const response = await fetch(course.brochure);
            const blob = await response.blob();
            const downloadUrl = URL.createObjectURL(blob);
            const filename = `${course.title.replace(/[^a-z0-9]/gi, '_')}_brochure.pdf`;
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setTimeout(() => { URL.revokeObjectURL(downloadUrl); }, 100);
        } catch (error) {
            toast.error("Failed to download brochure.");
        }
    };

    useEffect(() => {
        fetchCourseDetails();
    }, [courseId]);

    // --- Loading and Error States ---
    if (isLoading) {
        return (
            <div className="min-h-screen bg-background">
                <Navigation />
                <main className="container mx-auto px-4 pt-32 pb-20 max-w-7xl">
                    <div className="text-center py-20 bg-card rounded-xl shadow-lg border border-border">
                        <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
                        <p className="text-lg text-muted-foreground">Loading course details...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (!course) {
        return (
            <div className="min-h-screen bg-background">
                <Navigation />
                <main className="container mx-auto px-4 pt-32 pb-20 max-w-7xl">
                    <div className="text-center py-20 bg-card rounded-xl shadow-lg border border-border">
                        <p className="text-lg text-destructive">Course not found or an error occurred.</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    // --- Main Render ---
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navigation />
            <main className="container mx-auto px-4 pt-28 pb-20 max-w-7xl">
                
                {/* Breadcrumb */}
                <div className="mb-6">
                    <Link to="/all-courses" className="text-primary hover:text-primary/80 flex items-center font-medium transition-colors">
                        ← Back to Courses
                    </Link>
                    <div className="text-sm text-muted-foreground mt-1">{course.category}</div>
                </div>

                {/* Hero Section (Green Banner) */}
                <section className="bg-gradient-to-r from-primary/90 to-primary text-white rounded-3xl p-6 sm:p-8 md:p-12 mb-12 relative overflow-hidden shadow-2xl shadow-primary/30">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 items-start">
                        
                        {/* Left Content */}
                        <div className="lg:col-span-2">
                            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">{course.title}</h1>
                            <p className="text-base md:text-lg mb-6 leading-relaxed text-primary-foreground/90">{course.description}</p>
                            
                            {/* Stats Bar */}
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm mb-8 text-primary-foreground/90">
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                                    <span className="font-semibold">{course.rating.toFixed(1)}</span>
                                    <span className="ml-1 text-xs">({course.reviews.toLocaleString()} reviews)</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <User className="w-4 h-4" />
                                    <span className="font-semibold">{course.students.toLocaleString()} students</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    <span className="font-semibold">{course.duration}</span>
                                </div>
                                <span className="capitalize bg-primary/80 px-3 py-1 rounded-full text-xs font-semibold">{course.level}</span>
                            </div>
                            
                            {/* Instructor Mini-Card */}
                            <div className="flex items-center gap-4 p-3 bg-black/10 rounded-xl max-w-max">
                                <img
                                    src={course.instructor.avatar}
                                    alt={course.instructor.name}
                                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                                />
                                <div>
                                    <p className="text-xs font-medium text-primary-foreground/70">Instructor</p>
                                    <p className="font-semibold text-base">{course.instructor.name}</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Card (Enrollment Box) */}
                        <div className="lg:text-right">
                            <Card className="bg-card text-foreground shadow-2xl border-none rounded-2xl sticky top-28">
                                <CardContent className="p-6">
                                    <h2 className="text-3xl font-bold mb-1">₹{course.price.toLocaleString()}</h2>
                                    <p className="text-xs mb-4 text-muted-foreground">One-time payment</p>
                                    
                                    {/* Price Comparison */}
                                    {course.originalPrice > course.price && (
                                        <div className="flex items-center justify-center mb-6">
                                            <span className="line-through text-sm text-muted-foreground/60">₹{course.originalPrice.toLocaleString()}</span>
                                            <span className="ml-3 text-sm font-bold text-destructive">-{course.discountPercent}% OFF</span>
                                        </div>
                                    )}

                                    {/* Enroll Button */}
                                    {isEnrolled ? (
                                        <Button size="lg" className="w-full bg-secondary text-secondary-foreground font-bold text-base transition-colors" disabled>
                                            Already Enrolled
                                        </Button>
                                    ) : (
                                        <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base transition-colors shadow-lg shadow-primary/30">
                                            Enroll Now
                                        </Button>
                                    )}
                                    
                                    {/* Course Includes List */}
                                    <div className="mt-6 space-y-3 text-left p-3 rounded-lg bg-muted/20">
                                        <p className="text-sm font-semibold mb-2 text-foreground">Course Includes:</p>
                                        {course.includes.map((item, index) => (
                                            <div key={index} className="flex items-center gap-2 text-muted-foreground">
                                                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                                                <span className="text-sm font-medium">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Main Content: What You'll Learn, Overview, Curriculum, Instructor */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Column (Main Details) */}
                    <div className="lg:col-span-2 space-y-12">
                        
                        {/* What You'll Learn */}
                        <section>
                            <h2 className="text-3xl font-bold mb-6 text-foreground">What You'll Learn</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {course.whatYouLearn.map((skill, index) => (
                                    <LearnListItem key={index}>{skill}</LearnListItem>
                                ))}
                            </div>
                        </section>

                        {/* Course Overview */}
                        <section>
                            <h2 className="text-3xl font-bold mb-6 text-foreground">Course Overview</h2>
                            <div className="bg-card p-6 rounded-xl border border-border/70 shadow-inner">
                                <p className="text-lg text-muted-foreground leading-relaxed">{course.overview}</p>
                            </div>
                        </section>

                        {/* Course Curriculum */}
                        <section>
                            <h2 className="text-3xl font-bold mb-6 text-foreground">Course Curriculum</h2>
                            <div className="space-y-4">
                                {course.curriculum.map((sec, index) => {
                                    const isExpanded = expandedSections.has(index);
                                    return (
                                        <Card key={index} className="bg-card border-border/70 shadow-sm transition-shadow hover:shadow-md">
                                            <CardContent className="p-0">
                                                <div 
                                                    className="p-5 cursor-pointer flex items-center justify-between transition-colors hover:bg-muted/30"
                                                    onClick={() => toggleSection(index)}
                                                >
                                                    <h3 className="text-lg font-semibold flex-1 text-foreground">
                                                        {sec.section}
                                                    </h3>
                                                    <ChevronDown 
                                                        className={`w-5 h-5 text-primary transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                                                    />
                                                </div>
                                                {isExpanded && (
                                                    <div className="p-5 pt-0 space-y-3 bg-muted/10 border-t border-border animate-in fade-in slide-in-from-top-1 duration-300">
                                                        {sec.subsections.length > 0 ? (
                                                            sec.subsections.map((sub, subIndex) => (
                                                                <div key={subIndex} className="flex items-start gap-3 text-sm pl-4 py-2 border-b border-border/50 border-dashed last:border-b-0">
                                                                    <Play className={`w-3 h-3 mt-1.5 flex-shrink-0 text-primary`} />
                                                                    <span className="font-medium text-foreground">{sub.title}</span>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <p className="text-sm text-muted-foreground italic">Subsections not available yet.</p>
                                                        )}
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        </section>

                        {/* Course Materials: Thumbnail and Brochure */}
                        <section>
                            <h2 className="text-3xl font-bold mb-6 text-foreground">Course Materials</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                
                                {/* Thumbnail Preview */}
                                <Card className="bg-card border border-border/70 shadow-sm">
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground">
                                            <FileText className="w-5 h-5 text-primary" />
                                            Course Thumbnail
                                        </h3>
                                        <div className="relative border border-border rounded-lg overflow-hidden">
                                            <img
                                                src={course.thumbnail}
                                                alt={`${course.title} thumbnail`}
                                                className="w-full h-48 object-cover"
                                                onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x300/ECECEC/9CA3AF?text=No+Image'; }}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Brochure Preview and Download */}
                                <Card className="bg-card border border-border/70 shadow-sm">
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground">
                                            <FileText className="w-5 h-5 text-primary" />
                                            Course Brochure
                                        </h3>
                                        {course.brochure ? (
                                            <div className="space-y-4">
                                                <div className="p-4 border border-primary/30 rounded-xl bg-primary/10">
                                                    <div className="flex flex-wrap gap-3 items-center justify-between mb-3">
                                                        <div className="flex items-center space-x-2">
                                                            <FileText className="w-5 h-5 text-primary" />
                                                            <span className="text-sm font-medium text-foreground">Course Brochure.pdf</span>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                className="border-primary text-primary hover:bg-primary/10"
                                                                onClick={() => setShowPdfViewer(!showPdfViewer)}
                                                            >
                                                                <Eye className="w-4 h-4 mr-1" />
                                                                {showPdfViewer ? 'Hide Preview' : 'Show Preview'}
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                className="bg-primary hover:bg-primary/90 text-white"
                                                                onClick={handleDownloadBrochure}
                                                            >
                                                                <Download className="w-4 h-4 mr-1" />
                                                                Download
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                                {showPdfViewer && (
                                                    <div className="mt-4 border border-border rounded-lg overflow-hidden transition-all duration-300">
                                                        <iframe
                                                            src={`https://docs.google.com/viewer?url=${encodeURIComponent(course.brochure)}&embedded=true`}
                                                            width="100%"
                                                            height="400px"
                                                            title="PDF Preview"
                                                            className="w-full"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="text-center py-12">
                                                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                                                <p className="text-sm text-muted-foreground">Brochure not available yet.</p>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </section>
                    </div>

                    {/* Right Column (Instructor Card) */}
                    {/* Sticky top-28 ensures it pins below the navigation bar */}
                    <div className="lg:col-span-1">
                        <Card className="shadow-2xl sticky top-28 border border-border/70">
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold mb-4 text-foreground">Your Instructor</h3>
                                <img
                                    src={course.instructor.avatar} 
                                    alt={course.instructor.name}
                                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-primary/50 shadow-md"
                                />
                                <h4 className="text-xl font-bold text-center mb-1 text-foreground">{course.instructor.name}</h4>
                                <p className="text-center text-sm font-semibold text-primary mb-4">Expert Instructor</p>
                                <p className="text-sm text-muted-foreground text-center leading-relaxed">{course.instructor.bio}</p>
                                <div className="mt-4 text-center">
                                    <Button variant="link" className="text-primary hover:text-primary/80">View Profile →</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CourseDetail;