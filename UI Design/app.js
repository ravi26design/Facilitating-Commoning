/* ============================================================================
   FACILITATING COMMONING — WEB REPOSITORY
   High-fidelity UI design · hash-routed prototype
   Structure and content follow the approved low-fidelity wireframe;
   the visual language follows the FES Organization Onboarding Platform.
   ========================================================================== */

/* ── roles / mock access ─────────────────────────────────────────────────── */
let currentRole = "visitor";
let prevRoute = "#/home";
const ROLE = {
  visitor:   {label:"Visitor",              short:"V",  icon:"eye"},
  registered:{label:"Registered User",      short:"RU", icon:"user"},
  admin:     {label:"Platform Super Admin", short:"SA", icon:"shield"}
};
const roleLabel = () => ROLE[currentRole].label;
const isAdmin = () => currentRole === "admin";
const isRegistered = () => currentRole === "registered" || currentRole === "admin";
const canDownload = () => currentRole !== "visitor";
function setRole(role, dest){ currentRole = role; toast("Signed in as " + ROLE[role].label); go(dest || (role === "admin" ? "#/admin" : "#/home")); }
function signOut(){ currentRole = "visitor"; toast("Signed out"); go("#/home"); }
function download(title){
  if(canDownload()) toast("Download started — " + title);
  else { toast("Sign in to download this resource"); go("#/login"); }
}
function goBack(){
  if(prevRoute && prevRoute !== location.hash) go(prevRoute);
  else if(window.history && history.length > 1) history.back();
  else go("#/home");
}

/* ── data ────────────────────────────────────────────────────────────────── */
const STAGES = [
  {id:"understand",   num:"01", name:"Understand Context", icon:"compass",
   short:"Read the local social, ecological and institutional context before acting.",
   what:"Map the resource, the community, existing use patterns, power dynamics and prior institutions."},
  {id:"institutions", num:"02", name:"Build Institutions", icon:"users",
   short:"Form or strengthen a legitimate community institution to govern the commons.",
   what:"Convene the community, define membership, draft collective rules and decision-making norms."},
  {id:"tenure",       num:"03", name:"Secure Tenure", icon:"scroll-text",
   short:"Establish legal recognition and secure rights over the shared resource.",
   what:"Prepare and file claims, gather evidence, engage authorities, obtain recognition of rights."},
  {id:"plan",         num:"04", name:"Plan", icon:"map",
   short:"Develop a collective management and restoration plan.",
   what:"Set shared goals, zone the resource, agree priorities, sequence actions and resources."},
  {id:"restore",      num:"05", name:"Restore & Manage", icon:"sprout",
   short:"Carry out restoration and day-to-day sustainable management.",
   what:"Implement restoration works, enforce collective rules, manage use and benefit-sharing."},
  {id:"monitor",      num:"06", name:"Monitor & Adapt", icon:"activity",
   short:"Track outcomes and adapt the approach over time.",
   what:"Measure ecological and institutional health, reflect, and revise rules and plans."}
];
const stageById = id => STAGES.find(s => s.id === id);

const SYSTEMS = {
  pastureland:{name:"Pastureland", icon:"wheat", accent:"var(--sys-pastureland)", photo:"assets/img/pastureland.jpg", thumb:"t",
    desc:"Community institutions, tenure and recognition, collective rules, restoration and sustainable use of grazing commons.",
    users:"Facilitators, field practitioners, learners and community institutions working on pasturelands.",
    outcome:"Recognised tenure, functioning institutions, and restored, sustainably managed grazing commons.",
    process:["Understand","Institutions","Tenure","Plan","Restore","Monitor"]},
  forests:{name:"Forests", icon:"trees", accent:"var(--sys-forests)", photo:"assets/img/forests.jpg", thumb:"d",
    desc:"Community rights, institutions, collective governance, conservation and sustainable management of forest commons.",
    users:"Facilitators, field practitioners, learners and community institutions working on forest commons.",
    outcome:"Secure community forest rights, functioning institutions, and restored, sustainably managed forests.",
    process:["Understand","Institutions","Tenure","Plan","Restore","Monitor"]},
  water:{name:"Water", icon:"droplet", accent:"var(--sys-water)", photo:"assets/img/water.jpg", thumb:"",
    desc:"Collective institutions, equitable access, planning, management and long-term stewardship of shared water systems.",
    users:"Facilitators, field practitioners, learners and community institutions working on water commons.",
    outcome:"Equitable access, functioning institutions, and sustainably managed and stewarded water systems.",
    process:["Understand","Institutions","Access","Plan","Manage","Monitor"]}
};
const SYSTEM_IDS = ["pastureland","forests","water"];
const systemIdByName = name => SYSTEM_IDS.find(id => SYSTEMS[id].name === name);

const STATES = ["Rajasthan","Andhra Pradesh","Karnataka"];

const THEMES = {
  map:{id:"map", name:"Multi-Actor Platforms", icon:"network",
    desc:"Convening and aligning multiple stakeholders around shared commons goals.",
    users:"Facilitators, partners and institutions coordinating across actors.",
    outcome:"Aligned stakeholders and shared plans that advance commoning."},
  leo:{id:"leo", name:"Local Economic Opportunities", icon:"coins",
    desc:"Livelihoods and value from the sustainable use of the commons.",
    users:"Community enterprises, facilitators and livelihood practitioners.",
    outcome:"Sustainable livelihoods anchored in the commons."},
  agri:{id:"agri", name:"Sustainable Agriculture Practices", icon:"leaf",
    desc:"Practices that sustain soil, water and productivity over the long term.",
    users:"Farmers, facilitators and field practitioners.",
    outcome:"Practices that sustain soil, water and long-term productivity."}
};
const THEME_LIST = Object.keys(THEMES).map(k => THEMES[k]);

const LD = [
  {id:"modular",    name:"Modular Learning", icon:"layers", cls:"",
   desc:"Progressive training modules delivered as a series, with field activity between them."},
  {id:"atomized",   name:"Atomized Course Curriculum", icon:"list-checks", cls:"g",
   desc:"Short, atomised topics for low-dose high-frequency (LDHF) learning."},
  {id:"supporting", name:"Supporting Resources", icon:"clipboard-list", cls:"o",
   desc:"Handbooks, facilitators' guides, SoPs, formats and field tools."}
];

const JOURNEY5 = [
  {n:"1", k:"Orient",     q:"What is this repository?",            d:"Understand what the repository is and what it helps you do.", href:"#/about"},
  {n:"2", k:"Understand", q:"What is Commoning?",                  d:"The meaning of Commoning of Commons and why it matters.", href:"#/commoning"},
  {n:"3", k:"Learn",      q:"How does capacity building work?",    d:"How continuous learning supports Commoning — and two methods of doing it.", href:"#/learning-approach"},
  {n:"4", k:"Choose",     q:"Pastureland · Forests · Water",       d:"Select the natural-resource system or theme you are working with.", href:"#/resource-systems"},
  {n:"5", k:"Act",        q:"Use resources in sequence",           d:"Access resources in a logical sequence to facilitate processes on the ground.", href:"#/library"}
];

const STORIES = [
  {id:"gram-sabha-forest", title:"How a Gram Sabha strengthened governance of its Forest Commons",
   system:"Forests", stage:"Build Institutions", place:"Odisha",
   excerpt:"A village institution took charge of collective decisions and rules for its forest."},
  {id:"pasture-rules", title:"How communities developed rules for managing pasturelands",
   system:"Pastureland", stage:"Plan", place:"Rajasthan",
   excerpt:"Herders agreed shared grazing rules and a seasonal rest cycle for the common pasture."},
  {id:"water-access", title:"How a hamlet secured equitable access to a shared water source",
   system:"Water", stage:"Secure Tenure", place:"Andhra Pradesh",
   excerpt:"Households negotiated fair access and a stewardship rota for the common water system."}
];
const storyById = id => STORIES.find(s => s.id === id);

const HELP = [
  {id:"faq",              icon:"circle-help",     title:"Frequently Asked Questions",  desc:"Common questions about the repository."},
  {id:"how-to-use",       icon:"compass",         title:"How to use the repository",   desc:"Follow the guided journey or use direct access."},
  {id:"how-to-find",      icon:"search",          title:"How to find a resource",      desc:"Use the Resource Library, search and filters."},
  {id:"commoning-stages", icon:"route",           title:"Understanding Commoning stages", desc:"The six-stage Commoning pathway explained."},
  {id:"modular-learning", icon:"layers",          title:"Understanding Modular Learning", desc:"Progressive modules with field activity."},
  {id:"ldhf",             icon:"repeat",          title:"Understanding LDHF",          desc:"Short, frequent, task-focused learning."}
];
const helpById = id => HELP.find(h => h.id === id);

const FAQS = [
  ["How do I know which stage I am at?","Use the Commoning pathway on your resource-system page — the active stage is highlighted, and each stage explains what needs to happen before you move on."],
  ["Do I have to follow the whole journey?","No. Experienced users can go straight to the Resource Library, then search and filter to a specific resource."],
  ["How are resources organised on a resource-system page?","By learning design — Modular Learning, Atomized Course Curriculum (LDHF), and Supporting Resources — with filters for stakeholder, format, language and stage."],
  ["Is the content available in Hindi?","Many resources are available in Hindi and English. Filter by Language in the Resource Library to see what is available."],
  ["Do I need an account?","You can browse and read everything as a visitor. An account is needed to download files and to use My Learning."]
];

const RES = [
  {id:"facilitator-guide", title:"Facilitator Guide for Commoning", purpose:"End-to-end guide to facilitate the Commoning process with a community.", system:"All Systems", stage:"All Stages", stake:"Facilitator", design:"Both", type:"Facilitators' Guide", group:"supporting", lang:"English", version:"v1.0 · 2026", attribution:""},
  {id:"cfr-course", title:"Community Forest Resource Rights", purpose:"Course on claiming and governing Community Forest Resource rights.", system:"Forests", stage:"Secure Tenure", stake:"Learner", design:"Modular", type:"Course", group:"modular", lang:"Hindi", version:"v1.0 · 2026", attribution:""},
  {id:"cfr-claim", title:"CFR Claim Process", purpose:"Step-by-step course on preparing and filing a CFR claim.", system:"Forests", stage:"Secure Tenure", stake:"Field Practitioner", design:"Modular", type:"Course", group:"modular", lang:"Hindi", version:"v1.0 · 2026", attribution:""},
  {id:"ifr-module", title:"IFR Claim Process", purpose:"Modular training on the Individual Forest Rights claim process.", system:"Forests", stage:"Secure Tenure", stake:"Field Practitioner", design:"Modular", type:"Training Module", group:"modular", lang:"English", version:"v1.0 · 2026", attribution:""},
  {id:"fra-history", title:"Background and History of FRA", purpose:"Short video on the background and history of the Forest Rights Act.", system:"Forests", stage:"Understand Context", stake:"Learner", design:"LDHF", type:"Video", group:"atomized", lang:"English", version:"v1.0 · 2026", attribution:"Contributed by a partner organisation"},
  {id:"what-is-tenure", title:"What is Tenurial Security?", purpose:"Atomised topic explaining why secure tenure matters and forms of recognition.", system:"Forests", stage:"Secure Tenure", stake:"Learner", design:"LDHF", type:"Atomised Course", group:"atomized", lang:"Hindi", version:"v1.0 · 2026", attribution:""},
  {id:"gram-sabha-atom", title:"Role of the Gram Sabha", purpose:"Atomised topic on the powers and duties of the Gram Sabha.", system:"Forests", stage:"Build Institutions", stake:"Learner", design:"LDHF", type:"Atomised Course", group:"atomized", lang:"Hindi", version:"v1.0 · 2026", attribution:""},
  {id:"tenure-claim-tool", title:"Community Rights Claim Toolkit", purpose:"Field tool to prepare and file a community rights claim.", system:"Forests", stage:"Secure Tenure", stake:"Field Practitioner", design:"Both", type:"Tool", group:"supporting", lang:"Hindi", version:"v1.0 · 2026", attribution:""},
  {id:"fra-handbook", title:"FRA Facilitators' Handbook", purpose:"Reference handbook and SoPs for facilitators working on forest rights.", system:"Forests", stage:"All Stages", stake:"Facilitator", design:"Both", type:"Handbook", group:"supporting", lang:"English", version:"v1.0 · 2026", attribution:""},
  {id:"context-mapping", title:"Context Mapping Worksheet", purpose:"Worksheet to map the resource, community and existing institutions.", system:"All Systems", stage:"Understand Context", stake:"Field Practitioner", design:"Both", type:"Format", group:"supporting", lang:"English", version:"v1.0 · 2026", attribution:""},
  {id:"institution-basics", title:"Building Community Institutions", purpose:"Modular course on forming a legitimate, inclusive community institution.", system:"All Systems", stage:"Build Institutions", stake:"Learner", design:"Modular", type:"Course", group:"modular", lang:"Hindi", version:"v1.0 · 2026", attribution:""},
  {id:"water-access-plan", title:"Equitable Water Access Planning", purpose:"Plan fair access and stewardship rules for a shared water system.", system:"Water", stage:"Plan", stake:"Facilitator", design:"Modular", type:"Training Module", group:"modular", lang:"English", version:"v1.0 · 2026", attribution:""},
  {id:"restoration-field", title:"Pasture Restoration Field Protocol", purpose:"Field protocol (SoP) for community-led pastureland restoration works.", system:"Pastureland", stage:"Restore & Manage", stake:"Field Practitioner", design:"Both", type:"SoP", group:"supporting", lang:"Hindi", version:"v1.0 · 2026", attribution:""},
  {id:"pasture-course", title:"Commoning of Pasturelands — Course", purpose:"Modular course on the commoning of pasturelands.", system:"Pastureland", stage:"All Stages", stake:"Learner", design:"Modular", type:"Course", group:"modular", lang:"Hindi", version:"v1.0 · 2026", attribution:""},
  {id:"pasture-video", title:"Commoning of Pasturelands — Overview", purpose:"Short video introducing the commoning of pasturelands.", system:"Pastureland", stage:"Understand Context", stake:"Learner", design:"LDHF", type:"Video", group:"atomized", lang:"Hindi", version:"v1.0 · 2026", attribution:""},
  {id:"pasture-audio", title:"Grazing Rules — Audio Guide", purpose:"Audio guide on developing collective grazing rules.", system:"Pastureland", stage:"Plan", stake:"Community Member", design:"LDHF", type:"Audio", group:"atomized", lang:"Hindi", version:"v1.0 · 2026", attribution:""},
  {id:"pasture-pdf", title:"Pastureland Restoration Handbook", purpose:"Downloadable PDF handbook for pastureland restoration.", system:"Pastureland", stage:"Restore & Manage", stake:"Field Practitioner", design:"Both", type:"PDF", group:"supporting", lang:"English", version:"v1.0 · 2026", attribution:""},
  {id:"p-legal-framework", title:"Legal Framework for Pasture Commons", purpose:"Course on the laws and rights governing pastureland commons.", system:"Pastureland", stage:"Understand Context", stake:"Learner", design:"Modular", type:"Course", group:"modular", lang:"Hindi", version:"v1.0 · 2026", attribution:""},
  {id:"p-rights-history", title:"History of Grazing Rights", purpose:"Video on the history and evolution of community grazing rights.", system:"Pastureland", stage:"Understand Context", stake:"Learner", design:"LDHF", type:"Video", group:"atomized", lang:"Hindi", version:"v1.0 · 2026", attribution:""},
  {id:"p-tenure-defs", title:"Key Definitions — Pasture Tenure", purpose:"Atomised topic covering key tenure definitions for pasturelands.", system:"Pastureland", stage:"Secure Tenure", stake:"Learner", design:"LDHF", type:"Atomised Course", group:"atomized", lang:"Hindi", version:"v1.0 · 2026", attribution:""},
  {id:"p-rights-audio", title:"Pasture Rights — Audio Explainer", purpose:"Short audio explainer on pastureland rights and recognition.", system:"Pastureland", stage:"Secure Tenure", stake:"Community Member", design:"LDHF", type:"Audio", group:"atomized", lang:"Hindi", version:"v1.0 · 2026", attribution:""},
  {id:"p-committee", title:"Forming a Pasture Management Committee", purpose:"Course on setting up an inclusive pasture management committee.", system:"Pastureland", stage:"Build Institutions", stake:"Facilitator", design:"Modular", type:"Course", group:"modular", lang:"Hindi", version:"v1.0 · 2026", attribution:""},
  {id:"p-gramsabha", title:"Gram Sabha in Pasture Governance", purpose:"Atomised topic on the Gram Sabha's role in pasture governance.", system:"Pastureland", stage:"Build Institutions", stake:"Learner", design:"LDHF", type:"Atomised Course", group:"atomized", lang:"Hindi", version:"v1.0 · 2026", attribution:""},
  {id:"p-claim-module", title:"Claiming Pastureland Rights", purpose:"Training module on preparing and filing pastureland rights claims.", system:"Pastureland", stage:"Secure Tenure", stake:"Field Practitioner", design:"Modular", type:"Training Module", group:"modular", lang:"English", version:"v1.0 · 2026", attribution:""},
  {id:"p-evidence-pdf", title:"Evidence & Documentation for Pasture Claims", purpose:"PDF checklist and formats for pasture claim documentation.", system:"Pastureland", stage:"Secure Tenure", stake:"Field Practitioner", design:"Both", type:"PDF", group:"supporting", lang:"English", version:"v1.0 · 2026", attribution:""},
  {id:"p-grazing-plan", title:"Grazing Plan Template", purpose:"Editable format to develop a collective grazing plan.", system:"Pastureland", stage:"Plan", stake:"Facilitator", design:"Both", type:"Format", group:"supporting", lang:"English", version:"v1.0 · 2026", attribution:""},
  {id:"p-rest-cycle", title:"Seasonal Rest Cycle Planning", purpose:"Module on planning seasonal rest cycles for grazing commons.", system:"Pastureland", stage:"Plan", stake:"Field Practitioner", design:"Modular", type:"Training Module", group:"modular", lang:"Hindi", version:"v1.0 · 2026", attribution:""},
  {id:"p-facil-guide", title:"Pasture Facilitators' Guide", purpose:"Facilitators' guide for running pastureland commoning sessions.", system:"Pastureland", stage:"All Stages", stake:"Facilitator", design:"Both", type:"Facilitators' Guide", group:"supporting", lang:"English", version:"v1.0 · 2026", attribution:""},
  {id:"map-guide", title:"Running a Multi-Actor Platform", purpose:"Guide to convening and sustaining a multi-actor platform.", system:"Multi-Actor Platforms", stage:"", stake:"Facilitator", design:"Both", type:"Facilitators' Guide", group:"supporting", lang:"English", version:"v1.0 · 2026", attribution:""},
  {id:"leo-course", title:"Livelihoods from the Commons", purpose:"Atomised topics on building local economic opportunities from the commons.", system:"Local Economic Opportunities", stage:"", stake:"Community Member", design:"LDHF", type:"Atomised Course", group:"atomized", lang:"Hindi", version:"v1.0 · 2026", attribution:""},
  {id:"agri-course", title:"Sustainable Agriculture Practices — Modules", purpose:"Modular training on soil, water and productivity practices.", system:"Sustainable Agriculture Practices", stage:"", stake:"Farmer", design:"Modular", type:"Training Module", group:"modular", lang:"Hindi", version:"v1.0 · 2026", attribution:""}
];
const resById = id => RES.find(r => r.id === id);
const resFor = (name, group) => RES.filter(r => (r.system === name || r.system === "All Systems") && (!group || r.group === group));


