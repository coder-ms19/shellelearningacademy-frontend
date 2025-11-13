// import React, { useState, useEffect } from "react";
// import { Link, useParams, useNavigate, useSearchParams } from "react-router-dom";
// // NOTE: Adjust the paths below to match your project's component structure
// import { Navigation } from "@/components/Navbar"; 
// import { Footer } from "@/components/Footer";
// import { 
//     Star, Check, Play, Download, 
//     Loader2, ShieldCheck, Users,
//     ArrowLeft, AlertCircle, ChevronDown, Clock, MessageSquare,
//     CheckCircle, CreditCard, Shield, Tag, X, Search
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// // ====================================================================
// // !!! IMPORTANT: Replace these MOCK SERVICES with your REAL API IMPORTS !!!
// // ====================================================================
// import { courseService } from "@/service/course.service";
// import { paymentService } from '@/service/payment.service';
// import { authService } from "@/service/auth.service";
// import toast from "react-hot-toast";
// import { useForm, Controller } from "react-hook-form";
// import { useSelector } from "react-redux";



// declare global {
//     interface Window {
//         Razorpay: any;
//     }
// }



// // ====================================================================
// // 2. Course Enrollment Card Component (Modified to handle Auth check)
// // ====================================================================

// interface CourseEnrollmentProps {
//     course: any;
//     isEnrolled: boolean;
//     onEnrollmentSuccess: () => void;
//     setIsEnrolledLocally: (status: boolean) => void;
// }

// const CourseEnrollment: React.FC<CourseEnrollmentProps> = ({
//     course,
//     isEnrolled,
//     onEnrollmentSuccess,
//     setIsEnrolledLocally
// }) => {
  
//     const useCustomToast = () => ({ showToast: (type: string, title: string, description: string) => toast[type === 'error' ? 'error' : type === 'info' ? 'success' : 'success'](description) });
//     const { showToast } = useCustomToast();
    

//     const navigate = useNavigate();
//     const [enrolling, setEnrolling] = useState(false);
//     const [showSignupModal, setShowSignupModal] = useState(false);
//     const [couponCode, setCouponCode] = useState('');
//     const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
//     const [applyingCoupon, setApplyingCoupon] = useState(false);
//     const [finalPrice, setFinalPrice] = useState(course.price || course.finalPrice || course.discountedPrice);
//     const EnrollMentToken = localStorage.getItem("EnrollMentToken");

//     // Ref to track if the modal/payment flow needs to resume after a successful signup/login
//     const paymentAttemptRef = React.useRef(false); 

//     const loadRazorpayScript = () => {
//         return new Promise((resolve) => {
//             const script = document.createElement('script');
//             script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//             script.onload = () => resolve(true);
//             script.onerror = () => resolve(false);
//             document.body.appendChild(script);
//         });
//     };

//     const handleApplyCoupon = async () => {
//         // Implementation for coupon logic here
//         showToast('info', 'Feature Disabled', 'Coupon feature is currently a mock.');
//     };

//     const handleRemoveCoupon = () => {
//         setAppliedCoupon(null);
//         setCouponCode('');
//         setFinalPrice(course.price || course.finalPrice || course.discountedPrice);
//         showToast('info', 'Coupon Removed', 'Coupon has been removed');
//     };

//     const handlePayment = async () => {
//         const courseId = course.id;
//         // Check if user is logged in
//         if (!EnrollMentToken) {
//       navigate("/personal-info", {
//         state: {
//           courseName: course.title,
//           courseId: course.id,
//           price: course.finalPrice || course.price,
//         },
//       });
//       return 
//     }
        
//         // If logged in (EnrollMentToken exists), proceed with payment logic
//         try {
//             setEnrolling(true);

//             const scriptLoaded = await loadRazorpayScript();
//             if (!scriptLoaded) {
//                 showToast('error', 'Payment Gateway Error', 'Failed to load payment gateway. Please try again.');
//                 return;
//             }

//             const orderData = await paymentService.capturePayment([course.id], EnrollMentToken);

//             if (!orderData.success) {
//                 showToast('error', 'Order Creation Failed', orderData.message || 'Failed to create order. Please try again.');
//                 return;
//             }

//             const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY ;

//             const options = {
//                 key: razorpayKey,
//                 amount: orderData.amount,
//                 currency: orderData.currency,
//                 name: "Shell Entertainment",
//                 description: `Enrollment for ${course.title}`,
//                 order_id: orderData.orderId,
//                 handler: async (response: any) => {
//                     // Payment successful on Razorpay side, now verify it on your server
//                     try {
//                         // Show loading during verification
//                         showToast('info', 'Processing Payment', 'Verifying your payment, please wait...');
                        
//                         const verifyData = await paymentService.verifyPayment({
//                             razorpay_payment_id: response.razorpay_payment_id,
//                             razorpay_order_id: response.razorpay_order_id,
//                             razorpay_signature: response.razorpay_signature,
//                             courses: [course.id]
//                         }, EnrollMentToken);

//                         if (verifyData.success) {
//                             setIsEnrolledLocally(true);
//                             onEnrollmentSuccess();
                            
//                             // Show success message before redirect
//                             showToast('success', 'Payment Successful! 🎉', 'Redirecting to confirmation page...');
                            
//                             // Quick redirect for better UX
//                             setTimeout(() => {
//                                 navigate(`/enrollment-success?courseName=${encodeURIComponent(course.title)}&price=${course.finalPrice}&originalPrice=${course.originalPrice}&courseId=${course.id}`);
//                             }, 800);
//                         } else {
//                             showToast('error', 'Payment Failed', 'Payment verification failed. Please contact support.');
//                         }
//                     } catch (error) {
//                         showToast('error', 'Verification Error', 'Payment verification failed. Please contact support if amount was deducted.');
//                     }
//                 },
//                 theme: { color: "#3B82F6" },
//                 modal: { ondismiss: () => showToast('warning', 'Payment Cancelled', 'Payment was cancelled.') }
//             };

