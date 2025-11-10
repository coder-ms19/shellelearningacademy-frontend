// import { Palette, Code2, TrendingUp, Megaphone, Database, Briefcase } from "lucide-react";
// import { Link } from "react-router-dom";

// const categories = [
//   {
//     id: "uiux",
//     title: "UI/UX Design",
//     icon: Palette,
//     color: "from-pink-500 to-pink-600",
//     courses: 1,
//   },
//   {
//     id: "programming",
//     title: "Programming",
//     icon: Code2,
//     color: "from-blue-500 to-blue-600",
//     courses: 2,
//   },
//   {
//     id: "stock",
//     title: "Stock Market",
//     icon: TrendingUp,
//     color: "from-orange-500 to-orange-600",
//     courses: 1,
//   },
//   {
//     id: "marketing",
//     title: "Digital Marketing",
//     icon: Megaphone,
//     color: "from-purple-500 to-purple-600",
//     courses: 1,
//   },
//   {
//     id: "data",
//     title: "Data Analytics",
//     icon: Database,
//     color: "from-indigo-500 to-indigo-600",
//     courses: 2,
//   },
//   {
//     id: "management",
//     title: "Management",
//     icon: Briefcase,
//     color: "from-green-500 to-green-600",
//     courses: 1,
//   },
// ];

// export const CategoriesSection = () => {
//   return (
//     <section className="py-16 bg-background">
//       <div className="container mx-auto px-4">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading mb-4">
//             Explore Top Categories
//           </h2>
//           <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
//             Choose from our most popular learning paths
//           </p>
//         </div>

//         {/* Categories Grid */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
//           {categories.map((category) => {
//             const Icon = category.icon;
//             return (
//               <Link
//                 key={category.id}
//                 to={`/categories/${category.id}`}
//                 className="group"
//               >
//                 <div className="bg-card rounded-2xl p-6 text-center border border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 shadow-lg ">
//                   {/* Icon */}
//                   <div className={`inline-flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br ${category.color} text-white group-hover:scale-110 transition-transform`}>
//                     <Icon className="w-6 h-6" />
//                   </div>
//                   {/* Title */}
//                   <h3 className="font-semibold text-sm md:text-base text-heading mb-2 leading-tight">
//                     {category.title}
//                   </h3>
//                   {/* Courses Count */}
//                   <p className="text-xs text-muted-foreground">
//                     {category.courses} {category.courses === 1 ? "course" : "courses"}
//                   </p>
//                 </div>
//               </Link>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };



import { Palette, Code2, TrendingUp, Megaphone, Database, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { courseService } from "@/service/course.service";
import axiosInstance from "@/service/axiosInstance";

const getCategoryConfig = (title) => {
  const lower = title.toLowerCase().trim();
  if (lower.includes('web') || lower.includes('dev')) return { icon: Code2, color: 'from-blue-500 to-blue-600' };
  if (lower.includes('data') || lower.includes('scien')) return { icon: Database, color: 'from-indigo-500 to-indigo-600' };
  if (lower.includes('marketing')) return { icon: Megaphone, color: 'from-purple-500 to-purple-600' };
  if (lower.includes('labour') || lower.includes('management')) return { icon: Briefcase, color: 'from-green-500 to-green-600' };
  if (lower.includes('stock') || lower.includes('trending')) return { icon: TrendingUp, color: 'from-orange-500 to-orange-600' };
  // default
  return { icon: Palette, color: 'from-pink-500 to-pink-600' };
};

export const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const res = await axiosInstance.get("/course/get-all-categories-and-course-count");
        const cats = res.data.data || [];
        const dynamicCategories = cats.map((cat) => ({
          id: cat._id,
          title: cat.name,
          ...getCategoryConfig(cat.name),
          courses: cat.courses ? cat.courses.length : 0,
        }));
        setCategories(dynamicCategories);
      } catch (err) {
        console.error('Failed to load categories:', err);
        setCategories([]);
      } finally {
        setIsLoadingCategories(false);
      }
    };
    loadCategories();
  }, []);

  if (isLoadingCategories) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading categories...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading mb-4">Explore Top Categories</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">Choose from our most popular learning paths</p>
        </div>
        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link key={category.id} to={`/all-courses?category=${encodeURIComponent(category.title)}`} className="group">
                <div className="bg-card rounded-2xl p-6 text-center border border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 shadow-lg">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br ${category.color} text-white group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  {/* Title */}
                  <h3 className="font-semibold text-sm md:text-base text-heading mb-2 leading-tight">{category.title}</h3>
                  {/* Courses Count */}
                  <p className="text-xs text-muted-foreground">
                    {category.courses} {category.courses === 1 ? "course" : "courses"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};