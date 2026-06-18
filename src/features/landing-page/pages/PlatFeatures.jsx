import FeatItem from '../components/featitem'
import '../styles/PlatFeatures.css'
import Specializations from './Specializations'
export default function PlatFeatures() {
    return (
        <>
            <section className='features'>
                <div className='section-eyebrow'>Platform Features</div>
                <div className='section-title'>
                    Built for serious <br />
                    tech collaboration
                </div>
                <div className='feature-layout'>
                    <div className='feat-list'>
                        <FeatItem icon={"🔐"} title={"Smart Verification"} description={"Freelancers pass technical assessments to earn verified badges. Clients assess their project literacy. No more guessing."} />
                        <FeatItem icon={"📑"} title={"Legal-Grade Contracts"} description={"Create structured contracts with milestones. Chat messages can be adopted as binding legal clauses."} />
                        <FeatItem icon={"🐙"} title={"GitHub Integration"} description={"Link your GitHub to showcase real work. Task delivery happens through commits — fully transparent."} />
                        <FeatItem icon={"💬"} title={"Protected Chat"} description={"Private, encrypted messaging between client and freelancer. Video calls when needed. All in one place."} />
                        <FeatItem icon={"📊"} title={"Automated Ratings"} description={"Ratings calculated from delivery speed, code quality, and client feedback — no gaming the system."} />
                    </div>
                    <div className='feat-mockup'>
                       <div className='mockup-topbar'>
                        <div className='topbar-dot' style={{backgroundColor:"red"}}>
                            </div> <div className='topbar-dot' style={{backgroundColor:"yellow"}}></div>
                             <div className='topbar-dot' style={{backgroundColor:"green"}}></div>
                             <span >Project Chat</span>
                       </div>
                     <div className='mockup-body'>
            <div className='chat-msg'>
                <div className='chat-avatar'>C</div>
                <div className='chat-bubble'>Can we move the deadline to Friday and add the export feature?</div>
            </div>

            <div className='chat-msg right'>   
                <div className='chat-avatar'>F</div>
                <div className='chat-bubble right'>Yes, I can do Friday. Export feature will add $150 to the budget.</div>
            </div>

            {}
            <div className='chat-msg'>
                <div className='chat-avatar'>C</div>
                <div className='chat-bubble'>Agreed. Let's add it to the contract.</div>
            </div>

            <div className='chat-msg right'>   
                <div className='chat-avatar'>F</div>
                <div className='chat-bubble right'>Done! Starting on it now 🚀</div>
            </div>
                </div>
                </div>
                </div>
            </section>
            <Specializations/>
        </>
    )
}