export async function fetchTopHeadlines() {
    const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
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