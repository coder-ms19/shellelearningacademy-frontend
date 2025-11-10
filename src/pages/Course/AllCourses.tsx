// import { Navigation } from "@/components/Navbar";
// import { Footer } from "@/components/Footer";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Slider } from "@/components/ui/slider";
// import { Search, Star } from "lucide-react";
// import { Label } from "@/components/ui/label";
// import { useState, useMemo } from "react";
// import toast from "react-hot-toast";

// // Dummy data matching the image exactly with images
// const dummyCourses = [
//   {
//     id: '1',
//     title: 'Complete Digital Marketing Masterclass',
//     instructor: 'Sarah Johnson',
//     rating: 4.8,
//     students: 256,
//     duration: '12 weeks',
//     level: 'Beginner',
//     category: 'Digital Marketing',
//     image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', // Digital marketing dashboard
//     price: 4999,
//   },
//   {
//     id: '2',
//     title: 'UI/UX Design Professional Certificate',
//     instructor: 'Michael Chen',
//     rating: 4.9,
//     students: 321,
//     duration: '16 weeks',
//     level: 'Intermediate',
//     category: 'UI/UX Design',
//     image: 'https://images.unsplash.com/photo-1559028002-0d4e98826f37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', // UI/UX color swatches
//     price: 4999,
//   },
//   {
//     id: '3',
//     title: 'Stock Market Investing for Beginners',
//     instructor: 'Priya Sharma',
//     rating: 4.7,
//     students: 128,
//     duration: '8 weeks',
//     level: 'Beginner',
//     category: 'Stock Market',
//     image: 'https://images.unsplash.com/photo-1620712943543-7dc7a9e3799e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', // Stock market chart
//     price: 999,
//   },
//   {
//     id: '4',
//     title: 'Python Programming: Zero to Hero',
//     instructor: 'David Miller',
//     rating: 4.8,
//     students: 521,
//     duration: '14 weeks',
//     level: 'Beginner',
//     category: 'Programming',
//     image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', // Python programming
//     price: 4999,
//   },
//   {
//     id: '5',
//     title: 'Business Management Essentials',
//     instructor: 'Emily Roberts',
//     rating: 4.5,
//     students: 110,
//     duration: '10 weeks',
//     level: 'Intermediate',
//     category: 'Management',
//     image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', // Business management
//     price: 999,
//   },
//   {
//     id: '6',
//     title: 'Data Analytics with Python & SQL',
//     instructor: 'James Wilson',
//     rating: 4.8,
//     students: 298,
//     duration: '12 weeks',
//     level: 'Intermediate',
//     category: 'Data Analytics',
//     image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', // Data analytics Python
//     price: 4999,
//   },
//   {
//     id: '7',
//     title: 'Data Analytics Excel for Business',
//     instructor: 'Linda Chen',
//     rating: 4.5,
//     students: 116,
//     duration: '6 weeks',
//     level: 'Beginner',
//     category: 'Data Analytics',
//     image: 'https://images.unsplash.com/photo-1466782828635-4d9d7f86a5bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', // Excel data analytics
//     price: 999,
//   },
//   {
//     id: '8',
//     title: 'Full Stack Web Development',
//     instructor: 'Alex Thompson',
//     rating: 4.9,
//     students: 155,
//     duration: '20 weeks',
//     level: 'Advanced',
//     category: 'Programming',
//     image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', // Full stack web dev
//     price: 4999,
//   },
// ];

// const AllCourses = () => {
//   const [courses] = useState(dummyCourses); // Use dummy data always for exact match
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategories, setSelectedCategories] = useState(new Set());
//   const [selectedLevels, setSelectedLevels] = useState(new Set());
//   const [priceRange, setPriceRange] = useState([0, 7000]);


// // 
//   // const getall