//             const razorpay = new window.Razorpay(options);
//             razorpay.open();

//         } catch (error) {
//             showToast('error', 'Payment Failed', 'Unable to start payment process. Please try again.');
//         } finally {
//             setEnrolling(false);
//             paymentAttemptRef.current = false;
//         }
//     };

//     // Effect to automatically retry payment after a successful login/detail collection from the modal
//     useEffect(() => {
//         // We only check if the EnrollMentToken just became available AND a payment attempt was flagged as pending
//         if (EnrollMentToken && paymentAttemptRef.current) {
//             // Slight delay to ensure React state updates and the modal is fully closed
//             setTimeout(() => {
//                 handlePayment();
//             }, 100);
//         }
//     }, [EnrollMentToken]);

   
//     useEffect(() => {
//         return () => {
         
//         };
//     }, []);


//     if (isEnrolled) {
//         // Component state for ALREADY ENROLLED users
//         return (
//             <Card className="bg-card/80 backdrop-blur-lg border-primary/20 sticky top-24 h-fit shadow-xl">
//                 <CardContent className="p-4 sm:p-6">
//                     <div className="text-center mb-4 sm:mb-6">
//                         <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
//                             <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
//                         </div>
//                         <h3 className="text-base sm:text-lg font-semibold text-green-600 mb-1 sm:mb-2">
//                             You're Enrolled!
//                         </h3>
//                     </div>

//                     <Button
//                         className="w-full bg-green-600 hover:bg-green-700 h-10 sm:h-12 text-sm sm:text-base mb-3 sm:mb-4"
//                         onClick={() => navigate(`/course-learning/${course.id}`)}
//                     >
//                         <Play className="w-4 h-4 mr-2" />
//                         Go to Course
//                     </Button>
//                     <div className="text-center text-xs sm:text-sm text-muted-foreground">
//                         Access all course materials and track your progress
//                     </div>
//                 </CardContent>
//             </Card>
//         );
//     }

//     return (
//         <>
//             <Card className="bg-card/80 backdrop-blur-lg border-primary/20 sticky top-24 h-fit shadow-xl">
//                 {/* Course Thumbnail */}
//                 <div className="aspect-video bg-muted relative">
//                     <img 
//                         src={course.thumbnail} 
//                         alt={course.title}
//                         className="w-full h-full object-cover"
//                         onError={(e) => e.currentTarget.src = 'https://placehold.co/600x400?text=Course+Thumbnail'}
//                     />
//                 </div>
                
//                 <CardContent className="p-6 space-y-6">
//                     {/* Price Display */}
//                     <div className="text-center mb-4 sm:mb-6">
//                         <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
//                             ₹{finalPrice}
//                         </div>
//                         {course.originalPrice > finalPrice && (
//                             <div className="flex items-center justify-center gap-2 mb-2">
//                                 <span className="text-sm text-muted-foreground line-through">
//                                     ₹{course.originalPrice}
//                                 </span>
//                                 {course.discountPercent > 0 && (
//                                     <Badge variant="destructive" className="text-xs">
//                                         {course.discountPercent}% OFF
//                                     </Badge>
//                                 )}
//                             </div>
//                         )}
//                         <p className="text-xs sm:text-sm text-muted-foreground">One-time payment</p>
//                     </div>

//                     {/* Coupon Section (Mocked) */}
//                     <div className="mb-4 sm:mb-6">
//                         {/* Current UI for Coupon - kept simple */}
//                         <div className="flex gap-2">
//                             <Input
//                                 placeholder="Enter coupon code"
//                                 value={couponCode}
//                                 onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
//                                 className="flex-1 text-sm"
//                             />
//                             <Button
//                                 variant="outline"
//                                 size="sm"
//                                 onClick={handleApplyCoupon}
//                                 disabled={applyingCoupon || !couponCode.trim()}
//                             >
//                                 <Tag className="w-4 h-4" />
//                             </Button>
//                         </div>
//                     </div>

//                     {/* Main Enrollment Button */}
//                     <Button
//                         data-testid="enroll-button"
//                         className="w-full bg-gradient-to-r from-primary to-accent h-10 sm:h-12 mb-3 sm:mb-4 text-sm sm:text-base"
//                         onClick={handlePayment}
//                         disabled={enrolling}
//                     >
//                         {enrolling ? (
//                             <>
//                                 <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                                 Processing Payment...
//                             </>
//                         ) : (
//                             <>
//                                 <CreditCard className="w-4 h-4 mr-2" />
//                                 {`Enroll Now - ₹${finalPrice}` }
//                             </>
//                         )}
//                     </Button>

//                     <div className="text-center text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
//                         <Shield className="w-4 h-4 inline mr-1" />
//                         30-day money-back guarantee
//                     </div>

//                     <Separator className="my-4 sm:my-6" />

//                     {/* Course Includes List */}
//                     <div className="space-y-3 sm:space-y-4">
//                         <h4 className="font-semibold text-sm sm:text-base">This course includes:</h4>
//                         <div className="space-y-2 text-sm text-muted-foreground">
//                             {course.includes.map((inc: string, i: number) => (
//                                 <div key={i} className="flex items-center gap-2">
//                                     <Check className="w-4 h-4 text-green-500 shrink-0" /> {inc}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </CardContent>
//             </Card>

//             {/* Combined Signup/Enrollment Modal - Only shows if NOT LOGGED IN */}
//             <Dialog open={showSignupModal && !EnrollMentToken} onOpenChange={setShowSignupModal}>
//                 <DialogContent className="max-w-lg w-[95vw] max-h-[95vh] overflow-y-auto">
//                     <DialogHeader className="space-y-2 sm:space-y-3 pb-2">
//                         <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center">
//                             <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
//                         </div>
//                         <DialogTitle className="text-center text-lg sm:text-xl font-semibold">
//                             Complete Your Enrollment Details
//                         </DialogTitle>
//                         <p className="text-center text-xs sm:text-sm text-muted-foreground px-2">
//                             Please provide your details to register and secure your spot in <span className="font-medium text-primary">{course?.title}</span>.
//                         </p>
//                     </DialogHeader>
                    
