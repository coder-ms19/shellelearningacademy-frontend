// import React from "react";
// import { Link } from "react-router-dom";
// import { Navigation } from "@/components/Navbar";
// import { Footer } from "@/components/Footer";
// import { Star, Check, User, Clock, Play, Download } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";

// const CourseDetail = () => {
//   const course = {
//     id: "1",
//     title: "UI/UX Design Professional Certificate",
//     description: "Learn to design beautiful and intuitive user interfaces. Master Figma, user research, and design thinking methodologies.",
//     price: 5999,
//     rating: 4.9,
//     reviews: 321,
//     students: 321,
//     duration: 16,
//     level: "Intermediate",
//     instructor: {
//       name: "Michael Chen",
//       bio: "UI/UX expert who has designed award-winning product designer websites for apps and websites for major tech companies.",
//       avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
//     },
//     whatYouLearn: [
//       "User research and persona creation",
//       "Visual design principles",
//       "Usability testing methods",
//       "Wireframing and prototyping in Figma",
//       "Design systems and component libraries",
//     ],
//     overview: "Learn to design beautiful and intuitive user interfaces. Master Figma, user research, and design thinking methodologies. This comprehensive course is designed to take you from intermediate to proficient in UI/UX Design. You'll work on real-world projects, receive personalized feedback from Michael Chen, and gain the skills needed to excel in your career.",
//     includes: [
//       "16 weeks of video content",
//       "Lifetime access",
//       "Certificate of completion",
//       "Downloadable resources",
//     ],
//     curriculum: [
//       {
//         section: "Section 1: Design Fundamentals",
//         subsections: ["Design Thinking", "Color Theory", "Typography", "Layout Principles"],
//       },
//       {
//         section: "Section 2: User Research",
//         subsections: ["User Interviews", "Surveys and Analytics", "Persona Development"],
//       },
//       {
//         section: "Section 3: Prototyping",
//         subsections: ["Wireframing Basics", "Interactive Prototypes", "User Flows"],
//       },
//     ],
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Navigation />
//       <main className="container mx-auto px-4 pt-8 pb-20">
//         {/* Breadcrumb */}
//         <div className="mb-6">
//           <Link to="/courses" className="text-emerald-600 hover:underline flex items-center">
//             ← Back to Courses
//           </Link>
//           <div className="text-sm text-muted-foreground mt-1">UI/UX Design</div>
//         </div>

//         {/* Hero Section */}
//         <section className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-3xl p-8 mb-8 relative overflow-hidden">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
//             <div className="lg:col-span-2">
//               <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
//               <p className="text-lg mb-6 leading-relaxed">{course.description}</p>
//               <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
//                 <div className="flex items-center gap-1">
//                   <Star className="w-4 h-4 fill-current text-yellow-300" />
//                   <span>{course.rating} ({course.reviews} reviews)</span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <User className="w-4 h-4" />
//                   <span>{course.students} students</span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <Clock className="w-4 h-4" />
//                   <span>{course.duration} weeks</span>
//                 </div>
//                 <span className="capitalize bg-emerald-700 px-3 py-1 rounded-full">{course.level}</span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <img
//                   src={course.instructor.avatar}
//                   alt={course.instructor.name}
//                   className="w-12 h-12 rounded-full"
//                 />
//                 <div>
//                   <p className="font-semibold">Instructor</p>
//                   <p className="text-sm">{course.instructor.name}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="lg:text-right">
//               <div className="bg-white/10 rounded-2xl p-6 text-center">
//                 <h2 className="text-4xl font-bold text-white mb-2">₹{course.price.toLocaleString()}</h2>
//                 <p className="text-emerald-200 mb-6">One-time payment</p>
//                 <Button size="lg" className="w-full bg-white text-emerald-600 hover:bg-gray-100 font-semibold">
//                   Enroll Now
//                 </Button>
//                 <div className="mt-6 space-y-2 text-left text-sm text-emerald-200">
//                   {course.includes.map((item, index) => (
//                     <div key={index} className="flex items-center gap-2">
//                       <Check className="w-4 h-4 text-emerald-300" />
//                       <span>{item}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* What You'll Learn & Instructor */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
//           <div className="lg:col-span-2">
//             <h2 className="text-2xl font-bold mb-6">What You'll Learn</h2>
//             <div className="space-y-3">
//               {course.whatYouLearn.map((skill, index) => (
//                 <div key={index} className="flex items-start gap-3 p-4 bg-card rounded-lg border">
//                   <Check className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
//                   <span className="text-muted-foreground">{skill}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <Card className="lg:col-span-1">
//             <CardContent className="p-6">
//               <h3 className="text-xl font-bold mb-4">Your Instructor</h3>
//               <img
//                 src={course.instructor.avatar}
//                 alt={course.instructor.name}
//                 className="w-20 h-20 rounded-full mx-auto mb-4"
//               />
//               <h4 className="text-lg font-semibold text-center mb-2">{course.instructor.name}</h4>
//               <p className="text-center text-sm text-muted-foreground mb-4">UI/UX Expert</p>
//               <p className="text-sm text-muted-foreground text-center">{course.instructor.bio}</p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Course Overview */}
//         <section className="mb-8">
//           <h2 className="text-2xl font-bold mb-6">Course Overview</h2>
//           <div className="bg-card p-6 rounded-lg border">
//             <p className="text-lg text-muted-foreground leading-relaxed">{course.overview}</p>
//           </div>
//         </section>

