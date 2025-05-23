import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const AcademicHighlights = () => {

useEffect(() => {
  AOS.init({
    duration: 1000,
    once: true,
  });
}, []);

  return (
    <section className="bg-white py-16 px-4 md:px-12 lg:px-20 font-bangla text-center">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14" data-aos="fade-down">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            📚 একাডেমিক হাইলাইটস
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            আমাদের বিভাগে রয়েছে আধুনিক ও ইসলামি শিক্ষার সমন্বয়ে সমৃদ্ধ একাডেমিক সুবিধা, যা ছাত্রছাত্রীদের পূর্ণাঙ্গ মানসিক, নৈতিক ও বুদ্ধিবৃত্তিক বিকাশে সহায়তা করে।
          </p>
        </div>

        {/* Grid of Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: "👨‍🏫",
              title: "অভিজ্ঞ শিক্ষকমণ্ডলী",
              desc: "দক্ষ ও আন্তরিক শিক্ষকমণ্ডলী ছাত্রদের হাতে-কলমে শিক্ষা দিয়ে থাকেন।",
            },
            {
              icon: "🎓",
              title: "অনার্স কারিকুলাম",
              desc: "জাতীয় বিশ্ববিদ্যালয়ের অধীনে চার বছরের অনার্স প্রোগ্রাম পরিচালিত হয়।",
            },
            {
              icon: "💻",
              title: "আইসিটি ল্যাব",
              desc: "কম্পিউটার ল্যাবে আধুনিক প্রযুক্তি ব্যবহার করে শিক্ষার্থীরা আইসিটি শিখতে পারে।",
            },
            {
              icon: "📚",
              title: "লাইব্রেরি সুবিধা",
              desc: "ধর্মীয় ও সাধারণ জ্ঞানের বিশাল সংগ্রহশালাসম্পন্ন একটি লাইব্রেরি রয়েছে।",
            },
            {
              icon: "🗓️",
              title: "ইভেন্ট ও সহপাঠ কার্যক্রম",
              desc: "খেলাধুলা, আবৃতি, হামদ-নাত ও শিক্ষা সফরসহ বিভিন্ন কার্যক্রম আয়োজন করা হয়।",
            },
            {
              icon: "🧠",
              title: "গবেষণা ও সেমিনার",
              desc: "শিক্ষার্থীদের গবেষণায় উৎসাহ দিতে নিয়মিত সেমিনার ও ওয়ার্কশপ হয়।",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition duration-300 p-6 border-b-4 border-blue-500"
              data-aos="fade-up"
              data-aos-delay={index * 100} // stagger animation
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">{item.title}</h3>
              <p className="text-gray-700 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AcademicHighlights;