//                 </DialogContent>
//             </Dialog>
//         </>
//     );
// };


// // ====================================================================
// // 3. Main Course Detail Page Component (CourseDetail)
// // ====================================================================
// // (This component remains largely the same, but now uses the new Enrollment component)

// const CourseDetail = () => {
//     const { courseId } = useParams();
//     const [searchParams] = useSearchParams();
//     const { user } = useSelector((state:any) => state.auth); // Get user for enrollment check
//     const [course, setCourse] = useState<any>(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [isEnrolled, setIsEnrolled] = useState(false);
//     const [enrollmentRef, setEnrollmentRef] = useState<any>(null);
    
//     const [expandedSections, setExpandedSections] = useState(new Set([0]));

//     // Check if the current user ID is in the enrolled list
//     const checkEnrollmentStatus = (courseData: any, userId: string) => {
//         if (!userId) {
//             setIsEnrolled(false);
//             return;
//         }
//         // Mocking: Replace with actual API call to check enrollment for this user/course
//         const isUserEnrolled = courseData.studentsEnrolled?.some((student: string) => student === userId) || false;
//         setIsEnrolled(isUserEnrolled);
//     };

//     const fetchCourseDetails = async () => {
//         const currentCourseId = courseId;
//         if (!currentCourseId) return;
        
//         setIsLoading(true);
//         try {
//             const response = await courseService.getCourseDetails(currentCourseId);
//             const apiData = Array.isArray(response.data) ? response.data[0] : response.data;

//             if (!apiData) {
//                 throw new Error("No course data found in response");
//             }

//             const mappedCourse = {
               
//                 id: apiData._id,
//                 title: apiData.courseName,
//                 description: apiData.courseDescription ? apiData.courseDescription.replace(/\r\n|\n/g, ' ').trim() : '', 
//                 overview: apiData.courseOverview,
//                 price: apiData.finalPrice || apiData.originalPrice || 0,
//                 finalPrice: apiData.finalPrice,
//                 originalPrice: apiData.originalPrice,
//                 discountPercent: apiData.discountPercent || 0,
//                 thumbnail: apiData.thumbnail,
//                 brochure: apiData.brochures, 
//                 level: apiData.courseLevel,
//                 duration: apiData.courseDuration,
//                 category: apiData.category?.name || "General",
//                 rating: 4.8, 
//                 reviews: 120, 
//                 enrolledCount: apiData.studentsEnrolled ? apiData.studentsEnrolled.length : 0,
//                 studentsEnrolled: apiData.studentsEnrolled,
//                 instructorName: "Indurstry expert", 
//                 instructorAvatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=JavaExpert&backgroundColor=b6e3f4,c0aede,d1d4f9&hairColor=2c1b12,654522,54456f&glasses=variant01",
//                 instructorBio: "Experienced software engineer specializing in scalable Java and Spring Boot solutions.",
//                 whatYouLearn: apiData.whatYouWillLearn 
//                     ? apiData.whatYouWillLearn.split(/\r\n|\n/).filter((t: string) => t.trim()) 
//                     : [],
//                 curriculum: apiData.courseContent?.map((section: any, index: number) => ({
//                     id: section._id || index,
//                     title: section.sectionName,
//                     lessons: section.subSection?.map((sub: any, subIndex: number) => ({
//                         title: sub.title,
//                         description: sub.description && sub.description.trim() !== "some discription here" ? sub.description : null,
//                     })) || []
//                 })) || [],
//                 includes: [
//                     apiData.courseDuration + " of video content",
//                     "Full Lifetime Access",
//                     "Certificate of Completion",
//                     "Project Files & Codebase"
//                 ]
//             };

//             setCourse(mappedCourse);
//             // Check enrollment status right after fetching course details
//             checkEnrollmentStatus(apiData, user?.id); 

//         } catch (err) {
//             console.error("Error fetching course:", err);
//             toast.error("Failed to load course details.");
//             setCourse(null);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => { 
//         fetchCourseDetails(); 
//     }, [courseId, user?.id]); // Re-fetch or re-check enrollment if user status changes

//     // Auto-enrollment effect
//     useEffect(() => {
//         const autoEnroll = searchParams.get('autoEnroll');
//         const enrollmentToken = localStorage.getItem('EnrollMentToken');
        
//         if (autoEnroll === 'true' && enrollmentToken && course && !isEnrolled) {
//             // Reduced delay for better UX
//             setTimeout(() => {
//                 const enrollButton = document.querySelector('[data-testid="enroll-button"]') as HTMLButtonElement;
//                 if (enrollButton) {
//                     // Show immediate feedback
//                     toast.success('Auto-enrolling you in the course...');
//                     enrollButton.click();
//                 }
//             }, 500);
//         }
//     }, [course, isEnrolled, searchParams]);

//     const toggleSection = (index: number) => {
//         setExpandedSections(prev => {
//             const newSet = new Set(prev);
//             newSet.has(index) ? newSet.delete(index) : newSet.add(index);
//             return newSet;
//         });
//     };

//     const handleDownloadBrochure = () => {
//         if (course?.brochure) {
//             window.open(course.brochure, '_blank');
//         } else {
//             toast.error("No brochure available for download.");
//         }
//     };

//     const handleSuccessfulEnrollment = () => {
//         setIsEnrolled(true);
//     };


//     // --- Loading and Error States ---
//     if (isLoading) return (
//         <div className="min-h-screen bg-background">
//             <Navigation />
//             <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
//                 <div className="relative">
//                     <Loader2 className="w-12 h-12 animate-spin text-primary" />
//                     <div className="absolute inset-0 w-12 h-12 border-2 border-primary/20 rounded-full animate-ping" />
//                 </div>
//                 <div className="text-center space-y-2">
//                     <h3 className="text-lg font-semibold text-foreground">Loading Course Details</h3>
//                     <p className="text-sm text-muted-foreground">Please wait while we fetch the course information...</p>
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     );

