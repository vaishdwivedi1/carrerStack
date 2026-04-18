import Resume from "../modals/Resume.js";

export const buildResume = async (req, res) => {
  try {
    const {
      user_profile,
      summary,
      skills,
      experience,
      projects,
      education,
      certifications,
      achievements,
      hobbies,
      custom_sections,
      userId,
    } = req.body;

    // Validate required fields
    if (
      !user_profile?.full_name ||
      !user_profile?.email ||
      !user_profile?.professional_title ||
      !user_profile?.phone
    ) {
      return res.status(400).json({
        message:
          "Missing required fields: full_name, email, phone and professional_title are required",
      });
    }
    if (experience.length > 0) {
      for (let i = 0; i < experience.length; i++) {
        if (
          !experience[i].company_name ||
          !experience[i].role ||
          !experience[i].start_date
        ) {
          return res.status(400).json({
            message:
              "Missing required fields: company_name, role and start_date are required",
          });
        }
      }
    }
    if (projects.length > 0) {
      for (let i = 0; i < projects.length; i++) {
        if (!projects[i].project_name || !projects[i].description) {
          return res.status(400).json({
            message:
              "Missing required fields: project_name and description are required",
          });
        }
      }
    }
    if (education.length > 0) {
      for (let i = 0; i < education.length; i++) {
        if (
          !education[i].institution_name ||
          !education[i].degree_name ||
          !education[i].start_year ||
          !education[i].end_year ||
          !education[i].grade
        ) {
          return res.status(400).json({
            message:
              "Missing required fields: institution_name, degree_name, start_year, end_year and grade are required",
          });
        }
      }
    }
    if (certifications.length > 0) {
      for (let i = 0; i < certifications.length; i++) {
        if (
          !certifications[i].name ||
          !certifications[i].issuer ||
          !certifications[i].start_date ||
          !certifications[i].end_date
        ) {
          return res.status(400).json({
            message:
              "Missing required fields: name, issuer, start_date and end_date are required",
          });
        }
      }
    }
    if (achievements.length > 0) {
      for (let i = 0; i < achievements.length; i++) {
        if (!achievements[i].title) {
          return res.status(400).json({
            message: "Missing required fields: title is required",
          });
        }
      }
    }

    // ============ CREATE RESUME ============
    const newResume = new Resume({
      user: userId,
      user_profile: {
        full_name: user_profile.full_name.trim(),
        email: user_profile.email.toLowerCase().trim(),
        phone: user_profile.phone?.trim() || "",
        location: user_profile.location?.trim() || "",
        professional_title: user_profile.professional_title.trim(),
        linkedin_url: user_profile.linkedin_url?.trim() || "",
        github_url: user_profile.github_url?.trim() || "",
        portfolio_url: user_profile.portfolio_url?.trim() || "",
        behance_url: user_profile.behance_url?.trim() || "",
        color: user_profile.color,
      },
      summary: summary?.trim() || "",
      skills: {
        languages: skills?.languages || [],
        frameworks: skills?.frameworks || [],
        tools: skills?.tools || [],
        softwares: skills?.softwares || [],
        databases: skills?.databases || [],
        cloud: skills?.cloud || [],
        others: skills?.others || [],
      },
      experience:
        experience?.map((exp) => ({
          company_name: exp.company_name?.trim(),
          role: exp.role?.trim(),
          location: exp.location?.trim() || "",
          start_date: exp.start_date?.trim(),
          end_date: exp.isPresentCompany ? "" : exp.end_date?.trim() || "",
          isPresentCompany: exp.isPresentCompany || false,
          highlights: exp.highlights?.filter((h) => h?.trim()) || [],
        })) || [],
      projects:
        projects?.map((proj) => ({
          project_name: proj.project_name?.trim(),
          duration: proj.duration?.trim() || "",
          description: proj.description?.trim(),
          tech_stack: proj.tech_stack?.filter((t) => t?.trim()) || [],
          highlights: proj.highlights?.filter((h) => h?.trim()) || [],
          links: {
            project: proj.links?.project?.trim() || "",
            github: proj.links?.github?.trim() || "",
          },
        })) || [],
      education:
        education?.map((edu) => ({
          institution_name: edu.institution_name?.trim(),
          degree_name: edu.degree_name?.trim(),
          start_year: edu.start_year?.trim(),
          end_year: edu.end_year?.trim(),
          grade: edu.grade?.trim(),
        })) || [],
      certifications:
        certifications?.map((cert) => ({
          name: cert.name?.trim(),
          issuer: cert.issuer?.trim(),
          year: cert.year?.trim(),
          link: cert.link?.trim() || "",
        })) || [],
      achievements:
        achievements?.map((ach) => ({
          title: ach.title?.trim(),
          description: ach.description?.trim() || "",
          year: ach.year?.trim() || "",
        })) || [],

      hobbies: hobbies?.filter((h) => h?.trim()) || [],
      custom_sections:
        custom_sections?.map((section) => ({
          title: section.title?.trim(),
          items: section.items?.filter((i) => i?.trim()) || [],
        })) || [],
    });

    // Save to database
    const savedResume = await newResume.save();

    // Return success response
    res.status(201).json({
      success: true,
      message: "Resume created successfully",
      data: savedResume,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: "Internal server error" });
  }
};
