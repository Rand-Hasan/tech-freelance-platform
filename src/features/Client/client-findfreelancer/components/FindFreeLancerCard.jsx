import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import "../styles/FindFreeLancerCard.css";
export default function FindFreeLancerCard({onClick}) {
  return (
    <Card className='FindFreeLancerCard' onClick={onClick}>
      <CardContent className='CardContent'>
       <div className='LeftSide'>
        <div className='NameAndFirstLater'>
            <div className='FirstLaterOfFreeLancer'>MA</div>
            <div className='NameOfFreeLancerAndNickName'>
                <h3>majd mahmoud</h3>
                <h6>Full Stack Developer</h6>
            </div>
        </div>
        <div className='StatusOfFreeLancer'>🟢Avialable now</div>
        <div className='SkillsOfFreeLancer'>
            <div className='SkillItemOfFreeLancer'>React</div>
            <div className='SkillItemOfFreeLancer'>Node </div>
            <div className='SkillItemOfFreeLancer'>AWS</div>
        </div>
        <div className='CountOfProjectCompleted'>24 project completed</div>
       </div>

       <div className='RightSide'>
        <div className='monyInHour'>$45 / hr</div>
        <div className='RaitingOfFreeLancer'>* 4.9 Expert</div>
        <button className='InviteButton'>Invite</button>
       </div>

      </CardContent>
     
    </Card>
  );
}