//     if (!course) return (
//         <div className="min-h-screen flex flex-col items-center justify-center gap-4">
//             <Navigation />
//             <div className="text-center p-10 bg-card rounded-xl shadow-lg mt-20">
//                 <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
//                 <h2 className="text-xl font-bold">Course Not Found</h2>
//                 <p className="text-muted-foreground">The requested course details could not be loaded or do not exist.</p>
//                 <Button asChild className="mt-6" variant="outline">
//                     <Link to="/all-courses">← Back to All Courses</Link>
//                 </Button>
//             </div>
//             <Footer />
//         </div>
//     );

//     // --- Main Render ---
//     return (
//         <div className="min-h-screen bg-background">
//             <Navigation />
            
//             <main className="container mx-auto px-4 py-24 max-w-7xl">
//                 {/* ... (Breadcrumbs and main course content sections) ... */}
//                 <div className="mb-8 text-sm text-muted-foreground flex items-center gap-2">
//                     <Link to="/all-courses" className="hover:text-primary flex items-center">
//                         <ArrowLeft className="w-4 h-4 mr-1"/> Courses
//                     </Link>
//                     <span>/</span>
//                     <span className="text-foreground font-medium">{course.category}</span>
//                 </div>

//                 <div className="grid lg:grid-cols-3 gap-10">
                    
//                     {/* LEFT COLUMN - Main Info */}
//                     <div className="lg:col-span-2 space-y-10">
//                         {/* Header Section */}
//                         <div className="space-y-4">
//                             <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0 capitalize">{course.level}</Badge>
//                             <h1 className="text-3xl md:text-4xl font-bold text-foreground">{course.title}</h1>
//                             <p className="text-lg text-muted-foreground leading-relaxed">
//                                 {course.description}
//                             </p>
                            
//                             {/* Stats Bar */}
//                             <div className="flex flex-wrap gap-6 pt-4 text-sm font-medium text-muted-foreground">
//                                 <div className="flex items-center gap-2">
//                                     <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
//                                     <span>**{course.rating}** Rating</span>
//                                 </div>
//                                 <div className="flex items-center gap-2">
//                                     <Users className="w-5 h-5 text-blue-500" />
//                                     <span>**{course.enrolledCount.toLocaleString()}** Enrolled</span>
//                                 </div>
//                                 <div className="flex items-center gap-2">
//                                     <Clock className="w-5 h-5 text-green-500" />
//                                     <span>**{course.duration}**</span>
//                                 </div>
//                                 <div className="flex items-center gap-2">
//                                     <MessageSquare className="w-5 h-5 text-purple-500" />
//                                     <span>**{course.reviews.toLocaleString()}** Reviews</span>
//                                 </div>
//                             </div>
//                         </div>
                        
//                         <Separator />

//                         {/* What You'll Learn */}
//                         {course.whatYouLearn.length > 0 && (
//                             <Card className="border-border bg-card/50">
//                                 <CardContent className="p-6">
//                                     <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
//                                         <ShieldCheck className="text-primary w-6 h-6" /> What You Will **Master**
//                                     </h3>
//                                     <div className="grid sm:grid-cols-2 gap-4">
//                                         {course.whatYouLearn.map((item: string, idx: number) => (
//                                             <div key={idx} className="flex items-start gap-2 p-3 bg-muted/20 rounded-lg text-sm font-medium">
//                                                 <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
//                                                 <span>{item}</span>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </CardContent>
//                             </Card>
//                         )}

//                         <Separator />

//                         {/* Course Overview */}
//                         <div>
//                             <h3 className="text-2xl font-bold mb-4">Course Overview</h3>
//                             <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
//                                 {course.overview}
//                             </div>
//                         </div>

//                         <Separator />

//                         {/* Curriculum / Content */}
//                         <div>
//                             <h3 className="text-2xl font-bold mb-6">Course Curriculum</h3>
//                             <div className="space-y-4">
//                                 {course.curriculum.map((section: any, idx: number) => {
//                                     const isOpen = expandedSections.has(idx);
//                                     const totalLessons = section.lessons.length;
//                                     return (
//                                         <div key={section.id} className="border rounded-xl overflow-hidden bg-card shadow-sm">
//                                             <button 
//                                                 onClick={() => toggleSection(idx)}
//                                                 className="w-full flex items-center justify-between p-4 hover:bg-accent/50 transition-colors"
//                                             >
//                                                 <div className="flex items-center gap-3">
//                                                     <ChevronDown className={`w-5 h-5 transition-transform text-primary ${isOpen ? 'rotate-180' : ''}`}/>
//                                                     <span className="text-lg font-semibold text-foreground">{section.title}</span>
//                                                 </div>
//                                                 <Badge variant="outline" className="ml-auto">{totalLessons} Lessons</Badge>
//                                             </button>
                                            
//                                             {isOpen && (
//                                                 <div className="border-t bg-muted/20 divide-y divide-border/50">
//                                                     {totalLessons > 0 ? (
//                                                         section.lessons.map((lesson: any, lIdx: number) => (
//                                                             <div key={lIdx} className="p-3 pl-12 flex items-start gap-3 text-sm hover:bg-accent/30 transition-colors">
//                                                                 <Play className="w-4 h-4 text-primary/70 shrink-0 mt-1" />
//                                                                 <div className="flex flex-col">
//                                                                     <span className="font-medium text-foreground">{lesson.title}</span>
//                                                                     {lesson.description && (
//                                                                         <span className="text-xs text-muted-foreground italic">{lesson.description}</span>
//                                                                     )}
//                                                                 </div>
//                                                             </div>
//                                                         ))
//                                                     ) : (
//                                                         <div className="p-4 text-center text-xs text-muted-foreground">No lessons uploaded yet in this section.</div>
//                                                     )}
//                                                 </div>
//                                             )}
//                                         </div>
//                                     )
//                                 })}
//                             </div>
//                         </div>
//                     </div>

