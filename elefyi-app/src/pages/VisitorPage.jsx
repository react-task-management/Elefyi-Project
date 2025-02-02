import "../styles/MainStyle.css";
import HeroVisitorPage from "../components/HeroVisitorPage";
import Features from "../components/FeaturesVisitorPage";
import TopSection from "../components/TopSectionVisitor";
import ReviewsSection from "../components/ReviewsSection";
import StepsSection from "../components/StepsSection";
import CtaSection from "../components/ctaSectionVisitor";
import Footer from "../components/footer";

function VisitorPage() {
  return (
    <>
    <TopSection/>
    <HeroVisitorPage/>
    <Features/>
    <ReviewsSection/>
    <StepsSection/>
    <CtaSection/>
    <Footer/>
    </>
  );
}

export default VisitorPage;