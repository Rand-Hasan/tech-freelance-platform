import SkillCheckbox from "./SkillCheckbox";
import "../styles/SkillCategory.css";

export default function SkillCategory({ title, skills = [], onSkillChange, selectedSkills }) {
  return (
    <div className="skill-category">
      <h3>{title}</h3>

      <div className="skills-grid">
        {skills.map((skill) => (
          <SkillCheckbox
            key={skill.id}
            id={skill.id} 
            name={skill.skill_name}
            checked={selectedSkills.includes(skill.id)} 
            onSkillChange={onSkillChange}
          />
        ))}
      </div>
    </div>
  );
}