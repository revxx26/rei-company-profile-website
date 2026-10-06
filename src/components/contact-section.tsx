"use client";
import { Text, useLocale } from "@/components/site-preferences";
import { SiteSelect } from "@/components/site-select";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { ConsultationButton } from "@/components/site-interactions";

const emailAddresses = { email1: "admin1@reisistem.id", email2: "admin2@reisistem.id" };
const office = encodeURIComponent("REI Sistem Building Center, Devant Business Loft RW1 No. 17, Kota Wisata, Nagrak, Gunung Putri, Bogor");

export function ContactSection() {
  const { t } = useLocale();
  const [channel, setChannel] = useState("whatsapp");
  const [recipient, setRecipient] = useState<keyof typeof emailAddresses>("email1");

  function continueMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const topic = String(data.get("topic"));
    const company = String(data.get("company")).trim();
    const body = `${t("Hello REI Sistem team,")}\n\n${String(data.get("message")).trim()}\n\n${t("Name")}: ${String(data.get("name")).trim()}\nEmail: ${String(data.get("email")).trim()}${company ? `\n${t("Company")}: ${company}` : ""}\n${t("Topic")}: ${t(topic)}`;
    if (channel === "whatsapp") {
      window.open(`https://wa.me/6281286578798?text=${encodeURIComponent(body)}`, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = `mailto:${emailAddresses[recipient]}?subject=${encodeURIComponent(`${t("Enquiry")}: ${t(topic)}`)}&body=${encodeURIComponent(body)}`;
    }
  }

  return (
    <section className="contact-section container" id="kontak" aria-labelledby="contact-title">
      <div className="contact-layout">
        <div className="contact-intro">
          <h2 id="contact-title"><Text value={"Contact us"} /></h2>
          <p><Text value={"Tell us which standard, training or certification your company needs. Our team can help you with the next steps."} /></p>
          <ConsultationButton className="button button-navy contact-consultation" label="Start a consultation" />
          <div className="contact-office">
            <h3><Text value={"Head office"} /></h3>
            <address><Text value={"REI Sistem Building Center"} /><br /><Text value={"Kota Wisata, Devant Business Loft"} /><br /><Text value={"RW1 No. 17, Nagrak, Gunung Putri"} /><br /><Text value={"Bogor, West Java"} /></address>
            <a className="contact-map-link" href={`https://www.google.com/maps/search/?api=1&query=${office}`} target="_blank" rel="noopener noreferrer"><MapPin size={16} /><Text value={"View on Google Maps"} /><ArrowUpRight size={16} /></a>
          </div>
        </div>
        <div className="contact-divider"><span><Text value={"or"} /></span></div>
        <form className="contact-form" onSubmit={continueMessage}>
          <h3><Text value={"Send an enquiry"} /></h3>
          <div className="contact-form-fields">
            <label><Text value={"Your name"} /><input name="name" autoComplete="name" required maxLength={100} /></label>
            <label><Text value={"Your email"} /><input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
            <label><Text value={"Company "} /><span className="field-optional"><Text value={"(optional)"} /></span><input name="company" autoComplete="organization" maxLength={150} /></label>
            <label><Text value={"Enquiry topic"} /><SiteSelect label={t("Enquiry topic")} name="topic" defaultValue="General enquiry" options={["General enquiry", "Training", "Consultancy", "Audit & inspection", "Certification"].map((value) => ({ value, label: t(value) }))} /></label>
            <label className="contact-field-wide"><Text value={"Your message"} /><textarea name="message" rows={4} required maxLength={1800} placeholder={t("Tell us about your requirements.")} /></label>
            <label className={channel === "whatsapp" ? "contact-field-wide" : ""}><Text value={"Contact via"} /><SiteSelect label={t("Contact via")} value={channel} onChange={setChannel} options={[{ value: "whatsapp", label: t("WhatsApp") }, { value: "email", label: t("Email") }]} /></label>
            {channel === "email" && <label><Text value={"Send to"} /><SiteSelect label={t("Send to")} value={recipient} onChange={(value) => setRecipient(value as keyof typeof emailAddresses)} options={[{ value: "email1", label: t("Email 1") }, { value: "email2", label: t("Email 2") }]} /></label>}
          </div>
          <button className="button button-navy contact-form-submit" type="submit"><Text value={channel === "whatsapp" ? "Continue to WhatsApp" : "Continue to email"} /><ArrowUpRight size={18} /></button>
          <p className="contact-form-note"><Text value={channel === "whatsapp" ? "Opens WhatsApp with your message ready to send." : `Opens your email app with a draft addressed to ${emailAddresses[recipient]}.`} /></p>
        </form>
      </div>
    </section>
  );
}
