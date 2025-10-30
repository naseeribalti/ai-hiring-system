import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { generateResumePDF } from '../../services/resumeService';
import { ButtonLoader } from '../../components/common/Loading/LoadingSpinner';
import './ResumeBuilder.css';

const ResumeBuilderPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [resumeData, setResumeData] = useState({
    personal: {
      firstName: user?.profile?.first_name || '',
      lastName: user?.profile?.last_name || '',
      email: user?.email || '',
      phone: user?.profile?.phone || '',
      location: user?.profile?.location?.city || '',
      linkedin: '',
      portfolio: '',
      summary: ''
    },
    experience: [
      {
        id: 1,
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }
    ],
    education: [
      {
        id: 1,
        degree: '',
        institution: '',
        location: '',
        graduationDate: '',
        gpa: '',
        achievements: ''
      }
    ],
    skills: user?.skills || [],
    projects: [
      {
        id: 1,
        name: '',
        description: '',
        technologies: '',
        link: ''
      }
    ]
  });

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Date.now(),
          title: '',
          company: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          description: ''
        }
      ]
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Date.now(),
          degree: '',
          institution: '',
          location: '',
          graduationDate: '',
          gpa: '',
          achievements: ''
        }
      ]
    }));
  };

  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: Date.now(),
          name: '',
          description: '',
          technologies: '',
          link: ''
        }
      ]
    }));
  };

  const removeSection = (section, id) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }));
  };

  const updateSection = (section, id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const updatePersonalInfo = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value }
    }));
  };

  const addSkill = (skill) => {
    if (skill && !resumeData.skills.includes(skill)) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  const removeSkill = (skillToRemove) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleGeneratePDF = async () => {
    setLoading(true);
    try {
      const pdfBlob = await generateResumePDF(resumeData);
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${resumeData.personal.firstName}-${resumeData.personal.lastName}-Resume.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'personal', label: '👤 Personal', icon: '👤' },
    { id: 'experience', label: '💼 Experience', icon: '💼' },
    { id: 'education', label: '🎓 Education', icon: '🎓' },
    { id: 'skills', label: '🛠️ Skills', icon: '🛠️' },
    { id: 'projects', label: '🚀 Projects', icon: '🚀' },
    { id: 'preview', label: '👀 Preview', icon: '👀' }
  ];

  return (
    <div className="resume-builder">
      <div className="resume-header">
        <div className="header-content">
          <h1>AI Resume Builder</h1>
          <p>Create a professional resume that stands out to employers</p>
        </div>
        <div className="header-actions">
          <button 
            className={`preview-btn ${previewMode ? 'active' : ''}`}
            onClick={() => setPreviewMode(!previewMode)}
          >
            {previewMode ? '✏️ Edit Mode' : '👀 Preview Mode'}
          </button>
          <button 
            className="download-btn"
            onClick={handleGeneratePDF}
            disabled={loading}
          >
            {loading ? <ButtonLoader /> : '📄 Download PDF'}
          </button>
        </div>
      </div>

      <div className="resume-container">
        {/* Navigation Tabs */}
        <div className="resume-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="resume-content">
          {activeTab === 'personal' && (
            <PersonalInfoTab 
              data={resumeData.personal}
              onChange={updatePersonalInfo}
              previewMode={previewMode}
            />
          )}

          {activeTab === 'experience' && (
            <ExperienceTab 
              experiences={resumeData.experience}
              onAdd={addExperience}
              onUpdate={updateSection}
              onRemove={removeSection}
              previewMode={previewMode}
            />
          )}

          {activeTab === 'education' && (
            <EducationTab 
              education={resumeData.education}
              onAdd={addEducation}
              onUpdate={updateSection}
              onRemove={removeSection}
              previewMode={previewMode}
            />
          )}

          {activeTab === 'skills' && (
            <SkillsTab 
              skills={resumeData.skills}
              onAdd={addSkill}
              onRemove={removeSkill}
              previewMode={previewMode}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectsTab 
              projects={resumeData.projects}
              onAdd={addProject}
              onUpdate={updateSection}
              onRemove={removeSection}
              previewMode={previewMode}
            />
          )}

          {activeTab === 'preview' && (
            <ResumePreview data={resumeData} />
          )}
        </div>
      </div>
    </div>
  );
};

