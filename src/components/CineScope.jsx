import { useState } from "react";
import {
  Search,
  Star,
  Calendar,
  Clock,
  Users,
  Film,
  AlertCircle,
  Loader2,
} from "lucide-react";
import Footer from "./Footer";

const CineScope = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const fetchMovieData = async (movieTitle) => {
    setLoading(true);
    setError("");
    setMovieData(null);

    try {
      const apiKey = import.meta.env.VITE_MOVIE_API_KEY;
      const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(
        movieTitle
      )}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.Response === "False") {
        throw new Error(data.Error || "Movie not found");
      }

      setMovieData(data);
      setHasSearched(true);
    } catch (err) {
      setError(err.message);
      setHasSearched(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedSearch = searchTerm.trim();
    if (trimmedSearch) {
      fetchMovieData(trimmedSearch);
    } else {
      setError("Please enter a movie title");
    }
  };

  const formatRating = (rating) => {
    return rating && rating !== "N/A" ? parseFloat(rating).toFixed(1) : "N/A";
  };

  const formatGenres = (genres) => {
    if (!genres || genres === "N/A") return [];
    return genres
      .split(",")
      .map((genre) => genre.trim())
      .filter(Boolean);
  };

  const ErrorMessage = ({ message }) => (
    <div className="flex flex-col items-center justify-center py-16 space-y-4 animate-fade-in">
      <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-full">
        <AlertCircle className="w-16 h-16 text-red-500 dark:text-red-400" />
      </div>
      <div className="text-center">
        <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">
          Oops! Something went wrong
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">{message}</p>
      </div>
    </div>
  );

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center py-16 space-y-4 animate-fade-in">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-purple-200 dark:border-purple-800 rounded-full animate-spin border-t-purple-600 dark:border-t-purple-400"></div>
        <Film className="w-8 h-8 text-purple-600 dark:text-purple-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      <p className="text-gray-600 dark:text-gray-400 animate-pulse">
        Searching for your movie...
      </p>
    </div>
  );

  const WelcomeScreen = () => (
    <div className="flex flex-col items-center justify-center py-20 space-y-6 animate-fade-in">
      <div className="p-8 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-2xl">
        <Film className="w-24 h-24 text-purple-600 dark:text-purple-400 mx-auto animate-bounce" />
      </div>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Discover Amazing Movies
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md">
          Search for any movie and explore detailed information, ratings, cast,
          and more!
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900 transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-gray-200/20 dark:border-gray-700/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            {/* Logo */}
            <div className="flex items-center space-x-3 group">
              <div className="p-2 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl group-hover:scale-110 transition-transform duration-200">
                <Film className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                CineScope
              </h1>
            </div>

            {/* Search Form */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center space-x-2 w-full sm:w-auto"
            >
              <div className="relative flex-1 sm:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for movies..."
                  className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-slate-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2 hover:scale-105 active:scale-95 transform"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
                <span className="hidden sm:inline">Search</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading && <LoadingSpinner />}

        {error && !loading && <ErrorMessage message={error} />}

        {!hasSearched && !loading && <WelcomeScreen />}

        {movieData && !loading && !error && (
          <div className="grid lg:grid-cols-3 gap-8 animate-fade-in">
            {/* Movie Poster */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="group relative overflow-hidden rounded-2xl shadow-2xl bg-white dark:bg-slate-800 p-2">
                  {movieData.Poster && movieData.Poster !== "N/A" ? (
                    <img
                      src={movieData.Poster}
                      alt={movieData.Title}
                      className="w-full h-auto rounded-xl group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : (
                    <div className="w-full h-96 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-xl flex items-center justify-center">
                      <Film className="w-16 h-16 text-gray-400 dark:text-gray-600" />
                    </div>
                  )}
                  <div className="hidden w-full h-96 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-xl items-center justify-center">
                    <Film className="w-16 h-16 text-gray-400 dark:text-gray-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Movie Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title and Rating */}
              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {movieData.Title}
                </h2>
                <div className="flex flex-wrap items-center gap-4">
                  {movieData.imdbRating && movieData.imdbRating !== "N/A" && (
                    <div className="flex items-center space-x-1 bg-yellow-100 dark:bg-yellow-900/30 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-semibold text-yellow-700 dark:text-yellow-400">
                        {formatRating(movieData.imdbRating)}
                      </span>
                      <span className="text-sm text-yellow-600 dark:text-yellow-500">
                        /10
                      </span>
                    </div>
                  )}
                  {movieData.Year && (
                    <div className="flex items-center space-x-1 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <span className="font-medium text-blue-700 dark:text-blue-400">
                        {movieData.Year}
                      </span>
                    </div>
                  )}
                  {movieData.Runtime && movieData.Runtime !== "N/A" && (
                    <div className="flex items-center space-x-1 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                      <Clock className="w-4 h-4 text-green-500" />
                      <span className="font-medium text-green-700 dark:text-green-400">
                        {movieData.Runtime}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Genres */}
              {formatGenres(movieData.Genre).length > 0 && (
                <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Genres
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {formatGenres(movieData.Genre).map((genre, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/40 dark:to-blue-900/40 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium hover:scale-105 transition-transform duration-200"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Plot */}
              {movieData.Plot && movieData.Plot !== "N/A" && (
                <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Plot
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {movieData.Plot}
                  </p>
                </div>
              )}

              {/* Cast and Additional Info */}
              <div className="grid md:grid-cols-2 gap-6">
                {movieData.Actors && movieData.Actors !== "N/A" && (
                  <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                      <Users className="w-5 h-5" />
                      <span>Cast</span>
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {movieData.Actors}
                    </p>
                  </div>
                )}

                <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    {movieData.Director && movieData.Director !== "N/A" && (
                      <p>
                        <span className="font-medium text-gray-600 dark:text-gray-400">
                          Director:
                        </span>{" "}
                        <span className="text-gray-700 dark:text-gray-300">
                          {movieData.Director}
                        </span>
                      </p>
                    )}
                    {movieData.Language && movieData.Language !== "N/A" && (
                      <p>
                        <span className="font-medium text-gray-600 dark:text-gray-400">
                          Language:
                        </span>{" "}
                        <span className="text-gray-700 dark:text-gray-300">
                          {movieData.Language}
                        </span>
                      </p>
                    )}
                    {movieData.Country && movieData.Country !== "N/A" && (
                      <p>
                        <span className="font-medium text-gray-600 dark:text-gray-400">
                          Country:
                        </span>{" "}
                        <span className="text-gray-700 dark:text-gray-300">
                          {movieData.Country}
                        </span>
                      </p>
                    )}
                    {movieData.Type && (
                      <p>
                        <span className="font-medium text-gray-600 dark:text-gray-400">
                          Type:
                        </span>{" "}
                        <span className="text-gray-700 dark:text-gray-300 capitalize">
                          {movieData.Type}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CineScope;
