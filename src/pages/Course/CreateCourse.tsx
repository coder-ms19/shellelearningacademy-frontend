import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Trash2, X, Image, Tag, Video, FileText, Edit, Send, Upload, Loader2, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

import { courseService } from '@/service/course.service';
import { useAppSelector } from '@/hooks/redux';
import { Navigation } from '@/components/Navbar';

const CreateCourse = () => {
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.auth);

  const [currentStage, setCurrentStage] = useState(1);
  const [createdCourseId, setCreatedCourseId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null); // { sectionIndex, subIndex }
  const [sectionForms, setSectionForms] = useState({});

  // Stage 1: Course Data
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
    instructions: []
  });

  // Stage 2: Sections and Subsections
  const [sections, setSections] = useState([]);
  const [currentSectionName, setCurrentSectionName] = useState('');

  // Stage 3: Final Status
  const [finalStatus, setFinalStatus] = useState('Draft');

  // Helper states
  const [currentTag, setCurrentTag] = useState('');
  const [currentInstruction, setCurrentInstruction] = useState('');

  const initialForm = { title: '', description: '', videoFile: null, videoPreview: '' };

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
    fetchCategories();
  }, [token]);

  // Cleanup URLs on unmount
  useEffect(() => {
    return () => {
      // Revoke form previews
      Object.values(sectionForms).forEach(form => {
        if (form.videoPreview) URL.revokeObjectURL(form.videoPreview);
      });
      // Revoke section sub previews
      sections.forEach(section => {
        section.subSections?.forEach(sub => {
          if (sub.videoPreview) URL.revokeObjectURL(sub.videoPreview);
        });
      });
    };
  }, []);

  // Stage 1 Handlers
  const handleCourseInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData(prev => ({ ...prev, [name]: value }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
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

  // Stage 1: Create Course
  const handleStage1Submit = async () => {
    if (!courseData.courseName ||  courseData.tags.length === 0) {
      toast.error("Please fill required fields: Course name, price, and at least one tag.");
      return;
    }

    try {
      setIsLoading(true);
      
      const formData = new FormData();
      formData.append('courseName', courseData.courseName);
      formData.append('courseDescription', courseData.courseDescription);
      formData.append('whatYouWillLearn', courseData.whatYouWillLearn);
      formData.append('originalPrice', courseData.originalPrice );
      formData.append('discountedPrice', courseData.discountedPrice );
      
      formData.append('tag', JSON.stringify(courseData.tags));
      formData.append('category', courseData.category);
      formData.append('status', 'Draft');
      formData.append('instructions', JSON.stringify(courseData.instructions));
      
      if (courseData.thumbnail) {
        formData.append('thumbnailImage', courseData.thumbnail);
      }
      
      const courseRes = await courseService.createCourse(formData, token);
      setCreatedCourseId(courseRes.data._id);
      
      toast.success("Course Created Successfully! Now let's add sections and lessons to your course.");
      
      setCurrentStage(2);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create course");
    } finally {
      setIsLoading(false);
    }
  };

  // Stage 2 Handlers
  const addSection = () => {
    if (currentSectionName.trim()) {
      setSections(prev => [...prev, {
        sectionName: currentSectionName.trim(),
        subSections: [],
        isCreated: false,
        sectionId: null
      }]);
      setCurrentSectionName('');
    }
  };

  const removeSection = (index) => {
    setSections(prev => {
      const removedSection = prev[index];
      // Revoke previews for removed subsections
      removedSection.subSections?.forEach(sub => {
        if (sub.videoPreview) URL.revokeObjectURL(sub.videoPreview);
      });
      // Clear form for this section
      if (sectionForms[index]) {
        if (sectionForms[index].videoPreview) URL.revokeObjectURL(sectionForms[index].videoPreview);
        setSectionForms(prevForms => {
          const newForms = { ...prevForms };
          delete newForms[index];
          return newForms;
        });
      }
      if (editing?.sectionIndex === index) setEditing(null);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleVideoChange = useCallback((sectionIdx, e) => {
    const file = e.target.files[0];
    if (file) {
      setSectionForms(prev => {
        const oldForm = prev[sectionIdx] || initialForm;
        if (oldForm.videoPreview) {
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
  }, []);

  const removeVideoFromForm = useCallback((sectionIdx) => {
    setSectionForms(prev => {
      const form = prev[sectionIdx] || initialForm;
      if (form.videoPreview) {
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

  const handleAddOrUpdate = useCallback((sectionIndex) => {
    const form = sectionForms[sectionIndex] || initialForm;
    if (!form.title.trim() || !form.videoFile) {
      toast.error("Lesson title and video file are required.");
      return;
    }

    setSections(prev => prev.map((section, idx) => {
      if (idx !== sectionIndex) return section;

      let newSubSections;
      if (editing && editing.sectionIndex === sectionIndex && editing.subIndex !== undefined) {
        // Update existing
        newSubSections = [...section.subSections];
        newSubSections[editing.subIndex] = { ...form };
        setEditing(null);
      } else {
        // Add new
        newSubSections = [...section.subSections, { ...form }];
      }

      // Clear form and revoke its preview (since copied to sub)
      const oldFormPreview = (sectionForms[sectionIndex] || initialForm).videoPreview;
      if (oldFormPreview) {
        // Note: Since we copy the URL string, but to avoid memory leak, revoke after copy? But URL is shared, so don't revoke here.
        // Actually, since sub now holds it, and we clear form, but URL remains valid until revoked on remove.
        // Safe to not revoke here.
      }
      setSectionForms(prevForms => {
        const newForms = { ...prevForms };
        delete newForms[sectionIndex]; // Clear form
        return newForms;
      });

      return { ...section, subSections: newSubSections };
    }));
  }, [editing, sectionForms, toast]);

  const handleEditSubSection = useCallback((sectionIndex, subIndex) => {
    const section = sections[sectionIndex];
    if (!section) return;
    const subData = section.subSections[subIndex];
    if (!subData) return;

    setSectionForms(prev => ({
      ...prev,
      [sectionIndex]: { ...subData }
    }));
    setEditing({ sectionIndex, subIndex });
  }, [sections]);

  const handleCancelEdit = useCallback((sectionIndex) => {
    // Revoke if video was changed during edit
    const form = sectionForms[sectionIndex];
    if (form?.videoPreview) {
      URL.revokeObjectURL(form.videoPreview);
    }
    setSectionForms(prev => {
      const newForms = { ...prev };
      delete newForms[sectionIndex];
      return newForms;
    });
    setEditing(null);
  }, [sectionForms]);

  const removeSubSection = useCallback((sectionIndex, subIndex) => {
    setSections(prev => prev.map((section, idx) => {
      if (idx !== sectionIndex) return section;
      const removedSub = section.subSections[subIndex];
      if (removedSub.videoPreview) {
        URL.revokeObjectURL(removedSub.videoPreview);
      }
      return {
        ...section,
        subSections: section.subSections.filter((_, i) => i !== subIndex)
      };
    }));
    // Clear editing if this was being edited
    if (editing?.sectionIndex === sectionIndex && editing?.subIndex === subIndex) {
      setEditing(null);
    }
  }, [editing]);

  // Stage 2: Create Sections and Subsections
  const handleStage2Submit = async () => {
    if (sections.length === 0) {
      toast.error("Please add at least one section.");
      return;
    }

    try {
      setIsLoading(true);
      
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        
        // Create section
        const sectionRes = await courseService.createSection({
          sectionName: section.sectionName,
          courseId: createdCourseId
        }, token);
        
        const sectionId = sectionRes.updatedCourse.courseContent[sectionRes.updatedCourse.courseContent.length - 1]._id || sectionRes.updatedCourse.courseContent[sectionRes.updatedCourse.courseContent.length - 1];
        
        // Update section with ID
        setSections(prev => prev.map((s, idx) => 
          idx === i ? { ...s, isCreated: true, sectionId } : s
        ));
        
        // Create subsections
        for (const subSection of section.subSections) {
          if (subSection.title.trim() && subSection.videoFile) {
            const subSectionData = new FormData();
            subSectionData.append('sectionId', sectionId);
            subSectionData.append('title', subSection.title);
            subSectionData.append('description', subSection.description);
            subSectionData.append('courseId', createdCourseId);
            subSectionData.append('videoFile', subSection.videoFile);
            
            await courseService.createSubSection(subSectionData, token);
          }
        }
      }
      
      toast.success("Sections & Lessons Created! Now choose whether to publish or keep as draft.");
      
      setCurrentStage(3);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create sections");
    } finally {
      setIsLoading(false);
    }
  };

  // Stage 3: Publish/Draft Course
  const handleStage3Submit = async () => {
    const totalLessons = sections.reduce((total, section) => total + section.subSections.length, 0);
    
    if (finalStatus === 'Published' && (sections.length === 0 || totalLessons === 0)) {
      toast.error("To publish a course, you must add at least one section with at least one lesson.");
      return;
    }

    try {
      setIsLoading(true);
      
      const formData = new FormData();
      formData.append('courseId', createdCourseId);
      formData.append('status', finalStatus);
      
      await courseService.editCourse(formData, token);
      
      toast.success(`Course has been ${finalStatus === 'Published' ? 'published' : 'saved as draft'} successfully!`);
      
      navigate('/profile');
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update course status");
    } finally {
      setIsLoading(false);
    }
  };

  const getStageProgress = () => {
    return (currentStage / 3) * 100;
  };

  const totalLessons = sections.reduce((total, section) => total + section.subSections.length, 0);

  const handlePublishClick = () => {
    if (sections.length === 0 || totalLessons === 0) {
      toast.error("Add at least one section with lessons before publishing.");
      return;
    }
    setFinalStatus('Published');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-shell-darker via-shell-dark to-shell-dark  mt-20">
      <Navigation />
      
      {/* Progress Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-lg sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={() => navigate('/dashboard')} 
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </button>
              <div className="text-sm text-muted-foreground">
                Stage {currentStage} of 3
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className={currentStage >= 1 ? "text-primary font-medium" : "text-muted-foreground"}>
                  1. Create Course
                </span>
                <span className={currentStage >= 2 ? "text-primary font-medium" : "text-muted-foreground"}>
                  2. Add Content
                </span>
                <span className={currentStage >= 3 ? "text-primary font-medium" : "text-muted-foreground"}>
                  3. Publish
                </span>
              </div>
              <Progress value={getStageProgress()} className="h-2" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Stage 1: Course Creation */}
          {currentStage === 1 && (
            <Card className="bg-card/80 backdrop-blur-lg border-border">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Stage 1: Create Your Course
                  </span>
                </CardTitle>
                <p className="text-muted-foreground">Set up the basic information for your course</p>
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
                          if (courseData.thumbnailImage) URL.revokeObjectURL(courseData.thumbnailImage);
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
                      Creating Course...
                    </>
                  ) : (
                    <>
                      Create Course & Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Stage 2: Sections and Subsections */}
          {currentStage === 2 && (
            <Card className="bg-card/80 backdrop-blur-lg border-border">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Stage 2: Add Course Content
                  </span>
                </CardTitle>
                <p className="text-muted-foreground">Create sections and lessons for your course</p>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-green-500">Course "{courseData.courseName}" created successfully</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Add Section */}
                <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/20">
                  <Label className="text-sm font-medium mb-3 block">Add New Section</Label>
                  <div className="flex space-x-2">
                    <Input
                      value={currentSectionName}
                      onChange={(e) => setCurrentSectionName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addSection()}
                      placeholder="Enter section name"
                      className="flex-1"
                    />
                    <Button 
                      type="button" 
                      variant="default" 
                      onClick={addSection}
                      disabled={!currentSectionName.trim()}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Sections */}
                <div className="space-y-4">
                  {sections.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <h3 className="text-lg font-medium mb-2">No sections created yet</h3>
                      <p className="text-sm">Start by adding your first section above</p>
                    </div>
                  )}
                  
                  {sections.map((section, sectionIndex) => {
                    const form = sectionForms[sectionIndex] || initialForm;
                    const isEditingThis = editing && editing.sectionIndex === sectionIndex;
                    return (
                      <Card key={sectionIndex} className="bg-gradient-to-r from-card/80 to-card/60 border-primary/30">
                        <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                              <span className="text-sm font-bold text-primary">{sectionIndex + 1}</span>
                            </div>
                            <div>
                              <CardTitle className="text-lg">{section.sectionName}</CardTitle>
                              <p className="text-sm text-muted-foreground">
                                {section.subSections.length} lesson{section.subSections.length !== 1 ? 's' : ''}
                              </p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSection(sectionIndex)}
                            className="text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          
                          {/* Add/Edit Subsection */}
                          <div className="space-y-3 p-4 border border-border rounded-md bg-muted/30">
                            <Label className="text-sm font-medium">
                              {isEditingThis ? `Edit Lesson ${editing.subIndex + 1}` : 'Add New Lesson'}
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
                            
                            {/* Video Upload */}
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
                                onClick={() => handleAddOrUpdate(sectionIndex)}
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
                                    Add Lesson to Section
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

                          {/* Subsections List */}
                          <div className="space-y-2">
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
                                          preload="metadata"
                                          muted
                                          playsInline
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
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                <div className="flex space-x-4">
                  <Button 
                    variant="outline"
                    onClick={() => setCurrentStage(1)}
                    className="flex-1"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Course Info
                  </Button>
                  <Button 
                    onClick={handleStage2Submit}
                    className="flex-1 bg-gradient-to-r from-primary to-accent"
                    disabled={isLoading || sections.length === 0}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating Content...
                      </>
                    ) : (
                      <>
                        Create Content & Continue
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stage 3: Publish/Draft */}
          {currentStage === 3 && (
            <Card className="bg-card/80 backdrop-blur-lg border-border">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Stage 3: Publish Your Course
                  </span>
                </CardTitle>
                <p className="text-muted-foreground">Choose whether to publish or save as draft</p>
                <div className="flex flex-col items-center space-y-2 mt-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-green-500">Course created successfully</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-green-500">
                      {sections.length} sections and {totalLessons} lessons added
                    </span>
                  </div>
                  {totalLessons === 0 && (
                    <div className="flex items-center space-x-2 text-sm text-destructive">
                      <FileText className="w-4 h-4" />
                      <span>No lessons added - Publishing requires at least one lesson</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Course Summary */}
                <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Course Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div className="p-3 bg-card/50 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{sections.length}</div>
                        <div className="text-sm text-muted-foreground">Sections</div>
                      </div>
                      <div className="p-3 bg-card/50 rounded-lg">
                        <div className="text-2xl font-bold text-accent">
                          {totalLessons}
                        </div>
                        <div className="text-sm text-muted-foreground">Lessons</div>
                      </div>
                      <div className="p-3 bg-card/50 rounded-lg">
                        <div className="text-2xl font-bold text-green-500">{courseData.tags.length}</div>
                        <div className="text-sm text-muted-foreground">Tags</div>
                      </div>
                      
                    </div>
                    <div className="text-center p-4 bg-card/30 rounded-lg">
                      <h3 className="font-semibold text-lg">{courseData.courseName}</h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        {courseData.courseDescription || 'No description provided'}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Status Selection */}
                <div className="space-y-4">
                  <Label className="text-lg font-medium">Course Status</Label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card 
                      className={`cursor-pointer transition-all ${finalStatus === 'Draft' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                      onClick={() => setFinalStatus('Draft')}
                    >
                      <CardContent className="p-6 text-center">
                        <Edit className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="font-semibold mb-2">Save as Draft</h3>
                        <p className="text-sm text-muted-foreground">
                          Keep your course private and continue editing later
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card 
                      className={`cursor-pointer transition-all ${finalStatus === 'Published' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'} ${totalLessons === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={handlePublishClick}
                    >
                      <CardContent className="p-6 text-center">
                        <Send className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="font-semibold mb-2">Publish Course</h3>
                        <p className="text-sm text-muted-foreground">
                          Make your course available to students immediately
                        </p>
                        {totalLessons === 0 && (
                          <p className="text-xs text-destructive mt-2 font-medium">
                            Requires at least 1 lesson
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button 
                    variant="outline"
                    onClick={() => setCurrentStage(2)}
                    className="flex-1"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Content
                  </Button>
                  <Button 
                    onClick={handleStage3Submit}
                    className="flex-1 bg-gradient-to-r from-primary to-accent"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {finalStatus === 'Published' ? 'Publishing...' : 'Saving...'}
                      </>
                    ) : (
                      <>
                        {finalStatus === 'Published' ? 'Publish Course' : 'Save as Draft'}
                        <CheckCircle className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;