/* Popular courses — the home-page rail. `views` is the watch count shown on the
   card; `banner` reuses the field photography already in assets/img. */
const POPULAR = [
  {id:"cfr-course",         banner:"assets/img/forests.jpg",                 views:4820},
  {id:"institution-basics", banner:"assets/img/story-gram-sabha-forest.jpg", views:3960},
  {id:"pasture-course",     banner:"assets/img/pastureland.jpg",             views:3145},
  {id:"water-access-plan",  banner:"assets/img/story-water-access.jpg",      views:2680},
  {id:"p-rest-cycle",       banner:"assets/img/story-pasture-rules.jpg",     views:2210},
  {id:"agri-course",        banner:"assets/img/water.jpg",                   views:1875}
];
const viewCount = n => n >= 1000 ? (n/1000).toFixed(1).replace(/\.0$/,"") + "k" : String(n);

const TOPICS = [
  {id:"rights",       icon:"scale",           name:"Rights & Legal Framework", desc:"Background, key definitions and the legal framework."},
  {id:"institutions", icon:"landmark",        name:"Community Institutions",   desc:"Gram Sabha, governance and collective decision-making."},
  {id:"claims",       icon:"file-check",      name:"Claiming Community Rights",desc:"Preparing, filing and following up on claims."},
  {id:"planning",     icon:"map",             name:"Planning & Management",    desc:"Plans, restoration and sustainable management."},
  {id:"support",      icon:"life-buoy",       name:"Facilitation & Support",   desc:"Guides, SoPs, handbooks and formats."}
];
const topicById = id => TOPICS.find(t => t.id === id);
const RES_TOPIC = {
  "facilitator-guide":"support","cfr-course":"rights","cfr-claim":"claims","ifr-module":"claims",
  "fra-history":"rights","what-is-tenure":"rights","gram-sabha-atom":"institutions","tenure-claim-tool":"claims",
  "fra-handbook":"support","context-mapping":"planning","institution-basics":"institutions","water-access-plan":"planning",
  "restoration-field":"planning","pasture-course":"rights","map-guide":"support","leo-course":"planning","agri-course":"planning",
  "pasture-video":"rights","pasture-audio":"planning","pasture-pdf":"planning",
  "p-legal-framework":"rights","p-rights-history":"rights","p-tenure-defs":"rights","p-rights-audio":"rights",
  "p-committee":"institutions","p-gramsabha":"institutions","p-claim-module":"claims","p-evidence-pdf":"claims",
  "p-grazing-plan":"planning","p-rest-cycle":"planning","p-facil-guide":"support"
};
const topicOf = r => RES_TOPIC[r.id] || "support";
const resForTopic = (name, topicId) => resFor(name).filter(r => !topicId || topicOf(r) === topicId);
function topicsForSystem(name){
  const counts = {};
  resFor(name).forEach(r => { counts[topicOf(r)] = (counts[topicOf(r)] || 0) + 1; });
  return TOPICS.filter(t => counts[t.id]).map(t => Object.assign({count:counts[t.id]}, t));
}

const CURRICULUM = [
  {code:"100", title:"Introduction to the Rights Framework", topics:[
    ["101","Historical background of the Act"],["102","Introduction to the Act"],
    ["103","Key definitions"],["104","Classification of land under the Act"],["105","Important legal points"]]},
  {code:"200", title:"Community Institutions", topics:[
    ["201","Panchayat governance"],["202","Role of the Gram Sabha"],["203","Gram Sabha quorum"],
    ["204","Gram Sabha meeting process"],["205","Participation in the Gram Sabha"],["206","Documentation of the Gram Sabha"]]},
  {code:"300", title:"Claiming Community Rights", topics:[
    ["301","Preparing the claim"],["302","Evidence and documentation"],["303","Filing and follow-up"]]}
];

/* `label` is the compact nav label; `long` is used in the mobile menu */
const NAV = [
  {id:"#/home",              label:"Home",              long:"Home"},
  {id:"#/commoning",         label:"Commoning",         long:"Commoning of Commons"},
  {id:"#/learning-approach", label:"Learning Approach", long:"Learning Approach"},
  {id:"#/resource-systems",  label:"Resource Systems",  long:"Resource Systems & Themes"},
  {id:"#/library",           label:"Library",           long:"Resource Library"},
  {id:"#/help",              label:"Help",              long:"Help"}
];

/* ── small helpers ───────────────────────────────────────────────────────── */
const ic = n => `<i data-lucide="${n}"></i>`;
const esc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const js = s => String(s).replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/"/g,"&quot;");

/* Resource type → icon + colour class */
function mediaKind(type){
  const t = (type || "").toLowerCase();
  if(t.includes("video"))  return {icon:"play",           cls:"v", label:"Watch"};
  if(t.includes("audio"))  return {icon:"headphones",     cls:"a", label:"Listen"};
  if(/handbook|guide|sop|pdf|manual/.test(t)) return {icon:"file-text", cls:"d", label:"Read"};
  if(/format|tool|toolkit|worksheet/.test(t)) return {icon:"clipboard-list", cls:"t", label:"Use"};
  if(t.includes("atomised")) return {icon:"list-checks",  cls:"",  label:"Learn"};
  return {icon:"graduation-cap", cls:"", label:"Learn"};
}
function accentFor(name){
  const id = systemIdByName(name);
  return id ? SYSTEMS[id].accent : "var(--sys-theme)";
}

/* ── header ──────────────────────────────────────────────────────────────── */
function header(active){
  const acct = currentRole === "visitor"
    ? `<button class="btn btn-solid" onclick="go('#/login')">Sign In ${ic("arrow-right")}</button>`
    : `<div class="profile" id="profile">
         <button class="profile-btn" onclick="toggleProfile(event)">
           <span class="avatar">${ROLE[currentRole].short}</span>
           <span>${roleLabel()}</span>
           <span class="caret">${ic("chevron-down")}</span>
         </button>
         <div class="profile-menu" id="profile-menu">
           <div class="pm-head"><strong>${roleLabel()}</strong><span>Signed in to the repository</span></div>
           <div class="pm-div"></div>
           ${isRegistered() ? `<a onclick="go('#/my-learning')">${ic("bookmark")}My Learning</a>` : ""}
           ${isAdmin() ? `<a onclick="go('#/admin')">${ic("gauge")}Admin Dashboard</a>` : ""}
           <a onclick="toast('Profile &amp; settings — placeholder')">${ic("settings")}Profile &amp; Settings</a>
           <div class="pm-div"></div>
           <a onclick="signOut()">${ic("log-out")}Sign Out</a>
         </div>
       </div>`;
  return `<header class="nav">
    <div class="brand" onclick="go('#/home')">
      <span class="mk">${ic("sprout")}</span>
      <span class="bt"><span class="b1">Facilitating</span><span class="b1 g">Commoning</span></span>
    </div>
    <nav class="navlinks">
      ${NAV.map(n => `<a class="${active === n.id ? "on" : ""}" onclick="go('${n.id}')">${n.label}</a>`).join("")}
    </nav>
    <div class="navcta">
      <button class="btn btn-icon" title="Search" onclick="openSearch()">${ic("search")}</button>
      <button class="btn btn-icon navburger" title="Menu" onclick="openMenu()">${ic("menu")}</button>
      ${acct}
    </div>
  </header>`;
}

function crumbs(items){
  if(!items || !items.length) return "";
  return `<div class="crumbs">${items.map((it, i) => i === items.length - 1
    ? `<span class="here">${it.label}</span>`
    : `<a onclick="go('${it.href}')">${it.label}</a><span class="sep">${ic("chevron-right")}</span>`).join("")}</div>`;
}

/* Interior page header band. tone: "soft" (default) | "sys" */
function pageHead(o){
  const dark = o.tone === "sys";
  const emblem = o.emblem
    ? `<div class="sys-emblem" style="${o.accent ? `background:${o.accent};border-color:transparent` : ""}">${ic(o.emblem)}</div>` : "";
  return `<section class="phead ${dark ? "sysband" : ""}">
    ${crumbs(o.crumbs)}
    <div class="phead-grid">
      <div>
        ${o.eyebrow ? `<div class="ph-eyebrow">${o.eyebrowIcon ? ic(o.eyebrowIcon) : ""}${o.eyebrow}</div>` : ""}
        <h2>${o.title}</h2>
        ${o.sub ? `<p class="ph-sub">${o.sub}</p>` : ""}
        ${o.facts ? `<div class="ph-facts">${o.facts.map(f => `<div class="ph-fact"><div class="fl">${f[0]}</div><div class="fv">${f[1]}</div></div>`).join("")}</div>` : ""}
        ${o.actions ? `<div class="ph-actions">${o.actions}</div>` : ""}
      </div>
      ${emblem}
    </div>
  </section>`;
}

function footer(){
  return `<footer class="footer">
    <div class="foot-cols">
      <div>
        <div class="foot-brand" onclick="go('#/home')">
          <span class="fm">${ic("sprout")}</span>
          <span class="bt"><span class="b1">Facilitating</span><span class="b1 g">Commoning</span></span>
        </div>
        <p class="fdesc">A learning system that enables ecosystem actors to understand and facilitate the Commoning of Commons.</p>
      </div>
      <div><h5>Learn</h5><ul>
        <li onclick="go('#/commoning')">Commoning of Commons</li>
        <li onclick="go('#/learning-approach')">Learning Approach</li>
        <li onclick="go('#/resource-systems')">Resource Systems</li>
        <li onclick="go('#/about')">About the Repository</li>
      </ul></div>
      <div><h5>Find</h5><ul>
        <li onclick="go('#/library')">Resource Library</li>
        <li onclick="openSearch()">Search</li>
        <li onclick="go('#/help')">Help &amp; FAQ</li>
        <li onclick="openContact()">Contact &amp; Support</li>
      </ul></div>
      <div><h5>Resource Systems</h5><ul>
        ${SYSTEM_IDS.map(id => `<li onclick="go('#/system/${id}')">${SYSTEMS[id].name}</li>`).join("")}
        ${THEME_LIST.map(t => `<li onclick="go('#/theme/${t.id}')">${t.name}</li>`).join("")}
      </ul></div>
    </div>
    <div class="foot-bar">
      <span>© 2026 Foundation for Ecological Security · Prakriti Karyashala</span>
      <nav class="fr"><a onclick="go('#/about')">About</a><a onclick="go('#/help')">Help</a><a onclick="openContact()">Contact</a><a onclick="toast('Privacy policy — placeholder')">Privacy</a></nav>
    </div>
  </footer>`;
}

