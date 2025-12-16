// Import all sponsor images
import sponsor11 from "@/assets/sponsers/11.jpeg";
import sponsor12 from "@/assets/sponsers/12.jpeg";
import sponsor13 from "@/assets/sponsers/13.jpeg";
import sponsor14 from "@/assets/sponsers/14.jpeg";
import sponsor15 from "@/assets/sponsers/15.jpeg";
import sponsor16 from "@/assets/sponsers/16.jpeg";
import sponsor17 from "@/assets/sponsers/17.jpeg";
import sponsor18 from "@/assets/sponsers/18.jpeg";
import sponsor19 from "@/assets/sponsers/19.jpeg";
import sponsor20 from "@/assets/sponsers/20.jpeg";
import sponsor21 from "@/assets/sponsers/21.jpeg";
import sponsor22 from "@/assets/sponsers/22.jpeg";
import sponsor23 from "@/assets/sponsers/23.jpeg";
import sponsor24 from "@/assets/sponsers/24.jpeg";
import sponsor25 from "@/assets/sponsers/25.jpeg";
import sponsor26 from "@/assets/sponsers/26.jpeg";
import sponsor27 from "@/assets/sponsers/27.jpeg";
import sponsor28 from "@/assets/sponsers/28.jpeg";

const sponsors = [
    sponsor11, sponsor12, sponsor13, sponsor14, sponsor15,
    sponsor16, sponsor17, sponsor18, sponsor19, sponsor20,
    sponsor21, sponsor22, sponsor23, sponsor24, sponsor25,
    sponsor26, sponsor27, sponsor28
];

export const SponsorsSection = () => {
    return (
        <section className="relative py-16 md:py-20 bg-gradient-to-b from-background via-muted/20 to-background overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            </div>

            <div className="container relative mx-auto px-4 z-10">
                {/* Section Header */}
                <div className="text-center mb-12 md:mb-16">
                    <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium mb-4 border-transparent bg-primary/10 text-primary">
                        <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                        Our Partners
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        Trusted by <span className="text-primary">Industry Leaders</span>
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                        Collaborating with top organizations to deliver world-class education
                    </p>
                </div>

                {/* Infinite Scroll Animation Container */}
                <div className="relative">
                    <div className="flex overflow-x-hidden">
                        <div className="flex animate-marquee gap-6 md:gap-8 lg:gap-10 items-center py-6">
                            {/* First set of sponsors */}
                            {sponsors.map((sponsor, index) => (
                                <div
                                    key={`sponsor-1-${index}`}
                                    className="flex-shrink-0 group"
                                >
                                    <div className="relative bg-white dark:bg-card rounded-2xl p-6 md:p-8 shadow-md border border-border/50 hover:shadow-xl hover:border-primary/50 transition-all duration-500 hover:-translate-y-1 w-[140px] h-[140px] md:w-[160px] md:h-[160px] lg:w-[180px] lg:h-[180px] flex items-center justify-center overflow-hidden">
                                        {/* Gradient overlay on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        <img
                                            src={sponsor}
                                            alt={`Partner ${index + 1}`}
                                            className="relative z-10 max-w-full max-h-full object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                                            loading="lazy"
                                            onError={(e) => {
                                                console.error(`Failed to load sponsor image ${index + 1}`);
                                                e.currentTarget.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}

                            {/* Duplicate set for seamless loop */}
                            {sponsors.map((sponsor, index) => (
                                <div
                                    key={`sponsor-2-${index}`}
                                    className="flex-shrink-0 group"
                                >
                                    <div className="relative bg-white dark:bg-card rounded-2xl p-6 md:p-8 shadow-md border border-border/50 hover:shadow-xl hover:border-primary/50 transition-all duration-500 hover:-translate-y-1 w-[140px] h-[140px] md:w-[160px] md:h-[160px] lg:w-[180px] lg:h-[180px] flex items-center justify-center overflow-hidden">
                                        {/* Gradient overlay on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        <img
                                            src={sponsor}
                                            alt={`Partner ${index + 1}`}
                                            className="relative z-10 max-w-full max-h-full object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                                            loading="lazy"
                                            onError={(e) => {
                                                console.error(`Failed to load sponsor image ${index + 1}`);
                                                e.currentTarget.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Stats */}
                <div className="text-center mt-12 md:mt-16">
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
                        <span className="text-sm md:text-base text-muted-foreground font-medium">
                            Trusted by
                        </span>
                        <span className="text-2xl md:text-3xl font-bold text-primary">100+</span>
                        <span className="text-sm md:text-base text-muted-foreground font-medium">
                            organizations worldwide
                        </span>
                    </div>
                </div>
            </div>

            {/* Custom CSS for infinite scroll animation */}
            <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 80s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
        </section>
    );
};
