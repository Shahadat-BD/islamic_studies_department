import React from "react";

const OurTeachers = () => {
  const teachers = [
    {
      name: "Md Mahbub Alahe",
      title: "বিভাগীয় প্রধান",
      qualification: "B.A (Hons.); M.A (Islamic Studies) University of Dhaka",
      bio: "তাফসীর, হাদীস ও আকীদাহ বিষয়ে ১০ বছরের অভিজ্ঞতা সম্পন্ন শিক্ষক।",
      image: "https://i.postimg.cc/56fdqHwh/elahi-sir.jpg",
    },
    {
      name: "Md Gulam Mahiuddin",
      title: "প্রভাষক",
      qualification: "Kamil (Fiqh), Dawra-e-Hadith",
      bio: "ইসলামি আইন ও ফিকহ বিষয়ে পারদর্শী এবং বহু সেমিনারে অংশগ্রহণকারী।",
      image: "https://i.postimg.cc/R3hv13zS/gualm-moin-uddin-sir.jpg",
    },
    {
      name: "Md Imam Hossen",
      title: "প্রভাষক",
      qualification: "M.A. in Islamic History, B.Ed",
      bio: "ইতিহাস ও ইসলামী সভ্যতার উপর বিশেষজ্ঞ এবং ছাত্রদের প্রিয় শিক্ষক।",
      image: "https://i.postimg.cc/GTx0nr1g/imam-sir.jpg",
    },
    {
      name: "Fazilat Begum",
      title: "প্রভাষক",
      qualification: "Kamil (Tafsir), M.A. in Islamic Studies",
      bio: "নারী শিক্ষার্থীদের জন্য বিশেষ ক্লাস পরিচালনায় অভিজ্ঞ।",
      image: "https://i.postimg.cc/Y9Mkfsx4/fazilat-madeum.jpg",
    },
  ];

  return (
    <section className="bg-gray-50 py-16 px-4 md:px-12 lg:px-20 font-bangla">
      <div className="max-w-7xl mx-auto text-center">
        {/* Section Heading */}
        <h2
          className="text-3xl md:text-4xl font-bold text-blue-900 mb-4"
          data-aos="fade-up"
        >
          👨‍🏫 আমাদের শিক্ষকবৃন্দ
        </h2>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto mb-[70px]" data-aos="fade-up" data-aos-delay="100">
          অভিজ্ঞ, আন্তরিক ও ইসলামি মূল্যবোধে গঠিত শিক্ষকগণ আমাদের গর্ব। শিক্ষার্থীদের নৈতিক ও একাডেমিক বিকাশে তাঁরা সদা নিবেদিত।
        </p>

        {/* Grid of Teachers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teachers.map((teacher, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-6 text-center"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <img
                src={teacher.image}
                alt={teacher.name}
                className="w-24 h-24 border-2 lg:-mt-16  border-blue-900 mx-auto rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-blue-900 mb-1">
                {teacher.name}
              </h3>
              <p className="text-sm text-blue-500 font-semibold mb-2 pb-1 border-b border-black">{teacher.title}</p>
              <p className="text-sm text-gray-500 mb-2">{teacher.qualification}</p>
              <p className="text-gray-700 text-sm leading-relaxed">{teacher.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeachers;
