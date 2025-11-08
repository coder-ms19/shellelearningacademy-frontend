


// import { Button } from "@/components/ui/button";
// import { ArrowRight, Link, Play } from "lucide-react";
// import logo from "@/assets/logo1.png";

// export const Hero = () => {
//   return (
//     <section className="relative min-h-screen flex items-center overflow-hidden">
//       {/* Background Gradient */}
//       <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-accent/20" />

//       {/* Geometric Shape - inspired by Unlox */}
//       <div className="absolute right-0 top-1/4 h-[600px] w-[600px] opacity-10">
//         <div className="relative h-full w-full">
//           <div className="absolute inset-0 rotate-45 rounded-full bg-primary blur-3xl" />
//           <div className="absolute right-20 top-20 h-64 w-64 rounded-full bg-primary/50 blur-2xl" />
//         </div>
//       </div>

//       <div className="container relative mx-auto px-4 py-32 sm:px-6 lg:px-8">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           {/* Left Side - Content */}
//           <div>
//             {/* Badge */}
//             <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 backdrop-blur-sm">
//               <span className="relative flex h-2 w-2">
//                 <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
//                 <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
//               </span>
//               <span className="text-xs sm:text-sm font-medium">Learning Reimagined For The Future</span>
//             </div>

//             {/* Main Heading */}
//             <h1 className="mb-6 font-display text-2xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
//               Learn The Future {" "}
//               <span className="text-gradient">TODAY</span>
//             </h1>

//             {/* Description */}
//             <p className="mb-10 text-sm text-muted-foreground sm:text-xl">
//               Shell e-learning academy is built on the core belief: "Learning Made Easy." Dive into our dynamic programs, connect with awesome mentors, and transform your education journey TODAY.
//             </p>

//             {/* CTA Buttons */}
//             {/* <div className="flex flex-col gap-4 sm:flex-row mb-12">
//               <Button size="lg" className="group smooth-transition hover:scale-105">
//                 Explore Programs
//                 <ArrowRight className="ml-2 h-5 w-5 smooth-transition group-hover:translate-x-1" />
//               </Button>
//               <Button size="lg" variant="outline" className="group smooth-transition">
//                 <Play className="mr-2 h-5 w-5" />
//                 Watch Demo
//               </Button>
//             </div> */}

//             {/* Stats */}
//             <div className="grid grid-cols-3 gap-8">
//               <div>
//                 <div className="mb-1 font-display text-xl sm:text-3xl font-bold text-primary">1K+</div>
//                 <div className="text-xs sm:text-sm text-muted-foreground">Active Students</div>
//               </div>
//               <div>
//                 <div className="mb-1 font-display text-xl sm:text-3xl font-bold text-primary">120+</div>
//                 <div className="text-xs sm:text-sm text-muted-foreground">Expert Mentors</div>
//               </div>
//               <div>
//                 <div className="mb-1 font-display text-xl sm:text-3xl font-bold text-primary">95%</div>
//                 <div className="text-xs sm:text-sm text-muted-foreground">Success Rate</div>
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Logo */}
//           <div className="flex justify-center lg:justify-end">
//             <img 
//               src={logo} 
//               alt="Shell E-learning Academy Logo" 
//               className="w-96 h-96 lg:w-[500px] lg:h-[500px] object-contain rounded-md "
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };




import { Button } from "@/components/ui/button";
import { ArrowRight, Link, Play } from "lucide-react";
import logo from "@/assets/logo2.png";
import { useNavigate } from "react-router-dom";

export const Hero = () => {

  const navigate = useNavigate();
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden md:min-h-screen">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-accent/20" />

      {/* Geometric Shape - inspired by Unlox */}
      <div className="absolute right-0 top-1/4 h-[300px] w-[300px] opacity-10 md:h-[400px] md:w-[400px] lg:h-[600px] lg:w-[600px]">
        <div className="relative h-full w-full">
          <div className="absolute inset-0 rotate-45 rounded-full bg-primary blur-3xl" />
          <div className="absolute right-20 top-20 h-64 w-64 rounded-full bg-primary/50 blur-2xl" />
        </div>
      </div>

      <div className="container relative mx-auto px-4 py-8 md:py-12 lg:py-24 xl:py-32">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
          {/* Right Side - Logo (top on mobile) */}
          <div className="order-1 lg:order-2 flex items-center justify-center lg:justify-end mb-4 md:mb-6 lg:mb-0 gap-4">
            <img 
              src={logo} 
              alt="SHELL E-learning Academy Logo" 
              className="hidden md:block w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain"
              loading="lazy"
            />
            <div className="text-center lg:text-left hidden md:block">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-2 ">SHELL</h2>
              <p className="text-lg md:text-xl text-muted-foreground font-medium">E-Learning Platform</p>
            </div>
          </div>

          {/* Left Side - Content (bottom on mobile) */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <div className="mb-4 md:mb-6 lg:mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 md:px-4 md:py-2 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              <span className="text-xs font-medium md:text-sm">Learning Reimagined For The Future</span>
            </div>

            {/* Main Heading */}
            <h1 className="mb-3 md:mb-4 lg:mb-6 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Learn The Future {" "}
              <span className="text-gradient">TODAY</span>
            </h1>

            {/* Description */}
            <p className="mb-4 md:mb-6 lg:mb-10 text-sm text-muted-foreground md:text-base lg:text-xl">
              Shell e-learning academy is built on the core belief: "Learning Made Easy." Dive into our dynamic programs, connect with awesome mentors, and transform your education journey TODAY.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 md:gap-4 sm:flex-row mb-6 md:mb-8 lg:mb-12">
              <Button size="lg" className="group smooth-transition hover:scale-105"
              onClick={()=>navigate("/all-courses")}
              >
                Explore Programs
                <ArrowRight className="ml-2 h-5 w-5 smooth-transition group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="group smooth-transition"
              onClick={() => navigate("/demo")}
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 md:gap-4 lg:gap-8">
              <div>
                <div className="mb-1 font-display text-lg md:text-xl sm:text-2xl lg:text-3xl font-bold text-primary">1K+</div>
                <div className="text-xs md:text-sm text-muted-foreground">Active Students</div>
              </div>
              <div>
                <div className="mb-1 font-display text-lg md:text-xl sm:text-2xl lg:text-3xl font-bold text-primary">120+</div>
                <div className="text-xs md:text-sm text-muted-foreground">Expert Mentors</div>
              </div>
              <div>
                <div className="mb-1 font-display text-lg md:text-xl sm:text-2xl lg:text-3xl font-bold text-primary">95%</div>
                <div className="text-xs md:text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};