const shell = (active, body) => header(active) + `<main>${body}</main>` + footer();

/* ── reusable blocks ─────────────────────────────────────────────────────── */
function pathway(activeId, opts){
  opts = opts || {};
  const sysQ = opts.system ? `?sys=${opts.system}` : "";
  const activeIdx = activeId ? STAGES.findIndex(s => s.id === activeId) : -1;
  return `<div class="pathway ${opts.compact ? "compact" : ""}">
    ${STAGES.map((s, i) => `<div class="pw-step ${s.id === activeId ? "active" : (activeIdx > -1 && i < activeIdx ? "done" : "")}"
        onclick="go('#/stage/${s.id}${sysQ}')">
        <div class="pw-ic">${ic(s.icon)}</div>
        <div class="pw-num">STAGE ${s.num}</div>
        <div class="pw-nm">${s.name}</div>
        <div class="pw-sh">${s.short}</div>
      </div>`).join("")}
  </div>`;
}

function resourceCard(r){
  const k = mediaKind(r.type);
  const showStage = r.stage && r.stage !== "";
  return `<article class="rcard">
    <div class="rc-top">
      <span class="rc-ic ${k.cls}">${ic(k.icon)}</span>
      <span class="badge">${r.type}</span>
    </div>
    <h4>${r.title}</h4>
    <p class="purpose">${r.purpose}</p>
    <div class="tags">
      <span class="tag blue">${r.system}</span>
      ${showStage ? `<span class="tag">${r.stage}</span>` : ""}
      <span class="tag">${ic("user")}${r.stake}</span>
      <span class="tag">${ic("languages")}${r.lang}</span>
    </div>
    ${r.attribution ? `<div class="rc-attr">${ic("heart-handshake")}${r.attribution}</div>` : ""}
    <div class="rc-actions">
      <button class="btn btn-solid btn-sm" onclick="go('#/resource/${r.id}')">View ${ic("arrow-right")}</button>
      <button class="btn btn-ghost btn-sm" onclick="download('${js(r.title)}')">${ic("download")}Download</button>
    </div>
  </article>`;
}

function courseCard(r, i){
  const k = mediaKind(r.type);
  return `<article class="course-card" onclick="go('#/resource/${r.id}')">
    <span class="cc-num">${i + 1}</span>
    <div class="cc-thumb ${k.cls}"><span class="tic">${ic(k.icon)}</span></div>
    <div class="cc-body">
      <span class="badge">${r.type}</span>
      <h4>${r.title}</h4>
      <div class="cc-meta">${ic("languages")}${r.lang}</div>
    </div>
  </article>`;
}

/* Cover art for system / story cards. Renders the photo when one is present and
   silently falls back to the gradient + icon treatment when the file is missing. */
function cover(o){
  const photo = o.photo
    ? `<img src="${o.photo}" alt="" loading="lazy" onerror="coverFallback(this)">` : "";
  return `<div class="sys-cover ${o.photo ? "has-photo" : ""}" style="--acc:${o.accent}">
    ${photo}
    ${o.tag ? `<span class="sc-tag">${o.tag}</span>` : ""}
    <span class="sc-ic">${ic(o.icon)}</span>
  </div>`;
}
function coverFallback(img){
  const c = img.closest(".sys-cover");
  if(c) c.classList.remove("has-photo");
  img.remove();
}

function systemCard(id){
  const s = SYSTEMS[id];
  return `<article class="syscard" style="--acc:${s.accent}" onclick="go('#/system/${id}')">
    ${cover({photo:s.photo, accent:s.accent, icon:s.icon, tag:"Resource System"})}
    <div class="sys-body">
      <h3>${s.name}</h3>
      <p>${s.desc}</p>
      <div class="sys-proc">${s.process.map((p, i) => `${i ? `<span class="dot">›</span>` : ""}<span>${p}</span>`).join("")}</div>
      <div class="sys-foot">
        <span class="arrow-link">Begin your learning journey ${ic("arrow-right")}</span>
        <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();toast('Process documents for ${js(STATES.join(", "))} — placeholder')">${ic("file-text")}${STATES.length} states</button>
      </div>
    </div>
  </article>`;
}

function themeCard(t){
  return `<article class="card click flip" onclick="go('#/theme/${t.id}')">
    <span class="c-ic">${ic(t.icon)}</span>
    <span class="badge" style="margin-bottom:10px">Theme</span>
    <div class="c-t">${t.name}</div>
    <p class="c-d">${t.desc}</p>
    <div class="c-foot"><span class="arrow-link">Explore resources ${ic("arrow-right")}</span></div>
  </article>`;
}

function storyCard(s){
  const acc = accentFor(s.system);
  return `<article class="card click" style="--acc:${acc};padding:0;overflow:hidden" onclick="go('#/story/${s.id}')">
    ${cover({photo:`assets/img/story-${s.id}.jpg`, accent:acc, icon:"quote", tag:s.system})}
    <div style="padding:22px 24px 24px;display:flex;flex-direction:column;gap:9px;flex:1">
      <div class="tags"><span class="tag green">${ic("map-pin")}${s.place}</span><span class="tag">${s.stage}</span></div>
      <div class="c-t" style="margin:0">${s.title}</div>
      <p class="c-d">${s.excerpt}</p>
      <div class="c-foot"><span class="arrow-link">Read the story ${ic("arrow-right")}</span></div>
    </div>
  </article>`;
}

/* Horizontal course rail card — banner, name, description, watch count. */
function popularCard(p){
  const r = resById(p.id);
  if(!r) return "";
  const k = mediaKind(r.type);
  return `<article class="rail-card" onclick="go('#/resource/${r.id}')" tabindex="0"
      onkeydown="if(event.key==='Enter')go('#/resource/${r.id}')">
    <div class="rc-banner ${k.cls} has-img">
      <img src="${p.banner}" alt="" loading="lazy" onerror="bannerFallback(this)">
      <span class="rb-ic">${ic(k.icon)}</span>
    </div>
    <div class="rc-body">
      <span class="rc-type">${r.type}</span>
      <h4>${r.title}</h4>
      <p>${r.purpose}</p>
      <div class="rc-foot">
        <span class="watched">${ic("eye")}<b>${viewCount(p.views)}</b> watched</span>
        <span class="tag">${ic("languages")}${r.lang}</span>
      </div>
    </div>
  </article>`;
}
function bannerFallback(img){
  const b = img.closest(".rc-banner");
  if(b) b.classList.remove("has-img");
  img.remove();
}
/* Rail controls — scroll by one card and keep the arrows in sync with position. */
function railScroll(id, dir){
  const rail = document.getElementById(id);
  if(!rail) return;
  const card = rail.querySelector(".rail-card");
  const step = card ? card.getBoundingClientRect().width + 20 : 320;
  rail.scrollBy({left: dir * step, behavior:"smooth"});
}
function railSync(id){
  const rail = document.getElementById(id);
  if(!rail) return;
  const prev = document.querySelector(`[data-rail-prev="${id}"]`);
  const next = document.querySelector(`[data-rail-next="${id}"]`);
  const max = rail.scrollWidth - rail.clientWidth;
  /* tolerance covers the rail's own padding and sub-pixel snap positions */
  if(prev) prev.disabled = rail.scrollLeft <= 8;
  if(next) next.disabled = rail.scrollLeft >= max - 8;
}

function callout(o){
  return `<div class="callout ${o.dark ? "dark" : ""}">
    <div class="co-main">
      <span class="co-ic">${ic(o.icon || "flag")}</span>
      <div><strong>${o.title}</strong><span>${o.text}</span></div>
    </div>
    <div class="row">${o.actions}</div>
  </div>`;
}

function filterSidebar(){
  const box = (items, type, nm) => items.map(i =>
    `<label class="fopt"><input type="${type}" ${nm ? `name="${nm}"` : ""} onchange="void 0"> ${i}</label>`).join("");
  return `<aside class="filters">
    <div class="f-head">${ic("sliders-horizontal")}Filter resources</div>
    <p style="font-size:12.5px;color:var(--muted-2);margin-bottom:4px">Narrow the library to exactly what you need.</p>
    <div class="fgroup"><h4>Resource System</h4>${box(SYSTEM_IDS.map(i => SYSTEMS[i].name).concat(THEME_LIST.map(t => t.name)), "checkbox")}</div>
    <div class="fgroup"><h4>Stage of Commoning</h4>${box(STAGES.map(s => s.name), "checkbox")}</div>
    <div class="fgroup"><h4>Stakeholder</h4>${box(["Facilitator","Learner","Field Practitioner","Community Member","Farmer"], "checkbox")}</div>
    <div class="fgroup"><h4>Learning Design</h4>${box(["Modular","LDHF","Both"], "checkbox")}</div>
    <div class="fgroup"><h4>Resource Type</h4>${box(["Course","Training Module","Atomised Course","Video","Audio","Handbook","Facilitators' Guide","SoP","Format","Tool"], "checkbox")}</div>
    <div class="fgroup"><h4>Language</h4>${box(["All Languages","English","Hindi"], "radio", "lang")}</div>
    <div class="filter-actions">
      <button class="btn btn-solid btn-sm" onclick="go('#/search?filtered=1')">Apply</button>
      <button class="btn btn-ghost btn-sm" onclick="clearFilters(this)">Clear all</button>
    </div>
  </aside>`;
}
function clearFilters(el){
  const box = el.closest(".filters");
  box.querySelectorAll("input").forEach(i => { i.checked = false; });
  toast("Filters cleared");
}

const sortSelect = () => `<span class="selectwrap">Sort
  <select class="sel" onchange="toast('Sorted by ' + this.value)">
    <option>Recommended</option><option>A–Z</option><option>Recently added</option>
  </select></span>`;
const quickFilters = () => `<div class="row">
  <select class="sel" onchange="toast('Filtered by ' + this.value)"><option>All stakeholders</option><option>Facilitator</option><option>Learner</option><option>Field Practitioner</option><option>Community Member</option></select>
  <select class="sel" onchange="toast('Filtered by ' + this.value)"><option>All formats</option><option>Course</option><option>Training Module</option><option>Atomised Course</option><option>Video</option><option>Audio</option></select>
  <select class="sel" onchange="toast('Filtered by ' + this.value)"><option>All languages</option><option>English</option><option>Hindi</option></select>
</div>`;

/* ============================================================================
   SCREENS
   ========================================================================== */
const screens = {};

/* ── HOME ────────────────────────────────────────────────────────────────── */
screens.home = () => shell("#/home", `
  <section class="hero">
    <div class="hero-grid">
      <div class="hero-copy">
        <h1 class="rev d1">Commoning of Commons: <em>Learn. Facilitate. Act.</em></h1>
        <p class="lead rev d2">A learning system that enables ecosystem actors to understand and facilitate the Commoning of Commons - organised around the process on the ground, not by file type.</p>
        <div class="actions rev d3">
          <button class="btn btn-solid btn-lg" onclick="go('#/commoning')">Start Learning ${ic("arrow-right")}</button>
          <button class="btn btn-ghost btn-lg" onclick="go('#/resource-systems')">Choose a Resource System</button>
        </div>
      </div>
    </div>
  </section>

  <section class="sec soft reveal">
    <div class="sec-center">
      <div class="sec-label">Start here</div>
      <h2 class="sec-title">New to the repository?</h2>
      <p class="sec-sub">Three short entry points guide you to the right place — whether you are learning the idea, learning the method, or ready to act.</p>
    </div>
    <div class="grid g3">
      <article class="card click flip" onclick="go('#/commoning')">
        <span class="c-ic">${ic("book-open")}</span>
        <div class="c-t">What is Commoning?</div>
        <p class="c-d">A short explanation of the Commoning of Commons — what it means, why it matters, and the three pillars it rests on.</p>
        <div class="c-foot"><span class="arrow-link">Learn more ${ic("arrow-right")}</span></div>
      </article>
      <article class="card click flip" onclick="go('#/learning-approach')">
        <span class="c-ic">${ic("graduation-cap")}</span>
        <div class="c-t">How learning enables action</div>
        <p class="c-d">How capacity building — Modular Learning and Low Dose High Frequency — translates learning into action on the ground.</p>
        <div class="c-foot"><span class="arrow-link">Learn more ${ic("arrow-right")}</span></div>
      </article>
      <article class="card click flip" onclick="go('#/resource-systems')">
        <span class="c-ic">${ic("trees")}</span>
        <div class="c-t">Choose your commons</div>
        <p class="c-d">Select the natural-resource system or theme you are working with and follow its Commoning pathway.</p>
        <div class="c-foot"><span class="arrow-link">Learn more ${ic("arrow-right")}</span></div>
      </article>
    </div>
  </section>

  <section class="sec reveal">
    <div class="about-band">
      <div class="ab-inner">
        <h2 class="ab-label">About the <br>Repository</h2>
        <p class="ab-copy">The Web Repository is a learning system that supports ecosystem actors to build capacities and facilitate the Commoning of Commons. It brings learning modules, facilitation guides, field tools and mentoring together in one place - so you always know what to use, and when.</p>
        <button class="btn btn-white ab-cta" onclick="go('#/about')">Know more ${ic("arrow-right")}</button>
      </div>
    </div>
  </section>

  <section class="sec soft reveal">
    <div class="sec-head">
      <div>
        <div class="sec-label">Explore</div>
        <h2 class="sec-title">By resource system or theme</h2>
        <p class="sec-sub">Choose the natural-resource system you are working with to understand its Commoning process and access the relevant learning pathway.</p>
      </div>
      <button class="btn btn-ghost" onclick="go('#/resource-systems')">See all ${ic("arrow-right")}</button>
    </div>
    <div class="grid g3">${SYSTEM_IDS.map(systemCard).join("")}</div>
    <div class="sec-label" style="margin:38px 0 16px">Additional themes</div>
    <div class="grid g3">${THEME_LIST.map(themeCard).join("")}</div>
  </section>

  <section class="sec reveal">
    <div class="sec-head">
      <div>
        <div class="sec-label">Commoning in action</div>
        <h2 class="sec-title">Field stories from the commons</h2>
        <p class="sec-sub">How communities have used these processes and resources in their own context.</p>
      </div>
    </div>
    <div class="grid g3">${STORIES.map(storyCard).join("")}</div>
  </section>

  <section class="sec soft reveal">
    <div class="sec-head">
      <div>
        <div class="sec-label">Most watched</div>
        <h2 class="sec-title">Popular courses</h2>
        <p class="sec-sub">The courses facilitators and learners are watching most across the repository.</p>
      </div>
      <div class="row mid">
        <div class="rail-nav">
          <button class="btn btn-icon" data-rail-prev="popular-rail" onclick="railScroll('popular-rail',-1)" aria-label="Scroll left">${ic("chevron-left")}</button>
          <button class="btn btn-icon" data-rail-next="popular-rail" onclick="railScroll('popular-rail',1)" aria-label="Scroll right">${ic("chevron-right")}</button>
        </div>
        <button class="btn btn-solid" onclick="go('#/library')">Browse the library ${ic("arrow-right")}</button>
      </div>
    </div>
    <div class="rail" id="popular-rail" onscroll="railSync('popular-rail')">
      ${POPULAR.map(popularCard).join("")}
    </div>
  </section>

  <section class="cta-band reveal">
    <h2>Ready to begin?</h2>
    <p>Understand the idea, learn the approach, then choose the resource system you are working with — the pathway stays with you all the way to field action.</p>
    <div class="actions"><button class="btn btn-white" onclick="go('#/commoning')">Start Learning ${ic("arrow-right")}</button>
    <button class="btn btn-ghost btn-lg" style="background:transparent;color:#fff;border-color:rgba(255,255,255,.35)" onclick="go('#/library')">Resource Library</button></div>
  </section>
`);

