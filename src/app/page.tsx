import BackgroundMesh from "@/components/BackgroundMesh";
import WireframeCanvas from "@/components/WireframeCanvas";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import ResearchGrid from "@/components/ResearchGrid";
import WorkshopGrid from "@/components/WorkshopGrid";
import EventList from "@/components/EventList";
import TeamGrid from "@/components/TeamGrid";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <BackgroundMesh />
      <WireframeCanvas />
      <Nav />
      <Hero />
      <Ticker />
      <ResearchGrid />
      <WorkshopGrid />
      <EventList />
      <TeamGrid />
      <Footer />
    </>
  );
}
