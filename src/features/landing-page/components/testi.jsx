import '../styles/testi.css'
export default function Testi({icon,text,avatar,name,role}){
    return (
        <div className="testi-card">
            <div className="testi-start">{icon}</div>
            <p className="testi-text">{text}</p>
            <div className="testi-author">
                <div className="testi-avatar">{avatar}</div>
                <div>
                    <div className="testi-name">{name}</div>
                    <div className="testi-role">{role}</div>
                </div>
            </div>
        </div>
    )
}