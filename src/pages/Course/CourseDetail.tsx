

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Navigation } from "@/components/Navbar";
// import { Footer } from "@/components/Footer";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Play, Clock, Users, Award, Star, ArrowLeft, Loader2, CheckCircle, Lock, Download, FileText, Eye, X } from "lucide-react";
// import { courseService } from "@/service/course.service";
// import toast from "react-hot-toast";
// import { useAppSelector, useAppDispatch } from '@/hooks/redux';
// import { loginSuccess } from '@/store/authSlice';
// import CourseEnrollment from './CourseEnrollment';
// import CourseSignupForm from '../CourseSignupForm';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Progress } from "@/components/ui/progress";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Input } from "@/components/ui/input";
// import { useForm } from "react-hook-form";
// import { useToast } from "@/components/ui/use-toast";
// import { authService } from "@/service/auth.service";
// import { brochures, downloadBrochure, downloadAllBrochures } from "@/utils/brochures";
// import type { Brochure } from "@/utils/brochures";

// const CourseDetail = () => {
//   const { courseId } = useParams();
//   const navigate = useNavigate();
//   const { token, user } = useAppSelector((state) => state.auth);
  
//   const [course, setCourse] = useState<any | null>(null);
//   const [completedVideos, setCompletedVideos] = useState<string[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isEnrolled, setIsEnrolled] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [showSignupModal, setShowSignupModal] = useState(false);
//   const [previewBrochure, setPreviewBrochure] = useState<Brochure | null>(null);
//   const [activeTab, setActiveTab] = useState("overview");

//   const fetchCourseDetails = async () => {
//     if (!courseId) return;
    
//     try {
//       setIsLoading(true);
//       const res = await courseService.getCourseDetails(courseId);
//       const data = Array.isArray(res?.data) ? res.data[0] : res?.data?.[0] || res?.data;
//       setCourse(data || null);
      
//       // Check if user is enrolled
//       if (token && user) {
//         const isUserEnrolled = data?.studentsEnrolled?.includes(user._id) || 
//                               data?.studentsEnroled?.includes(user._id); // Handle typo
//         setIsEnrolled(isUserEnrolled);
        
//         if (isUserEnrolled) {
//           // Fetch progress if enrolled
//           try {
//             const progressRes = await courseService.getFullCourseDetails(courseId, token);
//             const completed = progressRes.data?.completedVideos || [];
//             setCompletedVideos(completed);
//             const totalVideos = data?.courseContent?.reduce((total: number, section: any) => 
//               total + (section.subSection?.length || 0), 0) || 0;
//             setProgress(totalVideos > 0 ? (completed.length / totalVideos) * 100 : 0);
//           } catch (error) {
//             console.log('Could not fetch progress:', error);
//             setProgress(0);
//           }
//         }
//       }
//     } catch (error: any) {
//       toast.error(error?.response?.data?.message || "Failed to load course. Unable to fetch course details.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleEnroll = () => {
//     if (!token || !user) {
//       setShowSignupModal(true);
//       return;
//     }
//     // Trigger enrollment by scrolling to and focusing on the enrollment component
//     const enrollmentElement = document.querySelector('[data-enrollment-component]');
//     if (enrollmentElement) {
//       enrollmentElement.scrollIntoView({ behavior: 'smooth' });
//       const enrollButton = enrollmentElement.querySelector('button');
//       if (enrollButton) {
//         enrollButton.click();
//       }
//     }
//   };

//   const refreshCourse = () => {
//     fetchCourseDetails();
//     setShowSignupModal(false);
//   };

//   useEffect(() => {
//     fetchCourseDetails();
//   }, [courseId, token]);

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
//         <Navigation />
//         <main className="container mx-auto px-4 pt-32 pb-20 flex items-center justify-center">
//           <div className="text-center">
//             <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
//             <p className="text-sm sm:text-lg">Loading course details...</p>
//           </div>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   if (!course) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
//         <Navigation />
//         <main className="container mx-auto px-4 pt-32 pb-20 text-center">
//           <h1 className="text-lg sm:text-2xl font-bold mb-4">Course not found</h1>
//           <Button onClick={() => navigate('/all-courses')} variant="outline">
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Back to Courses
//           </Button>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   // Dummy reviews if no real reviews exist
//   const dummyReviews = [
//     {
//       _id: 'dummy1',
//       user: { fullNamme: 'Sarah Johnson' },
//       rating: 5,
//       review: 'Excellent course! The content is well-structured and easy to follow. Highly recommend for beginners.'
//     },
//     {
//       _id: 'dummy2', 
//       user: { fullNamme: 'Mike Chen' },
//       rating: 4,
//       review: 'Great learning experience. The instructor explains concepts clearly and provides practical examples.'
//     },
//     {
//       _id: 'dummy3',
//       user: { fullNamme: 'Emily Davis' },
//       rating: 5,
//       review: 'This course exceeded my expectations. The hands-on projects really helped me understand the material.'
//     }
//   ];

//   const reviews = (course?.ratingAndReviews && course.ratingAndReviews.length > 0) 
//     ? course.ratingAndReviews 
//     : dummyReviews;

//   const averageRating = reviews.length > 0
//     ? Math.round((reviews.reduce((a: number, r: any) => a + (r?.rating || 0), 0) / reviews.length) * 10) / 10
//     : 4.5;

//   const whatYouWillLearnList = course.whatYouWillLearn ? course.whatYouWillLearn.split('\n').filter(item => item.trim()) : [];
//   return (
    
//     <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
//       <Navigation />

//       <main className="container mx-auto px-4 pt-32 pb-20">
//         <Button 
//           onClick={() => navigate('/all-courses')} 
//           variant="ghost" 
//           className="mb-6"
//         >
//           <ArrowLeft className="w-4 h-4 mr-2" />
//           Back to Courses
//         </Button>

//         <div className="grid lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2 space-y-8">
//             <div>
//               <div className="flex flex-wrap gap-2 mb-4">
//                 <Badge>{course?.category?.name || "Course"}</Badge>
//               </div>
//               <h1 className="text-2xl md:text-5xl font-bold mb-4 text-gradient">
//                 {course?.courseName || "Course"}
//               </h1>
//               <p className="text-base md:text-lg text-muted-foreground mb-6">
//                 {course?.courseDescription || ""}
//               </p>
//               <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm">
//                 <div className="flex items-center gap-2">
//                   <Star className="w-5 h-5 fill-primary text-primary" />
//                   <span className="font-semibold">{averageRating}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Users className="w-5 h-5 text-primary" />
//                   <span>{course?.studentsEnrolled?.length || 0} students</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Clock className="w-5 h-5 text-primary" />
//                   <span>Self-paced</span>
//                 </div>
//               </div>
//             </div>