/* ── ABOUT ───────────────────────────────────────────────────────────────── */
screens.about = () => shell("#/about",
  pageHead({
    crumbs:[{label:"Home",href:"#/home"},{label:"About"}],
    eyebrow:"About", eyebrowIcon:"info",
    title:"About the Repository",
    sub:"A learning and action-oriented repository that helps ecosystem actors understand and facilitate the Commoning of Commons.",
    actions:`<button class="btn btn-solid" onclick="go('#/commoning')">Start Learning ${ic("arrow-right")}</button>
             <button class="btn btn-ghost" onclick="openTour()">Take a tour</button>`
  }) + `
  <section class="sec">
    <div class="grid g2">
      <div class="panel"><h3>${ic("target")} Purpose</h3>
        <p>This repository helps ecosystem actors understand and facilitate the Commoning of Commons. It brings learning, facilitation guides, field tools and mentoring together in one place — organised around the Commoning process rather than by file type — so users can move from understanding to action on the ground.</p></div>
      <div class="panel"><h3>${ic("users")} Who it supports</h3>
        <p>Ecosystem actors, facilitators, learners, field practitioners and stakeholders.</p>
        <p>It is designed for facilitators running sessions with communities, field practitioners carrying out on-ground tasks, learners building their understanding, and the wider stakeholders who support Commoning.</p></div>
      <div class="panel"><h3>${ic("graduation-cap")} What you can learn</h3>
        <p>What Commoning of Commons means and why it matters, how the capacity-building approach works (Modular Learning and LDHF), the six-stage Commoning pathway, and what needs to happen at each stage for the resource system you are working with.</p></div>
      <div class="panel"><h3>${ic("library")} What resources are available</h3>
        <p>At each stage you will find Learn, Facilitate, Act and Support resources — concept notes and videos, session plans and facilitation guides, field tools and tasks, and mentoring, FAQs and guidance — available in English and Hindi.</p></div>
    </div>
  </section>

  <section class="sec soft">
    <div class="sec-label">How it is organised</div>
    <h2 class="sec-title">Information architecture</h2>
    <p class="sec-sub">Top navigation stays simple; deeper content is reached through guided pathways. Each resource system leads to its Commoning pathway, then to stages, then to the learning modules, tools and resources for that stage.</p>
    <div class="panel">
      <div class="tags" style="margin-bottom:22px">
        ${["Home","About","Commoning of Commons","Learning Approach","Resource Systems & Themes","Resource Library","Help"].map(n => `<span class="tag blue">${n}</span>`).join("")}
      </div>
      <div class="flow">
        <div class="node strong">${ic("trees")}Resource Systems &amp; Themes</div><span class="arw">${ic("arrow-right")}</span>
        <div class="node">Pastureland · Forests · Water</div><span class="arw">${ic("arrow-right")}</span>
        <div class="node">${ic("route")}Commoning Pathway</div><span class="arw">${ic("arrow-right")}</span>
        <div class="node">Stages 01–06</div><span class="arw">${ic("arrow-right")}</span>
        <div class="node strong">${ic("library")}Modules · tools · resources</div>
      </div>
    </div>
  </section>

  <section class="sec">
    ${callout({icon:"flag", title:"Ready to begin?", text:"Understand the idea, then choose your resource system.",
      actions:`<button class="btn btn-solid" onclick="go('#/commoning')">Start Learning ${ic("arrow-right")}</button>
               <button class="btn btn-ghost" onclick="go('#/library')">Resource Library</button>`})}
  </section>
`);

/* ── COMMONING OF COMMONS ────────────────────────────────────────────────── */
screens.commoning = () => shell("#/commoning",
  pageHead({
    crumbs:[{label:"Home",href:"#/home"},{label:"Commoning of Commons"}],
    eyebrow:"Concept &amp; approach", eyebrowIcon:"book-open",
    title:"Commoning of Commons",
    sub:"The ongoing practice through which a community takes collective responsibility for a shared natural resource — securing it, governing it, restoring it and sustainably managing it together."
  }) + `
  <section class="sec">
    <div class="grid g2">
      <div class="panel">
        <h3>What does 'Commoning of Commons' mean?</h3>
        <p>In simple language: Commoning is the ongoing practice through which a community takes collective responsibility for a shared natural resource — securing it, governing it, restoring it and sustainably managing it together.</p>
        <p>It is not a one-time event or a project. It is a continuing relationship between a community and the resource it depends on, held together by institutions the community itself builds and sustains.</p>
      </div>
      <div class="panel">
        <h3>Why Commoning matters</h3>
        <p>Communities exercise custodianship and agency over shared natural resources; collective institutions make decisions and sustain action over time.</p>
        <ul class="bullets">
          <li>${ic("circle-check")}Community custodianship of shared resources</li>
          <li>${ic("circle-check")}Community agency in decisions that affect them</li>
          <li>${ic("circle-check")}Collective, deliberative decision-making</li>
          <li>${ic("circle-check")}Institutions that endure beyond a project cycle</li>
          <li>${ic("circle-check")}Sustainable management and equitable benefit-sharing</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="sec soft">
    <div class="sec-center">
      <div class="sec-label">Key pillars</div>
      <h2 class="sec-title">The approach to Commoning of Commons</h2>
      <p class="sec-sub">Three pillars hold the practice together — and one common thread runs through all of them.</p>
    </div>
    <div class="pillars">
      <div class="pillar"><span class="p-ic">${ic("landmark")}</span><h3>Institution Building &amp; Governance</h3>
        <p>A legitimate, inclusive community institution that can convene, deliberate, decide and enforce collective rules over the shared resource.</p></div>
      <div class="pillar" style="--acc:#39A248"><span class="p-ic">${ic("scroll-text")}</span><h3>Tenurial Security</h3>
        <p>Legal recognition and secure rights over the resource, so that collective decisions have standing and long-term investment makes sense.</p></div>
      <div class="pillar" style="--acc:#A16207"><span class="p-ic">${ic("sprout")}</span><h3>Restoration &amp; Sustainable Management</h3>
        <p>Restoration works, day-to-day management, monitoring and adaptation that keep the resource productive and the ecosystem healthy.</p></div>
    </div>
    <div class="thread">
      <div class="t-label">The common thread</div>
      <h3>Community agency runs through all three</h3>
      <p>Communities understand their rights and responsibilities, deliberate collectively, make informed decisions, act, reflect and adapt. This is what links Commoning to the need for continuous capacity building.</p>
      <div class="flow">
        <div class="node">${ic("compass")}Understand</div><span class="arw">${ic("arrow-right")}</span>
        <div class="node">${ic("messages-square")}Deliberate</div><span class="arw">${ic("arrow-right")}</span>
        <div class="node">${ic("gavel")}Decide</div><span class="arw">${ic("arrow-right")}</span>
        <div class="node">${ic("footprints")}Act</div><span class="arw">${ic("arrow-right")}</span>
        <div class="node">${ic("lightbulb")}Reflect</div><span class="arw">${ic("arrow-right")}</span>
        <div class="node">${ic("refresh-cw")}Adapt</div>
      </div>
    </div>
  </section>

  <section class="sec">
    <div class="sec-head">
      <div>
        <div class="sec-label">The process</div>
        <h2 class="sec-title">Six stages of Commoning</h2>
        <p class="sec-sub">Every resource system follows the same broad pathway. Select any stage to see what needs to happen and which resources support it.</p>
      </div>
    </div>
    ${pathway(null)}
  </section>

  <section class="sec soft">
    ${callout({icon:"arrow-right", title:"Continue the journey", text:"See how the capacity-building approach works, or choose the resource system you are working with.",
      actions:`<button class="btn btn-solid" onclick="go('#/learning-approach')">Learning Approach ${ic("arrow-right")}</button>
               <button class="btn btn-ghost" onclick="go('#/resource-systems')">Resource Systems</button>`})}
  </section>
`);

/* ── LEARNING APPROACH ───────────────────────────────────────────────────── */
screens["learning-approach"] = () => shell("#/learning-approach",
  pageHead({
    crumbs:[{label:"Home",href:"#/home"},{label:"Learning Approach"}],
    eyebrow:"Approach", eyebrowIcon:"graduation-cap",
    title:"Learning Approach — from information to action",
    sub:"Commoning is a continuous process. It requires ongoing learning, field application, reflection and handholding — rather than a one-time transfer of information."
  }) + `
  <section class="sec">
    <div class="grid g2">
      <div class="panel"><h3>${ic("help-circle")} Why capacity building?</h3>
        <p>Commoning is a continuous process that requires ongoing learning, field application, reflection and handholding — rather than a one-time transfer of information. Communities and the actors supporting them need to keep building agency, knowledge and capacity as the work unfolds.</p></div>
      <div class="panel"><h3>${ic("target")} Common purpose</h3>
        <p>Build stakeholder capacities <strong>and</strong> handhold learners as they translate training inputs into action on the ground. Learning is judged by what changes in the field, not by what was delivered in the session.</p></div>
    </div>
  </section>

  <section class="sec soft">
    <div class="sec-center">
      <div class="sec-label">Two methods of learning for facilitating Commoning</div>
      <h2 class="sec-title">Core elements of the Prakriti Karyashala approach</h2>
      <p class="sec-sub">Modular Learning builds progressively; LDHF reinforces continuously. Together they carry a learner from first concept to sustained field action.</p>
    </div>
    <div class="grid g2">
      <div class="panel">
        <span class="c-ic" style="width:48px;height:48px;border-radius:14px;background:var(--blue);color:#fff;display:grid;place-items:center;margin-bottom:18px;box-shadow:0 9px 18px -8px var(--blue)">${ic("layers")}</span>
        <h3>Modular Learning Design</h3>
        <ul class="bullets" style="margin-bottom:20px">
          <li>${ic("circle-check")}Breaks complex learning into manageable, progressive stages — the Commoning process broken into a series of modules</li>
          <li>${ic("circle-check")}In-person sessions at periodic intervals</li>
          <li>${ic("circle-check")}Field activities between modules</li>
          <li>${ic("circle-check")}Each module builds on prior learning and action</li>
          <li>${ic("circle-check")}Cumulative field actions contribute to outcomes</li>
        </ul>
        <div class="flow">
          <div class="node">${ic("book-open")}Learning module</div><span class="arw">${ic("arrow-right")}</span>
          <div class="node">${ic("footprints")}Field activity</div><span class="arw">${ic("arrow-right")}</span>
          <div class="node">${ic("layers")}Next module</div><span class="arw">${ic("arrow-right")}</span>
          <div class="node strong">${ic("flag")}Outcome</div>
        </div>
        <div class="mt24"><button class="btn btn-ghost btn-sm" onclick="toast('Karyashala Operations Manual — placeholder')">${ic("external-link")}Karyashala Operations Manual</button></div>
      </div>
      <div class="panel">
        <span class="c-ic" style="width:48px;height:48px;border-radius:14px;background:var(--green);color:#fff;display:grid;place-items:center;margin-bottom:18px;box-shadow:0 9px 18px -8px var(--green)">${ic("repeat")}</span>
        <h3>Low Dose High Frequency (LDHF)</h3>
        <ul class="bullets" style="margin-bottom:20px">
          <li>${ic("circle-check")}Short, frequent virtual learning engagements</li>
          <li>${ic("circle-check")}Atomized content focused on specific concepts or tasks</li>
          <li>${ic("circle-check")}Guided mentoring between sessions</li>
          <li>${ic("circle-check")}Repeated learning–application–feedback cycles</li>
          <li>${ic("circle-check")}Timely support while action is already underway</li>
        </ul>
        <div class="flow">
          <div class="node green">${ic("zap")}Short learning</div><span class="arw">${ic("arrow-right")}</span>
          <div class="node green">${ic("footprints")}Field application</div><span class="arw">${ic("arrow-right")}</span>
          <div class="node green">${ic("message-circle")}Feedback</div><span class="arw">${ic("arrow-right")}</span>
          <div class="node strong">${ic("refresh-cw")}Repeat</div>
        </div>
        <div class="mt24"><button class="btn btn-ghost btn-sm" onclick="toast('Guided Mentoring module — placeholder')">${ic("external-link")}Guided Mentoring module</button></div>
      </div>
    </div>
  </section>

  <section class="sec">
    <div class="thread">
      <div class="t-label">How they work together</div>
      <h3>LDHF complements the modular approach</h3>
      <p>The LDHF design enables continuous learning and reinforcement between formal training interventions, so momentum is not lost in the gaps between modules.</p>
      <div class="flow center">
        <div class="node">${ic("book-open")}Training input</div><span class="arw">${ic("arrow-right")}</span>
        <div class="node">${ic("footprints")}Field application</div><span class="arw">${ic("arrow-right")}</span>
        <div class="node">${ic("lightbulb")}Reflection</div><span class="arw">${ic("arrow-right")}</span>
        <div class="node">${ic("hand-helping")}Handholding</div><span class="arw">${ic("arrow-right")}</span>
        <div class="node strong">${ic("refresh-cw")}Action cycle</div>
      </div>
    </div>
  </section>

  <section class="sec soft">
    ${callout({icon:"trees", title:"Apply the approach to your context", text:"Choose the resource system or theme you are working with.",
      actions:`<button class="btn btn-solid" onclick="go('#/resource-systems')">Resource Systems &amp; Themes ${ic("arrow-right")}</button>`})}
  </section>
`);

/* ── RESOURCE SYSTEMS & THEMES ───────────────────────────────────────────── */
screens["resource-systems"] = () => shell("#/resource-systems",
  pageHead({
    crumbs:[{label:"Home",href:"#/home"},{label:"Resource Systems & Themes"}],
    eyebrow:"Choose your commons", eyebrowIcon:"trees",
    title:"Resource Systems &amp; Themes",
    sub:"Each pathway explains the process first, and then provides resources in the order they are likely to be used on the ground."
  }) + `
  <section class="sec">
    <div class="sec-label">Natural-resource systems</div>
    <h2 class="sec-title" style="margin-bottom:28px">Select the commons you are working with</h2>
    <div class="grid g3">${SYSTEM_IDS.map(systemCard).join("")}</div>
  </section>
  <section class="sec soft">
    <div class="sec-label">Themes</div>
    <h2 class="sec-title">Cross-cutting themes</h2>
    <p class="sec-sub">Themes apply across resource systems. They have no stage pathway — resources are organised by learning design.</p>
    <div class="grid g3">${THEME_LIST.map(themeCard).join("")}</div>
  </section>
  <section class="sec">
    ${callout({icon:"search", title:"Already know what you need?", text:"Skip the guided journey and go straight to the Resource Library.",
      actions:`<button class="btn btn-solid" onclick="go('#/library')">Resource Library ${ic("arrow-right")}</button>`})}
  </section>
`);

