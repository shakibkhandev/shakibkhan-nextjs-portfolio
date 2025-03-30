"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewsletter = exports.getNewsletters = exports.deleteEducation = exports.updateEducation = exports.addEducation = exports.getEducations = exports.deleteProject = exports.updateProject = exports.addProject = exports.getProjects = exports.deleteSkill = exports.updateSkill = exports.addSkills = exports.getSkills = exports.addWorkExperience = exports.deleteWorkExperience = exports.updateWorkExperience = exports.getWorkExperiences = exports.deletePortfolioInformation = exports.updatePortfolioInformation = exports.getPortfolioInformation = exports.changeCurrentPassword = exports.deleteProfileInformation = exports.updateProfileInformation = exports.getProfileInformation = void 0;
const prisma_1 = require("../services/prisma");
const asyncHandler_1 = require("../utils/asyncHandler");
const ApiResponse_1 = require("../utils/ApiResponse");
const ApiError_1 = require("../utils/ApiError");
exports.getProfileInformation = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const user = yield prisma_1.prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            provider: true,
            isAdmin: true,
            updatedAt: true,
            createdAt: true
        }
    });
    return res.status(200).json(new ApiResponse_1.ApiResponse(200, user, "Profile information fetched successfully"));
}));
exports.updateProfileInformation = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const user = yield prisma_1.prisma.user.update({
        where: {
            id: userId
        },
        data: {
            name: req.body.name,
            email: req.body.email,
            avatar: req.body.avatar
        }
    });
    return res.status(200).json(new ApiResponse_1.ApiResponse(200, user, "Profile information updated successfully"));
}));
exports.deleteProfileInformation = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const user = yield prisma_1.prisma.user.delete({
        where: {
            id: userId
        }
    });
    return res.status(200).json(new ApiResponse_1.ApiResponse(200, user, "Profile information deleted successfully"));
}));
exports.changeCurrentPassword = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    const user = yield prisma_1.prisma.user.findUnique({
        where: {
            id: req.user.id,
        },
    });
    if (!user) {
        throw new ApiError_1.ApiError(404, "User not found");
    }
    if (oldPassword !== (user === null || user === void 0 ? void 0 : user.password)) {
        throw new ApiError_1.ApiError(400, "Invalid old password");
    }
    if (newPassword !== confirmNewPassword) {
        throw new ApiError_1.ApiError(400, "Passwords do not match");
    }
    // assign new password in plain text
    // We have a pre save method attached to user schema which automatically hashes the password whenever added/modified
    yield prisma_1.prisma.user.update({
        where: {
            id: req.user.id,
        },
        data: {
            password: newPassword,
        },
    });
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(200, {}, "Password changed successfully"));
}));
exports.getPortfolioInformation = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const portfolio = yield prisma_1.prisma.portfolio.findMany();
    if (!portfolio.length || !portfolio[0] || !portfolio) {
        throw new ApiError_1.ApiError(404, "Portfolio not found");
    }
    return res.status(200).json(new ApiResponse_1.ApiResponse(200, portfolio[0], "Portfolio information fetched successfully"));
}));
exports.updatePortfolioInformation = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const portfolioId = req.params.id;
    const portfolio = yield prisma_1.prisma.portfolio.update({
        where: {
            id: portfolioId
        },
        data: {
            name: req.body.name,
            about: req.body.about,
            image_url: req.body.image_url,
            x_url: req.body.x_url,
            github_url: req.body.github_url,
            linkedin_url: req.body.linkedin_url,
            facebook_url: req.body.facebook_url,
        }
    });
    return res.status(200).json(new ApiResponse_1.ApiResponse(200, portfolio, "Portfolio information updated successfully"));
}));
exports.deletePortfolioInformation = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const portfolioId = req.params.id;
    const portfolio = yield prisma_1.prisma.portfolio.delete({
        where: {
            id: portfolioId
        }
    });
    return res.status(200).json(new ApiResponse_1.ApiResponse(200, portfolio, "Portfolio information deleted successfully"));
}));
exports.getWorkExperiences = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const portfolio = yield prisma_1.prisma.portfolio.findMany();
    if (!portfolio.length || !portfolio[0] || !portfolio) {
        throw new ApiError_1.ApiError(404, "Portfolio not found");
    }
    const workExperiences = yield prisma_1.prisma.workExperience.findMany({
        where: {
            portfolioId: portfolio[0].id
        }
    });
    return res.status(200).json(new ApiResponse_1.ApiResponse(200, workExperiences, "Work experiences fetched successfully"));
}));
exports.updateWorkExperience = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const workExperienceId = req.params.id;
    const workExperience = yield prisma_1.prisma.workExperience.update({
        where: {
            id: workExperienceId
        },
        data: {
            companyName: req.body.companyName,
            position: req.body.position,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        }
    });
    return res.status(200).json(new ApiResponse_1.ApiResponse(200, workExperience, "Work experience updated successfully"));
}));
exports.deleteWorkExperience = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const workExperienceId = req.params.id;
    const workExperience = yield prisma_1.prisma.workExperience.delete({
        where: {
            id: workExperienceId
        }
    });
    return res.status(200).json(new ApiResponse_1.ApiResponse(200, workExperience, "Work experience deleted successfully"));
}));
exports.addWorkExperience = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const portfolio = yield prisma_1.prisma.portfolio.findMany();
    if (!portfolio.length || !portfolio[0] || !portfolio) {
        throw new ApiError_1.ApiError(404, "Portfolio not found");
    }
    const workExperience = yield prisma_1.prisma.workExperience.create({
        data: {
            companyName: req.body.companyName,
            position: req.body.position,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            portfolioId: portfolio[0].id
        }
    });
    return res.status(200).json(new ApiResponse_1.ApiResponse(200, workExperience, "Work experience added successfully"));
}));
exports.getSkills = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const portfolio = yield prisma_1.prisma.portfolio.findMany();
    if (!portfolio.length || !portfolio[0] || !portfolio) {
        throw new ApiError_1.ApiError(404, "Portfolio not found");
    }
    const skills = yield prisma_1.prisma.skill.findMany({
        where: {
            portfolioId: portfolio[0].id
        }
    });
    return res.status(200).json(new ApiResponse_1.ApiResponse(200, skills, "Skills fetched successfully"));
}));
exports.addSkills = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const portfolio = yield prisma_1.prisma.portfolio.findMany();
    if (!portfolio.length || !portfolio[0] || !portfolio) {
        throw new ApiError_1.ApiError(404, "Portfolio not found");
    }
    const skill = yield prisma_1.prisma.skill.create({
        data: {
            label: req.body.label,
            url: req.body.url,
            portfolioId: portfolio[0].id
        }
    });
    return res.status(200).json(new ApiResponse_1.ApiResponse(200, skill, "Skill added successfully"));
}));
exports.updateSkill = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const skillId = req.params.id;
    const skill = yield prisma_1.prisma.skill.update({
        where: {
            id: skillId
        },
        data: {
            label: req.body.label,
            url: req.body.url
        }
    });
    return res.status(200).json(new ApiResponse_1.ApiResponse(200, skill, "Skill updated successfully"));
}));
exports.deleteSkill = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const skillId = req.params.id;
    const skill = yield prisma_1.prisma.skill.delete({
        where: {
            id: skillId
        }
    });
    return res.status(200).json(new ApiResponse_1.ApiResponse(200, skill, "Skill deleted successfully"));
}));
exports.getProjects = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const portfolio = yield prisma_1.prisma.portfolio.findMany();
    if (!portfolio.length || !portfolio[0] || !portfolio) {
        throw new ApiError_1.ApiError(404, "Portfolio not found");
    }
    const projects = yield prisma_1.prisma.project.findMany({
        where: {
            portfolioId: portfolio[0].id
        }
    });
    return res.status(200).json(new ApiResponse_1.ApiResponse(200, projects, "Projects fetched successfully"));
}));
exports.addProject = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const portfolio = yield prisma_1.prisma.portfolio.findMany();
    if (!portfolio.length || !portfolio[0] || !portfolio) {
        throw new ApiError_1.ApiError(404, "Portfolio not found");
    }
    const project = yield prisma_1.prisma.project.create({
        data: {
            name: req.body.name,
            description: req.body.description,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            image_url: req.body.image_url,
            web_url: req.body.web_url,
            portfolioId: portfolio[0].id
        }
    });
    return res.status(200).json(new ApiResponse_1.ApiResponse(200, project, "Project added successfully"));
}));
exports.updateProject = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projectId = req.params.id;
    const project = yield prisma_1.prisma.project.update({
        where: {
            id: projectId
        },
        data: {
            name: req.body.name,
            description: req.body.description,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            image_url: req.body.image_url,
            web_url: req.body.web_url
        }
    });
    return res.status(200).json(new ApiResponse_1.ApiResponse(200, project, "Project updated successfully"));
}));
exports.deleteProject = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projectId = req.params.id;
    const project = yield prisma_1.prisma.project.delete({
        where: {
            id: projectId
        }
    });
    return res.status(200).json(new ApiResponse_1.ApiResponse(200, project, "Project deleted successfully"));
}));
exports.getEducations = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const portfolio = yield prisma_1.prisma.portfolio.findMany();
    if (!portfolio.length || !portfolio[0] || !portfolio) {
        throw new ApiError_1.ApiError(404, "Portfolio not found");
    }
    const educations = yield prisma_1.prisma.education.findMany({
        where: {
            portfolioId: portfolio[0].id
        }
    });
    return res.status(200).json(new ApiResponse_1.ApiResponse(200, educations, "Educations fetched successfully"));
}));
exports.addEducation = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const portfolio = yield prisma_1.prisma.portfolio.findMany();
    if (!portfolio.length || !portfolio[0] || !portfolio) {
        throw new ApiError_1.ApiError(404, "Portfolio not found");
    }
    const education = yield prisma_1.prisma.education.create({
        data: {
            schoolName: req.body.schoolName,
            degree: req.body.degree,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            status: req.body.status,
            portfolioId: portfolio[0].id
        }
    });
    return res.status(200).json(new ApiResponse_1.ApiResponse(200, education, "Education added successfully"));
}));
exports.updateEducation = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const educationId = req.params.id;
    const education = yield prisma_1.prisma.education.update({
        where: {
            id: educationId
        },
        data: {
            schoolName: req.body.schoolName,
            degree: req.body.degree,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            status: req.body.status
        }
    });
    return res.status(200).json(new ApiResponse_1.ApiResponse(200, education, "Education updated successfully"));
}));
exports.deleteEducation = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const educationId = req.params.id;
    const education = yield prisma_1.prisma.education.delete({
        where: {
            id: educationId
        }
    });
    return res.status(200).json(new ApiResponse_1.ApiResponse(200, education, "Education deleted successfully"));
}));
exports.getNewsletters = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newsletters = yield prisma_1.prisma.newsletter.findMany();
    return res.status(200).json(new ApiResponse_1.ApiResponse(200, newsletters, "Newsletters fetched successfully"));
}));
exports.addNewsletter = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const existNewsletter = yield prisma_1.prisma.newsletter.findUnique({ where: {
            email: req.body.email
        } });
    if (existNewsletter) {
        return res.status(200).json(new ApiResponse_1.ApiResponse(200, existNewsletter, "Email added successfully"));
    }
    const newsletter = yield prisma_1.prisma.newsletter.create({
        data: {
            email: req.body.email
        }
    });
    return res.status(200).json(new ApiResponse_1.ApiResponse(200, newsletter, "Email added successfully"));
}));
