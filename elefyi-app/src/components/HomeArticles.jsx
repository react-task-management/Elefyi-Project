import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function HomeArticles() {
    const navigate = useNavigate();
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
        
      <div className="bg min-h-screen">
        <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(0, 3).map((article, index) => (
            <article key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={article.image_url} alt={article.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{article.title}</h2>
                <p className="text-gray-600 mt-2">{article.description} <a href={article.link} style={{color:"blue"}} >read more</a></p>
                <p className="text-gray-500 mt-4 text-sm">
                  By {article.author} - {article.read_time}
                </p>
              </div>
            </article>
          ))}
        </main>

        <div className="flex justify-center py-6">
          <button id="blue-btn"
            onClick={() => navigate("/articles")}
            className="bg-[#05b0d6] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0490b5] transition duration-300"
          >
            See More Articles
          </button>
        </div>
      </div>

    )
}

export default HomeArticles;