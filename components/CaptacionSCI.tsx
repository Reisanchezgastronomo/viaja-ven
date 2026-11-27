"use client";
import { useRef, useState, type FormEvent } from "react";
import { captureAttribution, sciEvent } from "../lib/sci-attribution";
type TazaCard={key:string;profile:string;duration:string};
const input="mt-2 w-full rounded-lg border border-white/25 bg-[#0b1115] p-3 text-white";
export default function CaptacionSCI({card}:{card?:TazaCard}){
 const eventId=useRef("");const previous=useRef("");const busy=useRef(false);
 const [status,setStatus]=useState<"idle"|"pending"|"ok"|"error"|"limited">("idle");
 async function submit(e:FormEvent<HTMLFormElement>){
  e.preventDefault();
  const form=e.currentTarget;if(busy.current)return;
  const data=Object.fromEntries(new FormData(form));
  if(card)data.context=["Venezuela en una taza",card.profile,data.context].filter(Boolean).join(" · ");
  const attribution=captureAttribution("venezuela-en-una-taza");
  const fingerprint=JSON.stringify({...data,...attribution,card:card?.key||""});
  if(!eventId.current||previous.current!==fingerprint)eventId.current=crypto.randomUUID();
  previous.current=fingerprint;busy.current=true;setStatus("pending");
  try{
   const response=await fetch("/api/sci/capture",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...data,...attribution,eventId:eventId.current,source:"viaja",followupOptin:data.followupOptin==="yes"?"yes":""})});
   if(response.status===429){setStatus("limited");return;}
   if(!response.ok)throw new Error("capture");
   setStatus("ok");sciEvent("generate_lead","venezuela-en-una-taza");
   if(!card){form.reset();eventId.current="";window.location.assign("/venezuela-en-una-taza");}
  }catch{setStatus("error");}finally{busy.current=false;}
 }
 return <section className="mt-10 rounded-2xl border border-white/20 bg-[#142025] text-white p-7 sm:p-9">
  <h2 className="text-2xl font-semibold !text-white">{card?"Tu tarjeta de viajero está cerca":"Descubre tu manera de viajar"}</h2>
  <p className="mt-3 text-sm text-[#b7c4bd]">{card?"Al registrar tus preferencias recibirás inmediatamente y sin coste tu tarjeta PDF del perfil y duración elegidos.":"Al completar el formulario recibirás inmediatamente y sin coste el cuaderno interactivo «Venezuela en una taza»."} Participar es voluntario; no supone una reserva ni una suscripción comercial.</p>
  {card&&status==="ok"?<div className="mt-6 text-white" role="status">
    <p>Preferencias registradas. Tu recompensa está lista. Puedes guardar el PDF y regresar a VIAJA cuando quieras.</p>
    <a className="mt-4 inline-block rounded-full bg-[#bdd1c1] px-6 py-3 font-semibold text-[#102017]" href={`/cuadernos/taza/tarjetas/${card.key}.pdf`} download onClick={()=>sciEvent("sci_reward_download","venezuela-en-una-taza")}>Descargar ahora mi tarjeta PDF</a>
   </div>:<form onSubmit={submit} className="mt-6 grid gap-4">
    <label>Correo electrónico<input name="email" type="email" required maxLength={254} autoComplete="email" className={input}/></label>
    <label>Experiencia que te interesa<select name="experience" defaultValue={card?"Café":""} required className={input}><option value="">Seleccionar</option>{["Café","Cacao y chocolate","Panadería artesanal","Gastronomía tradicional","Productores rurales","Otra"].map(x=><option key={x}>{x}</option>)}</select></label>
    {card?<label>Duración del recorrido<input name="duration" defaultValue={card.duration} readOnly required maxLength={80} className={input}/></label>:null}
    <details className="rounded-xl border border-white/15 p-4"><summary className="cursor-pointer text-sm text-[#bdd1c1]">Personalizar preferencias (opcional)</summary><div className="mt-4 grid gap-3">
      <label>Nombre<input name="name" maxLength={120} autoComplete="name" className={input}/></label>
      <label>Ciudad / país<input name="market" maxLength={120} className={input}/></label>
      {!card?<label>Duración prevista<input name="duration" maxLength={80} className={input}/></label>:null}
      <label>¿Con quién viajarías?<input name="companions" maxLength={80} className={input}/></label>
      <label>Qué te gustaría descubrir<textarea name="context" maxLength={card?900:1000} className={input}/></label>
    </div></details>
    <div hidden aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
    <label className="flex gap-3 text-sm"><input type="checkbox" name="consent" required value="yes"/>Autorizo el tratamiento de estos datos para registrar mis preferencias y entregar mi recompensa.</label>
    <label className="flex gap-3 text-sm text-[#b7c4bd]"><input type="checkbox" name="followupOptin" value="yes"/>Quiero recibir noticias sobre futuras experiencias gastronómicas. Es opcional.</label>
    <details className="text-sm text-[#d5e0d8]"><summary className="cursor-pointer font-medium">Privacidad y tratamiento de datos</summary><p className="mt-2">Responsable: Rei Sánchez — Dirección Ejecutiva · Transformación · Autonomía. Las preferencias se registran en una hoja privada para entregar el recurso y conocer el interés por futuras experiencias. No equivalen a una reserva. Sin autorización adicional no se enviarán campañas comerciales. Revisión de conservación tras doce meses sin interacción significativa. Puedes solicitar acceso, rectificación o eliminación escribiendo a <a className="underline" href="mailto:reisanchezgastronomo@gmail.com">reisanchezgastronomo@gmail.com</a>. No incluyas información sensible o confidencial.</p></details>
    <button type="submit" disabled={status==="pending"} className="rounded-full bg-[#bdd1c1] px-6 py-3 font-semibold text-[#102017] disabled:opacity-50">{status==="pending"?"Registrando…":(card?"Registrar y recibir mi tarjeta":"Registrar y recibir mi cuaderno")}</button>
    <p role="status">{status==="ok"?"Preferencias confirmadas; abriendo el cuaderno…":status==="limited"?"Demasiadas solicitudes. Inténtalo más adelante.":status==="error"?"No hemos podido verificar el registro. Puedes reintentar sin perder los datos.":""}</p>
   </form>}
  </section>;
}
