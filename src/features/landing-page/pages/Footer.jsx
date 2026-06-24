import '../styles/Footer.css'
export default function Footer(){
    return(
        <footer className='footer'>
         <div className="footer-top">
            <div >
                <div className='footer-logo-txt'>pro<em>link</em></div>
                <p className='footer-desc'>The verified tech freelancing platform built for serious projects and professional outcomes.</p>
            </div>
             <div className="footer-col">
                <h5>For Clients</h5>
                <ul>
                    <li> <a href="#">Post a Project</a></li>
                    <li> <a href="#">Browse Freelancers</a></li>
                    <li><a href="#">Manage Contract</a></li>
                    <li><a href="#">Wallet</a></li>
                </ul>
             </div>
              <div className="footer-col">
                 <h5>For Freelancers</h5>
                <ul>
                    <li> <a href="#">Find Projects</a></li>
                    <li> <a href="#">My Profile</a></li>
                    <li><a href="#">Portfolio</a></li>
                    <li><a href="#">Reports</a></li>
                </ul>
              </div>
               <div className="footer-col">
                <h5>Company</h5>
                <ul>
                    <li> <a href="#">About</a></li>
                    <li> <a href="#">Terms </a></li>
                    <li><a href="#">Privacy</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
               </div>
         </div>
         <div className="footer-bottom">
            <span>© 2025 ProLink. All rights reserved.</span>
         </div>
        </footer>
    )
}