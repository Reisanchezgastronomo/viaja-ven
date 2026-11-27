/* VIAJA / Captura UTM local para conectar cuaderno y formulario SCI; sin datos personales. */
(()=>{"use strict";try{
 const key="sci-attribution-v1",p=new URLSearchParams(location.search);
 const saved=JSON.parse(sessionStorage.getItem(key)||"{}");
 if(saved&&typeof saved.landingPath==="string"&&saved.landingPath)return;
 const clean=(v,n=120)=>String(v||"").trim().slice(0,n);
 let host="";try{if(document.referrer)host=new URL(document.referrer).hostname}catch{}
 sessionStorage.setItem(key,JSON.stringify({product:"venezuela-en-una-taza",attributionSource:clean(p.get("utm_source")||host||"directo"),attributionMedium:clean(p.get("utm_medium")||"web"),attributionCampaign:clean(p.get("utm_campaign")),attributionContent:clean(p.get("utm_content")),landingPath:clean(location.pathname,200),referrerHost:clean(host)}));
 }catch{}})();
