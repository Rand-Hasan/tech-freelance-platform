// import React, { useState, useEffect, useRef } from 'react';
// import SearchIcon from '@mui/icons-material/Search';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import axios from 'axios';
// import { baseURL } from '../../../services/Api/api';
// import { SearchProposedProject } from '../services/api-search';
// import Cookies from "universal-cookie";
// export default function SearchBar() {
//   const [searchValue, setSearchValue] = useState("");
//   const [searchType, setSearchType] = useState("Clients"); // القيمة الافتراضية
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//    const cookies = new Cookies();
  
//     const token = cookies.get("token-freelancer");
//   const dropdownRef = useRef(null);

//   // إغلاق القائمة المنسدلة تلقائياً إذا ضغط المستخدم في أي مكان خارجها
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

// const handleSearchSubmit = async (e) => {
//   e.preventDefault();

//   if (!searchValue.trim()) return;

//   try {
//     const res = await axios.get(
//       `${baseURL}${SearchProposedProject}${2}/${3}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         params: {
//           level: "expert",
//           search: searchValue.trim(),
//         },
//       }
//     );

//     console.log("jjjjjjjj",res.data.proposed_projects);
//   } catch (error) {
//     console.error(
//       "خطأ أثناء جلب نتائج البحث:",
//       error.response?.data || error.message
//     );
//   }
// };
//   return (
//     <form onSubmit={handleSearchSubmit} className="search-form-free">
//       {/* 1. حقل الإدخال النصي */}
//       <input 
//         type="text" 
//         placeholder="Search..." 
//         className="search-input-free" 
//         value={searchValue}
//         onChange={(e) => setSearchValue(e.target.value)}
//       />

//       {/* 2. الخط الفاصل الرمادي */}
//       <div className="search-divider"></div>

//       {/* 3. القائمة المنسدلة المخصصة الاحترافية */}
//       <div className="custom-dropdown-container" ref={dropdownRef}>
//         <div 
//           className="dropdown-trigger" 
//           onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//         >
//           <span>{searchType}</span>
//           <KeyboardArrowDownIcon className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`} />
//         </div>

//         {/* قائمة الخيارات الفخمة */}
//         {isDropdownOpen && (
//           <ul className="dropdown-options-list">
//             <li 
//               onClick={() => { setSearchType("Clients"); setIsDropdownOpen(false); }}
//               className={searchType === "Clients" ? "active-option" : ""}
//             >
//               Clients
//             </li>
//             <li 
//               onClick={() => { setSearchType("Projects"); setIsDropdownOpen(false); }}
//               className={searchType === "Projects" ? "active-option" : ""}
//             >
//               Projects
//             </li>
//           </ul>
//         )}
//       </div>

//       <button type="submit" className="search-btn-submit-free">
//         <SearchIcon className="search-icon-free" />
//       </button>
//     </form>
//   );
// }