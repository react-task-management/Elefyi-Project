 
import "../styles/MainStyle.css"; // Import your custom CSS file
import HomeHero from "../components/HomeHero";
import HomeChart from "../components/HomeChart";
import HomeTasks from "../components/homeTasks";

function HomePage () {
    return (<>
        <div className="pageContainer">
            <HomeHero/>
            <HomeTasks/>
        </div>
      </> );
}

export default HomePage;