// Sub-components for each tab
const PersonalInfoTab = ({ data, onChange, previewMode }) => (
  <div className="tab-content">
    <h2>Personal Information</h2>
    <p className="tab-description">Basic details that appear at the top of your resume</p>
    
    <div className="form-grid">
      <FormField
        label="First Name"
        value={data.firstName}
        onChange={(value) => onChange('firstName', value)}
        previewMode={previewMode}
        required
      />
      <FormField
        label="Last Name"
        value={data.lastName}
        onChange={(value) => onChange('lastName', value)}
        previewMode={previewMode}
        required
      />
      <FormField
        label="Email"
        type="email"
        value={data.email}
        onChange={(value) => onChange('email', value)}
        previewMode={previewMode}
        required
      />
      <FormField
        label="Phone"
        type="tel"
        value={data.phone}
        onChange={(value) => onChange('phone', value)}
        previewMode={previewMode}
      />
      <FormField
        label="Location"
        value={data.location}
        onChange={(value) => onChange('location', value)}
        previewMode={previewMode}
      />
      <FormField
        label="LinkedIn"
        value={data.linkedin}
        onChange={(value) => onChange('linkedin', value)}
        previewMode={previewMode}
        placeholder="https://linkedin.com/in/yourprofile"
      />
      <FormField
        label="Portfolio"
        value={data.portfolio}
        onChange={(value) => onChange('portfolio', value)}
        previewMode={previewMode}
        placeholder="https://yourportfolio.com"
      />
    </div>
    
    <FormField
      label="Professional Summary"
      type="textarea"
      value={data.summary}
      onChange={(value) => onChange('summary', value)}
      previewMode={previewMode}
      placeholder="Experienced software developer with 5+ years in web development..."
      rows={4}
    />
  </div>
);

const ExperienceTab = ({ experiences, onAdd, onUpdate, onRemove, previewMode }) => (
  <div className="tab-content">
    <div className="tab-header">
      <div>
        <h2>Work Experience</h2>
        <p className="tab-description">List your relevant work experience</p>
      </div>
      {!previewMode && (
        <button className="add-btn" onClick={onAdd}>
          ➕ Add Experience
        </button>
      )}
    </div>

    <div className="sections-list">
      {experiences.map((exp, index) => (
        <SectionCard key={exp.id} title={`Experience ${index + 1}`} onRemove={() => onRemove('experience', exp.id)}>
          <div className="form-grid">
            <FormField
              label="Job Title"
              value={exp.title}
              onChange={(value) => onUpdate('experience', exp.id, 'title', value)}
              previewMode={previewMode}
              required
            />
            <FormField
              label="Company"
              value={exp.company}
              onChange={(value) => onUpdate('experience', exp.id, 'company', value)}
              previewMode={previewMode}
              required
            />
            <FormField
              label="Location"
              value={exp.location}
              onChange={(value) => onUpdate('experience', exp.id, 'location', value)}
              previewMode={previewMode}
            />
            <FormField
              label="Start Date"
              type="month"
              value={exp.startDate}
              onChange={(value) => onUpdate('experience', exp.id, 'startDate', value)}
              previewMode={previewMode}
            />
            <FormField
              label="End Date"
              type="month"
              value={exp.endDate}
              onChange={(value) => onUpdate('experience', exp.id, 'endDate', value)}
              previewMode={previewMode}
              disabled={exp.current}
            />
            <div className="checkbox-field">
              <label>
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => onUpdate('experience', exp.id, 'current', e.target.checked)}
                  disabled={previewMode}
                />
                Currently working here
              </label>
            </div>
          </div>
          <FormField
            label="Description"
            type="textarea"
            value={exp.description}
            onChange={(value) => onUpdate('experience', exp.id, 'description', value)}
            previewMode={previewMode}
            placeholder="Describe your responsibilities and achievements..."
            rows={3}
          />
        </SectionCard>
      ))}
    </div>
  </div>
);

