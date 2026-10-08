import { Capabilities } from "@/components/capabilities";
import { DemoSection } from "@/components/demo-form";
import { Hero } from "@/components/hero";
import { Integration } from "@/components/integration";
import { ProductTour } from "@/components/product-tour";
import { Products } from "@/components/products";
import { RevealObserver } from "@/components/reveal-observer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <ProductTour />
        <Products />
        <Capabilities />
        <Integration />
        <DemoSection />
      </main>
      <SiteFooter />
      <RevealObserver />
    </>
  );
}
