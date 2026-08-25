import BackgroundMesh from "@/components/BackgroundMesh";
import WireframeCanvas from "@/components/WireframeCanvas";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import About from "@/components/About";
import Investments from "@/components/Investments";
import ResearchGrid from "@/components/ResearchGrid";
import Engineering from "@/components/Engineering";
import TeamGrid from "@/components/TeamGrid";
import NewsletterModal from "@/components/NewsletterModal";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <BackgroundMesh />
      <WireframeCanvas />
      <Nav />
      <Hero />
      <Ticker />
      <About />
      <Investments />
      <ResearchGrid />
      <Engineering />
      <TeamGrid />
      <Footer />
      <NewsletterModal />
    </>
  );
}
