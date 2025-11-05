// import { Button } from "@/components/ui/button";
// import { ArrowRight, Link, Play } from "lucide-react";
// import logo from "@/assets/logo.png";

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
//               <span className="text-sm font-medium">Learning Reimagined For The Future</span>
//             </div>

//             {/* Main Heading */}
//             <h1 className="mb-6 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
//               Learn The Future {" "}
//               <span className="text-gradient">TODAY</span>
//             </h1>

//             {/* Description */}
//             <p className="mb-10 text-lg text-muted-foreground sm:text-xl">
//               Shell e-learning academy is built on the core belief: "Learning Made Easy." Dive into our dynamic programs, connect with awesome mentors, and transform your education journey TODAY.
//             </p>

//             {/* CTA Buttons */}
//             <div className="flex flex-col gap-4 sm:flex-row mb-12">
//               <Button size="lg" className="group smooth-transition hover:scale-105">
//                 Explore Programs
//                 <ArrowRight className="ml-2 h-5 w-5 smooth-transition group-hover:translate-x-1" />
//               </Button>
//               <Button size="lg" variant="outline" className="group smooth-transition">
//                 <Play className="mr-2 h-5 w-5" />
//                 Watch Demo
//               </Button>
//             </div>

//             {/* Stats */}
//             <div className="grid grid-cols-3 gap-8">
//               <div>
//                 <div className="mb-1 font-display text-3xl font-bold text-primary">10K+</div>
//                 <div className="text-sm text-muted-foreground">Active Students</div>
//               </div>
//               <div>
//                 <div className="mb-1 font-display text-3xl font-bold text-primary">500+</div>
//                 <div className="text-sm text-muted-foreground">Expert Mentors</div>
//               </div>
//               <div>
//                 <div className="mb-1 font-display text-3xl font-bold text-primary">95%</div>
//                 <div className="text-sm text-muted-foreground">Success Rate</div>
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Logo */}
//           <div className="flex justify-center lg:justify-end">
//             <div className="relative">
//               <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center animate-pulse-slow">
//                 <img 
//                   src={logo} 
//                   alt="Shell E-learning Academy Logo" 
//                   className="w-64 h-64 lg:w-80 lg:h-80 object-contain rounded-full shadow-2xl"
//                 />
//               </div>
//               <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent rounded-full blur-xl opacity-20 animate-pulse"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };




import { Button } from "@/components/ui/button";
import { ArrowRight, Link, Play } from "lucide-react";
import logo from "@/assets/logo1.png";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-accent/20" />

      {/* Geometric Shape - inspired by Unlox */}
      <div className="absolute right-0 top-1/4 h-[600px] w-[600px] opacity-10">
        <div className="relative h-full w-full">
          <div className="absolute inset-0 rotate-45 rounded-full bg-primary blur-3xl" />
          <div className="absolute right-20 top-20 h-64 w-64 rounded-full bg-primary/50 blur-2xl" />
        </div>
      </div>

      <div className="container relative mx-auto px-4 py-32 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div>
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              <span className="text-xs sm:text-sm font-medium">Learning Reimagined For The Future</span>
            </div>

            {/* Main Heading */}
            <h1 className="mb-6 font-display text-2xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Learn The Future {" "}
              <span className="text-gradient">TODAY</span>
            </h1>

            {/* Description */}
            <p className="mb-10 text-sm text-muted-foreground sm:text-xl">
              Shell e-learning academy is built on the core belief: "Learning Made Easy." Dive into our dynamic programs, connect with awesome mentors, and transform your education journey TODAY.
            </p>

            {/* CTA Buttons */}
            {/* <div className="flex flex-col gap-4 sm:flex-row mb-12">
              <Button size="lg" className="group smooth-transition hover:scale-105">
                Explore Programs
                <ArrowRight className="ml-2 h-5 w-5 smooth-transition group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="group smooth-transition">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div> */}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="mb-1 font-display text-xl sm:text-3xl font-bold text-primary">1K+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Active Students</div>
              </div>
              <div>
                <div className="mb-1 font-display text-xl sm:text-3xl font-bold text-primary">120+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Expert Mentors</div>
              </div>
              <div>
                <div className="mb-1 font-display text-xl sm:text-3xl font-bold text-primary">95%</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right Side - Logo */}
          <div className="flex justify-center lg:justify-end">
            <img 
              src={logo} 
              alt="Shell E-learning Academy Logo" 
              className="w-96 h-96 lg:w-[500px] lg:h-[500px] object-contain rounded-md "
            />
          </div>
        </div>
      </div>
    </section>
  );
};