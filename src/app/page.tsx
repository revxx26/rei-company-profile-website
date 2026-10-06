import { Text } from "@/components/site-preferences";
import { HomeHero } from "@/components/home-hero";
import { SupportedStandards } from "@/components/supported-standards";
import { AboutGallery } from "@/components/about-gallery";
import { CompanyProfileLink, VideoHighlights, VideoPlayerProvider } from "@/components/video-highlights";
import { CompanyStats } from "@/components/company-stats";
import { ServicesExplorer } from "@/components/services-explorer";
import { TrainingAgenda } from "@/components/monthly-training-agenda";
import { NewsPublications } from "@/components/news-publications";
import { ContactSection } from "@/components/contact-section";
import { SocialLinks } from "@/components/social-links";
import { LocalizedAnchor } from "@/components/localized-elements";
import Image from "next/image";
import {
  Sparkles,
} from "lucide-react";
import {
  ConsultationButton,
  Header,
  Reveal,
} from "@/components/site-interactions";

export default function Home() {
  return (
    <VideoPlayerProvider>
      <Header />
      <main id="main-content">
        <HomeHero />
        <SupportedStandards />
        <section
          className="section container about-section"
          id="tentang"
          aria-labelledby="about-title"
        >
          <Reveal className="about-visual">
            <AboutGallery />
            <div className="about-caption">
              <p>
                <strong><Text value={"Respect. Excellence. Improvement."} /></strong>
                <br />
                <Text value={"The values that guide our work."} /></p>
            </div>
          </Reveal>
          <div className="about-copy">
            <h2 id="about-title"><Text value={"Why REI?"} /></h2>
            <p>
              <Text value={"PT REI Sistem Indonesia Group provides training, consultancy, audit and certification support across industry standards and management systems."} /></p>
            <p>
              <Text value={"Our expertise covers food safety, quality, sustainability, occupational safety and laboratory management."} /></p>
            <ul className="about-points">
              <li>
                <Text value={"Support across management systems and standards"} /></li>
              <li>
                <Text value={"Public and in-house training options"} /></li>
              <li>
                <Text value={"Offices in Bogor, Sidoarjo and Medan"} /></li>
            </ul>
            <CompanyProfileLink />
          </div>
        </section>
        <CompanyStats />
        <VideoHighlights />
        <ServicesExplorer />
        <TrainingAgenda />
        <NewsPublications />
        <ContactSection />
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <LocalizedAnchor
                href="#"
                className="brand"
                aria-label="REI Sistem Indonesia, back to top"
              >
                <Image
                  src="/images/rei-logo.png"
                  width={60}
                  height={60}
                  alt=""
                />
                <span>
                  <Text value={"REI SISTEM"} /><small><Text value={"INDONESIA GROUP"} /></small>
                </span>
              </LocalizedAnchor>
              <p>
                <Text value={"Providing Global Recognition"} /><br />
                <Text value={"and Improvement Systems."} /></p>
            </div>
            <div>
              <h3><Text value={"Explore"} /></h3>
              <ul>
                <li>
                  <a href="#layanan"><Text value={"Services"} /></a>
                </li>
                <li>
                  <a href="#training"><Text value={"Trainings & Events"} /></a>
                </li>
                <li>
                  <a href="#insights"><Text value={"News & insights"} /></a>
                </li>
                <li>
                  <a href="#tentang"><Text value={"About REI"} /></a>
                </li>
                <li>
                  <a href="#kontak"><Text value={"Contact us"} /></a>
                </li>
              </ul>
            </div>
            <div>
              <h3><Text value={"Follow REI Sistem"} /></h3>
              <SocialLinks />
            </div>
            <div>
              <h3><Text value={"Branch offices"} /></h3>
              <p>
                <strong><Text value={"Sidoarjo & Eastern Indonesia"} /></strong>
                <br />
                <Text value={"Ruko Citra Harmoni, Chi Walk"} /><br />
                <Text value={"Marina 3, Taman, Sidoarjo"} /></p>
              <p>
                <strong><Text value={"Medan & Western Indonesia"} /></strong>
                <br />
                <Text value={"Medan, North Sumatra"} /></p>
              <a className="footer-phone" href="tel:+6282276502448">
                <Text value={"+62 822-7650-2448"} /></a>
            </div>
          </div>
          <div className="footer-bottom">
            <span><Text value={"© 2026 PT REI Sistem Indonesia Group."} /></span>
            <span className="concept-label">
              <Sparkles size={13} /> <Text value={"Redesign concept · for review"} /></span>
          </div>
        </div>
      </footer>
      <ConsultationButton
        className="floating-contact"
        label="Contact REI Sistem"
        shortLabel="Consultation"
        iconOnly
      />
    </VideoPlayerProvider>
  );
}


