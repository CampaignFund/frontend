import { useEffect, useState } from 'react';
import '../css/Navbar.css'

const Navbar = ()=> {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(()=>{
    const handleScroll = ()=>{
      setIsScrolled(window.scrollY>0);
    }

    window.addEventListener('scroll', handleScroll);
  },[isScrolled]);

  return (
    <nav className={`navbar ${isScrolled ? 'shadow':''}`}>
      <ul className="navbarLinks">
        <li><a href="/">Search</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/">Campagin Fund</a></li>
        <li><a href="/signin">Sign in</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;