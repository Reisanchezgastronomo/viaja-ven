"use client";
import { useRef, useState, type FormEvent } from "react";

export default function CaptacionSCI() {
 const eventId = useRef("");
 const previous = useRef("");
 const busy = useRef(false);
 const [status,setStatus] = useState<"idle"|"pending"|"ok"|"error">("idle");
 async function submit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const form=e.currentTarget;
  if(busy.current) return;
  const data=Object.fromEntries(new FormData(form));
  const fingerprint=JSON.stringify(data);
  if (!eventId.current || previous.current!==fingerprint) eventId.current=crypto.randomUUID();
  previous.current=fingerprint;busy.current=true;
  setStatus("pending");
  try {
   const response=await fetch("/api/sci/capture",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...data,eventId:eventId.current,source:"viaja"})});
   if(!response.ok) throw new Error("capture");
   setStatus("ok");form.reset();eventId.current="";
  } catch {setStatus("error");} finally {busy.current=false;}
 }
 const input="mt-2 w-full rounded-lg border border-white/25 bg-[#0b1115] p-3 text-white";
 return <section className="mt-10 rounded-2xl border border-white/20 bg-[#142025] p-7 sm:p-9">
 <h2 className="text-2xl font-semibold !text-white">¿Qué experiencia gastronómica te interesa?</h2>
 <p className="mt-3 text-sm text-[#b7c4bd]">Ensayo de preferencias turísticas. No constituye reserva ni compra.</p>
 <form onSubmit={submit} className="mt-6 grid gap-4">
 <label>Nombre<input name="name" required maxLength={120} autoComplete="name" className={input}/></label>
 <label>Correo electrónico<input name="email" type="email" required maxLength={254} autoComplete="email" className={input}/></label>
 <label>Ciudad / país<input name="market" required maxLength={120} className={input}/></label>
 <label>Duración prevista<input name="duration" required maxLength={80} className={input}/></label>
 <label>¿Con quién viajarías?<input name="companions" required maxLength={80} className={input}/></label>
 <label>Experiencia preferida<select name="experience" required className={input}><option value="">Seleccionar</option>{["Café","Cacao y chocolate","Panadería artesanal","Gastronomía tradicional","Productores rurales","Otra"].map(x=><option key={x}>{x}</option>)}</select></label>
 <label>Contexto adicional (opcional)<textarea name="context" maxLength={1000} className={input}/></label>
 <div hidden aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
 <label className="flex gap-3 text-sm"><input type="checkbox" name="consent" required value="yes"/>Autorizo el tratamiento de estos datos para conocer mis preferencias y responder a mi interés turístico. No implica suscripción a comunicaciones comerciales.</label>
 <button type="submit" disabled={status==="pending"} className="rounded-full bg-[#bdd1c1] px-6 py-3 font-semibold text-[#102017] disabled:opacity-50">{status==="pending"?"Registrando…":"Registrar interés"}</button>
 <p role="status">{status==="ok"?"Preferencia registrada. Gracias por participar en el ensayo.":status==="error"?"No se ha confirmado el registro. Puedes reintentar.":""}</p>
 </form></section>;
}
