"use client";
import { useRef, useState, type FormEvent } from "react";

type TazaCard = { key: string; profile: string; duration: string };
export default function CaptacionSCI({ card }: { card?: TazaCard }) {
 const eventId = useRef("");
 const previous = useRef("");
 const busy = useRef(false);
 const [status,setStatus] = useState<"idle"|"pending"|"ok"|"error"|"limited">("idle");
 async function submit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const form=e.currentTarget;
  if(busy.current) return;
  const data=Object.fromEntries(new FormData(form));
  if (card) {
   data.context = ["Venezuela en una taza", card.profile, data.context].filter(Boolean).join(" · ");
  }
  const fingerprint=JSON.stringify(data);
  if (!eventId.current || previous.current!==fingerprint) eventId.current=crypto.randomUUID();
  previous.current=fingerprint;busy.current=true;
  setStatus("pending");
  try {
   const response=await fetch("/api/sci/capture",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...data,eventId:eventId.current,source:"viaja"})});
   if(response.status===429) {setStatus("limited");return;}
   if(!response.ok) throw new Error("capture");
   setStatus("ok");
   if (!card) {form.reset();eventId.current="";window.location.assign("/venezuela-en-una-taza");}
  } catch {setStatus("error");} finally {busy.current=false;}
 }
 const input="mt-2 w-full rounded-lg border border-white/25 bg-[#0b1115] p-3 text-white";
 return <section className="mt-10 rounded-2xl border border-white/20 bg-[#142025] text-white p-7 sm:p-9">
 <h2 className="text-2xl font-semibold !text-white">¿Qué experiencia gastronómica te interesa?</h2>
 <p className="mt-3 text-sm text-[#b7c4bd]">Al completar el formulario recibirás inmediatamente, sin coste, tu tarjeta de viajero en PDF, basada en tus preferencias. Compartir estos datos es voluntario; no supone una reserva ni una suscripción comercial.</p>
 {card && status==="ok" ? <div className="mt-6 text-white" role="status">
  <p>Preferencias registradas. Tu recompensa está lista: descarga tu tarjeta personalizada según el perfil y la duración elegidos.</p>
  <a className="mt-4 inline-block rounded-full bg-[#bdd1c1] px-6 py-3 font-semibold text-[#102017]" href={`/cuadernos/taza/tarjetas/${card.key}.pdf`} download>Descargar ahora mi tarjeta PDF</a>
 </div> : <form onSubmit={submit} className="mt-6 grid gap-4">
 <label>Nombre<input name="name" required maxLength={120} autoComplete="name" className={input}/></label>
 <label>Correo electrónico<input name="email" type="email" required maxLength={254} autoComplete="email" className={input}/></label>
 <label>Ciudad / país<input name="market" required maxLength={120} className={input}/></label>
 <label>Duración prevista<input name="duration" defaultValue={card?.duration} readOnly={Boolean(card)} required maxLength={80} className={input}/></label>
 <label>¿Con quién viajarías?<input name="companions" required maxLength={80} className={input}/></label>
 <label>Experiencia preferida<select name="experience" defaultValue={card ? "Café" : ""} required className={input}><option value="">Seleccionar</option>{["Café","Cacao y chocolate","Panadería artesanal","Gastronomía tradicional","Productores rurales","Otra"].map(x=><option key={x}>{x}</option>)}</select></label>
 <label>Contexto adicional (opcional)<textarea name="context" maxLength={card ? 900 : 1000} className={input}/></label>
 <div hidden aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
 <label className="flex gap-3 text-sm"><input type="checkbox" name="consent" required value="yes"/>Autorizo el tratamiento de estos datos para conocer mis preferencias y responder a mi interés turístico. No implica suscripción a comunicaciones comerciales.</label>
 <details className="text-sm text-[#d5e0d8]"><summary className="cursor-pointer font-medium">Privacidad y tratamiento de datos</summary><p className="mt-2">Responsable: Rei Sánchez — Dirección Ejecutiva · Transformación · Autonomía. Los datos se utilizan para conocer preferencias turísticas y responder a tu interés; no constituyen una reserva. El registro se conserva en una base de acceso restringido mediante Google Sheets; la plataforma de alojamiento procesa la solicitud. Revisaremos la necesidad de conservar tus datos a los doce meses de la última interacción significativa y eliminaremos los que ya no sean necesarios, salvo obligaciones aplicables. No se incorpora tu correo a campañas ni al newsletter. Puedes solicitar acceso, corrección o eliminación escribiendo a <a className="underline" href="mailto:reisanchezgastronomo@gmail.com">reisanchezgastronomo@gmail.com</a>. Evita incluir datos sensibles o información confidencial de terceros.</p></details>
 <button type="submit" disabled={status==="pending"} className="rounded-full bg-[#bdd1c1] px-6 py-3 font-semibold text-[#102017] disabled:opacity-50">{status==="pending"?"Registrando…":"Registrar interés y recibir mi tarjeta"}</button>
 <p role="status">{status==="ok"?"Preferencias registradas. Abriendo tu cuaderno Venezuela en una taza…":status==="limited"?"Demasiadas solicitudes. Espera unos minutos antes de reintentar; tus datos siguen en el formulario.":status==="error"?"No se ha confirmado el registro. Puedes reintentar.":""}</p>
 </form>}</section>;
}