/* ── RESOURCE SYSTEM ENTRY ───────────────────────────────────────────────── */
screens.system = (params) => {
  const id = params.id, s = SYSTEMS[id];
  if(!s) return screens["resource-systems"]();
  const topics = topicsForSystem(s.name);
  const total = resFor(s.name).length;
  return shell("#/resource-systems",
    pageHead({
      tone:"sys", accent:s.accent, emblem:s.icon,
      crumbs:[{label:"Home",href:"#/home"},{label:"Resource Systems",href:"#/resource-systems"},{label:s.name}],
      eyebrow:"Commoning of", eyebrowIcon:s.icon,
      title:s.name,
      sub:s.desc,
      facts:[["Intended users", s.users],["Expected outcome", s.outcome],["Resources available", total + " resources · English & Hindi"]]
    }) + `
    <section class="sec">
      <div class="sec-head">
        <div>
          <div class="sec-label">The process</div>
          <h2 class="sec-title">Commoning pathway for ${s.name}</h2>
          <p class="sec-sub">Select a stage to see what needs to happen and which resources support it.</p>
        </div>
      </div>
      ${pathway(null, {system:id})}
    </section>

    <section class="sec soft">
      <div class="sec-head">
        <div>
          <div class="sec-label">Topics under ${s.name}</div>
          <h2 class="sec-title">Choose a topic</h2>
          <p class="sec-sub">Each topic gathers the courses, modules and supporting resources that belong together.</p>
        </div>
        <button class="btn btn-ghost" onclick="go('#/modular/${id}')">All resources ${ic("arrow-right")}</button>
      </div>
      <div class="grid g3">
        ${topics.map(t => `<article class="card click flip" style="--acc:${s.accent}" onclick="go('#/modular/${id}?topic=${t.id}')">
          <span class="c-ic">${ic(t.icon)}</span>
          <div class="c-t">${t.name}</div>
          <p class="c-d">${t.desc}</p>
          <div class="c-foot"><div class="between"><span class="arrow-link">View resources ${ic("arrow-right")}</span><span class="tag">${t.count} resource${t.count > 1 ? "s" : ""}</span></div></div>
        </article>`).join("")}
      </div>
    </section>

    <section class="sec">
      <div class="sec-center">
        <div class="sec-label">Learning design</div>
        <h2 class="sec-title">Or choose how you want to learn</h2>
        <p class="sec-sub">The same content, organised three ways — pick the format that fits how you work.</p>
      </div>
      <div class="ld-grid">
        ${LD.map(l => {
          const count = resFor(s.name, l.id).length;
          const href = l.id === "atomized" ? `#/curriculum/${id}` : `#/modular/${id}?g=${l.id}`;
          return `<article class="ld-card ${l.cls}" onclick="go('${href}')">
            <span class="ld-ic">${ic(l.icon)}</span>
            <h3>${l.name}</h3>
            <p>${l.desc}</p>
            <div class="ld-count">${count} resource${count === 1 ? "" : "s"}</div>
            <div class="c-foot" style="padding-top:12px"><span class="arrow-link">Open ${ic("arrow-right")}</span></div>
          </article>`;
        }).join("")}
      </div>
    </section>

    <section class="sec soft">
      ${callout({icon:"file-text", title:"Process documentation by state", text:`Field process documents for ${STATES.join(", ")}.`,
        actions:`<button class="btn btn-solid" onclick="toast('Process documents — placeholder')">View documents ${ic("arrow-right")}</button>`})}
    </section>
  `);
};

/* ── STAGE DETAIL ────────────────────────────────────────────────────────── */
screens.stage = (params) => {
  const s = stageById(params.id) || STAGES[0];
  const sys = params.sys;
  const sysObj = sys && SYSTEMS[sys] ? SYSTEMS[sys] : null;
  const idx = STAGES.indexOf(s);
  const next = STAGES[idx + 1], prev = STAGES[idx - 1];
  const cr = [{label:"Home",href:"#/home"}];
  if(sysObj){ cr.push({label:"Resource Systems",href:"#/resource-systems"}, {label:sysObj.name,href:"#/system/" + sys}); }
  cr.push({label:`Stage ${s.num} — ${s.name}`});
  const pool = (sysObj ? resFor(sysObj.name) : RES).filter(r => r.stage === s.name || r.stage === "All Stages");
  const grouped = LD.map(l => ({ld:l, list:pool.filter(r => r.group === l.id)})).filter(g => g.list.length);

  return shell(null,
    pageHead({
      tone:"sys", accent:sysObj ? sysObj.accent : "var(--blue)", emblem:s.icon,
      crumbs:cr,
      eyebrow:`${sysObj ? sysObj.name + " · " : ""}Stage ${s.num}`, eyebrowIcon:"route",
      title:s.name,
      sub:s.short,
      facts:[["What needs to happen", s.what]]
    }) + `
    <section class="sec">
      <div class="sec-label">Where you are</div>
      <h2 class="sec-title" style="margin-bottom:24px">The Commoning pathway</h2>
      ${pathway(s.id, {system:sys})}
    </section>

    <section class="sec soft">
      <div class="sec-head">
        <div>
          <div class="sec-label">Resources for this stage</div>
          <h2 class="sec-title">${pool.length} resource${pool.length === 1 ? "" : "s"} support this stage</h2>
          <p class="sec-sub">Grouped by learning design — Modular Learning, Atomized Course Curriculum (LDHF) and Supporting Resources.</p>
        </div>
        ${quickFilters()}
      </div>
      ${grouped.length ? grouped.map(g => `
        <div class="mt24">
          <div class="between" style="margin-bottom:16px">
            <div class="row mid" style="gap:10px">
              <span class="rc-ic ${g.ld.cls === "g" ? "d" : (g.ld.cls === "o" ? "t" : "")}">${ic(g.ld.icon)}</span>
              <div><div style="font-size:16px;font-weight:800;color:var(--ink)">${g.ld.name}</div>
              <div style="font-size:12.5px;color:var(--muted-2)">${g.ld.desc}</div></div>
            </div>
            <span class="tag">${g.list.length} item${g.list.length === 1 ? "" : "s"}</span>
          </div>
          <div class="grid g3">${g.list.map(resourceCard).join("")}</div>
        </div>`).join("")
      : `<div class="empty"><span class="e-ic">${ic("package-open")}</span><h4>No resources yet for this stage</h4><p>Resources for this stage of ${sysObj ? sysObj.name : "the Commoning process"} are being prepared.</p><button class="btn btn-ghost" onclick="go('#/library')">Browse the full library</button></div>`}
    </section>

    <section class="sec">
      ${callout({icon:next ? "arrow-right" : "flag", title:next ? "Recommended next step" : "You have reached the final stage",
        text:next ? `Continue to Stage ${next.num} — ${next.name}.` : "Revisit the pathway or return to the resource system.",
        actions:next
          ? `<button class="btn btn-solid" onclick="go('#/stage/${next.id}${sys ? "?sys=" + sys : ""}')">Next: ${next.name} ${ic("arrow-right")}</button>`
          : `<button class="btn btn-solid" onclick="go('${sys ? "#/system/" + sys : "#/resource-systems"}')">Back to resource system ${ic("arrow-right")}</button>`})}
      <div class="between mt24">
        ${prev ? `<button class="btn btn-ghost" onclick="go('#/stage/${prev.id}${sys ? "?sys=" + sys : ""}')">${ic("arrow-left")}Previous: ${prev.name}</button>` : `<span></span>`}
        <button class="btn btn-ghost" onclick="go('${sys ? "#/system/" + sys : "#/resource-systems"}')">All stages ${ic("arrow-right")}</button>
      </div>
    </section>
  `);
};

/* ── MODULAR / RESOURCE GRID ─────────────────────────────────────────────── */
screens.modular = (params) => {
  const id = params.id, s = SYSTEMS[id];
  const label = s ? s.name : "All resources";
  const group = params.g;
  const topic = params.topic ? topicById(params.topic) : null;
  const groupObj = group ? LD.find(l => l.id === group) : null;
  let list = s ? resForTopic(s.name, params.topic) : RES.slice();
  if(group) list = list.filter(r => r.group === group);

  const cr = [{label:"Home",href:"#/home"},{label:"Resource Systems",href:"#/resource-systems"}];
  if(s) cr.push({label:s.name,href:"#/system/" + id});
  cr.push({label:topic ? topic.name : (groupObj ? groupObj.name : "All resources")});

  return shell("#/resource-systems",
    pageHead({
      tone:"sys", accent:s ? s.accent : "var(--blue)", emblem:topic ? topic.icon : (s ? s.icon : "library"),
      crumbs:cr,
      eyebrow:s ? `Commoning of ${s.name}` : "Resource library", eyebrowIcon:"library",
      title:topic ? topic.name : (groupObj ? groupObj.name : label),
      sub:topic ? topic.desc : (groupObj ? groupObj.desc : (s ? s.desc : "Every resource in the repository."))
    }) + `
    <section class="sec">
      ${topic || group ? `<button class="btn btn-ghost btn-sm" style="margin-bottom:20px" onclick="go('#/system/${id || "forests"}')">${ic("arrow-left")}All topics</button>` : ""}
      <div class="with-side">
        <aside class="filters">
          <div class="f-head">${ic("sliders-horizontal")}Filter resources</div>
          <div class="fgroup"><h4>Select state</h4>
            ${["All states"].concat(STATES).map((x, i) => `<label class="fopt"><input type="radio" name="st" ${i === 0 ? "checked" : ""}> ${x}</label>`).join("")}</div>
          <div class="fgroup"><h4>Resource type</h4>
            ${["Training Modules","Training Manuals","Atomised Courses","Videos & Audio","Formats & Tools"].map(x => `<label class="fopt"><input type="checkbox"> ${x}</label>`).join("")}</div>
          <div class="fgroup"><h4>Stakeholder</h4>
            ${["Facilitator","Learner","Field Practitioner","Community Member"].map(x => `<label class="fopt"><input type="checkbox"> ${x}</label>`).join("")}</div>
          <div class="fgroup"><h4>Select language</h4>
            ${["All languages","English","Hindi"].map((x, i) => `<label class="fopt"><input type="radio" name="lang" ${i === 0 ? "checked" : ""}> ${x}</label>`).join("")}</div>
          <div class="filter-actions">
            <button class="btn btn-solid btn-sm" onclick="toast('Filters applied')">Apply</button>
            <button class="btn btn-ghost btn-sm" onclick="clearFilters(this)">Reset</button>
          </div>
        </aside>
        <div>
          <div class="toolbar">
            <div class="count"><b>${list.length}</b> resource${list.length === 1 ? "" : "s"}${topic ? ` in ${topic.name}` : ""}</div>
            ${sortSelect()}
          </div>
          ${list.length
            ? `<div class="course-grid">${list.map((r, i) => courseCard(r, i)).join("")}</div>`
            : `<div class="empty"><span class="e-ic">${ic("package-open")}</span><h4>No resources for this selection</h4><p>Try a different topic, or clear the filters to see everything under ${label}.</p><button class="btn btn-ghost" onclick="go('#/system/${id || "forests"}')">Back to topics</button></div>`}
          <div class="mt32">
            ${callout({icon:"list-checks", title:"Prefer the atomised course curriculum?", text:"Browse short LDHF topics module by module.",
              actions:`<button class="btn btn-solid" onclick="go('#/curriculum/${id || "forests"}')">Atomized Course Curriculum ${ic("arrow-right")}</button>`})}
          </div>
        </div>
      </div>
    </section>
  `);
};

/* ── ATOMIZED COURSE CURRICULUM ──────────────────────────────────────────── */
screens.curriculum = (params) => {
  const id = params.id, s = SYSTEMS[id];
  const label = s ? s.name : "Resource System";
  const cr = [{label:"Home",href:"#/home"},{label:"Resource Systems",href:"#/resource-systems"}];
  if(s) cr.push({label:s.name,href:"#/system/" + id});
  cr.push({label:"Atomized Course Curriculum"});
  const totalTopics = CURRICULUM.reduce((n, m) => n + m.topics.length, 0);

  return shell("#/resource-systems",
    pageHead({
      tone:"sys", accent:"var(--green-d)", emblem:"list-checks",
      crumbs:cr,
      eyebrow:"Low Dose High Frequency (LDHF)", eyebrowIcon:"repeat",
      title:`Training Curriculum — ${label}`,
      sub:"Short, atomised topics grouped into modules. Selecting a topic opens the relevant atomised content on the repository.",
      facts:[["Modules", CURRICULUM.length + " modules"],["Atomised topics", totalTopics + " topics"],["Learning design", "LDHF · short and frequent"]]
    }) + `
    <section class="sec">
      <div class="cur-wrap">
        <aside class="cur-side">
          <div class="cs-h">Modules</div>
          ${CURRICULUM.map((m, i) => `<div class="cur-unit ${i === 0 ? "on" : ""}" onclick="scrollToModule('mod-${m.code}', this)">
            <span class="cu-code">${m.code}</span>
            <div><div class="cu-t">${m.title}</div><div class="cu-s">Topics ${m.topics[0][0]}–${m.topics[m.topics.length - 1][0]}</div></div>
          </div>`).join("")}
          <div class="filter-actions"><button class="btn btn-ghost btn-sm" style="flex:1" onclick="go('#/modular/${id || "forests"}')">${ic("layers")}Modular view</button></div>
        </aside>
        <div class="cur-main">
          ${CURRICULUM.map(m => `<div class="cur-mod" id="mod-${m.code}">
            <div class="cur-mod-head"><span class="cm-code">${m.code}</span><b>${m.title}</b></div>
            ${m.topics.map(t => `<div class="cur-topic" onclick="go('#/resource/what-is-tenure')">
              <span class="ct-code">${t[0]}</span><span class="ct-t">${t[1]}</span>
              <span class="tag">${ic("clock")}8 min</span><span class="ct-go">${ic("chevron-right")}</span>
            </div>`).join("")}
          </div>`).join("")}
        </div>
      </div>
    </section>
    <section class="sec soft">
      ${callout({icon:"layers", title:"Looking for modules or supporting resources instead?", text:"Switch to the modular learning and supporting resources view.",
        actions:`<button class="btn btn-solid" onclick="go('#/modular/${id || "forests"}')">Modular &amp; Supporting ${ic("arrow-right")}</button>`})}
    </section>
  `);
};
function scrollToModule(elId, el){
  document.querySelectorAll(".cur-unit").forEach(u => u.classList.remove("on"));
  if(el) el.classList.add("on");
  const t = document.getElementById(elId);
  if(t) window.scrollTo({top:t.getBoundingClientRect().top + window.scrollY - 90, behavior:"smooth"});
}

/* ── THEME PAGE ──────────────────────────────────────────────────────────── */
screens.theme = (params) => {
  const t = THEMES[params.id];
  if(!t) return screens["resource-systems"]();
  const list = resFor(t.name);
  return shell("#/resource-systems",
    pageHead({
      tone:"sys", accent:"var(--sys-theme)", emblem:t.icon,
      crumbs:[{label:"Home",href:"#/home"},{label:"Resource Systems",href:"#/resource-systems"},{label:t.name}],
      eyebrow:"Theme", eyebrowIcon:t.icon,
      title:t.name,
      sub:t.desc,
      facts:[["Purpose &amp; relevance", t.desc],["Intended users", t.users],["Expected outcome", t.outcome]]
    }) + `
    <section class="sec">
      <div class="sec-center">
        <div class="sec-label">Learning design and materials</div>
        <h2 class="sec-title">Choose how you want to learn</h2>
        <p class="sec-sub">Themes have no stage pathway. Content is delivered as modular learning and as atomised (LDHF) topics, plus supporting resources.</p>
      </div>
      <div class="ld-grid">
        ${LD.map(l => {
          const count = resFor(t.name, l.id).length;
          return `<article class="ld-card ${l.cls}" onclick="toast('${js(l.name)} for ${js(t.name)} — placeholder')">
            <span class="ld-ic">${ic(l.icon)}</span>
            <h3>${l.name}</h3>
            <p>${l.desc}</p>
            <div class="ld-count">${count} resource${count === 1 ? "" : "s"}</div>
            <div class="c-foot" style="padding-top:12px"><span class="arrow-link">Open ${ic("arrow-right")}</span></div>
          </article>`;
        }).join("")}
      </div>
    </section>
    <section class="sec soft">
      <div class="sec-head">
        <div>
          <div class="sec-label">All content</div>
          <h2 class="sec-title">Resources under ${t.name}</h2>
          <p class="sec-sub">Title · purpose · for whom · format · language · view or download.</p>
        </div>
        ${quickFilters()}
      </div>
      ${list.length
        ? `<div class="grid g3">${list.map(resourceCard).join("")}</div>`
        : `<div class="empty"><span class="e-ic">${ic("package-open")}</span><h4>Resources coming soon</h4><p>Resources for this theme are being prepared.</p></div>`}
    </section>
  `);
};

/* ── RESOURCE LIBRARY ────────────────────────────────────────────────────── */
screens.library = () => shell("#/library",
  pageHead({
    crumbs:[{label:"Home",href:"#/home"},{label:"Resource Library"}],
    eyebrow:"Direct access", eyebrowIcon:"library",
    title:"Resource Library",
    sub:"Experienced users can bypass the guided journey. Search or filter to find exactly the resource you need.",
    actions:`<div class="searchfield" style="min-width:min(560px,88vw)">
        ${ic("search")}
        <input placeholder="Search by topic, process, tool or keyword…" id="lib-search"
          onkeydown="if(event.key==='Enter'){go('#/search?q='+encodeURIComponent(this.value))}">
        <button class="btn btn-solid" onclick="go('#/search?q='+encodeURIComponent(document.getElementById('lib-search').value))">Search</button>
      </div>`
  }) + `
  <section class="sec">
    <div class="with-side">
      ${filterSidebar()}
      <div>
        <div class="toolbar">
          <div class="count"><b>${RES.length}</b> resources across ${SYSTEM_IDS.length} systems and ${THEME_LIST.length} themes</div>
          ${sortSelect()}
        </div>
        <div class="row" style="margin-bottom:22px">
          ${["Secure Tenure","Facilitator Guide","Gram Sabha","Restoration","Water access","LDHF"].map(c => `<span class="chip" onclick="go('#/search?q=' + encodeURIComponent('${js(c)}'))">${ic("search")}${c}</span>`).join("")}
        </div>
        <div class="grid g2">${RES.map(resourceCard).join("")}</div>
      </div>
    </div>
  </section>
