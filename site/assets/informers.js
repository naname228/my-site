"use strict";
(() => {
  const clock = document.getElementById("city-clock");
  const dateLabel = document.getElementById("city-date");
  const calendar = document.getElementById("calendar");
  const zone = "Europe/Moscow";
  const timeFormat = new Intl.DateTimeFormat("ru-RU", {timeZone:zone,hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false});
  const dateFormat = new Intl.DateTimeFormat("ru-RU", {timeZone:zone,day:"numeric",month:"long",year:"numeric"});
  let lastDate = "";
  function calendarFor(now) {
    const parts = new Intl.DateTimeFormat("en-GB", {timeZone:zone,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(now);
    const get = key => Number(parts.find(p => p.type === key).value);
    const year=get("year"), month=get("month"), today=get("day");
    const first=(new Date(Date.UTC(year,month-1,1)).getUTCDay()+6)%7;
    const days=new Date(Date.UTC(year,month,0)).getUTCDate();
    const names=["Пн","Вт","Ср","Чт","Пт","Сб","Вс"];
    const table=document.createElement("table"); table.className="calendar";
    const cap=document.createElement("caption");
    cap.textContent=new Intl.DateTimeFormat("ru-RU",{timeZone:zone,month:"long",year:"numeric"}).format(now); table.append(cap);
    const thead=document.createElement("thead"), hr=document.createElement("tr");
    names.forEach(name=>{const th=document.createElement("th");th.scope="col";th.textContent=name;hr.append(th)});thead.append(hr);table.append(thead);
    const body=document.createElement("tbody");
    for(let slot=0;slot<Math.ceil((first+days)/7)*7;slot++){
      if(slot%7===0)body.append(document.createElement("tr"));
      const td=document.createElement("td"),day=slot-first+1;
      if(day>0&&day<=days){td.textContent=String(day);if(day===today)td.setAttribute("aria-current","date")}
      body.lastChild.append(td);
    }
    table.append(body);calendar.replaceChildren(table);
  }
  function update(){
    const now=new Date();clock.textContent=timeFormat.format(now);clock.dateTime=now.toISOString();
    const label=dateFormat.format(now);dateLabel.textContent=label;
    if(label!==lastDate){calendarFor(now);lastDate=label}
  }
  if(clock&&dateLabel&&calendar){update();window.setInterval(update,1000)}
})();