//             {isEnrolled ? (
//               <Card className="aspect-video relative overflow-hidden group cursor-pointer hover-lift smooth-transition">
//                 <div 
//                   className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative"
//                   onClick={() => navigate(`/course-learning/${courseId}`)}
//                 >
//                   {course?.thumbnail && (
//                     <img 
//                       src={course.thumbnail} 
//                       alt={course.courseName}
//                       className="absolute inset-0 w-full h-full object-cover"
//                     />
//                   )}
//                   <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                
//                   <div className="absolute bottom-4 left-4 right-4 text-white">
//                     <p className="text-lg font-semibold">Continue Learning</p>
//                     <p className="text-sm opacity-80">Resume your progress</p>
//                   </div>
//                 </div>
//               </Card>
//             ) : (
//               <Card className="aspect-video relative overflow-hidden group cursor-pointer hover-lift smooth-transition">
//                 <div 
//                   className="w-full h-full relative"
//                   onClick={handleEnroll}
//                 >
//                   {course?.thumbnail ? (
//                     <img 
//                       src={course.thumbnail} 
//                       alt={course.courseName}
//                       className="absolute inset-0 w-full h-full object-cover"
//                     />
//                   ) : (
//                     <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
//                   )}
//                   <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <div className="text-center text-white">
                      
//                         <>
//                           <p className="text-lg font-semibold mb-2">Enroll Now</p>
//                           <p className="text-sm opacity-80">Click to start learning</p>
//                         </>
                    
//                     </div>
//                   </div>
//                 </div>
              
//               </Card>
//             )}

//             <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//               <TabsList>
//                 <TabsTrigger value="overview">Overview</TabsTrigger>
//                 <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
//                 <TabsTrigger value="brochures">Brochures</TabsTrigger>
//                 <TabsTrigger value="instructor">Instructor</TabsTrigger>
//                 <TabsTrigger value="reviews">Reviews</TabsTrigger>
//               </TabsList>

//               <TabsContent value="overview" className="mt-6">
//                 <Card className="p-6">
//                   <h3 className="text-2xl font-bold mb-4">What you'll learn</h3>
//                   <ul className="space-y-3">
//                     {whatYouWillLearnList.map((item: string, i: number) => (
//                       <li key={i} className="flex items-start gap-3">
//                         <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
//                         <span className="text-sm">{item}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </Card>
//               </TabsContent>

//               <TabsContent value="curriculum" className="mt-6">
//                 <Card className="p-6">
//                   <div className="space-y-6">
//                     {(course?.courseContent || []).map((section: any, sectionIndex: number) => {
//                       const sectionLessons = section.subSection || [];
//                       const previewLessons = isEnrolled ? sectionLessons : sectionLessons.slice(0, 2);
//                       const isPreview = !isEnrolled && sectionLessons.length > 2;
                      
//                       return (
//                         <div key={section._id} className="border-b border-border pb-6 last:border-b-0">
//                           <div className="flex items-center justify-between mb-4">
//                             <h4 className="text-lg font-semibold flex items-center gap-2">
//                               Section {sectionIndex + 1}: {section.sectionName}
//                             </h4>
//                             <Badge variant={isEnrolled ? "secondary" : "outline"} className="text-xs">
//                               {previewLessons.length} lessons {isPreview ? '+ more' : ''}
//                             </Badge>
//                           </div>
//                           <div className="space-y-3">
//                             {previewLessons.map((subSection: any, lessonIndex: number) => {
//                               const isCompleted = isEnrolled && completedVideos.includes(subSection._id);
//                               const icon = isCompleted ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Play className="w-4 h-4 text-muted-foreground" />;
                              
//                               return (
//                                 <div key={subSection._id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-default">
//                                   <div className="flex-shrink-0">
//                                     {isEnrolled ? icon : <Play className="w-4 h-4 text-muted-foreground" />}
//                                   </div>
//                                   <div className="flex-1 min-w-0">
//                                     <p className="font-medium text-sm truncate">{subSection.title}</p>
//                                     {subSection.description && (
//                                       <p className="text-xs text-muted-foreground truncate">{subSection.description}</p>
//                                     )}
//                                   </div>
//                                   <div className="flex items-center gap-1 text-xs text-muted-foreground">
//                                     <Clock className="w-3 h-3" />
//                                     {subSection.timeDuration ? `${Math.floor(subSection.timeDuration / 60)}:${(subSection.timeDuration % 60).toString().padStart(2, '0')}` : '—'}
//                                   </div>
//                                   {!isEnrolled && (
//                                     <Badge variant="outline" className="ml-auto text-xs flex-shrink-0">
//                                       Preview
//                                     </Badge>
//                                   )}
//                                 </div>
//                               );
//                             })}
//                             {isPreview && (
//                               <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
//                                 <span className="text-sm text-muted-foreground">+{sectionLessons.length - 2} more lessons</span>
//                                 <Badge variant="outline" className="text-xs">Enroll to unlock</Badge>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </Card>
//               </TabsContent>

//               <TabsContent value="brochures" className="mt-6">
//                 <Card className="p-6">
//                   <div className="flex items-center justify-between mb-6">
//                     <div>
//                       <h3 className="text-2xl font-bold mb-2">Course Materials</h3>
//                       <p className="text-muted-foreground">
//                         Download comprehensive course materials and guides to enhance your learning experience.
//                       </p>
//                     </div>
//                     <Button 
//                       onClick={async () => {
//                         toast.success('Downloading all materials...');
//                         const result = await downloadAllBrochures();
//                         if (result.success > 0) {
//                           toast.success(`Downloaded ${result.success} materials successfully!`);
//                         }
//                         if (result.failed > 0) {
//                           toast.error(`Failed to download ${result.failed} materials`);
//                         }
//                       }}
//                       className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
//                     >
//                       <Download className="w-4 h-4" />
//                       Download All ({brochures.length})
//                     </Button>
//                   </div>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {brochures.map((brochure, index) => (
//                       <Card key={brochure.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
//                         <div 
//                           className="aspect-[4/3] relative overflow-hidden cursor-pointer bg-gradient-to-br from-primary/5 to-secondary/5"
//                           onClick={() => setPreviewBrochure(brochure)}
//                         >
//                           <img 
//                             src={brochure.imageUrl} 
//                             alt={brochure.name}
//                             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                           />
//                           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
//                           <div className="absolute top-3 left-3">
//                             <Badge className="bg-primary/90 text-white border-0">
//                               #{index + 1}
//                             </Badge>
//                           </div>
//                           <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                             <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
//                               <Eye className="w-6 h-6 text-primary" />
//                             </div>
//                           </div>
//                         </div>
                        
//                         <div className="p-4">
//                           <h4 className="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
//                             {brochure.name}
//                           </h4>
//                           <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
//                             {brochure.description}
//                           </p>
                          
//                           <div className="flex gap-2">
//                             <Button 
//                               size="sm" 
//                               variant="outline"
//                               onClick={() => setPreviewBrochure(brochure)}
//                               className="flex-1 flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-colors"
//                             >
//                               <Eye className="w-4 h-4" />
//                               Preview
//                             </Button>
//                             <Button 
//                               size="sm" 
//                               onClick={async () => {
//                                 const success = await downloadBrochure(brochure);
//                                 if (success) {
//                                   toast.success(`Downloaded ${brochure.name}`);
//                                 } else {
//                                   toast.error('Failed to download material');
//                                 }
//                               }}
//                               className="flex-1 bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2"
//                             >
//                               <Download className="w-4 h-4" />
//                               Download
//                             </Button>
//                           </div>
//                         </div>
//                       </Card>
//                     ))}
//                   </div>
//                 </Card>
//               </TabsContent>

