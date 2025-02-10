export async function fetchTopHeadlines() {
    const apiKey = process.env.PUBLIC_NEWS_API_KEY || "f5ff3c279c7b464e88e596795d69b7e8";
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }
      const data = await response.json();
      return data.articles;
    } 
    catch (error) {
      console.error("Error fetching news:", error);
      return [];
    }
  }