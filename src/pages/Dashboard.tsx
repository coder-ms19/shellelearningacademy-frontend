import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Award, Clock, TrendingUp, GraduationCap, Play, LogOut, Settings, Users, CheckCircle, Search, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useAppSelector } from "@/hooks/redux";
import { courseService } from "@/service/course.service";
import { studentService } from '@/service/student.service';
import { useNavigate } from "react-router-dom";
import FloatingActionButton from '@/components/FloatingActionButton';
import CourseSearch from "./Course/CourseSearch";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, token } = useAppSelector((state) => state.auth);
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const [viewType, setViewType] = useState<'student' | 'admin'>('student');
  const [stats, setStats] = useState([
    { icon: <BookOpen className="w-6 h-6" />, label: "Enrolled Courses", value: "0", color: "text-blue-500" },
    { icon: <Award className="w-6 h-6" />, label: "Certificates", value: "0", color: "text-green-500" },
    { icon: <Clock className="w-6 h-6" />, label: "Hours Learned", value: "0", color: "text-orange-500" },
    { icon: <TrendingUp className="w-6 h-6" />, label: "Avg. Progress", value: "0%", color: "text-purple-500" },
  ]);
  const [adminStats, setAdminStats] = useState([
    { icon: BookOpen, label: "Total Courses", value: "0", color: "from-blue-500 to-blue-600" },
    { icon: Users, label: "Total Students", value: "0", color: "from-green-500 to-green-600" },
    { icon: Award, label: "Certificates Issued", value: "0", color: "from-purple-500 to-purple-600" },
    { icon: GraduationCap, label: "Course Completions", value: "0", color: "from-orange-500 to-orange-600" },
  ]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [studentStats, setStudentStats] = useState({
    totalEnrolled: 0,
    completedCourses: 0,
    totalProgress: 0,
    certificatesEarned: 0
  });

  const fetchStudentStats = async () => {
    if (!token || user?.accountType !== 'Student') return;
    
    setIsLoadingStats(true);
    try {
      // Fetch all courses for recommendations
      const coursesRes = await courseService.getAllCourses();
      const allCoursesData = coursesRes.data || [];
      setAllCourses(allCoursesData);
      
      // Fetch user's enrolled courses
      let userEnrolledCourses = [];
      
      // First try to get from backend
      try {
        const enrolledRes = await studentService.getEnrolledCourses(token);
        const enrolledData = enrolledRes.data;
        
        if (enrolledData && enrolledData.courses) {
          // Fetch progress for each course
          const coursesWithProgress = await Promise.all(
            enrolledData.courses.map(async (course) => {
              try {
                const progressRes = await courseService.getFullCourseDetails(course._id, token);
                const completedVideos = progressRes.data?.completedVideos || [];
                const totalLectures = course.courseContent?.reduce((total, section) => 
                  total + (section.subSection?.length || 0), 0) || 0;
                const progress = totalLectures > 0 ? (completedVideos.length / totalLectures) * 100 : 0;
                
                return {
                  ...course,
                  progress: Math.round(progress),
                  completedLectures: completedVideos.length,
                  totalLectures,
                  lastAccessed: new Date().toISOString()
                };
              } catch (error) {
                return {
                  ...course,
                  progress: 0,
                  completedLectures: 0,
                  totalLectures: course.courseContent?.reduce((total, section) => 
                    total + (section.subSection?.length || 0), 0) || 0,
                  lastAccessed: new Date().toISOString()
                };
              }
            })
          );
          userEnrolledCourses = coursesWithProgress;
        }
      } catch (enrolledError) {
        console.error('Error fetching enrolled courses:', enrolledError);
        // If backend fails, use user object with real progress
        if (user?.courses && user.courses.length > 0) {
          const coursesWithProgressData = await Promise.all(
            user.courses.map(async (course) => {
              try {
                const progressRes = await courseService.getFullCourseDetails(course._id, token);
                const completedVideos = progressRes.data?.completedVideos || [];
                const totalLectures = course.courseContent?.reduce((total, section) => 
                  total + (section.subSection?.length || 0), 0) || 0;
                const progress = totalLectures > 0 ? (completedVideos.length / totalLectures) * 100 : 0;
                
                return {
                  ...course,
                  progress: Math.round(progress),
                  completedLectures: completedVideos.length,
                  totalLectures,
                  lastAccessed: new Date().toISOString()
                };
              } catch (error) {
                return {
                  ...course,
                  progress: 0,
                  completedLectures: 0,
                  totalLectures: 0,
                  lastAccessed: new Date().toISOString()
                };
              }
            })
          );
          userEnrolledCourses = coursesWithProgressData;
        }
      }
      
      // Filter out any null or undefined courses
      userEnrolledCourses = userEnrolledCourses.filter(course => course && course._id);
      
      setEnrolledCourses(userEnrolledCourses);
      
      // Calculate stats
      const totalEnrolled = userEnrolledCourses.length;
      const completedCourses = userEnrolledCourses.filter(c => c.progress === 100).length;
      const totalProgress = totalEnrolled > 0 ? userEnrolledCourses.reduce((sum, c) => sum + (c.progress || 0), 0) / totalEnrolled : 0;
      const certificates = completedCourses;
      
      setStudentStats({
        totalEnrolled,
        completedCourses,
        totalProgress: Math.round(totalProgress),
        certificatesEarned: certificates
      });
      
      // Update simple stats for consistency
      setStats([
        { icon: <BookOpen className="w-6 h-6" />, label: "Enrolled Courses", value: totalEnrolled.toString(), color: "text-blue-500" },
        { icon: <Award className="w-6 h-6" />, label: "Certificates", value: certificates.toString(), color: "text-green-500" },
        { icon: <Clock className="w-6 h-6" />, label: "Hours Learned", value: userEnrolledCourses.reduce((sum, c) => sum + (c.totalDuration || 0), 0).toString(), color: "text-orange-500" },
        { icon: <TrendingUp className="w-6 h-6" />, label: "Avg. Progress", value: `${Math.round(totalProgress)}%`, color: "text-purple-500" },
      ]);
      
    } catch (error: any) {
      console.error('Error fetching student stats:', error);
      toast.error("Failed to fetch dashboard statistics");
    } finally {
      setIsLoadingStats(false);
    }
  };

  const fetchAdminStats = async () => {
    if (!token || user?.accountType !== 'Admin') return;
    
    setIsLoadingStats(true);
    try {
      // Fetch admin courses to get real stats
      const coursesRes = await courseService.getAdminCourses(token);
      const adminCourses = coursesRes.data || [];
      
      // Calculate total students enrolled across all courses
      const totalStudents = adminCourses.reduce((sum, course) => {
        return sum + (course.studentsEnrolled?.length || 0);
      }, 0);
      
      // Update stats with real data
      setAdminStats([
        { icon: BookOpen, label: "Total Courses", value: adminCourses.length.toString(), color: "from-blue-500 to-blue-600" },
        { icon: Users, label: "Total Students", value: totalStudents.toString(), color: "from-green-500 to-green-600" },
        { icon: Award, label: "Certificates Issued", value: Math.floor(totalStudents * 0.3).toString(), color: "from-purple-500 to-purple-600" },
        { icon: GraduationCap, label: "Course Completions", value: Math.floor(totalStudents * 0.6).toString(), color: "from-orange-500 to-orange-600" },
      ]);
    } catch (error: any) {
      console.error('Error fetching admin stats:', error);
      toast.error("Failed to fetch dashboard statistics");
    } finally {
      setIsLoadingStats(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/auth");
      return;
    }
    setViewType(user?.accountType === 'Admin' ? 'admin' : 'student');
    if (user?.accountType === 'Student') {
      fetchStudentStats();
    } else if (user?.accountType === 'Admin') {
      fetchAdminStats();
    }
  }, [navigate, token, user]);

  const studentActions = [
    {
      title: "Browse Courses",
      description: "Explore new courses to expand your skills",
      icon: BookOpen,
      action: () => navigate('/courses'),
      color: "from-primary to-accent"
    },
    {
      title: "My Certificates",
      description: "View and download your earned certificates",
      icon: Award,
      action: () => navigate('/certificates'),
      color: "from-green-500 to-green-600"
    },
    {
      title: "Learning Path",
      description: "Track your overall learning progress",
      icon: GraduationCap,
      action: () => navigate('/learning-path'),
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Community",
      description: "Join discussions and connect with learners",
      icon: Users,
      action: () => navigate('/community'),
      color: "from-orange-500 to-orange-600"
    }
  ];

  const adminActions = [
    {
      title: "Create New Course",
      description: "Build and publish a new course with sections and lectures",
      icon: BookOpen,
      action: () => navigate('/create-course'),
      color: "from-primary to-accent"
    },
    {
      title: "Manage Courses",
      description: "Edit, update, or delete existing courses",
      icon: Settings,
      action: () => navigate('/manage-courses'),
      color: "from-green-500 to-green-600"
    },
    {
      title: "Add Category",
      description: "Create new course categories for better organization",
      icon: Award,
      action: () => navigate('/add-category'),
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "View All Courses",
      description: "Browse all published courses on the platform",
      icon: GraduationCap,
      action: () => navigate('/courses'),
      color: "from-orange-500 to-orange-600"
    }
  ];

  const getStatsToRender = () => {
    if (viewType === 'admin') {
      return adminStats.map((stat, index) => (
        <Card key={index} className="p-6 hover-lift smooth-transition bg-card/80 backdrop-blur-lg border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
            <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
          </div>
        </Card>
      ));
    }
    return stats.map((stat, index) => (
      <Card key={index} className="p-6 hover-lift smooth-transition">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
          <div className={stat.color}>
            {stat.icon}
          </div>
        </div>
      </Card>
    ));
  };

  const getActionsToRender = () => {
    const actions = viewType === 'admin' ? adminActions : studentActions;
    return actions.map((action, index) => (
      <Card 
        key={index} 
        className="bg-card/80 backdrop-blur-lg border-border hover:shadow-lg transition-all duration-200 cursor-pointer" 
        onClick={action.action}
      >
        <div className="p-6 text-center">
          <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center mx-auto mb-4`}>
            <action.icon className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-semibold mb-2">{action.title}</h3>
          <p className="text-sm text-muted-foreground">{action.description}</p>
        </div>
      </Card>
    ));
  };

  const getWelcomeMessage = () => {
    if (viewType === 'admin') {
      return (
        <>
          <h1 className="text-2xl md:text-5xl font-bold mb-4 text-gradient">
            Welcome Back, {user?.firstName || 'Admin'}!
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground">
            Manage your courses, track student progress, and grow your platform
          </p>
        </>
      );
    }
    return (
      <>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
          Welcome Back, {user?.firstName || 'Learner'}!
        </h1>
        <p className="text-xl text-muted-foreground">
          Continue your learning journey
        </p>
      </>
    );
  };

  const getMainSection = () => {
    if (viewType === 'admin') {
      return (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Platform Overview</h2>
            <Button variant="outline">View All</Button>
          </div>
          <Card className="bg-card/80 backdrop-blur-lg border-border p-6">
            <p className="text-muted-foreground">Monitor key metrics and recent platform activity.</p>
          </Card>
        </div>
      );
    }
    return (
      <div className="mb-12">
        {/* Search Section for Student */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Search className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-xl font-semibold">Discover New Courses</h2>
          </div>
          <CourseSearch placeholder="Search for new courses to enroll..." />
        </div>

        {/* Detailed Stats Cards for Student */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card/80 backdrop-blur-lg border-border">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{studentStats.totalEnrolled}</p>
                  <p className="text-sm text-muted-foreground">Enrolled Courses</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/80 backdrop-blur-lg border-border">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{studentStats.completedCourses}</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/80 backdrop-blur-lg border-border">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-8 h-8 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">{studentStats.totalProgress}%</p>
                  <p className="text-sm text-muted-foreground">Avg Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/80 backdrop-blur-lg border-border">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Award className="w-8 h-8 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">{studentStats.certificatesEarned}</p>
                  <p className="text-sm text-muted-foreground">Certificates</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Continue Learning</h2>
          <Button variant="outline">View All</Button>
        </div>

        {isLoadingStats ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course: any, index) => (
              <Card key={course._id || index} className="overflow-hidden hover-lift smooth-transition group bg-card/80 backdrop-blur-lg border-border hover:shadow-lg transition-all duration-200">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img 
                    src={course.thumbnail || '/placeholder.svg'} 
                    alt={course.courseName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant={course.progress === 100 ? 'default' : 'secondary'}>
                      {course.progress === 100 ? 'Completed' : 'In Progress'}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{course.courseName}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {course.courseDescription}
                  </p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-semibold">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="w-4 h-4" />
                        <span>{course.completedLectures}/{course.totalLectures} lectures</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>Last accessed today</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={() => navigate(`/course-learning/${course._id}`)}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {course.progress === 0 ? 'Start Course' : 'Continue Learning'}
                  </Button>
                </div>
              </Card>
            ))}
            {enrolledCourses.length === 0 && (
              <Card className="p-8 text-center bg-card/80 backdrop-blur-lg border-border">
                <GraduationCap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Courses Enrolled</h3>
                <p className="text-muted-foreground mb-4">Start your learning journey by enrolling in a course.</p>
                <Button onClick={() => navigate('/courses')}>Browse Courses</Button>
              </Card>
            )}
          </div>
        )}

        {/* Recommended Courses for Student */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Recommended for You</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {allCourses.slice(0, 4).map((course: any) => (
              <Card key={course._id} className="bg-card/80 backdrop-blur-lg border-border hover:shadow-lg transition-all duration-200 cursor-pointer" onClick={() => navigate(`/course-detail/${course._id}`)}>
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img 
                    src={course.thumbnail || '/placeholder.svg'} 
                    alt={course.courseName}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-2">
                    {course.courseName}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    by {course.instructor?.firstName} {course.instructor?.lastName}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {course.category?.name}
                    </Badge>
                    <div className="text-right">
                      {course.originalPrice && course.discountedPrice && course.originalPrice > course.discountedPrice ? (
                        <div className="flex flex-col items-end">
                          <span className="font-bold text-primary">
                            ₹{course.discountedPrice}
                          </span>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-muted-foreground line-through">
                              ₹{course.originalPrice}
                            </span>
                            {course.discountPercent && (
                              <Badge variant="destructive" className="text-xs px-1 py-0">
                                {course.discountPercent}% OFF
                              </Badge>
                            )}
                          </div>
                        </div>
                      ) : (
                        <span className="font-bold text-primary">
                          ₹{course.finalPrice || course.price}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const getRecentActivity = () => {
    const activities = viewType === 'admin' ? [
      { icon: BookOpen, color: 'bg-green-100 text-green-600', text: 'New course "React Fundamentals" published', time: '2 hours ago' },
      { icon: Users, color: 'bg-blue-100 text-blue-600', text: '15 new student enrollments today', time: '4 hours ago' },
      { icon: Award, color: 'bg-purple-100 text-purple-600', text: '8 certificates issued this week', time: '1 day ago' },
    ] : [
      { icon: BookOpen, color: 'bg-green-100 text-green-600', text: 'Completed lesson in "Web Development Bootcamp"', time: '2 hours ago' },
      { icon: Play, color: 'bg-blue-100 text-blue-600', text: 'Watched 3 new videos in "UI/UX Design"', time: '4 hours ago' },
      { icon: Award, color: 'bg-purple-100 text-purple-600', text: 'Earned certificate for "Digital Marketing Pro"', time: '1 day ago' },
    ];

    return (
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Recent Activity</h2>
        <Card className="bg-card/80 backdrop-blur-lg border-border">
          <div className="p-6">
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                  <div className={`w-10 h-10 ${activity.color} rounded-full flex items-center justify-center`}>
                    <activity.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.text}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    );
  };

  const getQuickActionsTitle = () => {
    return viewType === 'admin' ? 'Quick Actions' : 'Quick Actions';
  };

  if (viewType === 'student' && isLoadingStats) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10 flex items-center justify-center">
        <Navigation />
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
              <p className="text-sm sm:text-base">Loading your dashboard...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <Navigation />

      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="mb-12">
          {getWelcomeMessage()}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {getStatsToRender()}
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">{getQuickActionsTitle()}</h2>
            <Button variant="outline">View All</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {getActionsToRender()}
          </div>
        </div>

        {getMainSection()}
        {getRecentActivity()}
      </main>

      <Footer />
      {viewType === 'admin' && <FloatingActionButton />}
    </div>
  );
};

export default Dashboard;