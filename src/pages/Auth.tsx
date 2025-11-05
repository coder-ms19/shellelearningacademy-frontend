import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useDispatch } from "react-redux";
import { authService } from "@/service/auth.service";
import { loginStart, loginSuccess, loginFailure } from "@/store/authSlice";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import logo from "../assets/logo1.png";

interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      dispatch(loginStart());
      const response = await authService.login({ 
        email: data.email, 
        password: data.password 
      });
      const { token, user } = response;
      dispatch(loginSuccess({ token, user }));
      toast.success("Signed in successfully!");
      navigate("/");
    } catch (error: any) {
      dispatch(loginFailure());
      toast.error(error?.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <Card className="w-full max-w-md p-8 backdrop-blur-sm bg-card/80 border-primary/20 relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="flex items-center justify-center gap-3 mb-4">
            <img src={logo} alt="Shell E-learning Academy" className="h-16 w-16 object-contain" />
            <span className="text-3xl font-bold text-gradient">Shell Entertainment</span>
          </Link>
          <p className="text-muted-foreground mt-2">Welcome back! Please enter your details.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
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
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 3,
                  message: "Password must be at least 3 characters"
                }
              })}
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="mr-2" 
                {...register("rememberMe")}
              />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-primary hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Auth;