import { TextField, Button, Container, Accordion, Step } from '@mui/material';
import { withStyles, styled } from '@mui/styles';

export enum ColorSchema {
  LightGreen = '#008c7a',
  Black = '#000000',
  White = '#ffffff',
  LightBlack = '#21222D',
  Red = '#ff2626',
}

export const CustomTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#909090 !important',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#909090 !important',
    },
    '& input:valid + fieldset': {
      borderColor: '#909090 !important',
      borderWidth: 2,
    },
    '& input:invalid + fieldset': {
      borderColor: '#ff8886 !important',
      borderWidth: 2,
    },
    '& input:valid:focus + fieldset': {
      borderLeftWidth: 6,
      padding: '4px !important',
      borderColor: '#909090 !important',
    },
  },
})(TextField);

export const SubmitButtonStyle: React.CSSProperties = {
  marginTop: '0.6rem',
  textTransform: 'capitalize',
  paddingBlock: '8px',
  fontSize: '18px',
  fontWeight: '500',
  letterSpacing: '2px',
};

export const MuiButton = styled(Button)({
  background: '#008c7a !important', //(bug) should not use important in this situation
  border: 0,
  borderRadius: '40px !important', //(bug) should not use important in this situation
  color: 'white',
  fontSize: '18px !important',
  height: '56px',
  letterSpacing: '1px !important',
});

export const MuiBrandButton = styled(Button)({
  background: '#008c7a !important', //(bug) should not use important in this situation
  color: 'white',
  fontSize: '1rem !important',
  letterSpacing: '1px !important',
  marginInline: '1rem',
  marginBottom: '1rem',
  width: '100%',
});

export const MuiNavBarButton = styled(Button)({
  background: 'white !important', //(bug) should not use important in this situation
  fontSize: '16px !important',
  letterSpacing: '1px !important',
  paddingInline: '30px !important',
  paddingBlock: 'auto !important',
});

export const TransparentButton = styled(Button)({
  color: 'white',
  borderColor: 'white',
  textTransform: 'capitalize',
  fontWeight: '700',
  fontSize: '1.25rem',
  letterSpacing: '2px',
  paddingInline: '3rem',
});

export const TransparentBrandButton = styled(Button)({
  color: 'black',
  borderColor: 'black',
  textTransform: 'capitalize',
  fontWeight: '700',
  letterSpacing: '2px',
  paddingInline: '3rem',
});

export const ContainerGrey = styled(Container)({
  paddingBlock: '10vh',
  backgroundColor: '#f6f6f6',
  maxWidth: '100%',
  paddingInline: '10vw',
});

export const ContainerWhite = styled(Container)({
  paddingBlock: '10vh',
  backgroundColor: '#ffffff',
});

export const SecondContainerWhite = styled(Container)({
  paddingBlock: '10vh',
  backgroundColor: '#ffffff',
  maxWidth: '100%',
  paddingInline: '20vw',
});

export const LightGreenButton = styled(Button)({
  color: ColorSchema.LightGreen,
  borderColor: ColorSchema.LightGreen,
  textTransform: 'capitalize',
  fontSize: '1.25rem',
  letterSpacing: '2px',
  paddingInline: '3rem',
});

export const DarkAccordion = styled(Accordion)({
  backgroundColor: ColorSchema.LightBlack,
  color: 'white',
});

export const CustomStep = withStyles({
  root: {
    '&-MuiStepIcon-root .Mui-active': {
      color: '#008c7a !important',
    },
  },
})(Step);