//         {/* Course Curriculum */}
//         <section className="mb-8">
//           <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
//           <div className="space-y-4">
//             {course.curriculum.map((sec, index) => (
//               <Card key={index} className="bg-card border-emerald-100">
//                 <CardContent className="p-0">
//                   <div className="p-6 border-b border-emerald-200">
//                     <h3 className="text-lg font-semibold flex items-center gap-2">
//                       <Play className="w-5 h-5 text-emerald-500" />
//                       {sec.section}
//                     </h3>
//                   </div>
//                   <div className="p-6 space-y-2">
//                     {sec.subsections.map((sub, subIndex) => (
//                       <div key={subIndex} className="flex items-center gap-3 text-sm text-muted-foreground">
//                         <Download className="w-4 h-4 text-emerald-500 flex-shrink-0" />
//                         {sub}
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default CourseDetail;






// import React, { useState, useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
// import { Navigation } from "@/components/Navbar";
// import { Footer } from "@/components/Footer";
// import { Star, Check, User, Clock, Play, Download, Eye, FileText } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import toast from "react-hot-toast";
// import { courseService } from "@/service/course.service"; // Adjust the import path as needed

// const CourseDetail = () => {
//   const { courseId } = useParams();
//   const [course, setCourse] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isEnrolled, setIsEnrolled] = useState(false);
//   const [completedVideos, setCompletedVideos] = useState([]);
//   const [progress, setProgress] = useState(0);
//   const [showPdfViewer, setShowPdfViewer] = useState(false);

//   // Assuming token and user come from context or auth hook
//   // For this example, we'll mock them as null/undefined; integrate with your auth context
//   const token = null; // Replace with useAuth() or similar
//   const user = null; // Replace with useAuth() or similar

//   const fetchCourseDetails = async () => {
//     if (!courseId) return;

//     try {
//       setIsLoading(true);
//       const res = await courseService.getCourseDetails(courseId);
//       const data = Array.isArray(res?.data) ? res.data[0] : res?.data?.[0] || res?.data;
//       if (!data) {
//         toast.error("Course not found.");
//         setCourse(null);
//         return;
//       }