//                     {/* RIGHT COLUMN - Sticky Sidebar (Enrollment Component) */}
//                     <div className="lg:col-span-1">
//                         <div className="sticky top-24 space-y-6">
                            
//                             <CourseEnrollment 
//                                 course={course}
//                                 isEnrolled={isEnrolled}
//                                 onEnrollmentSuccess={handleSuccessfulEnrollment}
//                                 setIsEnrolledLocally={setIsEnrolled} 
//                             />
                            
//                             {/* Instructor Card */}
//                             <Card className="shadow-lg">
//                                 <CardContent className="p-6 text-center">
//                                     <h3 className="text-xl font-bold mb-4 text-foreground">Your Instructor</h3>
//                                     <img
//                                         src={course.instructorAvatar} 
//                                         alt={course.instructorName}
//                                         className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-4 border-primary/50 shadow-md"
//                                     />
//                                     <h4 className="text-lg font-bold mb-1 text-primary">{course.instructorName}</h4>
//                                     <p className="text-sm text-muted-foreground leading-relaxed italic">{course.instructorBio}</p>
//                                     <div className="mt-4">
//                                         <Button variant="link" className="text-primary hover:text-primary/80">View Full Profile →</Button>
//                                     </div>
//                                 </CardContent>
//                             </Card>

//                             {/* Brochure Download Button */}
//                             {course.brochure && (
//                                 <Button onClick={handleDownloadBrochure} variant="outline" className="w-full gap-2 h-12 border-dashed border-2">
//                                     <Download className="w-5 h-5" /> **Download Course Brochure**
//                                 </Button>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </main>
//             <Footer />
//         </div>
//     );
// };

// export default CourseDetail;




import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useParams, useNavigate, useSearchParams } from "react-router-dom";
// NOTE: Adjust the paths below to match your project's component structure
import { Navigation } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
    Star, Check, Play, Download,
    Loader2, ShieldCheck, Users,
    ArrowLeft, AlertCircle, ChevronDown, Clock, MessageSquare,
    CheckCircle, CreditCard, Shield, Tag, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// ====================================================================
// !!! IMPORTANT: Replace these MOCK SERVICES with your REAL API IMPORTS !!!
// ====================================================================
import { courseService } from "@/service/course.service";
import { paymentService } from '@/service/payment.service';
// import { authService } from "@/service/auth.service"; // Not directly used in the final payment flow
import toast from "react-hot-toast";
// import { useForm, Controller } from "react-hook-form"; // Not directly used in the final payment flow
import { useSelector } from "react-redux";

declare global {
    interface Window {
        Razorpay: any;
    }
}

// Custom hook for toast notifications
const useCustomToast = () =>
    useMemo(() => ({ showToast: (type: 'error' | 'success' | 'info' | 'warning', title: string, description: string) => toast[type === 'error' ? 'error' : 'success'](description, { duration: 3000 }) }), []);


// ====================================================================
// 2. Course Enrollment Card Component (Optimized)
// ====================================================================

interface CourseEnrollmentProps {
    course: any;
    isEnrolled: boolean;
    onEnrollmentSuccess: () => void;
    setIsEnrolledLocally: (status: boolean) => void;
}

