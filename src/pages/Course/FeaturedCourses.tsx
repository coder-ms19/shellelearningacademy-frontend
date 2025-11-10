// // import React, { useState } from "react";
// // import { Link } from "react-router-dom";
// // import { Button } from "@/components/ui/button";
// // import { Star, Clock } from "lucide-react";

// // const FeaturedCourses = () => {
// //   // Dummy data with 5 courses and varying discounts
// //   const courses = [
// //     {
// //       id: 1,
// //       title: "Complete Digital Marketing Masterclass",
// //       instructor: "Sarah Johnson",
// //       rating: 4.8,
// //       reviews: 256,
// //       duration: 12,
// //       level: "Beginner",
// //       image: "https://res.cloudinary.com/manish19/image/upload/v1760501700/Instagram/stories/ieqfvkb5lbiinpffxhtv.jpg",
// //       price: 499,
// //       originalPrice: 4999,
// //       discountPercent: 90,
// //     },
// //     {
// //       id: 2,
// //       title: "UI/UX Design Professional Certificate",
// //       instructor: "Michael Chen",
// //       rating: 4.9,
// //       reviews: 321,
// //       duration: 16,
// //       level: "Intermediate",
// //       image: "https://res.cloudinary.com/manish19/image/upload/v1760501700/Instagram/stories/ieqfvkb5lbiinpffxhtv.jpg",
// //       price: 4499,
// //       originalPrice: 4999,
// //       discountPercent: 10,
// //     },
// //     {
// //       id: 3,
// //       title: "Python Programming: Zero to Hero",
// //       instructor: "David Miller",
// //       rating: 4.8,
// //       reviews: 521,
// //       duration: 14,
// //       level: "Beginner",
// //       image: "https://res.cloudinary.com/manish19/image/upload/v1750333109/spring/message/fjeqqw9qdrirdevr2mga.webp",
// //       price: 999,
// //       originalPrice: 4999,
// //       discountPercent: 80,
// //     },
// //     {
// //       id: 4,
// //       title: "Stock Market Investing for Beginners",
// //       instructor: "Priya Sharma",
// //       rating: 4.7,
// //       reviews: 128,
// //       duration: 8,
// //       level: "Beginner",
// //       image: "https://res.cloudinary.com/manish19/image/upload/v1754848506/spring/message/mteuh3b2w7wjq1mplsba.jpg",
// //       price: 199,
// //       originalPrice: 999,
// //       discountPercent: 80,
// //     },
// //     {
// //       id: 5,
// //       title: "Data Analytics with Python & SQL",
// //       instructor: "James Wilson",
// //       rating: 4.8,
// //       reviews: 298,
// //       duration: 12,
// //       level: "Intermediate",
// //       image: "https://res.cloudinary.com/manish19/image/upload/v1754848451/spring/message/gxlxp1cxtuckxmvgd6jp.jpg",
// //       price: 2999,
// //       originalPrice: 4999,
// //       discountPercent: 40,
// //     },
// //   ];

// //   const [currentIndex, setCurrentIndex] = useState(0);

// //   const nextSlide = () => {
// //     setCurrentIndex((prev) => (prev + 1) % (courses.length - 1));
// //   };

// //   const prevSlide = () => {
// //     setCurrentIndex((prev) => (prev - 1 + (courses.length - 1)) % (courses.length - 1));
// //   };

// //   const mainCourse = courses[currentIndex];
// //   const nextCourse = courses[(currentIndex + 1) % courses.length];

