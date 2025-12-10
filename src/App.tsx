import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Provider } from "react-redux";
import { store } from "@/store";
import AuthLoader from "@/components/AuthLoader";
import ScrollToTop from "@/components/ScrollToTop";
// import PrivateRoute from "./components/core/Auth/PrivateRoute";
// import OpenRoute from "./components/core/Auth/OpenRoute";
import Workshops from "./pages/Workshops";
import WorkshopDetail from "./pages/WorkshopDetail";
import CreateWorkshop from "./pages/CreateWorkshop";
import WorkshopRegistrations from "./pages/WorkshopRegistrations";
import Leads from "./pages/Leads";
import { Toaster } from "react-hot-toast";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Certificate from "./pages/Certificate";
import Course from "./pages/Course";

import AllCourses from "./pages/Course/AllCourses";
import CoursesList from "./pages/Course/CoursesList";
import CourseDetail from "./pages/Course/CourseDetail";
import ViewCourse from "./pages/Course/ViewCourse";
import CourseLearning from "./pages/Course/CourseLearning";
import CreateCourse from "./pages/Course/CreateCourse";
import CreateCategory from "./pages/Course/CreateCatagory";
import EditCourse from "./pages/Course/EditCourse";
import ManageCourses from "./pages/Course/ManageCourses";
import Navigation from "./pages/Navigation";
import NotFound from "./pages/NotFound";
import { Certifications } from "./pages/Certifications";
import { Interviews } from "./pages/Interviews";
import { HelpCenter } from "./pages/HelpCenter";
import { Community } from "./pages/Community";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfService } from "./pages/TermsOfService";
import { FAQ } from "./pages/FAQ";
import JobDetailPage from "./pages/JobDetail";
import { Events } from "./pages/Events";
import { EventDetail } from "./pages/EventDetail";

import Register from "./pages/Register";
import CourseSignUpForm from "./pages/CourseSignUpForm";
import EnrollmentSuccess from "./pages/EnrollmentSuccess";
import Popup from "./components/Popup";
import CreateJob from "./pages/CreateJob";
import EditJob from "./pages/EditJob";
import ManageJobs from "./pages/ManageJobs";
import Careers from "./pages/Careers";
import Demo from "./pages/Demo";
import FullPageAIChatbot from "./components/ChatBot/AiChatBot";
import NexaHome from "./components/nexa/NexaHome";
import FloatingNexaChat from "./components/nexa/FloatingNexaChat";
import { NexaChatProvider } from "./context/NexaChatContext";




const App = () => (
  <Provider store={store}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <NexaChatProvider>
          <BrowserRouter>
            <Popup />
            <ScrollToTop />
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 3000,
                style: {
                  background: 'hsl(var(--background))',
                  color: 'hsl(var(--foreground))',
                  border: '1px solid hsl(var(--border))',
                },
              }}
            />
            <AuthLoader>
              <Routes>
                <Route path="/" element={<Index />} />

                <Route path="/about" element={<About />} />
                <Route path="/demo" element={<Demo />} />
                <Route path="/nexa" element={<NexaHome />} />
                <Route path="/nexa-bot" element={<FullPageAIChatbot />} />

                <Route path="/contact" element={<Contact />} />
                <Route path="/personal-info" element={<CourseSignUpForm onSuccess={() => { console.log("hello ") }} />} />

                <Route path="/services" element={<Services />} />
                <Route path="/enrollment-success" element={<EnrollmentSuccess />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/sign-up" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/certificate/:courseId" element={<Certificate />} />

                {/* Course Routes */}
                <Route path="/all-courses" element={<AllCourses />} />
                <Route path="/courses-list" element={<CoursesList />} />
                <Route path="/course/:id" element={<ViewCourse />} />
                <Route path="/course-detail/:courseId" element={<CourseDetail />} />


                <Route path="/course-learning/:id" element={<CourseLearning />} />

                {/* Course Management Routes */}
                <Route path="/create-course" element={<CreateCourse />} />
                <Route path="/edit-course/:courseId" element={<EditCourse />} />
                <Route path="/manage-courses" element={<ManageCourses />} />
                <Route path="/add-category" element={<CreateCategory />} />

                {/* New Feature Routes */}
                <Route path="/certifications" element={<Certifications />} />
                <Route path="/interviews" element={<Interviews />} />
                <Route path="/help-center" element={<HelpCenter />} />
                <Route path="/community" element={<Community />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/careers/:id" element={<JobDetailPage />} />
                <Route path="/workshops" element={<Workshops />} />
                <Route path="/workshops/:id" element={<WorkshopDetail />} />
                <Route path="/create-workshop" element={

                  <CreateWorkshop />

                } />
                <Route path="/workshop-registrations" element={<WorkshopRegistrations />} />
                <Route path="/leads" element={<Leads />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/:id" element={<EventDetail />} />
                <Route path="/create-job" element={<CreateJob />} />
                <Route path="/edit-job/:id" element={<EditJob />} />
                <Route path="/manage-jobs" element={<ManageJobs />} />

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <FloatingNexaChat />
            </AuthLoader>
          </BrowserRouter>
        </NexaChatProvider>
      </TooltipProvider>
    </ThemeProvider>
  </Provider>
);

export default App;
