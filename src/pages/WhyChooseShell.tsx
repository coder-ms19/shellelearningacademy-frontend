import { Navigation } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { User, Award, Clock } from "lucide-react";

const WhyChooseShell = () => {
  const features = [
    {
      id: 1,
      title: "Expert Mentors",
      description: "Learn from industry professionals with years of real-world experience.",
      icon: User,
    },
    {
      id: 2,
      title: "Certified Programs",
      description: "Earn recognized certifications that boost your career prospects.",
      icon: Award,
    },
    {
      id: 3,
      title: "Flexible Learning",
      description: "Study at your own pace with lifetime access to course materials.",
      icon: Clock,
    },
  ];

  return (
    <div className="min-h-screen ">
      <main className="container mx-auto px-4 pt-32 pb-20">
        {/* Features Section */}
        <section className=" py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="mb-4 font-display text-xl font-bold sm:text-4xl">
                Why Choose Shell?
              </h2>
              <p className="mx-auto max-w-2xl text-sm sm:text-lg text-muted-foreground">
                Experience learning reimagined with cutting-edge features and support
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className="group rounded-2xl  bg-card p-6 smooth-transition hover:-translate-y-1 hover:border-primary/50 shadow-lg"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 smooth-transition group-hover:bg-primary/20">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-display text-base sm:text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

    </div>
  );
};

export default WhyChooseShell;