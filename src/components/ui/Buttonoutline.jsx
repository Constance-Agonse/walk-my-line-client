import { styled } from '@mui/material/styles';
import { Button as MuiButton } from '@mui/material';

// type: 'contained' | 'outlined'

export const Buttonoutline = ({ type, onClick, children }) => {
  const DefaultButton = styled(MuiButton)(() => ({
    color: 'var(--vertclair)',
    // backgroundColor: '#68917B',
    width: '100%',
    border: 'var(--verttresclair)'
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