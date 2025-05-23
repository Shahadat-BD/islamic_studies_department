  import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const StudentTestimonials = () => {

  useEffect(() => {
  AOS.init({ duration: 800 });
}, []);


  const testimonials = [
    {
      name: "মুহাম্মদ আবদুল্লাহ নূরী",
      year: "অনার্স ৩য় বর্ষ",
      image: "https://i.ibb.co/VY6qSKQy/nuri.jpg",
      feedback:
        "এই বিভাগের শিক্ষাব্যবস্থা অত্যন্ত গঠনমূলক। শিক্ষকরা আন্তরিকভাবে আমাদের দিকনির্দেশনা দেন, এবং ক্লাসের পরিবেশ খুবই অনুপ্রাণনামূলক।",
    },
    {
      name: "মোহাম্মদ রিদোয়ান",
      year: "অনার্স ৪র্থ বর্ষ",
      image: "https://i.ibb.co/YB6Fy9c3/reduwan.jpg",
      feedback:
        "লাইব্রেরি, আইসিটি ল্যাব ও সেমিনারসহ সব সুযোগ-সুবিধা খুব ভালো। ইসলামি পরিবেশে পড়ালেখা করে আত্মিক প্রশান্তি পাই।",
    },
    {
      name: "মামুনুর রশিদ মামুন",
      year: "অনার্স ২য় বর্ষ",
      image: "https://i.ibb.co/VcnghZsd/mamun.jpg",
      feedback:
        "এই বিভাগে পড়ে আমি নিজের মধ্যে আত্মবিশ্বাস ও নৈতিক উন্নয়ন অনুভব করছি। এখানকার শিক্ষকেরা আমাদের ভবিষ্যৎ গড়তে আন্তরিকভাবে সহযোগিতা করেন।",
    },
  ];
  
  return (
    <section className="bg-gray-100 py-16 px-4 md:px-12 lg:px-20 font-bangla">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
          🌟 শিক্ষার্থীদের মতামত
        </h2>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto mb-12">
          পুরাতন শিক্ষার্থীদের মতামত আমাদের গর্ব ও ভবিষ্যৎ শিক্ষার্থীদের অনুপ্রেরণা।
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 border-l-4 border-blue-500 text-left"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
                />
                <div>
                  <h4 className="font-semibold text-blue-800">{item.name}</h4>
                  <p className="text-sm text-gray-500">{item.year}</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{item.feedback}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentTestimonials;