//       // Map API data to component structure
//       const mappedCourse = {
//         id: data._id,
//         title: data.courseName,
//         description: data.courseDescription,
//         price: data.finalPrice,
//         originalPrice: data.originalPrice,
//         discountPercent: data.discountPercent,
//         rating: 4.5, // Default rating as ratingAndReviews is not present in this response
//         reviews: 0, // No reviews data
//         students: data.studentsEnrolled.length,
//         duration: data.courseDuration,
//         level: data.courseLevel,
//         instructor: {
//           name: "Manish Keer", // Hardcoded based on previous context; ideally fetch by ID
//           bio: "Experienced digital marketing instructor.",
//           avatar: "https://api.dicebear.com/6.x/initials/svg?seed=Manish+Keer",
//         },
//         whatYouLearn: data.whatYouWillLearn 
//           ? data.whatYouWillLearn.split("\r\n\r\n").filter(item => item.trim()) 
//           : [],
//         overview: data.courseOverview || data.courseDescription,
//         includes: [
//           `${data.courseDuration} of video content`,
//           "Lifetime access",
//           "Certificate of completion",
//           "Downloadable resources",
//         ],
//         curriculum: data.courseContent 
//           ? data.courseContent.map(section => ({
//               section: section.sectionName,
//               subsections: section.subSection || [], // Now subSection is array of objects with title and description
//             }))
//           : [],
//         category: data.category?.name || "Uncategorized",
//         thumbnail: data.thumbnail,
//         brochure: data.brochures, // Brochure URL
//       };

//       setCourse(mappedCourse);

//       // Check if user is enrolled (if token and user available)
//       if (token && user) {
//         const isUserEnrolled = data.studentsEnrolled?.includes(user._id);
//         setIsEnrolled(isUserEnrolled);

//         if (isUserEnrolled) {
//           try {
//             const progressRes = await courseService.getFullCourseDetails(courseId, token);
//             const completed = progressRes.data?.completedVideos || [];
//             setCompletedVideos(completed);
//             const totalVideos = data.courseContent?.reduce((total, section) => 
//               total + (section.subSection?.length || 0), 0) || 0;
//             setProgress(totalVideos > 0 ? (completed.length / totalVideos) * 100 : 0);
//           } catch (error) {
//             console.log('Could not fetch progress:', error);
//             setProgress(0);
//           }
//         }
//       }
//     } catch (error) {
//       console.error("Failed to fetch course details:", error);
//       toast.error(error?.response?.data?.message || "Failed to load course. Unable to fetch course details.");
//       setCourse(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handlePreviewBrochure = () => {
//     if (course.brochure) {
//       const googleDocsUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(course.brochure)}&embedded=true`;
//       window.open(googleDocsUrl, '_blank');
//     } else {
//       toast.error("Brochure not available.");
//     }
//   };

//   const handleDownloadBrochure = async () => {
//     if (!course.brochure) {
//       toast.error("Brochure not available.");
//       return;
//     }

//     try {
//       const response = await fetch(course.brochure);
//       const blob = await response.blob();
//       const downloadUrl = URL.createObjectURL(blob);
//       const filename = `${course.title.replace(/[^a-z0-9]/gi, '_')}_brochure.pdf`;

//       const link = document.createElement('a');
//       link.href = downloadUrl;
//       link.download = filename;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);

//       setTimeout(() => {
//         URL.revokeObjectURL(downloadUrl);
//       }, 100);
//     } catch (error) {
//       toast.error("Failed to download brochure.");
//     }
//   };

//   useEffect(() => {
//     fetchCourseDetails();
//   }, [courseId]);

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Navigation />
//         <main className="container mx-auto px-4 pt-8 pb-20">
//           <div className="text-center py-12">
//             <p className="text-muted-foreground">Loading course details...</p>
//           </div>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   if (!course) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Navigation />
//         <main className="container mx-auto px-4 pt-8 pb-20">
//           <div className="text-center py-12">
//             <p className="text-muted-foreground">Course not found.</p>
//           </div>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Navigation />
//       <main className="container mx-auto px-4 pt-8 pb-20">
//         {/* Breadcrumb */}
//         <div className="mb-6">
//           <Link to="/courses" className="text-emerald-600 hover:underline flex items-center">
//             ← Back to Courses
//           </Link>
//           <div className="text-sm text-muted-foreground mt-1">{course.category}</div>
//         </div>

