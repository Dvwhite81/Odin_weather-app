(()=>{let t;const e=e=>{t=0,e.preventDefault();const a=document.getElementById("search-input"),o=a.value;a.value="",n(o)},n=async t=>{t=/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(t)?`zip=${t},us`:`q=${t}`;const e=await a(t);c(e);const n=`lat=${e.coord.lat}&lon=${e.coord.lon}`,r=await o(n);s(r)},a=async t=>{const e=`https://api.openweathermap.org/data/2.5/weather?${t}&appid=90896309f65adc38c814061d0ba7a858&units=imperial`;return await r(e,t)},o=async t=>{const e=`https://api.openweathermap.org/data/2.5/forecast?${t}&appid=90896309f65adc38c814061d0ba7a858&units=imperial`;return await r(e,t)},r=async(e,a)=>{try{const o=await fetch(e);if(!o.ok){if(t++,t>2)throw Error;let e=a.split(",")[0];a=e.split("=")[1],n(a)}return await o.json()}catch(t){console.error("ERROR",t),alert("Try a different city")}},c=t=>{const e=t.name,n=t.main.temp+"°F",a=t.weather[0].description,o=`http://openweathermap.org/img/w/${t.weather[0].icon}.png`;document.getElementById("city-name").textContent=e,document.getElementById("current-temp").textContent=n,document.getElementById("current-description").textContent=a,document.getElementById("current-icon").src=o},s=t=>{const[e,n,a]=[t.list[3],t.list[5],t.list[7]];e.timeName="Tomorrow 6:00 am",n.timeName="Tomorrow 12:00 pm",a.timeName="Tomorrow 6:00 pm",document.querySelector(".forecast-results").innerHTML="",[e,n,a].forEach((t=>i(t)))},i=t=>{const e=t.timeName,n=t.main.temp+"°F",a=t.weather[0].description,o=`http://openweathermap.org/img/w/${t.weather[0].icon}.png`,r=document.querySelector(".forecast-results"),c=m("div",{className:"forecast-time"}),s=m("h3",{className:"forecast-name",textContent:e}),i=m("h4",{className:"forecast-temp",textContent:n}),p=m("p",{className:"forecast-description",textContent:a}),d=m("img",{className:"current-icon",src:o});c.append(s,i,p,d),r.append(c)},m=(t,e)=>{const n=document.createElement(t);for(const t in e)n[t]=e[t];return n};(()=>{const t=document.querySelector("svg"),n=document.getElementById("search-input");setTimeout((()=>{t.style.backgroundColor="white",n.setAttribute("placeholder","Enter a city or zip")}),4e3),document.getElementById("form").addEventListener("submit",e)})()})();