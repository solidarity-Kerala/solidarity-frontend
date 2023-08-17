import React from 'react';
import { useSelector } from 'react-redux';
import { ButtonStyle } from './styles';
const Button=()=>{
    const themeColors = useSelector((state) => state.themeColors);
    return (<ButtonStyle theme={themeColors}>Validate</ButtonStyle>);
}
export default Button;