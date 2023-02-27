import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomBar from '../../components/Navbar/Navbar';
import './custom.css';
import './bootstrap.css';

function MainLayout({children}) {
  return (
    <>
    <CustomBar></CustomBar>
    {children}
    <footer id='bottom'></footer>
    </>
    
    
  )
}

export default MainLayout