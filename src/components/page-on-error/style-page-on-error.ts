import { CSSProperties } from 'react';

export const nonAvailableDiv: CSSProperties = {
  minHeight: '100vh',
  backgroundColor: 'rgb(195 68 68)',
  color: '#dfcf77',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

export const nonAvailableText: CSSProperties = {
  display: 'block',
  fontSize: '38px',
  fontStyle: 'italic',
  fontWeight: 'bold',
  padding: '0 10%'
};

export const nonAvailableLink: CSSProperties = {
  // minHeight: '20vh',
  color: 'white',
  textDecoration: 'none',
  display: 'block',
  fontStyle: 'italic',
  fontWeight: 'bold',
  zIndex: '100',
  order: '-1',
};
