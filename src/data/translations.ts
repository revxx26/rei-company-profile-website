import dictionary from "./translations-id.json";
const entries: Record<string, string> = dictionary;
const months: Record<string,string> = { January:"Januari", February:"Februari", March:"Maret", April:"April", May:"Mei", June:"Juni", July:"Juli", August:"Agustus", September:"September", October:"Oktober", November:"November", December:"Desember" };
export function translate(value: string, language: "en" | "id"): string {
  if (language === "en" || !value.trim()) return value;
  const text = value.trim();
  let result = entries[text];
  if (!result) {
    result = text.replace(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/g, month => months[month]);
    const tr = (text: string) => translate(text, "id");
    result = result.replace(/^View (.+) details$/, (_, title) => `Lihat detail ${tr(title)}`)
      .replace(/^View details: (.+)$/, (_, title) => `Lihat detail: ${tr(title)}`)
      .replace(/^Enquire about (.+)$/, (_, title) => `Tanyakan ${tr(title)}`)
      .replace(/^Play video: (.+)$/, (_, title) => `Putar video: ${tr(title)}`)
      .replace(/^Show photo (\d+): (.+)$/, (_, n, title) => `Lihat foto ${n}: ${tr(title)}`)
      .replace(/^Photo (\d+) of (\d+): (.+)$/, (_, n, total, title) => `Foto ${n} dari ${total}: ${tr(title)}`)
      .replace(/^Show training slide (\d+) of (\d+)$/, "Lihat slide pelatihan $1 dari $2")
      .replace(/^Programs (.+)$/, "Program $1")
      .replace(/^Page (\d+)(?: of (\d+))?$/, (_, page, total) => `Halaman ${page}${total ? ` dari ${total}` : ""}`)
      .replace(/^Opens your email app with a draft addressed to (.+)\.$/, "Membuka aplikasi email dengan draf untuk $1.")
      .replace(/^(.+): original REI (cover|publication)(.*)$/, (_, title, type, suffix) => `${tr(title)}: ${type === "cover" ? "sampul" : "publikasi"} asli REI${suffix}`)
      .replace(/^(.+), page (\d+)$/, (_, title, page) => `${tr(title)}, halaman ${page}`)
      .replace(/^(.+) trainings and events$/, "$1 pelatihan dan kegiatan")
      .replace(/^Consultation: (.+)$/, (_, title) => `Konsultasi: ${tr(title)}`);
    result = result.replace(/\bof\b/g, "dari").replace(/\bpublications?\b/g, "publikasi").replace(/\bservices?\b/g, "layanan").replace(/\btraining agendas\b/g, "agenda pelatihan").replace(/\boffices\b/g, "kantor").replace(/\byears\b/g, "tahun");
  }
  return value.replace(text, result);
}
