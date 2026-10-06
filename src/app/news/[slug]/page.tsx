import { Text } from "@/components/site-preferences";
import type { Metadata } from "next";
import { LocalizedImage as Image, LocalizedNav } from "@/components/localized-elements";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Header, ConsultationButton } from "@/components/site-interactions";
import { publications } from "@/data/publications";

const news = publications.filter((item) => item.category === "News");
export function generateStaticParams() { return news.map((item) => ({ slug: item.id })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = news.find((entry) => entry.id === slug);
  return { title: item ? `${item.title} | REI Sistem Indonesia` : "News | REI Sistem Indonesia", description: item?.summary };
}

export default async function NewsArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = news.find((entry) => entry.id === slug);
  if (!item) notFound();
  return <>
    <Header innerPage />
    <main id="main-content" className="news-article-page">
      <article className="container news-article">
        <LocalizedNav aria-label="Breadcrumb" className="news-breadcrumb"><Link href="/"><Text value={"Home"} /></Link><span><Text value={"/"} /></span><Link href="/#insights"><Text value={"News"} /></Link></LocalizedNav>
        <div className="news-article-heading"><h1><Text value={item.title} /></h1><p><Text value={item.summary} /></p><div className="news-article-byline"><span><Text value={"REI Sistem Indonesia Group"} /></span><span><Text value={item.dateContext} /><Text value={": "} /><time dateTime={item.date}><Text value={item.dateLabel} /></time></span></div></div>
        <figure className="news-article-cover"><Image src={item.image} alt="Stage at the REI Key Client Gathering 2026" width={1248} height={740} sizes="(max-width: 760px) 100vw, 90vw" preload /><figcaption><Text value={"REI Key Client Gathering 2026. Photo: REI Sistem Indonesia Group."} /></figcaption></figure>
        <div className="news-article-body">
          {item.article?.map((paragraph, index) => <section key={index}>{paragraph.heading && <h2><Text value={paragraph.heading} /></h2>}<p><Text value={paragraph.text} /></p></section>)}
          <figure className="news-article-gallery"><Image src="/images/gathering-2.jpg" alt="Participants at REI’s client gathering" width={1200} height={800} sizes="(max-width: 760px) 90vw, 760px" /><figcaption><Text value={"The REI client community at the 2026 gathering."} /></figcaption></figure>
          <p><Text value={"Explore more photographs in our "} /><Link href="/#tentang"><Text value={"About REI gallery"} /></Link> <Text value={"or watch the gathering highlights in "} /><Link href="/#videos"><Text value={"Videos & Media"} /></Link><Text value={"."} /></p>
          <Link href="/#insights" className="text-link news-back"><ArrowLeft size={17} /><Text value={"Back to News & Publications"} /></Link>
        </div>
      </article>
    </main>
    <footer className="news-article-footer container"><Link href="/"><Text value={"REI Sistem Indonesia Group"} /></Link><span><Text value={"© 2026 PT REI Sistem Indonesia Group."} /></span></footer>
    <ConsultationButton className="floating-contact" label="Contact REI Sistem" shortLabel="Consultation" iconOnly />
  </>;
}
