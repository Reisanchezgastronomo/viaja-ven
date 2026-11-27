import { notFound } from "next/navigation";
import CaptacionSCI from "@/components/CaptacionSCI";

const profiles = {
  origen: "Explorador de origen",
  sabor: "Explorador de sabores",
  cultura: "Explorador cultural",
  pausa: "Viajero contemplativo",
} as const;
const durations = ["Una o dos horas", "Medio día", "Un día o una escapada"];

export const metadata = {
  title: "Compartir preferencias · Venezuela en una taza",
  robots: { index: false, follow: true },
};

export default async function TazaPreferences({ params }: { params: Promise<{ tarjeta: string }> }) {
  const { tarjeta } = await params;
  const match = /^(origen|sabor|cultura|pausa)([123])$/.exec(tarjeta);
  if (!match) notFound();
  const profile = profiles[match[1] as keyof typeof profiles];
  const duration = durations[Number(match[2]) - 1];
  return <article className="mx-auto max-w-2xl px-5 pb-16 pt-28">
    <a className="underline" href="/venezuela-en-una-taza">← Venezuela en una taza</a>
    <h1 className="mt-5 text-3xl font-semibold">{profile}</h1>
    <p className="mt-2">{duration}</p>
    <CaptacionSCI card={{key: tarjeta, profile, duration}} />
  </article>;
}
