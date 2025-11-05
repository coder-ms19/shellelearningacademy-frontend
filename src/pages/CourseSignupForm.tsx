import { useState } from "react";
import { Navigation } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, GraduationCap, Lock, Loader2, Shield } from "lucide-react";
import { useForm } from "react-hook-form";
import { authService } from "@/service/auth.service";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo1.png";

interface SignupForm {
  fullName: string;
  email: string;
  password: string;
  contactNumber: string;
  otp?: string;
}

interface CourseSignupFormProps {
  onSuccess?: () => void;
}

const CourseSignupForm: React.FC<CourseSignupFormProps> = ({ onSuccess }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<'signup' | 'otp'>('signup');
  const [otpSent, setOtpSent] = useState(false);
  const [formData, setFormData] = useState<SignupForm | null>(null);
  const [resendingOTP, setResendingOTP] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    setValue
  } = useForm<SignupForm>();

  const sendOTP = async (data: SignupForm) => {
    try {
      await authService.sendOTP({ email: data.email });
      setFormData(data);
      setOtpSent(true);
      setStep('otp');
      toast({ 
        title: "OTP sent!", 
        description: "Please check your email for the verification code." 
      });
    } catch (error: any) {
      toast({ 
        title: "Failed to send OTP", 
        description: error?.response?.data?.message || "Please try again.", 
        variant: "destructive" 
      });
    }
  };

  const resendOTP = async () => {
    if (!formData?.email) return;
    
    try {
      setResendingOTP(true);
      await authService.sendOTP({ email: formData.email });
      toast({ 
        title: "OTP resent!", 
        description: "Please check your email for the new verification code." 
      });
    } catch (error: any) {
      toast({ 
        title: "Failed to resend OTP", 
        description: error?.response?.data?.message || "Please try again.", 
        variant: "destructive" 
      });
    } finally {
      setResendingOTP(false);
    }
  };

  const verifyAndSignup = async (data: SignupForm) => {
    if (!formData || !data.otp) return;
    
    try {
      await authService.signup({
        ...formData,
        otp: data.otp,
        accountType: "Student",
        additionalDetails: {
          contactNumber: formData.contactNumber
        }
      });
      
      toast({ 
        title: "Account created successfully!", 
        description: "Welcome to Shell E-learning academy!" 
      });
      
      if (onSuccess) {
        onSuccess();
      } else {
        navigate("/auth");
      }
    } catch (error: any) {
      toast({ 
        title: "Signup failed", 
        description: error?.response?.data?.message || "Invalid OTP. Please try again.", 
        variant: "destructive" 
      });
    }
  };

  const onSubmit = step === 'signup' ? sendOTP : verifyAndSignup;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-32 pb-20">
        <div className="max-w-md mx-auto w-full">
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img src={logo} alt="Shell E-learning Academy" className="h-16 w-16 object-contain" />
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 text-gradient">
              {step === 'signup' ? 'Enroll in a Course' : 'Verify Your Email'}
            </h1>
            <p className="text-base sm:text-xl text-muted-foreground">
              {step === 'signup' ? 'Start your learning journey today' : 'Enter the OTP sent to your email'}
            </p>
          </div>

          <Card className="p-4 sm:p-6 lg:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
              {step === 'signup' ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="flex items-center gap-2 text-sm sm:text-base">
                      <User className="w-4 h-4" />
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      {...register("fullName", {
                        required: "Full name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters"
                        }
                      })}
                      className={`h-10 sm:h-12 ${errors.fullName ? "border-red-500" : ""}`}
                    />
                    {errors.fullName && (
                      <p className="text-sm text-red-500">{errors.fullName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2 text-sm sm:text-base">
                      <Mail className="w-4 h-4" />
                      Email
                    </Label>
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
                      className={`h-10 sm:h-12 ${errors.email ? "border-red-500" : ""}`}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="flex items-center gap-2 text-sm sm:text-base">
                      <Lock className="w-4 h-4" />
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 3,
                          message: "Password must be at least 3 characters"
                        }
                      })}
                      className={`h-10 sm:h-12 ${errors.password ? "border-red-500" : ""}`}
                    />
                    {errors.password && (
                      <p className="text-sm text-red-500">{errors.password.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactNumber" className="flex items-center gap-2 text-sm sm:text-base">
                      <Phone className="w-4 h-4" />
                      Contact Number
                    </Label>
                    <Input
                      id="contactNumber"
                      type="tel"
                      placeholder="Enter your contact number"
                      {...register("contactNumber", {
                        required: "Contact number is required",
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Please enter a valid 10-digit phone number"
                        }
                      })}
                      className={`h-10 sm:h-12 ${errors.contactNumber ? "border-red-500" : ""}`}
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
                      We've sent a 6-digit code to <strong>{formData?.email}</strong>
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="otp" className="flex items-center gap-2 text-sm sm:text-base">
                      <Shield className="w-4 h-4" />
                      Verification Code
                    </Label>
                    <Input
                      id="otp"
                      placeholder="Enter 6-digit code"
                      maxLength={6}
                      {...register("otp", {
                        required: "OTP is required",
                        pattern: {
                          value: /^[0-9]{6}$/,
                          message: "Please enter a valid 6-digit code"
                        }
                      })}
                      className={`h-10 sm:h-12 text-center text-lg tracking-widest ${errors.otp ? "border-red-500" : ""}`}
                    />
                    {errors.otp && (
                      <p className="text-sm text-red-500">{errors.otp.message}</p>
                    )}
                  </div>
                  
                  <div className="flex gap-3">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="flex-1" 
                      onClick={() => setStep('signup')}
                    >
                      Back to Signup
                    </Button>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      className="flex-1" 
                      onClick={resendOTP}
                      disabled={resendingOTP}
                    >
                      {resendingOTP ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Resending...
                        </>
                      ) : (
                        'Resend OTP'
                      )}
                    </Button>
                  </div>
                </>
              )}

              <Button type="submit" className="w-full h-12 sm:h-14 text-base" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {step === 'signup' ? 'Sending OTP...' : 'Creating Account...'}
                  </>
                ) : (
                  step === 'signup' ? 'Send OTP' : 'Verify & Enroll'
                )}
              </Button>
            </form>
          </Card>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>By enrolling, you agree to our <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CourseSignupForm;