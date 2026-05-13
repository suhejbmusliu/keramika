import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Headline from "./components/Headline";
import About from "./components/About";
import Craft from "./components/Craft";
import Rooms from "./components/Rooms";
import Materials from "./components/Materials";
import Process from "./components/Process";
import Gallery from "./components/Gallery";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import QuoteCTA from "./components/QuoteCTA";

export default function App() {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <>
      <Navbar onQuote={() => setQuoteOpen(true)} />
      <main>
        <Hero onQuote={() => setQuoteOpen(true)} />
        <Headline />
        <About />
        <Craft />
        <Rooms />
        <Materials />
        <Process />
        <Gallery />
        <Projects />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <QuoteCTA
        open={quoteOpen}
        onOpen={() => setQuoteOpen(true)}
        onClose={() => setQuoteOpen(false)}
      />
    </>
  );
}
