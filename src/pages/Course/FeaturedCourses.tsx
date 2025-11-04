import { CourseCard } from "@/components/CourseCard";
import { courseService } from "@/service/course.service";
import { useToast } from "@/hooks/use-toast";
import { useAppSelector } from "@/hooks/redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FeaturedCourses = () => {
  const { toast } = useToast();
  const { user } = useAppSelector((state) => state.auth);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to infer category from title (fallback)
  const inferCategory = (title: string): string => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('web') || titleLower.includes('mern') || titleLower.includes('react') || titleLower.includes('node')) {
      return 'Development';
    } else if (titleLower.includes('ds') || titleLower.includes('data structure')) {
      return 'Data Science';
    } else if (titleLower.includes('java')) {
      return 'Development';
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
        price: course.finalPrice || course.discountedPrice || course.price || 0,
        originalPrice: course.originalPrice,
        discountedPrice: course.discountedPrice,
        discountPercent: course.discountPercent,
      }));

      // Sort by newest (createdAt)
      const sortedCourses = transformedCourses
        .sort((a: any, b: any) => 
          new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
        )
        .slice(0, 6); // Only 6 featured

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

  // Loading State
  if (isLoading) {
    return (
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg text-muted-foreground">Loading courses...</p>
        </div>
      </section>
    );
  }

  // Empty State (optional)
  if (!courses.length && !isLoading) {
    return (
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg text-muted-foreground">No courses available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Featured Courses
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start learning with our most popular and newest courses
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course: any) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/all-courses">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 transition-all duration-300"
            >
              View All Courses
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;