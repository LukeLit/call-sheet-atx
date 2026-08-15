import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Platform } from "@/components/Platform";
import { Ask } from "@/components/Ask";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <Platform />
        <Ask />
      </main>
      <Footer />
    </>
  );
}