//         {/* Hero Section */}
//         <section className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-3xl p-8 mb-8 relative overflow-hidden">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
//             <div className="lg:col-span-2">
//               <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
//               <p className="text-lg mb-6 leading-relaxed">{course.description}</p>
//               <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
//                 <div className="flex items-center gap-1">
//                   <Star className="w-4 h-4 fill-current text-yellow-300" />
//                   <span>{course.rating.toFixed(1)} ({course.reviews} reviews)</span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <User className="w-4 h-4" />
//                   <span>{course.students} students</span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <Clock className="w-4 h-4" />
//                   <span>{course.duration}</span>
//                 </div>
//                 <span className="capitalize bg-emerald-700 px-3 py-1 rounded-full">{course.level}</span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <img
//                   src={course.instructor.avatar}
//                   alt={course.instructor.name}
//                   className="w-12 h-12 rounded-full"
//                 />
//                 <div>
//                   <p className="font-semibold">Instructor</p>
//                   <p className="text-sm">{course.instructor.name}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="lg:text-right">
//               <div className="bg-white/10 rounded-2xl p-6 text-center">
//                 <h2 className="text-4xl font-bold text-white mb-2">₹{course.price.toLocaleString()}</h2>
//                 {course.originalPrice > course.price && (
//                   <p className="text-emerald-200 mb-2">
//                     <span className="line-through text-sm">₹{course.originalPrice.toLocaleString()}</span>
//                     <span className="ml-2 text-yellow-300">-{course.discountPercent}%</span>
//                   </p>
//                 )}
//                 <p className="text-emerald-200 mb-6">One-time payment</p>
//                 {isEnrolled ? (
//                   <Button size="lg" className="w-full bg-white text-emerald-600 hover:bg-gray-100 font-semibold" disabled>
//                     Already Enrolled
//                   </Button>
//                 ) : (
//                   <Button size="lg" className="w-full bg-white text-emerald-600 hover:bg-gray-100 font-semibold">
//                     Enroll Now
//                   </Button>
//                 )}
//                 <div className="mt-6 space-y-2 text-left text-sm text-emerald-200">
//                   {course.includes.map((item, index) => (
//                     <div key={index} className="flex items-center gap-2">
//                       <Check className="w-4 h-4 text-emerald-300" />
//                       <span>{item}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* What You'll Learn & Instructor */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
//           <div className="lg:col-span-2">
//             <h2 className="text-2xl font-bold mb-6">What You'll Learn</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {course.whatYouLearn.map((skill, index) => (
//                 <div key={index} className="flex items-start gap-3 p-4 bg-card rounded-lg border">
//                   <Check className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
//                   <span className="text-muted-foreground">{skill}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <Card className="lg:col-span-1">
//             <CardContent className="p-6">
//               <h3 className="text-xl font-bold mb-4">Your Instructor</h3>
//               <img
//                 src={course.instructor.avatar}
//                 alt={course.instructor.name}
//                 className="w-20 h-20 rounded-full mx-auto mb-4"
//               />
//               <h4 className="text-lg font-semibold text-center mb-2">{course.instructor.name}</h4>
//               <p className="text-center text-sm text-muted-foreground mb-4">Expert Instructor</p>
//               <p className="text-sm text-muted-foreground text-center">{course.instructor.bio}</p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Course Overview */}
//         <section className="mb-8">
//           <h2 className="text-2xl font-bold mb-6">Course Overview</h2>
//           <div className="bg-card p-6 rounded-lg border">
//             <p className="text-lg text-muted-foreground leading-relaxed">{course.overview}</p>
//           </div>
//         </section>

//         {/* Course Curriculum */}
//         <section className="mb-8">
//           <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
//           <div className="space-y-4">
//             {course.curriculum.map((sec, index) => (
//               <Card key={index} className="bg-card border-emerald-100">
//                 <CardContent className="p-0">
//                   <div className="p-6 border-b border-emerald-200">
//                     <h3 className="text-lg font-semibold flex items-center gap-2">
//                       <Play className="w-5 h-5 text-emerald-500" />
//                       {sec.section}
//                     </h3>
//                   </div>
//                   <div className="p-6 space-y-2">
//                     {sec.subsections.length > 0 ? (
//                       sec.subsections.map((sub, subIndex) => (
//                         <div key={subIndex} className="flex items-start gap-3 text-sm text-muted-foreground">
//                           <Download className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-1" />
//                           <div className="flex-1 min-w-0">
//                             <span className="font-medium block text-foreground">{sub.title}</span>
//                             <p className="text-xs text-muted-foreground mt-1">{sub.description}</p>
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="text-sm text-muted-foreground italic">Subsections not available yet.</p>
//                     )}
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </section>

