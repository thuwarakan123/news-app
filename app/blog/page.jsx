'use client'

import { useEffect, useState } from "react";
import { fetchTopHeadlines } from "../utils/newsAPI";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");
  const [more, setMore]= useState(false);

  const handleNavigation = (articleUrl) => {
    window.open(articleUrl, '_blank');  
  };

  const loadNews = async () => {
    const data = await fetchTopHeadlines();
    if (data.length > 0) {
      setArticles(data);
    } 
    else {
      setError("Failed to load news. Please try again later.");
    }
  }

  useEffect(() => {
    loadNews();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 text-red-700 border border-red-400 px-4 py-3 rounded-md shadow-md">
          ⚠️ {error}
        </div>
      </div>
    );
  } 

  if (!error && articles.length === 0){
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-semibold text-gray-600 animate-pulse">
          ...Loading
        </div>
      </div>
    )  
  }

  return (
    <div className="px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800">Even Better</h1>
        <button
          onClick={() => setMore(!more)}
          className="text-gray-600 text-sm font-semibold hover:underline"
        >
          {more ? "Less" : "More"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {articles.slice(0, more ? articles.length : 8).map((article, index) => (
          <div 
           key={index} 
           className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer"
           onClick={() => handleNavigation(article.url)}
          >
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-900 group-hover:underline">
                {article.title}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                By {article.author || "Unknown"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  
}