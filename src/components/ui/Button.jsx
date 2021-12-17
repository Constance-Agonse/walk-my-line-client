import { styled } from '@mui/material/styles';
import { Button as MuiButton } from '@mui/material';

// type: 'contained' | 'outlined'

export const Button = ({ type, onClick, children }) => {
  console.log(type);
  const DefaultButton = styled(MuiButton)(() => ({
    color: '#f00',
    backgroundColor: '#f00'
  }));

  

  return (
    <DefaultButton
      onClick={onClick}
      variant={type}
    >
      {children}
    </DefaultButton>
  )
}