//               <TabsContent value="instructor" className="mt-6">
//                 <Card className="p-6">
//                   <div className="flex items-center gap-4">
//                     <Avatar className="w-16 h-16">
//                       <AvatarImage src={course.instructor?.image} />
//                       <AvatarFallback>{course.instructor?.fullNamme?.charAt(0)}</AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <p className="font-bold text-lg">{course.instructor?.fullNamme}</p>
//                       <p className="text-sm text-muted-foreground">Course Instructor</p>
//                     </div>
//                   </div>
//                 </Card>
//               </TabsContent>

//               <TabsContent value="reviews" className="mt-6">
//                 <Card className="p-6">
//                   <div className="mb-6">
//                     <div className="flex items-center gap-4 mb-4">
//                       <div className="text-3xl font-bold">{averageRating}</div>
//                       <div>
//                         <div className="flex items-center gap-1 mb-1">
//                           {[1, 2, 3, 4, 5].map((star) => (
//                             <Star 
//                               key={star} 
//                               className={`w-5 h-5 ${star <= averageRating ? 'fill-primary text-primary' : 'text-muted-foreground'}`} 
//                             />
//                           ))}
//                         </div>
//                         <p className="text-sm text-muted-foreground">{reviews.length} reviews</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="space-y-6">
//                     {reviews.map((r: any) => (
//                       <div key={r._id} className="border-b pb-6 last:border-b-0">
//                         <div className="flex items-start gap-3">
//                           <Avatar className="w-10 h-10">
//                             <AvatarFallback>{r?.user?.fullNamme?.charAt(0) || 'A'}</AvatarFallback>
//                           </Avatar>
//                           <div className="flex-1">
//                             <div className="flex items-center gap-2 mb-2">
//                               <span className="font-semibold text-sm">{r?.user?.fullNamme || 'Anonymous'}</span>
//                               <div className="flex items-center gap-1">
//                                 {[1, 2, 3, 4, 5].map((star) => (
//                                   <Star 
//                                     key={star} 
//                                     className={`w-4 h-4 ${star <= r.rating ? 'fill-primary text-primary' : 'text-muted-foreground'}`} 
//                                   />
//                                 ))}
//                               </div>
//                             </div>
//                             <p className="text-sm text-muted-foreground leading-relaxed">{r?.review}</p>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </Card>
//               </TabsContent>
//             </Tabs>
//           </div>

//           <div className="lg:col-span-1 space-y-6">
//             {/* Brochures Section */}
//             <Card className="p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-semibold flex items-center gap-2">
//                   <FileText className="w-5 h-5 text-primary" />
//                   Course Materials
//                 </h3>
//                 <Button 
//                   size="sm"
//                   variant="outline"
//                   onClick={async () => {
//                     toast.success('Downloading all brochures...');
//                     const result = await downloadAllBrochures();
//                     if (result.success > 0) {
//                       toast.success(`Downloaded ${result.success} brochures!`);
//                     }
//                   }}
//                   className="flex items-center gap-1 text-xs"
//                 >
//                   <Download className="w-3 h-3" />
//                   All
//                 </Button>
//               </div>
//               <p className="text-sm text-muted-foreground mb-4">
//                 Download course brochures and materials
//               </p>
//               <div className="space-y-2">
//                 {brochures.slice(0, 3).map((brochure) => (
//                   <div key={brochure.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
//                     <div className="flex items-center gap-2 flex-1 min-w-0">
//                       <div 
//                         className="w-8 h-8 rounded cursor-pointer hover:scale-105 transition-transform flex-shrink-0 overflow-hidden"
//                         onClick={() => setPreviewBrochure(brochure)}
//                       >
//                         <img 
//                           src={brochure.imageUrl} 
//                           alt={brochure.name}
//                           className="w-full h-full object-cover rounded"
//                         />
//                       </div>
//                       <span className="text-sm truncate">{brochure.name}</span>
//                     </div>
//                     <div className="flex gap-1">
//                       <Button 
//                         size="sm" 
//                         variant="ghost"
//                         onClick={() => setPreviewBrochure(brochure)}
//                         className="flex-shrink-0 h-8 w-8 p-0"
//                       >
//                         <Eye className="w-3 h-3" />
//                       </Button>
//                       <Button 
//                         size="sm" 
//                         variant="ghost"
//                         onClick={async () => {
//                           const success = await downloadBrochure(brochure);
//                           if (success) {
//                             toast.success(`Downloaded ${brochure.name}`);
//                           } else {
//                             toast.error('Failed to download brochure');
//                           }
//                         }}
//                         className="flex-shrink-0 h-8 w-8 p-0"
//                       >
//                         <Download className="w-3 h-3" />
//                       </Button>
//                     </div>
//                   </div>
//                 ))}
//                 {brochures.length > 3 && (
//                   <div className="text-center pt-2">
//                     <Button 
//                       variant="ghost" 
//                       size="sm"
//                       onClick={() => {
//                         // Set active tab to brochures
//                         setActiveTab('brochures');
                        
//                         // Scroll to the tabs section after a short delay
//                         setTimeout(() => {
//                           const tabsContainer = document.querySelector('[role="tablist"]');
//                           if (tabsContainer) {
//                             tabsContainer.scrollIntoView({ 
//                               behavior: 'smooth', 
//                               block: 'start' 
//                             });
//                           }
//                         }, 100);
//                       }}
//                       className="text-xs text-primary hover:text-primary/80 transition-colors"
//                     >
//                       View all {brochures.length} materials →
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             </Card>

//             {isEnrolled ? (
//               <Card className="p-6 sticky top-24">
//                 <div className="mb-4">
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-sm font-medium">Progress</span>
//                     <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
//                   </div>
//                   <Progress value={progress} className="h-2" />
//                 </div>
//                 <Button 
//                   className="w-full bg-primary hover:bg-primary/90" 
//                   size="lg"
//                   onClick={() => navigate(`/course-learning/${courseId}`)}
//                 >
//                   <Play className="w-4 h-4 mr-2" />
//                   Continue Learning
//                 </Button>
//               </Card>
//             ) : (
//               <div data-enrollment-component>
                
                  
//                   <CourseEnrollment 
//                     course={course}
//                     isEnrolled={isEnrolled}
//                     onEnrollmentSuccess={() => {
//                       toast.success("🎉 Payment Successful! Welcome to the course! You can now start learning.");
//                       setIsEnrolled(true);
//                       setProgress(0);
//                       fetchCourseDetails();
//                       setTimeout(() => {
//                         window.location.reload();
//                       }, 2000);
//                     }}
//                     />
                
              
//               </div>
//             )}
//           </div>
//         </div>
//       </main>