//         {/* Course Materials: Thumbnail and Brochure */}
//         <section className="mb-8">
//           <h2 className="text-2xl font-bold mb-6">Course Materials</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Thumbnail Preview */}
//             <Card className="bg-card border-emerald-100">
//               <CardContent className="p-6">
//                 <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
//                   <FileText className="w-5 h-5 text-emerald-500" />
//                   Course Thumbnail
//                 </h3>
//                 <div className="relative">
//                   <img
//                     src={course.thumbnail}
//                     alt={`${course.title} thumbnail`}
//                     className="w-full h-64 object-cover rounded-lg"
//                     onError={(e) => {
//                       e.currentTarget.src = 'https://via.placeholder.com/400x300/ECECEC/9CA3AF?text=No+Image';
//                     }}
//                   />
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Brochure Preview and Download */}
//             <Card className="bg-card border-emerald-100">
//               <CardContent className="p-6">
//                 <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
//                   <FileText className="w-5 h-5 text-emerald-500" />
//                   Course Brochure
//                 </h3>
//                 {course.brochure ? (
//                   <div className="space-y-4">
//                     <div className="p-4 border border-border rounded-lg bg-muted/30">
//                       <div className="flex items-center justify-between mb-3">
//                         <div className="flex items-center space-x-2">
//                           <FileText className="w-5 h-5 text-emerald-500" />
//                           <span className="text-sm font-medium">Course Brochure.pdf</span>
//                         </div>
//                         <div className="flex gap-2">
//                           <Button
//                             size="sm"
//                             variant="outline"
//                             onClick={() => setShowPdfViewer(!showPdfViewer)}
//                           >
//                             <Eye className="w-4 h-4 mr-1" />
//                             {showPdfViewer ? 'Hide Preview' : 'Show Preview'}
//                           </Button>
//                           <Button
//                             size="sm"
//                             variant="outline"
//                             onClick={handleDownloadBrochure}
//                           >
//                             <Download className="w-4 h-4 mr-1" />
//                             Download
//                           </Button>
//                         </div>
//                       </div>
//                     </div>
//                     {showPdfViewer && (
//                       <div className="mt-4 border border-border rounded-lg overflow-hidden">
//                         <iframe
//                           src={`https://docs.google.com/viewer?url=${encodeURIComponent(course.brochure)}&embedded=true`}
//                           width="100%"
//                           height="600px"
//                           title="PDF Preview"
//                           className="w-full"
//                         />
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <div className="text-center py-12">
//                     <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
//                     <p className="text-sm text-muted-foreground">Brochure not available yet.</p>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default CourseDetail;







