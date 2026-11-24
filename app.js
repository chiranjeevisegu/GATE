const books = [
 {id:"aiml", name:"AI & Machine Learning", icon:"AI", chapters:[5,6], desc:"Learn how models fit data, how search finds solutions, and how AI reasons under uncertainty."},
 {id:"dsa", name:"Data Structures & Algorithms", icon:"{ }", chapters:[3,4], desc:"Trace Python programs, analyze algorithms, and work through SQL and data warehousing."},
 {id:"math", name:"Maths & Problems", icon:"ƒ", chapters:[0,1,2,7], desc:"Build fluency in probability, linear algebra, calculus, and General Aptitude."}
];
const sourceGuide = [
 ["MIT OCW · probability", "https://ocw.mit.edu/courses/6-041sc-probabilistic-systems-analysis-and-applied-probability-fall-2013/"],
 ["MIT OCW · linear algebra", "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/"],
 ["MIT OCW · single-variable calculus", "https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/"],
 ["MIT OCW · algorithms", "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/"],
 ["PostgreSQL · SQL tutorial", "https://www.postgresql.org/docs/current/tutorial-sql.html"],
 ["Stanford CS229 · lecture notes", "https://cs229.stanford.edu/main_notes.pdf"],
 ["UC Berkeley CS188 · AI textbook", "https://inst.eecs.berkeley.edu/~cs188/textbook/"],
 ["IIT Madras · GATE GA syllabus", "https://gate2027.iitm.ac.in/static/doc/GATE2027_Syllabus/GA_GATE2027_Syllabus.pdf"]
];
const lessons = groups.flatMap((group, chapter) => group.lessons.map((lesson, index) => {
 const [shortcut, problem, solution, formula, visual] = drills[chapter][index].split("|");
 return {...lesson, detail:deeper[chapter][index], chapter, group:group.title, book:books.find(b=>b.chapters.includes(chapter)), shortcut, problem, solution, formula, visual:visual.split(" → ")};
}));
const syllabus = "https://gate2027.iitm.ac.in/static/doc/GATE2027_Syllabus/DA_GATE2027_Syllabus.pdf";
const official = "https://gate2026.iitg.ac.in/doc/download/";
const main = document.querySelector("main");
let saved = {};
try { saved = JSON.parse(localStorage.getItem("gate-da-handbook-v1") || "{}") || {}; } catch {}
const escape = value => String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[char]);
const href = lesson => "#" + lesson.book.id + "/" + lesson.id;
const external = (title, url) => `<a href="${escape(url)}" target="_blank" rel="noopener noreferrer">${escape(title)} ↗</a>`;
const groupLessons = index => lessons.filter(lesson => lesson.chapter === index);
const buttonLink = (title, target, primary = false) => `<a class="button${primary ? " primary" : ""}" href="${target}">${title}</a>`;
function page(title, intro, label = "") {
 return `<header>${label ? `<div class="eyebrow">${label}</div>` : ""}<h1>${title}</h1><p class="muted">${intro}</p></header>`;
}
function home() {
 const done = lessons.filter(lesson=>saved[lesson.id]).length;
 main.innerHTML = `<section class="hero"><div class="eyebrow">Data Science &amp; Artificial Intelligence · DA</div>
 <h1>Study for GATE DA.</h1><p>Three handbooks with clear explanations, worked examples, visual walkthroughs, and past papers.</p>
 <div class="row">${buttonLink("Start diagnostic →","#exam/diagnostic")}</div></section>
 <section class="section"><h2>Your handbooks</h2><div class="cards">${books.map(book => {
   const entries = lessons.filter(lesson => lesson.book === book);
   return `<article class="card"><div class="tile-icon" aria-hidden="true">${book.icon}</div><h3>${book.name}</h3><p>${book.desc}</p><p class="label">${entries.length} lessons</p>${buttonLink("Open handbook →", "#"+book.id)}</article>`;
 }).join("")}</div><div class="stats"><progress value="${done}" max="${lessons.length}" aria-label="Study progress"></progress><span>${done} of ${lessons.length} lessons completed</span></div></section>
 <section class="section"><h2>Start studying</h2><div class="row">${buttonLink("Practice problems", "#practice", true)}${buttonLink("Past papers", "#papers")}${buttonLink("Formulas & shortcuts", "#revision")}${buttonLink("Build a study plan", "#plan")}${buttonLink("Mistake notebook", "#notebook")}</div></section>`;

}
function bookView(book, lesson) {
 const entries = lessons.filter(entry=>entry.book === book);
 const toc = book.chapters.map(index=>`<details ${!lesson || lesson.chapter === index ? "open" : ""}><summary>${escape(groups[index].title)}</summary>${groupLessons(index).map(entry=>`<a href="${href(entry)}" ${entry === lesson ? 'aria-current="page"' : ""}>${saved[entry.id] ? "✓ " : ""}${escape(entry.title)}</a>`).join("")}</details>`).join("");
 main.innerHTML = `<a href="#home">← All handbooks</a>${page(book.name, book.desc)}
 <div class="layout"><aside class="toc panel" aria-label="Table of contents"><h2>Table of contents</h2>${toc}</aside>
 ${lesson ? lessonView(lesson, entries) : `<section class="chapter-list">${book.chapters.map(index=>`<article class="panel"><h3>${escape(groups[index].title)}</h3><p class="muted">${groupLessons(index).length} lessons</p>${buttonLink("Start chapter →", href(groupLessons(index)[0]))}</article>`).join("")}</section>`}</div>`;
 if (!lesson) return;
 bindQuestions(document.querySelector("#lesson-questions"));
 activateDemo(lesson);
 document.querySelector("#complete").addEventListener("click", event=>{
   saved[lesson.id] = !saved[lesson.id];
   try { localStorage.setItem("gate-da-handbook-v1",JSON.stringify(saved)); } catch {}
   event.currentTarget.textContent = saved[lesson.id] ? "✓ Completed" : "Mark complete";
   event.currentTarget.setAttribute("aria-pressed", Boolean(saved[lesson.id]));
   document.querySelector(".toc a[aria-current]").textContent = (saved[lesson.id] ? "✓ " : "") + lesson.title;
 });
 const steps = [...document.querySelectorAll(".step")];
 const advance = document.querySelector("#advance");
 const reset = document.querySelector("#reset");
 let stage = 0;
 function drawStep() {
   steps.forEach((step,index)=> {
     step.classList.toggle("current", index===stage);
     if (index===stage) step.setAttribute("aria-current","step");
     else step.removeAttribute("aria-current");
   });
   document.querySelector("#step-status").textContent = `Step ${stage+1} of ${steps.length}`;
   advance.disabled = stage===steps.length-1;
   reset.disabled = stage===0;
 }
 advance.addEventListener("click",()=>{ stage++; drawStep(); });
 reset.addEventListener("click",()=>{ stage=0; drawStep(); });
 drawStep();
 const slider = document.querySelector("#demo-range");
 if (slider) {
   const draw = () => drawChart(lesson,Number(slider.value));
   slider.addEventListener("input",draw);
   draw();
 }
}
const demoConfig = {
 "bayes-theorem": ["Defect prevalence (%)",1,60,10],
 "dimensionality-reduction-and-principal-component-analysis-pca": ["Projection angle (degrees)",0,90,30],
 "maxima-minima-and-single-variable-optimization": ["Position × 10",0,30,15]
};
function plot(lesson) {
 const config = demoConfig[lesson.id];
 if (!config) return "";
 const [label,min,max,value] = config;
 return `<figure class="figure"><figcaption><strong>Explore the visual</strong></figcaption>
 <canvas class="chart" id="chart" width="520" height="190" role="img" aria-label="${escape(lesson.title)} visualization"></canvas>
 <label for="demo-range">${label}</label> <input id="demo-range" type="range" min="${min}" max="${max}" value="${value}"> <output for="demo-range" id="demo-value"></output></figure>`;
}
function drawChart(lesson, value) {
 const c = document.querySelector("#chart").getContext("2d");
 const out = document.querySelector("#demo-value");
 c.clearRect(0,0,520,190);
 c.font="14px system-ui";
 c.fillStyle="#52645e";
 const line = (x,y,u,v,color,width=2) => {
   c.beginPath(); c.moveTo(x,y); c.lineTo(u,v); c.strokeStyle=color; c.lineWidth=width; c.stroke();
 };
 if (lesson.id==="bayes-theorem") {
   const positive = .8*value;
   const falsePositive = .1*(100-value);
   const posterior = 100*positive/(positive+falsePositive);
   c.fillText("Share of positive tests",28,38);
   c.fillStyle="#14856a"; c.fillRect(28,56,posterior*4.55,44);
   c.fillStyle="#d29234"; c.fillRect(28+posterior*4.55,56,(100-posterior)*4.55,44);
   c.fillStyle="#12654f"; c.fillText("■ True positives",28,131);
   c.fillStyle="#80560e"; c.fillText("■ False positives",220,131);
   out.textContent=`${value}% prevalence · ${posterior.toFixed(1)}% posterior (80% sensitivity, 10% false-positive rate)`;
 } else if (lesson.id.startsWith("dimensionality")) {
   const angle=value*Math.PI/180, ux=Math.cos(angle), uy=Math.sin(angle);
   const points=[[-4,-.5],[-3,.45],[-2,-.65],[0,.6],[2,-.6],[3,.7],[4,0]];
   line(30,95,490,95,"#b6c7c1",1); line(260,15,260,175,"#b6c7c1",1);
   line(260-78*ux,95+78*uy,260+78*ux,95-78*uy,"#087057",3);
   const projected = points.map(([x,y])=>x*ux+y*uy);
   points.forEach(([x,y],i)=>{
     const sx=260+16*x, sy=95-16*y, p=16*projected[i];
     line(sx,sy,260+p*ux,95-p*uy,"#b6c7c1",1);
     c.beginPath(); c.arc(sx,sy,4,0,2*Math.PI); c.fillStyle="#334c8b"; c.fill();
   });
   const mean=projected.reduce((a,b)=>a+b,0)/points.length;
   const variance=projected.reduce((total,p)=>total+(p-mean)**2,0)/points.length;
   out.textContent=`${value}° · projected population variance ${variance.toFixed(2)}`;
 } else {
   const x=value/10, f=t=>t*t-2*t, sx=t=>45+140*t, sy=t=>126-33*t;
   line(40,sy(0),488,sy(0),"#b6c7c1",1);
   for(let i=1;i<=60;i++) line(sx((i-1)/20),sy(f((i-1)/20)),sx(i/20),sy(f(i/20)),"#087057");
   [0,1,2,3].forEach(t=>c.fillText(t,sx(t)-4,184));
   c.beginPath(); c.arc(sx(x),sy(f(x)),6,0,2*Math.PI); c.fillStyle="#334c8b"; c.fill();
   out.textContent=`x = ${x.toFixed(1)} · f(x) = ${f(x).toFixed(2)}`;
 }
}
function lessonView(lesson, entries) {
 const index=entries.indexOf(lesson);
 const sources=[...(lesson.id==="python-programming-fundamentals" ? [["Python documentation · tutorial","https://docs.python.org/3/tutorial/"]] : []),sourceGuide[lesson.chapter],...lesson.links];
 return `<article class="panel article"><div class="eyebrow">${escape(lesson.group)} · Lesson ${index+1} of ${entries.length}</div>
 <h2>${escape(lesson.title)}</h2><h3>Definition and method</h3><p class="intro">${escape(lesson.intro)}</p>
 <h3>How it works</h3><p>${escape(lesson.detail)}</p><h3>Key formula or rule</h3><code class="formula">${escape(lesson.formula)}</code>
 <h2>Worked example</h2><p>${escape(lesson.example)}</p>${plot(lesson)}${additionalDemo(lesson)}
 <figure class="figure"><figcaption><strong>Visual walkthrough</strong> <span class="muted">· practice example</span></figcaption>
 <div class="steps">${lesson.visual.map((step,i)=>`<div class="step"><small>${i+1}</small>${escape(step)}</div>`).join("")}</div>
 <div class="row"><button class="button" id="advance">Next step</button><button class="button" id="reset">Reset</button><span id="step-status" aria-live="polite"></span></div></figure>
 <h2>Exam shortcut</h2><p>${escape(lesson.shortcut)}.</p>
 <h2>Try it yourself</h2>${question(lesson,false)}
 ${relatedBlock(lesson)}
 <div class="sources"><h3>Read further</h3><ul>${sources.map(([label,url])=>`<li>${external(label,url)}</li>`).join("")}</ul></div>
 <div class="row"><button class="button primary" id="complete" aria-pressed="${Boolean(saved[lesson.id])}">${saved[lesson.id] ? "✓ Completed" : "Mark complete"}</button>
 ${entries[index-1] ? buttonLink("← Previous lesson",href(entries[index-1])) : ""}
 ${entries[index+1] ? buttonLink("Next lesson →",href(entries[index+1])) : ""}</div></article>`;
}
function question(lesson, full = true) {
 return `<div class="${full ? "panel" : ""}">${full ? `<div class="label">${escape(lesson.group)}</div><h3><a href="${href(lesson)}">${escape(lesson.title)}</a></h3>` : ""}
 <p>${escape(lesson.problem)}</p><details class="answer"><summary>Show solution</summary><p>${escape(lesson.solution)}</p></details></div>`;
}
function render(focus=false) {
 const [route,id,sectionId]=location.hash.slice(1).split("/");
 const book=books.find(b=>b.id===route);
 if (book) bookView(book,lessons.find(l=>l.book===book&&l.id===id));
 else if (!studyRoute(route,id)) home();
 const section=book ? "home" : route==="exam" ? (id==="diagnostic" ? "plan" : "papers") : route==="notebook" ? "plan" : route || "home";
 document.querySelectorAll(".top nav a").forEach(a=>{
   if (a.hash==="#"+section) a.setAttribute("aria-current","page");
   else a.removeAttribute("aria-current");
 });
 if (focus && route!=="main") {
   window.scrollTo(0,0);
   main.focus({preventScroll:true});
 }
 if(sectionId==="practice") document.querySelector("#lesson-questions")?.scrollIntoView();
}

