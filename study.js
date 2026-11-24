const studyKey = "gate-da-study-v1";
function readStudy() {
 try { return JSON.parse(localStorage.getItem(studyKey)) || {}; }
 catch { return {}; }
}
const restored = readStudy();
const study = {
 attempts: restored.attempts || {},
 mistakes: restored.mistakes || {},
 diagnostic: restored.diagnostic || null,
 plan: restored.plan || null,
 exam: restored.exam || null,
 review: restored.review || null,
 flash: restored.flash || {}
};
function persistStudy() {
 try { localStorage.setItem(studyKey, JSON.stringify(study)); } catch {}
}
const day = 86400000;
const numericPattern = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i;
const letter = index => "ABCD"[index];
const topicName = id => id.split("-").map(word => word === "sql" ? "SQL" : word === "er" ? "ER" : word).join(" ");
const lessonAt = (chapter,index) => lessons.find(l => l.id === groups[chapter].lessons[index]?.id);
const extraTopicLessons = {
 "python-programming":["python-code-tracing"],"sql":["joins-and-grouping"],
 "continuous-distributions":["distribution-selection"],"discrete-distributions":["distribution-selection"],
 "inference":["choosing-hypothesis-tests"],"data-interpretation":["charts-and-mensuration"],
 "geometry-mensuration":["charts-and-mensuration"],"grammar-vocabulary":["reading-and-grammar"],
 "reading-comprehension":["reading-and-grammar"],"logical-reasoning":["deduction-and-analogy"],
 "spatial-aptitude":["rotations-and-folding"]
};
const past = Object.entries(paperIndex).flatMap(([year,entries]) => entries.map(([number,type,marks,key,subject,tag,pdfPage,solution]) => {
 const [chapter,...indices] = topicLessons[tag];
 const related = [...indices.map(index=>lessonAt(chapter,index)),...(extraTopicLessons[tag] || []).map(id=>lessons.find(l=>l.id===id))];
 const explanation = pyqs.find(item=>item[0]===Number(year) && item[1]===number);
 const paper = papers.find(item=>item[0]===Number(year));
 const pdf = official+paper[2];
 return {
  id:`p-${year}-${number}`,year:Number(year),number,type,marks,subject,tag,chapter,related,
  title:`GATE DA ${year} · Q${number}`, level:"Past paper",
  pdf, questionUrl:pdf+"#page="+pdfPage,
  solutionUrl:solution ? "https://iaeacademy.in"+solution : "",
  explanation:explanation?.[4] || "", label:explanation?.[3] || topicName(tag),
  answer:key === "MTA" ? "MTA" : type==="NAT" ? key.split(" to ").map(Number) : key.replace(/[^A-D]/g,"")
 };
}));
const graded = examDrills.map(([chapter,index,type,prompt,options,answer,explanation],i)=>{
 const lesson=lessonAt(chapter,index);
 return {id:"g-"+i,chapter,related:[lesson],title:lesson.title,type,prompt,options,answer,explanation,marks:2,level:"Exam level"};
});
const recallDrills = lessons.map((lesson,i)=>{
 const alternatives=lessons.filter(l=>l.chapter===lesson.chapter && l!==lesson && l.formula!==lesson.formula).slice(0,3);
 const options=alternatives.map(l=>l.formula);
 const position=i%4;
 options.splice(position,0,lesson.formula);
 return {
  id:"r-"+lesson.id,chapter:lesson.chapter,related:[lesson],title:lesson.title, type:"MCQ",marks:1,level:"Foundation",
  prompt:"Which rule belongs to this topic?",options,answer:letter(position),explanation:lesson.detail
 };
});
const questions = new Map([...past,...graded,...recallDrills].map(q=>[q.id,q]));
const coverageLabels = groups.map(g=>g.title);
function scoreQuestion(q, raw) {
 if(q.answer==="MTA") return {status:"Marks to all",points:q.marks};
 if(raw==null || (typeof raw==="string"&&!raw.trim()) || (Array.isArray(raw)&&!raw.length)) return {status:"Skipped",points:0};
 const answers=Array.isArray(q.answer) ? q.answer : [];
 const value=Number(raw);
 const exact=q.type==="NAT"
   ? validAnswer(q,String(raw).trim()) && value>=answers[0] && value<=(answers[1]??answers[0])
   : (Array.isArray(raw)?raw.slice().sort().join(""):raw)===q.answer;
 return exact ? {status:"Correct",points:q.marks} : {status:"Incorrect",points:q.type==="MCQ" ? -q.marks/3:0};
}
function recordAttempt(q,result,raw,guessed=false) {
 const previous=study.attempts[q.id];
 study.attempts[q.id]={status:result.status,count:(previous?.count||0)+1,correct:(previous?.correct||0)+(result.status==="Correct"),date:Date.now(),raw};
 if(result.status!=="Correct" && result.status!=="Marks to all" || guessed) {
   const existing=study.mistakes[q.id];
   study.mistakes[q.id]={reason:existing?.reason || (guessed?"Guessed":result.status),due:Date.now()+day};
 } else if (study.mistakes[q.id]) {
   study.mistakes[q.id].due=Date.now()+7*day;
 }
}
function answerText(q) {
 if(q.answer==="MTA") return "Marks to all";
 if(q.type==="NAT") return q.answer.length===1 || q.answer[0]===q.answer[1] ? String(q.answer[0]) : q.answer.join(" to ");
 return [...q.answer].map(c=>q.options?.length ? `${c} · ${q.options["ABCD".indexOf(c)]}` : c).join(", ");
}
function answerControls(q, raw, key) {
 if(q.type==="NAT") return `<label>Numerical answer <input class="numeric" name="answer" type="text" inputmode="decimal" value="${escape(raw??"")}" autocomplete="off"></label>`;
 const choices=q.options?.length ? q.options : ["A","B","C","D"];
 return `<fieldset class="options"><legend>${q.type==="MSQ"?"Select all correct options":"Choose one option"}</legend>
 ${choices.map((choice,index)=>{
   const label=letter(index), checked=q.type==="MSQ"?raw?.includes(label):raw===label;
   return `<label for="${key}-${label}"><input id="${key}-${label}" name="answer" type="${q.type==="MSQ"?"checkbox":"radio"}" value="${label}" ${checked?"checked":""}><span>${q.options?.length ? `<b>${label}.</b> `:""}${escape(choice)}</span></label>`;
 }).join("")}</fieldset>`;
}
function readAnswer(form,q) {
 const values=new FormData(form);
 return q.type==="MSQ" ? values.getAll("answer") : String(values.get("answer") || "").trim();
}
function validAnswer(q,raw) {
 return q.type!=="NAT" || !raw || (numericPattern.test(raw) && Number.isFinite(Number(raw)));
}
function questionPrompt(q, exam=false) {
 if(!q.year) return `<p class="prompt">${escape(q.prompt)}</p>`;
 return exam
   ? `<p>Read question <strong>${q.number}</strong> in the official paper. ${external("Open question in official paper",q.questionUrl)}</p>`
   : `<p>${external("Read question",q.questionUrl)} · ${external("Official paper PDF",q.pdf)}</p>`;
}
function explanationHtml(q) {
 return `<p><strong>Answer</strong> ${escape(answerText(q))}</p>
 ${q.explanation ? `<p>${escape(q.explanation)}</p>` : q.solutionUrl ? `<p>${external("Read the worked solution at IAE Academy",q.solutionUrl)}</p>` : "<p>Use the official answer key to check this answer.</p>"}
 ${q.year && q.related.length ? `<p>Review ${q.related.slice(0,3).map(l=>`<a href="${href(l)}">${escape(l.title)}</a>`).join(" · ")}</p>`:""}`;
}
function questionCard(q, scope, showTopic=true) {
 const key=scope+"-"+q.id;
 return `<article class="panel question-card" id="${key}">
 <div class="label">${escape(q.level)} · ${q.type} · ${q.marks} ${q.marks===1?"mark":"marks"}</div>
 <h3>${escape(q.title)}</h3>
 ${q.year && showTopic ? `<p class="muted">${escape(coverageLabels[q.chapter])} · ${escape(q.label)}</p>`:""}
 ${questionPrompt(q)}
 <form data-question="${q.id}">
 ${answerControls(q,null,key)}
 <div class="row attempt-actions"><button class="button primary" type="submit" name="action" value="check">Check answer</button><button class="button" type="submit" name="action" value="skip">Skip &amp; reveal</button><label><input type="checkbox" name="guess"> I guessed</label></div>
 </form><div class="feedback" aria-live="polite"></div></article>`;
}
function bindQuestions(section) {
 section.addEventListener("submit", event=>{
   const form=event.target, q=questions.get(form.dataset.question);
   if(!q) return;
   event.preventDefault();
   const feedback=form.nextElementSibling;
   const skip=event.submitter?.value==="skip";
   const raw=skip ? null : readAnswer(form,q);
   if(!skip && (!validAnswer(q,raw) || !raw?.length)) {
     feedback.textContent=q.type==="NAT"?"Enter a valid number first.":"Choose an answer first.";
     return;
   }
   const result=scoreQuestion(q,raw);
   recordAttempt(q,result,raw,form.elements.guess.checked);
   persistStudy();
   feedback.innerHTML=`<p class="outcome"><strong>${result.status}</strong> · ${formatScore(result.points)} / ${q.marks}</p>${explanationHtml(q)}`;
 });
}
const formatScore = value => Number(value.toFixed(2)).toString();
function choicesSelect(label,id,values,initial="") {
 return `<label>${label} <select id="${id}">${values.map(([value,text])=>`<option value="${escape(value)}" ${String(value)===String(initial)?"selected":""}>${escape(text)}</option>`).join("")}</select></label>`;
}
const chapterOptions = [["","All chapters"],...coverageLabels.map((title,i)=>[i,title])];
function practiceHub(level="mixed") {
 const levels=[["mixed","Mixed practice"],["foundation","Foundation"],["exam","Exam level"],["worked","Worked problems"]];
 main.innerHTML=`${page("Practice problems","Choose a level or chapter, submit your answers, and review the reasoning.")}
 <div class="filters">${choicesSelect("Level","practice-level",levels,level)}${choicesSelect("Chapter","practice-chapter",chapterOptions)}</div>
 <div id="practice-set" class="stack"></div>`;
 const select=document.querySelector("#practice-level"), chapter=document.querySelector("#practice-chapter"), dest=document.querySelector("#practice-set");
 const matches=q=>chapter.value==="" || q.chapter===Number(chapter.value);
 function draw() {
   const exam=graded.filter(matches), foundation=recallDrills.filter(matches);
   const entries = select.value==="foundation" ? foundation : select.value==="exam" ? exam :
    [...exam,...foundation.filter((_,i)=>i%4===0)].sort((a,b)=>a.chapter-b.chapter);
   dest.innerHTML=select.value==="worked"
     ? lessons.filter(matches).map(l=>question(l)).join("")
     : entries.map(q=>questionCard(q,"practice")).join("");
 }
 select.addEventListener("change", draw);
 chapter.addEventListener("change",draw);
 bindQuestions(dest);
 draw();
}
function papersHub() {
 main.innerHTML=`${page("Previous-year question bank","Browse 195 questions by topic, type, marks, and year. Read the official papers or attempt them in mock mode.")}
 <div class="cards">${papers.map(([year,institute,paper,key])=>`<article class="card"><div class="label">${institute}</div><h3>GATE DA ${year}</h3><ul>
 <li>${external("Question paper",official+paper)}</li><li>${external("Official answer key",official+key)}</li></ul>
 ${buttonLink("Open timed mock →","#exam/"+year)}</article>`).join("")}</div>
 <p class="sources">${external("Question topics and solution links · IAE Academy","https://iaeacademy.in/study/papers/da")} · ${external("GeeksforGeeks · other GATE papers","https://www.geeksforgeeks.org/gate/gate-previous-year-question-paper/")}</p>
 <div class="filters">${choicesSelect("Year","pyq-year",[["","All years"],...papers.map(([y])=>[y,y])])}
 ${choicesSelect("Chapter","pyq-chapter",chapterOptions)}
 ${choicesSelect("Topic","pyq-topic",[["","All topics"],...Object.keys(topicLessons).sort().map(tag=>[tag,topicName(tag)])])}
 ${choicesSelect("Type","pyq-type",[["","All types"],...["MCQ","MSQ","NAT"].map(t=>[t,t])])}
 ${choicesSelect("Marks","pyq-marks",[["","Any"],[1,"1"],[2,"2"]])}</div>
 <p id="paper-count" class="muted" aria-live="polite"></p><div id="paper-list" class="stack"></div>`;
 const fields=["year","chapter","topic","type","marks"].map(name=>[name,document.querySelector("#pyq-"+name)]);
 const count=document.querySelector("#paper-count"), list=document.querySelector("#paper-list");
 function draw() {
   const results=past.filter(q=>fields.every(([name,input])=>!input.value || String(name==="topic"?q.tag:q[name])===input.value));
   count.textContent=`${results.length} matching questions`;
   list.innerHTML=results.map(q=>`<details class="panel"><summary>${q.title} · ${escape(q.label)} <span class="muted">· ${q.type} · ${q.marks} marks</span></summary>${questionCard(q,"past",false)}</details>`).join("") || "<p>No questions match these filters.</p>";
 }
 fields.forEach(([,input])=>input.addEventListener("change",draw));
 bindQuestions(list);
 draw();
}
function relatedBlock(lesson) {
 const relevant=past.filter(q=>q.related.includes(lesson));
 const practice=[recallDrills.find(q=>q.related[0]===lesson),...graded.filter(q=>q.related[0]===lesson)].filter(Boolean);
 return `<section id="lesson-questions"><h2>Graded practice</h2><div class="stack">${practice.map(q=>questionCard(q,"lesson")).join("")}</div>
 <h2>Related past questions</h2>${relevant.length ? `<div class="stack">${relevant.map(q=>`<details class="panel"><summary>${q.title} · ${escape(q.label)}</summary>${questionCard(q,"lesson")}</details>`).join("")}</div>` : "<p>No past questions are tagged to this lesson yet.</p>"} </section>`;
}
const diagnosticQuestions=graded.slice(0,24).filter((_,i)=>i%3!==2);
function startSession(kind) {
 const original=kind==="diagnostic";
 const entries=original?diagnosticQuestions:past.filter(q=>String(q.year)===kind);
 study.exam={kind,ids:entries.map(q=>q.id),index:0,answers:{},flags:{},times:{},deadline:original?null:Date.now()+180*60000,entered:Date.now()};
 persistStudy();
 examView(kind);
}
function accrue(session) {
 if(session.entered==null) return;
 const index=session.index;
 session.times[index]=(session.times[index]||0)+Math.max(0,Math.min(Date.now(),session.deadline??Infinity)-session.entered);
 session.entered=null;
}
function finishSession() {
 const session=study.exam;
 if(!session) return;
 accrue(session);
 const rows=session.ids.map((id,index)=>{
   const q=questions.get(id), raw=session.answers[index];
   const result=scoreQuestion(q,raw);
   recordAttempt(q,result,raw,Boolean(session.flags[index]) && result.status==="Correct");
   return {id,raw,...result,time:session.times[index]||0,flag:Boolean(session.flags[index])};
 });
 const totals=coverageLabels.map((title,chapter)=>{
   const entries=rows.filter(row=>questions.get(row.id).chapter===chapter);
   return {title,chapter,points:entries.reduce((n,r)=>n+r.points,0),max:entries.reduce((n,r)=>n+questions.get(r.id).marks,0)};
 });
 if(session.kind==="diagnostic") {
   study.diagnostic=totals.map(item=>({chapter:item.chapter,ratio:item.max?item.points/item.max:0}));
   study.plan=null;
 }
 study.review={kind:session.kind,rows,totals};
 study.exam=null;
 persistStudy();
 if(location.hash.startsWith("#exam/")) render();
}
function clockLabel(ms) {
 const seconds=Math.max(0,Math.ceil(ms/1000));
 return [Math.floor(seconds/3600),Math.floor(seconds/60)%60,seconds%60].map(n=>String(n).padStart(2,"0")).join(":");
}
function examView(kind) {
 if(kind!=="diagnostic" && !papers.some(p=>String(p[0])===kind)) { papersHub(); return; }
 const original=kind==="diagnostic", title=original?"Diagnostic test":`GATE DA ${kind} mock`;
 const session=study.exam;
 if(session?.kind!==kind) {
   if(study.review?.kind===kind) { resultsView(study.review); return; }
   main.innerHTML=`${page(title,original?"Answer 16 questions across all eight chapters. Your result will shape the study plan.":"Use the official question paper beside this answer sheet. The 180-minute timer continues if you leave the page.")}
   ${session ? `<p>A different session is in progress. ${buttonLink("Resume active session","#exam/"+session.kind)}</p>` :
   `<button id="start-exam" class="button primary">Start ${original?"diagnostic":"timed mock"}</button>`}
   ${original?"":`<p class="sources">${external("Open the official question paper",official+papers.find(p=>String(p[0])===kind)[2])}</p>`}`;
   document.querySelector("#start-exam")?.addEventListener("click",()=>startSession(kind));
   return;
 }
 if(session.deadline && session.deadline<=Date.now()) { finishSession(); return; }
 session.entered ??= Date.now();
 persistStudy();
 const index=session.index, q=questions.get(session.ids[index]), raw=session.answers[index];
 const answered=i=>Boolean(session.answers[i]?.length);
 const palette=session.ids.map((_,i)=>`<button type="button" class="question-number ${answered(i)?"answered":""} ${session.flags[i]?"flagged":""}" data-jump="${i}" aria-label="Question ${i+1}${answered(i)?", answered":""}${session.flags[i]?", marked for review":""}" ${i===index?'aria-current="step"':""}>${i+1}</button>`).join("");
 main.innerHTML=`${page(title,original?"Submit to see your strengths and where to start.":"Answer from the official paper. Wrong MCQs lose one-third of their marks. MSQs and NATs have no negative marking.")}
 <div class="exam-layout"><aside class="panel palette-panel"><h2>Questions</h2><p id="answer-status" class="muted">${session.ids.filter((_,i)=>answered(i)).length} answered</p><div class="palette">${palette}</div></aside>
 <article class="panel"><div class="row exam-header"><span class="label">Question ${index+1} of ${session.ids.length} · ${q.type} · ${q.marks} marks</span>${session.deadline?`<span id="exam-clock" class="clock" aria-label="Time remaining">${clockLabel(session.deadline-Date.now())}</span>`:""}</div>
 ${questionPrompt(q,!original)}
 <form id="exam-response">${answerControls(q,raw,"exam-"+index)}
 <div class="row attempt-actions"><button type="button" class="button" id="clear-answer">Clear answer</button><label><input name="flag" type="checkbox" ${session.flags[index]?"checked":""}> Mark for review</label></div></form>
 <p id="exam-message" aria-live="polite"></p><div class="row"><button class="button" id="exam-back" ${index===0?"disabled":""}>← Previous</button><button class="button" id="exam-next" ${index===session.ids.length-1?"disabled":""}>Next →</button><button class="button primary" id="exam-submit">Submit ${original?"diagnostic":"mock"}</button></div>
 <div id="confirm-exam" class="feedback" hidden><p id="submit-summary"></p><div class="row"><button class="button primary" id="exam-finish">Finish and score</button><button class="button" id="exam-continue">Keep working</button></div></div>
 </article></div>`;
 const form=document.querySelector("#exam-response");
 const message=document.querySelector("#exam-message");
 function saveResponse() {
   const raw=readAnswer(form,q);
   if(!validAnswer(q,raw)) { message.textContent="Enter a valid number or clear the input."; return false; }
   message.textContent="";
   session.answers[index]=raw;
   session.flags[index]=form.elements.flag.checked;
   persistStudy();
   const current=document.querySelector(`[data-jump="${index}"]`);
   current.classList.toggle("answered",answered(index));
   current.classList.toggle("flagged",session.flags[index]);
   current.setAttribute("aria-label",`Question ${index+1}${answered(index)?", answered":""}${session.flags[index]?", marked for review":""}`);
   document.querySelector("#answer-status").textContent=`${session.ids.filter((_,i)=>answered(i)).length} answered`;
   return true;
 }
 function go(to) {
   if(!saveResponse()) return;
   accrue(session);
   session.index=to;
   examView(kind);
   document.querySelector("[aria-current='step']")?.focus();
 }
 form.addEventListener("input",saveResponse);
 form.addEventListener("change",saveResponse);
 form.addEventListener("submit",event=>{event.preventDefault();saveResponse();});
 document.querySelectorAll("[data-jump]").forEach(btn=>btn.addEventListener("click",()=>go(Number(btn.dataset.jump))));
 document.querySelector("#exam-back").addEventListener("click",()=>go(index-1));
 document.querySelector("#exam-next").addEventListener("click",()=>go(index+1));
 document.querySelector("#clear-answer").addEventListener("click",()=>{
   form.querySelectorAll("[name=answer]").forEach(input=>{
     if(input.type==="text") input.value="";
     else input.checked=false;
   });
   saveResponse();
 });
 const confirmation=document.querySelector("#confirm-exam");
 document.querySelector("#exam-submit").addEventListener("click",()=>{
   if(!saveResponse()) return;
   document.querySelector("#submit-summary").textContent=`${session.ids.filter((_,i)=>!answered(i)).length} unanswered. Submit to see scores and explanations?`;
   confirmation.hidden=false;
   document.querySelector("#exam-finish").focus();
 });
 document.querySelector("#exam-continue").addEventListener("click",()=>{
   confirmation.hidden=true;
   document.querySelector("#exam-submit").focus();
 });
 document.querySelector("#exam-finish").addEventListener("click",()=>{if(saveResponse())finishSession();});
}
function resultsView(review) {
 const original=review.kind==="diagnostic";
 const points=review.rows.reduce((total,row)=>total+row.points,0);
 const max=review.totals.reduce((total,row)=>total+row.max,0);
 const counts=["Correct","Incorrect","Skipped","Marks to all"].map(status=>[status,review.rows.filter(r=>r.status===status).length]);
 const duration=clockLabel(review.rows.reduce((t,r)=>t+r.time,0));
 main.innerHTML=`${page(original?"Diagnostic results":`GATE DA ${review.kind} results`,`${formatScore(points)} / ${max} marks · ${duration} on the answer sheet`)}
 <div class="row stats">${counts.filter(([,count])=>count).map(([status,count])=>`<span class="pill">${status} ${count}</span>`).join("")}</div>
 <div class="row section">${buttonLink(original?"Create a study plan":"Review mistakes","#"+(original?"plan":"notebook"),true)}
 ${study.exam?buttonLink("Resume active session","#exam/"+study.exam.kind):'<button id="restart-exam" class="button">Start a new attempt</button>'}</div>
 <section class="section panel"><h2>Marks by chapter</h2><div class="table-wrap"><table class="data-table"><thead><tr><th scope="col">Chapter</th><th scope="col">Earned</th><th scope="col">Available</th><th scope="col">Lost</th></tr></thead><tbody>
 ${review.totals.filter(item=>item.max).map(item=>`<tr><th scope="row">${escape(item.title)}</th><td>${formatScore(item.points)}</td><td>${item.max}</td><td>${formatScore(item.max-item.points)}</td></tr>`).join("")}</tbody></table></div></section>
 <section class="section stack"><h2>Question review</h2>${review.rows.map(row=>{
   const q=questions.get(row.id);
   return `<details class="panel"><summary>${escape(q.title)} · ${row.status} · ${formatScore(row.points)} marks</summary>
   ${questionPrompt(q)}<p>Your response ${escape(Array.isArray(row.raw)?row.raw.join(", ")||"—":row.raw||"—")} · ${clockLabel(row.time)}${row.flag?" · marked for review":""}</p>${explanationHtml(q)}</details>`;
 }).join("")}</section>`;
 document.querySelector("#restart-exam")?.addEventListener("click",()=>{
   study.review=null;
   persistStudy();
   examView(review.kind);
 });
}
function examTick() {
 const session=study.exam;
 if(!session?.deadline) return;
 if(session.deadline<=Date.now()) { finishSession(); return; }
 const clock=document.querySelector("#exam-clock");
 if(clock) clock.textContent=clockLabel(session.deadline-Date.now());
}
function buildPlan(minutes,weeks) {
 const weights=study.diagnostic || [];
 const rank=chapter=>weights.find(result=>result.chapter===chapter)?.ratio??0;
 const chapters=[0,1,2,3,4,5,6,7].sort((a,b)=>rank(a)-rank(b));
 const incomplete=lessons.filter(l=>!saved[l.id]);
 const pool=(incomplete.length?incomplete:lessons).slice().sort((a,b)=>chapters.indexOf(a.chapter)-chapters.indexOf(b.chapter));
 const perDay=Math.max(1,Math.floor(minutes/25));
 const workDays=weeks*6;
 const schedule=Array.from({length:workDays},(_,i)=>pool.slice(i*perDay,(i+1)*perDay).map(l=>l.id));
 return {minutes,weeks,created:Date.now(),schedule,remaining:Math.max(0,pool.length-workDays*perDay)};
}
function planView() {
 const plan=study.plan;
 const ranked=study.diagnostic?.slice().sort((a,b)=>a.ratio-b.ratio)??[];
 main.innerHTML=`${page("Your study plan","Start with a diagnostic, or choose your available study time to create a plan.")}
 <div class="row">${buttonLink(ranked.length?"Retake or review diagnostic":"Start diagnostic →","#exam/diagnostic",true)}${buttonLink("Open mistake notebook","#notebook")}${buttonLink("Syllabus coverage","#syllabus")}</div>
 <section class="panel section"><h2>Set your study time</h2>
 <form id="plan-form" class="row study-form"><label>Minutes per study day <input name="minutes" type="number" min="25" max="300" step="5" value="${plan?.minutes??60}" required></label>
 <label>Weeks <input name="weeks" type="number" min="1" max="12" value="${plan?.weeks??6}" required></label>
 <button class="button primary" type="submit">Generate plan</button></form>
 <p class="muted">Six study days per week, followed by a review or catch-up day.</p>
 ${ranked.length?`<p><strong>Suggested first chapters</strong> ${ranked.slice(0,3).map(r=>escape(coverageLabels[r.chapter])).join(" · ")}</p>`:""}</section>
 ${plan?`<section class="section stack"><h2>Weekly targets</h2>${plan.remaining?`<p>${plan.remaining} lessons are beyond the time available in this plan.</p>`:""}
 ${Array.from({length:plan.weeks},(_,w)=>`<details class="panel" ${w===0?"open":""}><summary>Week ${w+1}</summary><ol>
 ${plan.schedule.slice(w*6,w*6+6).map(ids=>`<li>${ids.length?ids.map(id=>{
   const l=lessons.find(item=>item.id===id);
   return `<a href="${href(l)}">${saved[id]?"✓ ":""}${escape(l.title)}</a>`;
 }).join(" · "):'<a href="#practice">Mixed practice</a>'}</li>`).join("")}
 <li><a href="#notebook">Review mistakes and catch up</a></li></ol></details>`).join("")}</section>`:""}`;
 document.querySelector("#plan-form").addEventListener("submit",event=>{
   event.preventDefault();
   const data=new FormData(event.currentTarget);
   study.plan=buildPlan(Number(data.get("minutes")),Number(data.get("weeks")));
   persistStudy();
   planView();
   document.querySelector(".section h2")?.scrollIntoView();
 });
}
function notebookView() {
 const items=Object.entries(study.mistakes).filter(([id])=>questions.has(id)).sort((a,b)=>a[1].due-b[1].due);
 main.innerHTML=`${page("Mistake notebook","Wrong, skipped and guessed questions appear here. Retry them when they come due.")}
 <div class="filters">${choicesSelect("Show","notebook-filter",[["due","Due now"],["all","All saved"]],items.some(([,row])=>row.due<=Date.now())?"due":"all")}</div><div class="stack" id="notebook-items"></div>`;
 const list=document.querySelector("#notebook-items"), filter=document.querySelector("#notebook-filter");
 function draw() {
   const visible=items.filter(([,item])=>filter.value==="all"||item.due<=Date.now());
   const reasons=["Incorrect","Skipped","Guessed","Concept gap","Formula recall","Calculation","Misread question","Time pressure"];
   list.innerHTML=visible.map(([id,item])=>`<details class="panel"><summary>${escape(questions.get(id).title)} · ${item.due<=Date.now()?"Due":new Date(item.due).toLocaleDateString()}</summary>
   ${choicesSelect("Mistake reason","reason-"+id,reasons.map(reason=>[reason,reason]),item.reason)}
   ${questionCard(questions.get(id),"notebook")}</details>`).join("") || "<p>No questions in this view. Try a practice set or mock to start building your notebook.</p>";
 }
 list.addEventListener("change",event=>{
   if(!event.target.id.startsWith("reason-"))return;
   const item=study.mistakes[event.target.id.slice(7)];
   item.reason=event.target.value;
   persistStudy();
 });
 filter.addEventListener("change",draw);
 bindQuestions(list);
 draw();
}
const comparisons = [
 ["z-test, t-test and χ² test",[
  ["z-test","Mean or proportion with an appropriate normal reference","Use known σ for exact normal-mean inference, or justify a large-sample approximation."],
  ["t-test","Mean with unknown σ under normal sampling","Replace σ with s and use n−1 degrees of freedom for a one-sample mean."],
  ["χ² test","Categorical counts or a normal-population variance","For count tests, compare observed with expected counts and verify expected-count assumptions."]
 ]],
 ["BFS, UCS and A*",[
  ["BFS","Smallest depth","Shortest by edge count under equal costs."],
  ["UCS","Smallest g(n)","Finds least-cost paths under nonnegative edge costs on finite graphs."],
  ["A*","Smallest g(n)+h(n)","A consistent heuristic supports optimal graph search without reopening closed states."]
 ]],
 ["PCA and LDA",[
  ["PCA","Unsupervised variance","Use centered features. Keep leading covariance eigenvectors."],
  ["LDA","Supervised class separation","Use labels to compare between-class variation with within-class variation."]
 ]]
];
function formulaTable(rows,headers) {
 return `<div class="table-wrap"><table class="data-table"><thead><tr>${headers.map(s=>`<th scope="col">${escape(s)}</th>`).join("")}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map((s,i)=>i===0?`<th scope="row">${escape(s)}</th>`:`<td>${escape(s)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}
function studySearch(lesson,value) {
 const haystack=[lesson.title,lesson.group,lesson.intro,lesson.detail,lesson.formula,aliases[lesson.id]||"",...lesson.tags].join(" ").toLowerCase();
 return value.toLowerCase().trim().split(/\s+/).every(token=>haystack.includes(token));
}
function revisionHub() {
 main.innerHTML=`${page("Revision desk","Find formulas, compare methods, and recall rules before turning over a card.")}
 <div class="filters">${choicesSelect("Sheet","revision-mode",[["formulas","Formula sheet"],["shortcuts","Cheat codes & shortcuts"],["flash","Flashcards"],["compare","Compare methods"]])}
 ${choicesSelect("Chapter","revision-chapter",chapterOptions)}
 <label>Search <input id="revision-query" type="search" placeholder="e.g. probability"></label>
 <button id="revision-print" class="button">Print this view</button></div><div id="revision-content" class="stack"></div>`;
 const mode=document.querySelector("#revision-mode"), chapter=document.querySelector("#revision-chapter"), query=document.querySelector("#revision-query"), region=document.querySelector("#revision-content");
 function draw() {
   const filtered=lessons.filter(l=>(chapter.value===""||l.chapter===Number(chapter.value)) && studySearch(l,query.value));
   if(mode.value==="compare") {
     region.innerHTML=comparisons.filter(([title,rows],i)=>(chapter.value===""||[0,6,5][i]===Number(chapter.value))&&[title,...rows.flat()].join(" ").toLowerCase().includes(query.value.trim().toLowerCase())).map(([title,rows])=>`<section class="panel"><h2>${title}</h2>${formulaTable(rows,["Method","Uses","Exam cue"])}</section>`).join("")||"<p>No comparisons match.</p>";
     return;
   }
   region.innerHTML=filtered.map(l=>`<article class="panel revision-entry"><div class="label">${escape(l.group)}</div><h3><a href="${href(l)}">${escape(l.title)}</a></h3>
   ${mode.value==="flash"?`<details><summary>Recall the rule · ${study.flash[l.id]?"Reviewed":"New"}</summary><code class="formula">${escape(l.formula)}</code><p>${escape(l.shortcut)}.</p><button class="button" data-flash="${l.id}">${study.flash[l.id]?"Review again":"Mark reviewed"}</button></details>`
   : mode.value==="shortcuts"?`<p>${escape(l.shortcut)}.</p>`:`<code class="formula">${escape(l.formula)}</code><p><strong>When to use it</strong> ${escape(l.shortcut)}.</p>`}</article>`).join("")||"<p>No lessons match this search.</p>";
 }
 region.addEventListener("click",event=>{
   const id=event.target.dataset.flash;
   if(!id)return;
   study.flash[id]=Date.now();
   persistStudy();
   event.target.textContent="Review again";
   event.target.closest("details").querySelector("summary").textContent="Recall the rule · Reviewed";
 });
 [mode,chapter].forEach(field=>field.addEventListener("change",draw));
 query.addEventListener("input",draw);
 document.querySelector("#revision-print").addEventListener("click",()=>window.print());
 draw();
}
const syllabusAreas = [
 [["Counting, axioms, events and Bayes",0,1,2,3,4],["Random variables and distributions",5,8,9,10,15],["Statistics, covariance and conditional moments",6,7,11],["CLT, intervals and tests",12,13,14,16]],
 [["Vector spaces, dependence and basis",0,1],["Matrices, projections and quadratic forms",2,3,4],["Systems, elimination, rank and determinant",5,6],["Eigenvalues, LU and SVD",7,8,9]],
 [["Functions, limits and differentiability",0,1],["Taylor series",2],["Single-variable optimization",3]],
 [["Python and complexity",0,1,13],["Stacks, queues, lists, trees and hashing",2,3,4,5,6],["Searching, sorting and divide and conquer",7,8,9],["Graphs, traversals and shortest paths",10,11,12]],
 [["ER and relational models",0,1,2,3],["SQL, constraints and normal forms",4,5,10],["File organization, indexes and transformation",6,7],["Warehousing schemas, hierarchies and measures",8,9]],
 [["Regression, ridge and logistic regression",0,1,2,3],["k-NN, Naive Bayes, LDA, SVM and trees",4,5,6,7,8],["Bias–variance, validation and neural networks",9,10,11],["Clustering and PCA",12,13,14,15]],
 [["Uninformed, informed and adversarial search",0,1,2,3],["Propositional and predicate logic",4,5],["Conditional independence, exact and approximate inference",6,7,8]],
 [["Verbal and reading comprehension",0,3],["Quantitative and data interpretation",1,4],["Analytical and spatial aptitude",2,5,6]]
];
function syllabusView() {
 main.innerHTML=`${page("Syllabus & mastery","Trace the official syllabus to lessons, practice, and past questions. Mastery is based on your latest graded attempts.")}
 <p>${external("Official DA syllabus",syllabus)} · ${external("Official General Aptitude syllabus",sourceGuide[7][1])}</p>
 <div class="stack">${syllabusAreas.map((areas,c)=>{
   const entries=groupLessons(c), completed=entries.filter(l=>saved[l.id]).length;
   const gradedHere=[...questions.values()].filter(q=>q.chapter===c && ["Correct","Incorrect","Skipped"].includes(study.attempts[q.id]?.status));
   const correct=gradedHere.filter(q=>study.attempts[q.id].status==="Correct").length;
   return `<details class="panel"><summary>${escape(coverageLabels[c])} · ${completed}/${entries.length} read · ${gradedHere.length?`${correct}/${gradedHere.length} correct`:"unassessed"}</summary>
   <div class="stack section">${areas.map(([title,...indices])=>`<section><h3>${title}</h3><ul>${indices.map(i=>{
     const l=lessonAt(c,i);
     const count=past.filter(q=>q.related.includes(l)).length;
     return `<li><a href="${href(l)}">${escape(l.title)}</a> · <a href="${href(l)}/practice">Practice${count?` + ${count} past questions`:""}</a>${saved[l.id]?" · read":""}</li>`;
   }).join("")}</ul></section>`).join("")}</div></details>`;
 }).join("")}</div>`;
}
function bindGlobalSearch() {
 const input=document.querySelector("#global-query"), results=document.querySelector("#global-results");
 function draw() {
   const value=input.value.trim();
   results.hidden=!value;
   if(!value)return;
   const matched=lessons.filter(l=>studySearch(l,value));
   results.innerHTML=matched.length?matched.map(l=>`<a class="result" href="${href(l)}">${escape(l.title)}<small>${escape(l.group)}</small></a>`).join(""):"<p>No lessons match.</p>";
 }
 input.addEventListener("input",draw);
 input.addEventListener("focus",draw);
 input.addEventListener("keydown",event=>{
   if(event.key==="Escape")results.hidden=true;
   if(event.key==="Enter")results.querySelector("a")?.focus();
 });
 results.addEventListener("click",event=>{
   if(event.target.closest("a")) { input.value=""; results.hidden=true; }
 });
 document.addEventListener("click",event=>{
   if(!event.target.closest(".site-search"))results.hidden=true;
 });
}
function studyRoute(route,id) {
 if(route==="practice") practiceHub(id);
 else if(route==="papers") papersHub();
 else if(route==="revision") revisionHub();
 else if(route==="exam") examView(id);
 else if(route==="plan") planView();
 else if(route==="notebook") notebookView();
 else if(route==="syllabus") syllabusView();
 else return false;
 return true;
}
const extraDemos = {
 "graph-traversals-bfs-and-dfs": ["BFS and DFS traversal","Choose which frontier to visit next."],
 "joins-and-grouping": ["Join two tables","Compare how an inner and a left join handle missing matches."],
 "k-means-and-k-medoids": ["Move a cluster centroid","Change the first centroid and watch the assignments move."],
 "special-matrices-projection-orthogonal-idempotent-and-partition": ["Orthogonal projection","Rotate the line and project a fixed vector onto it."],
 "rotations-and-folding": ["Rotate or reflect a shape","Track the labeled marker as its orientation changes."],
 "charts-and-mensuration": ["Interpret a frequency chart","Change the last category's count and compare its share."]
};
function additionalDemo(lesson) {
 const demo=extraDemos[lesson.id];
 if(!demo) return "";
 return `<section class="figure" id="interactive-demo"><h3>${demo[0]}</h3><p>${demo[1]}</p><div id="demo-ui"></div></section>`;
}
function activateDemo(lesson) {
 const ui=document.querySelector("#demo-ui");
 if(!ui)return;
 const graph={S:["A","B"],A:["C","D"],B:["E"],C:[],D:["E"],E:[]};
 if(lesson.id==="graph-traversals-bfs-and-dfs") {
   ui.innerHTML=`<p><strong>Edges</strong> S–A, S–B, A–C, A–D, B–E, D–E</p>
   <div class="row">${choicesSelect("Traversal","traversal",[["bfs","BFS"],["dfs","DFS"]])}
   <button class="button" id="graph-next">Visit next vertex</button><button class="button" id="graph-reset">Reset</button></div>
   <div id="graph-nodes" class="row section" aria-hidden="true"></div><p id="graph-state" aria-live="polite"></p>`;
   const undirected=Object.fromEntries(Object.keys(graph).map(v=>[v,Object.keys(graph).filter(u=>graph[v].includes(u)||graph[u].includes(v))]));
   const mode=document.querySelector("#traversal");
   let frontier, visited;
   function show() {
     document.querySelector("#graph-nodes").innerHTML=Object.keys(graph).map(n=>`<span class="graph-node ${visited.includes(n)?"visited":frontier.includes(n)?"frontier":""}">${n}</span>`).join("");
     document.querySelector("#graph-state").textContent=`Visited ${visited.join(" → ")||"—"}. Frontier ${frontier.join(", ")||"empty"}.`;
     document.querySelector("#graph-next").disabled=!frontier.length;
   }
   function reset() { frontier=["S"];visited=[];show(); }
   document.querySelector("#graph-next").addEventListener("click",()=>{
     const node=frontier.shift();
     if(!visited.includes(node)) {
       visited.push(node);
       const adjacent=undirected[node].filter(n=>!visited.includes(n));
       if(mode.value==="bfs") frontier.push(...adjacent.filter(n=>!frontier.includes(n)));
       else frontier.unshift(...adjacent);
       frontier=frontier.filter(n=>!visited.includes(n));
     }
     show();
   });
   document.querySelector("#graph-reset").addEventListener("click",reset);
   mode.addEventListener("change",reset);
   reset();
   return;
 }
 if(lesson.id==="joins-and-grouping") {
   ui.innerHTML=`<p>Customers A, B, C. Orders A–101, A–102, C–103.</p>
   ${choicesSelect("Join type","join-demo",[["inner","INNER JOIN"],["left","LEFT JOIN"]])}<div id="join-result" aria-live="polite"></div>`;
   const select=document.querySelector("#join-demo");
   function draw() {
     const rows=[["A",101],["A",102],["C",103]];
     if(select.value==="left")rows.splice(2,0,["B","NULL"]);
     document.querySelector("#join-result").innerHTML=formulaTable(rows,["Customer","Order"]);
   }
   select.addEventListener("change",draw);
   draw();
   return;
 }
 const cluster=lesson.id==="k-means-and-k-medoids", spatial=lesson.id==="rotations-and-folding", chart=lesson.id==="charts-and-mensuration";
 const range=cluster?["First centroid",0,10,2]:chart?["Category C count",0,50,15]:["Angle (degrees)",0,360,45];
 ui.innerHTML=`<canvas id="extra-canvas" class="chart" width="520" height="190" role="img" aria-label="${extraDemos[lesson.id][0]}" aria-describedby="extra-output"></canvas>
 <label for="extra-range">${range[0]}</label> <input type="range" id="extra-range" min="${range[1]}" max="${range[2]}" value="${range[3]}">
 ${spatial?'<label><input type="checkbox" id="reflect-shape"> Reflect across y-axis first</label>':""}
 <p id="extra-output" aria-live="polite"></p>`;
 const slider=document.querySelector("#extra-range"), reflect=document.querySelector("#reflect-shape");
 const canvas=document.querySelector("#extra-canvas"), c=canvas.getContext("2d"), output=document.querySelector("#extra-output");
 function draw() {
   const value=Number(slider.value), radians=value*Math.PI/180;
   c.clearRect(0,0,520,190);
   c.font="15px system-ui";
   function line(a,b,color,width=2) {
     c.beginPath(); c.moveTo(...a); c.lineTo(...b); c.strokeStyle=color; c.lineWidth=width; c.stroke();
   }
   function dot(point,color,radius=6) {
     c.beginPath(); c.arc(...point,radius,0,2*Math.PI); c.fillStyle=color; c.fill();
   }
   if(cluster) {
     const points=[1,2,3,5,6,8,9], x=t=>40+44*t;
     const a=[], b=[];
     line([40,99],[480,99],"#9fb7ae");
     points.forEach(p=>{
       const first=Math.abs(p-value)<=Math.abs(p-8);
       (first?a:b).push(p);
       dot([x(p),99],first?"#087057":"#664ca3");
       c.fillText(p,x(p)-4,128);
     });
     line([x(value),45],[x(value),84],"#087057",4);
     line([x(8),45],[x(8),84],"#664ca3",4);
     output.textContent=`Centroids ${value} and 8. Cluster A: ${a.join(", ")||"empty"}. Cluster B: ${b.join(", ")||"empty"}. Ties go to A.`;
   } else if(chart) {
     const counts=[12,23,value], total=counts.reduce((sum,n)=>sum+n,0);
     counts.forEach((count,i)=>{
       c.fillStyle=["#087057","#664ca3","#80560e"][i];
       c.fillRect(70+i*150,145-count*2.4,65,count*2.4);
       c.fillText(String.fromCharCode(65+i)+": "+count,72+i*150,170);
     });
     output.textContent=`A 12, B 23, C ${value}. Total ${total}. C contributes ${(100*value/total).toFixed(1)}%.`;
   } else {
     const unit=[Math.cos(radians),Math.sin(radians)], screen=([x,y])=>[260+29*x,95-29*y];
     line([28,95],[492,95],"#9fb7ae"); line([260,14],[260,176],"#9fb7ae");
     if(spatial) {
       const shape=[[0,0],[2,0],[2,1],[.5,1],[.5,1.8],[0,1.8],[0,0]];
       const transformed=shape.map(([x,y])=>{
         const a=reflect.checked?-x:x;
         return [a*unit[0]-y*unit[1],a*unit[1]+y*unit[0]];
       });
       for(let i=1;i<shape.length;i++) {
         line(screen(shape[i-1]),screen(shape[i]),"#9fb7ae");
         line(screen(transformed[i-1]),screen(transformed[i]),"#087057",3);
       }
       dot(screen(transformed[3]),"#80560e");
       const xy=transformed[3].map(n=>(Math.abs(n)<.005?0:n).toFixed(2));
       output.textContent=`${reflect.checked?"Reflected, then rotated":"Rotated"} ${value}° counterclockwise. Marker (2, 1) moves to (${xy.join(", ")}).`;
     } else {
       const v=[3,2], scalar=v[0]*unit[0]+v[1]*unit[1], projected=unit.map(n=>scalar*n);
       line(screen(unit.map(n=>-4*n)),screen(unit.map(n=>4*n)),"#087057",3);
       line(screen([0,0]),screen(v),"#664ca3",3);
       line(screen(v),screen(projected),"#80560e");
       dot(screen(projected),"#087057");
       output.textContent=`Line angle ${value}°. Projection of (3, 2) is (${projected.map(n=>(Math.abs(n)<.005?0:n).toFixed(2)).join(", ")}).`;
     }
   }
 }
 slider.addEventListener("input",draw);
 reflect?.addEventListener("change",draw);
 draw();
}
bindGlobalSearch();
if(study.exam) study.exam.entered=null;
window.addEventListener("hashchange",()=>{
 if(study.exam) { accrue(study.exam); persistStudy(); }
 if(location.hash!=="#main") render(true);
});
window.addEventListener("pagehide",()=>{
 if(study.exam) { accrue(study.exam); persistStudy(); }
});
window.addEventListener("pageshow",()=>{
 if(study.exam && location.hash==="#exam/"+study.exam.kind && study.exam.entered==null) {
   study.exam.entered=Date.now();
   persistStudy();
 }
});
setInterval(examTick,1000);
render();
if ("serviceWorker" in navigator && ["https:","http:"].includes(location.protocol)) {
 navigator.serviceWorker.register("worker.js").catch(()=>{});
}
