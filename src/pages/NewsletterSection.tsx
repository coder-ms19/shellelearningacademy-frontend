import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const NewsletterSection = () => {
  return (
    <section className=" py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center rounded-3xl p-6 sm:p-8">
          {/* Title */}
          <div className="mb-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-green-900 mb-2">
              Stay updated with New Courses
            </h2>
            <p className="text-sm sm:text-base text-green-700">
              Subscribe to our newsletter and be the first to know about new courses, exclusive offers, and learning tips.
            </p>
          </div>

          {/* Email Signup Form */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Enter your email..."
                className="pl-10 h-12 text-sm bg-white border-gray-300 focus:border-green-500"
              />
            </div>
            <Button className="h-12 px-6 bg-black hover:bg-gray-800 !text-white text-sm rounded-md">
              Subscribe
            </Button>
          </div>

          {/* Footer Text */}
          <p className="text-xs text-green-600">
            Join 50,000+ learners already subscribed. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;