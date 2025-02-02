import React, { useEffect, useState } from "react";
import axios from "axios";

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("https://react-project-f71d3-default-rtdb.firebaseio.com/article.json"); // Replace with the URL of your JSON file
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="pageContainer">

    <div className="bg-gray-100 min-h-screen">
      <header className="bg-[#05b0d6] text-white rounded-[20px] py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold">The Marketer's Last Mile</h1>
          <p className="text-lg mt-2">Follow the best stories and insights on the art of managing your tasks and time effectively</p>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <article key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img 
              src={article.image_url} 
              alt={article.title} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{article.title}</h2>
              <p className="text-gray-600 mt-2">
                {article.description}
                <a href={article.link} style={{color:"blue"}} >read more</a>
              </p>
              <p className="text-gray-500 mt-4 text-sm">By {article.author} - {article.read_time}</p>
            </div>
          </article>
        ))}
      </main>
    </div>
    </div>
  );
};

export default ArticlesPage;