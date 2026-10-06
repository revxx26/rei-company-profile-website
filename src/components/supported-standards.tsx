import { Text } from "@/components/site-preferences";
import Image from "next/image";
import standards from "@/data/standards.json";

const orderedNames = [
  "ISO", "BRCGS", "FSPCA", "PCQI", "FDQI", "EHEDG", "BAP", "GSA", "IFS",
  "BPOM", "ISPO", "SMK3", "LCA", "ILW", "URSA", "RSPO", "PECB", "SNI",
  "GlobalGAP", "Ecovadis", "PROPER", "GGL", "Kemnaker", "K3", "FOTS",
  "YUM!", "MUI", "Organik Indonesia", "USDA Organic", "RAF",
];
const logos = orderedNames.map((name) => standards.find((logo) => logo.name === name)!);
const rows = [logos.slice(0, 15), logos.slice(15)];

export function SupportedStandards() {
  return (
    <section
      className="standards-section"
      aria-labelledby="standards-title"
    >
      <div className="container standards-heading">
        <h2 id="standards-title"><Text value={"Supported and Certified by"} /></h2>
      </div>
      <div className="standards-rails">
        {rows.map((row, index) => (
          <div className="standards-rail" key={index}>
            <div className={`standards-track ${index === 1 ? "reverse" : ""}`}>
              {[false, true].map((duplicate) => (
                <div className="standards-group" aria-hidden={duplicate || undefined} key={String(duplicate)}>
                  {row.map((logo) => (
                    <div className="standards-logo" key={logo.name}>
                      <Image
                        src={`/images/standards/${logo.file}`}
                        alt={duplicate ? "" : logo.name}
                        width={logo.width}
                        height={logo.height}
                        sizes="130px"
                        loading="eager"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
