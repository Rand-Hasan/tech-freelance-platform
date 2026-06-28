import { Button } from "@mui/material";
import { Link,  useNavigate, } from "react-router-dom";
import { Outlet } from 'react-router-dom';

export default function Projects(){
   const navigate = useNavigate();
    return(
        <>
        <div>
            {/* الأزرار الثابتة في الأعلى */}
            <div >
                <Button component={Link} to="id" >All</Button>
                <Button component={Link} to="id" >Open</Button>
                <Button component={Link} to="id" >In Progress </Button>
                <Button component={Link} to="id" >In Review </Button>
                <Button component={Link} to="id" >Completed</Button>
                 
               <Button onClick={() => navigate("/createproject")}>
  + Post Project
</Button>
             
                
            </div>
            
        </div>
       
        </>
    )
}