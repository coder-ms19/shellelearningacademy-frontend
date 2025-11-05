import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { 
  CheckCircle, 
  CreditCard, 
  Shield, 
  Clock,
  Users,
  Award,
  Loader2,
  Tag,
  X
} from "lucide-react";
import useCustomToast from '@/hooks/use-custom-toast';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { useNavigate } from 'react-router-dom';
import { paymentService } from '@/service/payment.service';
// import { couponService } from '@/service/coupon.service';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import toast from 'react-hot-toast';
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { authService } from "@/service/auth.service";
import { loginSuccess } from '@/store/authSlice';

interface CourseEnrollmentProps {
  course: any;
  isEnrolled: boolean;
  onEnrollmentSuccess: () => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const CourseEnrollment: React.FC<CourseEnrollmentProps> = ({ 
  course, 
  isEnrolled, 
  onEnrollmentSuccess 
}) => {
  const { showToast } = useCustomToast();
  const { token, user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [enrolling, setEnrolling] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [applyingCoupon, setApplyingCoupon] = useState(false);
  const [finalPrice, setFinalPrice] = useState(course.finalPrice || course.discountedPrice || course.price);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleApplyCoupon = async () => {
    toast.success("ho gaya bro coupan apply")
    // if (!couponCode.trim()) {
    //   showToast('error', 'Invalid Coupon', 'Please enter a coupon code');
    //   return;
    // }

    // if (!token) {
    //   setShowSignupModal(true);
    //   return;
    // }

    // try {
    //   setApplyingCoupon(true);
    //   const response = await couponService.applyCoupon(couponCode, course._id, token);
      
    //   if (response.success) {
    //     setAppliedCoupon(response.data);
    //     setFinalPrice(response.data.couponDiscountedPrice);
    //     showToast('success', 'Coupon Applied!', `${response.data.coupon.discountPercent}% discount applied successfully`);
    //   } else {
    //     showToast('error', 'Invalid Coupon', response.message || 'Coupon could not be applied');
    //   }
    // } catch (error: any) {
    //   showToast('error', 'Coupon Error', error?.response?.data?.message || 'Failed to apply coupon');
    // } finally {
    //   setApplyingCoupon(false);
    // }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setFinalPrice(course.finalPrice || course.discountedPrice || course.price);
    showToast('info', 'Coupon Removed', 'Coupon has been removed');
  };

  const handlePayment = async () => {
    if (!token) {
      setShowSignupModal(true);
      return;
    }

    try {
      setEnrolling(true);

      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        console.error("Failed to load Razorpay script");
        showToast('error', 'Payment Gateway Error', 'Failed to load payment gateway. Please try again.');
        return;
      }
      
      console.log("Razorpay script loaded successfully");

      // Create order with final price
      console.log("Creating order for course:", course._id);
      const orderData = await paymentService.capturePayment([course._id], token);
      console.log("Order creation response:", orderData);

      if (!orderData.success) {
        console.error("Order creation failed:", orderData);
        showToast('error', 'Order Creation Failed', orderData.message || 'Failed to create order. Please try again.');
        return;
      }

      // Razorpay options
      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY || "rzp_test_yQNkACsEOX8zkO";
      console.log("Razorpay Key:", razorpayKey);
      console.log("Order Data:", orderData);
      
      const options = {
        key: razorpayKey,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Shell Entertainment",
        description: `Enrollment for ${course.courseName}`,
        order_id: orderData.orderId,
        handler: async (response: any) => {
          console.log("Razorpay response: in courseenrollment", response);
          try {
            // Verify payment
            const verifyData = await paymentService.verifyPayment({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              courses: [course._id]
            }, token);

            if (verifyData.success) {
              // Redeem coupon if applied
              if (appliedCoupon) {
                // try {
                //   await couponService.redeemCoupon(appliedCoupon.coupon.code, token);
                // } catch (error) {
                //   console.error('Failed to redeem coupon:', error);
                // }
              }

              // Send success email
              await paymentService.sendPaymentSuccessEmail({
                amount: orderData.amount,
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id
              }, token);

              showToast('success', 'Payment Successful! 🎉', `You have been enrolled in ${course.courseName} successfully! Welcome aboard!`);
              onEnrollmentSuccess();
            } else {
              showToast('error', 'Payment Verification Failed', 'Payment could not be verified. Please contact support for assistance.');
            }
          } catch (error) {
            showToast('error', 'Payment Verification Error', 'Payment verification failed. Please contact support if amount was deducted.');
          }
        },
        prefill: {
          name: `${user?.firstName} ${user?.lastName}`,
          email: user?.email,
          contact: user?.additionalDetails?.contactNumber || ""
        },
        theme: {
          color: "#3B82F6"
        },
        modal: {
          ondismiss: () => {
            showToast('warning', 'Payment Cancelled', 'Payment was cancelled. You can try enrolling again anytime.');
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error("Payment initialization error:", error);
      showToast('error', 'Payment Initialization Failed', 'Unable to start payment process. Please check your connection and try again.');
    } finally {
      setEnrolling(false);
    }
  };

  const handleSignupModalClose = () => {
    setShowSignupModal(false);
  };

  const handleGoToSignup = () => {
    setShowSignupModal(false);
    navigate('/sign-up');
  };

  if (isEnrolled) {
    return (
      <Card className="bg-card/80 backdrop-blur-lg border-border sticky top-4 h-fit">
        <CardContent className="p-4 sm:p-6">
          <div className="text-center mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-green-600 mb-1 sm:mb-2">
              You're Enrolled!
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Continue your learning journey
            </p>
          </div>
          
          <Button 
            className="w-full bg-green-600 hover:bg-green-700 h-10 sm:h-12 text-sm sm:text-base mb-3 sm:mb-4"
            onClick={() => navigate(`/course-learning/${course._id}`)}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Continue Learning
          </Button>
          
          <div className="text-center text-xs sm:text-sm text-muted-foreground">
            Access all course materials and track your progress
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="bg-card/80 backdrop-blur-lg border-border sticky top-4 h-fit">
        <CardContent className="p-4 sm:p-6">
          <div className="text-center mb-4 sm:mb-6">
            <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
              ₹{finalPrice}
            </div>
            {appliedCoupon && (
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-sm text-muted-foreground line-through">
                  ₹{course.finalPrice || course.discountedPrice || course.price}
                </span>
                <Badge variant="destructive" className="text-xs">
                  {appliedCoupon.coupon.discountPercent}% OFF
                </Badge>
              </div>
            )}
            {course.originalPrice && course.discountedPrice && course.originalPrice > course.discountedPrice && !appliedCoupon && (
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-sm text-muted-foreground line-through">
                  ₹{course.originalPrice}
                </span>
                {course.discountPercent && (
                  <Badge variant="destructive" className="text-xs">
                    {course.discountPercent}% OFF
                  </Badge>
                )}
              </div>
            )}
            <p className="text-xs sm:text-sm text-muted-foreground">One-time payment</p>
          </div>

          {/* Coupon Section */}
          <div className="mb-4 sm:mb-6">
            {!appliedCoupon ? (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    className="flex-1 text-sm"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleApplyCoupon}
                    disabled={applyingCoupon || !couponCode.trim()}
                  >
                    {applyingCoupon ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Tag className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">
                      {appliedCoupon.coupon.code}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {appliedCoupon.coupon.discountPercent}% OFF
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveCoupon}
                    className="h-6 w-6 p-0 text-green-600 hover:text-green-800"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          <Button 
            className="w-full bg-gradient-to-r from-primary to-accent h-10 sm:h-12 mb-3 sm:mb-4 text-sm sm:text-base"
            onClick={handlePayment}
            disabled={enrolling}
          >
            {enrolling ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4 mr-2" />
                Enroll Now - ₹{finalPrice}
              </>
            )}
          </Button>
          
          <div className="text-center text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
            <Shield className="w-4 h-4 inline mr-1" />
            30-day money-back guarantee
          </div>
          
          <Separator className="my-4 sm:my-6" />
          
          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-semibold text-sm sm:text-base">This course includes:</h4>
            
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center space-x-2 flex-1">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                  <span>Students enrolled</span>
                </div>
                <span className="font-medium">{course.studentsEnrolled?.length || 0}</span>
              </div>
              
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center space-x-2 flex-1">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                  <span>Full lifetime access</span>
                </div>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center space-x-2 flex-1">
                  <Award className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                  <span>Certificate of completion</span>
                </div>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center space-x-2 flex-1">
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                  <span>Money-back guarantee</span>
                </div>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
            </div>
          </div>
          
          <Separator className="my-4 sm:my-6" />
          
          <div className="text-center">
            <p className="text-xs sm:text-sm text-muted-foreground mb-2">
              Secure payment powered by Razorpay
            </p>
            <div className="flex justify-center flex-wrap gap-1 sm:gap-2">
              <Badge variant="outline" className="text-xs">UPI</Badge>
              <Badge variant="outline" className="text-xs">Cards</Badge>
              <Badge variant="outline" className="text-xs">Net Banking</Badge>
              <Badge variant="outline" className="text-xs">Wallets</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showSignupModal} onOpenChange={handleSignupModalClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Personal Information Required</DialogTitle>
          </DialogHeader>
          <EnrollmentSignupForm 
            courseName={course?.courseName}
            onSuccess={() => {
              setShowSignupModal(false);
              // User is now logged in, payment will proceed automatically
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

// Personal info form component for course enrollment
const EnrollmentSignupForm = ({ courseName, onSuccess }: { courseName?: string, onSuccess: () => void }) => {
  const [step, setStep] = useState<'signup' | 'otp'>('signup');
  const [formData, setFormData] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
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

  const resendOTP = async () => {
    if (!formData?.email) return;
    
    try {
      setIsResending(true);
      await authService.sendOTP({ email: formData.email });
      toast({ 
        title: "Verification code resent!", 
        description: "Please check your email for the new code." 
      });
    } catch (error: any) {
      toast({ 
        title: "Failed to resend code", 
        description: error?.response?.data?.message || "Please try again.", 
        variant: "destructive" 
      });
    } finally {
      setIsResending(false);
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
              <div className="text-center">
                <Button 
                  type="button" 
                  variant="link" 
                  onClick={resendOTP}
                  disabled={isResending}
                  className="text-sm"
                >
                  {isResending ? (
                    <>
                      <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                      Resending...
                    </>
                  ) : (
                    "Resend verification code"
                  )}
                </Button>
              </div>
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

export default CourseEnrollment;