`);

/* ── SEARCH RESULTS ──────────────────────────────────────────────────────── */
screens.search = (params) => {
  const q = params.q ? decodeURIComponent(params.q) : "";
  const filtered = params.filtered;
  const tagsFor = r => [r.system, r.stage, r.type, r.design, r.lang].filter(x => x && x !== "" && x !== "All Stages");
  const rows = RES.filter(r => {
    if(!q) return true;
    return (r.title + " " + r.purpose + " " + tagsFor(r).join(" ")).toLowerCase().includes(q.toLowerCase());
  });
  return shell("#/library",
    pageHead({
      crumbs:[{label:"Home",href:"#/home"},{label:"Resource Library",href:"#/library"},{label:"Search results"}],
      eyebrow:"Search", eyebrowIcon:"search",
      title:q ? `Results for “${esc(q)}”` : "Search the repository",
      sub:`${rows.length} resource${rows.length === 1 ? "" : "s"} found${filtered ? " · filters applied" : ""}.`,
      actions:`<div class="searchfield" style="min-width:min(560px,88vw)">
          ${ic("search")}
          <input id="results-search" placeholder="Search by topic, process, tool or keyword…" value="${esc(q)}"
            onkeydown="if(event.key==='Enter'){go('#/search?q='+encodeURIComponent(this.value))}">
          <button class="btn btn-solid" onclick="go('#/search?q='+encodeURIComponent(document.getElementById('results-search').value))">Search</button>
        </div>`
    }) + `
    <section class="sec">
      <div class="with-side">
        ${filterSidebar()}
        <div>
          <div class="toolbar">
            <div class="count"><b>${rows.length}</b> result${rows.length === 1 ? "" : "s"}${q ? ` for “${esc(q)}”` : ""}</div>
            ${sortSelect()}
          </div>
          ${rows.length ? `<div class="stack">${rows.map(r => {
            const k = mediaKind(r.type);
            return `<article class="result-row">
              <span class="rc-ic ${k.cls}" style="width:46px;height:46px;border-radius:13px">${ic(k.icon)}</span>
              <div class="rr-main">
                <h4>${r.title}</h4>
                <p class="purpose">${r.purpose}</p>
                <div class="tags">${tagsFor(r).map((t, i) => `<span class="tag ${i === 0 ? "blue" : ""}">${t}</span>`).join("")}</div>
              </div>
              <div class="rr-side">
                <button class="btn btn-solid btn-sm" onclick="go('#/resource/${r.id}')">View ${ic("arrow-right")}</button>
                <button class="btn btn-ghost btn-sm" onclick="download('${js(r.title)}')">${ic("download")}Download</button>
              </div>
            </article>`;
          }).join("")}</div>`
          : `<div class="empty"><span class="e-ic">${ic("search-x")}</span><h4>No results found</h4><p>We could not find anything for “${esc(q)}”. Try a different keyword, or clear the filters and browse the library.</p>
              <div class="row" style="justify-content:center"><button class="btn btn-solid" onclick="go('#/library')">Browse the library</button><button class="btn btn-ghost" onclick="openSearch()">New search</button></div></div>`}
        </div>
      </div>
    </section>
  `);
};

/* ── RESOURCE DETAIL ─────────────────────────────────────────────────────── */
function resourceCrumbs(r){
  const home = {label:"Home",href:"#/home"};
  const raw = prevRoute || "";
  const query = raw.includes("?") ? raw.slice(raw.indexOf("?") + 1) : "";
  const seg = raw.replace(/\?.*$/, "").replace(/^#\//, "").split("/");
  const topicId = (query.match(/topic=([^&]+)/) || [])[1];
  const here = {label:r.title};
  if((seg[0] === "modular" || seg[0] === "system") && SYSTEMS[seg[1]]){
    const s = SYSTEMS[seg[1]], t = topicId ? topicById(topicId) : null;
    const mid = t ? {label:t.name, href:`#/modular/${seg[1]}?topic=${topicId}`} : {label:"Resources", href:"#/system/" + seg[1]};
    return [home,{label:"Resource Systems",href:"#/resource-systems"},{label:s.name,href:"#/system/" + seg[1]},mid,here];
  }
  if(seg[0] === "curriculum" && SYSTEMS[seg[1]])
    return [home,{label:"Resource Systems",href:"#/resource-systems"},{label:SYSTEMS[seg[1]].name,href:"#/system/" + seg[1]},{label:"Atomized Course Curriculum",href:"#/curriculum/" + seg[1]},here];
  if(seg[0] === "theme" && THEMES[seg[1]])
    return [home,{label:"Resource Systems",href:"#/resource-systems"},{label:THEMES[seg[1]].name,href:"#/theme/" + seg[1]},here];
  if(seg[0] === "search") return [home,{label:"Resource Library",href:"#/library"},{label:"Search results",href:"#/search"},here];
  if(seg[0] === "my-learning") return [home,{label:"My Learning",href:"#/my-learning"},here];
  return [home,{label:"Resource Library",href:"#/library"},here];
}

screens.resource = (params) => {
  const r = resById(params.id) || RES[0];
  const k = mediaKind(r.type);
  const acc = accentFor(r.system);
  const related = RES.filter(x => x.id !== r.id && (x.system === r.system || x.stage === r.stage)).slice(0, 3);
  const relatedList = related.length ? related : RES.filter(x => x.id !== r.id).slice(0, 3);
  const nextRes = RES[(RES.indexOf(r) + 1) % RES.length];

  return shell(null,
    pageHead({
      crumbs:resourceCrumbs(r),
      eyebrow:r.type, eyebrowIcon:k.icon,
      title:r.title,
      sub:r.purpose,
      actions:`<button class="btn btn-solid btn-lg" onclick="toast('Opening resource viewer — placeholder')">${ic(k.icon)}${k.label} now</button>
        <button class="btn btn-ghost btn-lg" onclick="download('${js(r.title)}')">${ic("download")}Download</button>
        ${isRegistered() ? `<button class="btn btn-ghost btn-lg" onclick="toast('Saved to My Learning')">${ic("bookmark")}Save</button>` : ""}
        ${isAdmin() ? `<button class="btn btn-ghost btn-lg" onclick="toast('Edit resource — placeholder')">${ic("pencil")}Edit</button>` : ""}`
    }) + `
    <section class="sec">
      <div class="tags" style="margin-bottom:26px">
        <span class="tag blue">${ic("trees")}${r.system}</span>
        ${r.stage && r.stage !== "" ? `<span class="tag">${ic("route")}${r.stage}</span>` : ""}
        <span class="tag">${ic("user")}${r.stake}</span>
        <span class="tag">${ic("layers")}${r.design}</span>
        <span class="tag">${ic("file-text")}${r.type}</span>
        <span class="tag">${ic("languages")}${r.lang}</span>
        <span class="tag green">${ic("badge-check")}${r.version}</span>
        ${r.attribution ? `<span class="tag">${ic("heart-handshake")}${r.attribution}</span>` : ""}
      </div>
      <div class="grid g2" style="gap:26px">
        <div class="preview ${k.cls === "d" ? "green" : ""}">
          <div class="pv">
            <div class="pv-play" onclick="toast('Opening resource viewer — placeholder')">${ic(k.icon)}</div>
            <div class="pv-t">${r.type} · ${r.lang}</div>
            <div class="pv-s">${k.label} this resource in the repository viewer</div>
          </div>
        </div>
        <div class="stack">
          <div class="ctx"><h5>${ic("info")}What is this resource?</h5><p>${r.purpose}</p></div>
          <div class="ctx"><h5>${ic("clock")}When should it be used?</h5><p>${r.stage && r.stage !== "" ? `During the ${r.stage} stage of the Commoning process.` : `When working on ${r.system}.`}</p></div>
          <div class="ctx"><h5>${ic("users")}Who should use it?</h5><p>${r.stake}s and those supporting them in the field.</p></div>
        </div>
      </div>
      <div class="grid g2 mt24">
        <div class="ctx"><h5>${ic("arrow-left")}What should happen before this?</h5><p>Complete the preceding learning and the context mapping for this stage, so the discussion is grounded in the local situation.</p></div>
        <div class="ctx"><h5>${ic("arrow-right")}What should happen after this?</h5><p>Move to the facilitation session, then to the related field action with the community institution.</p></div>
        <div class="ctx"><h5>${ic("hand-helping")}How should it be facilitated?</h5><p>Follow the guided steps, and adapt language, examples and pace to the local community context.</p></div>
        <div class="ctx click" onclick="go('#/resource/tenure-claim-tool')"><h5>${ic("clipboard-list")}Related field action</h5><p><span class="arrow-link">Community Rights Claim Toolkit ${ic("arrow-right")}</span></p></div>
      </div>
    </section>

    <section class="sec soft">
      <div class="thread" style="background:linear-gradient(150deg,#1F6B33,#2E8540 60%,#39A248)">
        <div class="t-label">Guided mentoring prompt</div>
        <h3 style="font-size:19px;max-width:760px;line-height:1.45">“After using this resource, reflect with the community: what changed in how you make collective decisions? Note one question to raise with your mentor.”</h3>
        <div class="row mt16">
          <button class="btn btn-white btn-sm" style="padding:11px 22px" onclick="openContact()">${ic("life-buoy")}Get support</button>
          <button class="btn btn-ghost btn-sm" style="background:transparent;color:#fff;border-color:rgba(255,255,255,.35);padding:11px 22px" onclick="go('#/help/ldhf')">About guided mentoring</button>
        </div>
      </div>
    </section>

    <section class="sec">
      ${callout({icon:"arrow-right", title:"Recommended next resource", text:`Continue the guided journey with “${nextRes.title}”.`,
        actions:`<button class="btn btn-solid" onclick="go('#/resource/${nextRes.id}')">Continue ${ic("arrow-right")}</button>`})}
      <div class="sec-label" style="margin:38px 0 16px">Related resources</div>
      <div class="grid g3">${relatedList.map(resourceCard).join("")}</div>
      <div class="mt24"><button class="btn btn-ghost" onclick="goBack()">${ic("arrow-left")}Back</button></div>
    </section>
  `);
};

