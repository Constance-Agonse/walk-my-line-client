import { styled } from '@mui/material/styles';
import { Button as MuiButton } from '@mui/material';

// type: 'contained' | 'outlined'

export const Button = ({ type, onClick, children }) => {
  const DefaultButton = styled(MuiButton)(() => ({
    color: '#FFFFFF',
    backgroundColor: '#68917B',
    width: '100%',
    paddingTop: '14px',
    paddingBottom: '14px',
    marginBottom: '14px'
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