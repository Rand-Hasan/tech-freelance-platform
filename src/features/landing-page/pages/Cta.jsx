 import '../styles/Cta.css'
import Footer from './Footer'
export default function Cta(){
    return (
        <>
        <div className="cta-section">
        <div className='cta-content'>
            <h2>Ready to build <br/>something great?</h2>
            <p>Join 500+ verified freelancers and hundreds of clients already on ProLink.</p>
        </div>
        <div className="cta-btn">
            <button className="cta-btn-white">Hire Talent</button>
            <button className="btn-cta-outline">Join as Freelancer</button>
        </div>
        </div>
        <Footer/>
        </>
    )
}