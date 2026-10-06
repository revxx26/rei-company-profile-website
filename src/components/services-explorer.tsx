"use client";
import { Text, useLocale } from "@/components/site-preferences";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import { serviceAreas } from "@/data/services";
import { serviceDetails } from "@/data/service-details";
import { CopyDetailLink, clearDetailLink, setDetailLink, useDetailLink } from "@/components/detail-link";

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");
const entries = serviceAreas.flatMap((area) => area.services.map((service) => ({ ...service, area: area.title })));
type ServiceEntry = (typeof entries)[number];

export function ServicesExplorer() {
  const { t } = useLocale();
  const [selected, setSelected] = useState(serviceAreas[0].id);
  const [query, setQuery] = useState("");
  const [activeService, setActiveService] = useState<ServiceEntry | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const details = activeService ? serviceDetails[activeService.path] : null;

  useEffect(() => {
    if (!activeService) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeService]);

  const openDetails = (service: ServiceEntry) => {
    if (!dialog.current || dialog.current.open) return;
    setActiveService(service);
    dialog.current.showModal();
    dialog.current.scrollTop = 0;
    setDetailLink("service", service.path);
  };
  useDetailLink("service", (id) => {
    const service = entries.find((entry) => entry.path === id);
    if (!service) { dialog.current?.close(); return; }
    const area = serviceAreas.find((area) => area.services.some((entry) => entry.path === id));
    if (area) setSelected(area.id);
    setQuery("");
    if (!dialog.current?.open) {
      document.getElementById("layanan")?.scrollIntoView({ behavior: "instant", block: "start" });
      openDetails(service);
    } else setActiveService(service);
  });
  const closeDetails = () => dialog.current?.close();
  const area = serviceAreas.find((item) => item.id === selected) ?? serviceAreas[0];
  const terms = query.trim().split(/\s+/).map(normalize).filter(Boolean);
  const searching = terms.length > 0;
  const visible = searching
    ? entries.filter((entry) => terms.every((term) => normalize(`${entry.title} ${entry.scope} ${entry.keywords} ${entry.area} ${t(entry.title)} ${t(entry.scope)} ${t(entry.area)}`).includes(term)))
    : area.services.map((service) => ({ ...service, area: area.title }));

  return (
    <section className="section container services-explorer" id="layanan" aria-labelledby="services-title">
      <div className="services-heading">
        <div>
          <h2 id="services-title"><Text value={"Our Services"} /></h2>
        </div>
        <p><Text value={"Explore training, consultancy, audit and certification support for your industry."} /></p>
      </div>

      <div className="services-toolbar">
        <p><Text value={"Find the support you need."} /></p>
        <div className="services-search">
          <Search size={19} aria-hidden="true" />
          <input
            type="search"
            aria-label={t("Search services across all areas")}
            placeholder={t("Search services or standards")}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-controls="service-results"
          />
          {query && <button type="button" aria-label={t("Clear service search")} onClick={() => setQuery("")}><X size={17} /></button>}
        </div>
      </div>

      <div className="services-browser">
        <div className="services-areas" role="group" aria-label={t("Browse services by area")}>
          {serviceAreas.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={!searching && item.id === selected}
              aria-controls="service-results"
              onClick={() => { setSelected(item.id); setQuery(""); }}
            >
              <span><Text value={item.title} /></span><ArrowRight size={17} aria-hidden="true" />
            </button>
          ))}
        </div>

        <div className="services-results" id="service-results">
          <div className="services-area-intro">
            <div>
              <h3><Text value={searching ? "Search results" : area.title} /></h3>
              <p><Text value={searching ? "Matches across all areas of expertise." : area.description} /></p>
            </div>
            <span className="services-result-count" role="status" aria-live="polite" aria-atomic="true">
              <Text value={visible.length} /> <Text value={visible.length === 1 ? "service" : "services"} />
            </span>
          </div>

          {visible.length > 0 ? (
            <ul className="services-list">
              {visible.map((service) => (
                <li key={service.path}>
                  <button type="button" aria-label={t(`View ${service.title} details`)} aria-haspopup="dialog" onClick={() => openDetails(service)}>
                    <div>
                      <h4><Text value={service.title} /></h4>
                      <p><Text value={service.scope} /></p>
                      {searching && <span className="service-result-area"><Text value={service.area} /></span>}
                    </div>
                    <ArrowRight size={19} aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="services-empty">
              <h4><Text value={"No services found"} /></h4>
              <p><Text value={"Try a standard such as ISO 22000, or choose an area of expertise."} /></p>
              <button type="button" className="text-link" onClick={() => setQuery("")}><Text value={"Clear search "} /><ArrowRight size={16} /></button>
            </div>
          )}

        </div>
      </div>

      <div className="services-consultation">
        <div>
          <h3><Text value={"Not sure where to start?"} /></h3>
          <p><Text value={"Tell us your requirements. Our team can help you find the right service."} /></p>
        </div>
      </div>

      <dialog
        ref={dialog}
        className="service-detail-dialog"
        aria-labelledby="service-detail-title"
        aria-describedby="service-detail-summary"
        onClose={() => {
          if (activeService) clearDetailLink("service", activeService.path);
          setActiveService(null);
        }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeDetails();
        }}
      >
        <div className="service-detail-heading">
          <div>
            <h2 id="service-detail-title"><Text value={activeService?.title ?? "Service details"} /></h2>
            <p><Text value={activeService?.scope} /></p>
          </div>
          <button type="button" className="icon-button" aria-label={t("Close service details")} onClick={closeDetails} autoFocus><X size={22} /></button>
        </div>
        {details && (
          <div className="service-detail-content">
            <p id="service-detail-summary"><Text value={details.overview} /></p>
            {activeService && <CopyDetailLink key={activeService.path} kind="service" id={activeService.path} />}
            <div className="service-detail-audience">
              <h3><Text value={"Who it is for"} /></h3>
              <p><Text value={details.audience} /></p>
            </div>
            <div className="service-detail-focus">
              <h3><Text value={"Topics covered"} /></h3>
              <ul>{details.focus.map((item) => <li key={item}><Text value={item} /></li>)}</ul>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
