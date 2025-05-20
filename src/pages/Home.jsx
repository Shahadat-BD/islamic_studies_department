import React from 'react';
import HeroBanner from './HeroBanner';
import AboutDepartment from './AboutDepartment';
import AcademicHighlights from './AcademicHighlights';

const Home = () => {
    return (
        <div className='pt-[78px]'>
            <HeroBanner></HeroBanner>
            <AboutDepartment></AboutDepartment>
            <AcademicHighlights></AcademicHighlights>
        </div>
    );
};

export default Home;