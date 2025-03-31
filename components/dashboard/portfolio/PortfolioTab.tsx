"use client";

import { useGlobalContext } from "@/context/GlobalContextProvider";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import Cookies from "js-cookie";
import { Briefcase, Code, GraduationCap } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css"; // Skeleton CSS
import { toast } from "sonner"; // Import Sonner
import PortInfoImage from "../../../assets/boy.png";
import { EducationItem } from "./Education/EducationItem";
import { AddModal } from "./Modals/AddModal";
import { CreatePortfolioModal } from "./Modals/CreatePortfolioModal";
import { DeleteModal } from "./Modals/DeleteModal";
import { EditModal } from "./Modals/EditModal";
import { ProfileEditModal } from "./Modals/ProfileEditModal";
import { ItemList } from "./Neutral/ItemList";
import { SectionCard } from "./Neutral/SectionCard";
import ProfileContent from "./Profile/ProfileContent";
import { ProjectItem } from "./Projects/ProjectItem";
import { SkillItem } from "./Skills/SkillItem";
import { WorkExperienceItem } from "./WorkExperience/WorkExperienceItem";

interface Portfolio {
  id: string;
  email: string;
  name: string;
  about: string;
  image_url: string;
  x_url: string;
  github_url: string;
  linkedin_url: string;
  facebook_url: string;
  education: Education[];
  workExperience: WorkExperience[];
  projects: Project[];
  skills: Skill[];
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  status: string;
}

interface WorkExperience {
  id: string;
  companyName: string;
  position: string;
  startDate: string;
  endDate: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  image_url: string;
  web_url: string;
}

interface Skill {
  id: string;
  label: string;
  url: string;
}

type PortfolioArrayKey = "education" | "workExperience" | "projects" | "skills";

