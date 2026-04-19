const ResumePreview = ({ accentColor }) => (
  <div
    className="bg-white shadow-2xl rounded-xl overflow-hidden"
    style={{ fontFamily: "'Charter', 'Times New Roman', serif" }}
  >
    <div
      className="text-center py-8 px-6 border-b"
      style={{ borderBottomColor: `${accentColor}20` }}
    >
      <h1 className="text-4xl font-bold mb-2" style={{ color: accentColor }}>
        {resumeData.user_profile.full_name || "Your Name"}
      </h1>
      <p className="text-gray-600 mb-3">
        {resumeData.user_profile.professional_title || "Professional Title"}
      </p>
      <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600">
        {resumeData.user_profile.email && (
          <>
            <a
              href={`mailto:${resumeData.user_profile.email}`}
              className="hover:underline"
            >
              {resumeData.user_profile.email}
            </a>
            <span>|</span>
          </>
        )}
        {resumeData.user_profile.phone && (
          <a
            href={`tel:${resumeData.user_profile.phone}`}
            className="hover:underline"
          >
            {resumeData.user_profile.phone}
          </a>
        )}
        {resumeData.user_profile.location && (
          <>
            <span>|</span>
            <span className="flex items-center gap-1">
              <MapPin size={12} />
              {resumeData.user_profile.location}
            </span>
          </>
        )}
        {resumeData.user_profile.linkedin_url && (
          <>
            <span>|</span>
            <a
              href={resumeData.user_profile.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              LinkedIn
            </a>
          </>
        )}
        {resumeData.user_profile.github_url && (
          <>
            <span>|</span>
            <a
              href={resumeData.user_profile.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              GitHub
            </a>
          </>
        )}
        {resumeData.user_profile.portfolio_url && (
          <>
            <span>|</span>
            <a
              href={resumeData.user_profile.portfolio_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Portfolio
            </a>
          </>
        )}
      </div>
    </div>
    <div className="p-6 space-y-6">
      {resumeData.summary && (
        <section>
          <h2
            className="text-xl font-bold mb-3 pb-1 border-b"
            style={{
              color: accentColor,
              borderBottomColor: `${accentColor}40`,
            }}
          >
            Professional Summary
          </h2>
          <div
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: resumeData.summary }}
          />
        </section>
      )}
      {Object.keys(resumeData.skills).some(
        (cat) => resumeData.skills[cat].length > 0,
      ) && (
        <section>
          <h2
            className="text-xl font-bold mb-3 pb-1 border-b"
            style={{
              color: accentColor,
              borderBottomColor: `${accentColor}40`,
            }}
          >
            Skills
          </h2>
          <div className="space-y-3">
            {Object.entries(resumeData.skills)
              .filter(([_, items]) => items.length > 0)
              .map(([category, items]) => (
                <div key={category}>
                  <h3 className="font-semibold text-gray-800 capitalize">
                    {category.replace(/_/g, " ")}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {items.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </section>
      )}
      {resumeData.experience.length > 0 && (
        <section>
          <h2
            className="text-xl font-bold mb-3 pb-1 border-b"
            style={{
              color: accentColor,
              borderBottomColor: `${accentColor}40`,
            }}
          >
            Experience
          </h2>
          <div className="space-y-5">
            {resumeData.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {exp.role}
                    </h3>
                    <p className="text-gray-600">
                      {exp.company_name} • {exp.location}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {exp.start_date} -{" "}
                    {exp.isPresentCompany ? "Present" : exp.end_date}
                  </div>
                </div>
                <ul className="mt-2 space-y-1 list-disc list-inside text-gray-600">
                  {exp.highlights?.map((highlight, idx) => (
                    <li
                      key={idx}
                      className="text-sm"
                      dangerouslySetInnerHTML={{ __html: highlight }}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}
      {resumeData.projects.length > 0 && (
        <section>
          <h2
            className="text-xl font-bold mb-3 pb-1 border-b"
            style={{
              color: accentColor,
              borderBottomColor: `${accentColor}40`,
            }}
          >
            Projects
          </h2>
          <div className="space-y-4">
            {resumeData.projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {project.project_name}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {project.duration}
                  </span>
                </div>
                <div
                  className="text-gray-600 text-sm mt-1"
                  dangerouslySetInnerHTML={{ __html: project.description }}
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tech_stack?.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: `${accentColor}10`,
                        color: accentColor,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <ul className="mt-2 space-y-1 list-disc list-inside text-gray-600">
                  {project.highlights?.map((highlight, idx) => (
                    <li key={idx} className="text-sm">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}
      {resumeData.education.length > 0 && (
        <section>
          <h2
            className="text-xl font-bold mb-3 pb-1 border-b"
            style={{
              color: accentColor,
              borderBottomColor: `${accentColor}40`,
            }}
          >
            Education
          </h2>
          <div className="space-y-3">
            {resumeData.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {edu.degree_name}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {edu.start_year} - {edu.end_year}
                  </span>
                </div>
                <p className="text-gray-600">{edu.institution_name}</p>
                {edu.grade && (
                  <p className="text-sm text-gray-500">Grade: {edu.grade}</p>
                )}
                <ul className="mt-1 space-y-1 list-disc list-inside text-gray-600">
                  {edu.highlights?.map((highlight, idx) => (
                    <li key={idx} className="text-sm">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}
      {resumeData.certifications.length > 0 && (
        <section>
          <h2
            className="text-xl font-bold mb-3 pb-1 border-b"
            style={{
              color: accentColor,
              borderBottomColor: `${accentColor}40`,
            }}
          >
            Certifications
          </h2>
          <div className="space-y-2">
            {resumeData.certifications.map((cert) => (
              <div key={cert.id}>
                <div className="flex justify-between items-start">
                  <span className="font-medium text-gray-800">{cert.name}</span>
                  <span className="text-sm text-gray-500">{cert.year}</span>
                </div>
                <p className="text-sm text-gray-600">{cert.issuer}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      {resumeData.achievements.length > 0 && (
        <section>
          <h2
            className="text-xl font-bold mb-3 pb-1 border-b"
            style={{
              color: accentColor,
              borderBottomColor: `${accentColor}40`,
            }}
          >
            Achievements
          </h2>
          <div className="space-y-3">
            {resumeData.achievements.map((ach) => (
              <div key={ach.id}>
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-800">{ach.title}</h3>
                  <span className="text-sm text-gray-500">{ach.year}</span>
                </div>
                <div
                  className="text-gray-600 text-sm"
                  dangerouslySetInnerHTML={{ __html: ach.description }}
                />
              </div>
            ))}
          </div>
        </section>
      )}
      {resumeData.languages.length > 0 && (
        <section>
          <h2
            className="text-xl font-bold mb-3 pb-1 border-b"
            style={{
              color: accentColor,
              borderBottomColor: `${accentColor}40`,
            }}
          >
            Languages
          </h2>
          <div className="flex flex-wrap gap-4">
            {resumeData.languages.map((lang) => (
              <div key={lang.id}>
                <span className="font-medium text-gray-800">{lang.name}</span>
                <span className="text-sm text-gray-500 ml-2">
                  ({lang.proficiency})
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
      {resumeData.volunteering.length > 0 && (
        <section>
          <h2
            className="text-xl font-bold mb-3 pb-1 border-b"
            style={{
              color: accentColor,
              borderBottomColor: `${accentColor}40`,
            }}
          >
            Volunteering
          </h2>
          <div className="space-y-3">
            {resumeData.volunteering.map((vol) => (
              <div key={vol.id}>
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-800">
                    {vol.role} at {vol.organization}
                  </h3>
                  <span className="text-sm text-gray-500">{vol.duration}</span>
                </div>
                <div
                  className="text-gray-600 text-sm"
                  dangerouslySetInnerHTML={{ __html: vol.description }}
                />
              </div>
            ))}
          </div>
        </section>
      )}
      {resumeData.hobbies.length > 0 && (
        <section>
          <h2
            className="text-xl font-bold mb-3 pb-1 border-b"
            style={{
              color: accentColor,
              borderBottomColor: `${accentColor}40`,
            }}
          >
            Hobbies & Interests
          </h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.hobbies.map((hobby, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
              >
                {hobby}
              </span>
            ))}
          </div>
        </section>
      )}
      {resumeData.custom_sections.map((section) => (
        <section key={section.id}>
          <h2
            className="text-xl font-bold mb-3 pb-1 border-b"
            style={{
              color: accentColor,
              borderBottomColor: `${accentColor}40`,
            }}
          >
            {section.title}
          </h2>
          <div className="space-y-1">
            {section.items.map((item, idx) => (
              <p key={idx} className="text-gray-700">
                {item}
              </p>
            ))}
          </div>
        </section>
      ))}
    </div>
  </div>
);

export default ResumePreview;
