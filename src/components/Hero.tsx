// import { Button } from "@/components/ui/button";
// import { ArrowRight, BookOpen, Play, TrendingUp } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { useTheme } from "@/components/ThemeProvider"; // Adjust path as needed

// export const Hero = () => {
//   const navigate = useNavigate();
//   const { theme } = useTheme();
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     // Animate progress bar from 0 to 80% (8/10)
//     const timer = setTimeout(() => {
//       setProgress(80);
//     }, 500);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <section className="relative min-h-screen flex items-center overflow-hidden">
//       {/* Background using theme vars */}
//       <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/20" />
      
//       {/* Floating geometric shapes for animation - subtle like image, using theme colors */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full animate-pulse opacity-50" />
//         <div className="absolute top-1/2 left-10 w-40 h-40 bg-muted/20 rounded-full animate-bounce delay-1000 opacity-30" />
//         <div className="absolute bottom-20 right-20 w-60 h-60 bg-secondary/30 rounded-full animate-ping opacity-20" />
//       </div>

//       <div className="container relative mx-auto px-4 py-8 md:py-12 lg:py-16 xl:py-20">
//         <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
//           {/* Left Side - Content */}
//           <div className="space-y-6 lg:space-y-8">
//             {/* Main Title - relying on base h1 color (#447C2A) */}
//             <div className="space-y-2">
//               <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl ">
//                 Learn The Future TODAY
//               </h1>
//             </div>

//             {/* Description - black text as per override */}
//             <p className="text-base md:text-lg lg:text-xl text-black leading-relaxed max-w-lg">
//               Shell e-learning academy is built on the core belief: "Learning Made Easy." Dive into our dynamic programs, connect with awesome mentors, and transform your education journey TODAY.
//             </p>

//             {/* CTA Buttons - using primary theme */}
//             <div className="flex flex-col sm:flex-row gap-4">
//               <Button 
//                 size="lg" 
//                 className="group bg-primary hover:bg-primary-hover text-primary-foreground rounded-full px-8 py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 smooth-transition"
//                 onClick={() => navigate("/all-courses")}
//               >
//                 Explore Courses
//                 <BookOpen className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
//               </Button>
//               <Button 
//                 size="lg" 
//                 variant="outline" 
//                 className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-8 py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 smooth-transition"
//                 onClick={() => navigate("/demo")}
//               >
//                 Watch Demo
//                 <Play className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
//               </Button>
//             </div>

//             {/* Learning Progress Card - using card bg, border, etc. */}
//             <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-border/50">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="p-2 bg-primary/10 rounded-full">
//                   <TrendingUp className="h-5 w-5 text-primary" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-lg text-black">Your Learning Progress</h3>
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <div className="flex justify-between text-sm text-black">
//                   <span>Courses Completed</span>
//                   <span>8 / 10</span>
//                 </div>
//                 <div className="w-full bg-muted rounded-full h-3">
//                   <div 
//                     className="bg-gradient-to-r from-primary to-primary h-3 rounded-full transition-all duration-1000 ease-out"
//                     style={{ width: `${progress}%` }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Image Container - reduced height, wider, rounded container, no border on image */}
//           <div className="relative order-first lg:order-last">
//             <div className="relative  rounded-2xl p-4 md:p-6  overflow-hidden">
//               {/* Dummy Image - reduced height, full width, no border radius on image itself */}
//               <img 
//                 src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
//                 alt="Learner in relaxed pose with laptop"
//                 className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-3xl"
//                 loading="lazy"
//               />
//               {/* Overlay Elements - using primary color */}
//               <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-full p-2 shadow-md">
//                 <BookOpen className="h-6 w-6 text-primary" />
//               </div>
//               <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-full p-2 shadow-md animate-pulse">
//                 <Play className="h-6 w-6 text-primary" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };


import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Play, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider"; // Ensure this path is correct

// --- Internal Components for Clarity ---

