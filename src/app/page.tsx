import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Map } from "@/components/Map";
import { Platform } from "@/components/Platform";
import { Closer } from "@/components/Closer";
import { Footer } from "@/components/Footer";
import { PhotoBand } from "@/components/PhotoBand";
import { photos } from "@/data/content";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PhotoBand photo={photos.capitolMusic} />
        <Problem />
        <PhotoBand photo={photos.graffitiPark} />
        <Map />
        <PhotoBand photo={photos.mosaic} />
        <Platform />
        <PhotoBand photo={photos.farmersMarket} />
        <Closer />
      </main>
      <Footer />
    </>
  );
}
