import { useEffect, useState } from 'react';
import { CiSearch, CiLogin } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import '../css/Navbar.css'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    }

    window.addEventListener('scroll', handleScroll);
  }, [isScrolled]);

  return (
    <nav className={`navbar ${isScrolled ? 'shadow' : ''}`}>
      <ul className="navbarLinks">
        <li>
          {<CiSearch />}
          <a href="/">Search</a>
        </li>
        <li className='about-dropdown'>
          <a href="#">About</a>
          {<IoMdArrowDropdown className='about-dropdown-icon'/>}
          <ul className='dropdown-menu'>
            <li><a href="/about/mission">Mission</a></li>
            <li><a href="/about/partners">Partners</a></li>
          </ul>
        </li>
        <li><a href="/">Campagin Fund</a></li>
        <li>
          <a href="/signin">Sign in</a>
          {<CiLogin />}
        </li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;