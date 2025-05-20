import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const courseData = [
  {
    year: "Honours 1st Year",
    books: [
      "কোরানিক স্টাডিজ (২১১৮০১)",
      "ইসলামের পরিচিতি (২১১৮০৩)",
      "ইসলামিক দাওয়াহ পরিচিতি (২১১৮০৫)",
      "আল-কালাম (২১১৮০৭)",
      "সমাজবিজ্ঞান পরিচিতি (২১২০০৯)",
      "স্বাধীন বাংলাদেশের অভ্যুদয়ের ইতিহাস (২১১৫০১)",
    ],
  },
  {
    year: "Honours 2nd Year",
    books: [
      "Introductory Knowledge of Quran: কুরআনের প্রাথমিক জ্ঞান।",
      "Study of Al-Hadith: হাদীস অধ্যয়ন।",
      "Al-Sirat al-Nabawiyya: নবী করীম (সাঃ)-এর সীরাত (জীবনী)",
      "Social System and Family Welfare in Islam: ইসলামে সামাজিক ব্যবস্থা ও পারিবারিক কল্যাণ।",
      "Political Organization and Political System of UK and USA: যুক্তরাজ্য ও যুক্তরাষ্ট্রের রাজনৈতিক সংগঠন ও রাজনৈতিক ব্যবস্থা।",
      "Sociology of Bangladesh: বাংলাদেশের সমাজবিজ্ঞান।",
      "English (Compulsory): ইংরেজি (বাধ্যতামূলক)",
    ],
  },
  {
    year: "Honours 3rd Year",
    books: [
      "Study of al-Tafsir: তাফসীর অধ্যয়ন (কুরআনের ব্যাখ্যা)",
      "Principles and History of Tafsir Literature: তাফসীর সাহিত্যের নীতি ও ইতিহাস",
      "Muslim Philosophy and Philosophers: মুসলিম দর্শন ও দার্শনিকগণ।",
      "Sufism and some Prominent Sufis and their Contribution: সুফিবাদ এবং কিছু বিশিষ্ট সূফি ও তাদের অবদান।",
      "Economic System in Islam: ইসলামে অর্থনৈতিক ব্যবস্থা।",
      "Study of Islamic Law, Personal Law and Law of Inheritance in Islam: ইসলামি আইন, ব্যক্তিগত আইন এবং ইসলামে উত্তরাধিকার আইনের অধ্যয়ন।",
      "Ethics and Values in Islam: ইসলামে নৈতিকতা ও মূল্যবোধ।",
      "History of Muslim World: মুসলিম জগতের ইতিহাস।",
    ],
  },
  {
    year: "Honours 4th Year",
    books: [
      "Principles and History of Hadith Literature - হাদীস সাহিত্যের মূলনীতি ও ইতিহাস (241803)",
      "Principles and History of Islamic Jurisprudence - ইসলামিক আইনশাস্ত্রের নীতি ও ইতিহাস (241805)",
      "Political System in Islam - ইসলামে রাজনৈতিক ব্যবস্থা (241807)",
      "Study of Major Religions of the World - বিশ্বের প্রধান ধর্ম অধ্যয়ন (241809)",
      "Banking and Insurance in Islam - ইসলামে ব্যাংকিং এবং বীমা (241811)",
      "Muslims' Contribution to Science & Technology - বিজ্ঞান ও প্রযুক্তিতে মুসলমানদের অবদান (241813)",
      "Islamic Civilization - ইসলামী সভ্যতা (241815)",
      "Human Rights in Islam - ইসলামে মানবাধিকার (241817)",
      "Viva-Voce - মৌখিক পরীক্ষা (241818)",
    ],
  },
];

const CourseCurriculum = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };


  useEffect(() => {
  AOS.init({ duration: 800 });
  }, [])

  return (
    <section className=" py-16 px-4 md:px-10 lg:px-16 font-bangla">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4 text-center">
          📝 কোর্স কারিকুলাম
        </h2>
           <p className="text-gray-700 text-lg text-center mb-12" data-aos="fade-up" data-aos-delay="100">
        আমাদের সকল ইয়ারের বুক লিস্ট এখানে দেওয়া আছে
        </p>

        <div className="space-y-4 max-w-4xl mx-auto">
          {courseData.map((yearData, index) => (
            <div
              key={index}
              className="bg-white rounded-lg  shadow-md overflow-hidden border border-blue-300 pb-5"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Header */}
              <button
                onClick={() => toggleIndex(index)}
                className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none"
              >
                <h3 className="text-xl font-semibold text-blue-800">
                  {yearData.year}
                </h3>
                <span className="text-2xl text-blue-500 select-none">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>

              {/* Content */}
              <div
                className={`px-6 pb-6 transition-max-height duration-500 ease-in-out overflow-hidden ${
                  activeIndex === index ? "max-h-screen" : "max-h-0"
                }`}
              >
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  {yearData.books.map((book, idx) => (
                    <li key={idx}>{book}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseCurriculum;
