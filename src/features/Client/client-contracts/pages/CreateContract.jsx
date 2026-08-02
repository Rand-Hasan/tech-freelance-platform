import { duration } from "@mui/material";
import { useState } from "react";
import Cookies from "universal-cookie";

export default function CreateContract(){
    const cookies= new Cookies();
    const token= cookies.get('token-client');
    const [type, setType] = useState("single_phase");

const [phases, setPhases] = useState([
    {
        title: "",
        amount: "",
        deadline: "",
        allowed_revisions: "",
        duration_in_day: "",
    },
]);

const [data, setData] = useState({
    freelancer_id: "",
    title: "",
    total_budget: "",
});
    return(
        <div>
            
        </div>
    )
}