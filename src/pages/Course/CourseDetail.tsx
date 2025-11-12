import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
// NOTE: Adjust the paths below to match your project's component structure
import { Navigation } from "@/components/Navbar"; 
import { Footer } from "@/components/Footer";
import { 
    Star, Check, Play, Download, 
    Loader2, ShieldCheck, Users,
    ArrowLeft, AlertCircle, ChevronDown, Clock, MessageSquare,
    CheckCircle, CreditCard, Shield, Tag, X, Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// ====================================================================
// !!! IMPORTANT: Replace these MOCK SERVICES with your REAL API IMPORTS !!!
// ====================================================================
import { courseService } from "@/service/course.service";
import { paymentService } from '@/service/payment.service';
import { authService } from "@/service/auth.service";
import toast from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";
// MOCK useToast - replace with your actual component import if using Shadcn
const useToast = () => ({ toast: (options: any) => toast[options.variant === 'destructive' ? 'error' : 'success'](options.description) }); 
// END MOCK

// MOCK REDUX HOOKS AND CONSTANTS (REPLACE WITH YOUR ACTUAL IMPORTS)
// This mock simulates an unauthenticated user initially, and provides data for prefill later.
const MOCK_INITIAL_STATE = { auth: { token: null, user: null } }; // Initial unauthenticated state
const MOCK_AUTH_USER_DATA = { auth: { token: 'mock-token-123', user: { id: 'user-456', firstName: 'Test', lastName: 'User', email: 'test@example.com', additionalDetails: { contactNumber: '9876543210' } } } }; // State after successful signup/login

const useAppSelector = (selector: (state: any) => any) => {
    // NOTE: This is a complex mock. In a real app, this would be Redux or Context.
    // We check for the presence of a 'token' in localStorage/sessionStorage to mock login persistence
    const mockToken = localStorage.getItem('mockAuthToken');
    const state = mockToken ? MOCK_AUTH_USER_DATA : MOCK_INITIAL_STATE;
    return selector(state);
};
const useAppDispatch = () => (action: any) => {
    console.log('Dispatching:', action.type);
    if (action.type === 'auth/loginSuccess') {
        localStorage.setItem('mockAuthToken', action.payload.token); // Mock persisting login
    }
};
const loginSuccess = (payload: any) => ({ type: 'auth/loginSuccess', payload });

// MOCK CONSTANTS (REPLACE WITH YOUR ACTUAL IMPORTS)
const INDIAN_STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
    "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", 
    "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", 
    "Lakshadweep", "Puducherry"
].sort();
const BATCHES = [
    "January 2025", "February 2025", "March 2025", "April 2025", "May 2025", "June 2025",
    "July 2025", "August 2025", "September 2025", "October 2025", "November 2025", "December 2025",
    "January 2026", "February 2026", "March 2026", "April 2026", "May 2026", "June 2026"
].sort();
// ====================================================================

declare global {
    interface Window {
        Razorpay: any;
    }
}

// ====================================================================
// 1. Enrollment Signup Form Component (The requested Form)
// ====================================================================

interface EnrollmentFormFields {
    fullName: string;
    email: string;
    password: string;
    accountType: string;
    contactNumber: string;
    contactNo: string;
    batch: string;
    state: string;
    college: string;
}

