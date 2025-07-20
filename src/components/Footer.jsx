import { Heart, ExternalLink } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const authorName = "Mahesh";
  const authorUrl = "https://maheshhattimare.vercel.app/";
  return (
    <footer className="mt-16 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-t border-gray-200/20 dark:border-gray-700/20">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between space-y-2 sm:space-y-0 animate-fade-in">
          {/* Main Content */}
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              © {currentYear} Made with
            </span>
            <div className="animate-pulse">
              <Heart className="w-4 h-4 text-red-500 fill-current" />
            </div>
            <span className="text-gray-600 dark:text-gray-400">by</span>
            <a
              href={authorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-all duration-200 flex items-center space-x-1 group hover:scale-105 active:scale-95 transform"
            >
              <span>{authorName}</span>
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 transform group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Optional: All Rights Reserved (only on larger screens) */}
          <div className="hidden sm:block text-xs text-gray-500 dark:text-gray-500 animate-slide-up">
            All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
