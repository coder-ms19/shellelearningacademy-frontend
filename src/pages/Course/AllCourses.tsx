import { Navigation } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CourseCard } from "@/components/CourseCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { courseService } from "@/service/course.service";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const AllCourses = () => {

  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");

  // Function to extract timestamp from MongoDB ObjectId
  const objectIdToTimestamp = (id: string): number => {
    return parseInt(id.substring(0, 8), 16) * 1000;
  };

  // Function to infer category from title (fallback)
  const inferCategory = (title: string): string => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('web') || titleLower.includes('mern') || titleLower.includes('react') || titleLower.includes('node') || titleLower.includes('javascript') || titleLower.includes('html') || titleLower.includes('css')) {
      return 'Web Development';
    } else if (titleLower.includes('java') || titleLower.includes('python') || titleLower.includes('programming') || titleLower.includes('coding')) {
      return 'Development';
    } else if (titleLower.includes('data') || titleLower.includes('analytics') || titleLower.includes('machine learning') || titleLower.includes('ai')) {
      return 'Data Science';
    } else if (titleLower.includes('design') || titleLower.includes('ui') || titleLower.includes('ux')) {
      return 'Design';
    } else if (titleLower.includes('marketing') || titleLower.includes('seo') || titleLower.includes('digital')) {
      return 'Marketing';
    }
    return 'General';
  };

  // Function to infer level from title (fallback)
  const inferLevel = (title: string): string => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('full stack') || titleLower.includes('advanced')) {
      return 'Intermediate';
    } else if (titleLower.includes('beginner') || titleLower.includes('fundamentals')) {
      return 'Beginner';
    }
    return 'All Levels';
  };

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
        students: course.studentsEnrolled?.length || 0,
        duration: course.duration || "Varies",
        level: inferLevel(course.courseName) || "All Levels",
        category: course.category?.name || inferCategory(course.courseName) || "General",
        image: course.thumbnail,
        price: course.finalPrice || course.price || "Free",
        originalPrice: course.originalPrice,
        discountedPrice: course.discountedPrice,
        discountPercent: course.discountPercent,
        // Use ObjectId for sorting proxy
        createdAt: new Date(objectIdToTimestamp(course._id)).toISOString(),
      }));

      // Sort by ObjectId timestamp (newest first)
      const sortedCourses = transformedCourses.sort((a: any, b: any) =>
        objectIdToTimestamp(b.id) - objectIdToTimestamp(a.id)
      );

      setCourses(sortedCourses);
    } catch (error: any) {
      toast.error("Failed to load courses. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Filtered courses with comprehensive search
  const filteredCourses = courses.filter((course: any) => {
    const searchLower = searchTerm.toLowerCase().trim();
    const titleMatch = course.title.toLowerCase().includes(searchLower);
    const descMatch = course.description.toLowerCase().includes(searchLower);
    const instructorMatch = course.instructor.toLowerCase().includes(searchLower);
    const categoryMatch = course.category.toLowerCase().includes(searchLower);
    const levelMatch = course.level.toLowerCase().includes(searchLower);
    
    const searchMatches = searchTerm === "" || titleMatch || descMatch || instructorMatch || categoryMatch || levelMatch;
    const categoryMatches = selectedCategory === "all" || course.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const levelMatches = selectedLevel === "all" || course.level.toLowerCase().includes(selectedLevel.toLowerCase());
    
    return searchMatches && categoryMatches && levelMatches;
  });

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
        <Navigation />
        <main className="container mx-auto px-4 pt-32 pb-20 text-center">
          <p className="text-sm sm:text-lg text-muted-foreground">Loading courses...</p>
        </main>
        <Footer />
      </div>
    );
  }

  // Empty State
  if (!filteredCourses.length) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
        <Navigation />
        <main className="container mx-auto px-4 pt-32 pb-20 text-center">
          <p className="text-sm sm:text-lg text-muted-foreground">No courses match your filters. Try adjusting your search.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <Navigation />

      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="mb-12">
          <h1 className="text-2xl md:text-5xl font-bold mb-4 text-gradient">
            All Courses
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground">
            Explore our complete course catalog
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by title, instructor, category..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="development">Development</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="data science">Data Science</SelectItem>
              <SelectItem value="web development">Web Development</SelectItem>
              <SelectItem value="general">General</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
              <SelectItem value="all levels">All Levels</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => {
            setSearchTerm("");
            setSelectedCategory("all");
            setSelectedLevel("all");
          }}>
            Clear Filters
          </Button>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course: any) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AllCourses;