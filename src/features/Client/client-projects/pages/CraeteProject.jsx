import { Autocomplete, TextField, Button } from '@mui/material';
import '../styles/CreateProject.css'
import { useState, useEffect } from 'react';
import Cookies from "universal-cookie";
import { baseURL } from '../../../../services/Api/api';
import { CreateProjectapi, GetClientProjectById, GetSkills, UpdateProject } from '../services/api_project';
import axios from 'axios';
import { useParams } from 'react-router-dom';
export default function CreateProject() {
   const cookies = new Cookies();
   const { id } = useParams();
   const isEditMode = Boolean(id);
   const token = cookies.get('token');
   console.log('tokenis222:', token);

   const [data, setData] = useState({
      project_name: '',
      description: '',
      price: '',
      level_project: '',
      project_deadline: ''

   });
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");

   const [selectedSkills, setSelectedSkills] = useState([]);

   const [suggestions, setSuggestions] = useState([]);

   const [inputValue, setInputValue] = useState('');

   useEffect(() => {
      if (inputValue.trim() === '') {
         setSuggestions([]);
         return;
      }

      const getSkills = async () => {
         try {
            const res = await axios.get(`${baseURL}${GetSkills}`);
            setSuggestions(res.data.skills);
            console.log(res.data.skills);
            // console.log(res.data.skills.id)
         } catch (err) {
            console.error(err);
         }
      };
      const timer = setTimeout(getSkills, 300);
      return () => clearTimeout(timer);
   }, [inputValue]);

   useEffect(() => {
      if (isEditMode && id) {
         const getProjectDetails = async () => {
            try {
               const res = await axios.get(`${baseURL}${GetClientProjectById}${id}`, {
                  headers: { Authorization: `Bearer ${token}` }
               });
               if (res.data && res.data.project) {
                  const project = res.data.project;
                  setData({
                     project_name: project.project_name || '',
                     description: project.description || '',
                     price: project.price || '',
                     level_project: project.level_project || '',
                     project_deadline: project.project_deadline.substring(0, 10) || '',
                  });
                  if (project.skills) {
                     setSelectedSkills(project.skills);
                  }

               }
            }
            catch (err) {
               setError("Failed to load project details.");
            }
         }
         if (isEditMode && id) {
            getProjectDetails();
         }
      }
   }, [isEditMode, id])

   function handleChange(e) {
      setData({ ...data, [e.target.name]: e.target.value })

   }

   async function handleSubmit() {
      setLoading(true);

      const skillIds = selectedSkills.map(skill => skill.id);

      const finalDataToSend = {
         ...data,
         skille_id: skillIds
      };
      const url = isEditMode ? `${baseURL}${UpdateProject}${id}` : `${baseURL}${CreateProjectapi}`;

      try {
         const res = await axios({
            method: 'Post',
            url: url,
            data: finalDataToSend,
            headers: { Authorization: `Bearer ${token}` }
         });
         // console.log(token);
         console.log("SUCCESS RESPONSE:", res.data.message);
         alert(isEditMode ? "Project updated successfully!" : "Project published successfully!");
      } catch (err) {
         console.log("ERROR:", err.response?.data);
         const msg =
            err.response?.data?.errors?.[0]?.message ||
            err.response?.data?.message?.[0]?.message ||
            err.response?.data?.message ||
            "Server Error";

         setError(msg);
         setLoading(false);
      }
   

   }
   return (
      <div className='page-view active'>
         <div className='card'>

            <div className='card-header '>
               <span className='card-title'>
                  {isEditMode ? "Edit Project Details" : "Post a New Project"}</span>
            </div>
            {error && <div style={{ color: 'red', gridColumn: 'span 2' }}>{error}</div>}
            <div className='form-grid'>
               <div className='field full'>
                  <label >project name</label>
                  <input placeholder='e.g. E-commerce Platform Redesign'
                     name='project_name' value={data.project_name} onChange={handleChange}
                  ></input>
                  <div className='hint'>Minimum 4 characters, letters only (no numbers)</div>
               </div>
               <div className='field full'>
                  <label>project description</label>
                  <textarea placeholder='Describe the project scope, goals, and any technical requirements...' style={{ height: '68px' }}
                     name='description' value={data.description} onChange={handleChange}
                  ></textarea>

               </div>

               <div className="field full">
                  <label>Required skills</label>

                  <Autocomplete
                     multiple
                     options={suggestions}
                     getOptionLabel={(option) => option.skill_name}
                     value={selectedSkills}

                     onChange={(event, newValue) => {
                        setSelectedSkills(newValue);
                     }}
                     onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                     }}

                     renderInput={(params) => (
                        <TextField {...params} placeholder="Type a skill and press Enter" />
                     )}
                  />
               </div>
               <div className='field'>
                  <label >Budget (USD)</label>
                  <input type='number' placeholder="e.g. 1500"
                     name='price' value={data.price} onChange={handleChange}
                  ></input>
                  <div className='hint'>Must be greater than 0</div>
               </div>
               {/* <div className='field'>
                  <label>Estimated duration</label>
                  <select name='project_deadline' value={data.project_deadline} onChange={handleChange}>
                     <option>Less than 1 week</option>
                     <option>1-4 week</option>
                     <option>1-3 mounth </option>
                     <option>3+ mounth </option>
                     <option>1-3 mounth </option>
                  </select>
               </div> */}
               <div className='field'>
                  <label>Project Deadline</label>
                  <input
                     type='date'
                     name='project_deadline'
                     value={data.project_deadline}
                     onChange={handleChange}
                  />
               </div>
               <div className='field'>
                  <label>Level project</label>
                  <select name='level_project' value={data.level_project} onChange={handleChange}>
                     <option value="">Select Level</option>
                     <option value="expert">expert</option>
                     <option value="middle">middle </option>
                     <option value="junior">junior </option>
                  </select>
               </div>
               <div className='field full'>
                  <div className="commission-box">
                     <input type='checkbox' ></input>
                     <div className='commission-box-txt'>I agree to the platform's
                        <strong> 5% commission </strong>
                        on the final contract value, deducted automatically upon milestone payments.</div>
                  </div>
               </div>
               <button className='btn-primary-lg' onClick={handleSubmit}>
                  {isEditMode ? "Save Change" : "Publish Project →"}</button>
            </div>
         </div>
      </div>

   )
}