export default function PortfolioTab() {
  const router = useRouter();
  const { isDarkMode } = useGlobalContext();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalState, setModalState] = useState({
    isDeleteOpen: false,
    isAddOpen: false,
    isEditOpen: false,
    isProfileEditOpen: false,
    isCreatePortfolioOpen: false,
    deleteItem: null as { id: string; type: string } | null,
    addType: "" as string,
    editItem: null as { id: string; type: string; data: any } | null,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/portfolio`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        }
      );
      setPortfolio(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch portfolio data");
      console.error("Error fetching portfolio:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!modalState.deleteItem) return;
    let endpoint;

    switch (modalState.deleteItem.type) {
      case "projects":
        endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/projects/${modalState.deleteItem.id}`;
        break;
      case "skills":
        endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/skills/${modalState.deleteItem.id}`;
        break;
      case "workExperience":
        endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/work-experiences/${modalState.deleteItem.id}`;
        break;
      case "education":
        endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/education/${modalState.deleteItem.id}`;
        break;
      default:
        throw new Error(`Invalid delete type: ${modalState.deleteItem.type}`);
    }
    try {
      await axios.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      });
      if (portfolio) {
        const updatedPortfolio = { ...portfolio };
        const key = modalState.deleteItem.type as PortfolioArrayKey;
        if (Array.isArray(updatedPortfolio[key])) {
          const filteredArray = updatedPortfolio[key].filter(
            (item) => item.id !== modalState.deleteItem!.id
          );
          setPortfolio({
            ...updatedPortfolio,
            [key]: filteredArray as any,
          });
          toast.success(`${modalState.deleteItem.type} deleted successfully`);
        }
      }
    } catch (error) {
      toast.error(`Failed to delete ${modalState.deleteItem.type} item`);
      console.error("Error deleting item:", error);
    } finally {
      setModalState({ ...modalState, isDeleteOpen: false, deleteItem: null });
    }
  };

  const handleAdd = async (data: any) => {
    try {
      let endpoint;
      let formattedData = { ...data };

      // Format dates for Prisma
      if (data.startDate) {
        formattedData.startDate = new Date(data.startDate).toISOString();
      }
      if (data.endDate) {
        formattedData.endDate = new Date(data.endDate).toISOString();
      }

      switch (modalState.addType) {
        case "projects":
          endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/projects`;
          break;
        case "skills":
          endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/skills`;
          break;
        case "workExperience":
          endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/work-experiences`;
          break;
        case "education":
          endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/education`;
          break;
        default:
          throw new Error(`Invalid add type: ${modalState.addType}`);
      }

      const response = await axios.post(endpoint, formattedData, {
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      });

      if (portfolio) {
        setPortfolio({
          ...portfolio,
          [modalState.addType as keyof Portfolio]: [
            ...portfolio[modalState.addType as keyof Portfolio],
            response.data.data,
          ],
        });
        toast.success(`${modalState.addType} added successfully`);
      }
    } catch (error) {
      toast.error(`Failed to add ${modalState.addType} item`);
      console.error("Error adding item:", error);
    } finally {
      setModalState({ ...modalState, isAddOpen: false, addType: "" });
    }
  };

  const handleEdit = async (data: any) => {
    if (!modalState.editItem) return;
    let formattedData = { ...data };

    // Format dates for Prisma
    if (data.startDate) {
      formattedData.startDate = new Date(data.startDate).toISOString();
    }
    if (data.endDate) {
      formattedData.endDate = new Date(data.endDate).toISOString();
    }
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${modalState.editItem.type}/${modalState.editItem.id}`,
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        }
      );
      if (portfolio) {
        const updatedPortfolio = { ...portfolio };
        const key = modalState.editItem.type as PortfolioArrayKey;
        if (Array.isArray(updatedPortfolio[key])) {
          const mappedArray = updatedPortfolio[key].map((item) =>
            item.id === modalState.editItem!.id ? response.data.data : item
          );
          setPortfolio({
            ...updatedPortfolio,
            [key]: mappedArray as any,
          });
          toast.success(`${modalState.editItem.type} updated successfully`);
        }
      }
    } catch (error) {
      toast.error(`Failed to update ${modalState.editItem.type} item`);
      console.error("Error updating item:", error);
    } finally {
      setModalState({ ...modalState, isEditOpen: false, editItem: null });
    }
  };

  const handleProfileEdit = async (data: any) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/portfolio`,
        data,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        }
      );
      // setPortfolio(response.data.data);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile information");
      console.error("Error updating profile:", error);
    } finally {
      setModalState({ ...modalState, isProfileEditOpen: false });
    }
  };

  const handleCreatePortfolio = async (data: any) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/portfolio`,
        data,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        }
      );
      setPortfolio(response.data.data);
      toast.success("Portfolio created successfully");
    } catch (error) {
      toast.error("Failed to create portfolio");
      console.error("Error creating portfolio:", error);
    } finally {
      setModalState({ ...modalState, isCreatePortfolioOpen: false });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div
          className={`flex flex-col items-center ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-t-blue-500 border-b-blue-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
          </div>
          <p className="mt-4 text-lg font-medium animate-pulse">
            Loading portfolio...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-xl p-8 text-center ${
          isDarkMode ? "bg-red-900/30 text-red-200" : "bg-red-100 text-red-600"
        }`}
      >
        <div className="text-2xl font-semibold mb-4">Error</div>
        <p className="mb-4">{error}</p>
        <button
          onClick={() => setError(null)}
          className={`px-6 py-2 rounded-lg font-medium ${
            isDarkMode
              ? "bg-red-600 hover:bg-red-700"
              : "bg-red-500 hover:bg-red-600"
          } text-white transition-colors`}
        >
          Try Again
        </button>
      </motion.div>
    );
  }

  if (!portfolio) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-xl p-12 text-center ${
          isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"
        }`}
      >
        <div className="text-2xl font-semibold mb-4">No Portfolio Found</div>
        <p className="mb-6">
          Your portfolio data is empty. Start by adding your information.
        </p>
        <button
          className={`px-6 py-3 rounded-lg font-medium ${
            isDarkMode
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all`}
          onClick={() =>
            setModalState({ ...modalState, isCreatePortfolioOpen: true })
          }
        >
          Create Portfolio
        </button>

        <CreatePortfolioModal
          isOpen={modalState.isCreatePortfolioOpen}
          onClose={() =>
            setModalState({ ...modalState, isCreatePortfolioOpen: false })
          }
          onSubmit={handleCreatePortfolio}
          isDarkMode={isDarkMode}
        />
      </motion.div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      <SectionCard
        title="Profile Information"
        icon={
          <Image
            src={PortInfoImage}
            alt="Profile"
            width={44}
            height={44}
            className="opacity-80"
          />
        }
        isDarkMode={isDarkMode}
        content={
          <ProfileContent
            portfolio={portfolio}
            isDarkMode={isDarkMode}
            handleProfileEdit={handleProfileEdit}
          />
        }
      />

      <SectionCard
        title="Projects"
        icon={<Code className="w-5 h-5 opacity-80" />}
        isDarkMode={isDarkMode}
        content={
          <ItemList
            items={portfolio.projects}
            type="projects"
            renderItem={(project: Project) => (
              <ProjectItem project={project} isDarkMode={isDarkMode} />
            )}
            onDelete={(id: string) =>
              setModalState({
                ...modalState,
                isDeleteOpen: true,
                deleteItem: { id, type: "projects" },
              })
            }
            onEdit={(id: string) => {
              const item = portfolio.projects.find((p) => p.id === id);
              setModalState({
                ...modalState,
                isEditOpen: true,
                editItem: { id, type: "projects", data: item },
              });
            }}
            isDarkMode={isDarkMode}
          />
        }
        onAdd={() =>
          setModalState({ ...modalState, isAddOpen: true, addType: "projects" })
        }
      />

      <SectionCard
        title="Education"
        icon={<GraduationCap className="w-5 h-5 opacity-80" />}
        isDarkMode={isDarkMode}
        content={
          <ItemList
            items={portfolio.education}
            type="education"
            renderItem={(edu: Education) => (
              <EducationItem education={edu} isDarkMode={isDarkMode} />
            )}
            onDelete={(id: string) =>
              setModalState({
                ...modalState,
                isDeleteOpen: true,
                deleteItem: { id, type: "education" },
              })
            }
            onEdit={(id: string) => {
              const item = portfolio.education.find((e) => e.id === id);
              setModalState({
                ...modalState,
                isEditOpen: true,
                editItem: { id, type: "education", data: item },
              });
            }}
            isDarkMode={isDarkMode}
          />
        }
        onAdd={() =>
          setModalState({
            ...modalState,
            isAddOpen: true,
            addType: "education",
          })
        }
      />

      <SectionCard
        title="Work Experience"
        icon={<Briefcase className="w-5 h-5 opacity-80" />}
        isDarkMode={isDarkMode}
        content={
          <ItemList
            items={portfolio.workExperience}
            type="workExperience"
            renderItem={(work: WorkExperience) => (
              <WorkExperienceItem work={work} isDarkMode={isDarkMode} />
            )}
            onDelete={(id: string) =>
              setModalState({
                ...modalState,
                isDeleteOpen: true,
                deleteItem: { id, type: "workExperience" },
              })
            }
            onEdit={(id: string) => {
              const item = portfolio.workExperience.find((w) => w.id === id);
              setModalState({
                ...modalState,
                isEditOpen: true,
                editItem: { id, type: "workExperience", data: item },
              });
            }}
            isDarkMode={isDarkMode}
          />
        }
        onAdd={() =>
          setModalState({
            ...modalState,
            isAddOpen: true,
            addType: "workExperience",
          })
        }
      />

      <SectionCard
        title="Skills"
        icon={<Code className="w-5 h-5 opacity-80" />}
        isDarkMode={isDarkMode}
        content={
          <ItemList
            items={portfolio.skills}
            type="skills"
            renderItem={(skill: Skill) => (
              <SkillItem skill={skill} isDarkMode={isDarkMode} />
            )}
            onDelete={(id: string) =>
              setModalState({
                ...modalState,
                isDeleteOpen: true,
                deleteItem: { id, type: "skills" },
              })
            }
            onEdit={(id: string) => {
              const item = portfolio.skills.find((s) => s.id === id);
              setModalState({
                ...modalState,
                isEditOpen: true,
                editItem: { id, type: "skills", data: item },
              });
            }}
            isDarkMode={isDarkMode}
          />
        }
        onAdd={() =>
          setModalState({ ...modalState, isAddOpen: true, addType: "skills" })
        }
      />

      <AnimatePresence>
        {modalState.isDeleteOpen && (
          <DeleteModal
            isOpen={modalState.isDeleteOpen}
            onClose={() =>
              setModalState({ ...modalState, isDeleteOpen: false })
            }
            onConfirm={handleDelete}
            isDarkMode={isDarkMode}
          />
        )}

        {modalState.isAddOpen && (
          <AddModal
            type={modalState.addType}
            isOpen={modalState.isAddOpen}
            onClose={() => setModalState({ ...modalState, isAddOpen: false })}
            onSubmit={handleAdd}
            isDarkMode={isDarkMode}
          />
        )}

        {modalState.isEditOpen && modalState.editItem && (
          <EditModal
            type={modalState.editItem.type}
            isOpen={modalState.isEditOpen}
            onClose={() =>
              setModalState({
                ...modalState,
                isEditOpen: false,
                editItem: null,
              })
            }
            onSubmit={handleEdit}
            initialData={modalState.editItem.data}
            isDarkMode={isDarkMode}
          />
        )}

        {modalState.isProfileEditOpen && (
          <ProfileEditModal
            isOpen={modalState.isProfileEditOpen}
            onClose={() =>
              setModalState({ ...modalState, isProfileEditOpen: false })
            }
            onSubmit={handleProfileEdit}
            initialData={portfolio}
            isDarkMode={isDarkMode}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
