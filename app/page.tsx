import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollScenes } from "@/components/ScrollScenes";
import { TrackClicks } from "@/components/TrackClicks";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Manifest } from "@/components/sections/Manifest";
import { Fleet } from "@/components/sections/Fleet";
import { Scenarios } from "@/components/sections/Scenarios";
import { Terms } from "@/components/sections/Terms";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Trust } from "@/components/sections/Trust";
import { Contacts, Footer } from "@/components/sections/Contacts";
import { ContactDock } from "@/components/ContactDock";

/**
 * Порядок секций (BRIEF_REDESIGN §2): шапка → hero → манифест → автопарк →
 * сценарии → условия → как это работает → почему мы + FAQ → финал → футер.
 * Якоря #top, #fleet, #terms, #how, #contacts сохранены с прошлой версии.
 */
export default function Page() {
  return (
    <>
      <SmoothScroll />
      <ScrollScenes />
      <TrackClicks />
      <a href="#fleet" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[400] focus:bg-[#2e6b52] focus:px-5 focus:py-3 focus:text-[#e8e2d6]">
        Перейти к автопарку
      </a>
      <Header />
      <main>
        <Hero />
        <Manifest />
        <Fleet />
        <Scenarios />
        <Terms />
        <HowItWorks />
        <Trust />
        <Contacts />
      </main>
      <Footer />
      <ContactDock />
    </>
  );
}
