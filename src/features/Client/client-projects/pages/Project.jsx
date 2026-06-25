import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Outlet } from 'react-router-dom';

export default function Projects(){
    return(
        <div style={{ padding: '20px' }}>
            {/* الأزرار الثابتة في الأعلى */}
            <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '20px' }}>
                <Button component={Link} to="create" variant="contained" style={{ marginRight: '10px' }}>
                    Create Project
                </Button>

                <Button component={Link} to="id" variant="outlined">
                    Project 1
                </Button>
            </div>

            {/* هنا سيتم عرض المكونات الفرعية (CreateProject أو ProjectDetails) دون اختفاء الأزرار */}
            <Outlet />
        </div>
    )
}