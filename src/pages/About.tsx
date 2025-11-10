import { Navigation } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Users, GraduationCap, BookOpen, TrendingUp, Lightbulb, Target, Heart, Calendar } from "lucide-react";

const AboutPage = () => {
  const stats = [
    { icon: Users, label: "Students Enrolled", value: "150K+" },
    { icon: GraduationCap, label: "Expert Instructors", value: "80+" },
    { icon: BookOpen, label: "Courses Available", value: "100+" },
    { icon: TrendingUp, label: "Satisfaction Rate", value: "90%" },
  ];

  const coreValues = [
    {
      icon: Lightbulb,
      title: "Quality Education",
      description: "We provide top-tier courses designed by industry experts with real-world applications.",
    },
    {
      icon: Target,
      title: "Innovation",
      description: "We constantly update our curriculum to reflect the latest trends and technologies.",
    },
    {
      icon: Heart,
      title: "Student Support",
      description: "Our dedicated team is always ready to help you succeed in your learning journey.",
    },
  ];

  const teamMembers = [
    {
      name: "Dr. Raj Kumar",
      role: "CEO & Founder",
      description: "15+ years in education technology",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
    },
    {
      name: "Priya Deshmukh",
      role: "Head of Curriculum",
      description: "Former professor at IIT",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
    },
    {
      name: "Amit Patel",
      role: "Chief Technology Officer",
      description: "Ex-Google engineer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
    },
    {
      name: "Sarah Williams",
      role: "Head of Business",
      description: "10+ years in edtech",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
    },
  ];

  const journeyMilestones = [
    { year: "2018", description: "Shell E-Learning Academy founded with 5 courses" },
    { year: "2019", description: "Reached 10,000 students across India" },
    { year: "2020", description: "Launched live interactive sessions and mentorship programs" },
    { year: "2022", description: "Expanded to 50+ courses in tech and management" },
    { year: "2022", description: "Achieved 100,000+ enrolled students milestone" },
    { year: "2023", description: "Introduced AI-powered learning paths" },
    { year: "2024", description: "Partnership with industry leaders for certifications" },
  ];

  return (
    <div className="min-h-screen ">
      <Navigation />
      <main className="container mx-auto px-4 pt-32 pb-20">
        {/* Hero Section - Gradient Green */}
        <section className=" py-20 rounded-3xl mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Shell E-Learning Academy</h1>
          <p className="text-xl max-w-3xl mx-auto">Bridging Innovation and Education to Empower Learners Worldwide</p>
        </section>

        {/* Mission Section */}
        <section className="mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
          <p className="text-lg text-gray-600 leading-relaxed text-center">
            At Shell E-Learning Academy, we believe quality education should be accessible to everyone. Our mission is to unlock world-class learning experiences, expert instructors, cutting-edge technology, career guidance, and personalized support to create an unmatched learning environment.
          </p>
        </section>

        {/* Stats Section */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6  rounded-xl border border-gray-200 shadow-sm">
                <stat.icon className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Core Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <div key={index} className="text-center p-6  rounded-xl border border-gray-200 shadow-sm">
                <value.icon className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4 text-gray-900">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center p-6  rounded-xl border border-gray-200 shadow-sm">
                <div className="mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-emerald-100"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{member.name}</h3>
                <p className="text-emerald-500 font-semibold mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Journey Section - Timeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Journey</h2>
          <div className="relative max-w-4xl mx-auto border-l-4 border-emerald-200 pl-8">
            {journeyMilestones.map((milestone, index) => (
              <div key={index} className="mb-8 relative">
                <div className="absolute left-[-20px] top-2 w-5 h-5 bg-emerald-500 rounded-full"></div>
                <div className=" p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="font-bold text-emerald-500 text-lg mb-2">{milestone.year}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;