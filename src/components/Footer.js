import React from 'react';
import { Link as ScrollLink } from 'react-scroll';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="p-4 bg-white rounded-lg shadow md:px-6 md:py-8 dark:bg-gray-800 mt-auto">
            <div className="sm:flex sm:items-center sm:justify-between">
                <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center mb-4 sm:mb-0">
                    <img src={`${process.env.PUBLIC_URL}/imgs/TheDen.jpeg`} alt="The Den Logo" className="mr-4 h-8" />
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">The Den</span>
                </a>
                <ul className="flex flex-wrap items-center mb-6 sm:mb-0">
                    <li>
                        <ScrollLink to="about-section" smooth={true} duration={500} className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400 cursor-pointer">About</ScrollLink>
                    </li>
                    <li>
                        <a href="/terms-and-privacy" className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400">Privacy Policy</a>
                    </li>
                </ul>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© {currentYear} <a href="/" target="_blank" rel="noopener noreferrer" className="hover:underline">The Den LLC</a>. All Rights Reserved.</span>
        </footer>
    );
};

export default Footer;