// //   return (
// //     <section className="py-12 sm:py-20 bg-gradient-to-b from-background to-secondary/10">
// //       <div className="container mx-auto px-4">
// //         {/* Header - Responsive */}
// //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4 sm:gap-0">
// //           <div className="text-center sm:text-left">
// //             <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Featured Courses</h2>
// //             <p className="text-sm sm:text-base text-muted-foreground mt-1">Handpicked courses to accelerate your learning journey</p>
// //           </div>
// //           <div className="flex items-center space-x-3 self-center sm:self-auto">
// //             <Link to="/all-courses">
// //               <Button variant="outline" className="text-sm font-medium">
// //                 View All Courses
// //               </Button>
// //             </Link>
// //             <div className="flex space-x-2">
// //               <button
// //                 onClick={prevSlide}
// //                 className="w-8 h-8 sm:w-10 sm:h-10 bg-muted rounded-full flex items-center justify-center hover:bg-accent transition-colors"
// //               >
// //                 <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
// //                 </svg>
// //               </button>
// //               <button
// //                 onClick={nextSlide}
// //                 className="w-8 h-8 sm:w-10 sm:h-10 bg-muted rounded-full flex items-center justify-center hover:bg-accent transition-colors"
// //               >
// //                 <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
// //                 </svg>
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Courses Container - Stacked on mobile, row on lg */}
// //         <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 overflow-hidden">
// //           {/* Main Large Card - Full width on mobile, 80% on lg */}
// //           <div className="w-full lg:flex-1 bg-card rounded-2xl shadow-lg overflow-hidden border">
// //             {/* Large Image - Responsive height */}
// //             <div className="relative h-64 sm:h-80 lg:h-96 xl:h-[500px]">
// //               <img
// //                 src={mainCourse.image}
// //                 alt={mainCourse.title}
// //                 className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
// //               />
// //               {/* Price Badge */}
// //               <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-primary text-primary-foreground px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
// //                 ₹{mainCourse.price.toLocaleString()}
// //               </div>
// //               {/* Discount Badge */}
// //               {mainCourse.discountPercent > 0 && (
// //                 <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-destructive text-destructive-foreground px-2 py-1 rounded-full text-xs font-bold">
// //                   {mainCourse.discountPercent}% OFF
// //                 </div>
// //               )}
// //             </div>

// //             {/* Content - Responsive padding and text */}
// //             <div className="p-4 sm:p-6">
// //               <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 line-clamp-2">{mainCourse.title}</h3>
// //               <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">{mainCourse.instructor}</p>
              
// //               {/* Rating and Details */}
// //               <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 gap-2 sm:gap-0">
// //                 <div className="flex items-center space-x-1">
// //                   <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
// //                   <span className="font-semibold text-foreground text-sm sm:text-base">{mainCourse.rating}</span>
// //                   <span className="text-muted-foreground text-xs sm:text-sm">({mainCourse.reviews})</span>
// //                 </div>
// //                 <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-muted-foreground">
// //                   <div className="flex items-center space-x-1">
// //                     <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
// //                     <span>{mainCourse.duration} weeks</span>
// //                   </div>
// //                   <span>•</span>
// //                   <span className="capitalize">{mainCourse.level}</span>
// //                 </div>
// //               </div>

// //               {/* Button */}
// //               <Link to={`/course/${mainCourse.id}`}>
// //                 <Button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 sm:py-3 rounded-full text-sm font-semibold transition-colors">
// //                   View Course
// //                 </Button>
// //               </Link>
// //             </div>
// //           </div>

// //           {/* Preview Small Card - Full width on mobile, 20% on lg */}
// //           <div className="w-full lg:w-1/5 lg:min-w-[250px] bg-card rounded-2xl shadow-lg overflow-hidden border">
// //             {/* Smaller Image */}
// //             <div className="relative h-40 sm:h-48">
// //               <img
// //                 src={nextCourse.image}
// //                 alt={nextCourse.title}
// //                 className="w-full h-full object-cover"
// //               />
// //               {/* Price Badge */}
// //               <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-1 sm:px-2 py-1 rounded-full text-xs font-semibold">
// //                 ₹{nextCourse.price.toLocaleString()}
// //               </div>
// //               {/* Discount Badge */}
// //               {nextCourse.discountPercent > 0 && (
// //                 <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground px-1 py-1 rounded-full text-xs font-bold">
// //                   {nextCourse.discountPercent}% OFF
// //                 </div>
// //               )}
// //             </div>

// //             {/* Compact Content */}
// //             <div className="p-3 sm:p-4">
// //               <h4 className="text-xs sm:text-sm font-bold text-foreground mb-1 line-clamp-2">{nextCourse.title}</h4>
// //               <p className="text-xs text-muted-foreground mb-2">{nextCourse.instructor}</p>
              
