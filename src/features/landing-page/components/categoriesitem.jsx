import '../styles/categoriesitem.css'
export default function CategoriesItem({ emoji, title, details }) {
  return (
    <div className="cat">
        {/* تعديل اسم الكلاس هنا ليطابق الـ CSS */}
        <span className="cat-emoji">{emoji}</span>
        
        {/* إزالة className الفارغة */}
        <h4>{title}</h4>
        
        {/* إضافة كلاس مخصص هنا لمنع التداخل مع الإيموجي */}
        <span className="cat-details">{details}</span>
    </div>
  );
}