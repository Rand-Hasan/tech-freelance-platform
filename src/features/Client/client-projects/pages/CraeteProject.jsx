import { Autocomplete, TextField, Button } from '@mui/material'; 
import '../styles/CreateProject.css'
import { useState,useEffect } from 'react';
import Cookies from "universal-cookie";
import { baseURL } from '../../../../services/Api/api';
import { CreateProjectapi, GetSkills } from '../services/api_project';
import axios from 'axios';
export default function CreateProject() {
  const cookies = new Cookies();

   const token= cookies.get('token')
   const [data, setData] = useState({
      project_name: '',
      description: '',
      price: '',
      level_project: '',
      project_deadline: ''

   });
   const[loading,setLoading]= useState(false);
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
             
               //  headers: { Authorization: `Bearer ${token}` }
            
            console.log(res.data.skills.skill_name);
            // console.log(res.data.skills.id)
         } catch (err) {
            console.error(err);
         }
      };
      const timer = setTimeout(getSkills, 300);
      return () => clearTimeout(timer);
   }, [inputValue]);

   function handleChange(e) {
      setData({ ...data, [e.target.name]: e.target.value })

   }


//    async function handleSubmit() {
//    setLoading(true);

//    const skillIds = selectedSkills.map(skill => skill.id);
//    console.log('hhhhhhhhhhhhhhhhhhhhhhhh',skillIds);

//    const finalDataToSend = {
//       ...data,
//       skills: skillIds 
//    };

//    try {
//       const res = await axios.post(`${baseURL}${CreateProjectapi}`, finalDataToSend, {headers: { Authorization: `Bearer ${token}`} });

//       console.log("SUCCESS RESPONSE:", res.data);
//       setError("");
//       setLoading(false);
   

//    } catch (err) {
//       console.log("ERROR:", err.response?.data);
//       const msg =
//          err.response?.data?.errors?.[0]?.message ||
//          err.response?.data?.message?.[0]?.message ||
//          err.response?.data?.message ||
//          "Server Error";

//       setError(msg);
//       setLoading(false);
//    }
// }
async function handleSubmit() {
   setLoading(true);

   const skillIds = selectedSkills.map(skill => skill.id);

   const finalDataToSend = {
      ...data,
      skille_id: skillIds 
   };

   try {
      const res = await axios.post(`${baseURL}${CreateProjectapi}`, finalDataToSend, {
         headers: { Authorization: `Bearer ${token}` } 
      });
      console.log("SUCCESS RESPONSE:", res.data);
      
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
               <span className='card-title'>Post a New Project</span>
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
                  <select  name='level_project' value={data.level_project} onChange={handleChange}>
                     <option value="">Select Level</option>
                     <option value="expert">expert</option>
                     <option value="middle">middle </option>
                     <option  value="junior">junior </option>
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
               {/* <div style={{display:'flex',gap:'12px',margintop:'24px'}}> */}
               <button className='btn-primary-lg' onClick={handleSubmit}>Publish Project →</button>
               {/* </div> */}
            


             {/* <button type='submit' className='btn-primary-lg' disabled={loading}>
             {loading ? "Publishing..." : "Publish Project →"}
           </button> */}
            </div>
         </div>
      </div>

   )
}


// import { Button } from '@mui/material';
// import '../styles/CreateProject.css';
// import { useState, useEffect } from 'react';
// import axios from 'axios'; // تأكد من استيراده
// import { baseURL } from '../../../../services/Api/api';
// import { CreateProjectapi } from '../services/api_project';

// export default function CreateProject() {
//   const [data, setData] = useState({
//     project_name: '',
//     description: '',
//     price: '',
//     level_project: 'expert', // قيمة افتراضية للـ select
//     project_deadline: ''
//   });

//   // 1. الحالات الخاصة بالمهارات والاقتراحات
//   const [selectedSkills, setSelectedSkills] = useState([]); // المهارات المختارة [ {id: 1, name: 'React'}, ... ]
//   const [inputValue, setInputValue] = useState(''); // النص المكتوب حالياً بالـ input
//   const [suggestions, setSuggestions] = useState([]); // الاقتراحات القادمة من الباكند
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // 2. جلب الاقتراحات من الباكند عند تغيير النص المكتوب
//   useEffect(() => {
//     if (inputValue.trim() === '') {
//       setSuggestions([]);
//       return;
//     }

//     const delayDebounceFn = setTimeout(async () => {
//       try {
//         // نرسل النص المكتوب للباكند ليجلب المهارات المتطابقة
//         const res = await axios.get(`${baseURL}/api/skills?search=${inputValue}`);
//         setSuggestions(res.data); // الباكند يرجع مصفوفة مثل: [{id: 1, name: 'React'}]
//       } catch (err) {
//         console.error("Error fetching skills:", err);
//       }
//     }, 300); // Debounce لمنع إرسال طلب مع كل حرف بسرعة

//     return () => clearTimeout(delayDebounceFn);
//   }, [inputValue]);

//   function handleChange(e) {
//     setData({ ...data, [e.target.name]: e.target.value });
//   }