// //               <div className="flex items-center justify-between mb-2 sm:mb-3">
// //                 <div className="flex items-center space-x-1">
// //                   <Star className="w-3 h-3 text-yellow-400 fill-current" />
// //                   <span className="text-xs font-semibold">{nextCourse.rating}</span>
// //                 </div>
// //                 <div className="text-xs text-muted-foreground">
// //                   <span>{nextCourse.duration}w</span>
// //                   <span>•</span>
// //                   <span className="capitalize">{nextCourse.level[0]}</span>
// //                 </div>
// //               </div>

// //               <Link to={`/course/${nextCourse.id}`}>
// //                 <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs rounded-full transition-colors">
// //                   View
// //                 </Button>
// //               </Link>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default FeaturedCourses;







// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Star, Clock } from "lucide-react";
// import { courseService } from "@/service/course.service";
// import toast from "react-hot-toast";

// const inferLevel = (courseName: string): string => {
//   const lowerName = courseName.toLowerCase();
//   if (lowerName.includes("beginner")) return "Beginner";
//   if (lowerName.includes("intermediate") || lowerName.includes("advanced")) return "Intermediate";
//   return "All Levels";
// };

// const inferCategory = (courseName: string): string => {
//   const lowerName = courseName.toLowerCase();
//   if (lowerName.includes("marketing")) return "Digital Marketing";
//   if (lowerName.includes("python") || lowerName.includes("programming")) return "Programming";
//   if (lowerName.includes("data") || lowerName.includes("analytics")) return "Data Science";
//   return "General";
// };

// const FeaturedCourses = () => {
//   const [courses, setCourses] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const fetchCourses = async () => {
//     try {
//       setIsLoading(true);
//       const res = await courseService.getAllCourses();
//       const coursesData = res.data || [];
//       // Transform API data to match CourseCard props
//       const transformedCourses = coursesData.map((course: any) => ({
//         id: course._id,
//         title: course.courseName,
//         description: course.courseDescription || course.whatYouWillLearn || "Explore this comprehensive course to master essential skills and advance your career.",
//         instructor: course.instructor?.fullNamme || "Unknown Instructor",
//         rating: course.ratingAndReviews?.length > 0
//           ? course.ratingAndReviews.reduce((acc: number, review: any) => acc + (review.rating || 0), 0) / course.ratingAndReviews.length
//           : 4.5,
//         reviews: course.ratingAndReviews?.length || 0,
//         students: course.studentsEnrolled?.length || 0,
//         duration: course.courseDuration || "Varies",
//         level: inferLevel(course.courseName) || "All Levels",
//         category: course.category?.name || inferCategory(course.courseName) || "General",
//         image: course.thumbnail,
//         price: course.finalPrice || course.discountedPrice || course.price || 0,
//         originalPrice: course.originalPrice,
//         discountedPrice: course.discountedPrice,
//         discountPercent: course.discountPercent,
//         createdAt: course.createdAt,
//       }));
//       // Sort by newest (createdAt)
//       const sortedCourses = transformedCourses
//         .sort((a: any, b: any) =>
//           new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
//         )
//         .slice(0, 6); // Only 6 featured
//       setCourses(sortedCourses);
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: "Failed to load featured courses. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const nextSlide = () => {
//     if (courses.length > 1) {
//       setCurrentIndex((prev) => (prev + 1) % courses.length);
//     }
//   };

//   const prevSlide = () => {
//     if (courses.length > 1) {
//       setCurrentIndex((prev) => (prev - 1 + courses.length) % courses.length);
//     }
//   };

//   if (isLoading || courses.length === 0) {
//     return (
//       <section className="py-12 sm:py-20 bg-gradient-to-b from-background to-secondary/10">
//         <div className="container mx-auto px-4">
//           <div className="text-center py-12">
//             <p className="text-muted-foreground">Loading featured courses...</p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   const hasMultipleCourses = courses.length > 1;
//   const mainCourse = courses[currentIndex];

//   return (
//     <section className="py-12 sm:py-20 bg-gradient-to-b from-background to-secondary/10">
//       <div className="container mx-auto px-4">
//         {/* Header - Responsive */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4 sm:gap-0">
//           <div className="text-center sm:text-left">
//             <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Featured Courses</h2>
//             <p className="text-sm sm:text-base text-muted-foreground mt-1">Handpicked courses to accelerate your learning journey</p>
//           </div>
//           <div className="flex items-center space-x-3 self-center sm:self-auto">
//             <Link to="/all-courses">
//               <Button variant="outline" className="text-sm font-medium">
//                 View All Courses
//               </Button>
//             </Link>
//             {hasMultipleCourses && (
//               <div className="flex space-x-2">
//                 <button
//                   onClick={prevSlide}
//                   className="w-8 h-8 sm:w-10 sm:h-10 bg-muted rounded-full flex items-center justify-center hover:bg-accent transition-colors"
//                 >
//                   <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                   </svg>
//                 </button>
//                 <button
//                   onClick={nextSlide}
//                   className="w-8 h-8 sm:w-10 sm:h-10 bg-muted rounded-full flex items-center justify-center hover:bg-accent transition-colors"
//                 >
//                   <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                   </svg>
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Courses Container - Stacked on mobile, row on lg */}
//         <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 overflow-hidden">
//           {/* Main Large Card - Full width if single, 70% if multiple */}
//           <div className={`${!hasMultipleCourses ? 'w-full' : 'w-full lg:w-[70%]'} bg-card rounded-2xl shadow-lg overflow-hidden border`}>
//             {/* Large Image - Responsive height */}
//             <div className="relative h-64 sm:h-80 lg:h-96 xl:h-[500px]">
//               <img
//                 src={mainCourse.image}
//                 alt={mainCourse.title}
//                 className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
//                 loading="lazy"
//                 decoding="async"
//               />
//               {/* Price Badge */}
//               <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-primary text-primary-foreground px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
//                 ₹{mainCourse.price.toLocaleString()}
//               </div>
//               {/* Discount Badge */}
//               {mainCourse.discountPercent > 0 && (
//                 <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-destructive text-destructive-foreground px-2 py-1 rounded-full text-xs font-bold">
//                   {mainCourse.discountPercent}% OFF
//                 </div>
//               )}
//             </div>

//             {/* Content - Responsive padding and text */}
//             <div className="p-4 sm:p-6">
//               <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 line-clamp-2">{mainCourse.title}</h3>
//               <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">{mainCourse.instructor}</p>
              
//               {/* Rating and Details */}
//               <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 gap-2 sm:gap-0">
//                 <div className="flex items-center space-x-1">
//                   <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
//                   <span className="font-semibold text-foreground text-sm sm:text-base">{mainCourse.rating}</span>
//                   <span className="text-muted-foreground text-xs sm:text-sm">({mainCourse.reviews})</span>
//                 </div>
//                 <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-muted-foreground">
//                   <div className="flex items-center space-x-1">
//                     <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
//                     <span>{mainCourse.duration} weeks</span>
//                   </div>
//                   <span>•</span>
//                   <span className="capitalize">{mainCourse.level}</span>
//                 </div>
//               </div>

//               {/* Button */}
//               <Link to={`/course/${mainCourse.id}`}>
//                 <Button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 sm:py-3 rounded-full text-sm font-semibold transition-colors">
//                   View Course
//                 </Button>
//               </Link>
//             </div>
//           </div>

//           {/* Preview Small Card - Only if multiple courses, 30% on lg */}
//           {hasMultipleCourses && (
//             <>
//               <div className="hidden lg:block lg:w-[30%] lg:min-w-[300px] bg-card rounded-2xl shadow-lg overflow-hidden border">
//                 {/* Smaller Image */}
//                 <div className="relative h-40 sm:h-48">
//                   {courses.length > 0 && (() => {
//                     const nextIndex = (currentIndex + 1) % courses.length;
//                     const nextCourse = courses[nextIndex];
//                     return (
//                       <>
//                         <img
//                           src={nextCourse.image}
//                           alt={nextCourse.title}
//                           className="w-full h-full object-cover"
//                           loading="lazy"
//                           decoding="async"
//                         />
//                         {/* Price Badge */}
//                         <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-1 sm:px-2 py-1 rounded-full text-xs font-semibold">
//                           ₹{nextCourse.price.toLocaleString()}
//                         </div>
//                         {/* Discount Badge */}
//                         {nextCourse.discountPercent > 0 && (
//                           <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground px-1 py-1 rounded-full text-xs font-bold">
//                             {nextCourse.discountPercent}% OFF
//                           </div>
//                         )}
//                       </>
//                     );
//                   })()}
//                 </div>