// 1. Progress Card Component
const LearningProgressCard = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar from 0 to 80% (8/10)
    const timer = setTimeout(() => {
      setProgress(80);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-card/90 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-border/70 max-w-lg transition-all hover:scale-[1.02] duration-500">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-primary/15 rounded-full shadow-inner">
          <TrendingUp className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="font-bold text-xl text-foreground">Your Learning Progress</h3>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between text-base text-muted-foreground">
          <span className="font-medium">Courses Completed</span>
          <span className="font-semibold text-primary">8 / 10</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3.5">
          <div 
            className="bg-gradient-to-r from-primary/80 to-primary h-3.5 rounded-full transition-all duration-1500 ease-in-out shadow-primary/30 shadow-md"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

// 2. Image Display Component
const HeroImageDisplay = () => (
  <div className="relative order-first lg:order-last p-4 rounded-[3rem] bg-background/50 backdrop-blur-sm lg:shadow-2xl shadow-primary/10">
    <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-gray-400/30 dark:shadow-black/50">
      <img 
        src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
        alt="Learner in relaxed pose with laptop"
        className="w-full h-80 lg:h-[32rem] object-cover transition-transform duration-500 hover:scale-[1.03]"
        loading="lazy"
      />
    </div>
    
    {/* Overlay Elements (Badges) */}
    <div className="absolute top-8 right-8 bg-card/90 backdrop-blur-sm rounded-full p-3 shadow-xl border border-border animate-float-slow">
      <BookOpen className="h-6 w-6 text-primary" />
    </div>
    <div className="absolute bottom-8 left-8 bg-card/90 backdrop-blur-sm rounded-full p-3 shadow-xl border border-border animate-pulse-light">
      <Play className="h-6 w-6 text-primary" />
    </div>
  </div>
);


// 3. Floating Background Shapes (Simplified and Enhanced)
const BackgroundShapes = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50 dark:opacity-30">
    <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full animate-float-slow" />
    <div className="absolute top-1/3 left-10 w-48 h-48 bg-secondary/10 rounded-full animate-pulse delay-500" />
    <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-primary/10 rounded-full animate-bounce-slow delay-1000" />
  </div>
);

// --- Main Hero Export ---

export const Hero = () => {
  const navigate = useNavigate();
  // Ensure useTheme is available to handle dark mode if necessary
  const { theme } = useTheme(); 

  // Tailwind Animation Keyframes (Assuming you have these defined in your CSS/config)
  /*
  @keyframes float-slow {
    0%, 100% { transform: translateY(0) translateX(0); }
    50% { transform: translateY(-10px) translateX(10px); }
  }
  @keyframes bounce-slow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
  }
  */

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-background">
      {/* Dynamic Background with Shapes */}
      <BackgroundShapes />
      
      <div className="container relative mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Left Side - Content */}
          <div className="space-y-8">
            
            {/* Title & Description */}
            <div className="space-y-4">
              <h1 className="font-extrabold text-5xl md:text-6xl lg:text-7xl leading-tight text-foreground">
                <span className="text-primary block lg:inline">Learn The Future</span> TODAY
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                Shell e-learning academy is built on the core belief: **"Learning Made Easy."** Dive into our dynamic programs, connect with awesome mentors, and **transform your education journey TODAY.**
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5">
              <Button 
                size="lg" 
                className="group h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-10 font-bold text-lg shadow-xl shadow-primary/30 transition-all duration-300 hover:scale-[1.03]"
                onClick={() => navigate("/all-courses")}
              >
                Explore Courses
                <BookOpen className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-14 border-2 border-primary text-primary hover:bg-primary/10 dark:hover:bg-primary/20 rounded-full px-10 font-bold text-lg transition-all duration-300 hover:scale-[1.03]"
                onClick={() => navigate("/demo")}
              >
                Watch Demo
                <Play className="ml-3 h-5 w-5 fill-primary" />
              </Button>
            </div>

            {/* Progress Card */}
            <LearningProgressCard />

          </div>

          {/* Right Side - Image Container */}
          <HeroImageDisplay />
          
        </div>
      </div>
    </section>
  );
};