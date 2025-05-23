import React from 'react';
import HeroBanner from './HeroBanner';
import AboutDepartment from './AboutDepartment';
import AcademicHighlights from './AcademicHighlights';
import RecentNotices from './RecentNotices';
import CourseCurriculum from './CourseCurriculam';
import OurTeachers from './OurTeachers';
import StudentTestimonials from './StudentTestimonials';
import HounersRoutine from './HounersRoutine';
import SuccessHighlights from './SuccessHighlights';

const Home = () => {
    return (
        <div className='pt-[78px]'>
            <HeroBanner></HeroBanner>
            <SuccessHighlights></SuccessHighlights>
            <AboutDepartment></AboutDepartment>
            <AcademicHighlights></AcademicHighlights>
            <OurTeachers></OurTeachers>
            <HounersRoutine></HounersRoutine>
            <RecentNotices></RecentNotices>
            <CourseCurriculum></CourseCurriculum>
            <StudentTestimonials></StudentTestimonials>
            
        </div>
    );
};

export default Home;

