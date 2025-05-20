import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    image: "https://i.ibb.co/21cRP2fR/dept-1.jpg",
    title: "Arabic & Islamic Studies Department",
    subtitle: "Explore the light of knowledge and faith",
  },
  {
    id: 2,
    image: "https://i.ibb.co/Z66q8HQX/dept-main.jpg",
    title: "Honours Program",
    subtitle: "National University of Bangladesh",
  },
  {
    id: 3,
    image: "https://i.ibb.co/JFbZcdqd/dept-main-1.jpg",
    title: "Guided by Knowledge & Spirituality",
    subtitle: "Learn with purpose and piety",
  },
  {
    id: 4,
    image: "https://i.ibb.co/YT1Bh1KM/dept-4.jpg",
    title: "Welcome to Our Department",
    subtitle: "A journey through Arabic and Islamic legacy",
  },
];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative lg:h-[90vh] h-[80vh] overflow-hidden font-english">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          {/* Overlay with gradient and blur */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent flex items-center justify-center text-white px-4">
            <div className="text-center max-w-3xl backdrop-blur-sm bg-black/30 p-6 md:p-10 rounded-xl shadow-lg">
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-snug drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl font-light mb-6 drop-shadow">
                {slide.subtitle}
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-2">
                <a
                  href="/all-routine-list"
                  className="bg-white text-blue-900 font-semibold px-6 py-2 rounded-full hover:bg-gray-200 transition-all duration-300 shadow-md"
                >
                  📅 View Routine
                </a>
                <a
                  href="/all-teacher-list"
                  className="bg-transparent border border-white font-semibold px-6 py-2 rounded-full hover:bg-white hover:text-blue-900 transition-all duration-300 shadow-md"
                >
                  👨‍🏫 Explore Teachers
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroBanner;