const EducationTab = ({ education, onAdd, onUpdate, onRemove, previewMode }) => (
  <div className="tab-content">
    <div className="tab-header">
      <div>
        <h2>Education</h2>
        <p className="tab-description">Your academic background</p>
      </div>
      {!previewMode && (
        <button className="add-btn" onClick={onAdd}>
          ➕ Add Education
        </button>
      )}
    </div>

    <div className="sections-list">
      {education.map((edu, index) => (
        <SectionCard key={edu.id} title={`Education ${index + 1}`} onRemove={() => onRemove('education', edu.id)}>
          <div className="form-grid">
            <FormField
              label="Degree"
              value={edu.degree}
              onChange={(value) => onUpdate('education', edu.id, 'degree', value)}
              previewMode={previewMode}
              required
            />
            <FormField
              label="Institution"
              value={edu.institution}
              onChange={(value) => onUpdate('education', edu.id, 'institution', value)}
              previewMode={previewMode}
              required
            />
            <FormField
              label="Location"
              value={edu.location}
              onChange={(value) => onUpdate('education', edu.id, 'location', value)}
              previewMode={previewMode}
            />
            <FormField
              label="Graduation Date"
              type="month"
              value={edu.graduationDate}
              onChange={(value) => onUpdate('education', edu.id, 'graduationDate', value)}
              previewMode={previewMode}
            />
            <FormField
              label="GPA"
              value={edu.gpa}
              onChange={(value) => onUpdate('education', edu.id, 'gpa', value)}
              previewMode={previewMode}
              placeholder="3.8/4.0"
            />
          </div>
          <FormField
            label="Achievements"
            type="textarea"
            value={edu.achievements}
            onChange={(value) => onUpdate('education', edu.id, 'achievements', value)}
            previewMode={previewMode}
            placeholder="Honors, awards, or notable achievements..."
            rows={2}
          />
        </SectionCard>
      ))}
    </div>
  </div>
);

