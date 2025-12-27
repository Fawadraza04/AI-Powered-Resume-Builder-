/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { supabase } from "../config/supabase";
import { useAuth } from "./AuthContext";

const ResumeContext = createContext();

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
};

const emptyResume = {
  title: "Untitled Resume",
  template: "modern",
  personal_info: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    website: "",
    summary: "",
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
};

export const ResumeProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [currentResume, setCurrentResume] = useState(emptyResume);
  const [resumes, setResumes] = useState([]);
  const [currentResumeId, setCurrentResumeId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch all resumes for current user
  const fetchResumes = useCallback(async () => {
    if (!currentUser) return;

    setLoading(true);
    try {
      const q = query(
        collection(db, "resumes"),
        where("userId", "==", currentUser.uid),
        orderBy("updatedAt", "desc")
      );
      const querySnapshot = await getDocs(q);

      const resumesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setResumes(resumesData);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
    setLoading(false);
  }, [currentUser]);

  // Create new resume
  const createResume = async (title = "Untitled Resume") => {
    if (!currentUser) return;

    const newResume = {
      title,
      template: "modern",
      personal_info: emptyResume.personal_info,
      education: [],
      experience: [],
      skills: [],
      projects: [],
      user_id: currentUser.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    try {
      const { data, error } = await supabase
        .from("resumes")
        .insert(newResume)
        .select()
        .single();

      if (error) throw error;

      setCurrentResumeId(data.id);
      setCurrentResume({
        ...data,
        personalInfo: data.personal_info,
      });
      await fetchResumes();
      return data.id;
    } catch (error) {
      console.error("Error creating resume:", error);
      throw error;
    }
  };

  // Load specific resume
  const loadResume = async (resumeId) => {
    setLoading(true);
    let timeout = setTimeout(() => {
      console.warn("loadResume: Timeout reached, forcing loading=false");
      setLoading(false);
    }, 5000);

    try {
      const { data, error } = await supabase
        .from("resumes")
        .select("*")
        .eq("id", resumeId)
        .single();

      clearTimeout(timeout);

      if (error) throw error;

      if (data) {
        const resumeData = {
          ...data,
          personalInfo: data.personal_info || {},
        };
        setCurrentResume(resumeData);
        setCurrentResumeId(resumeId);
      }
    } catch (error) {
      clearTimeout(timeout);
      console.error("Error loading resume:", error);
    }
    setLoading(false);
  };

  // Save/Update resume
  const saveResume = async (resumeData = currentResume) => {
    if (!currentUser || !currentResumeId) return;

    setSaving(true);
    try {
      const updateData = {
        title: resumeData.title,
        template: resumeData.template,
        personal_info: resumeData.personalInfo || resumeData.personal_info,
        education: resumeData.education,
        experience: resumeData.experience,
        skills: resumeData.skills,
        projects: resumeData.projects,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("resumes")
        .update(updateData)
        .eq("id", currentResumeId);

      if (error) throw error;

      setCurrentResume({
        ...resumeData,
        personalInfo: updateData.personal_info,
      });
      await fetchResumes();
    } catch (error) {
      console.error("Error saving resume:", error);
      throw error;
    }
    setSaving(false);
  };

  // Delete resume
  const deleteResume = async (resumeId) => {
    try {
      const { error } = await supabase
        .from("resumes")
        .delete()
        .eq("id", resumeId);

      if (error) throw error;

      if (currentResumeId === resumeId) {
        setCurrentResume(emptyResume);
        setCurrentResumeId(null);
      }
      await fetchResumes();
    } catch (error) {
      console.error("Error deleting resume:", error);
      throw error;
    }
  };

  // Duplicate resume
  const duplicateResume = async (resumeId) => {
    if (!currentUser) return;

    try {
      const { data: original, error: fetchError } = await supabase
        .from("resumes")
        .select("*")
        .eq("id", resumeId)
        .single();

      if (fetchError) throw fetchError;

      const duplicatedResume = {
        title: `${original.title} (Copy)`,
        template: original.template,
        personal_info: original.personal_info,
        education: original.education,
        experience: original.experience,
        skills: original.skills,
        projects: original.projects,
        user_id: currentUser.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("resumes")
        .insert(duplicatedResume)
        .select()
        .single();

      if (error) throw error;

      await fetchResumes();
      return data.id;
    } catch (error) {
      console.error("Error duplicating resume:", error);
      throw error;
    }
  };

  // Update specific section
  const updateSection = (section, data) => {
    setCurrentResume((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  // Update personal info
  const updatePersonalInfo = (field, value) => {
    setCurrentResume((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  // Add item to section (education, experience, skills, projects)
  const addItem = (section, item) => {
    setCurrentResume((prev) => ({
      ...prev,
      [section]: [...prev[section], { ...item, id: Date.now().toString() }],
    }));
  };

  // Update item in section
  const updateItem = (section, itemId, data) => {
    setCurrentResume((prev) => ({
      ...prev,
      [section]: prev[section].map((item) =>
        item.id === itemId ? { ...item, ...data } : item
      ),
    }));
  };

  // Delete item from section
  const deleteItem = (section, itemId) => {
    setCurrentResume((prev) => ({
      ...prev,
      [section]: prev[section].filter((item) => item.id !== itemId),
    }));
  };

  // Set template
  const setTemplate = (template) => {
    setCurrentResume((prev) => ({
      ...prev,
      template,
    }));
  };

  // Reset to new resume
  const resetResume = () => {
    setCurrentResume(emptyResume);
    setCurrentResumeId(null);
  };

  useEffect(() => {
    let timeout = null;
    if (currentUser) {
      // Timeout to prevent infinite loading (fallback)
      timeout = setTimeout(() => {
        console.warn(
          "ResumeProvider: Fallback timeout reached, forcing loading=false"
        );
        setLoading(false);
      }, 5000);

      fetchResumes();
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [currentUser, fetchResumes]);

  const value = {
    currentResume,
    resumes,
    currentResumeId,
    loading,
    saving,
    createResume,
    loadResume,
    saveResume,
    deleteResume,
    duplicateResume,
    updateSection,
    updatePersonalInfo,
    addItem,
    updateItem,
    deleteItem,
    setTemplate,
    resetResume,
    fetchResumes,
  };

  return (
    <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
  );
};
