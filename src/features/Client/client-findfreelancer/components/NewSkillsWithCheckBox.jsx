export default function newSkillsWithCheckBox({ title, options }) {
 
  return(
    <div className="FilterSection">
     
      <h4 className="SectionTitle">{title}</h4>
      
      <div className="FilterGroupList">
        {options.map((item) => (
          <div className="FilterItemRow" key={item.id}>
            <label className="FilterLabelSide">
              <input
                type="checkbox"
                className="CustomCheckboxInput"
             />
              <span className="SkillLabelText">{item.label}</span>
            </label>
            
         
            <span className="SkillCountNumber">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
