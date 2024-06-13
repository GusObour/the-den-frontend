import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import { Link as ScrollLink } from 'react-scroll';

const Navbar = () => {
    const { auth, logout } = useContext(AuthContext);
    const { user } = auth;
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="bg-white shadow p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center">
                    <img className="h-10 mr-3" src={`${process.env.PUBLIC_URL}/imgs/TheDen.jpeg`} alt="The Den Logo" />
                    <span className="font-bold text-xl text-black">The Den</span>
                </Link>
                <div className="hidden md:flex space-x-6">
                    <ScrollLink to="about-section" smooth={true} duration={500} className="hover:text-gray-500 text-black cursor-pointer">About</ScrollLink>
                    <ScrollLink to="booking-section" smooth={true} duration={500} className="hover:text-gray-500 text-black cursor-pointer">Booking</ScrollLink>
                    {user ? (
                        <>
                            {user.admin ? (
                                <Link to="/admin" className="hover:text-gray-500 text-black">Admin Dashboard</Link>
                            ) : (
                                <Link to="/user" className="hover:text-gray-500 text-black">User Dashboard</Link>
                            )}
                            <button onClick={logout} className="hover:text-gray-500 text-black">Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className="hover:text-gray-500 text-black">Login</Link>
                    )}
                </div>
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMenu}>
                        {menuOpen ? <FaTimes className="h-6" /> : <FaBars className="h-6" />}
                    </button>
                </div>
            </div>
            {menuOpen && (
                <div className="md:hidden mt-4 space-y-2">
                    <ScrollLink onClick={toggleMenu} to="about-section" smooth={true} duration={500} className="block px-2 py-1 text-black hover:bg-gray-200 cursor-pointer">About</ScrollLink>
                    <ScrollLink onClick={toggleMenu} to="booking-section" smooth={true} duration={500} className="block px-2 py-1 text-black hover:bg-gray-200 cursor-pointer">Booking</ScrollLink>
                    {user ? (
                        <>
                            {user.admin ? (
                                <Link onClick={toggleMenu} to="/admin" className="block px-2 py-1 text-black hover:bg-gray-200">Admin Dashboard</Link>
                            ) : (
                                <Link onClick={toggleMenu} to="/user" className="block px-2 py-1 text-black hover:bg-gray-200">User Dashboard</Link>
                            )}
                            <button onClick={() => { logout(); toggleMenu(); }} className="block w-full text-left px-2 py-1 text-black hover:bg-gray-200">Logout</button>
                        </>
                    ) : (
                        <Link onClick={toggleMenu} to="/login" className="block px-2 py-1 text-black hover:bg-gray-200">Login</Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
