import { Outlet } from 'react-router-dom';
import HomepageFreelancer from '../Home/pages/HomepageFreelancer';
export default function FreeLancerLayout(){
    return(
        <div>
        <HomepageFreelancer/>
       
        <main >
       <Outlet/>
        </main>
         </div>
    )
}