//       <Footer />
      
//       {/* Personal Info Modal for Non-Logged Users */}
//       <Dialog open={showSignupModal} onOpenChange={setShowSignupModal}>
//         <DialogContent className="max-w-md">
//           <DialogHeader>
//             <DialogTitle className="text-center">Personal Information Required</DialogTitle>
//           </DialogHeader>
//           <EnrollmentSignupForm 
//             courseName={course?.courseName}
//             onSuccess={() => {
//               refreshCourse();
//               setTimeout(() => {
//                 const enrollmentElement = document.querySelector('[data-enrollment-component]');
//                 if (enrollmentElement) {
//                   enrollmentElement.scrollIntoView({ behavior: 'smooth' });
//                 }
//               }, 1000);
//             }}
//           />
//         </DialogContent>
//       </Dialog>

//       {/* Material Preview Modal */}
//       <Dialog open={!!previewBrochure} onOpenChange={() => setPreviewBrochure(null)}>
//         <DialogContent className="max-w-5xl max-h-[95vh] p-0 border-0">
//           {previewBrochure && (
//             <div className="relative bg-white rounded-lg overflow-hidden">
//               <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-primary/5 to-secondary/5">
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-lg overflow-hidden bg-white shadow-sm">
//                     <img 
//                       src={previewBrochure.imageUrl} 
//                       alt={previewBrochure.name}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-bold text-foreground">{previewBrochure.name}</h3>
//                     <p className="text-sm text-muted-foreground">{previewBrochure.description}</p>
//                   </div>
//                 </div>
//                 <Button 
//                   onClick={async () => {
//                     const success = await downloadBrochure(previewBrochure);
//                     if (success) {
//                       toast.success(`Downloaded ${previewBrochure.name}`);
//                     } else {
//                       toast.error('Failed to download material');
//                     }
//                   }}
//                   className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
//                 >
//                   <Download className="w-4 h-4" />
//                   Download
//                 </Button>
//               </div>
//               <div className="p-6 max-h-[75vh] overflow-auto bg-gray-50">
//                 <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//                   <img 
//                     src={previewBrochure.imageUrl} 
//                     alt={previewBrochure.name}
//                     className="w-full h-auto"
//                   />
//                 </div>
//               </div>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// // Personal info form component for course enrollment
// const EnrollmentSignupForm = ({ courseName, onSuccess }: { courseName?: string, onSuccess: () => void }) => {
//   const [step, setStep] = useState<'signup' | 'otp'>('signup');
//   const [formData, setFormData] = useState<any>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { toast } = useToast();
//   const dispatch = useAppDispatch();
  
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const sendOTP = async (data: any) => {
//     try {
//       setIsSubmitting(true);
//       await authService.sendOTP({ email: data.email });
//       setFormData(data);
//       setStep('otp');
//       toast({ 
//         title: "Verification code sent!", 
//         description: "Please check your email to complete verification." 
//       });
//     } catch (error: any) {
//       toast({ 
//         title: "Failed to send verification code", 
//         description: error?.response?.data?.message || "Please try again.", 
//         variant: "destructive" 
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const verifyAndSignup = async (data: any) => {
//     if (!formData || !data.otp) return;
    
//     try {
//       setIsSubmitting(true);
//       const response = await authService.signup({
//         ...formData,
//         otp: data.otp,
//         accountType: "Student",
//         additionalDetails: {
//           contactNumber: formData.contactNumber
//         }
//       });
      
//       // Auto-login the user with the returned token
//       if (response.token && response.user) {
//         dispatch(loginSuccess({ token: response.token, user: response.user }));
//         toast({ 
//           title: "Information completed!", 
//           description: "You can now enroll in the course." 
//         });
//       }
      
//       onSuccess();
//     } catch (error: any) {
//       toast({ 
//         title: "Failed to complete information", 
//         description: error?.response?.data?.message || "Invalid verification code. Please try again.", 
//         variant: "destructive" 
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const onSubmit = step === 'signup' ? sendOTP : verifyAndSignup;

//   return (
//     <div className="space-y-4">
//       {step === 'signup' && (
//         <div className="text-center mb-4">
//           <p className="text-sm text-muted-foreground">
//             Please fill in your personal information to enroll in <strong>{courseName}</strong>
//           </p>
//         </div>
//       )}
      
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         {step === 'signup' ? (
//           <>
//             <div className="space-y-2">
//               <Label htmlFor="fullName">Full Name</Label>
//               <Input
//                 id="fullName"
//                 placeholder="Enter your full name"
//                 {...register("fullName", {
//                   required: "Full name is required",
//                   minLength: { value: 2, message: "Name must be at least 2 characters" }
//                 })}
//                 className={errors.fullName ? "border-red-500" : ""}
//               />
//               {errors.fullName && (
//                 <p className="text-sm text-red-500">{errors.fullName.message}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="email">Email Address</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="Enter your email address"
//                 {...register("email", {
//                   required: "Email is required",
//                   pattern: {
//                     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                     message: "Invalid email address"
//                   }
//                 })}
//                 className={errors.email ? "border-red-500" : ""}
//               />
//               {errors.email && (
//                 <p className="text-sm text-red-500">{errors.email.message}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="password">Create Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 placeholder="Create a secure password"
//                 {...register("password", {
//                   required: "Password is required",
//                   minLength: { value: 6, message: "Password must be at least 6 characters" }
//                 })}
//                 className={errors.password ? "border-red-500" : ""}
//               />
//               {errors.password && (
//                 <p className="text-sm text-red-500">{errors.password.message}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="contactNumber">Phone Number</Label>
//               <Input
//                 id="contactNumber"
//                 type="tel"
//                 placeholder="Enter your phone number"
//                 {...register("contactNumber", {
//                   required: "Phone number is required",
//                   pattern: {
//                     value: /^[0-9]{10}$/,
//                     message: "Please enter a valid 10-digit phone number"
//                   }
//                 })}
//                 className={errors.contactNumber ? "border-red-500" : ""}
//               />
//               {errors.contactNumber && (
//                 <p className="text-sm text-red-500">{errors.contactNumber.message}</p>
//               )}
//             </div>
//           </>
//         ) : (
//           <>
//             <div className="text-center mb-4">
//               <p className="text-sm text-muted-foreground">
//                 Enter the 6-digit verification code sent to <strong>{formData?.email}</strong>
//               </p>
//             </div>
            
//             <div className="space-y-2">
//               <Label htmlFor="otp">Verification Code</Label>
//               <Input
//                 id="otp"
//                 placeholder="Enter 6-digit code"
//                 maxLength={6}
//                 {...register("otp", {
//                   required: "Verification code is required",
//                   pattern: {
//                     value: /^[0-9]{6}$/,
//                     message: "Please enter a valid 6-digit code"
//                   }
//                 })}
//                 className={`text-center text-lg tracking-widest ${errors.otp ? "border-red-500" : ""}`}
//               />
//               {errors.otp && (
//                 <p className="text-sm text-red-500">{errors.otp.message}</p>
//               )}
//             </div>
//           </>
//         )}

//         <Button type="submit" className="w-full" disabled={isSubmitting}>
//           {isSubmitting ? (
//             <>
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               {step === 'signup' ? 'Sending Verification...' : 'Completing Information...'}
//             </>
//           ) : (
//             step === 'signup' ? 'Send Verification Code' : 'Complete Information'
//           )}
//         </Button>
        
//         {step === 'otp' && (
//           <Button 
//             type="button" 
//             variant="ghost" 
//             className="w-full" 
//             onClick={() => setStep('signup')}
//           >
//             Back to Details
//           </Button>
//         )}
//       </form>
//     </div>
//   );
// };

// export default CourseDetail;




import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navigation } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Clock, Users, Award, Star, ArrowLeft, Loader2, CheckCircle, Lock, Download, FileText, Eye, X } from "lucide-react";
import { courseService } from "@/service/course.service";
import toast from "react-hot-toast";
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { loginSuccess } from '@/store/authSlice';
import CourseEnrollment from './CourseEnrollment';
import CourseSignupForm from '../CourseSignupForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { authService } from "@/service/auth.service";
import { brochures, downloadBrochure, downloadAllBrochures } from "@/utils/brochures";
import type { Brochure } from "@/utils/brochures";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { token, user } = useAppSelector((state) => state.auth);
  
  const [course, setCourse] = useState<any | null>(null);
  const [completedVideos, setCompletedVideos] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [previewBrochure, setPreviewBrochure] = useState<Brochure | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isDownloading, setIsDownloading] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const fetchCourseDetails = async () => {
    if (!courseId) return;
    
    try {
      setIsLoading(true);
      const res = await courseService.getCourseDetails(courseId);
      const data = Array.isArray(res?.data) ? res.data[0] : res?.data?.[0] || res?.data;
      setCourse(data || null);
      
      // Check if user is enrolled
      if (token && user) {
        const isUserEnrolled = data?.studentsEnrolled?.includes(user._id) || 
                              data?.studentsEnroled?.includes(user._id); // Handle typo
        setIsEnrolled(isUserEnrolled);
        
        if (isUserEnrolled) {
          // Fetch progress if enrolled
          try {
            const progressRes = await courseService.getFullCourseDetails(courseId, token);
            const completed = progressRes.data?.completedVideos || [];
            setCompletedVideos(completed);
            const totalVideos = data?.courseContent?.reduce((total: number, section: any) => 
              total + (section.subSection?.length || 0), 0) || 0;
            setProgress(totalVideos > 0 ? (completed.length / totalVideos) * 100 : 0);
          } catch (error) {
            console.log('Could not fetch progress:', error);
            setProgress(0);
          }
        }
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to load course. Unable to fetch course details.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnroll = () => {
    if (!token || !user) {
      setShowSignupModal(true);
      return;
    }
    // Trigger enrollment by scrolling to and focusing on the enrollment component
    const enrollmentElement = document.querySelector('[data-enrollment-component]');
    if (enrollmentElement) {
      enrollmentElement.scrollIntoView({ behavior: 'smooth' });
      const enrollButton = enrollmentElement.querySelector('button');
      if (enrollButton) {
        enrollButton.click();
      }
    }
  };

  const refreshCourse = () => {
    fetchCourseDetails();
    setShowSignupModal(false);
  };

  const handleDownloadBrochure = async (brochure: Brochure, isAll = false) => {
    setIsDownloading(true);
    try {
      if (isAll) {
        toast.loading('Preparing downloads...', { id: 'download-all' });
        const result = await downloadAllBrochures();
        toast.dismiss('download-all');
        if (result.success > 0) {
          toast.success(`Downloaded ${result.success} materials successfully!`, { id: 'download-success' });
        }
        if (result.failed > 0) {
          toast.error(`Failed to download ${result.failed} materials`, { id: 'download-error' });
        }
      } else {
        toast.loading(`Downloading ${brochure.name}...`, { id: `download-${brochure.id}` });
        const success = await downloadBrochure(brochure);
        toast.dismiss(`download-${brochure.id}`);
        if (success) {
          toast.success(`Downloaded ${brochure.name}`, { id: `success-${brochure.id}` });
        } else {
          toast.error('Failed to download material', { id: `error-${brochure.id}` });
        }
      }
    } catch (error) {
      toast.error('Download failed. Please try again.', { id: 'download-fail' });
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId, token]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
        <Navigation />
        <main className="container mx-auto px-4 pt-32 pb-20 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p className="text-sm sm:text-lg">Loading course details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
        <Navigation />
        <main className="container mx-auto px-4 pt-32 pb-20 text-center">
          <h1 className="text-lg sm:text-2xl font-bold mb-4">Course not found</h1>
          <Button onClick={() => navigate('/all-courses')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  // Dummy reviews if no real reviews exist
  const dummyReviews = [
    {
      _id: 'dummy1',
      user: { fullName: 'Sarah Johnson' },
      rating: 5,
      review: 'Excellent course! The content is well-structured and easy to follow. Highly recommend for beginners.'
    },
    {
      _id: 'dummy2', 
      user: { fullName: 'Mike Chen' },
      rating: 4,
      review: 'Great learning experience. The instructor explains concepts clearly and provides practical examples.'
    },
    {
      _id: 'dummy3',
      user: { fullName: 'Emily Davis' },
      rating: 5,
      review: 'This course exceeded my expectations. The hands-on projects really helped me understand the material.'
    }
  ];

  const reviews = (course?.ratingAndReviews && course.ratingAndReviews.length > 0) 
    ? course.ratingAndReviews 
    : dummyReviews;

  const averageRating = reviews.length > 0
    ? Math.round((reviews.reduce((a: number, r: any) => a + (r?.rating || 0), 0) / reviews.length) * 10) / 10
    : 4.5;

  const whatYouWillLearnList = course.whatYouWillLearn ? course.whatYouWillLearn.split('\n').filter(item => item.trim()) : [];
  return (
    
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10" style={{overflowX: 'hidden', width: '100vw', maxWidth: '100%'}}>
      <Navigation />

      <main className="container mx-auto px-3 sm:px-4 pt-32 pb-20" style={{maxWidth: '100vw', overflowX: 'hidden'}}>
        <Button 
          onClick={() => navigate('/all-courses')} 
          variant="ghost" 
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Courses
        </Button>

        <div className="grid lg:grid-cols-3 gap-4 lg:gap-8 w-full" style={{maxWidth: '100%'}}>
          <div className="lg:col-span-2 space-y-6 lg:space-y-8" style={{minWidth: 0, maxWidth: '100%'}}>
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge>{course?.category?.name || "Course"}</Badge>
              </div>
              <h1 className="text-2xl md:text-5xl font-bold mb-4 text-gradient">
                {course?.courseName || "Course"}
              </h1>
              <p className="text-base md:text-lg text-muted-foreground mb-6">
                {course?.courseDescription || ""}
              </p>
              <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-primary text-primary" />
                  <span className="font-semibold">{averageRating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span>{course?.studentsEnrolled?.length || 0} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>Self-paced</span>
                </div>
              </div>
            </div>

            <Card className="relative overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-base sm:text-lg font-semibold">Course Preview</h3>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={!showVideo ? "default" : "outline"}
                    onClick={() => setShowVideo(false)}
                    className="text-xs"
                  >
                    Thumbnail
                  </Button>
                  <Button
                    size="sm"
                    variant={showVideo ? "default" : "outline"}
                    onClick={() => setShowVideo(true)}
                    className="text-xs"
                    disabled={!course?.demoUrl}
                  >
                    Video
                  </Button>
                </div>
              </div>
              
              <div className="aspect-[16/10] sm:aspect-[2/1] lg:aspect-[5/2] relative">
                {showVideo && course?.demoUrl ? (
                  <iframe
                    src={course.demoUrl}
                    className="w-full h-full"
                    allowFullScreen
                    title="Course Preview Video"
                  />
                ) : (
                  <div 
                    className="w-full h-full relative cursor-pointer group"
                    onClick={isEnrolled ? () => navigate(`/course-learning/${courseId}`):null }
                  >
                    {course?.thumbnail ? (
                      <img 
                        src={course.thumbnail} 
                        alt={course.courseName}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                    )}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      
                    </div>
                  </div>
                )}
              </div>
            </Card>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5 lg:flex lg:w-auto gap-1 p-1 bg-muted/50 rounded-lg">
                <TabsTrigger value="overview" className="text-xs sm:text-sm px-2 sm:px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white">Overview</TabsTrigger>
                <TabsTrigger value="curriculum" className="text-xs sm:text-sm px-2 sm:px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white">Curriculum</TabsTrigger>
                <TabsTrigger value="brochures" className="text-xs sm:text-sm px-2 sm:px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white hidden sm:block">Materials</TabsTrigger>
                <TabsTrigger value="instructor" className="text-xs sm:text-sm px-2 sm:px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white">Instructor</TabsTrigger>
                <TabsTrigger value="reviews" className="text-xs sm:text-sm px-2 sm:px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white hidden sm:block">Reviews</TabsTrigger>
              </TabsList>
              
              {/* Mobile dropdown for hidden tabs */}
              <div className="sm:hidden mt-2">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={activeTab === "brochures" ? "default" : "outline"}
                    onClick={() => setActiveTab("brochures")}
                    className="flex-1 text-xs"
                  >
                    Materials
                  </Button>
                  <Button
                    size="sm"
                    variant={activeTab === "reviews" ? "default" : "outline"}
                    onClick={() => setActiveTab("reviews")}
                    className="flex-1 text-xs"
                  >
                    Reviews
                  </Button>
                </div>
              </div>

              <TabsContent value="overview" className="mt-4 sm:mt-6">
                <Card className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">What you'll learn</h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {whatYouWillLearnList.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 sm:gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 sm:mt-2 flex-shrink-0" />
                        <span className="text-xs sm:text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </TabsContent>

              <TabsContent value="curriculum" className="mt-4 sm:mt-6">
                <Card className="p-4 sm:p-6">
                  <div className="space-y-4 sm:space-y-6">
                    {(course?.courseContent || []).map((section: any, sectionIndex: number) => {
                      const sectionLessons = section.subSection || [];
                      const previewLessons = isEnrolled ? sectionLessons : sectionLessons.slice(0, 2);
                      const isPreview = !isEnrolled && sectionLessons.length > 2;
                      
                      return (
                        <div key={section._id} className="border-b border-border pb-4 sm:pb-6 last:border-b-0">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-2">
                            <h4 className="text-sm sm:text-base md:text-lg font-semibold">
                              Section {sectionIndex + 1}: {section.sectionName}
                            </h4>
                            <Badge variant={isEnrolled ? "secondary" : "outline"} className="text-xs self-start sm:self-auto">
                              {previewLessons.length} lessons {isPreview ? '+ more' : ''}
                            </Badge>
                          </div>
                          <div className="space-y-2 sm:space-y-3">
                            {previewLessons.map((subSection: any, lessonIndex: number) => {
                              const isCompleted = isEnrolled && completedVideos.includes(subSection._id);
                              const icon = isCompleted ? <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" /> : <Play className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />;
                              
                              return (
                                <div key={subSection._id} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-default">
                                  <div className="flex-shrink-0">
                                    {isEnrolled ? icon : <Play className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-xs sm:text-sm truncate">{subSection.title}</p>
                                    {subSection.description && (
                                      <p className="text-xs text-muted-foreground truncate hidden sm:block">{subSection.description}</p>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Clock className="w-3 h-3" />
                                    <span className="hidden sm:inline">
                                      {subSection.timeDuration ? `${Math.floor(subSection.timeDuration / 60)}:${(subSection.timeDuration % 60).toString().padStart(2, '0')}` : '—'}
                                    </span>
                                  </div>
                                  {!isEnrolled && (
                                    <Badge variant="outline" className="ml-auto text-xs flex-shrink-0">
                                      Preview
                                    </Badge>
                                  )}
                                </div>
                              );
                            })}
                            {isPreview && (
                              <div className="flex items-center justify-between p-2 sm:p-3 rounded-lg bg-muted/50">
                                <span className="text-xs sm:text-sm text-muted-foreground">+{sectionLessons.length - 2} more lessons</span>
                                <Badge variant="outline" className="text-xs">Enroll to unlock</Badge>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="brochures" className="mt-4 sm:mt-6">
                <Card className="p-4 sm:p-6">
                  <div className="flex flex-col items-start justify-between mb-6 sm:mb-8 gap-4">
                    <div className="flex-1 w-full">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 flex items-center gap-2">
                        <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                        Course Materials
                      </h3>
                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                        Download resources and guides to support your learning.
                      </p>
                    </div>
                    <Button 
                      onClick={() => handleDownloadBrochure({} as Brochure, true)}
                      disabled={isDownloading}
                      className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2 shadow-lg hover:shadow-primary/20 transition-all duration-300 w-full sm:w-auto"
                      size="sm"
                    >
                      {isDownloading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Download className="w-4 h-4" />
                      )}
                      <span className="text-xs sm:text-sm">Download All ({brochures.length})</span>
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                    {brochures.map((brochure, index) => (
                      <Card 
                        key={brochure.id} 
                        className="group overflow-hidden hover:shadow-xl transition-all duration-500 border-0 bg-card hover:bg-primary/5 relative cursor-pointer"
                        onClick={() => setPreviewBrochure(brochure)}
                      >
                        {/* Image Cover with Enhanced Hover */}
                        <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5 group-hover:from-primary/10 group-hover:to-secondary/10 transition-all duration-500">
                          <img 
                            src={brochure.imageUrl} 
                            alt={brochure.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
                            <Badge className="bg-primary/90 text-white border-0 shadow-md backdrop-blur-sm text-xs">
                              #{index + 1}
                            </Badge>
                          </div>
                          {/* Enhanced Overlay on Hover */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/20 backdrop-blur-sm">
                            <div className="bg-white/95 backdrop-blur-md rounded-full p-3 sm:p-4 shadow-2xl border border-white/20 transform scale-95 group-hover:scale-100 transition-transform duration-300">
                              <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                            </div>
                          </div>
                        </div>
                        
                        {/* Content Section */}
                        <div className="p-3 sm:p-4 md:p-6 relative z-10">
                          <div className="flex items-start justify-between mb-2 sm:mb-3">
                            <h4 className="font-bold text-sm sm:text-base md:text-lg leading-tight line-clamp-1 text-foreground group-hover:text-primary transition-colors duration-300 pr-2">
                              {brochure.name}
                            </h4>
                            <div className="flex-shrink-0 ml-2 hidden sm:block">
                              <div className="w-2 h-8 bg-gradient-to-b from-primary/20 to-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
                            {brochure.description}
                          </p>
                          
                          {/* Action Buttons - Responsive Layout */}
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                setPreviewBrochure(brochure);
                              }}
                              className="flex-1 flex items-center justify-center gap-1 sm:gap-2 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 text-xs sm:text-sm"
                            >
                              <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span className="hidden sm:inline">Preview</span>
                              <span className="sm:hidden">View</span>
                            </Button>
                            <Button 
                              size="sm" 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDownloadBrochure(brochure);
                              }}
                              disabled={isDownloading}
                              className="flex-1 bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-1 sm:gap-2 transition-all duration-300 text-xs sm:text-sm"
                            >
                              {isDownloading ? (
                                <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                              ) : (
                                <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                              )}
                              Download
                            </Button>
                          </div>
                        </div>

                        {/* Subtle Glow on Hover */}
                        <div className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      </Card>
                    ))}
                  </div>

                  {/* Empty State if No Brochures */}
                  {brochures.length === 0 && (
                    <div className="text-center py-8 sm:py-12">
                      <FileText className="w-8 h-8 sm:w-12 sm:h-12 text-muted-foreground mx-auto mb-4" />
                      <h4 className="text-base sm:text-lg font-semibold mb-2">No Materials Available</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">Check back later for updated course resources.</p>
                    </div>
                  )}
                </Card>
              </TabsContent>

              <TabsContent value="instructor" className="mt-4 sm:mt-6">
                <Card className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <Avatar className="w-12 h-12 sm:w-16 sm:h-16">
                      <AvatarImage src={course.instructor?.image} />
                      <AvatarFallback>{course.instructor?.fullName?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-base sm:text-lg">{course.instructor?.fullName}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Course Instructor</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-4 sm:mt-6">
                <Card className="p-4 sm:p-6">
                  <div className="mb-4 sm:mb-6">
                    <div className="flex items-center gap-3 sm:gap-4 mb-4">
                      <div className="text-2xl sm:text-3xl font-bold">{averageRating}</div>
                      <div>
                        <div className="flex items-center gap-1 mb-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`w-4 h-4 sm:w-5 sm:h-5 ${star <= averageRating ? 'fill-primary text-primary' : 'text-muted-foreground'}`} 
                            />
                          ))}
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground">{reviews.length} reviews</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 sm:space-y-6">
                    {reviews.map((r: any) => (
                      <div key={r._id} className="border-b pb-4 sm:pb-6 last:border-b-0">
                        <div className="flex items-start gap-2 sm:gap-3">
                          <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                            <AvatarFallback>{r?.user?.fullName?.charAt(0) || 'A'}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                              <span className="font-semibold text-xs sm:text-sm">{r?.user?.fullName || 'Anonymous'}</span>
                              <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star 
                                    key={star} 
                                    className={`w-3 h-3 sm:w-4 sm:h-4 ${star <= r.rating ? 'fill-primary text-primary' : 'text-muted-foreground'}`} 
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{r?.review}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1 space-y-4 lg:space-y-6" style={{minWidth: 0, maxWidth: '100%'}}>
            {/* Enhanced Brochures Sidebar */}
            <Card className="p-4 sm:p-6 sticky top-24" style={{minWidth: 0, maxWidth: '100%'}}>
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <span className="hidden sm:inline">Quick Materials</span>
                  <span className="sm:hidden">Materials</span>
                </h3>
                <Button 
                  size="sm"
                  variant="outline"
                  onClick={() => handleDownloadBrochure({} as Brochure, true)}
                  disabled={isDownloading}
                  className="flex items-center gap-1 text-xs hover:bg-primary hover:text-white transition-colors"
                >
                  {isDownloading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Download className="w-3 h-3" />}
                  All
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mb-3 sm:mb-4 leading-relaxed hidden sm:block">
                Essential downloads at your fingertips
              </p>
              <div className="space-y-2 sm:space-y-3 max-h-80 overflow-y-auto">
                {brochures.slice(0, 3).map((brochure) => (
                  <div 
                    key={brochure.id} 
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-muted/50 transition-all duration-300 group cursor-pointer border border-border/50 hover:border-primary/30"
                    onClick={() => setPreviewBrochure(brochure)}
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div 
                        className="w-8 h-8 rounded-lg overflow-hidden bg-muted group-hover:bg-primary/10 transition-colors flex-shrink-0 relative"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewBrochure(brochure);
                        }}
                      >
                        <img 
                          src={brochure.imageUrl} 
                          alt={brochure.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-xs truncate group-hover:text-primary transition-colors">{brochure.name}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1 hidden sm:block">{brochure.description}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewBrochure(brochure);
                        }}
                        className="h-6 w-6 sm:h-7 sm:w-7 p-0 hover:bg-primary hover:text-white transition-all"
                        aria-label="Preview brochure"
                      >
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadBrochure(brochure);
                        }}
                        disabled={isDownloading}
                        className="h-6 w-6 sm:h-7 sm:w-7 p-0 hover:bg-primary hover:text-white transition-all"
                        aria-label="Download brochure"
                      >
                        {isDownloading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Download className="w-3 h-3" />}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              {brochures.length > 3 && (
                <div className="text-center pt-3 sm:pt-4 border-t border-border/50">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      setActiveTab('brochures');
                      setTimeout(() => {
                        const tabsContainer = document.querySelector('[role="tablist"]');
                        if (tabsContainer) {
                          tabsContainer.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start' 
                          });
                        }
                      }, 100);
                    }}
                    className="text-xs text-primary hover:text-primary/80 transition-colors w-full justify-start"
                  >
                    <FileText className="w-3 h-3 mr-1" />
                    <span className="hidden sm:inline">View all {brochures.length} materials →</span>
                    <span className="sm:hidden">View all ({brochures.length}) →</span>
                  </Button>
                </div>
              )}
            </Card>

            {isEnrolled ? (
              <Card className="p-4 sm:p-6 sticky top-24">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs sm:text-sm font-medium">Progress</span>
                    <span className="text-xs sm:text-sm text-muted-foreground">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90" 
                  size="sm"
                  onClick={() => navigate(`/course-learning/${courseId}`)}
                >
                  <Play className="w-4 h-4 mr-2" />
                  <span className="text-xs sm:text-sm">Continue Learning</span>
                </Button>
              </Card>
            ) : (
              <div data-enrollment-component>
                <CourseEnrollment 
                  course={course}
                  isEnrolled={isEnrolled}
                  onEnrollmentSuccess={() => {
                    toast.success("🎉 Payment Successful! Welcome to the course! You can now start learning.");
                    setIsEnrolled(true);
                    setProgress(0);
                    fetchCourseDetails();
                    setTimeout(() => {
                      window.location.reload();
                    }, 2000);
                  }}
                  />
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      
      {/* Personal Info Modal for Non-Logged Users */}
      <Dialog open={showSignupModal} onOpenChange={setShowSignupModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Personal Information Required</DialogTitle>
          </DialogHeader>
          <EnrollmentSignupForm 
            courseName={course?.courseName}
            onSuccess={() => {
              refreshCourse();
              setTimeout(() => {
                const enrollmentElement = document.querySelector('[data-enrollment-component]');
                if (enrollmentElement) {
                  enrollmentElement.scrollIntoView({ behavior: 'smooth' });
                }
              }, 1000);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Enhanced Material Preview Modal */}
      <Dialog open={!!previewBrochure} onOpenChange={() => setPreviewBrochure(null)}>
        <DialogContent className="max-w-[95vw] sm:max-w-6xl max-h-[95vh] p-0 border-0 shadow-2xl rounded-2xl overflow-hidden">
          {previewBrochure && (
            <div className="relative bg-white flex flex-col h-full">
              {/* Header with Enhanced Design */}
              <div className="flex items-center justify-between p-3 sm:p-6 border-b bg-gradient-to-r from-primary/5 via-background to-secondary/5 backdrop-blur-sm sticky top-0 z-10">
                <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-white shadow-lg border border-white/20">
                    <img 
                      src={previewBrochure.imageUrl} 
                      alt={previewBrochure.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base sm:text-xl font-bold text-foreground truncate">{previewBrochure.name}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed hidden sm:block">{previewBrochure.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => setPreviewBrochure(null)}
                    className="border-primary/20 hover:bg-primary/5 h-8 w-8 sm:h-auto sm:w-auto p-1 sm:p-2"
                  >
                    <X className="w-4 h-4" />
                    <span className="hidden sm:inline ml-1">Close</span>
                  </Button>
                  <Button 
                    onClick={() => handleDownloadBrochure(previewBrochure)}
                    disabled={isDownloading}
                    className="bg-primary hover:bg-primary/90 text-white flex items-center gap-1 sm:gap-2 shadow-lg hover:shadow-primary/20 transition-all text-xs sm:text-sm"
                    size="sm"
                  >
                    {isDownloading ? (
                      <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                    ) : (
                      <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                    )}
                    <span className="hidden sm:inline">Download</span>
                  </Button>
                </div>
              </div>

              {/* Enhanced Preview Content */}
              <div className="flex-1 overflow-hidden relative">
                <div className="p-3 sm:p-6 max-h-full overflow-auto bg-gradient-to-b from-gray-50/50 to-white/50">
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto">
                    <img 
                      src={previewBrochure.imageUrl} 
                      alt={previewBrochure.name}
                      className="w-full h-auto max-h-[70vh] object-contain cursor-zoom-in hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="mt-4 sm:mt-6 text-center">
                    <p className="text-xs sm:text-sm text-muted-foreground italic">
                      Tip: Download for full access and offline viewing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Personal info form component for course enrollment
const EnrollmentSignupForm = ({ courseName, onSuccess }: { courseName?: string, onSuccess: () => void }) => {
  const [step, setStep] = useState<'signup' | 'otp'>('signup');
  const [formData, setFormData] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const sendOTP = async (data: any) => {
    try {
      setIsSubmitting(true);
      await authService.sendOTP({ email: data.email });
      setFormData(data);
      setStep('otp');
      toast({ 
        title: "Verification code sent!", 
        description: "Please check your email to complete verification." 
      });
    } catch (error: any) {
      toast({ 
        title: "Failed to send verification code", 
        description: error?.response?.data?.message || "Please try again.", 
        variant: "destructive" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const verifyAndSignup = async (data: any) => {
    if (!formData || !data.otp) return;
    
    try {
      setIsSubmitting(true);
      const response = await authService.signup({
        ...formData,
        otp: data.otp,
        accountType: "Student",
        additionalDetails: {
          contactNumber: formData.contactNumber
        }
      });
      
      // Auto-login the user with the returned token
      if (response.token && response.user) {
        dispatch(loginSuccess({ token: response.token, user: response.user }));
        toast({ 
          title: "Information completed!", 
          description: "You can now enroll in the course." 
        });
      }
      
      onSuccess();
    } catch (error: any) {
      toast({ 
        title: "Failed to complete information", 
        description: error?.response?.data?.message || "Invalid verification code. Please try again.", 
        variant: "destructive" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = step === 'signup' ? sendOTP : verifyAndSignup;

  return (
    <div className="space-y-4">
      {step === 'signup' && (
        <div className="text-center mb-4">
          <p className="text-sm text-muted-foreground">
            Please fill in your personal information to enroll in <strong>{courseName}</strong>
          </p>
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {step === 'signup' ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="Enter your full name"
                {...register("fullName", {
                  required: "Full name is required",
                  minLength: { value: 2, message: "Name must be at least 2 characters" }
                })}
                className={errors.fullName ? "border-red-500" : ""}
              />
              {errors.fullName && (
                <p className="text-sm text-red-500">{errors.fullName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Create Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a secure password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" }
                })}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactNumber">Phone Number</Label>
              <Input
                id="contactNumber"
                type="tel"
                placeholder="Enter your phone number"
                {...register("contactNumber", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit phone number"
                  }
                })}
                className={errors.contactNumber ? "border-red-500" : ""}
              />
              {errors.contactNumber && (
                <p className="text-sm text-red-500">{errors.contactNumber.message}</p>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-4">
              <p className="text-sm text-muted-foreground">
                Enter the 6-digit verification code sent to <strong>{formData?.email}</strong>
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="otp">Verification Code</Label>
              <Input
                id="otp"
                placeholder="Enter 6-digit code"
                maxLength={6}
                {...register("otp", {
                  required: "Verification code is required",
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "Please enter a valid 6-digit code"
                  }
                })}
                className={`text-center text-lg tracking-widest ${errors.otp ? "border-red-500" : ""}`}
              />
              {errors.otp && (
                <p className="text-sm text-red-500">{errors.otp.message}</p>
              )}
            </div>
          </>
        )}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {step === 'signup' ? 'Sending Verification...' : 'Completing Information...'}
            </>
          ) : (
            step === 'signup' ? 'Send Verification Code' : 'Complete Information'
          )}
        </Button>
        
        {step === 'otp' && (
          <Button 
            type="button" 
            variant="ghost" 
            className="w-full" 
            onClick={() => setStep('signup')}
          >
            Back to Details
          </Button>
        )}
      </form>
    </div>
  );
};

export default CourseDetail;