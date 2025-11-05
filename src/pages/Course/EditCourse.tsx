import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Plus, Trash2, X, Image, Video, FileText, Edit, Send, Upload, Loader2, CheckCircle, ArrowRight, ArrowLeft, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { courseService } from '@/service/course.service';
import { useAppSelector } from '@/hooks/redux';

const EditCourse = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { toast } = useToast();
  const { token } = useAppSelector((state) => state.auth);

  const [currentStage, setCurrentStage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCourse, setIsLoadingCourse] = useState(true);
  const [categories, setCategories] = useState([]);

  // Stage 1: Course Data (matched to CreateCourse fields)
  const [courseData, setCourseData] = useState({
    courseName: '',
    courseDescription: '',
    whatYouWillLearn: '',
    originalPrice: '',
    discountedPrice: '',
    thumbnail: null,
    thumbnailImage: '',
    tags: [],
    category: '',
    instructions: [],
    status: 'Draft'
  });

  // Track original data for change detection
  const [originalCourseData, setOriginalCourseData] = useState({});
  const [originalSections, setOriginalSections] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);

  // Stage 2: Sections and Subsections
  const [sections, setSections] = useState([]);
  const [currentSectionName, setCurrentSectionName] = useState('');
  const [editingSubSection, setEditingSubSection] = useState(null); // { sectionIndex, subIndex }
  const [sectionForms, setSectionForms] = useState({}); // Per-section form state

  // Helper states
  const [currentTag, setCurrentTag] = useState('');
  const [currentInstruction, setCurrentInstruction] = useState('');

  const initialForm = { title: '', description: '', videoFile: null, videoPreview: '' };

  // Fetch course details (adapted to CreateCourse fields)
  const fetchCourseDetails = async () => {
    if (!courseId || !token) return;
    try {
      setIsLoadingCourse(true);
      const res = await courseService.getFullCourseDetails(courseId, token);
      const course = res.data.courseDetails;
      
      const courseDataObj = {
        courseName: course.courseName || '',
        courseDescription: course.courseDescription || '',
        whatYouWillLearn: course.whatYouWillLearn || '',
        originalPrice: course.originalPrice || '',
        discountedPrice: course.discountedPrice || '',
        thumbnail: null,
        thumbnailImage: course.thumbnail || '',
        tags: course.tag || [],
        category: course.category?._id || '',
        instructions: course.instructions || [],
        status: course.status || 'Draft'
      };
      
      setCourseData(courseDataObj);
      setOriginalCourseData(courseDataObj);

      // Convert existing sections to editable format
      const existingSections = course.courseContent?.map(section => ({
        sectionName: section.sectionName,
        sectionId: section._id,
        isCreated: true,
        subSections: section.subSection?.map(sub => ({
          title: sub.title,
          description: sub.description,
          videoFile: null,
          videoPreview: sub.videoUrl, // Use backend URL for preview
          subSectionId: sub._id,
          isCreated: true
        })) || []
      })) || [];
      
      setSections(existingSections);
      setOriginalSections(JSON.parse(JSON.stringify(existingSections)));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch course details",
        variant: "destructive"
      });
      navigate('/manage-courses');
    } finally {
      setIsLoadingCourse(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    if (!token) return;
    try {
      const res = await courseService.getAllCategories();
      setCategories(res.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
    fetchCategories();
  }, [courseId, token]);

  // Cleanup URLs on unmount
  useEffect(() => {
    return () => {
      // Revoke form previews
      Object.values(sectionForms).forEach(form => {
        if (form.videoPreview) URL.revokeObjectURL(form.videoPreview);
      });
      // Revoke section sub previews (local ones)
      sections.forEach(section => {
        section.subSections?.forEach(sub => {
          if (sub.videoPreview && !sub.videoPreview.startsWith('http')) {
            URL.revokeObjectURL(sub.videoPreview);
          }
        });
      });
    };
  }, [sections, sectionForms]);

  // Stage 1 Handlers (matched to CreateCourse)
  const handleCourseInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData(prev => ({ ...prev, [name]: value }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (courseData.thumbnailImage && courseData.thumbnailImage.startsWith('blob:')) {
        URL.revokeObjectURL(courseData.thumbnailImage);
      }
      const previewUrl = URL.createObjectURL(file);
      setCourseData(prev => ({ ...prev, thumbnail: file, thumbnailImage: previewUrl }));
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !courseData.tags.includes(currentTag.trim())) {
      setCourseData(prev => ({ ...prev, tags: [...prev.tags, currentTag.trim()] }));
      setCurrentTag('');
    }
  };

  const removeTag = (index) => {
    setCourseData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const addInstruction = () => {
    if (currentInstruction.trim()) {
      setCourseData(prev => ({ ...prev, instructions: [...prev.instructions, currentInstruction.trim()] }));
      setCurrentInstruction('');
    }
  };

  const removeInstruction = (index) => {
    setCourseData(prev => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index)
    }));
  };

  // Check if course data has changed
  const hasCourseDataChanged = () => {
    return JSON.stringify(courseData) !== JSON.stringify(originalCourseData) || courseData.thumbnail !== null;
  };

  // Stage 1: Update Course (matched to CreateCourse)
  const handleStage1Submit = async () => {
    if (!courseData.courseName || courseData.tags.length === 0) {
      toast({ title: "Incomplete form", description: "Please fill required fields: Course name and at least one tag.", variant: "destructive" });
      return;
    }

    if (!hasCourseDataChanged()) {
      toast({
        title: "No Changes Detected",
        description: "Moving to next stage without updating."
      });
      setCurrentStage(2);
      return;
    }

    try {
      setIsLoading(true);
      
      const formData = new FormData();
      formData.append('courseId', courseId);
      formData.append('courseName', courseData.courseName);
      formData.append('courseDescription', courseData.courseDescription);
      formData.append('whatYouWillLearn', courseData.whatYouWillLearn);
      formData.append('originalPrice', courseData.originalPrice);
      formData.append('discountedPrice', courseData.discountedPrice);
      formData.append('tag', JSON.stringify(courseData.tags));
      formData.append('category', courseData.category);
      formData.append('instructions', JSON.stringify(courseData.instructions));
      
      if (courseData.thumbnail) {
        formData.append('thumbnailImage', courseData.thumbnail);
      }
      
      await courseService.editCourse(formData, token);
      
      toast({
        title: "Course Updated Successfully!",
        description: "Now you can manage sections and lessons."
      });
      
      setCurrentStage(2);
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update course",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Stage 2 Handlers (enhanced with preview and edit)
  const addSection = async () => {
    if (!currentSectionName.trim()) return;
    
    try {
      setIsLoading(true);
      const sectionRes = await courseService.createSection({
        sectionName: currentSectionName.trim(),
        courseId: courseId
      }, token);
      
      const newSectionId = sectionRes.updatedCourse.courseContent[sectionRes.updatedCourse.courseContent.length - 1]._id || sectionRes.updatedCourse.courseContent[sectionRes.updatedCourse.courseContent.length - 1];
      
      setSections(prev => [...prev, {
        sectionName: currentSectionName.trim(),
        sectionId: newSectionId,
        isCreated: true,
        subSections: []
      }]);
      
      setCurrentSectionName('');
      toast({ title: "Section added successfully!" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add section",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeSection = async (index) => {
    toast({
      title: "Confirm Delete",
      description: "Are you sure you want to delete this section? This action cannot be undone.",
      action: (
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" onClick={() => toast.dismiss()}>Cancel</Button>
          <Button size="sm" variant="destructive" onClick={async () => {
            const section = sections[index];
            if (section.isCreated && section.sectionId) {
              try {
                setIsLoading(true);
                await courseService.deleteSection({
                  sectionId: section.sectionId,
                  courseId: courseId
                }, token);
                
                // Revoke previews for subsections
                section.subSections.forEach(sub => {
                  if (sub.videoPreview && !sub.videoPreview.startsWith('http')) {
                    URL.revokeObjectURL(sub.videoPreview);
                  }
                });
                
                setSections(prev => prev.filter((_, i) => i !== index));
                toast({ title: "Section deleted successfully!" });
              } catch (error) {
                toast({
                  title: "Error",
                  description: "Failed to delete section",
                  variant: "destructive"
                });
              } finally {
                setIsLoading(false);
              }
            } else {
              setSections(prev => prev.filter((_, i) => i !== index));
            }
            toast.dismiss();
          }}>Delete</Button>
        </div>
      ),
      duration: 10000
    });
  };

  const handleVideoChange = useCallback((sectionIdx, e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 500 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Video file must be less than 500MB.",
          variant: "destructive"
        });
        return;
      }
      setSectionForms(prev => {
        const oldForm = prev[sectionIdx] || initialForm;
        if (oldForm.videoPreview && oldForm.videoPreview.startsWith('blob:')) {
          URL.revokeObjectURL(oldForm.videoPreview);
        }
        const previewUrl = URL.createObjectURL(file);
        return {
          ...prev,
          [sectionIdx]: {
            ...oldForm,
            videoFile: file,
            videoPreview: previewUrl
          }
        };
      });
    }
  }, [toast]);

  const removeVideoFromForm = useCallback((sectionIdx) => {
    setSectionForms(prev => {
      const form = prev[sectionIdx] || initialForm;
      if (form.videoPreview && form.videoPreview.startsWith('blob:')) {
        URL.revokeObjectURL(form.videoPreview);
      }
      return {
        ...prev,
        [sectionIdx]: {
          ...form,
          videoFile: null,
          videoPreview: ''
        }
      };
    });
  }, []);

  const updateFormField = useCallback((sectionIdx, field, value) => {
    setSectionForms(prev => ({
      ...prev,
      [sectionIdx]: {
        ...(prev[sectionIdx] || initialForm),
        [field]: value
      }
    }));
  }, []);

  const handleAddOrUpdateSubSection = useCallback(async (sectionIndex) => {
    const form = sectionForms[sectionIndex] || initialForm;
    if (!form.title.trim() || (!form.videoFile && !form.videoPreview)) {
      toast({
        title: "Incomplete Lesson",
        description: "Lesson title and video are required.",
        variant: "destructive"
      });
      return;
    }

    const section = sections[sectionIndex];
    if (!section.sectionId) return;

    try {
      setIsLoading(true);
      const subSectionData = new FormData();
      subSectionData.append('sectionId', section.sectionId);
      subSectionData.append('title', form.title);
      subSectionData.append('description', form.description);
      subSectionData.append('courseId', courseId);
      if (form.videoFile) {
        subSectionData.append('videoFile', form.videoFile);
      }

      const res = await courseService.createSubSection(subSectionData, token); // Assuming this handles update if ID provided, but for simplicity, assume separate update method if needed

      setSections(prev => prev.map((s, idx) => {
        if (idx !== sectionIndex) return s;

        let newSubSections;
        if (editingSubSection && editingSubSection.sectionIndex === sectionIndex && editingSubSection.subIndex !== undefined) {
          // Update existing (assuming backend returns updated subSectionId)
          newSubSections = [...s.subSections];
          newSubSections[editingSubSection.subIndex] = { 
            ...form, 
            videoPreview: form.videoPreview, // Keep preview
            isCreated: true,
            subSectionId: res.data?._id || form.subSectionId // Assume response has ID
          };
          setEditingSubSection(null);
        } else {
          // Add new
          newSubSections = [...s.subSections, { 
            ...form, 
            videoPreview: form.videoPreview,
            isCreated: true,
            subSectionId: res.data?._id || Date.now() 
          }];
        }

        // Clear form
        const oldFormPreview = form.videoPreview;
        if (oldFormPreview && oldFormPreview.startsWith('blob:')) {
          URL.revokeObjectURL(oldFormPreview);
        }
        setSectionForms(prevForms => {
          const newForms = { ...prevForms };
          delete newForms[sectionIndex];
          return newForms;
        });

        return { ...s, subSections: newSubSections };
      }));

      toast({ title: editingSubSection ? "Lesson updated successfully!" : "Lesson added successfully!" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save lesson",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [editingSubSection, sectionForms, sections, courseId, token, toast]);

  const handleEditSubSection = useCallback((sectionIndex, subIndex) => {
    const section = sections[sectionIndex];
    if (!section) return;
    const subData = section.subSections[subIndex];
    if (!subData) return;

    setSectionForms(prev => ({
      ...prev,
      [sectionIndex]: { ...subData }
    }));
    setEditingSubSection({ sectionIndex, subIndex });
  }, [sections]);

  const handleCancelEdit = useCallback((sectionIndex) => {
    const form = sectionForms[sectionIndex];
    if (form?.videoPreview && form.videoPreview.startsWith('blob:')) {
      URL.revokeObjectURL(form.videoPreview);
    }
    setSectionForms(prev => {
      const newForms = { ...prev };
      delete newForms[sectionIndex];
      return newForms;
    });
    setEditingSubSection(null);
  }, [sectionForms]);

  const removeSubSection = async (sectionIndex, subIndex) => {
    toast({
      title: "Confirm Delete",
      description: "Are you sure you want to delete this lesson? This action cannot be undone.",
      action: (
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" onClick={() => toast.dismiss()}>Cancel</Button>
          <Button size="sm" variant="destructive" onClick={async () => {
            const section = sections[sectionIndex];
            const subSection = section.subSections[subIndex];
            
            if (subSection.isCreated && subSection.subSectionId) {
              try {
                setIsLoading(true);
                await courseService.deleteSubSection({
                  subSectionId: subSection.subSectionId,
                  sectionId: section.sectionId,
                  courseId: courseId
                }, token);
                
                // Revoke local preview if any
                if (subSection.videoPreview && !subSection.videoPreview.startsWith('http')) {
                  URL.revokeObjectURL(subSection.videoPreview);
                }
                
                setSections(prev => prev.map((s, idx) =>
                  idx === sectionIndex
                    ? { ...s, subSections: s.subSections.filter((_, i) => i !== subIndex) }
                    : s
                ));
                
                toast({ title: "Lesson deleted successfully!" });
              } catch (error) {
                toast({
                  title: "Error",
                  description: "Failed to delete lesson",
                  variant: "destructive"
                });
              } finally {
                setIsLoading(false);
              }
            } else {
              setSections(prev => prev.map((s, idx) =>
                idx === sectionIndex
                  ? { ...s, subSections: s.subSections.filter((_, i) => i !== subIndex) }
                  : s
              ));
            }
            toast.dismiss();
          }}>Delete</Button>
        </div>
      ),
      duration: 10000
    });
  };

  // Stage 3: Update Course Status (from second)
  const handleStage3Submit = async () => {
    if (courseData.status === originalCourseData.status) {
      toast({
        title: "No Changes Detected",
        description: "Course status unchanged. Returning to manage courses."
      });
      navigate('/manage-courses');
      return;
    }

    try {
      setIsLoading(true);
      
      const formData = new FormData();
      formData.append('courseId', courseId);
      formData.append('status', courseData.status);
      
      await courseService.editCourse(formData, token);
      
      toast({
        title: "Course Updated!",
        description: `Course has been ${courseData.status === 'Published' ? 'published' : 'saved as draft'} successfully.`
      });
      
      navigate('/manage-courses');
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update course status",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStageProgress = () => {
    return (currentStage / 3) * 100;
  };

  if (isLoadingCourse) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
        <Navigation />
        <main className="container mx-auto px-4 pt-32 pb-20 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p>Loading course details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <Navigation />

      {/* Progress Header (added from second for functionality) */}
      <div className="border-b border-border bg-card/50 backdrop-blur-lg sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={() => navigate('/manage-courses')} 
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Manage Courses</span>
              </button>
              <div className="text-sm text-muted-foreground">
                Stage {currentStage} of 3
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className={currentStage >= 1 ? "text-primary font-medium" : "text-muted-foreground"}>
                  1. Edit Course Details
                </span>
                <span className={currentStage >= 2 ? "text-primary font-medium" : "text-muted-foreground"}>
                  2. Manage Content
                </span>
                <span className={currentStage >= 3 ? "text-primary font-medium" : "text-muted-foreground"}>
                  3. Update Status
                </span>
              </div>
              <Progress value={getStageProgress()} className="h-2" />
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 pt-8 pb-20">
        <div className="max-w-3xl mx-auto">
          
          {/* Stage 1: Course Details (using CreateCourse fields and UI) */}
          {currentStage === 1 && (
            <Card className="bg-card/80 backdrop-blur-lg border-border">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Stage 1: Edit Your Course
                  </span>
                </CardTitle>
                <p className="text-muted-foreground">Update the basic information for your course</p>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Basic Info */}
                <div className="space-y-2">
                  <Label htmlFor="courseName">Course Name *</Label>
                  <Input
                    id="courseName"
                    name="courseName"
                    value={courseData.courseName}
                    onChange={handleCourseInputChange}
                    placeholder="Enter course title"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="originalPrice">Original Price</Label>
                    <Input
                      id="originalPrice"
                      name="originalPrice"
                      value={courseData.originalPrice}
                      onChange={handleCourseInputChange}
                      placeholder="$149.99"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discountedPrice">Discounted Price</Label>
                    <Input
                      id="discountedPrice"
                      name="discountedPrice"
                      value={courseData.discountedPrice}
                      onChange={handleCourseInputChange}
                      placeholder="$99.99"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="courseDescription">Course Description</Label>
                  <Textarea
                    id="courseDescription"
                    name="courseDescription"
                    value={courseData.courseDescription}
                    onChange={handleCourseInputChange}
                    placeholder="Describe your course..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatYouWillLearn">What You Will Learn</Label>
                  <Textarea
                    id="whatYouWillLearn"
                    name="whatYouWillLearn"
                    value={courseData.whatYouWillLearn}
                    onChange={handleCourseInputChange}
                    placeholder="Key takeaways..."
                    rows={3}
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={courseData.category} onValueChange={(value) => setCourseData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat._id} value={cat._id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label>Tags *</Label>
                  <div className="flex space-x-2">
                    <Input
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addTag()}
                      placeholder="Add tag"
                      className="flex-1"
                    />
                    <Button type="button" variant="outline" size="sm" onClick={addTag}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {courseData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                        {tag}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTag(index)}
                          className="h-4 w-4 p-0"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Instructions */}
                <div className="space-y-2">
                  <Label>Instructions</Label>
                  <div className="flex space-x-2">
                    <Input
                      value={currentInstruction}
                      onChange={(e) => setCurrentInstruction(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addInstruction()}
                      placeholder="Add instruction"
                      className="flex-1"
                    />
                    <Button type="button" variant="outline" size="sm" onClick={addInstruction}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {courseData.instructions.map((inst, index) => (
                      <Badge key={index} variant="outline" className="flex items-center space-x-1">
                        {inst}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeInstruction(index)}
                          className="h-4 w-4 p-0"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Thumbnail */}
                <div className="space-y-2">
                  <Label>Thumbnail Image</Label>
                  {!courseData.thumbnailImage ? (
                    <div className="relative border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer group">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className="space-y-2 pointer-events-none">
                        <div className="w-16 h-16 mx-auto bg-secondary rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                          <Image className="w-8 h-8 text-muted-foreground group-hover:text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Click to upload thumbnail</p>
                          <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative group">
                      <div className="aspect-video w-full max-w-md rounded-lg overflow-hidden border border-border">
                        <img 
                          src={courseData.thumbnailImage} 
                          alt="Course Thumbnail" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          if (courseData.thumbnailImage && courseData.thumbnailImage.startsWith('blob:')) URL.revokeObjectURL(courseData.thumbnailImage);
                          setCourseData(prev => ({ ...prev, thumbnail: null, thumbnailImage: '' }));
                        }}
                        className="absolute top-2 right-2"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>

                <Button 
                  onClick={handleStage1Submit}
                  className="w-full bg-gradient-to-r from-primary to-accent"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Updating Course...
                    </>
                  ) : (
                    <>
                      Update Course & Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Stage 2: Manage Content (adapted to fit first UI style with preview) */}
          {currentStage === 2 && (
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-gradient">Stage 2: Manage Content</h2>
              <div className="space-y-6">
                {/* Add Section */}
                <div className="flex gap-2">
                  <Input
                    value={currentSectionName}
                    onChange={(e) => setCurrentSectionName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addSection()}
                    placeholder="Enter section name"
                    className="flex-1"
                  />
                  <Button type="button" onClick={addSection} disabled={!currentSectionName.trim() || isLoading}>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                  </Button>
                </div>

                {/* Sections Accordion */}
                <Accordion type="multiple" defaultValue={sections.map((_, i) => i.toString())}>
                  {sections.map((section, sectionIndex) => {
                    const form = sectionForms[sectionIndex] || initialForm;
                    const isEditingThis = editingSubSection && editingSubSection.sectionIndex === sectionIndex;
                    return (
                      <AccordionItem key={sectionIndex} value={sectionIndex.toString()}>
                        <AccordionTrigger>
                          <div className="flex justify-between w-full">
                            <span>{section.sectionName}</span>
                            <span>{section.subSections.length} lessons</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          {/* Add/Edit SubSection */}
                          <div className="space-y-3 p-4 border rounded bg-muted/30">
                            <Label className="text-sm font-medium">
                              {isEditingThis ? `Edit Lesson ${editingSubSection.subIndex + 1}` : 'Add New Lesson'}
                            </Label>
                            
                            <Input
                              placeholder="Lesson Title (Required)"
                              value={form.title}
                              onChange={(e) => updateFormField(sectionIndex, 'title', e.target.value)}
                            />
                            
                            <Textarea
                              placeholder="Lesson Description"
                              value={form.description}
                              onChange={(e) => updateFormField(sectionIndex, 'description', e.target.value)}
                              rows={2}
                            />
                            
                            {/* Video Upload/Preview */}
                            <div className="space-y-2">
                              <Label className="text-xs text-muted-foreground">Video File (Required)</Label>
                              {!form.videoPreview ? (
                                <div className="relative border-2 border-dashed border-primary/30 rounded-lg p-3 text-center hover:border-primary transition-colors cursor-pointer group">
                                  <input
                                    type="file"
                                    accept="video/*"
                                    onChange={(e) => handleVideoChange(sectionIndex, e)}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                  />
                                  <div className="space-y-1 pointer-events-none">
                                    <Video className="w-8 h-8 mx-auto text-primary" />
                                    <p className="text-xs font-medium">Upload Video</p>
                                  </div>
                                </div>
                              ) : (
                                <div className="relative">
                                  <video 
                                    src={form.videoPreview} 
                                    controls 
                                    className="w-full h-32 object-contain bg-black rounded"
                                  />
                                  <Button
                                    type="button"
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => removeVideoFromForm(sectionIndex)}
                                    className="absolute top-2 right-2"
                                  >
                                    <X className="w-3 h-3" />
                                  </Button>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex gap-2">
                              <Button
                                type="button"
                                size="sm"
                                onClick={() => handleAddOrUpdateSubSection(sectionIndex)}
                                className="flex-1"
                                disabled={!form.title.trim() || !form.videoFile}
                              >
                                {isEditingThis ? (
                                  <>
                                    <Edit className="w-4 h-4 mr-2" />
                                    Update Lesson
                                  </>
                                ) : (
                                  <>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Lesson
                                  </>
                                )}
                              </Button>
                              {isEditingThis && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleCancelEdit(sectionIndex)}
                                >
                                  Cancel
                                </Button>
                              )}
                            </div>
                          </div>

                          {/* SubSections List */}
                          <div className="space-y-2 mt-4">
                            {section.subSections.map((sub, subIndex) => (
                              <div key={subIndex} className="p-3 border border-border/50 rounded-lg bg-card/50">
                                <div className="flex justify-between items-start gap-2">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <Badge variant="secondary" className="text-xs">
                                        Lesson {subIndex + 1}
                                      </Badge>
                                      <h4 className="font-medium">{sub.title}</h4>
                                    </div>
                                    {sub.description && (
                                      <p className="text-sm text-muted-foreground">{sub.description}</p>
                                    )}
                                    {sub.videoPreview && (
                                      <div className="mt-2">
                                        <video
                                          src={sub.videoPreview}
                                          className="w-full max-w-xs h-24 object-cover rounded bg-black"
                                          controls
                                          preload="metadata"
                                        />
                                        <p className="text-xs text-muted-foreground truncate mt-1">
                                          {sub.videoFile?.name || 'Video attached'}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex gap-1 flex-shrink-0">
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleEditSubSection(sectionIndex, subIndex)}
                                    >
                                      <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeSubSection(sectionIndex, subIndex)}
                                      className="text-destructive hover:bg-destructive/10"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setCurrentStage(1)} className="flex-1">
                    Back
                  </Button>
                  <Button onClick={() => setCurrentStage(3)} className="flex-1" disabled={isLoading}>Next</Button>
                </div>
              </div>
            </Card>
          )}

          {/* Stage 3: Update Status (adapted) */}
          {currentStage === 3 && (
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-gradient">Stage 3: Update Status</h2>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Button 
                    variant={courseData.status === 'Draft' ? "default" : "outline"}
                    onClick={() => setCourseData(prev => ({ ...prev, status: 'Draft' }))}
                    className="flex flex-col items-center p-6"
                  >
                    <Edit className="h-8 w-8 mb-2" />
                    <span>Draft</span>
                  </Button>
                  <Button 
                    variant={courseData.status === 'Published' ? "default" : "outline"}
                    onClick={() => setCourseData(prev => ({ ...prev, status: 'Published' }))}
                    className="flex flex-col items-center p-6"
                  >
                    <Send className="h-8 w-8 mb-2" />
                    <span>Published</span>
                  </Button>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setCurrentStage(2)} className="flex-1">
                    Back
                  </Button>
                  <Button onClick={handleStage3Submit} className="flex-1" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {courseData.status === 'Published' ? 'Publish' : 'Save Draft'}
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EditCourse;