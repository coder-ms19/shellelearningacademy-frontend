

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navigation } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Clock, Users, Award, Star, ArrowLeft, Loader2, CheckCircle, Lock } from "lucide-react";
import { courseService } from "@/service/course.service";
import toast from "react-hot-toast";
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { loginSuccess } from '@/store/authSlice';
import CourseEnrollment from './CourseEnrollment';
import CourseSignupForm from '../CourseSignupForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { authService } from "@/service/auth.service";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { token, user } = useAppSelector((state) => state.auth);
  
  const [course, setCourse] = useState<any | null>(null);
  const [completedVideos, setCompletedVideos] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const fetchCourseDetails = async () => {
    if (!courseId) return;
    
    try {
      setIsLoading(true);
      const res = await courseService.getCourseDetails(courseId);
      const data = Array.isArray(res?.data) ? res.data[0] : res?.data?.[0] || res?.data;
      setCourse(data || null);
      
      // Check if user is enrolled
      if (token && user) {
        const isUserEnrolled = data?.studentsEnrolled?.includes(user._id) || 
                              data?.studentsEnroled?.includes(user._id); // Handle typo
        setIsEnrolled(isUserEnrolled);
        
        if (isUserEnrolled) {
          // Fetch progress if enrolled
          try {
            const progressRes = await courseService.getFullCourseDetails(courseId, token);
            const completed = progressRes.data?.completedVideos || [];
            setCompletedVideos(completed);
            const totalVideos = data?.courseContent?.reduce((total: number, section: any) => 
              total + (section.subSection?.length || 0), 0) || 0;
            setProgress(totalVideos > 0 ? (completed.length / totalVideos) * 100 : 0);
          } catch (error) {
            console.log('Could not fetch progress:', error);
            setProgress(0);
          }
        }
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to load course. Unable to fetch course details.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnroll = () => {
    if (!token || !user) {
      setShowSignupModal(true);
      return;
    }
    // Trigger enrollment by scrolling to and focusing on the enrollment component
    const enrollmentElement = document.querySelector('[data-enrollment-component]');
    if (enrollmentElement) {
      enrollmentElement.scrollIntoView({ behavior: 'smooth' });
      const enrollButton = enrollmentElement.querySelector('button');
      if (enrollButton) {
        enrollButton.click();
      }
    }
  };

  const refreshCourse = () => {
    fetchCourseDetails();
    setShowSignupModal(false);
  };

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId, token]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
        <Navigation />
        <main className="container mx-auto px-4 pt-32 pb-20 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p className="text-sm sm:text-lg">Loading course details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
        <Navigation />
        <main className="container mx-auto px-4 pt-32 pb-20 text-center">
          <h1 className="text-lg sm:text-2xl font-bold mb-4">Course not found</h1>
          <Button onClick={() => navigate('/all-courses')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  // Dummy reviews if no real reviews exist
  const dummyReviews = [
    {
      _id: 'dummy1',
      user: { fullNamme: 'Sarah Johnson' },
      rating: 5,
      review: 'Excellent course! The content is well-structured and easy to follow. Highly recommend for beginners.'
    },
    {
      _id: 'dummy2', 
      user: { fullNamme: 'Mike Chen' },
      rating: 4,
      review: 'Great learning experience. The instructor explains concepts clearly and provides practical examples.'
    },
    {
      _id: 'dummy3',
      user: { fullNamme: 'Emily Davis' },
      rating: 5,
      review: 'This course exceeded my expectations. The hands-on projects really helped me understand the material.'
    }
  ];

  const reviews = (course?.ratingAndReviews && course.ratingAndReviews.length > 0) 
    ? course.ratingAndReviews 
    : dummyReviews;

  const averageRating = reviews.length > 0
    ? Math.round((reviews.reduce((a: number, r: any) => a + (r?.rating || 0), 0) / reviews.length) * 10) / 10
    : 4.5;

  const whatYouWillLearnList = course.whatYouWillLearn ? course.whatYouWillLearn.split('\n').filter(item => item.trim()) : [];
  return (
    
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <Navigation />

      <main className="container mx-auto px-4 pt-32 pb-20">
        <Button 
          onClick={() => navigate('/courses')} 
          variant="ghost" 
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Courses
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge>{course?.category?.name || "Course"}</Badge>
              </div>
              <h1 className="text-2xl md:text-5xl font-bold mb-4 text-gradient">
                {course?.courseName || "Course"}
              </h1>
              <p className="text-base md:text-lg text-muted-foreground mb-6">
                {course?.courseDescription || ""}
              </p>
              <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-primary text-primary" />
                  <span className="font-semibold">{averageRating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span>{course?.studentsEnrolled?.length || 0} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>Self-paced</span>
                </div>
              </div>
            </div>

            {isEnrolled ? (
              <Card className="aspect-video relative overflow-hidden group cursor-pointer hover-lift smooth-transition">
                <div 
                  className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative"
                  onClick={() => navigate(`/course-learning/${courseId}`)}
                >
                  {course?.thumbnail && (
                    <img 
                      src={course.thumbnail} 
                      alt={course.courseName}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-lg font-semibold">Continue Learning</p>
                    <p className="text-sm opacity-80">Resume your progress</p>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="aspect-video relative overflow-hidden group cursor-pointer hover-lift smooth-transition">
                <div 
                  className="w-full h-full relative"
                  onClick={handleEnroll}
                >
                  {course?.thumbnail ? (
                    <img 
                      src={course.thumbnail} 
                      alt={course.courseName}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                  )}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      
                        <>
                          <p className="text-lg font-semibold mb-2">Enroll Now</p>
                          <p className="text-sm opacity-80">Click to start learning</p>
                        </>
                    
                    </div>
                  </div>
                </div>
              
              </Card>
            )}

            <Tabs defaultValue="overview" className="w-full">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card className="p-6">
                  <h3 className="text-2xl font-bold mb-4">What you'll learn</h3>
                  <ul className="space-y-3">
                    {whatYouWillLearnList.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </TabsContent>

              <TabsContent value="curriculum" className="mt-6">
                <Card className="p-6">
                  <div className="space-y-6">
                    {(course?.courseContent || []).map((section: any, sectionIndex: number) => {
                      const sectionLessons = section.subSection || [];
                      const previewLessons = isEnrolled ? sectionLessons : sectionLessons.slice(0, 2);
                      const isPreview = !isEnrolled && sectionLessons.length > 2;
                      
                      return (
                        <div key={section._id} className="border-b border-border pb-6 last:border-b-0">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-semibold flex items-center gap-2">
                              Section {sectionIndex + 1}: {section.sectionName}
                            </h4>
                            <Badge variant={isEnrolled ? "secondary" : "outline"} className="text-xs">
                              {previewLessons.length} lessons {isPreview ? '+ more' : ''}
                            </Badge>
                          </div>
                          <div className="space-y-3">
                            {previewLessons.map((subSection: any, lessonIndex: number) => {
                              const isCompleted = isEnrolled && completedVideos.includes(subSection._id);
                              const icon = isCompleted ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Play className="w-4 h-4 text-muted-foreground" />;
                              
                              return (
                                <div key={subSection._id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-default">
                                  <div className="flex-shrink-0">
                                    {isEnrolled ? icon : <Play className="w-4 h-4 text-muted-foreground" />}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm truncate">{subSection.title}</p>
                                    {subSection.description && (
                                      <p className="text-xs text-muted-foreground truncate">{subSection.description}</p>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Clock className="w-3 h-3" />
                                    {subSection.timeDuration ? `${Math.floor(subSection.timeDuration / 60)}:${(subSection.timeDuration % 60).toString().padStart(2, '0')}` : '—'}
                                  </div>
                                  {!isEnrolled && (
                                    <Badge variant="outline" className="ml-auto text-xs flex-shrink-0">
                                      Preview
                                    </Badge>
                                  )}
                                </div>
                              );
                            })}
                            {isPreview && (
                              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                <span className="text-sm text-muted-foreground">+{sectionLessons.length - 2} more lessons</span>
                                <Badge variant="outline" className="text-xs">Enroll to unlock</Badge>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="instructor" className="mt-6">
                <Card className="p-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={course.instructor?.image} />
                      <AvatarFallback>{course.instructor?.fullNamme?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-lg">{course.instructor?.fullNamme}</p>
                      <p className="text-sm text-muted-foreground">Course Instructor</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <Card className="p-6">
                  <div className="mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-3xl font-bold">{averageRating}</div>
                      <div>
                        <div className="flex items-center gap-1 mb-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`w-5 h-5 ${star <= averageRating ? 'fill-primary text-primary' : 'text-muted-foreground'}`} 
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">{reviews.length} reviews</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    {reviews.map((r: any) => (
                      <div key={r._id} className="border-b pb-6 last:border-b-0">
                        <div className="flex items-start gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback>{r?.user?.fullNamme?.charAt(0) || 'A'}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold text-sm">{r?.user?.fullNamme || 'Anonymous'}</span>
                              <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star 
                                    key={star} 
                                    className={`w-4 h-4 ${star <= r.rating ? 'fill-primary text-primary' : 'text-muted-foreground'}`} 
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">{r?.review}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            {isEnrolled ? (
              <Card className="p-6 sticky top-24">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90" 
                  size="lg"
                  onClick={() => navigate(`/course-learning/${courseId}`)}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Continue Learning
                </Button>
              </Card>
            ) : (
              <div data-enrollment-component>
                
                  
                  <CourseEnrollment 
                    course={course}
                    isEnrolled={isEnrolled}
                    onEnrollmentSuccess={() => {
                      toast.success("🎉 Payment Successful! Welcome to the course! You can now start learning.");
                      setIsEnrolled(true);
                      setProgress(0);
                      fetchCourseDetails();
                      setTimeout(() => {
                        window.location.reload();
                      }, 2000);
                    }}
                    />
                
              
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      
      {/* Personal Info Modal for Non-Logged Users */}
      <Dialog open={showSignupModal} onOpenChange={setShowSignupModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Personal Information Required</DialogTitle>
          </DialogHeader>
          <EnrollmentSignupForm 
            courseName={course?.courseName}
            onSuccess={() => {
              refreshCourse();
              setTimeout(() => {
                const enrollmentElement = document.querySelector('[data-enrollment-component]');
                if (enrollmentElement) {
                  enrollmentElement.scrollIntoView({ behavior: 'smooth' });
                }
              }, 1000);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Personal info form component for course enrollment
const EnrollmentSignupForm = ({ courseName, onSuccess }: { courseName?: string, onSuccess: () => void }) => {
  const [step, setStep] = useState<'signup' | 'otp'>('signup');
  const [formData, setFormData] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const sendOTP = async (data: any) => {
    try {
      setIsSubmitting(true);
      await authService.sendOTP({ email: data.email });
      setFormData(data);
      setStep('otp');
      toast({ 
        title: "Verification code sent!", 
        description: "Please check your email to complete verification." 
      });
    } catch (error: any) {
      toast({ 
        title: "Failed to send verification code", 
        description: error?.response?.data?.message || "Please try again.", 
        variant: "destructive" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const verifyAndSignup = async (data: any) => {
    if (!formData || !data.otp) return;
    
    try {
      setIsSubmitting(true);
      const response = await authService.signup({
        ...formData,
        otp: data.otp,
        accountType: "Student",
        additionalDetails: {
          contactNumber: formData.contactNumber
        }
      });
      
      // Auto-login the user with the returned token
      if (response.token && response.user) {
        dispatch(loginSuccess({ token: response.token, user: response.user }));
        toast({ 
          title: "Information completed!", 
          description: "You can now enroll in the course." 
        });
      }
      
      onSuccess();
    } catch (error: any) {
      toast({ 
        title: "Failed to complete information", 
        description: error?.response?.data?.message || "Invalid verification code. Please try again.", 
        variant: "destructive" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = step === 'signup' ? sendOTP : verifyAndSignup;

  return (
    <div className="space-y-4">
      {step === 'signup' && (
        <div className="text-center mb-4">
          <p className="text-sm text-muted-foreground">
            Please fill in your personal information to enroll in <strong>{courseName}</strong>
          </p>
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {step === 'signup' ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="Enter your full name"
                {...register("fullName", {
                  required: "Full name is required",
                  minLength: { value: 2, message: "Name must be at least 2 characters" }
                })}
                className={errors.fullName ? "border-red-500" : ""}
              />
              {errors.fullName && (
                <p className="text-sm text-red-500">{errors.fullName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Create Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a secure password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" }
                })}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactNumber">Phone Number</Label>
              <Input
                id="contactNumber"
                type="tel"
                placeholder="Enter your phone number"
                {...register("contactNumber", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit phone number"
                  }
                })}
                className={errors.contactNumber ? "border-red-500" : ""}
              />
              {errors.contactNumber && (
                <p className="text-sm text-red-500">{errors.contactNumber.message}</p>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-4">
              <p className="text-sm text-muted-foreground">
                Enter the 6-digit verification code sent to <strong>{formData?.email}</strong>
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="otp">Verification Code</Label>
              <Input
                id="otp"
                placeholder="Enter 6-digit code"
                maxLength={6}
                {...register("otp", {
                  required: "Verification code is required",
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "Please enter a valid 6-digit code"
                  }
                })}
                className={`text-center text-lg tracking-widest ${errors.otp ? "border-red-500" : ""}`}
              />
              {errors.otp && (
                <p className="text-sm text-red-500">{errors.otp.message}</p>
              )}
            </div>
          </>
        )}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {step === 'signup' ? 'Sending Verification...' : 'Completing Information...'}
            </>
          ) : (
            step === 'signup' ? 'Send Verification Code' : 'Complete Information'
          )}
        </Button>
        
        {step === 'otp' && (
          <Button 
            type="button" 
            variant="ghost" 
            className="w-full" 
            onClick={() => setStep('signup')}
          >
            Back to Details
          </Button>
        )}
      </form>
    </div>
  );
};

export default CourseDetail;