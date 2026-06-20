import Testi from '../components/testi'
import '../styles/Testimonials.css'
import Cta from './Cta'
export default function Testimonials(){
    return(
        <>
        <section className="testimonials">
            <div className="section-eyebrow">What They Say</div>
            <div className="section-title">Real results, <br/>real reviews</div>
            <div className="testi-grid">
           <Testi icon={"★★★★★"} text={"The technical verification system is a game changer. I knew exactly who I was hiring before the first message."}
            avatar={"KM"} name={"Khalid Mansour"} role={"CTO, TechVision"}/>
             <Testi icon={"★★★★★"} text={"GitHub integration made delivery transparent. My client could see every commit in real time — no more trust issues."}
            avatar={"RA"} name={"Rania Al-Ahmad"} role={"Freelance Developer, Expert"}/>
             <Testi icon={"★★★★★"} text={"The chat-to-contract feature saved us from a dispute. Everything was documented automatically."}
            avatar={"OB"} name={"Omar Bashir"} role={"Product Manager, NexaDigital"}/>
            </div>
        </section>
        <Cta/>
        </>
    )
}