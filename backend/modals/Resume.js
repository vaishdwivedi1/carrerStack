import mongoose from "mongoose";

const { Schema } = mongoose;

const resumeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    user_profile: {
      full_name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        default: "",
      },
      professional_title: {
        type: String,
        required: true,
      },
      linkedin_url: {
        type: String,
        default: "",
      },
      github_url: {
        type: String,
        default: "",
      },
      portfolio_url: {
        type: String,
        default: "",
      },
      behance_url: {
        type: String,
        default: "",
      },
      color: {
        type: String,
        default: "#000",
      },
    },

    summary: {
      type: String,
      default: "",
    },

    skills: {
      languages: {
        type: [String],
        default: [],
      },
      frameworks: {
        type: [String],
        default: [],
      },
      tools: {
        type: [String],
        default: [],
      },
      softwares: {
        type: [String],
        default: [],
      },
      databases: {
        type: [String],
        default: [],
      },
      cloud: {
        type: [String],
        default: [],
      },
      others: {
        type: [String],
        default: [],
      },
    },

    experience: [
      {
        company_name: {
          type: String,
          default: "",
          required: true,
        },
        role: {
          type: String,
          default: "",
          required: true,
        },
        location: {
          type: String,
          default: "",
        },
        start_date: {
          type: String,
          default: "",
          required: true,
        },
        end_date: {
          type: String,
          default: "",
        },
        isPresentCompany: {
          type: Boolean,
          default: false,
        },
        highlights: {
          type: [String],
          default: [],
        },
      },
    ],

    projects: [
      {
        project_name: {
          type: String,
          default: "",
          required: true,
        },
        duration: {
          type: String,
          default: "",
        },
        description: {
          type: String,
          default: "",
          required: true,
        },
        tech_stack: {
          type: [String],
          default: [],
        },
        highlights: {
          type: [String],
          default: [],
        },
        links: {
          project: {
            type: String,
            default: "",
          },
          github: {
            type: String,
            default: "",
          },
        },
      },
    ],

    education: [
      {
        institution_name: {
          type: String,
          default: "",
          required: true,
        },
        degree_name: {
          type: String,
          default: "",
          required: true,
        },
        start_year: {
          type: String,
          default: "",
          required: true,
        },
        end_year: {
          type: String,
          default: "",
          required: true,
        },
        grade: {
          type: String,
          default: "",
          required: true,
        },
      },
    ],

    certifications: [
      {
        name: {
          type: String,
          default: "",
          required: true,
        },
        issuer: {
          type: String,
          default: "",
          required: true,
        },
        start_date: {
          type: String,
          default: "",
          required: true,
        },
        end_date: {
          type: String,
          default: "",
          required: true,
        },
        link: {
          type: String,
          default: "",
        },
      },
    ],

    achievements: [
      {
        title: {
          type: String,
          default: "",
          required: true,
        },
        description: {
          type: String,
          default: "",
        },
        year: {
          type: String,
          default: "",
        },
      },
    ],

    hobbies: {
      type: [String],
      default: [],
    },

    custom_sections: [
      {
        title: {
          type: String,
          default: "",
        },
        items: {
          type: [String],
          default: [],
        },
      },
    ],

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;