//                 {/* Compact Content */}
//                 <div className="p-3 sm:p-4">
//                   {courses.length > 0 && (() => {
//                     const nextIndex = (currentIndex + 1) % courses.length;
//                     const nextCourse = courses[nextIndex];
//                     return (
//                       <>
//                         <h4 className="text-xs sm:text-sm font-bold text-foreground mb-1 line-clamp-2">{nextCourse.title}</h4>
//                         <p className="text-xs text-muted-foreground mb-2">{nextCourse.instructor}</p>
                        
//                         <div className="flex items-center justify-between mb-2 sm:mb-3">
//                           <div className="flex items-center space-x-1">
//                             <Star className="w-3 h-3 text-yellow-400 fill-current" />
//                             <span className="text-xs font-semibold">{nextCourse.rating}</span>
//                           </div>
//                           <div className="text-xs text-muted-foreground">
//                             <span>{nextCourse.duration}w</span>
//                             <span>•</span>
//                             <span className="capitalize">{nextCourse.level}</span>
//                           </div>
//                         </div>

//                         <Link to={`/course/${nextCourse.id}`}>
//                           <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs rounded-full transition-colors">
//                             View
//                           </Button>
//                         </Link>
//                       </>
//                     );
//                   })()}
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturedCourses;




import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, Clock } from "lucide-react";
import { courseService } from "@/service/course.service";
import toast from "react-hot-toast";

const inferLevel = (courseName: string): string => {
  const lowerName = courseName.toLowerCase();
  if (lowerName.includes("beginner")) return "Beginner";
  if (lowerName.includes("intermediate") || lowerName.includes("advanced")) return "Intermediate";
  return "All Levels";
};

const inferCategory = (courseName: string): string => {
  const lowerName = courseName.toLowerCase();
  if (lowerName.includes("marketing")) return "Digital Marketing";
  if (lowerName.includes("python") || lowerName.includes("programming")) return "Programming";
  if (lowerName.includes("data") || lowerName.includes("analytics")) return "Data Science";
  return "General";
};