//   // Available filter options with counts
//   const categoryOptions = [
//     { value: 'Digital Marketing', label: 'Digital Marketing (1)', count: 1 },
//     { value: 'UI/UX Design', label: 'UI/UX Design (1)', count: 1 },
//     { value: 'Programming', label: 'Programming (2)', count: 2 },
//     { value: 'Management', label: 'Management (1)', count: 1 },
//     { value: 'Data Analytics', label: 'Data Analytics (2)', count: 2 },
//     { value: 'Stock Market', label: 'Stock Market (1)', count: 1 },
//   ];

//   const levelOptions = [
//     { value: 'Beginner', label: 'Beginner' },
//     { value: 'Intermediate', label: 'Intermediate' },
//     { value: 'Advanced', label: 'Advanced' },
//   ];

//   // Filtered courses
//   const filteredCourses = useMemo(() => {
//     return courses.filter((course) => {
//       const searchLower = searchTerm.toLowerCase().trim();
//       const matchesSearch = searchTerm === "" ||
//         course.title.toLowerCase().includes(searchLower) ||
//         course.instructor.toLowerCase().includes(searchLower) ||
//         course.category.toLowerCase().includes(searchLower);

//       const matchesCategory = selectedCategories.size === 0 || selectedCategories.has(course.category);
//       const matchesLevel = selectedLevels.size === 0 || selectedLevels.has(course.level);
//       const matchesPrice = course.price >= priceRange[0] && course.price <= priceRange[1];

//       return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
//     });
//   }, [searchTerm, selectedCategories, selectedLevels, priceRange, courses]);

//   const totalCourses = courses.length;
//   const showingCourses = filteredCourses.length;

//   const clearFilters = () => {
//     setSearchTerm("");
//     setSelectedCategories(new Set());
//     setSelectedLevels(new Set());
//     setPriceRange([0, 7000]);
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Navigation />
//       <main className="container mx-auto px-4 pt-20 pb-20">
//         {/* Hero Section */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
//             Explore Our Courses
//           </h1>
//           <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//             Discover a wide range of courses designed to help you achieve your learning goals
//           </p>
//         </div>

//         {/* Filters and Content */}
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Sidebar Filters */}
//           <div className="lg:w-1/4 space-y-6">
//             <div className="space-y-2">
//               <Label className="text-sm font-semibold">Category</Label>
//               {categoryOptions.map((option) => (
//                 <div key={option.value} className="flex items-center space-x-2">
//                   <Checkbox
//                     id={option.value}
//                     checked={selectedCategories.has(option.value)}
//                     onCheckedChange={(checked) => {
//                       const newSet = new Set(selectedCategories);
//                       if (checked) {
//                         newSet.add(option.value);
//                       } else {
//                         newSet.delete(option.value);
//                       }
//                       setSelectedCategories(newSet);
//                     }}
//                   />
//                   <Label htmlFor={option.value} className="text-sm cursor-pointer">
//                     {option.label}
//                   </Label>
//                 </div>
//               ))}
//             </div>

//             <div className="space-y-2">
//               <Label className="text-sm font-semibold">Level</Label>
//               {levelOptions.map((option) => (
//                 <div key={option.value} className="flex items-center space-x-2">
//                   <Checkbox
//                     id={option.value}
//                     checked={selectedLevels.has(option.value)}
//                     onCheckedChange={(checked) => {
//                       const newSet = new Set(selectedLevels);
//                       if (checked) {
//                         newSet.add(option.value);
//                       } else {
//                         newSet.delete(option.value);
//                       }
//                       setSelectedLevels(newSet);
//                     }}
//                   />
//                   <Label htmlFor={option.value} className="text-sm cursor-pointer">
//                     {option.label}
//                   </Label>
//                 </div>
//               ))}
//             </div>

//             <div className="space-y-2">
//               <Label className="text-sm font-semibold">Price Range</Label>
//               <Slider
//                 value={priceRange}
//                 onValueChange={setPriceRange}
//                 max={7000}
//                 step={100}
//                 className="w-full"
//               />
//               <div className="flex justify-between text-xs text-muted-foreground">
//                 <span>₹0</span>
//                 <span>₹7000</span>
//               </div>
//             </div>

