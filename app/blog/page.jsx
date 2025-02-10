'use client'

import { useEffect, useState } from "react";
import { fetchTopHeadlines } from "../utils/newsAPI";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");

  const loadNews = async () => {
    const data = await fetchTopHeadlines();
    if (data.length > 0) {
      setArticles(data);
      console.log(data)
    } else {
      setError("Failed to load news. Please try again later.");
    }
  }

  useEffect(() => {
    loadNews();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!error && articles.length === 0){
    return <div className='m-auto font bold'>...loading</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold ml-5 my-5">Even Better</h1>
      <div className="m-10">
      <div className="grid grid-cols-4 gap-8">
        {articles.map((article, index) => (
          <div key={index}>
            {article.urlToImage && (
              <img src={article.urlToImage} alt={article.title} />
            )}
            <h2 classname="font-bold">{article.title}</h2>
            <p>By {article.author || "Unknown"}</p>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}