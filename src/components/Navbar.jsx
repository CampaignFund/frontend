import { useEffect, useRef, useState } from 'react';
import { CiSearch, CiLogin } from "react-icons/ci";
import { IoMdArrowDropdown, IoMdClose } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import '../css/Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const user = {
    id: 1,
    name: "John Doe",
    email: "email@example.com",
    role: 'user',
  }

  const sidebarRef = useRef(null);
  const toggleBtnRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen]);

  return (
    <nav className={`navbar ${isScrolled ? 'shadow' : ''}`}>
      {/* Toggle icon for mobile */}
      <button ref={toggleBtnRef} className="navbar-toggle" onClick={toggleSidebar}>
        <GiHamburgerMenu />
      </button>

      {/* Desktop Menu */}
      <ul className="navbarLinks desktop">
        <li><CiSearch /><a href="/search">Search</a></li>
        <li className='dropdown-container'>
          <a href="#">About</a>
          <IoMdArrowDropdown className='dropdown-container-icon' />
          <ul className='dropdown-menu'>
            <li><a href="/about/mission">Mission</a></li>
            <li><a href="/about/partners">Partners</a></li>
          </ul>
        </li>
        <li className='dropdown-container'>
          <a href="#">Donation</a>
          <IoMdArrowDropdown className='dropdown-container-icon' />
          <ul className='dropdown-menu'>
            <li><a href="/donate">Donate</a></li>
            <li><a href="/discover">Categories</a></li>
          </ul>
        </li>
        <li><a href="/">Campaign Fund</a></li>
        {user?.id ? (<li className='dropdown-container'>
          <a href="#">{user.name}</a>
          <IoMdArrowDropdown className='dropdown-container-icon' />
          <ul className='dropdown-menu'>
            <li><a href="/profile">Profile</a></li>
            <li><a href="/profile/funds">My Funds</a></li>
            <li><a href="#">Logout</a></li>
          </ul>
        </li>) : (<li><a href="/signin">Sign in</a><CiLogin /></li>)}
        <li><a href="/contact">Contact</a></li>
        <li className='start-fund'><a href="/campaign">Start Fund</a></li>
      </ul>

      <ul ref={sidebarRef} className={`navbarLinks sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="sidebar-close" onClick={toggleSidebar}>
          <IoMdClose />
        </button>

        <li><a href="/">Campaign Fund</a></li>
        <li><a href="/search"><CiSearch /> Search</a></li>
        <li><a href="/about/mission">Mission</a></li>
        <li><a href="/about/partners">Partners</a></li>
        <li><a href="/donate">Donate</a></li>
        <li><a href="/discover">Categories</a></li>
        {user?.id ? (<>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/profile/funds">My Funds</a></li>
          <li><a href="#">Logout</a></li>
        </>) : (<li><a href="/signin">Sign in <CiLogin /></a></li>)}

        <li><a href="/contact">Contact</a></li>
        <li className='start-fund'><a href="/campaign">Start Fund</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;