/* ── STORY DETAIL ────────────────────────────────────────────────────────── */
screens.story = (params) => {
  const s = storyById(params.id) || STORIES[0];
  const sysId = systemIdByName(s.system);
  return shell(null,
    pageHead({
      tone:"sys", accent:accentFor(s.system), emblem:"quote",
      crumbs:[{label:"Home",href:"#/home"},{label:"Commoning in Action"},{label:s.system}],
      eyebrow:"Commoning in action · field story", eyebrowIcon:"map-pin",
      title:s.title,
      sub:s.excerpt,
      facts:[["Resource system", s.system],["Commoning stage", s.stage],["Location", s.place]]
    }) + `
    <section class="sec">
      <div class="grid g2" style="gap:30px">
        <div class="preview story"><div class="pv"><div class="pv-play" onclick="toast('Photo gallery — placeholder')">${ic("image")}</div><div class="pv-t">Field photographs</div><div class="pv-s">${s.place}</div></div></div>
        <div class="panel">
          <h3>What happened</h3>
          <p>${s.excerpt}</p>
          <p>The community worked through the ${s.stage} stage of the Commoning pathway — convening the institution, agreeing what needed to change, and recording the decisions so they could be enforced and revisited later.</p>
          <p>Facilitators used the resources gathered under ${s.system} in this repository, adapting the sessions and formats to the local language, seasonal calendar and existing customary practice.</p>
          <div class="tags mt16"><span class="tag blue">${s.system}</span><span class="tag">${s.stage}</span><span class="tag green">${ic("map-pin")}${s.place}</span></div>
        </div>
      </div>
    </section>
    <section class="sec soft">
      <div class="sec-label">Resources used</div>
      <h2 class="sec-title" style="margin-bottom:24px">What supported this work</h2>
      <div class="grid g3">${resFor(s.system).slice(0, 3).map(resourceCard).join("")}</div>
    </section>
    <section class="sec">
      ${callout({icon:"trees", title:"Want to do this in your context?", text:`Follow the ${s.stage} stage for ${s.system}.`,
        actions:`<button class="btn btn-solid" onclick="go('#/system/${sysId || "forests"}')">Open ${s.system} ${ic("arrow-right")}</button>
                 <button class="btn btn-ghost" onclick="go('#/home')">More stories</button>`})}
    </section>
  `);
};

/* ── HELP INDEX ──────────────────────────────────────────────────────────── */
screens.help = () => shell("#/help",
  pageHead({
    crumbs:[{label:"Home",href:"#/home"},{label:"Help"}],
    eyebrow:"Support", eyebrowIcon:"life-buoy",
    title:"Help &amp; guidance",
    sub:"Guidance on using the repository, finding resources and understanding the Commoning approach. Each topic opens its own page.",
    actions:`<button class="btn btn-solid" onclick="openContact()">${ic("message-circle")}Contact &amp; support</button>
             <button class="btn btn-ghost" onclick="openTour()">Take a tour</button>`
  }) + `
  <section class="sec">
    <div class="grid g3">
      ${HELP.map(h => `<article class="card click flip" onclick="go('#/help/${h.id}')">
        <span class="c-ic">${ic(h.icon)}</span>
        <div class="c-t">${h.title}</div>
        <p class="c-d">${h.desc}</p>
        <div class="c-foot"><span class="arrow-link">Open ${ic("arrow-right")}</span></div>
      </article>`).join("")}
    </div>
  </section>
  <section class="sec soft">
    <div class="sec-head">
      <div><div class="sec-label">Quick answers</div><h2 class="sec-title">Frequently asked questions</h2></div>
      <button class="btn btn-ghost" onclick="go('#/help/faq')">All FAQs ${ic("arrow-right")}</button>
    </div>
    <div class="qa">
      ${FAQS.slice(0, 3).map((f, i) => `<div class="qitem ${i === 0 ? "open" : ""}" id="faq-${i}">
        <div class="qq" onclick="toggleQA('faq-${i}')">${f[0]}<span class="qi">${ic("chevron-down")}</span></div>
        <div class="qa-body ${i === 0 ? "" : "hidden"}">${f[1]}</div>
      </div>`).join("")}
    </div>
  </section>
  <section class="sec">
    ${callout({icon:"life-buoy", title:"Still need help?", text:"Reach the Karyashala team or request a guided mentoring session.",
      actions:`<button class="btn btn-solid" onclick="openContact()">Get support ${ic("arrow-right")}</button>`})}
  </section>
`);

/* ── HELP TOPIC ──────────────────────────────────────────────────────────── */
screens.helptopic = (params) => {
  const h = helpById(params.id) || HELP[0];
  const nextTopic = HELP[(HELP.indexOf(h) + 1) % HELP.length];
  let body = "";

  if(h.id === "faq"){
    body = `<div class="qa">${FAQS.map((f, i) => `<div class="qitem ${i === 0 ? "open" : ""}" id="fq-${i}">
      <div class="qq" onclick="toggleQA('fq-${i}')">${f[0]}<span class="qi">${ic("chevron-down")}</span></div>
      <div class="qa-body ${i === 0 ? "" : "hidden"}">${f[1]}</div></div>`).join("")}</div>`;
  }
  else if(h.id === "how-to-use"){
    body = `<p class="sec-sub">There are two ways to use the repository. New users follow the guided journey; experienced users go straight to what they need.</p>
      <div class="grid g2">
        <div class="panel"><h3>${ic("route")} Guided journey</h3>
          <p>Understand the idea → learn the approach → choose a resource system → follow the pathway → access Learn, Facilitate, Act and Support resources at each stage.</p>
          <div class="mt16"><button class="btn btn-solid btn-sm" onclick="go('#/commoning')">Start Learning ${ic("arrow-right")}</button></div></div>
        <div class="panel"><h3>${ic("search")} Direct access</h3>
          <p>Go to the Resource Library, search or filter by system, stage, stakeholder, format and language, then open the resource you need.</p>
          <div class="mt16"><button class="btn btn-solid btn-sm" onclick="go('#/library')">Resource Library ${ic("arrow-right")}</button></div></div>
      </div>
      <div class="mt24">${callout({icon:"lightbulb", title:"The pathway stays with you", text:"Wherever you are, the Commoning pathway is visible so you always know where you are in the process.", actions:`<button class="btn btn-ghost" onclick="go('#/help/commoning-stages')">See the stages</button>`})}</div>`;
  }
  else if(h.id === "how-to-find"){
    body = `<p class="sec-sub">There are three ways to find a specific resource.</p>
      <div class="grid g3">
        <article class="card hover"><span class="c-ic">${ic("search")}</span><div class="c-t">1 · Search</div><p class="c-d">Search by topic, process, tool or keyword from anywhere in the repository.</p><div class="c-foot"><button class="btn btn-ghost btn-sm" onclick="openSearch()">Open search</button></div></article>
        <article class="card hover"><span class="c-ic">${ic("sliders-horizontal")}</span><div class="c-t">2 · Filter</div><p class="c-d">Filter by system, stage, stakeholder, learning design, type and language.</p><div class="c-foot"><button class="btn btn-ghost btn-sm" onclick="go('#/library')">Open library</button></div></article>
        <article class="card hover"><span class="c-ic">${ic("route")}</span><div class="c-t">3 · Browse by stage</div><p class="c-d">Open a resource system and pick a stage to see the resources that support it.</p><div class="c-foot"><button class="btn btn-ghost btn-sm" onclick="go('#/resource-systems')">Resource systems</button></div></article>
      </div>`;
  }
  else if(h.id === "commoning-stages"){
    body = `<p class="sec-sub">The Commoning process has six stages. The active stage is always highlighted, and each stage tells you what needs to happen.</p>
      ${pathway(null)}
      <div class="grid g2 mt24">${STAGES.map(s => `<div class="ctx click" onclick="go('#/stage/${s.id}')"><h5>${ic(s.icon)}${s.num} · ${s.name}</h5><p>${s.what}</p></div>`).join("")}</div>`;
  }
  else if(h.id === "modular-learning"){
    body = `<p class="sec-sub">Modular Learning breaks the Commoning process into progressive modules, with field activity between them.</p>
      <div class="flow">
        <div class="node">${ic("book-open")}Learning module</div><span class="arw">${ic("arrow-right")}</span>
        <div class="node">${ic("footprints")}Field activity</div><span class="arw">${ic("arrow-right")}</span>
        <div class="node">${ic("layers")}Next module</div><span class="arw">${ic("arrow-right")}</span>
        <div class="node">${ic("hammer")}Field action</div><span class="arw">${ic("arrow-right")}</span>
        <div class="node strong">${ic("flag")}Outcome</div>
      </div>
      <ul class="bullets mt24">
        <li>${ic("circle-check")}Progressive stages that build on one another</li>
        <li>${ic("circle-check")}Periodic in-person sessions</li>
        <li>${ic("circle-check")}Field activities between modules</li>
        <li>${ic("circle-check")}Each module builds on the previous one</li>
        <li>${ic("circle-check")}Cumulative field action contributes to the outcome</li>
      </ul>
      <div class="mt24"><button class="btn btn-solid btn-sm" onclick="go('#/learning-approach')">See the full Learning Approach ${ic("arrow-right")}</button></div>`;
  }
  else if(h.id === "ldhf"){
    body = `<p class="sec-sub">Low Dose High Frequency delivers short, frequent, task-focused learning with mentoring between sessions.</p>
      <div class="flow">
        <div class="node green">${ic("zap")}Short learning</div><span class="arw">${ic("arrow-right")}</span>
        <div class="node green">${ic("footprints")}Field application</div><span class="arw">${ic("arrow-right")}</span>
        <div class="node green">${ic("message-circle")}Feedback</div><span class="arw">${ic("arrow-right")}</span>
        <div class="node green">${ic("hand-helping")}Mentoring</div><span class="arw">${ic("arrow-right")}</span>
        <div class="node strong">${ic("refresh-cw")}Repeat</div>
      </div>
      <ul class="bullets mt24">
        <li>${ic("circle-check")}Short virtual engagements</li>
        <li>${ic("circle-check")}Atomized content focused on one concept or task</li>
        <li>${ic("circle-check")}Guided mentoring between sessions</li>
        <li>${ic("circle-check")}Repeated learning, application and feedback cycles</li>
      </ul>
      <div class="mt24"><button class="btn btn-solid btn-sm" onclick="go('#/learning-approach')">See the full Learning Approach ${ic("arrow-right")}</button></div>`;
  }

  return shell("#/help",
    pageHead({
      crumbs:[{label:"Home",href:"#/home"},{label:"Help",href:"#/help"},{label:h.title}],
      eyebrow:"Help", eyebrowIcon:h.icon,
      title:h.title, sub:h.desc
    }) + `
    <section class="sec">${body}</section>
    <section class="sec soft">
      <div class="between">
        <button class="btn btn-ghost" onclick="go('#/help')">${ic("arrow-left")}All help topics</button>
        <div class="row">
          <button class="btn btn-ghost" onclick="openContact()">${ic("message-circle")}Contact &amp; support</button>
          <button class="btn btn-solid" onclick="go('#/help/${nextTopic.id}')">Next: ${nextTopic.title} ${ic("arrow-right")}</button>
        </div>
      </div>
    </section>
  `);
};

/* ── SIGN IN ─────────────────────────────────────────────────────────────── */
screens.login = () => header(null) + `
  <main><div class="authwrap">
    <div class="auth-form">
      <div class="auth-inner">
        <button class="btn btn-quiet" style="margin-bottom:18px" onclick="go('#/home')">${ic("arrow-left")}Back to the repository</button>
        <h2 class="auth-h">Welcome back</h2>
        <p class="auth-sub">Sign in to download resources, save them to My Learning and track your progress.</p>

        <div class="field">
          <label>${ic("mail")}Email address</label>
          <div class="inp"><span class="lead">${ic("mail")}</span><input type="email" placeholder="you@example.org"></div>
        </div>
        <div class="field">
          <label>${ic("lock")}Password</label>
          <div class="inp"><span class="lead">${ic("lock")}</span><input type="password" placeholder="••••••••"><span class="tail" onclick="togglePw(this)">${ic("eye")}</span></div>
        </div>
        <button class="btn btn-quiet" style="margin-bottom:16px" onclick="toast('Password reset — placeholder')">Forgot password?</button>
        <button class="btn btn-solid btn-block" onclick="setRole('registered')">Sign In ${ic("arrow-right")}</button>
        <p class="auth-alt">New here? <a onclick="toast('Create an account — placeholder')">Create an account</a></p>

        <div class="divide">or continue as</div>
        <div class="rolepick">
          <button class="rolebtn" onclick="setRole('visitor')">
            <span class="rb-ic">${ic("eye")}</span>
            <span><span class="rb-n">Visitor — no account needed</span><span class="rb-d">Browse and read everything. Downloads require sign in.</span></span>
            <span class="rb-go">${ic("arrow-right")}</span>
          </button>
          <button class="rolebtn" onclick="setRole('admin')">
            <span class="rb-ic">${ic("shield")}</span>
            <span><span class="rb-n">Platform Super Admin</span><span class="rb-d">Manage resources, uploads, users and metadata.</span></span>
            <span class="rb-go">${ic("arrow-right")}</span>
          </button>
        </div>
        <p class="auth-alt" style="font-size:12.5px;margin-top:22px">Prototype — each option simply switches the demo role. You can switch again from the header at any time.</p>
      </div>
    </div>
    <div class="auth-panel">
      <span class="glow g"></span><span class="glow b"></span>
      <span class="amk">${ic("sprout")}</span>
      <h2>A learning system for the Commoning of Commons</h2>
      <p class="apsub">Learn the idea, learn the method, then follow the pathway all the way to action on the ground.</p>
      <ul class="abul">
        <li>${ic("circle-check")}<span>${RES.length}+ learning resources across forests, pasturelands and water</span></li>
        <li>${ic("circle-check")}<span>Six-stage Commoning pathway with resources at every stage</span></li>
        <li>${ic("circle-check")}<span>Modular Learning and LDHF content side by side</span></li>
        <li>${ic("circle-check")}<span>Guided mentoring and facilitation support</span></li>
        <li>${ic("circle-check")}<span>Available in English and Hindi</span></li>
      </ul>
    </div>
  </div></main>`;
function togglePw(el){
  const input = el.parentElement.querySelector("input");
  const show = input.type === "password";
  input.type = show ? "text" : "password";
  el.innerHTML = `<i data-lucide="${show ? "eye-off" : "eye"}"></i>`;
  if(window.lucide) lucide.createIcons();
}

/* ── MY LEARNING ─────────────────────────────────────────────────────────── */
screens["my-learning"] = () => {
  if(!isRegistered()) return gateScreen("My Learning", "Sign in as a registered user to save resources and track your learning.");
  const saved = RES.slice(0, 3);
  const inProgress = RES.slice(3, 5);
  return shell(null,
    pageHead({
      crumbs:[{label:"Home",href:"#/home"},{label:"My Learning"}],
      eyebrow:roleLabel(), eyebrowIcon:"user",
      title:"My Learning",
      sub:"Your saved resources, progress and recommended next steps.",
      actions:`<button class="btn btn-solid" onclick="go('#/library')">Find more resources ${ic("arrow-right")}</button>`
    }) + `
    <section class="sec">
      <div class="grid g4">
        <div class="stat"><div class="st-top"><span class="st-l">In progress</span><span class="st-ic">${ic("book-open")}</span></div><div class="st-v">2</div><div class="st-d">courses started</div></div>
        <div class="stat"><div class="st-top"><span class="st-l">Saved</span><span class="st-ic">${ic("bookmark")}</span></div><div class="st-v">3</div><div class="st-d">resources bookmarked</div></div>
        <div class="stat"><div class="st-top"><span class="st-l">Downloads</span><span class="st-ic">${ic("download")}</span></div><div class="st-v">5</div><div class="st-d">files downloaded</div></div>
        <div class="stat"><div class="st-top"><span class="st-l">Stages covered</span><span class="st-ic">${ic("route")}</span></div><div class="st-v">2/6</div><div class="st-d">of the pathway</div></div>
      </div>
    </section>
    <section class="sec soft">
      <div class="sec-head"><div><div class="sec-label">Continue</div><h2 class="sec-title">In progress</h2><p class="sec-sub">Pick up where you left off.</p></div></div>
      <div class="grid g3">${inProgress.map(resourceCard).join("")}</div>
    </section>
    <section class="sec">
      <div class="sec-head"><div><div class="sec-label">Bookmarks</div><h2 class="sec-title">Saved resources</h2><p class="sec-sub">Resources you saved for later.</p></div></div>
      <div class="grid g3">${saved.map(resourceCard).join("")}</div>
    </section>
    <section class="sec soft">
      ${callout({icon:"arrow-right", title:"Recommended next", text:"Continue the guided journey with the next resource for your stage.",
        actions:`<button class="btn btn-solid" onclick="go('#/resource/cfr-claim')">Continue ${ic("arrow-right")}</button>`})}
    </section>
  `);
};

