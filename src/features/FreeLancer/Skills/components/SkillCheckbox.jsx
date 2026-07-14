import { Checkbox } from "@mui/material";
import "../styles/SkillCheckbox.css";

export default function SkillCheckbox({ id, name, checked, onSkillChange }) {
  return (
    <div className="checkbox-card">
      <Checkbox
        size="small"
        checked={checked}
        onChange={(e) => onSkillChange(id, e.target.checked)}
        sx={{
          color: "#d9d9d9",
          "&.Mui-checked": {
            color: "#2CB5A5",
          },
        }}
      />
      <span>{name}</span>
    </div>
  );
}