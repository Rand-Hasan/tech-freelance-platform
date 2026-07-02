import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
export default function SliderSizes() {
  return (
    <Box sx={{width:'100%'}}>
     
      <Slider
      sx={{
          color: '#46A095', 
          width:"100%"
        }}
       className='Slider' defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
    </Box>
  );
}
