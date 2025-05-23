import { FaUserGraduate, FaBriefcase, FaGlobe, FaUsers } from "react-icons/fa";
import CountUp from "react-countup";

const SuccessHighlights = () => {
  const stats = [
    {
      icon: <FaUserGraduate size={60} />,
      title: "মোট শিক্ষার্থী",
      value: 500,
      suffix: "+",
      bg: "bg-blue-500",
    },
    {
      icon: <FaBriefcase size={60} />,
      title: "সরকারি চাকরিপ্রাপ্ত",
      value: 200,
      suffix: "+",
      bg: "bg-orange-500",
    },
    {
      icon: <FaGlobe size={60} />,
      title: "বিদেশে অধ্যয়নরত",
      value: 50,
      suffix: "+",
      bg: "bg-sky-500",
    },
    {
      icon: <FaUsers size={60} />,
      title: "অ্যালামনাই সদস্য",
      value: 300,
      suffix: "+",
      bg: "bg-green-500",
    },
  ];

  return (
    <div className="py-12 lg:-mt-32 z-20 relative -mt-6 lg:px-20 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 font-bangla">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className={`${item.bg} text-white rounded px-6 py-8 text-center shadow-md hover:shadow-xl transition-all`}
            data-aos="zoom-in"
            data-aos-delay={idx * 100}
          >
            <div className="mb-3 flex justify-center gap-5 text-left">
                <p className=''>  {item.icon} </p>
              <div>
                <h3 className="text-3xl font-bold">
                  <CountUp end={item.value} duration={5} suffix={item.suffix} />
                </h3>
                <p className="mt-1 text-lg font-semibold">{item.title}</p>
              </div>
            </div>
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuccessHighlights;
