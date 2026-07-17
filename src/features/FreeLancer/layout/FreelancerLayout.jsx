import { Outlet } from 'react-router-dom';
import NavbarFreelancer from '../components/NavbarFreelancer';
export default function FreeLancerLayout(){
    return(
        <div>
        <NavbarFreelancer/>
       
        <main >
       <Outlet/>
        </main>
         </div>
    )
}