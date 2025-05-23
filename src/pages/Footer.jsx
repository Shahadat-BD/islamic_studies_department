import logo from '../assets/islamicStudieslogo.png'
const Footer = () => {
  return (
    <footer className="bg-gray-900 lg:text-left text-center text-gray-200 pt-12 pb-6 font-bangla">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo & About */}
        <div>
          <img
            src={logo}
            alt="Department Logo"
            className="w-20 lg:mx-0 mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold mb-2">আরবি এবং ইসলামিক স্টাডিজ</h2>
          <p className="text-sm leading-6">
            ইসলামী জ্ঞান অর্জনের পবিত্র লক্ষ্যে আমরা অঙ্গীকারবদ্ধ। আমাদের বিভাগ আধুনিক ও ধর্মীয় শিক্ষার সমন্বয় করে গঠিত।
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b-2 border-white lg:w-20 w-1/3 lg:mx-0 mx-auto">দ্রুত লিংক</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:underline">হোম</a></li>
            <li><a href="/all-teacher-list" className="hover:underline">শিক্ষক তালিকা</a></li>
            <li><a href="/all-routine-list" className="hover:underline">রুটিন</a></li>
            <li><a href="/my-result" className="hover:underline">রেজাল্ট</a></li>
            <li><a href="/show-notice" className="hover:underline">নোটিশ</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b-2 border-white lg:w-20 w-1/3 lg:mx-0 mx-auto">যোগাযোগ</h3>
          <ul className="space-y-2 text-sm">
            <li>ইমেইল: islamicdept@email.com</li>
            <li>ফোন: ০১৭xxxxxxxx</li>
            <li>ঠিকানা: আরবি ও ইসলামিক স্টাডিজ বিভাগ, সরকারি সিটি কলেজ, চট্টগ্রাম। বাংলাদেশ</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b-2 border-white lg:w-32 w-1/3 lg:mx-0 mx-auto">সোশ্যাল মিডিয়া</h3>
          <div className="flex gap-4 text-xl lg:w-full w-1/4 lg:mx-0 mx-auto">
            <a href="https://web.facebook.com/groups/648040018658958"
               target='_blank'
               className="hover:text-blue-400">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-sky-400">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-pink-400">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-red-500">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm">
        <p>© {new Date().getFullYear()} আরবি এবং ইসলামিক স্টাডিজ. সর্বস্বত্ব সংরক্ষিত।</p>
        <p className="mt-1">Developed by <a href="https://web.facebook.com/md.shahadat.hossain.977941/" target="_blank" className="text-blue-400 hover:underline">Md Shahadat Hossain</a></p>
      </div>
    </footer>
  );
};

export default Footer;
