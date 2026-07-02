import "../styles/FindFreelancers.css";
import "../styles/FindFreeLancerCard.css";
import NewSkillsWithCheckBox from "../components/NewSkillsWithCheckBox";
import SliderSizes from "../components/SliderSizes";
import Raiting from "../components/Raiting";
import FindFreeLancerCard from "../components/FindFreeLancerCard";

export default function FindFreelancers() {
 
  const skillsData = [
    { id: "react", label: "React / Next.js", count: 142 },
    { id: "node", label: "Node.js", count: 98 },
    { id: "uiux", label: "UI/UX Design", count: 76 },
    { id: "mobile", label: "Mobile (RN/Flutter)", count: 61 },
    { id: "ai", label: "AI / ML", count: 44 },
    { id: "devops", label: "DevOps / Cloud", count: 38 },
  ];

  const experienceData = [
    { id: "junior", label: "🌻 Junior", count: 210 },
    { id: "mid", label: "⚡ Mid-Level", count: 340 },
    { id: "expert", label: "🏆 Expert", count: 174 },
  ];

  const availabilityData = [
    { id: "available", label: "🟢 Available now", count: 312 },
    { id: "busy", label: "🔴 Busy", count: 412 },
  ];
  return (
    <div className="FindFreeLancerPage">
      <div className="AllAboutFiltering">
        <NewSkillsWithCheckBox title="SKILLS" options={skillsData} />
        <NewSkillsWithCheckBox
          title="EXPERIENCE LEVEL"
          options={experienceData}
        />
        <NewSkillsWithCheckBox
          title="AVAILABILITY"
          options={availabilityData}
        />
        <h4>HOURLY RATE </h4>
        <SliderSizes />
        <div className="DolarsRaiting">
          <h6 style={{color:"black"}}>10$</h6>
          <h6 style={{color:"black"}}>UP TO 60$</h6>
          <h6 style={{color:"black"}}>100$</h6>
        </div>
        <h4>RATING</h4>
        <Raiting />
        <button className="ResetFiltersButton">Reset Filters</button>
      </div>

      <div className="ResultOfFiltering">
        <div className="ContentHeaderRow">
          <span className="FreelancersCount">
            247 freelancers match your filters
          </span>
          <select className="SortDropdownSelection">
            <option value="highest-rated">Highest Rated</option>
            <option value="lowest-price">Hourly Rate: Low to High</option>
            <option value="highest-price">Hourly Rate: High to Low</option>
            <option value="newest">Newest Members</option>
          </select>
        </div>
        <div  className="FreelancersGridContainer">
          <FindFreeLancerCard/>
          <FindFreeLancerCard/>
          <FindFreeLancerCard/>
        </div>
      </div>
    </div>
  );
}