const EnrollmentSignupForm = ({ courseName, onSuccess }: { courseName?: string, onSuccess: () => void }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [stateSearch, setStateSearch] = useState("");
    const [batchSearch, setBatchSearch] = useState("");
    const { toast: hookToast } = useToast();
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<EnrollmentFormFields>();

    const filteredStates = INDIAN_STATES.filter(state =>
        state.toLowerCase().includes(stateSearch.toLowerCase())
    );

    const filteredBatches = BATCHES.filter(batch =>
        batch.toLowerCase().includes(batchSearch.toLowerCase())
    );

    const handleSignup = async (data: EnrollmentFormFields) => {
        try {
            setIsSubmitting(true);
            
            // API call for signup/registration using all required fields
            const response = await authService.signup({
                fullName: data.fullName,
                email: data.email,
                password: data.password,
                accountType: "Student",
                contactNumber: data.contactNo,
                contactNo: data.contactNo,
                batch: data.batch,
                state: data.state,
                college: data.college
            });

            if (response.token && response.user) {
                // Log the user in upon successful registration
                dispatch(loginSuccess({ token: response.token, user: response.user }));
                hookToast({
                    title: "Details Saved!",
                    description: "You're all set! Proceeding to secure payment.",
                    duration: 3000
                });
                onSuccess(); // Closes modal and triggers payment
            } else {
                 // The mock service should return an error if details are bad, etc.
                 throw new Error("Registration failed or user data missing in response.");
            }
        } catch (error: any) {
            hookToast({
                title: "Detail Submission Failed",
                description: error?.response?.data?.message || "Please check your details and try again.",
                variant: "destructive"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-4 sm:space-y-6 px-1">
            <form onSubmit={handleSubmit(handleSignup)} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {/* Full Name */}
                    <div className="space-y-1.5 sm:space-y-2">
                        <Label htmlFor="fullName" className="text-sm font-medium">Full Name <span className="text-red-500">*</span></Label>
                        <Input
                            id="fullName"
                            placeholder="Your full name"
                            {...register("fullName", {
                                required: "Full name is required",
                                minLength: { value: 2, message: "Name must be at least 2 characters" }
                            })}
                            className={`h-10 sm:h-11 ${errors.fullName ? "border-red-500" : ""}`}
                        />
                        {errors.fullName && (
                            <p className="text-xs sm:text-sm text-red-500">{errors.fullName.message}</p>
                        )}
                    </div>

                    {/* Contact Number */}
                    <div className="space-y-1.5 sm:space-y-2">
                        <Label htmlFor="contactNo" className="text-sm font-medium">Contact Number <span className="text-red-500">*</span></Label>
                        <Input
                            id="contactNo"
                            type="tel"
                            placeholder="10-digit number"
                            {...register("contactNo", {
                                required: "Contact number is required",
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: "Please enter a valid 10-digit contact number"
                                }
                            })}
                            className={`h-10 sm:h-11 ${errors.contactNo ? "border-red-500" : ""}`}
                        />
                        {errors.contactNo && (
                            <p className="text-xs sm:text-sm text-red-500">{errors.contactNo.message}</p>
                        )}
                    </div>
                </div>

                {/* Email Address */}
                <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">Email Address <span className="text-red-500">*</span></Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Your email address"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }
                        })}
                        className={`h-10 sm:h-11 ${errors.email ? "border-red-500" : ""}`}
                    />
                    {errors.email && (
                        <p className="text-xs sm:text-sm text-red-500">{errors.email.message}</p>
                    )}
                </div>

                {/* Password */}
                <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">Password <span className="text-red-500">*</span></Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Create a password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be at least 6 characters" }
                        })}
                        className={`h-10 sm:h-11 ${errors.password ? "border-red-500" : ""}`}
                    />
                    {errors.password && (
                        <p className="text-xs sm:text-sm text-red-500">{errors.password.message}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {/* Batch Select */}
                    <div className="space-y-1.5 sm:space-y-2">
                        <Label htmlFor="batch" className="text-sm font-medium">Batch <span className="text-red-500">*</span></Label>
                        <Controller
                            name="batch"
                            control={control}
                            rules={{ required: "Batch is required" }}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className={`h-10 sm:h-11 ${errors.batch ? "border-red-500" : ""}`}>
                                        <SelectValue placeholder="Select your batch" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <div className="p-2">
                                            <div className="relative">
                                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    placeholder="Search batches..."
                                                    value={batchSearch}
                                                    onChange={(e) => setBatchSearch(e.target.value)}
                                                    className="pl-8 h-9"
                                                />
                                            </div>
                                        </div>
                                        <div className="max-h-48 overflow-y-auto">
                                            {filteredBatches.map((batch) => (
                                                <SelectItem key={batch} value={batch}>
                                                    {batch}
                                                </SelectItem>
                                            ))}
                                        </div>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.batch && (
                            <p className="text-xs sm:text-sm text-red-500">{errors.batch.message}</p>
                        )}
                    </div>

                    {/* State Select */}
                    <div className="space-y-1.5 sm:space-y-2">
                        <Label htmlFor="state" className="text-sm font-medium">State <span className="text-red-500">*</span></Label>
                        <Controller
                            name="state"
                            control={control}
                            rules={{ required: "State is required" }}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className={`h-10 sm:h-11 ${errors.state ? "border-red-500" : ""}`}>
                                        <SelectValue placeholder="Select your state" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <div className="p-2">
                                            <div className="relative">
                                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    placeholder="Search states..."
                                                    value={stateSearch}
                                                    onChange={(e) => setStateSearch(e.target.value)}
                                                    className="pl-8 h-9"
                                                />
                                            </div>
                                        </div>
                                        <div className="max-h-48 overflow-y-auto">
                                            {filteredStates.map((state) => (
                                                <SelectItem key={state} value={state}>
                                                    {state}
                                                </SelectItem>
                                            ))}
                                        </div>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.state && (
                            <p className="text-xs sm:text-sm text-red-500">{errors.state.message}</p>
                        )}
                    </div>
                </div>

                {/* College/Institution */}
                <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="college" className="text-sm font-medium">College/Institution <span className="text-red-500">*</span></Label>
                    <Input
                        id="college"
                        placeholder="College or institution name"
                        {...register("college", {
                            required: "College/Institution is required"
                        })}
                        className={`h-10 sm:h-11 ${errors.college ? "border-red-500" : ""}`}
                    />
                    {errors.college && (
                        <p className="text-xs sm:text-sm text-red-500">{errors.college.message}</p>
                    )}
                </div>

                <div className="pt-1 sm:pt-2">
                    <p className="text-xs text-muted-foreground mb-3 sm:mb-4 text-center">
                        <span className="text-red-500">*</span> Required fields | By submitting, you agree to our Terms.
                    </p>
                    <Button
                        type="submit"
                        className="w-full h-11 sm:h-12 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-medium text-sm sm:text-base"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                                Submitting Details...
                            </>
                        ) : (
                            <>
                                <CreditCard className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                                Proceed to Payment
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};