//   // 3. إضافة مهارة عند اختيارها من قائمة التوقعات
//   function handleSelectSkill(skill) {
//     // التأكد أن المهارة لم تضف مسبقاً
//     if (!selectedSkills.some(s => s.id === skill.id)) {
//       setSelectedSkills([...selectedSkills, skill]);
//     }
//     setInputValue(''); // تفريغ الـ input
//     setSuggestions([]); // إغلاق قائمة التوقعات
//   }

//   // 4. حذف مهارة عند الضغط على ×
//   function handleRemoveSkill(skillId) {
//     setSelectedSkills(selectedSkills.filter(skill => skill.id !== skillId));
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setLoading(true);

//     // 5. استخراج الـ IDs فقط من المهارات المحددة لإرسالها للباكند
//     const skillIds = selectedSkills.map(skill => skill.id);

//     // دمج بيانات المشروع مع مصفوفة الـ IDs
//     const payload = {
//       ...data,
//       skills: skillIds 
//     };

//     try {
//       const res = await axios.post(`${baseURL}${CreateProjectapi}`, payload);
//       console.log("SUCCESS RESPONSE:", res.data);
//       setLoading(false);
//       // التوجيه أو الكوكيز كما في كودك...
//     } catch (err) {
//       console.log("ERROR:", err.response?.data);
//       setError(err.response?.data?.message || "Server Error");
//       setLoading(false);
//     }
//   }

//   return (
//     <div className='page-view active'>
//       <div className='card'>
//         <div className='card-header'>
//           <span className='card-title'>Post a New Project</span>
//         </div>
//         <form onSubmit={handleSubmit} className='form-grid'>

//           <div className='field full'>
//             <label>project name</label>
//             <input 
//               placeholder='e.g. E-commerce Platform Redesign'
//               name='project_name' 
//               value={data.project_name} 
//               onChange={handleChange}
//             />
//             <div className='hint'>Minimum 4 characters, letters only (no numbers)</div>
//           </div>

//           <div className='field full'>
//             <label>project description</label>
//             <textarea 
//               placeholder='Describe the project scope...' 
//               style={{ height: '68px' }}
//               name='description' 
//               value={data.description} 
//               onChange={handleChange}
//             />
//           </div>

//           {/* قسم المهارات الديناميكي */}
//           <div className='field full' style={{ position: 'relative' }}>
//             <label>Required skills</label>
//             <div className='skill-input-wrap'>

//               {/* عرض المهارات المختارة ديناميكياً */}
//               {selectedSkills.map(skill => (
//                 <span key={skill.id} className='skill-chip'>
//                   {skill.name} 
//                   <span onClick={() => handleRemoveSkill(skill.id)} style={{ cursor: 'pointer', marginLeft: '5px' }}>×</span>
//                 </span>
//               ))}

//               <input 
//                 type='text' 
//                 placeholder='Type a skill...' 
//                 value={inputValue}
//                 onChange={(e) => setInputValue(e.target.value)}
//               />
//             </div>

//             {/* قائمة التوقعات والـ Autocomplete المنبثقة */}
//             {suggestions.length > 0 && (
//               <ul className="suggestions-dropdown" style={{
//                 position: 'absolute', top: '100%', left: 0, right: 0,
//                 backgroundColor: 'white', border: '1px solid #ccc', zIndex: 10,
//                 listStyle: 'none', padding: '5px 0', margin: 0, borderRadius: '4px'
//               }}>
//                 {suggestions.map(skill => (
//                   <li 
//                     key={skill.id} 
//                     onClick={() => handleSelectSkill(skill)}
//                     style={{ padding: '8px 12px', cursor: 'pointer', borderBottom: '1px solid #f0f0f0' }}
//                   >
//                     {skill.name}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           <div className='field'>
//             <label>Budget (USD)</label>
//             <input 
//               type='number' 
//               placeholder="e.g. 1500" 
//               name='price' 
//               value={data.price} 
//               onChange={handleChange}
//             />
//           </div>

//           <div className='field'>
//             <label>Estimated duration</label>
//             <select name='project_deadline' onChange={handleChange}>
//               <option value="1w">Less than 1 week</option>
//               <option value="1w-4w">1-4 weeks</option>
//               <option value="1m-3m">1-3 months</option>
//               <option value="3m+">3+ months</option>
//             </select>
//           </div>

//           <div className='field'>
//             <label>Level project</label>
//             <select name='level_project' value={data.level_project} onChange={handleChange}>
//               <option value="expert">expert</option>
//               <option value="middle">middle</option>
//               <option value="junior">junior</option>
//             </select>
//           </div>

//           <div className='field full'>
//             <div className="commission-box">
//               <input type='checkbox' defaultChecked />
//               <div className='commission-box-txt'>
//                 I agree to the platform's <strong> 5% commission </strong>
//               </div>
//             </div>
//           </div>

//           {error && <div style={{ color: 'red', gridColumn: 'span 2' }}>{error}</div>}

//           <button type='submit' className='btn-primary-lg' disabled={loading}>
//             {loading ? "Publishing..." : "Publish Project →"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }





