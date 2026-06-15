import { createFileRoute } from "@tanstack/react-router";
import { Navigation } from "@/components/Navigation";
import { SakuraHero } from "@/components/SakuraHero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Journey } from "@/components/Journey";
import { Works } from "@/components/Works";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Paola Barbuto Ferraiuolo — Visual Communication & Content Designer" },
      {
        name: "description",
        content:
          "Portfolio of Paola Barbuto Ferraiuolo. Visual stories with structure, softness and clarity — social design, presentations, content strategy and editorial illustration.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-background text-foreground">
      <Navigation />
      <SakuraHero />
      <About />
      <Services />
      <Journey />
      <Works />
      <Contact />
      <Footer />
    </main>
  );
}
