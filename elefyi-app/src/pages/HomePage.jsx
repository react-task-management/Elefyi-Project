 
import "../styles/MainStyle.css"; // Import your custom CSS file
import HomeHero from "../components/HomeHero";
import HomeChart from "../components/HomeChart";
import HomeTasks from "../components/homeTasks";
import HomeArticles from "../components/HomeArticles";

function HomePage () {
    return (<>
        <div className="pageContainer2">
            <HomeHero/>
            <HomeTasks/>
            <HomeArticles/>
        </div>
      </> );
}

export default HomePage;


