import React, { useState, useEffect, useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState("Clients"); // القيمة الافتراضية
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const dropdownRef = useRef(null);

  // إغلاق القائمة المنسدلة تلقائياً إذا ضغط المستخدم في أي مكان خارجها
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // دالة إرسال طلب البحث للـ API
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    
    // إذا كان حقل البحث فارغاً لا ترسل طلباً
    if (!searchValue.trim()) return;

    console.log(`جاري البحث عن: "${searchValue}" في قسم: ${searchType}`);

    try {
      // 💡 هنا تضع رابط الـ API الخاص بك وتمرر له القيم ديناميكياً
      // const response = await axios.get(`/api/search?query=${searchValue}&type=${searchType.toLowerCase()}`);
      // const data = response.data;
      // ... أكمل منطق عرض النتائج هنا ...
    } catch (error) {
      console.error("خطأ أثناء جلب نتائج البحث:", error);
    }
  };

  return (
    <form onSubmit={handleSearchSubmit} className="search-form-free">
      {/* 1. حقل الإدخال النصي */}
      <input 
        type="text" 
        placeholder="Search..." 
        className="search-input-free" 
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      {/* 2. الخط الفاصل الرمادي */}
      <div className="search-divider"></div>

      {/* 3. القائمة المنسدلة المخصصة الاحترافية */}
      <div className="custom-dropdown-container" ref={dropdownRef}>
        <div 
          className="dropdown-trigger" 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span>{searchType}</span>
          <KeyboardArrowDownIcon className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`} />
        </div>

        {/* قائمة الخيارات الفخمة */}
        {isDropdownOpen && (
          <ul className="dropdown-options-list">
            <li 
              onClick={() => { setSearchType("Clients"); setIsDropdownOpen(false); }}
              className={searchType === "Clients" ? "active-option" : ""}
            >
              Clients
            </li>
            <li 
              onClick={() => { setSearchType("Projects"); setIsDropdownOpen(false); }}
              className={searchType === "Projects" ? "active-option" : ""}
            >
              Projects
            </li>
          </ul>
        )}
      </div>

      {/* 4. زر البحث الدائري في أقصى اليمين */}
      <button type="submit" className="search-btn-submit-free">
        <SearchIcon className="search-icon-free" />
      </button>
    </form>
  );
}