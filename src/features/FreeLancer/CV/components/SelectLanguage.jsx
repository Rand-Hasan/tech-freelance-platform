import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function SelectLanguage({ value, onChange }) {
  
  const englishOption = { code: 'GB', label: 'English' };

  const [internalValue, setInternalValue] = useState(
    value && value.length > 0 ? value : [englishOption]
  );
  useEffect(() => {
  if (value && value.length > 0) {
    setInternalValue(value);
  }
}, [value]);

  const handleChange = (event, newValue, reason) => {
    let finalValue = newValue;

    // التعديل الأول: نتأكد دائماً أن اللغة الإنكليزية موجودة في المصفوفة
    const hasEnglish = finalValue.some((lang) => lang.code === 'GB');

    if (!hasEnglish) {
      // إذا انحذفت، منرجع منضيفها بأول المصفوفة
      finalValue = [englishOption, ...finalValue];
    }

    setInternalValue(finalValue); 

    if (onChange) {
      onChange(finalValue); 
    }
  };
  

  return (
    <Autocomplete
      multiple
      id="language-select-demo"
      sx={{ width: "100%", marginLeft: "0px" }}
      options={languages}
      value={internalValue} 
      onChange={handleChange}
      isOptionEqualToValue={(option, value) => option.code === value.code}
      autoHighlight
      
      // التعديل الثاني: نقفل خيار الإنكليزي بالقائمة المنسدلة كرمال ما يقدر يشيل الصح عنه
      getOptionDisabled={(option) => option.code === 'GB'}

      getOptionLabel={(option) => {
        if (typeof option === 'string') return option;
        if (option && option.label) return option.label;
        return '';
      }}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => {
          const { key, ...tagProps } = getTagProps({ index });
          const isEnglish = option.code === 'GB';

          return (
            <Box
              key={key}
              component="span"
              {...tagProps}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                // تمييز بسيط بلون الخلفية للإنكليزي ليعرف المستخدم إنه خيار إجباري ثابت
                background: isEnglish ? "#d9e4e6" : "#e0e0e0", 
                borderRadius: "16px",
                padding: "2px 8px",
                margin: "2px",
                color: isEnglish ? "#555" : "inherit",
              }}
            >
              {option.label}
              {/* التعديل الثالث: زر الحذف يظهر فقط للغات الثانية */}
              {!isEnglish && (
                <span onClick={tagProps.onDelete} style={{ marginLeft: 6, cursor: "pointer" }}>
                  ✕
                </span>
              )}
            </Box>
          );
        })
      }
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box
            key={key}
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...optionProps}
          >
            <img
              loading="lazy"
              width="20"
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              alt=""
            />
            {option.label}
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', 
          }}
          sx={{
            width: "100%",
            fontSize: "13px",
            '& .MuiOutlinedInput-root': {
              background: "#eefaf8",
              border: "1px solid #d9e4e6",
              borderRadius: "10px",
              minHeight: "50px", // خلينا الارتفاع مرن متل ما اتفقنا ليتوسع مع اللغات
              height: "auto",
              cursor: "pointer",
            },
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
          }}
        />
      )}
    />
  );
}

export const languages = [
  { code: 'SA', label: 'Arabic' },
  { code: 'GB', label: 'English' },
  { code: 'FR', label: 'French' },
  { code: 'ES', label: 'Spanish' },
  { code: 'DE', label: 'German' },
  { code: 'IT', label: 'Italian' },
  { code: 'PT', label: 'Portuguese' },
  { code: 'RU', label: 'Russian' },
  { code: 'TR', label: 'Turkish' },
  { code: 'CN', label: 'Chinese' },
  { code: 'JP', label: 'Japanese' },
  { code: 'KR', label: 'Korean' },
  { code: 'IN', label: 'Hindi' },
  { code: 'NL', label: 'Dutch' },
  { code: 'GR', label: 'Greek' },
  { code: 'PL', label: 'Polish' },
  { code: 'SE', label: 'Swedish' },
  { code: 'ID', label: 'Indonesian' },
  { code: 'VN', label: 'Vietnamese' },
  { code: 'TH', label: 'Thai' },
];