//             <Button onClick={clearFilters} variant="outline" className="w-full">
//               Clear filters
//             </Button>
//           </div>

//           {/* Main Content */}
//           <div className="lg:w-3/4">
//             {/* Search and Count */}
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
//               <div className="relative flex-1 max-w-md">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                 <Input
//                   placeholder="Search for courses..."
//                   className="pl-9 h-10"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//               <p className="text-sm text-muted-foreground">
//                 Showing {showingCourses} of {totalCourses} courses
//               </p>
//             </div>

//             {/* Courses Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               {filteredCourses.map((course) => (
//                 <div key={course.id} className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
//                   {/* Image with Price Badge */}
//                   <div className="relative">
//                     <img
//                       src={course.image}
//                       alt={course.title}
//                       className="w-full h-48 object-cover"
//                       onError={(e) => {
//                         e.currentTarget.src = 'https://via.placeholder.com/300x200/ECECEC/9CA3AF?text=No+Image';
//                       }}
//                     />
//                     <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-semibold">
//                       ₹{course.price.toLocaleString()}
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <div className="p-4 space-y-2">
//                     <h3 className="font-semibold text-sm line-clamp-2 leading-tight">{course.title}</h3>
//                     <p className="text-xs text-muted-foreground">{course.instructor}</p>
//                     <div className="flex items-center justify-between text-xs">
//                       <div className="flex items-center space-x-1">
//                         <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
//                         <span className="font-medium">{course.rating}</span>
//                         <span>({course.students})</span>
//                       </div>
//                       <div className="flex items-center space-x-1">
//                         <span>{course.duration}</span>
//                         <span>•</span>
//                         <span className="capitalize">{course.level}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Empty State */}
//             {filteredCourses.length === 0 && (
//               <div className="text-center py-12">
//                 <p className="text-muted-foreground">No courses match your filters. Try adjusting your search.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default AllCourses;





import { Navigation } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Search, Star } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useState, useMemo, useEffect } from "react";
import toast from "react-hot-toast";
import { courseService } from "@/service/course.service";
import { Link, useSearchParams } from "react-router-dom";

