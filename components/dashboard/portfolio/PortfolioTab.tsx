"use client";

import { useState, useEffect } from "react";
import { useGlobalContext } from "@/context/GlobalContextProvider";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, PenSquare, Trash2, Calendar, Link, Briefcase, GraduationCap, Code } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";

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
    setError(null);
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
      setError("Failed to fetch portfolio data");
      console.error("Error fetching portfolio:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!modalState.deleteItem) return;

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${modalState.deleteItem.type}/${modalState.deleteItem.id}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        }
      );
      if (portfolio) {
        setPortfolio({
          ...portfolio,
          [modalState.deleteItem.type]: portfolio[
            modalState.deleteItem.type as keyof Portfolio
          ].filter((item: any) => item.id !== modalState.deleteItem!.id),
        });
      }
    } catch (error) {
      setError(`Failed to delete ${modalState.deleteItem.type} item`);
      console.error("Error deleting item:", error);
    } finally {
      setModalState({ ...modalState, isDeleteOpen: false, deleteItem: null });
    }
  };

  const handleAdd = async (data: any) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${modalState.addType}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        }
      );
      if (portfolio) {
        setPortfolio({
          ...portfolio,
          [modalState.addType]: [
            ...portfolio[modalState.addType as keyof Portfolio],
            response.data.data,
          ],
        });
      }
    } catch (error) {
      setError(`Failed to add ${modalState.addType} item`);
      console.error("Error adding item:", error);
    } finally {
      setModalState({ ...modalState, isAddOpen: false, addType: "" });
    }
  };

  const handleEdit = async (data: any) => {
    if (!modalState.editItem) return;

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${modalState.editItem.type}/${modalState.editItem.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        }
      );
      if (portfolio) {
        setPortfolio({
          ...portfolio,
          [modalState.editItem.type]: portfolio[
            modalState.editItem.type as keyof Portfolio
          ].map((item: any) =>
            item.id === modalState.editItem!.id ? response.data.data : item
          ),
        });
      }
    } catch (error) {
      setError(`Failed to update ${modalState.editItem.type} item`);
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
      setPortfolio(response.data.data);
    } catch (error) {
      setError("Failed to update profile information");
      console.error("Error updating profile:", error);
    } finally {
      setModalState({ ...modalState, isProfileEditOpen: false });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className={`flex flex-col items-center ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
          <div className="w-12 h-12 border-4 border-t-blue-500 border-b-blue-500 rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-medium">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`rounded-xl p-12 text-center ${isDarkMode ? "bg-red-900/30 text-red-200" : "bg-red-100 text-red-600"}`}>
        <div className="text-xl font-semibold mb-2">Error</div>
        <p>{error}</p>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className={`rounded-xl p-12 text-center ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"}`}>
        <div className="text-xl font-semibold mb-2">No Portfolio Found</div>
        <p>Your portfolio data is empty. Start by adding your information.</p>
        <button 
          className={`mt-4 px-6 py-2 rounded-lg font-medium ${isDarkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"} text-white transition-colors`}
          onClick={() => router.push("/admin/dashboard/portfolio/edit")}
        >
          Create Portfolio
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      <SectionCard
        title="Profile Information"
        icon={<Image src="/profile-icon.svg" alt="Profile" width={24} height={24} className="opacity-80" />}
        isDarkMode={isDarkMode}
        content={<ProfileContent portfolio={portfolio} isDarkMode={isDarkMode} />}
        onEdit={() => setModalState({ ...modalState, isProfileEditOpen: true })}
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
              setModalState({ ...modalState, isDeleteOpen: true, deleteItem: { id, type: "projects" } })
            }
            onEdit={(id: string) => {
              const item = portfolio.projects.find(p => p.id === id);
              setModalState({
                ...modalState,
                isEditOpen: true,
                editItem: { id, type: "projects", data: item }
              });
            }}
            isDarkMode={isDarkMode}
          />
        }
        onAdd={() => setModalState({ ...modalState, isAddOpen: true, addType: "projects" })}
      />

      <SectionCard
        title="Education"
        icon={<GraduationCap className="w-5 h-5 opacity-80" />}
        isDarkMode={isDarkMode}
        content={
          <ItemList
            items={portfolio.education}
            type="education"
            renderItem={(edu: Education) => <EducationItem education={edu} isDarkMode={isDarkMode} />}
            onDelete={(id: string) =>
              setModalState({ ...modalState, isDeleteOpen: true, deleteItem: { id, type: "education" } })
            }
            onEdit={(id: string) => {
              const item = portfolio.education.find(e => e.id === id);
              setModalState({
                ...modalState,
                isEditOpen: true,
                editItem: { id, type: "education", data: item }
              });
            }}
            isDarkMode={isDarkMode}
          />
        }
        onAdd={() => setModalState({ ...modalState, isAddOpen: true, addType: "education" })}
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
              const item = portfolio.workExperience.find(w => w.id === id);
              setModalState({
                ...modalState,
                isEditOpen: true,
                editItem: { id, type: "workExperience", data: item }
              });
            }}
            isDarkMode={isDarkMode}
          />
        }
        onAdd={() => setModalState({ ...modalState, isAddOpen: true, addType: "workExperience" })}
      />

      <SectionCard
        title="Skills"
        icon={<Code className="w-5 h-5 opacity-80" />}
        isDarkMode={isDarkMode}
        content={
          <ItemList
            items={portfolio.skills}
            type="skills"
            renderItem={(skill: Skill) => <SkillItem skill={skill} isDarkMode={isDarkMode} />}
            onDelete={(id: string) =>
              setModalState({ ...modalState, isDeleteOpen: true, deleteItem: { id, type: "skills" } })
            }
            onEdit={(id: string) => {
              const item = portfolio.skills.find(s => s.id === id);
              setModalState({
                ...modalState,
                isEditOpen: true,
                editItem: { id, type: "skills", data: item }
              });
            }}
            isDarkMode={isDarkMode}
          />
        }
        onAdd={() => setModalState({ ...modalState, isAddOpen: true, addType: "skills" })}
      />

      <AnimatePresence>
        {modalState.isDeleteOpen && (
          <DeleteModal
            isOpen={modalState.isDeleteOpen}
            onClose={() => setModalState({ ...modalState, isDeleteOpen: false })}
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
            onClose={() => setModalState({ ...modalState, isEditOpen: false, editItem: null })}
            onSubmit={handleEdit}
            initialData={modalState.editItem.data}
            isDarkMode={isDarkMode}
          />
        )}

        {modalState.isProfileEditOpen && (
          <ProfileEditModal
            isOpen={modalState.isProfileEditOpen}
            onClose={() => setModalState({ ...modalState, isProfileEditOpen: false })}
            onSubmit={handleProfileEdit}
            initialData={portfolio}
            isDarkMode={isDarkMode}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Component Definitions
const SectionCard = ({ title, icon, isDarkMode, content, onEdit, onAdd }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className={`rounded-xl p-6 ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-md`}
  >
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          {title}
        </h2>
      </div>
      <div className="flex gap-2">
        {onEdit && (
          <button
            className={`p-2 rounded ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
            onClick={onEdit}
          >
            <PenSquare className="w-5 h-5" />
          </button>
        )}
        {onAdd && (
          <button
            className={`p-2 rounded ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
            onClick={onAdd}
          >
            <Plus className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
    {content}
  </motion.div>
);

const ItemList = ({ items, type, renderItem, onDelete, onEdit, isDarkMode }: any) => (
  <div className="space-y-4">
    {items.length > 0 ? (
      items.map((item: any) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`flex justify-between items-start p-4 rounded-lg ${
            isDarkMode ? "bg-gray-700" : "bg-gray-50"
          }`}
        >
          {renderItem(item)}
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(item.id)}
              className={`p-2 ${isDarkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"} rounded`}
            >
              <PenSquare className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className={`p-2 ${isDarkMode ? "hover:bg-red-900/50 text-red-400" : "hover:bg-red-100 text-red-600"} rounded`}
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      ))
    ) : (
      <div className={`text-center py-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
        No {type} found
      </div>
    )}
  </div>
);

const ProfileContent = ({ portfolio, isDarkMode }: any) => (
  <div className="space-y-4">
    <div className="flex items-center gap-4">
      <Image
        src={portfolio.image_url || "/default-avatar.png"}
        alt={portfolio.name}
        width={100}
        height={100}
        className="rounded-full"
      />
      <div>
        <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          {portfolio.name}
        </h3>
        <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{portfolio.email}</p>
      </div>
    </div>
    <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{portfolio.about}</p>
    <div className="space-y-2">
      <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
        X: <a href={portfolio.x_url} target="_blank" rel="noopener noreferrer">{portfolio.x_url}</a>
      </p>
      <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
        GitHub: <a href={portfolio.github_url} target="_blank" rel="noopener noreferrer">{portfolio.github_url}</a>
      </p>
      <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
        LinkedIn: <a href={portfolio.linkedin_url} target="_blank" rel="noopener noreferrer">{portfolio.linkedin_url}</a>
      </p>
      <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
        Facebook: <a href={portfolio.facebook_url} target="_blank" rel="noopener noreferrer">{portfolio.facebook_url}</a>
      </p>
    </div>
  </div>
);

const ProjectItem = ({ project, isDarkMode }: any) => (
  <div className="space-y-2 flex-1">
    <h4 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
      {project.name}
    </h4>
    <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{project.description}</p>
    <div className="flex items-center gap-2">
      <Calendar className="w-4 h-4" />
      <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
        {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
      </p>
    </div>
    {project.web_url && (
      <a
        href={project.web_url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${isDarkMode ? "text-blue-400" : "text-blue-600"}`}
      >
        <Link className="w-4 h-4 inline-block mr-1" />
        {project.web_url}
      </a>
    )}
    <Image
      src={project.image_url || "/default-project.png"}
      alt={project.name}
      width={200}
      height={150}
      className="rounded"
    />
  </div>
);

const EducationItem = ({ education, isDarkMode }: any) => (
  <div className="space-y-2 flex-1">
    <h4 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
      {education.institution}
    </h4>
    <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{education.degree}</p>
    <div className="flex items-center gap-2">
      <Calendar className="w-4 h-4" />
      <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
        {new Date(education.startDate).toLocaleDateString()} - {new Date(education.endDate).toLocaleDateString()}
      </p>
    </div>
    <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Status: {education.status}</p>
  </div>
);

const WorkExperienceItem = ({ work, isDarkMode }: any) => (
  <div className="space-y-2 flex-1">
    <h4 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
      {work.companyName}
    </h4>
    <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{work.position}</p>
    <div className="flex items-center gap-2">
      <Calendar className="w-4 h-4" />
      <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
        {new Date(work.startDate).toLocaleDateString()} - {new Date(work.endDate).toLocaleDateString()}
      </p>
    </div>
  </div>
);

const SkillItem = ({ skill, isDarkMode }: any) => (
  <div className="space-y-2 flex-1">
    <h4 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
      {skill.label}
    </h4>
    {skill.url && (
      <a
        href={skill.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${isDarkMode ? "text-blue-400" : "text-blue-600"}`}
      >
        <Link className="w-4 h-4 inline-block mr-1" />
        {skill.url}
      </a>
    )}
  </div>
);

const DeleteModal = ({ isOpen, onClose, onConfirm, isDarkMode }: any) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className={`p-6 rounded-lg w-[400px] ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
      >
        <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
        <p className={`mb-6 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
          Are you sure you want to delete this item? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded ${isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const AddModal = ({ type, isOpen, onClose, onSubmit, isDarkMode }: any) => {
  const [formData, setFormData] = useState({});

  const fields: { [key: string]: { name: string; label: string; type: string }[] } = {
    projects: [
      { name: "name", label: "Project Name", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "startDate", label: "Start Date", type: "date" },
      { name: "endDate", label: "End Date", type: "date" },
      { name: "image_url", label: "Image URL", type: "text" },
      { name: "web_url", label: "Web URL", type: "text" },
    ],
    education: [
      { name: "institution", label: "Institution", type: "text" },
      { name: "degree", label: "Degree", type: "text" },
      { name: "startDate", label: "Start Date", type: "date" },
      { name: "endDate", label: "End Date", type: "date" },
      { name: "status", label: "Status", type: "text" },
    ],
    workExperience: [
      { name: "companyName", label: "Company Name", type: "text" },
      { name: "position", label: "Position", type: "text" },
      { name: "startDate", label: "Start Date", type: "date" },
      { name: "endDate", label: "End Date", type: "date" },
    ],
    skills: [
      { name: "label", label: "Skill Name", type: "text" },
      { name: "url", label: "URL", type: "text" },
    ],
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className={`p-6 rounded-lg w-[400px] max-h-[80vh] overflow-y-auto ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <h3 className="text-xl font-bold mb-4">Add {type}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields[type].map((field) => (
            <div key={field.name}>
              <label className={`block mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                  className={`w-full p-2 border rounded ${
                    isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
                  }`}
                  required={field.name !== "web_url" && field.name !== "url"}
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                  className={`w-full p-2 border rounded ${
                    isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
                  }`}
                  required={field.name !== "web_url" && field.name !== "url"}
                />
              )}
            </div>
          ))}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded ${
                isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              Add
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

const EditModal = ({ type, isOpen, onClose, onSubmit, initialData, isDarkMode }: any) => {
  const [formData, setFormData] = useState(initialData || {});

  const fields: { [key: string]: { name: string; label: string; type: string }[] } = {
    projects: [
      { name: "name", label: "Project Name", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "startDate", label: "Start Date", type: "date" },
      { name: "endDate", label: "End Date", type: "date" },
      { name: "image_url", label: "Image URL", type: "text" },
      { name: "web_url", label: "Web URL", type: "text" },
    ],
    education: [
      { name: "institution", label: "Institution", type: "text" },
      { name: "degree", label: "Degree", type: "text" },
      { name: "startDate", label: "Start Date", type: "date" },
      { name: "endDate", label: "End Date", type: "date" },
      { name: "status", label: "Status", type: "text" },
    ],
    workExperience: [
      { name: "companyName", label: "Company Name", type: "text" },
      { name: "position", label: "Position", type: "text" },
      { name: "startDate", label: "Start Date", type: "date" },
      { name: "endDate", label: "End Date", type: "date" },
    ],
    skills: [
      { name: "label", label: "Skill Name", type: "text" },
      { name: "url", label: "URL", type: "text" },
    ],
  };

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className={`p-6 rounded-lg w-[400px] max-h-[80vh] overflow-y-auto ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <h3 className="text-xl font-bold mb-4">Edit {type}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields[type].map((field) => (
            <div key={field.name}>
              <label className={`block mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                  className={`w-full p-2 border rounded ${
                    isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
                  }`}
                  required={field.name !== "web_url" && field.name !== "url"}
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                  className={`w-full p-2 border rounded ${
                    isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
                  }`}
                  required={field.name !== "web_url" && field.name !== "url"}
                />
              )}
            </div>
          ))}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded ${
                isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

const ProfileEditModal = ({ isOpen, onClose, onSubmit, initialData, isDarkMode }: any) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    x_url: initialData?.x_url || "",
    github_url: initialData?.github_url || "",
    linkedin_url: initialData?.linkedin_url || "",
    facebook_url: initialData?.facebook_url || "",
  });

  useEffect(() => {
    setFormData({
      name: initialData?.name || "",
      x_url: initialData?.x_url || "",
      github_url: initialData?.github_url || "",
      linkedin_url: initialData?.linkedin_url || "",
      facebook_url: initialData?.facebook_url || "",
    });
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className={`p-6 rounded-lg w-[400px] max-h-[80vh] overflow-y-auto ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <h3 className="text-xl font-bold mb-4">Edit Profile Information</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full p-2 border rounded ${
                isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
              }`}
              required
            />
          </div>
          <div>
            <label className={`block mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              X URL
            </label>
            <input
              type="text"
              name="x_url"
              value={formData.x_url}
              onChange={(e) => setFormData({ ...formData, x_url: e.target.value })}
              className={`w-full p-2 border rounded ${
                isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>
          <div>
            <label className={`block mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              GitHub URL
            </label>
            <input
              type="text"
              name="github_url"
              value={formData.github_url}
              onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
              className={`w-full p-2 border rounded ${
                isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>
          <div>
            <label className={`block mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              LinkedIn URL
            </label>
            <input
              type="text"
              name="linkedin_url"
              value={formData.linkedin_url}
              onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
              className={`w-full p-2 border rounded ${
                isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>
          <div>
            <label className={`block mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Facebook URL
            </label>
            <input
              type="text"
              name="facebook_url"
              value={formData.facebook_url}
              onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
              className={`w-full p-2 border rounded ${
                isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded ${
                isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};