const FeaturedCourses = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      const res = await courseService.getAllCourses();
      const coursesData = res.data || [];
      // Transform API data to match CourseCard props
      const transformedCourses = coursesData.map((course: any) => ({
        id: course._id,
        title: course.courseName,
        description: course.courseDescription || course.whatYouWillLearn || "Explore this comprehensive course to master essential skills and advance your career.",
        instructor: course.instructor?.fullNamme || "Unknown Instructor",
        rating: course.ratingAndReviews?.length > 0
          ? course.ratingAndReviews.reduce((acc: number, review: any) => acc + (review.rating || 0), 0) / course.ratingAndReviews.length
          : 4.5,
        reviews: course.ratingAndReviews?.length || 0,
        students: course.studentsEnrolled?.length || 0,
        duration: course.courseDuration || "Varies",
        level: inferLevel(course.courseName) || "All Levels",
        category: course.category?.name || inferCategory(course.courseName) || "General",
        image: course.thumbnail,
        price: course.finalPrice || course.discountedPrice || course.price || 0,
        originalPrice: course.originalPrice,
        discountedPrice: course.discountedPrice,
        discountPercent: course.discountPercent,
        createdAt: course.createdAt,
      }));
      // Sort by newest (createdAt)
      const sortedCourses = transformedCourses
        .sort((a: any, b: any) =>
          new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
        )
        .slice(0, 6); // Up to 6 for carousel
      setCourses(sortedCourses);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load featured courses. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const nextSlide = () => {
    if (courses.length > 1) {
      setCurrentIndex((prev) => (prev + 1) % courses.length);
    }
  };

  const prevSlide = () => {
    if (courses.length > 1) {
      setCurrentIndex((prev) => (prev - 1 + courses.length) % courses.length);
    }
  };

  if (isLoading || courses.length === 0) {
    return (
      <section className="py-12 sm:py-20 bg-gradient-to-b from-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading featured courses...</p>
          </div>
        </div>
      </section>
    );
  }

  const hasMultipleCourses = courses.length > 1;
  const mainCourse = courses[currentIndex];
  const nextIndex = (currentIndex + 1) % courses.length;
  const nextCourse = courses[nextIndex];

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4">
        {/* Header - Responsive */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4 sm:gap-0">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Featured Courses</h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">Handpicked courses to accelerate your learning journey</p>
          </div>
          <div className="flex items-center space-x-3 self-center sm:self-auto">
            <Link to="/all-courses">
              <Button variant="outline" className="text-sm font-medium">
                View All Courses
              </Button>
            </Link>
            {hasMultipleCourses && (
              <div className="flex space-x-2">
                <button
                  onClick={prevSlide}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-muted rounded-full flex items-center justify-center hover:bg-accent transition-colors"
                  aria-label="Previous course"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-muted rounded-full flex items-center justify-center hover:bg-accent transition-colors"
                  aria-label="Next course"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Courses Container - Stacked on mobile, row on lg */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 overflow-hidden">
          {/* Main Large Card - Full width if single, 70% if multiple */}
          <div className={`${!hasMultipleCourses ? 'w-full' : 'w-full lg:w-[70%]'} bg-card rounded-2xl shadow-lg overflow-hidden border`}>
            {/* Large Image - Responsive height with hover animation */}
            <Link to={`/course-detail/${mainCourse.id}`} className="block relative h-64 sm:h-80 lg:h-96 xl:h-[500px] cursor-pointer">
              <img
                src={mainCourse.image}
                alt={mainCourse.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              {/* Price Badge */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-primary text-primary-foreground px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                ₹{mainCourse.price.toLocaleString()}
              </div>
              {/* Discount Badge */}
              {mainCourse.discountPercent > 0 && (
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-destructive text-destructive-foreground px-2 py-1 rounded-full text-xs font-bold">
                  {mainCourse.discountPercent}% OFF
                </div>
              )}
            </Link>
            {/* Content - Responsive padding and text */}
            <div className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 line-clamp-2">{mainCourse.title}</h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">{mainCourse.instructor}</p>
              {/* Rating and Details */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 gap-2 sm:gap-0">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                  <span className="font-semibold text-foreground text-sm sm:text-base">{mainCourse.rating.toFixed(1)}</span>
                  <span className="text-muted-foreground text-xs sm:text-sm">({mainCourse.reviews})</span>
                </div>
                <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{mainCourse.duration} weeks</span>
                  </div>
                  <span>•</span>
                  <span className="capitalize">{mainCourse.level}</span>
                </div>
              </div>
              {/* Button */}
              <Link to={`/course-detail/${mainCourse.id}`}>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2 sm:py-3 rounded-full text-sm font-semibold transition-colors">
                  View Course
                </Button>
              </Link>
            </div>
          </div>
          {/* Preview Small Card - Only if multiple courses, 30% on lg, same image height */}
          {hasMultipleCourses && (
            <div className="hidden lg:block lg:w-[30%] lg:min-w-[300px] bg-card rounded-2xl shadow-lg overflow-hidden border">
              {/* Smaller Image - Same height as main, with hover animation */}
              <Link to={`/course-detail/${nextCourse.id}`} className="block relative h-64 sm:h-80 lg:h-96 xl:h-[500px] cursor-pointer">
                <img
                  src={nextCourse.image}
                  alt={nextCourse.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 "
                  loading="lazy"
                  decoding="async"
                />
                {/* Price Badge */}
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-1 sm:px-2 py-1 rounded-full text-xs font-semibold">
                  ₹{nextCourse.price.toLocaleString()}
                </div>
                {/* Discount Badge */}
                {nextCourse.discountPercent > 0 && (
                  <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground px-1 py-1 rounded-full text-xs font-bold">
                    {nextCourse.discountPercent}% OFF
                  </div>
                )}
              </Link>
              {/* Compact Content - Adjusted for smaller width */}
              <div className="p-3 sm:p-4">
                <h4 className="text-sm lg:text-base font-bold text-foreground mb-1 line-clamp-2">{nextCourse.title}</h4>
                <p className="text-xs sm:text-sm text-muted-foreground mb-2">{nextCourse.instructor}</p>
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                    <span className="text-xs font-semibold">{nextCourse.rating.toFixed(1)}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <span>{nextCourse.duration}w</span>
                    <span>•</span>
                    <span className="capitalize">{nextCourse.level}</span>
                  </div>
                </div>
                <Link to={`/course-detail/${nextCourse.id}`}>
                  <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs rounded-full transition-colors">
                    View Course
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;