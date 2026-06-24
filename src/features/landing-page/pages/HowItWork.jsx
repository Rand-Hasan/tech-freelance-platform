import '../styles/HowItWork.css';
import Card from '../components/card';
import PlatFeatures from './PlatFeatures';
export default function HowItWork(){
    return(
       <>
  <section className="container-work">
    <div className="work-header-content">
      <span className="title-work">How it Works</span>
      <h2 className="desc-work">From idea to delivered product</h2>
      <p className="sub-desc-work">
        Four clear steps connecting clients with the right tech talent, fast.
      </p>
      
    </div>
    
    <div className='container-card'>
      <Card id={"01"} icon={"🎯"} title={"Create Your Account"} description={"Sign up as a client or freelancer. Answer onboarding questions to define your technical level and needs"}></Card>
      <Card id={"02"} icon={"📋"} title={"Post or Browse"} description={"Clients post detailed projects. Freelancersbrowse AI-filtered opportunities matched to their skill set."}></Card>
      <Card id={"03"} icon={"🤝"} title={"Contract & Kickoff"} description={"Agree on terms, sign a digital contract, and start work with GitHub integration and time tracking."}></Card>
      <Card id={"04"} icon={"💰"} title={"Deliver & Get Paid"} description={"Submit milestones through GitHub. Payment releases securely after client approval. Rate and review."}></Card> 
     </div>
  </section>
  <PlatFeatures/>
  </>

    )
}