const AllCourses = () => {
  const [searchParams] = useSearchParams();
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [selectedLevels, setSelectedLevels] = useState(new Set());
  const [priceRange, setPriceRange] = useState([0, 7000]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [coursesRes, categoriesRes] = await Promise.all([
          courseService.getAllCourses(),
          courseService.getAllCategories()
        ]);
        const coursesData = coursesRes.data || [];
        const mappedCourses = coursesData.map((course) => ({
          id: course._id,
          title: course.courseName,
          instructor: course.instructor.email,
          rating: 4.8, // Default rating as it's not in the API response
          students: course.studentsEnrolled.length,
          duration: course.courseDuration,
          level: course.courseLevel,
          category: course.category.name,
          image: course.thumbnail,
          price: course.finalPrice,
        }));
        setCourses(mappedCourses);
        const maxP = Math.max(...mappedCourses.map((c) => c.price || 0), 0);
        setPriceRange([0, maxP]);
        setCategories(categoriesRes.data || []);
        
        // Auto-select category from URL parameter
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
          setSelectedCategories(new Set([categoryParam]));
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
        toast.error("Failed to fetch data");
        setCourses([]);
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const maxPrice = useMemo(() => Math.max(...courses.map((c) => c.price || 0), 0), [courses]);

  // Available filter options with counts
  const categoryOptions = useMemo(() => {
    if (courses.length === 0 || categories.length === 0) return [];
    const countMap = courses.reduce((acc, c) => {
      const catName = c.category;
      acc[catName] = (acc[catName] || 0) + 1;
      return acc;
    }, {});
    return categories.map((cat) => ({
      value: cat.name,
      label: `${cat.name} (${countMap[cat.name] || 0})`,
      count: countMap[cat.name] || 0,
    }));
  }, [categories, courses]);

  const levelOptions = useMemo(() => {
    if (courses.length === 0) return [];
    const uniqueLevels = [...new Set(courses.map((c) => c.level))];
    return uniqueLevels.map((value) => ({ value, label: value }));
  }, [courses]);

  // Filtered courses
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const searchLower = searchTerm.toLowerCase().trim();
      const matchesSearch =
        searchTerm === "" ||
        course.title.toLowerCase().includes(searchLower) ||
        course.instructor.toLowerCase().includes(searchLower) ||
        course.category.toLowerCase().includes(searchLower);

      const matchesCategory = selectedCategories.size === 0 || selectedCategories.has(course.category);
      const matchesLevel = selectedLevels.size === 0 || selectedLevels.has(course.level);
      const matchesPrice = course.price >= priceRange[0] && course.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
    });
  }, [searchTerm, selectedCategories, selectedLevels, priceRange, courses]);

  const totalCourses = courses.length;
  const showingCourses = filteredCourses.length;

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategories(new Set());
    setSelectedLevels(new Set());
    setPriceRange([0, maxPrice]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 pt-20 pb-20">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Explore Our Courses
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover a wide range of courses designed to help you achieve your learning goals
          </p>
        </div>

        {/* Filters and Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4 space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Category</Label>
              {categoryOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.value}
                    checked={selectedCategories.has(option.value)}
                    onCheckedChange={(checked) => {
                      const newSet = new Set(selectedCategories);
                      if (checked) {
                        newSet.add(option.value);
                      } else {
                        newSet.delete(option.value);
                      }
                      setSelectedCategories(newSet);
                    }}
                  />
                  <Label htmlFor={option.value} className="text-sm cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Level</Label>
              {levelOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.value}
                    checked={selectedLevels.has(option.value)}
                    onCheckedChange={(checked) => {
                      const newSet = new Set(selectedLevels);
                      if (checked) {
                        newSet.add(option.value);
                      } else {
                        newSet.delete(option.value);
                      }
                      setSelectedLevels(newSet);
                    }}
                  />
                  <Label htmlFor={option.value} className="text-sm cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Price Range</Label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={maxPrice}
                step={100}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>₹0</span>
                <span>₹{maxPrice.toLocaleString()}</span>
              </div>
            </div>

            <Button onClick={clearFilters} variant="outline" className="w-full">
              Clear filters
            </Button>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Search and Count */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search for courses..."
                  className="pl-9 h-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Showing {showingCourses} of {totalCourses} courses
              </p>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <div key={course.id} className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                  {/* Image with Price Badge */}
                  <Link to={`/course-detail/${course.id}`} className="relative block overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/400x256/ECECEC/9CA3AF?text=No+Image';
                      }}
                    />
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-2 rounded-full text-sm font-semibold shadow-lg">
                      ₹{course.price.toLocaleString()}
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="font-bold text-lg line-clamp-2 leading-tight group-hover:text-primary transition-colors">{course.title}</h3>
                    <div className="flex items-center gap-3">
                      <img src="https://res.cloudinary.com/manish19/image/upload/v1750917866/Instagram/profile/udu5opuotaswqwgyyq6a.jpg"
                      className="w-10 h-10 rounded-full object-cover border-2 border-muted"
                      />
                      <span className="font-medium text-base text-muted-foreground">Manish Keer</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        <span className="font-semibold">{course.rating}</span>
                        <span className="text-muted-foreground">({course.students})</span>
                      </div>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <span>{course.duration}</span>
                        <span>•</span>
                        <span className="capitalize">{course.level}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {isLoading ? "Loading courses..." : "No courses match your filters. Try adjusting your search."}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AllCourses;