
import '../styles/featitem.css'
export default function FeatItem ({icon,title,description}){
     return (
        <>
        <div className="feat-item">
            <div className="feat-icon"> {icon}</div>
            <div className='feat-div'>
                <h4>{title}</h4>
                <p>{description}</p>
            </div>
        </div>
        </>
     )
}