/* ── ADMIN DASHBOARD ─────────────────────────────────────────────────────── */
screens.admin = () => {
  if(!isAdmin()) return gateScreen("Admin Dashboard", "Sign in as the Platform Super Admin to manage the repository.");
  const metaFields = ["Resource title","One-line purpose","Resource system or theme","Commoning stage (systems only)","Intended stakeholder / user",
    "Learning design (Modular / LDHF / Both)","Resource type","Language","Version and date","Attribution to contributor (non-FES)","File — view and download"];
  const users = [["a.sharma@fes.org","Registered User","AS"],["m.rao@partner.org","Registered User","MR"],["admin@fes.org","Platform Super Admin","AD"]];
  return shell(null,
    pageHead({
      crumbs:[{label:"Home",href:"#/home"},{label:"Admin Dashboard"}],
      eyebrow:"Platform Super Admin", eyebrowIcon:"shield",
      title:"Admin Dashboard",
      sub:"Add, edit, upload and publish resources. Every resource follows the required metadata structure so the repository stays easy to navigate and maintain.",
      actions:`<button class="btn btn-solid btn-lg" onclick="toast('Upload form — placeholder')">${ic("plus")}Add / upload resource</button>
               <button class="btn btn-ghost btn-lg" onclick="toast('Export catalogue — placeholder')">${ic("download")}Export catalogue</button>`
    }) + `
    <section class="sec">
      <div class="grid g4">
        <div class="stat"><div class="st-top"><span class="st-l">Resources</span><span class="st-ic">${ic("library")}</span></div><div class="st-v">${RES.length}</div><div class="st-d">published</div></div>
        <div class="stat"><div class="st-top"><span class="st-l">Resource systems</span><span class="st-ic">${ic("trees")}</span></div><div class="st-v">${SYSTEM_IDS.length}</div><div class="st-d">with pathways</div></div>
        <div class="stat"><div class="st-top"><span class="st-l">Themes</span><span class="st-ic">${ic("network")}</span></div><div class="st-v">${THEME_LIST.length}</div><div class="st-d">cross-cutting</div></div>
        <div class="stat"><div class="st-top"><span class="st-l">Registered users</span><span class="st-ic">${ic("users")}</span></div><div class="st-v">128</div><div class="st-d">across partners</div></div>
      </div>
    </section>

    <section class="sec soft">
      <div class="sec-head">
        <div><div class="sec-label">Content management</div><h2 class="sec-title">Resource catalogue</h2><p class="sec-sub">Add, edit, upload and publish resources.</p></div>
        <div class="row">
          <button class="btn btn-ghost btn-sm" onclick="toast('Manage systems — placeholder')">${ic("trees")}Systems</button>
          <button class="btn btn-ghost btn-sm" onclick="toast('Manage themes — placeholder')">${ic("network")}Themes</button>
        </div>
      </div>
      <div class="tablewrap"><div class="tscroll">
        <table class="tbl">
          <thead><tr><th>Title</th><th>System / theme</th><th>Type</th><th>Design</th><th>Language</th><th>Version</th><th>Actions</th></tr></thead>
          <tbody>
            ${RES.slice(0, 8).map(r => `<tr>
              <td class="tt">${r.title}</td>
              <td><span class="tag blue">${r.system}</span></td>
              <td>${r.type}</td><td>${r.design}</td><td>${r.lang}</td><td>${r.version}</td>
              <td><div class="tact">
                <button title="View" onclick="go('#/resource/${r.id}')">${ic("eye")}</button>
                <button title="Edit" onclick="toast('Edit — ${js(r.title)}')">${ic("pencil")}</button>
                <button class="dz" title="Unpublish" onclick="toast('Unpublish — placeholder')">${ic("eye-off")}</button>
              </div></td>
            </tr>`).join("")}
          </tbody>
        </table>
      </div></div>
      <div class="mt16"><button class="btn btn-ghost btn-sm" onclick="go('#/library')">View all ${RES.length} resources ${ic("arrow-right")}</button></div>
    </section>

    <section class="sec">
      <div class="grid g2">
        <div class="panel">
          <h3>${ic("clipboard-list")} Add / upload resource — required fields</h3>
          <p>A consistent metadata structure keeps the repository easy to navigate and maintain.</p>
          <ul class="bullets">${metaFields.map(f => `<li>${ic("circle-check")}${f}</li>`).join("")}</ul>
          <div class="mt24"><button class="btn btn-solid btn-sm" onclick="toast('Upload form — placeholder')">${ic("upload")}Open upload form</button></div>
        </div>
        <div class="panel">
          <div class="between" style="margin-bottom:16px"><h3 style="margin:0">${ic("users")} User management</h3>
            <button class="btn btn-ghost btn-sm" onclick="toast('Invite user — placeholder')">${ic("plus")}Invite user</button></div>
          <div class="stack" style="gap:10px">
            ${users.map(u => `<div class="urow">
              <span class="uav">${u[2]}</span>
              <div style="flex:1;min-width:0"><div class="un">${u[0]}</div><div class="ur">${u[1]}</div></div>
              <button class="btn btn-ghost btn-sm" onclick="toast('Manage user — placeholder')">Manage</button>
            </div>`).join("")}
          </div>
          <div class="mt24"><button class="btn btn-ghost btn-sm" onclick="toast('All users — placeholder')">View all 128 users ${ic("arrow-right")}</button></div>
        </div>
      </div>
    </section>
  `);
};

function gateScreen(title, msg){
  return shell(null,
    pageHead({
      crumbs:[{label:"Home",href:"#/home"},{label:title}],
      eyebrow:"Restricted", eyebrowIcon:"lock",
      title:title, sub:"You do not have access to this area with your current role."
    }) + `
    <section class="sec">
      <div class="empty">
        <span class="e-ic">${ic("lock")}</span>
        <h4>Sign in to continue</h4>
        <p>${msg}</p>
        <div class="row" style="justify-content:center">
          <button class="btn btn-solid" onclick="go('#/login')">Sign In ${ic("arrow-right")}</button>
          <button class="btn btn-ghost" onclick="go('#/home')">Back to home</button>
        </div>
      </div>
    </section>`);
}

/* ============================================================================
   OVERLAYS
   ========================================================================== */
function searchOverlayHTML(){
  const suggestions = ["Secure Tenure","Facilitator Guide","Forest rights","Restoration protocol","Water access","LDHF","Gram Sabha"];
  return `<button class="modal-x" onclick="closeSearch()">${ic("x")}</button>
    <h3>What are you looking for?</h3>
    <p class="m-sub">Search by topic, process, tool, resource or keyword across the whole repository.</p>
    <div class="searchfield mt16">
      ${ic("search")}
      <input id="overlay-input" placeholder="Type to search…" onkeydown="if(event.key==='Enter'){runSearch(this.value)}">
      <button class="btn btn-solid" onclick="runSearch(document.getElementById('overlay-input').value)">Search</button>
    </div>
    <div class="sec-label" style="margin:22px 0 12px">Recent &amp; popular</div>
    <div class="row">${suggestions.map(s => `<span class="chip" onclick="runSearch('${js(s)}')">${ic("search")}${s}</span>`).join("")}</div>
    <div class="sec-label" style="margin:22px 0 12px">Jump to</div>
    <div class="row">
      <span class="chip" onclick="closeSearch();go('#/library')">${ic("library")}Resource Library</span>
      <span class="chip" onclick="closeSearch();go('#/resource-systems')">${ic("trees")}Resource Systems</span>
      <span class="chip" onclick="closeSearch();go('#/help')">${ic("life-buoy")}Help</span>
    </div>`;
}
function contactModalHTML(){
  return `<button class="modal-x" onclick="closeContact()">${ic("x")}</button>
    <h3>Contact &amp; support</h3>
    <p class="m-sub">Reach the Karyashala team or a mentor for guided support.</p>
    <div class="stack mt16">
      <div class="ctx"><h5>${ic("hand-helping")}Guided mentoring</h5><p>Request a mentoring session for your current Commoning stage.</p></div>
      <div class="ctx"><h5>${ic("mail")}Email</h5><p>support@fes-karyashala.example</p></div>
      <div class="ctx"><h5>${ic("phone")}Phone</h5><p>+91 00000 00000 · Monday–Friday, 10am–5pm</p></div>
      <div class="ctx"><h5>${ic("life-buoy")}Help desk</h5><p>Raise a query and the team will respond within two working days.</p></div>
    </div>
    <div class="row mt24">
      <button class="btn btn-solid" onclick="toast('Mentoring request sent — placeholder');closeContact()">${ic("hand-helping")}Request guided mentoring</button>
      <button class="btn btn-ghost" onclick="closeContact()">Close</button>
    </div>`;
}
function tourModalHTML(){
  return `<button class="modal-x" onclick="closeTour()">${ic("x")}</button>
    <h3>Take a tour · get started</h3>
    <p class="m-sub">Five steps to find your way around the repository.</p>
    <div class="stack mt16" style="gap:10px">
      ${JOURNEY5.map(s => `<div class="tourstep" onclick="closeTour();go('${s.href}')">
        <span class="ts-n">${s.n}</span>
        <div><div class="ts-k">${s.k}</div><div class="ts-q">${s.q}</div><div class="ts-d">${s.d}</div></div>
      </div>`).join("")}
    </div>
    <div class="row mt24">
      <button class="btn btn-solid" onclick="closeTour();go('#/commoning')">Start Learning ${ic("arrow-right")}</button>
      <button class="btn btn-ghost" onclick="closeTour();go('#/resource-systems')">Choose a resource system</button>
    </div>`;
}
function menuModalHTML(){
  return `<button class="modal-x" onclick="closeMenu()">${ic("x")}</button>
    <h3>Menu</h3>
    <p class="m-sub">Navigate the repository.</p>
    <div class="stack mt16" style="gap:8px">
      ${NAV.map(n => `<div class="tourstep" onclick="closeMenu();go('${n.id}')"><span class="ts-n">${ic("chevron-right")}</span><div><div class="ts-q">${n.long}</div></div></div>`).join("")}
      <div class="tourstep" onclick="closeMenu();go('#/about')"><span class="ts-n">${ic("chevron-right")}</span><div><div class="ts-q">About</div></div></div>
    </div>`;
}

function openOverlay(id, html){
  document.getElementById(id + "-panel").innerHTML = html;
  document.getElementById(id + "-overlay").classList.add("open");
  if(window.lucide) lucide.createIcons();
}
const closeOverlay = id => document.getElementById(id + "-overlay").classList.remove("open");
function openSearch(){ openOverlay("search", searchOverlayHTML()); setTimeout(() => { const i = document.getElementById("overlay-input"); if(i) i.focus(); }, 40); }
const closeSearch  = () => closeOverlay("search");
const openContact  = () => openOverlay("contact", contactModalHTML());
const closeContact = () => closeOverlay("contact");
const openTour     = () => openOverlay("tour", tourModalHTML());
const closeTour    = () => closeOverlay("tour");
const openMenu     = () => openOverlay("menu", menuModalHTML());
const closeMenu    = () => closeOverlay("menu");
function runSearch(v){ closeSearch(); go("#/search?q=" + encodeURIComponent(v || "")); }

/* ============================================================================
   ROUTER + UI PLUMBING
   ========================================================================== */
function parseHash(){
  const raw = (location.hash || "#/home").replace(/^#\//, "");
  const [pathPart, queryPart] = raw.split("?");
  const parts = pathPart.split("/").filter(Boolean);
  const params = {};
  if(queryPart) queryPart.split("&").forEach(kv => { const [k, v] = kv.split("="); params[k] = v; });
  return {parts, params};
}
function render(){
  const {parts, params} = parseHash();
  const name = parts[0] || "home";
  let html;
  if(["system","curriculum","modular","theme","stage","resource","story"].includes(name)){
    params.id = parts[1];
    html = screens[name](params);
  }
  else if(name === "help" && parts[1]){ params.id = parts[1]; html = screens.helptopic(params); }
  else if(screens[name]) html = screens[name](params);
  else html = screens.home(params);

  document.getElementById("app").innerHTML = html;
  window.scrollTo(0, 0);
  if(window.lucide) lucide.createIcons();
  observeReveals();
  railSync('popular-rail');
}
function go(hash){ if(location.hash === hash) render(); else location.hash = hash; }
window.addEventListener("hashchange", e => {
  if(e && e.oldURL && e.oldURL.includes("#")) prevRoute = e.oldURL.slice(e.oldURL.indexOf("#"));
  render();
});

/* scroll reveal */
let revealObserver;
function observeReveals(){
  if(!("IntersectionObserver" in window)){ document.querySelectorAll(".reveal").forEach(el => el.classList.add("in")); return; }
  if(revealObserver) revealObserver.disconnect();
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(en => { if(en.isIntersecting){ en.target.classList.add("in"); revealObserver.unobserve(en.target); } });
  }, {threshold:.08, rootMargin:"0px 0px -40px 0px"});
  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));
}

function toggleProfile(e){
  if(e) e.stopPropagation();
  const m = document.getElementById("profile-menu");
  if(m) m.classList.toggle("open");
}
function toggleQA(id){
  const item = document.getElementById(id);
  if(!item) return;
  item.classList.toggle("open");
  item.querySelector(".qa-body").classList.toggle("hidden");
}
let toastTimer;
function toast(msg){
  const t = document.getElementById("toast");
  t.innerHTML = `<i data-lucide="circle-check"></i><span>${msg}</span>`;
  if(window.lucide) lucide.createIcons();
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
}

["search","contact","tour","menu"].forEach(id => {
  const ov = document.getElementById(id + "-overlay");
  ov.addEventListener("click", e => { if(e.target === ov) closeOverlay(id); });
});
document.addEventListener("keydown", e => {
  if(e.key === "Escape") ["search","contact","tour","menu"].forEach(closeOverlay);
  if((e.metaKey || e.ctrlKey) && e.key === "k"){ e.preventDefault(); openSearch(); }
});
document.addEventListener("click", e => {
  const p = document.getElementById("profile"), m = document.getElementById("profile-menu");
  if(m && m.classList.contains("open") && p && !p.contains(e.target)) m.classList.remove("open");
});

/* boot */
if(!location.hash) location.hash = "#/home";
render();