const SkillsTab = ({ skills, onAdd, onRemove, previewMode }) => {
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      onAdd(newSkill.trim());
      setNewSkill('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddSkill();
    }
  };

  return (
    <div className="tab-content">
      <h2>Skills</h2>
      <p className="tab-description">List your technical and professional skills</p>

      {!previewMode && (
        <div className="skill-input-container">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter a skill (e.g., React, Python, Project Management)"
            className="skill-input"
          />
          <button onClick={handleAddSkill} className="skill-add-btn">
            Add Skill
          </button>
        </div>
      )}

      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div key={index} className="skill-tag">
            <span>{skill}</span>
            {!previewMode && (
              <button onClick={() => onRemove(skill)} className="skill-remove">
                ×
              </button>
            )}
          </div>
        ))}
        {skills.length === 0 && (
          <p className="empty-state">No skills added yet. Add your first skill above!</p>
        )}
      </div>

      <div className="skills-suggestions">
        <h4>💡 Popular Skills for Tech Roles:</h4>
        <div className="suggestions">
          {['JavaScript', 'Python', 'React', 'Node.js', 'MongoDB', 'AWS', 'Docker', 'Git'].map(skill => (
            <button
              key={skill}
              onClick={() => onAdd(skill)}
              disabled={previewMode || skills.includes(skill)}
              className="suggestion-tag"
            >
              {skill}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProjectsTab = ({ projects, onAdd, onUpdate, onRemove, previewMode }) => (
  <div className="tab-content">
    <div className="tab-header">
      <div>
        <h2>Projects</h2>
        <p className="tab-description">Showcase your personal or professional projects</p>
      </div>
      {!previewMode && (
        <button className="add-btn" onClick={onAdd}>
          ➕ Add Project
        </button>
      )}
    </div>

    <div className="sections-list">
      {projects.map((project, index) => (
        <SectionCard key={project.id} title={`Project ${index + 1}`} onRemove={() => onRemove('projects', project.id)}>
          <div className="form-grid">
            <FormField
              label="Project Name"
              value={project.name}
              onChange={(value) => onUpdate('projects', project.id, 'name', value)}
              previewMode={previewMode}
              required
            />
            <FormField
              label="Technologies"
              value={project.technologies}
              onChange={(value) => onUpdate('projects', project.id, 'technologies', value)}
              previewMode={previewMode}
              placeholder="React, Node.js, MongoDB..."
            />
            <FormField
              label="Project Link"
              value={project.link}
              onChange={(value) => onUpdate('projects', project.id, 'link', value)}
              previewMode={previewMode}
              placeholder="https://github.com/yourusername/project"
            />
          </div>
          <FormField
            label="Description"
            type="textarea"
            value={project.description}
            onChange={(value) => onUpdate('projects', project.id, 'description', value)}
            previewMode={previewMode}
            placeholder="Describe the project, your role, and key achievements..."
            rows={3}
          />
        </SectionCard>
      ))}
    </div>
  </div>
);

const ResumePreview = ({ data }) => (
  <div className="resume-preview">
    <h2>Resume Preview</h2>
    <p className="tab-description">This is how your resume will look to employers</p>
    
    <div className="preview-container">
      <div className="resume-template">
        {/* Header */}
        <div className="resume-header-preview">
          <h1>{data.personal.firstName} {data.personal.lastName}</h1>
          <div className="contact-info">
            {data.personal.email && <span>📧 {data.personal.email}</span>}
            {data.personal.phone && <span>📞 {data.personal.phone}</span>}
            {data.personal.location && <span>📍 {data.personal.location}</span>}
            {data.personal.linkedin && <span>💼 {data.personal.linkedin}</span>}
          </div>
          {data.personal.summary && (
            <div className="summary">
              <p>{data.personal.summary}</p>
            </div>
          )}
        </div>

        {/* Experience */}
        {data.experience.some(exp => exp.title) && (
          <div className="resume-section">
            <h2>💼 Professional Experience</h2>
            {data.experience.map((exp, index) => (
              exp.title && (
                <div key={index} className="experience-item">
                  <div className="experience-header">
                    <h3>{exp.title}</h3>
                    <span className="company">{exp.company}</span>
                    <span className="date">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.location && <div className="location">{exp.location}</div>}
                  {exp.description && <p className="description">{exp.description}</p>}
                </div>
              )
            ))}
          </div>
        )}

        {/* Education */}
        {data.education.some(edu => edu.degree) && (
          <div className="resume-section">
            <h2>🎓 Education</h2>
            {data.education.map((edu, index) => (
              edu.degree && (
                <div key={index} className="education-item">
                  <div className="education-header">
                    <h3>{edu.degree}</h3>
                    <span className="institution">{edu.institution}</span>
                    <span className="date">{edu.graduationDate}</span>
                  </div>
                  {edu.location && <div className="location">{edu.location}</div>}
                  {edu.gpa && <div className="gpa">GPA: {edu.gpa}</div>}
                  {edu.achievements && <p className="achievements">{edu.achievements}</p>}
                </div>
              )
            ))}
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="resume-section">
            <h2>🛠️ Skills</h2>
            <div className="skills-preview">
              {data.skills.map((skill, index) => (
                <span key={index} className="skill-preview-tag">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {data.projects.some(proj => proj.name) && (
          <div className="resume-section">
            <h2>🚀 Projects</h2>
            {data.projects.map((proj, index) => (
              proj.name && (
                <div key={index} className="project-item">
                  <div className="project-header">
                    <h3>{proj.name}</h3>
                    {proj.link && (
                      <a href={proj.link} className="project-link">🔗 View Project</a>
                    )}
                  </div>
                  {proj.technologies && (
                    <div className="technologies">Technologies: {proj.technologies}</div>
                  )}
                  {proj.description && <p className="description">{proj.description}</p>}
                </div>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

// Reusable Components
const FormField = ({ label, type = 'text', value, onChange, previewMode, required, placeholder, rows, disabled }) => (
  <div className="form-field">
    <label>
      {label} {required && <span className="required">*</span>}
    </label>
    {previewMode ? (
      <div className="preview-value">{value || 'Not specified'}</div>
    ) : type === 'textarea' ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
      />
    )}
  </div>
);

const SectionCard = ({ title, children, onRemove }) => (
  <div className="section-card">
    <div className="section-header">
      <h3>{title}</h3>
      <button onClick={onRemove} className="remove-btn" title="Remove section">
        🗑️
      </button>
    </div>
    {children}
  </div>
);

export default ResumeBuilderPage;