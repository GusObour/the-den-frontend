import React from 'react';
import '../styles/About.css';

const About = () => {
    return (
        <section id="about-section" className="about-container py-12 bg-gray-100 dark:bg-gray-900">
            <div className="container mx-auto text-center">
                <div className="profileCard bg-white dark:bg-gray-800 shadow rounded-lg p-6 max-w-2xl mx-auto">
                    <img src={`${process.env.PUBLIC_URL}/imgs/TheDen.jpeg`} alt="Avatar" className="h-24 w-24 rounded-full mx-auto mb-4" />
                    <p>With over 20 years of experience in the hair industry, our barber is dedicated to providing high-quality cuts and superior customer service. Hair cutting and styling has always been his passion, and he loves nothing more than seeing a satisfied customer with a fresh cut.</p>
                </div>
            </div>
        </section>
    );
};

export default About;