const CourseEnrollment: React.FC<CourseEnrollmentProps> = React.memo(({
    course,
    isEnrolled,
    onEnrollmentSuccess,
    setIsEnrolledLocally
}) => {
    const { showToast } = useCustomToast();
    const navigate = useNavigate();

    const [enrolling, setEnrolling] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
    const [applyingCoupon, setApplyingCoupon] = useState(false);

    // Optimize: Use useMemo for initial price calculation
    const initialPrice = useMemo(() => course.finalPrice || course.price || course.discountedPrice || 0, [course]);
    const [finalPrice, setFinalPrice] = useState(initialPrice);
    
    // Optimize: Read token once and manage updates via a simple state.
    const [enrollmentToken, setEnrollmentToken] = useState(localStorage.getItem("EnrollMentToken"));

    // Ref to track if the payment flow needs to resume after a successful signup/login
    const paymentAttemptRef = React.useRef(false);

    // Optimize: Memoize Razorpay script loading function
    const loadRazorpayScript = useCallback(() => {
        return new Promise<boolean>((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    }, []); // Empty dependency array, function never changes

    const handleApplyCoupon = useCallback(() => {
        // Implementation for coupon logic here
        showToast('info', 'Feature Disabled', 'Coupon feature is currently a mock.');
    }, [showToast]);

    const handleRemoveCoupon = useCallback(() => {
        setAppliedCoupon(null);
        setCouponCode('');
        setFinalPrice(initialPrice);
        showToast('info', 'Coupon Removed', 'Coupon has been removed');
    }, [initialPrice, showToast]);

    // Optimize: Memoize the core handlePayment function
    const handlePayment = useCallback(async (tokenOverride: string | null) => {
        const currentToken = tokenOverride || localStorage.getItem("EnrollMentToken");
        const courseId = course.id;

        // Check if user is logged in
        if (!currentToken) {
            // Your original logic to navigate for login/info collection
            navigate("/personal-info", {
                state: {
                    courseName: course.title,
                    courseId: course.id,
                    price: course.finalPrice || course.price,
                },
            });
            // Critical change: Set the flag BEFORE navigating. The useEffect below will handle resume.
            paymentAttemptRef.current = true;
            return;
        }

        // If logged in (currentToken exists), proceed with payment logic
        try {
            setEnrolling(true);

            const scriptLoaded = await loadRazorpayScript();
            if (!scriptLoaded) {
                showToast('error', 'Payment Gateway Error', 'Failed to load payment gateway. Please try again.');
                return;
            }

            const orderData = await paymentService.capturePayment([course.id], currentToken);

            if (!orderData.success) {
                showToast('error', 'Order Creation Failed', orderData.message || 'Failed to create order. Please try again.');
                return;
            }

            const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;

            const options = {
                key: razorpayKey,
                amount: orderData.amount,
                currency: orderData.currency,
                name: "Shell Entertainment",
                description: `Enrollment for ${course.title}`,
                order_id: orderData.orderId,
                handler: async (response: any) => {
                    // Payment successful on Razorpay side, now verify it on your server
                    try {
                        // Show loading during verification
                        showToast('info', 'Processing Payment', 'Verifying your payment, please wait...');

                        const verifyData = await paymentService.verifyPayment({
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                            courses: [course.id]
                        }, currentToken);

                        if (verifyData.success) {
                            setIsEnrolledLocally(true);
                            onEnrollmentSuccess();

                            // Show success message before redirect
                            showToast('success', 'Payment Successful! 🎉', 'Redirecting to confirmation page...');

                            // Quick redirect for better UX (800ms original, keep it fast)
                            setTimeout(() => {
                                navigate(`/enrollment-success?courseName=${encodeURIComponent(course.title)}&price=${course.finalPrice}&originalPrice=${course.originalPrice}&courseId=${course.id}`);
                            }, 500); // Optimized delay
                        } else {
                            showToast('error', 'Payment Failed', 'Payment verification failed. Please contact support.');
                        }
                    } catch (error) {
                        showToast('error', 'Verification Error', 'Payment verification failed. Please contact support if amount was deducted.');
                    }
                },
                theme: { color: "#3B82F6" },
                modal: { ondismiss: () => showToast('warning', 'Payment Cancelled', 'Payment was cancelled.') }
            };

            const razorpay = new (window as any).Razorpay(options);
            razorpay.open();

        } catch (error) {
            showToast('error', 'Payment Failed', 'Unable to start payment process. Please try again.');
        } finally {
            setEnrolling(false);
            paymentAttemptRef.current = false;
        }
    }, [course, navigate, loadRazorpayScript, showToast, setIsEnrolledLocally, onEnrollmentSuccess]);

    // Handle button click, simply calls the main payment handler
    const handlePaymentClick = useCallback(() => {
        handlePayment(enrollmentToken);
    }, [handlePayment, enrollmentToken]);


    // Effect to auto-read token and resume payment (Your Original Logic)
    useEffect(() => {
        const newToken = localStorage.getItem("EnrollMentToken");
        // Update local state when token changes in localStorage (e.g., after login/signup redirection)
        if (newToken !== enrollmentToken) {
            setEnrollmentToken(newToken);
        }

        // We only check if the EnrollMentToken just became available AND a payment attempt was flagged as pending
        if (newToken && paymentAttemptRef.current) {
            // Slight delay to ensure React state updates and the redirect stack is managed
            setTimeout(() => {
                handlePayment(newToken); // Pass the new token directly
            }, 100);
        }
    }, [enrollmentToken, handlePayment]);

    // Cleanup logic removed as requested (or rather, the empty cleanup useEffect was removed)


    if (isEnrolled) {
        // Component state for ALREADY ENROLLED users
        return (
            <Card className="bg-card/80 backdrop-blur-lg border-primary/20 sticky top-24 h-fit shadow-xl">
                <CardContent className="p-4 sm:p-6">
                    <div className="text-center mb-4 sm:mb-6">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                            <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-green-600 mb-1 sm:mb-2">
                            You're Enrolled!
                        </h3>
                    </div>

                    <Button
                        className="w-full bg-green-600 hover:bg-green-700 h-10 sm:h-12 text-sm sm:text-base mb-3 sm:mb-4"
                        onClick={() => navigate(`/course-learning/${course.id}`)}
                    >
                        <Play className="w-4 h-4 mr-2" />
                        Go to Course
                    </Button>
                    <div className="text-center text-xs sm:text-sm text-muted-foreground">
                        Access all course materials and track your progress
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <>
            <Card className="bg-card/80 backdrop-blur-lg border-primary/20 sticky top-24 h-fit shadow-xl">
                {/* Course Thumbnail */}
                <div className="aspect-video bg-muted relative">
                    <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                        onError={(e) => e.currentTarget.src = 'https://placehold.co/600x400?text=Course+Thumbnail'}
                    />
                </div>

                <CardContent className="p-6 space-y-6">
                    {/* Price Display */}
                    <div className="text-center mb-4 sm:mb-6">
                        <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                            ₹{finalPrice}
                        </div>
                        {course.originalPrice > finalPrice && (
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <span className="text-sm text-muted-foreground line-through">
                                    ₹{course.originalPrice}
                                </span>
                                {course.discountPercent > 0 && (
                                    <Badge variant="destructive" className="text-xs">
                                        {course.discountPercent}% OFF
                                    </Badge>
                                )}
                            </div>
                        )}
                        <p className="text-xs sm:text-sm text-muted-foreground">One-time payment</p>
                    </div>

                    {/* Coupon Section (Mocked) */}
                    <div className="mb-4 sm:mb-6">
                        <div className="flex gap-2">
                            <Input
                                placeholder="Enter coupon code"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                className="flex-1 text-sm"
                            />
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleApplyCoupon}
                                disabled={applyingCoupon || !couponCode.trim()}
                            >
                                <Tag className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Main Enrollment Button */}
                    <Button
                        data-testid="enroll-button"
                        className="w-full bg-gradient-to-r from-primary to-accent h-10 sm:h-12 mb-3 sm:mb-4 text-sm sm:text-base"
                        onClick={handlePaymentClick} // Use the useCallback wrapper
                        disabled={enrolling}
                    >
                        {enrolling ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Processing Payment...
                            </>
                        ) : (
                            <>
                                <CreditCard className="w-4 h-4 mr-2" />
                                {`Enroll Now - ₹${finalPrice}`}
                            </>
                        )}
                    </Button>

                    <div className="text-center text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
                        <Shield className="w-4 h-4 inline mr-1" />
                        30-day money-back guarantee
                    </div>

                    <Separator className="my-4 sm:my-6" />

                    {/* Course Includes List */}
                    <div className="space-y-3 sm:space-y-4">
                        <h4 className="font-semibold text-sm sm:text-base">This course includes:</h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                            {course.includes.map((inc: string, i: number) => (
                                <div key={i} className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-green-500 shrink-0" /> {inc}
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Combined Signup/Enrollment Modal - Removed since logic navigates to /personal-info */}
            {/* The existing Dialog component remains but is hidden by the navigation flow. 
                I will remove the modal logic to avoid unnecessary clutter since navigation is used. */}
        </>
    );
});
// Added React.memo for CourseEnrollment to prevent re-renders unless props change
// This improves speed in the CourseDetail parent component.


// ====================================================================
// 3. Main Course Detail Page Component (CourseDetail)
// ====================================================================

const CourseDetail = () => {
    const { courseId } = useParams();
    const [searchParams] = useSearchParams();
    const { user } = useSelector((state:any) => state.auth);
    const [course, setCourse] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEnrolled, setIsEnrolled] = useState(false);
    
    // enrollmentRef is unused, removing the state
    // const [enrollmentRef, setEnrollmentRef] = useState<any>(null);

    const [expandedSections, setExpandedSections] = useState(new Set([0]));
    const { showToast } = useCustomToast();
    
    // Optimize: Use useCallback for enrollment check
    const checkEnrollmentStatus = useCallback((courseData: any, userId: string) => {
        if (!userId) {
            setIsEnrolled(false);
            return;
        }
        const isUserEnrolled = courseData.studentsEnrolled?.some((student: string) => student === userId) || false;
        setIsEnrolled(isUserEnrolled);
    }, []); // Empty dependency array, function never changes

    // Optimize: Use useCallback for fetching course details
    const fetchCourseDetails = useCallback(async () => {
        const currentCourseId = courseId;
        if (!currentCourseId) return;
        
        setIsLoading(true);
        try {
            const response = await courseService.getCourseDetails(currentCourseId);
            const apiData = Array.isArray(response.data) ? response.data[0] : response.data;

            if (!apiData) {
                throw new Error("No course data found in response");
            }

            const mappedCourse = {
                id: apiData._id,
                title: apiData.courseName,
                description: apiData.courseDescription ? apiData.courseDescription.replace(/\r\n|\n/g, ' ').trim() : '',
                overview: apiData.courseOverview,
                price: apiData.finalPrice || apiData.originalPrice || 0,
                finalPrice: apiData.finalPrice,
                originalPrice: apiData.originalPrice,
                discountPercent: apiData.discountPercent || 0,
                thumbnail: apiData.thumbnail,
                brochure: apiData.brochures,
                level: apiData.courseLevel,
                duration: apiData.courseDuration,
                category: apiData.category?.name || "General",
                rating: 4.8,
                reviews: 120,
                enrolledCount: apiData.studentsEnrolled ? apiData.studentsEnrolled.length : 0,
                studentsEnrolled: apiData.studentsEnrolled,
                instructorName: "Indurstry expert",
                instructorAvatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=JavaExpert&backgroundColor=b6e3f4,c0aede,d1d4f9&hairColor=2c1b12,654522,54456f&glasses=variant01",
                instructorBio: "Experienced software engineer specializing in scalable Java and Spring Boot solutions.",
                whatYouLearn: apiData.whatYouWillLearn
                    ? apiData.whatYouWillLearn.split(/\r\n|\n/).filter((t: string) => t.trim())
                    : [],
                curriculum: apiData.courseContent?.map((section: any, index: number) => ({
                    id: section._id || index,
                    title: section.sectionName,
                    lessons: section.subSection?.map((sub: any, subIndex: number) => ({
                        title: sub.title,
                        description: sub.description && sub.description.trim() !== "some discription here" ? sub.description : null,
                    })) || []
                })) || [],
                includes: [
                    apiData.courseDuration + " of video content",
                    "Full Lifetime Access",
                    "Certificate of Completion",
                    "Project Files & Codebase"
                ]
            };

            setCourse(mappedCourse);
            checkEnrollmentStatus(apiData, user?.id);

        } catch (err) {
            console.error("Error fetching course:", err);
            showToast('error', 'Error', "Failed to load course details.");
            setCourse(null);
        } finally {
            setIsLoading(false);
        }
    }, [courseId, user?.id, checkEnrollmentStatus, showToast]); // Dependencies for useCallback

    useEffect(() => {
        fetchCourseDetails();
    }, [fetchCourseDetails]); // fetchCourseDetails is memoized, so this runs correctly.

    // Auto-enrollment effect (Your Original Logic - kept fast)
    useEffect(() => {
        const autoEnroll = searchParams.get('autoEnroll');
        const enrollmentToken = localStorage.getItem('EnrollMentToken');

        if (autoEnroll === 'true' && enrollmentToken && course && !isEnrolled) {
            // Reduced delay for better UX
            setTimeout(() => {
                const enrollButton = document.querySelector('[data-testid="enroll-button"]') as HTMLButtonElement;
                if (enrollButton) {
                    // Show immediate feedback
                    toast.success('Auto-enrolling you in the course...');
                    enrollButton.click();
                }
            }, 100); // Optimized delay to 100ms
        }
    }, [course, isEnrolled, searchParams]);

    const toggleSection = useCallback((index: number) => {
        setExpandedSections(prev => {
            const newSet = new Set(prev);
            newSet.has(index) ? newSet.delete(index) : newSet.add(index);
            return newSet;
        });
    }, []); // Memoize toggle function

    const handleDownloadBrochure = useCallback(() => {
        if (course?.brochure) {
            window.open(course.brochure, '_blank');
        } else {
            showToast('error', 'Error', "No brochure available for download.");
        }
    }, [course?.brochure, showToast]); // Dependency on course.brochure

    const handleSuccessfulEnrollment = useCallback(() => {
        setIsEnrolled(true);
    }, []); // Memoize success handler

    // --- Loading and Error States ---
    if (isLoading) return (
        <div className="min-h-screen bg-background">
            <Navigation />
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <div className="relative">
                    <Loader2 className="w-12 h-12 animate-spin text-primary" />
                    <div className="absolute inset-0 w-12 h-12 border-2 border-primary/20 rounded-full animate-ping" />
                </div>
                <div className="text-center space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">Loading Course Details</h3>
                    <p className="text-sm text-muted-foreground">Please wait while we fetch the course information...</p>
                </div>
            </div>
            <Footer />
        </div>
    );

    if (!course) return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
            <Navigation />
            <div className="text-center p-10 bg-card rounded-xl shadow-lg mt-20">
                <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
                <h2 className="text-xl font-bold">Course Not Found</h2>
                <p className="text-muted-foreground">The requested course details could not be loaded or do not exist.</p>
                <Button asChild className="mt-6" variant="outline">
                    <Link to="/all-courses">← Back to All Courses</Link>
                </Button>
            </div>
            <Footer />
        </div>
    );

    // --- Main Render ---
    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <main className="container mx-auto px-4 py-24 max-w-7xl">
                <div className="mb-8 text-sm text-muted-foreground flex items-center gap-2">
                    <Link to="/all-courses" className="hover:text-primary flex items-center">
                        <ArrowLeft className="w-4 h-4 mr-1"/> Courses
                    </Link>
                    <span>/</span>
                    <span className="text-foreground font-medium">{course.category}</span>
                </div>

                <div className="grid lg:grid-cols-3 gap-10">

                    {/* LEFT COLUMN - Main Info */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Header Section */}
                        <div className="space-y-4">
                            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0 capitalize">{course.level}</Badge>
                            <h1 className="text-3xl md:text-4xl font-bold text-foreground">{course.title}</h1>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {course.description}
                            </p>

                            {/* Stats Bar */}
                            <div className="flex flex-wrap gap-6 pt-4 text-sm font-medium text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                    <span>**{course.rating}** Rating</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-blue-500" />
                                    <span>**{course.enrolledCount.toLocaleString()}** Enrolled</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-green-500" />
                                    <span>**{course.duration}**</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MessageSquare className="w-5 h-5 text-purple-500" />
                                    <span>**{course.reviews.toLocaleString()}** Reviews</span>
                                </div>
                            </div>
                        </div>

                        <Separator />

                        {/* What You'll Learn */}
                        {course.whatYouLearn.length > 0 && (
                            <Card className="border-border bg-card/50">
                                <CardContent className="p-6">
                                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                        <ShieldCheck className="text-primary w-6 h-6" /> What You Will **Master**
                                    </h3>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {course.whatYouLearn.map((item: string, idx: number) => (
                                            <div key={idx} className="flex items-start gap-2 p-3 bg-muted/20 rounded-lg text-sm font-medium">
                                                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        <Separator />

                        {/* Course Overview */}
                        <div>
                            <h3 className="text-2xl font-bold mb-4">Course Overview</h3>
                            <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
                                {course.overview}
                            </div>
                        </div>

                        <Separator />

                        {/* Curriculum / Content */}
                        <div>
                            <h3 className="text-2xl font-bold mb-6">Course Curriculum</h3>
                            <div className="space-y-4">
                                {course.curriculum.map((section: any, idx: number) => {
                                    const isOpen = expandedSections.has(idx);
                                    const totalLessons = section.lessons.length;
                                    return (
                                        <div key={section.id} className="border rounded-xl overflow-hidden bg-card shadow-sm">
                                            <button
                                                onClick={() => toggleSection(idx)}
                                                className="w-full flex items-center justify-between p-4 hover:bg-accent/50 transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <ChevronDown className={`w-5 h-5 transition-transform text-primary ${isOpen ? 'rotate-180' : ''}`}/>
                                                    <span className="text-lg font-semibold text-foreground">{section.title}</span>
                                                </div>
                                                <Badge variant="outline" className="ml-auto">{totalLessons} Lessons</Badge>
                                            </button>

                                            {isOpen && (
                                                <div className="border-t bg-muted/20 divide-y divide-border/50">
                                                    {totalLessons > 0 ? (
                                                        section.lessons.map((lesson: any, lIdx: number) => (
                                                            <div key={lIdx} className="p-3 pl-12 flex items-start gap-3 text-sm hover:bg-accent/30 transition-colors">
                                                                <Play className="w-4 h-4 text-primary/70 shrink-0 mt-1" />
                                                                <div className="flex flex-col">
                                                                    <span className="font-medium text-foreground">{lesson.title}</span>
                                                                    {lesson.description && (
                                                                        <span className="text-xs text-muted-foreground italic">{lesson.description}</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="p-4 text-center text-xs text-muted-foreground">No lessons uploaded yet in this section.</div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN - Sticky Sidebar (Enrollment Component) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">

                            <CourseEnrollment
                                course={course}
                                isEnrolled={isEnrolled}
                                onEnrollmentSuccess={handleSuccessfulEnrollment}
                                setIsEnrolledLocally={setIsEnrolled}
                            />

                            {/* Instructor Card */}
                            <Card className="shadow-lg">
                                <CardContent className="p-6 text-center">
                                    <h3 className="text-xl font-bold mb-4 text-foreground">Your Instructor</h3>
                                    <img
                                        src={course.instructorAvatar}
                                        alt={course.instructorName}
                                        className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-4 border-primary/50 shadow-md"
                                    />
                                    <h4 className="text-lg font-bold mb-1 text-primary">{course.instructorName}</h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed italic">{course.instructorBio}</p>
                                    <div className="mt-4">
                                        <Button variant="link" className="text-primary hover:text-primary/80">View Full Profile →</Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Brochure Download Button */}
                            {course.brochure && (
                                <Button onClick={handleDownloadBrochure} variant="outline" className="w-full gap-2 h-12 border-dashed border-2">
                                    <Download className="w-5 h-5" /> **Download Course Brochure**
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CourseDetail;