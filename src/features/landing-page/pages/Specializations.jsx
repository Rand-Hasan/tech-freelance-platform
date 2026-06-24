import CategoriesItem from '../components/categoriesitem';
import '../styles/Specializations.css';
import Testimonials from './Testimonials';
export default function Specializations(){
    return(
        <>
        <section className="categories" >
        <div className="section-eyebrow">Specializations</div>
        <div className="section-title">Find talent in <br/> your tech stack</div>
        <div className="categories-item">
     <CategoriesItem emoji={"💻"} title={"Web Development"} details={"180+ freelancers"} />
     <CategoriesItem emoji={"📱"} title={"Mobile Apps"} details={"95+ freelancers"} />
     <CategoriesItem emoji={"🎨"} title={"UI/UX Design"} details={"72+ freelancers"} />
     <CategoriesItem emoji={"🤖"} title={"AI & ML"} details={"44+ freelancers"} />
     <CategoriesItem emoji={"☁️"} title={"Cloud & DevOps"} details={"38+ freelancers"} />
     <CategoriesItem emoji={"🔒"} title={"Cybersecurity"} details={"29+ freelancers"} />
     <CategoriesItem emoji={"📊"} title={"Data Analytics"} details={"51+ freelancers"} />
     <CategoriesItem emoji={"🧩"} title={"Backend & APIs"} details={"110+ freelancers"} />
        </div>
        </section>
        <Testimonials/>
        </>
    )
}