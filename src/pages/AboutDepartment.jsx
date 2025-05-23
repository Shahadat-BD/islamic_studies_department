
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const AboutDepartment = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  

  return (
    <section className="bg-gray-100 py-16 px-4 md:px-12 lg:px-20 font-bangla">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
        {/* Left Column: Text Content */}
        <div className="md:w-1/2" data-aos="fade-right">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
            আমাদের বিভাগ সম্পর্কে
          </h2>
          <p className="text-gray-700 text-lg mb-4 leading-relaxed">
            <strong>আরবি ও ইসলামিক স্টাডিজ বিভাগ</strong> হলো একটি জ্ঞান ও নৈতিকতার সমন্বয়ে গঠিত বিভাগ,
            যা শিক্ষার্থীদের ইসলামি ভাবধারা, কুরআন-হাদীস এবং আরবি ভাষার গভীর জ্ঞান অর্জনে সহায়তা করে।
            এটি <strong>বাংলাদেশ জাতীয় বিশ্ববিদ্যালয়</strong> এর অধীনে অনার্স প্রোগ্রামের একটি গুরুত্বপূর্ণ অংশ।
          </p>

          <div className="bg-white shadow p-6 rounded-lg mb-6" data-aos="fade-up" data-aos-delay="100">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">
              🎯 লক্ষ্য (Mission)
            </h3>
            <p className="text-gray-700">
              ইসলামি জ্ঞান, আরবি সাহিত্য ও নৈতিকতার ভিত্তিতে জ্ঞানসম্পন্ন এবং সমাজ সচেতন নাগরিক তৈরি করা।
            </p>
          </div>

          <div className="bg-white shadow p-6 rounded-lg" data-aos="fade-up" data-aos-delay="200">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">
              🌟 উদ্দেশ্য (Vision)
            </h3>
            <p className="text-gray-700">
              ইসলামি ও আরবি শিক্ষায় একটি উৎকৃষ্ট কেন্দ্র হিসেবে গড়ে ওঠা,
              যেখানে ঐতিহ্য ও আধুনিক শিক্ষার সমন্বয় থাকবে।
            </p>
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="md:w-1/2" data-aos="fade-left">
          <img
            src="https://i.ibb.co/5X4FwRvv/Open-work-permit-in-2-1.png"
            alt="ইসলামিক স্টাডিজ"
            className="rounded-lg shadow-lg w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutDepartment;
