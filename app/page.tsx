import {
  AiSecurity,
  ContactSection,
  Hero,
  HowWeWork,
  IntroducingSection,
  ProductsSection,
  SaasProducts,
  ServicePlans,
} from "@/components";

export default function Home() {
  return (
    <>
      <Hero />
      <SaasProducts />
      <IntroducingSection />
      <AiSecurity />
      <HowWeWork />
      <ServicePlans />
      <ProductsSection />
      <ContactSection />
    </>
  );
}
