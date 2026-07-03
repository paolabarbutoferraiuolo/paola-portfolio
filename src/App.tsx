import { Navigation } from "@/components/Navigation";
import { SakuraHero } from "@/components/SakuraHero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Journey } from "@/components/Journey";
import { Works } from "@/components/Works";
import { Illustrations } from "@/components/Illustrations";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function App() {
  return (
    <main className="bg-background text-foreground">
      <Navigation />
      <SakuraHero />
      <About />
      <Services />
      <Journey />
      <Works />
      <Illustrations />
      <Contact />
      <Footer />
    </main>
  );
}
