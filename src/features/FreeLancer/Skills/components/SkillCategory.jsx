import SkillCheckbox from "./SkillCheckbox";
import "../styles/SkillCategory.css";

export default function SkillCategory({ title, skills = [] }) {
  return (
    <div className="skill-category">
      <h3>{title}</h3>

      <div className="skills-grid">
        {skills.map((skill) => (
          <SkillCheckbox
            key={skill.id}
            name={skill.skill_name}
          />
        ))}
      </div>
    </div>
  );
}