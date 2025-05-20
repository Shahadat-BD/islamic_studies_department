import React from 'react';
import HeroBanner from './HeroBanner';
import AboutDepartment from './AboutDepartment';
import AcademicHighlights from './AcademicHighlights';
import RecentNotices from './RecentNotices';
import CourseCurriculum from './CourseCurriculam';
import OurTeachers from './OurTeachers';

const Home = () => {
    return (
        <div className='pt-[78px]'>
            <HeroBanner></HeroBanner>
            <AboutDepartment></AboutDepartment>
            <AcademicHighlights></AcademicHighlights>
            <RecentNotices></RecentNotices>
            <CourseCurriculum></CourseCurriculum>
            <OurTeachers></OurTeachers>
        </div>
    );
};

export default Home;