import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Navigation } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Star, Check, User, Clock, ChevronDown, Circle, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import toast from "react-hot-toast";
import { courseService } from "@/service/course.service"; // Adjust the import path as needed

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [completedVideos, setCompletedVideos] = useState([]);
  const [progress, setProgress] = useState(0);
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [expandedSections, setExpandedSections] = useState(new Set());

  // Assuming token and user come from context or auth hook
  // For this example, we'll mock them as null/undefined; integrate with your auth context
  const token = null; // Replace with useAuth() or similar
  const user = null; // Replace with useAuth() or similar

  const fetchCourseDetails = async () => {
    if (!courseId) return;

    try {
      setIsLoading(true);
      const res = await courseService.getCourseDetails(courseId);
      const data = Array.isArray(res?.data) ? res.data[0] : res?.data?.[0] || res?.data;
      if (!data) {
        toast.error("Course not found.");
        setCourse(null);
        return;
      }

      // Map API data to component structure
      const mappedCourse = {
        id: data._id,
        title: data.courseName,
        description: data.courseDescription,
        price: data.finalPrice,
        originalPrice: data.originalPrice,
        discountPercent: data.discountPercent,
        rating: 4.5, // Default rating as ratingAndReviews is not present in this response
        reviews: 0, // No reviews data
        students: data.studentsEnrolled.length,
        duration: data.courseDuration,
        level: data.courseLevel,
        instructor: {
          name: "Manish Keer", // Hardcoded based on previous context; ideally fetch by ID
          bio: "Experienced digital marketing instructor.",
          avatar: "https://api.dicebear.com/6.x/initials/svg?seed=Manish+Keer",
        },
        whatYouLearn: data.whatYouWillLearn 
          ? data.whatYouWillLearn.split("\r\n\r\n").filter(item => item.trim()) 
          : [],
        overview: data.courseOverview || data.courseDescription,
        includes: [
          `${data.courseDuration} of video content`,
          "Lifetime access",
          "Certificate of completion",
          "Downloadable resources",
        ],
        curriculum: data.courseContent 
          ? data.courseContent.map(section => ({
              section: section.sectionName,
              subsections: section.subSection || [], // Now subSection is array of objects with title and description
            }))
          : [],
        category: data.category?.name || "Uncategorized",
        thumbnail: data.thumbnail,
        brochure: data.brochures, // Brochure URL
      };

      setCourse(mappedCourse);

      // Check if user is enrolled (if token and user available)
      if (token && user) {
        const isUserEnrolled = data.studentsEnrolled?.includes(user._id);
        setIsEnrolled(isUserEnrolled);

        if (isUserEnrolled) {
          try {
            const progressRes = await courseService.getFullCourseDetails(courseId, token);
            const completed = progressRes.data?.completedVideos || [];
            setCompletedVideos(completed);
            const totalVideos = data.courseContent?.reduce((total, section) => 
              total + (section.subSection?.length || 0), 0) || 0;
            setProgress(totalVideos > 0 ? (completed.length / totalVideos) * 100 : 0);
          } catch (error) {
            console.log('Could not fetch progress:', error);
            setProgress(0);
          }
        }
      }
    } catch (error) {
      console.error("Failed to fetch course details:", error);
      toast.error(error?.response?.data?.message || "Failed to load course. Unable to fetch course details.");
      setCourse(null);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSection = (sectionIndex) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionIndex)) {
      newExpanded.delete(sectionIndex);
    } else {
      newExpanded.add(sectionIndex);
    }
    setExpandedSections(newExpanded);
  };

  const handlePreviewBrochure = () => {
    if (course.brochure) {
      const googleDocsUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(course.brochure)}&embedded=true`;
      window.open(googleDocsUrl, '_blank');
    } else {
      toast.error("Brochure not available.");
    }
  };

  const handleDownloadBrochure = async () => {
    if (!course.brochure) {
      toast.error("Brochure not available.");
      return;
    }

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

      setTimeout(() => {
        URL.revokeObjectURL(downloadUrl);
      }, 100);
    } catch (error) {
      toast.error("Failed to download brochure.");
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 pt-8 pb-20">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading course details...</p>
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
        <main className="container mx-auto px-4 pt-8 pb-20">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Course not found.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 pt-8 pb-20">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/courses" className="text-emerald-600 hover:underline flex items-center">
            ← Back to Courses
          </Link>
          <div className="text-sm text-muted-foreground mt-1">{course.category}</div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-3xl p-8 mb-8 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg mb-6 leading-relaxed">{course.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current text-yellow-300" />
                  <span>{course.rating.toFixed(1)} ({course.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{course.students} students</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <span className="capitalize bg-emerald-700 px-3 py-1 rounded-full">{course.level}</span>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold">Instructor</p>
                  <p className="text-sm">{course.instructor.name}</p>
                </div>
              </div>
            </div>
            <div className="lg:text-right">
              <div className="bg-white/10 rounded-2xl p-6 text-center">
                <h2 className="text-4xl font-bold text-white mb-2">₹{course.price.toLocaleString()}</h2>
                {course.originalPrice > course.price && (
                  <p className="text-emerald-200 mb-2">
                    <span className="line-through text-sm">₹{course.originalPrice.toLocaleString()}</span>
                    <span className="ml-2 text-yellow-300">-{course.discountPercent}%</span>
                  </p>
                )}
                <p className="text-emerald-200 mb-6">One-time payment</p>
                {isEnrolled ? (
                  <Button size="lg" className="w-full bg-white text-emerald-600 hover:bg-gray-100 font-semibold" disabled>
                    Already Enrolled
                  </Button>
                ) : (
                  <Button size="lg" className="w-full bg-white text-emerald-600 hover:bg-gray-100 font-semibold">
                    Enroll Now
                  </Button>
                )}
                <div className="mt-6 space-y-2 text-left text-sm text-emerald-200">
                  {course.includes.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What You'll Learn & Instructor */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">What You'll Learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {course.whatYouLearn.map((skill, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-card rounded-lg border">
                  <Check className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">{skill}</span>
                </div>
              ))}
            </div>
          </div>
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Your Instructor</h3>
              <img
                src={"https://res.cloudinary.com/manish19/image/upload/v1754281006/spring/message/z02pyvwzppot0o9wqoe4.jpg"}
                alt={course.instructor.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <h4 className="text-lg font-semibold text-center mb-2">{course.instructor.name}</h4>
              <p className="text-center text-sm text-muted-foreground mb-4">Expert Instructor</p>
              <p className="text-sm text-muted-foreground text-center">{course.instructor.bio}</p>
            </CardContent>
          </Card>
        </div>

        {/* Course Overview */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Course Overview</h2>
          <div className="bg-card p-6 rounded-lg border">
            <p className="text-lg text-muted-foreground leading-relaxed">{course.overview}</p>
          </div>
        </section>

        {/* Course Curriculum */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
          <div className="space-y-4">
            {course.curriculum.map((sec, index) => {
              const isExpanded = expandedSections.has(index);
              return (
                <Card key={index} className="bg-card border-emerald-100">
                  <CardContent className="p-0">
                    <div 
                      className="p-6 border-b border-emerald-200 cursor-pointer flex items-center justify-between"
                      onClick={() => toggleSection(index)}
                    >
                      <h3 className="text-lg font-semibold flex-1">
                        {sec.section}
                      </h3>
                      <ChevronDown 
                        className={`w-5 h-5 text-emerald-500 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    </div>
                    {isExpanded && (
                      <div className="p-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
                        {sec.subsections.length > 0 ? (
                          sec.subsections.map((sub, subIndex) => {
                            const isCompleted = subIndex === 0; // Demo: first subsection completed
                            return (
                              <div key={subIndex} className="flex items-start gap-3 text-sm pl-6">
                                <Play 
                                  className={`w-3 h-3 mt-1 flex-shrink-0 transition-colors ${isCompleted ? 'text-emerald-500 fill-current' : 'text-muted-foreground'}`} 
                                />
                                <span className="font-medium text-foreground">{sub.title}</span>
                              </div>
                            );
                          })
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
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Course Materials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Thumbnail Preview */}
            <Card className="bg-card border-emerald-100">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-500" />
                  Course Thumbnail
                </h3>
                <div className="relative">
                  <img
                    src={course.thumbnail}
                    alt={`${course.title} thumbnail`}
                    className="w-full h-64 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/400x300/ECECEC/9CA3AF?text=No+Image';
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Brochure Preview and Download */}
            <Card className="bg-card border-emerald-100">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-500" />
                  Course Brochure
                </h3>
                {course.brochure ? (
                  <div className="space-y-4">
                    <div className="p-4 border border-border rounded-lg bg-muted/30">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Check className="w-5 h-5 text-emerald-500" />
                          <span className="text-sm font-medium">Course Brochure.pdf</span>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setShowPdfViewer(!showPdfViewer)}
                          >
                            <Check className="w-4 h-4 mr-1" />
                            {showPdfViewer ? 'Hide Preview' : 'Show Preview'}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleDownloadBrochure}
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                    {showPdfViewer && (
                      <div className="mt-4 border border-border rounded-lg overflow-hidden">
                        <iframe
                          src={`https://docs.google.com/viewer?url=${encodeURIComponent(course.brochure)}&embedded=true`}
                          width="100%"
                          height="600px"
                          title="PDF Preview"
                          className="w-full"
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Check className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Brochure not available yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CourseDetail;