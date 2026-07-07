import { Checkbox } from "@mui/material";
import "../styles/SkillCheckbox.css";

export default function SkillCheckbox({ name }) {
  return (
    <div className="checkbox-card">
      <Checkbox
        size="small"
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