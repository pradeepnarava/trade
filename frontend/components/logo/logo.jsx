import React from 'react';
import { Link } from 'react-router-dom';
//import LogoSVG from './logo_svg';
const style = {
  anchor: {
    'textDecoration': 'none',
    'height' : '100%'
  },
  div: {
    'height' : '100%',
    'display' : 'flex',
    'alignItems' : 'center',
    'marginTop' : '-5px'
  },
  h1: {
    'fontSize' : '18px'
  }
}
const TextLogo = () => {

  return <div style={style.div}><h1 style={style.h1}>TrueSignal</h1></div>
}
const Logo = props => (
  <Link style={style.anchor} className="logo" to="/"><TextLogo/></Link>
);
	
export default Logo;