// ====================================================================
// 2. Course Enrollment Card Component (Modified to handle Auth check)
// ====================================================================

interface CourseEnrollmentProps {
    course: any;
    isEnrolled: boolean;
    onEnrollmentSuccess: () => void;
    setIsEnrolledLocally: (status: boolean) => void;
}

const CourseEnrollment: React.FC<CourseEnrollmentProps> = ({
    course,
    isEnrolled,
    onEnrollmentSuccess,
    setIsEnrolledLocally
}) => {
    // Mocking the useCustomToast from the user's provided context
    const useCustomToast = () => ({ showToast: (type: string, title: string, description: string) => toast[type === 'error' ? 'error' : type === 'info' ? 'success' : 'success'](description) });
    const { showToast } = useCustomToast();
    
    const authState = useAppSelector((state) => state.auth);
    const { token, user } = authState; // Use destructured state from mock hook

    const navigate = useNavigate();
    const [enrolling, setEnrolling] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
    const [applyingCoupon, setApplyingCoupon] = useState(false);
    const [finalPrice, setFinalPrice] = useState(course.price || course.finalPrice || course.discountedPrice);

    // Ref to track if the modal/payment flow needs to resume after a successful signup/login
    const paymentAttemptRef = React.useRef(false); 

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
        // Implementation for coupon logic here
        showToast('info', 'Feature Disabled', 'Coupon feature is currently a mock.');
    };

    const handleRemoveCoupon = () => {
        setAppliedCoupon(null);
        setCouponCode('');
        setFinalPrice(course.price || course.finalPrice || course.discountedPrice);
        showToast('info', 'Coupon Removed', 'Coupon has been removed');
    };

    const handlePayment = async () => {
        if (!token) {
            // User is NOT logged in. Show the signup/detail collection modal.
            setShowSignupModal(true);
            paymentAttemptRef.current = true; // Mark that payment needs to proceed after login
            return;
        }
        
        // If logged in (token exists), proceed with payment logic
        try {
            setEnrolling(true);

            const scriptLoaded = await loadRazorpayScript();
            if (!scriptLoaded) {
                showToast('error', 'Payment Gateway Error', 'Failed to load payment gateway. Please try again.');
                return;
            }

            const orderData = await paymentService.capturePayment([course.id], token);

            if (!orderData.success) {
                showToast('error', 'Order Creation Failed', orderData.message || 'Failed to create order. Please try again.');
                return;
            }

            const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY || "rzp_test_yQNkACsEOX8zkO";

            const options = {
                key: razorpayKey,
                amount: orderData.amount,
                currency: orderData.currency,
                name: "Shell Entertainment",
                description: `Enrollment for ${course.title}`,
                order_id: orderData.orderId,
                handler: async (response: any) => {
                    // Payment successful on Razorpay side, now verify it on your server
                    try {
                        const verifyData = await paymentService.verifyPayment({
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                            courses: [course.id]
                        }, token);

                        if (verifyData.success) {
                            setIsEnrolledLocally(true);
                            showToast('success', 'Payment Successful! 🎉', `You have been enrolled in ${course.title} successfully!`);
                            onEnrollmentSuccess();
                        } else {
                            showToast('error', 'Payment Failed', 'Payment verification failed. Please contact support.');
                        }
                    } catch (error) {
                        showToast('error', 'Verification Error', 'Payment verification failed. Please contact support if amount was deducted.');
                    }
                },
                prefill: {
                    name: `${user?.firstName} ${user?.lastName}`,
                    email: user?.email,
                    contact: user?.additionalDetails?.contactNumber || ""
                },
                theme: { color: "#3B82F6" },
                modal: { ondismiss: () => showToast('warning', 'Payment Cancelled', 'Payment was cancelled.') }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();

        } catch (error) {
            showToast('error', 'Payment Failed', 'Unable to start payment process. Please try again.');
        } finally {
            setEnrolling(false);
            paymentAttemptRef.current = false;
        }
    };

    // Effect to automatically retry payment after a successful login/detail collection from the modal
    useEffect(() => {
        // We only check if the token just became available AND a payment attempt was flagged as pending
        if (token && paymentAttemptRef.current) {
            // Slight delay to ensure React state updates and the modal is fully closed
            setTimeout(() => {
                handlePayment();
            }, 100);
        }
    }, [token]);

    // Cleanup mock auth token on component unmount (optional, for clean demo state)
    useEffect(() => {
        return () => {
             // localStorage.removeItem('mockAuthToken'); 
        };
    }, []);


    if (isEnrolled) {
        // Component state for ALREADY ENROLLED users
        return (
            <Card className="bg-card/80 backdrop-blur-lg border-primary/20 sticky top-24 h-fit shadow-xl">
                <CardContent className="p-4 sm:p-6">
                    <div className="text-center mb-4 sm:mb-6">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                            <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-green-600 mb-1 sm:mb-2">
                            You're Enrolled!
                        </h3>
                    </div>

                    <Button
                        className="w-full bg-green-600 hover:bg-green-700 h-10 sm:h-12 text-sm sm:text-base mb-3 sm:mb-4"
                        onClick={() => navigate(`/course-learning/${course.id}`)}
                    >
                        <Play className="w-4 h-4 mr-2" />
                        Go to Course
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
            <Card className="bg-card/80 backdrop-blur-lg border-primary/20 sticky top-24 h-fit shadow-xl">
                {/* Course Thumbnail */}
                <div className="aspect-video bg-muted relative">
                    <img 
                        src={course.thumbnail} 
                        alt={course.title}
                        className="w-full h-full object-cover"
                        onError={(e) => e.currentTarget.src = 'https://placehold.co/600x400?text=Course+Thumbnail'}
                    />
                </div>
                
                <CardContent className="p-6 space-y-6">
                    {/* Price Display */}
                    <div className="text-center mb-4 sm:mb-6">
                        <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                            ₹{finalPrice}
                        </div>
                        {course.originalPrice > finalPrice && (
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <span className="text-sm text-muted-foreground line-through">
                                    ₹{course.originalPrice}
                                </span>
                                {course.discountPercent > 0 && (
                                    <Badge variant="destructive" className="text-xs">
                                        {course.discountPercent}% OFF
                                    </Badge>
                                )}
                            </div>
                        )}
                        <p className="text-xs sm:text-sm text-muted-foreground">One-time payment</p>
                    </div>

                    {/* Coupon Section (Mocked) */}
                    <div className="mb-4 sm:mb-6">
                        {/* Current UI for Coupon - kept simple */}
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
                                <Tag className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Main Enrollment Button */}
                    <Button
                        className="w-full bg-gradient-to-r from-primary to-accent h-10 sm:h-12 mb-3 sm:mb-4 text-sm sm:text-base"
                        onClick={handlePayment}
                        disabled={enrolling}
                    >
                        {enrolling ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Securing Payment...
                            </>
                        ) : (
                            <>
                                <CreditCard className="w-4 h-4 mr-2" />
                                {token ? `Enroll Now - ₹${finalPrice}` : `Enroll Now & Register`}
                            </>
                        )}
                    </Button>

                    <div className="text-center text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
                        <Shield className="w-4 h-4 inline mr-1" />
                        30-day money-back guarantee
                    </div>

                    <Separator className="my-4 sm:my-6" />

                    {/* Course Includes List */}
                    <div className="space-y-3 sm:space-y-4">
                        <h4 className="font-semibold text-sm sm:text-base">This course includes:</h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                            {course.includes.map((inc: string, i: number) => (
                                <div key={i} className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-green-500 shrink-0" /> {inc}
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Combined Signup/Enrollment Modal - Only shows if NOT LOGGED IN */}
            <Dialog open={showSignupModal && !token} onOpenChange={setShowSignupModal}>
                <DialogContent className="max-w-lg w-[95vw] max-h-[95vh] overflow-y-auto">
                    <DialogHeader className="space-y-2 sm:space-y-3 pb-2">
                        <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                        </div>
                        <DialogTitle className="text-center text-lg sm:text-xl font-semibold">
                            Complete Your Enrollment Details
                        </DialogTitle>
                        <p className="text-center text-xs sm:text-sm text-muted-foreground px-2">
                            Please provide your details to register and secure your spot in <span className="font-medium text-primary">{course?.title}</span>.
                        </p>
                    </DialogHeader>
                    {/* On successful form submission, onSuccess will trigger the payment re-attempt */}
                    <EnrollmentSignupForm
                        courseName={course?.title}
                        onSuccess={() => {
                            setShowSignupModal(false);
                            // The useEffect in CourseEnrollment will handle the re-attempted payment
                        }}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};


// ====================================================================
// 3. Main Course Detail Page Component (CourseDetail)
// ====================================================================
// (This component remains largely the same, but now uses the new Enrollment component)

const CourseDetail = () => {
    const { courseId } = useParams();
    const { user } = useAppSelector((state) => state.auth); // Get user for enrollment check
    const [course, setCourse] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEnrolled, setIsEnrolled] = useState(false);
    
    const [expandedSections, setExpandedSections] = useState(new Set([0]));

    // Check if the current user ID is in the enrolled list
    const checkEnrollmentStatus = (courseData: any, userId: string) => {
        if (!userId) {
            setIsEnrolled(false);
            return;
        }
        // Mocking: Replace with actual API call to check enrollment for this user/course
        const isUserEnrolled = courseData.studentsEnrolled?.some((student: string) => student === userId) || false;
        setIsEnrolled(isUserEnrolled);
    };

    const fetchCourseDetails = async () => {
        const currentCourseId = courseId || "691089e919284282b7b850d5"; 
        if (!currentCourseId) return;
        
        setIsLoading(true);
        try {
            const response = await courseService.getCourseDetails(currentCourseId);
            const apiData = Array.isArray(response.data) ? response.data[0] : response.data;

            if (!apiData) {
                throw new Error("No course data found in response");
            }

            const mappedCourse = {
                // ... (rest of course data mapping) ...
                id: apiData._id,
                title: apiData.courseName,
                description: apiData.courseDescription ? apiData.courseDescription.replace(/\r\n|\n/g, ' ').trim() : '', 
                overview: apiData.courseOverview,
                price: apiData.finalPrice || apiData.originalPrice || 0,
                finalPrice: apiData.finalPrice,
                originalPrice: apiData.originalPrice,
                discountPercent: apiData.discountPercent || 0,
                thumbnail: apiData.thumbnail,
                brochure: apiData.brochures, 
                level: apiData.courseLevel,
                duration: apiData.courseDuration,
                category: apiData.category?.name || "General",
                rating: 4.8, 
                reviews: 120, 
                enrolledCount: apiData.studentsEnrolled ? apiData.studentsEnrolled.length : 0,
                studentsEnrolled: apiData.studentsEnrolled,
                instructorName: "Jane Doe (Java Expert)", 
                instructorAvatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=JavaExpert&backgroundColor=b6e3f4,c0aede,d1d4f9&hairColor=2c1b12,654522,54456f&glasses=variant01",
                instructorBio: "Experienced software engineer specializing in scalable Java and Spring Boot solutions.",
                whatYouLearn: apiData.whatYouWillLearn 
                    ? apiData.whatYouWillLearn.split(/\r\n|\n/).filter((t: string) => t.trim()) 
                    : [],
                curriculum: apiData.courseContent?.map((section: any, index: number) => ({
                    id: section._id || index,
                    title: section.sectionName,
                    lessons: section.subSection?.map((sub: any, subIndex: number) => ({
                        title: sub.title,
                        description: sub.description && sub.description.trim() !== "some discription here" ? sub.description : null,
                    })) || []
                })) || [],
                includes: [
                    apiData.courseDuration + " of video content",
                    "Full Lifetime Access",
                    "Certificate of Completion",
                    "Project Files & Codebase"
                ]
            };

            setCourse(mappedCourse);
            // Check enrollment status right after fetching course details
            checkEnrollmentStatus(apiData, user?.id); 

        } catch (err) {
            console.error("Error fetching course:", err);
            toast.error("Failed to load course details.");
            setCourse(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { 
        fetchCourseDetails(); 
    }, [courseId, user?.id]); // Re-fetch or re-check enrollment if user status changes

    const toggleSection = (index: number) => {
        setExpandedSections(prev => {
            const newSet = new Set(prev);
            newSet.has(index) ? newSet.delete(index) : newSet.add(index);
            return newSet;
        });
    };

    const handleDownloadBrochure = () => {
        if (course?.brochure) {
            window.open(course.brochure, '_blank');
        } else {
            toast.error("No brochure available for download.");
        }
    };

    const handleSuccessfulEnrollment = () => {
        setIsEnrolled(true);
    };


    // --- Loading and Error States ---
    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
    );

    if (!course) return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
            <Navigation />
            <div className="text-center p-10 bg-card rounded-xl shadow-lg mt-20">
                <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
                <h2 className="text-xl font-bold">Course Not Found</h2>
                <p className="text-muted-foreground">The requested course details could not be loaded or do not exist.</p>
                <Button asChild className="mt-6" variant="outline">
                    <Link to="/all-courses">← Back to All Courses</Link>
                </Button>
            </div>
            <Footer />
        </div>
    );

    // --- Main Render ---
    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            
            <main className="container mx-auto px-4 py-24 max-w-7xl">
                {/* ... (Breadcrumbs and main course content sections) ... */}
                <div className="mb-8 text-sm text-muted-foreground flex items-center gap-2">
                    <Link to="/all-courses" className="hover:text-primary flex items-center">
                        <ArrowLeft className="w-4 h-4 mr-1"/> Courses
                    </Link>
                    <span>/</span>
                    <span className="text-foreground font-medium">{course.category}</span>
                </div>

                <div className="grid lg:grid-cols-3 gap-10">
                    
                    {/* LEFT COLUMN - Main Info */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Header Section */}
                        <div className="space-y-4">
                            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0 capitalize">{course.level}</Badge>
                            <h1 className="text-3xl md:text-4xl font-bold text-foreground">{course.title}</h1>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {course.description}
                            </p>
                            
                            {/* Stats Bar */}
                            <div className="flex flex-wrap gap-6 pt-4 text-sm font-medium text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                    <span>**{course.rating}** Rating</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-blue-500" />
                                    <span>**{course.enrolledCount.toLocaleString()}** Enrolled</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-green-500" />
                                    <span>**{course.duration}**</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MessageSquare className="w-5 h-5 text-purple-500" />
                                    <span>**{course.reviews.toLocaleString()}** Reviews</span>
                                </div>
                            </div>
                        </div>
                        
                        <Separator />

                        {/* What You'll Learn */}
                        {course.whatYouLearn.length > 0 && (
                            <Card className="border-border bg-card/50">
                                <CardContent className="p-6">
                                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                        <ShieldCheck className="text-primary w-6 h-6" /> What You Will **Master**
                                    </h3>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {course.whatYouLearn.map((item: string, idx: number) => (
                                            <div key={idx} className="flex items-start gap-2 p-3 bg-muted/20 rounded-lg text-sm font-medium">
                                                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        <Separator />

                        {/* Course Overview */}
                        <div>
                            <h3 className="text-2xl font-bold mb-4">Course Overview</h3>
                            <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
                                {course.overview}
                            </div>
                        </div>

                        <Separator />

                        {/* Curriculum / Content */}
                        <div>
                            <h3 className="text-2xl font-bold mb-6">Course Curriculum</h3>
                            <div className="space-y-4">
                                {course.curriculum.map((section: any, idx: number) => {
                                    const isOpen = expandedSections.has(idx);
                                    const totalLessons = section.lessons.length;
                                    return (
                                        <div key={section.id} className="border rounded-xl overflow-hidden bg-card shadow-sm">
                                            <button 
                                                onClick={() => toggleSection(idx)}
                                                className="w-full flex items-center justify-between p-4 hover:bg-accent/50 transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <ChevronDown className={`w-5 h-5 transition-transform text-primary ${isOpen ? 'rotate-180' : ''}`}/>
                                                    <span className="text-lg font-semibold text-foreground">{section.title}</span>
                                                </div>
                                                <Badge variant="outline" className="ml-auto">{totalLessons} Lessons</Badge>
                                            </button>
                                            
                                            {isOpen && (
                                                <div className="border-t bg-muted/20 divide-y divide-border/50">
                                                    {totalLessons > 0 ? (
                                                        section.lessons.map((lesson: any, lIdx: number) => (
                                                            <div key={lIdx} className="p-3 pl-12 flex items-start gap-3 text-sm hover:bg-accent/30 transition-colors">
                                                                <Play className="w-4 h-4 text-primary/70 shrink-0 mt-1" />
                                                                <div className="flex flex-col">
                                                                    <span className="font-medium text-foreground">{lesson.title}</span>
                                                                    {lesson.description && (
                                                                        <span className="text-xs text-muted-foreground italic">{lesson.description}</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="p-4 text-center text-xs text-muted-foreground">No lessons uploaded yet in this section.</div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN - Sticky Sidebar (Enrollment Component) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            
                            <CourseEnrollment 
                                course={course}
                                isEnrolled={isEnrolled}
                                onEnrollmentSuccess={handleSuccessfulEnrollment}
                                setIsEnrolledLocally={setIsEnrolled} 
                            />
                            
                            {/* Instructor Card */}
                            <Card className="shadow-lg">
                                <CardContent className="p-6 text-center">
                                    <h3 className="text-xl font-bold mb-4 text-foreground">Your Instructor</h3>
                                    <img
                                        src={course.instructorAvatar} 
                                        alt={course.instructorName}
                                        className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-4 border-primary/50 shadow-md"
                                    />
                                    <h4 className="text-lg font-bold mb-1 text-primary">{course.instructorName}</h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed italic">{course.instructorBio}</p>
                                    <div className="mt-4">
                                        <Button variant="link" className="text-primary hover:text-primary/80">View Full Profile →</Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Brochure Download Button */}
                            {course.brochure && (
                                <Button onClick={handleDownloadBrochure} variant="outline" className="w-full gap-2 h-12 border-dashed border-2">
                                    <Download className="w-5 h-5" /> **Download Course Brochure**
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CourseDetail;