/* ============================================================================
   FACILITATING COMMONING — WEB REPOSITORY
   High-fidelity UI · flow and content follow the approved wireframe
   (../index.html); the visual language follows the FES Onboarding Platform.
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
function saveRole(){ try{ localStorage.setItem("fc_role", currentRole); }catch(e){} }
function loadRole(){ try{ const r = localStorage.getItem("fc_role");
  if(r === "visitor" || r === "registered" || r === "admin") currentRole = r; }catch(e){} }
function setRole(role, dest){ currentRole = role; saveRole(); toast("Signed in as " + ROLE[role].label); go(dest || "#/home"); }
function signOut(){ currentRole = "visitor"; saveRole(); toast("Signed out"); go("#/home"); }
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
  pastureland:{name:"Pastureland", icon:"wheat", accent:"var(--sys-pastureland)", photo:"assets/img/pastureland.jpg",
    desc:"Community institutions, tenure/recognition, collective rules, restoration and sustainable use.",
    users:"Facilitators, field practitioners, learners and community institutions working on pasturelands.",
    outcome:"Recognised tenure, functioning institutions, and restored, sustainably managed grazing commons.",
    process:["Understand","Institutions","Tenure","Plan","Restore","Monitor"]},
  forests:{name:"Forests", icon:"trees", accent:"var(--sys-forests)", photo:"assets/img/forests.jpg",
    desc:"Community rights, institutions, collective governance, conservation and sustainable management.",
    users:"Facilitators, field practitioners, learners and community institutions working on forest commons.",
    outcome:"Secure community forest rights, functioning institutions, and restored, sustainably managed forests.",
    process:["Understand","Institutions","Tenure","Plan","Restore","Monitor"]},
  water:{name:"Water", icon:"droplet", accent:"var(--sys-water)", photo:"assets/img/water.jpg",
    desc:"Collective institutions, equitable access, planning, management and stewardship.",
    users:"Facilitators, field practitioners, learners and community institutions working on water commons.",
    outcome:"Equitable access, functioning institutions, and sustainably managed and stewarded water systems.",
    process:["Understand","Institutions","Access","Plan","Manage","Monitor"]}
};
const SYSTEM_IDS = ["pastureland","forests","water"];
const systemIdByName = name => SYSTEM_IDS.find(id => SYSTEMS[id].name === name);
const STATES = ["Rajasthan","Andhra Pradesh","Karnataka"];

const THEMES = {
  map:{id:"map", name:"Multi-Actor Platforms", icon:"network", accent:"var(--sys-theme)", photo:"assets/img/theme-map.jpg",
    desc:"Convening and aligning multiple stakeholders around shared commons goals.",
    users:"Facilitators, partners and institutions coordinating across actors.",
    outcome:"Aligned stakeholders and shared plans that advance commoning."},
  leo:{id:"leo", name:"Local Economic Opportunities", icon:"coins", accent:"var(--sys-theme)", photo:"assets/img/theme-leo.jpg",
    desc:"Livelihoods and value from the sustainable use of the commons.",
    users:"Community enterprises, facilitators and livelihood practitioners.",
    outcome:"Sustainable livelihoods anchored in the commons."},
  agri:{id:"agri", name:"Sustainable Agriculture Practices", icon:"leaf", accent:"var(--sys-theme)", photo:"assets/img/theme-agri.jpg",
    desc:"Practices that sustain soil, water and productivity over the long term.",
    users:"Farmers, facilitators and field practitioners.",
    outcome:"Practices that sustain soil, water and long-term productivity."}
};
const THEME_LIST = () => Object.keys(THEMES).map(k => THEMES[k]);
/* systems and themes share the same page flow (Info -> Learning Design -> Topics -> files) */
const entityById = id => SYSTEMS[id] || THEMES[id];

const LD = [
  {id:"modular",    name:"Modular Learning", icon:"layers", cls:"",
   desc:"Progressive training modules delivered as a series."},
  {id:"atomized",   name:"Atomized Course Curriculum (LDHF)", icon:"list-checks", cls:"g",
   desc:"Short, atomised topics for low-dose high-frequency learning."},
  {id:"supporting", name:"Supporting Resources", icon:"clipboard-list", cls:"o",
   desc:"Handbooks, facilitators' guides, SoPs, formats and tools."}
];

const JOURNEY5 = [
  {n:"1", k:"Orient",     q:"What is this repository?",         d:"Understand what the repository is and what it helps you do.", href:"#/commoning"},
  {n:"2", k:"Understand", q:"What is Commoning?",               d:"The meaning of Commoning of Commons.", href:"#/commoning"},
  {n:"3", k:"Learn",      q:"How does capacity building work?", d:"How continuous learning supports Commoning — and two methods of doing it.", href:"#/learning-approach"},
  {n:"4", k:"Choose",     q:"Pastureland · Forests · Water",    d:"Select the natural-resource system or theme you are working with.", href:"#/resource-systems"},
  {n:"5", k:"Act",        q:"Use resources in sequence",        d:"Access resources in a logical sequence to facilitate processes on the ground.", href:"#/library"}
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
  {id:"faq",              icon:"circle-help", title:"Frequently Asked Questions",     desc:"Common questions about the repository."},
  {id:"how-to-use",       icon:"compass",     title:"How to use the repository",      desc:"Follow the guided journey or use direct access."},
  {id:"how-to-find",      icon:"search",      title:"How to find a resource",         desc:"Use the Resource Library, search and filters."},
  {id:"commoning-stages", icon:"route",       title:"Understanding Commoning stages", desc:"The six-stage Commoning pathway explained."},
  {id:"modular-learning", icon:"layers",      title:"Understanding Modular Learning", desc:"Progressive modules with field activity."},
  {id:"ldhf",             icon:"repeat",      title:"Understanding LDHF",             desc:"Short, frequent, task-focused learning."}
];
const helpById = id => HELP.find(h => h.id === id);

const FAQS = [
  ["How do I know which stage I am at?","Use the Commoning pathway on your resource-system page — the active stage is highlighted, and each stage explains what needs to happen."],
  ["Do I have to follow the whole journey?","No. Experienced users can go straight to the Resource Library, search and filter to a specific resource."],
  ["How are resources organised on a resource-system page?","By learning design — Modular Learning, Atomized Course Curriculum (LDHF), and Supporting Resources — with filters for stakeholder, format, language and stage."],
  ["Is the content available in Hindi?","Many resources are available in Hindi and English — filter by Language in the Resource Library."],
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
  {id:"w-intro-video", title:"Introduction to Water Commons", purpose:"Short video introducing community-managed water commons.", system:"Water", stage:"Understand Context", stake:"Learner", design:"LDHF", type:"Video", group:"atomized", lang:"Hindi", version:"v1.0 · 2026", attribution:""},
  {id:"w-access-atom", title:"Equitable Access — Key Ideas", purpose:"Atomised topic on equitable access to shared water sources.", system:"Water", stage:"Secure Tenure", stake:"Learner", design:"LDHF", type:"Atomised Course", group:"atomized", lang:"Hindi", version:"v1.0 · 2026", attribution:""},
  {id:"w-stewardship-audio", title:"Water Stewardship — Audio Guide", purpose:"Audio guide on day-to-day stewardship of water systems.", system:"Water", stage:"Restore & Manage", stake:"Community Member", design:"LDHF", type:"Audio", group:"atomized", lang:"Hindi", version:"v1.0 · 2026", attribution:""},
  {id:"w-institutions", title:"Water User Institutions", purpose:"Course on forming and running water user institutions.", system:"Water", stage:"Build Institutions", stake:"Facilitator", design:"Modular", type:"Course", group:"modular", lang:"Hindi", version:"v1.0 · 2026", attribution:""},
  {id:"w-planning-module", title:"Water Management Planning", purpose:"Module on preparing a collective water management plan.", system:"Water", stage:"Plan", stake:"Field Practitioner", design:"Modular", type:"Training Module", group:"modular", lang:"English", version:"v1.0 · 2026", attribution:""},
  {id:"w-handbook", title:"Water Stewardship Handbook", purpose:"Reference handbook for community water stewardship.", system:"Water", stage:"All Stages", stake:"Facilitator", design:"Both", type:"Handbook", group:"supporting", lang:"English", version:"v1.0 · 2026", attribution:""},
  {id:"w-monitoring-format", title:"Water Monitoring Format", purpose:"Editable format to track water access and system health.", system:"Water", stage:"Monitor & Adapt", stake:"Field Practitioner", design:"Both", type:"Format", group:"supporting", lang:"English", version:"v1.0 · 2026", attribution:""},
  {id:"w-facil-guide", title:"Water Facilitators' Guide", purpose:"Facilitators' guide for running water commoning sessions.", system:"Water", stage:"All Stages", stake:"Facilitator", design:"Both", type:"Facilitators' Guide", group:"supporting", lang:"Hindi", version:"v1.0 · 2026", attribution:""},
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

const TOPICS = [
  {id:"rights", name:"Rights & Legal Framework", desc:"Background, key definitions and the legal framework.", count:2},
  {id:"institutions", name:"Community Institutions", desc:"Gram Sabha, governance and collective decision-making.", count:2},
  {id:"claims", name:"Claiming Community Rights", desc:"Preparing, filing and following up on claims.", count:1},
  {id:"planning", name:"Planning & Management", desc:"Plans, restoration and sustainable management.", count:1},
  {id:"mapping", name:"Mapping & Boundaries", desc:"Participatory mapping, GPS and boundary demarcation.", count:3},
  {id:"restoration", name:"Ecological Restoration", desc:"Regeneration, protection and land treatment measures.", count:2},
  {id:"livelihoods", name:"Livelihoods & Benefit Sharing", desc:"Produce, markets and equitable sharing of benefits.", count:2},
  {id:"monitoring", name:"Monitoring & Records", desc:"Registers, formats and tracking of collective work.", count:1},
  {id:"conflict", name:"Conflict Resolution", desc:"Resolving disputes and grievances within the commons.", count:1},
  {id:"support", name:"Facilitation & Support", desc:"Guides, SoPs, handbooks and formats.", count:3}
];
const topicById = id => TOPICS.find(t => t.id === id);
const RES_TOPIC = {
  "facilitator-guide":"support","cfr-course":"rights","cfr-claim":"claims","ifr-module":"claims",
  "fra-history":"rights","what-is-tenure":"rights","gram-sabha-atom":"institutions","tenure-claim-tool":"claims",
  "fra-handbook":"support","context-mapping":"planning","institution-basics":"institutions","water-access-plan":"planning",
  "restoration-field":"planning","pasture-course":"rights","map-guide":"support","leo-course":"planning","agri-course":"planning",
  "pasture-video":"rights","pasture-audio":"planning","pasture-pdf":"planning",
  "p-legal-framework":"rights","p-rights-history":"rights","p-tenure-defs":"rights","p-rights-audio":"rights",
  "p-committee":"institutions","p-gramsabha":"institutions",
  "p-claim-module":"claims","p-evidence-pdf":"claims",
  "p-grazing-plan":"planning","p-rest-cycle":"planning","p-facil-guide":"support",
  "w-intro-video":"rights","w-access-atom":"claims","w-stewardship-audio":"planning",
  "w-institutions":"institutions","w-planning-module":"planning","w-handbook":"support",
  "w-monitoring-format":"planning","w-facil-guide":"support"
};
const topicOf = r => RES_TOPIC[r.id] || "support";
const resForTopic = (name, topicId) => resFor(name).filter(r => !topicId || topicOf(r) === topicId);
function topicsForSystem(name){
  const c = {}; resFor(name).forEach(r => { c[topicOf(r)] = (c[topicOf(r)] || 0) + 1; });
  return TOPICS.filter(t => c[t.id]).map(t => Object.assign({}, t, {count:c[t.id]}));
}
/* topics (with counts) that have resources for a system within a learning-design group */
function topicsForGroup(name, group){
  const c = {}; resFor(name, group).forEach(r => { c[topicOf(r)] = (c[topicOf(r)] || 0) + 1; });
  return TOPICS.filter(t => c[t.id]).map(t => Object.assign({}, t, {count:c[t.id]}));
}

const SUBSTORE = {};
function _genSubtopics(topic){
  const F=(a,b,c)=>[{name:a,type:"PDF"},{name:b,type:"Video"}].concat(c?[{name:c,type:"Image"}]:[]);
  return [
    {mod:(topic?topic.name:"Topic")+" — Introduction & Basics", items:[
      {code:"101", name:"Historical background", files:F("Background note","Intro video","Concept map")},
      {code:"102", name:"Introduction to the topic", files:F("Overview","Explainer video")},
      {code:"103", name:"Key definitions", files:F("Definitions sheet","Definitions video")},
      {code:"104", name:"Classification & scope", files:F("Classification note","Walkthrough")},
      {code:"105", name:"Important points", files:F("Key points","Summary video")}
    ]},
    {mod:"Community Institutions & Process", items:[
      {code:"201", name:"Panchayat governance", files:F("Governance note","Governance video")},
      {code:"202", name:"Role of the Gram Sabha", files:F("Roles & duties","Gram Sabha video","Meeting photo")},
      {code:"203", name:"Gram Sabha quorum", files:F("Quorum rules","Explainer")},
      {code:"204", name:"Meeting process", files:F("Process steps","Process video")},
      {code:"205", name:"Participation", files:F("Participation guide","Short video")},
      {code:"206", name:"Documentation", files:F("Documentation format","Sample records")}
    ]}
  ];
}
function subtopicsFor(topic){
  const id = topic ? topic.id : "_";
  // Admin-created topics start empty; the admin builds subtopics/files themselves.
  if(!SUBSTORE[id]) SUBSTORE[id] = (topic && topic.custom) ? [] : _genSubtopics(topic);
  return SUBSTORE[id];
}
function allSubtopics(topic){ return subtopicsFor(topic).reduce(function(a,g){return a.concat(g.items);},[]); }
// next numbered code for a module group (e.g. 101,102 -> 103; new group -> N01)
function _nextCode(groups, groupIdx){
  const g = groups[groupIdx];
  const base = (groupIdx+1)*100;
  let max = base;
  g.items.forEach(it=>{ const n=parseInt(it.code,10); if(!isNaN(n)&&n>max) max=n; });
  return String(max+1);
}

const CURRICULUM = [
  {code:"100", title:"Introduction to the Rights Framework", topics:[
    ["101","Historical background of the Act"],["102","Introduction to the Act"],
    ["103","Key definitions"],["104","Classification of land under the Act"],["105","Important legal points"]
  ]},
  {code:"200", title:"Community Institutions", topics:[
    ["201","Panchayat governance"],["202","Role of the Gram Sabha"],["203","Gram Sabha quorum"],
    ["204","Gram Sabha meeting process"],["205","Participation in the Gram Sabha"],["206","Documentation of the Gram Sabha"]
  ]},
  {code:"300", title:"Claiming Community Rights", topics:[
    ["301","Preparing the claim"],["302","Evidence and documentation"],["303","Filing and follow-up"]
  ]}
];

const COURSES = [
  {id:"cfr", title:"Community Forest Resource Rights", system:"Forests", lang:"Hindi", topics:[
    {id:"intro", name:"Introduction to CFR", files:[
      {name:"CFR overview", type:"PDF"},{name:"What is CFR — intro video", type:"Video"},{name:"CFR concept map", type:"Image"}
    ]},
    {id:"legal", name:"Legal Framework", files:[
      {name:"Key sections of the Act", type:"PDF"},{name:"Legal framework explainer", type:"Video"}
    ]},
    {id:"process", name:"Claim Process", files:[
      {name:"Step-by-step claim guide", type:"PDF"},{name:"Filing a claim — walkthrough", type:"Video"},{name:"Claim form sample", type:"Image"},{name:"Evidence checklist", type:"PDF"}
    ]},
    {id:"gramsabha", name:"Role of the Gram Sabha", files:[
      {name:"Gram Sabha roles &amp; duties", type:"PDF"},{name:"Gram Sabha meeting", type:"Image"}
    ]}
  ]},
  {id:"pasture", title:"Commoning of Pasturelands", system:"Pastureland", lang:"Hindi", topics:[
    {id:"intro", name:"Introduction to Pasture Commons", files:[
      {name:"Pasture commons overview", type:"PDF"},{name:"Overview video", type:"Video"}
    ]},
    {id:"rules", name:"Collective Grazing Rules", files:[
      {name:"Sample grazing rules", type:"PDF"},{name:"Grazing rules — walkthrough", type:"Video"},{name:"Grazing zone map", type:"Image"}
    ]},
    {id:"restore", name:"Restoration &amp; Management", files:[
      {name:"Restoration protocol", type:"PDF"},{name:"Before / after restoration", type:"Image"}
    ]}
  ]},
  {id:"water", title:"Equitable Water Stewardship", system:"Water", lang:"English", topics:[
    {id:"access", name:"Equitable Access", files:[
      {name:"Access planning guide", type:"PDF"},{name:"Access explainer", type:"Video"}
    ]},
    {id:"steward", name:"Stewardship &amp; Monitoring", files:[
      {name:"Stewardship handbook", type:"PDF"},{name:"Monitoring indicators", type:"Image"}
    ]}
  ]},
  {id:"institutions", title:"Building Community Institutions", system:"All Systems", lang:"Hindi", topics:[
    {id:"form", name:"Forming the Institution", files:[
      {name:"Institution formation guide", type:"PDF"},{name:"Formation video", type:"Video"}
    ]},
    {id:"rules", name:"Rules &amp; Governance", files:[
      {name:"Model bylaws", type:"PDF"},{name:"Governance diagram", type:"Image"}
    ]}
  ]},
  {id:"tenure", title:"Securing Tenure &amp; Recognition", system:"Forests", lang:"English", topics:[
    {id:"why", name:"Why Tenure Matters", files:[
      {name:"Tenure security explainer", type:"Video"},{name:"Forms of recognition", type:"PDF"}
    ]},
    {id:"evidence", name:"Evidence &amp; Documentation", files:[
      {name:"Evidence checklist", type:"PDF"},{name:"Sample records", type:"Image"},{name:"Documentation walkthrough", type:"Video"}
    ]}
  ]},
  {id:"restoration", title:"Ecological Restoration Practices", system:"Pastureland", lang:"Hindi", topics:[
    {id:"assess", name:"Assessing the Commons", files:[
      {name:"Assessment format", type:"PDF"},{name:"Field survey photos", type:"Image"}
    ]},
    {id:"works", name:"Restoration Works", files:[
      {name:"Restoration protocol", type:"PDF"},{name:"Works demonstration", type:"Video"}
    ]}
  ]},
  {id:"water-gov", title:"Water Governance &amp; Institutions", system:"Water", lang:"Hindi", topics:[
    {id:"access", name:"Equitable Access", files:[
      {name:"Access planning guide", type:"PDF"},{name:"Access explainer", type:"Video"}
    ]},
    {id:"monitor", name:"Monitoring &amp; Stewardship", files:[
      {name:"Monitoring indicators", type:"Image"},{name:"Stewardship handbook", type:"PDF"}
    ]}
  ]},
  {id:"map-course", title:"Facilitating Multi-Actor Platforms", system:"Multi-Actor Platforms", lang:"English", topics:[
    {id:"convene", name:"Convening Stakeholders", files:[
      {name:"Convening guide", type:"PDF"},{name:"Stakeholder mapping", type:"Image"}
    ]},
    {id:"align", name:"Aligning on Goals", files:[
      {name:"Facilitation video", type:"Video"},{name:"Shared-plan template", type:"PDF"}
    ]}
  ]},
  {id:"leo-course-c", title:"Local Economic Opportunities", system:"Local Economic Opportunities", lang:"Hindi", topics:[
    {id:"identify", name:"Identifying Opportunities", files:[
      {name:"Opportunity scan", type:"PDF"},{name:"Case examples", type:"Image"}
    ]},
    {id:"build", name:"Building Enterprises", files:[
      {name:"Enterprise basics", type:"Video"},{name:"Business format", type:"PDF"}
    ]}
  ]},
  {id:"agri-course-c", title:"Sustainable Agriculture Practices", system:"Sustainable Agriculture Practices", lang:"Hindi", topics:[
    {id:"soil", name:"Soil &amp; Water", files:[
      {name:"Soil health guide", type:"PDF"},{name:"Practice demonstration", type:"Video"}
    ]},
    {id:"crop", name:"Cropping Practices", files:[
      {name:"Cropping calendar", type:"Image"},{name:"Practice handbook", type:"PDF"}
    ]}
  ]}
];
const courseById = id => COURSES.find(c => c.id === id);

const APPS = [
  {name:"Commons", ico:"👥"}, {name:"VI Mapping", ico:"🗺️"}, {name:"Form Builder", ico:"📋"},
  {name:"GEET", ico:"⚡"}, {name:"CLART", ico:"🎓"}, {name:"CLM", ico:"📄"},
  {name:"CWB", ico:"📈"}, {name:"GWMT", ico:"💧"}, {name:"Data Platform", ico:"🗄️"}
];
const NAV = [
  {id:"#/learning-approach", label:"Learning Approach"},
  {id:"#/commoning", label:"Commoning of Commons"},
  {id:"#/resource-systems", label:"Resource Systems & Themes"},
  {id:"#/library", label:"Resource Library"},
  {id:"#/help", label:"Help"}
];


/* lucide icons for the product launcher (the wireframe used emoji) */
const APP_ICON = {
  "Commons":"users", "VI Mapping":"map", "Form Builder":"clipboard-list",
  "GEET":"zap", "CLART":"graduation-cap", "CLM":"file-text",
  "CWB":"trending-up", "GWMT":"droplet", "Data Platform":"database"
};

/* ── small helpers ───────────────────────────────────────────────────────── */
const ic = n => `<i data-lucide="${n}"></i>`;
const esc = s => String(s == null ? "" : s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const attr = s => String(s == null ? "" : s).replace(/"/g,"&quot;");
const js = s => String(s == null ? "" : s).replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/"/g,"&quot;");

function mediaKind(type){
  const t = (type || "").toLowerCase();
  if(t.includes("video"))  return {k:"video", icon:"play",           cls:"v", label:"Watch"};
  if(t.includes("audio"))  return {k:"audio", icon:"headphones",     cls:"a", label:"Listen"};
  if(t.includes("image"))  return {k:"image", icon:"image",          cls:"t", label:"View"};
  if(/handbook|guide|sop|pdf|manual/.test(t)) return {k:"pdf", icon:"file-text", cls:"d", label:"Read"};
  if(/format|tool|toolkit|worksheet/.test(t)) return {k:"other", icon:"clipboard-list", cls:"t", label:"Use"};
  if(t.includes("atomised")) return {k:"other", icon:"list-checks",  cls:"",  label:"Learn"};
  return {k:"other", icon:"graduation-cap", cls:"", label:"Learn"};
}
const SYS_PHOTO = {
  "Forests":"assets/img/forests.jpg",
  "Pastureland":"assets/img/pastureland.jpg",
  "Water":"assets/img/water.jpg",
  "Multi-Actor Platforms":"assets/img/theme-map.jpg",
  "Local Economic Opportunities":"assets/img/theme-leo.jpg",
  "Sustainable Agriculture Practices":"assets/img/theme-agri.jpg",
  "All Systems":"assets/img/about-commons.jpg"
};
const photoFor = name => SYS_PHOTO[name] || "";
function accentFor(name){
  const id = systemIdByName(name);
  return id ? SYSTEMS[id].accent : "var(--sys-theme)";
}

/* Cover art: photo when one exists, gradient + icon when it does not. */
function cover(o){
  const photo = o.photo ? `<img src="${o.photo}" alt="" loading="lazy" onerror="coverFallback(this)">` : "";
  return `<div class="sys-cover ${o.photo ? "has-photo" : ""} ${o.cls || ""}" style="--acc:${o.accent || "var(--sys-theme)"};${o.h ? `height:${o.h}` : ""}">
    ${photo}
    ${o.tag ? `<span class="sc-tag">${o.tag}</span>` : ""}
    <span class="sc-ic">${ic(o.icon || "image")}</span>
  </div>`;
}
function coverFallback(img){
  const c = img.closest(".sys-cover");
  if(c) c.classList.remove("has-photo");
  img.remove();
}

/* ── header ──────────────────────────────────────────────────────────────── */
function header(active){
  const acct = currentRole === "visitor"
    ? `<button class="btn btn-solid" onclick="go('#/login')">Sign In ${ic("arrow-right")}</button>`
    : `<div class="profile" id="profile">
         <button class="profile-btn compact" onclick="toggleProfile(event)" title="${roleLabel()}" aria-label="${roleLabel()}">
           <span class="avatar">${ROLE[currentRole].short}</span>
           <span class="caret">${ic("chevron-down")}</span>
         </button>
         <div class="profile-menu" id="profile-menu">
           <div class="pm-head"><strong>${roleLabel()}</strong><span>Signed in to the repository</span></div>
           <div class="pm-div"></div>
           ${isRegistered() ? `<a onclick="go('#/my-learning')">${ic("bookmark")}My Learning</a>` : ""}
           <a onclick="openChangePassword()">${ic("lock")}Change Password</a>
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
      <div class="app-launcher" id="app-launcher">
        <button class="btn btn-icon" title="Products" aria-label="Products" onclick="toggleApps(event)">${ic("grid-3x3")}</button>
        <div class="apps-menu" id="apps-menu">
          <div class="apps-head"><span>Products</span><span>Quick access</span></div>
          <div class="apps-grid">
            ${APPS.map(a => `<a class="app-tile" onclick="toast('Open ${js(a.name)} — placeholder')">
              <span class="app-ico">${ic(APP_ICON[a.name] || "box")}</span>
              <span class="app-name">${a.name}</span></a>`).join("")}
          </div>
        </div>
      </div>
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
  const bg = (dark && o.photo)
    ? `<img class="ph-bg" src="${o.photo}" alt="" loading="lazy" onerror="this.remove()">` : "";
  /* emblem tile retired — the photograph carries the page identity.
     Restore by rendering o.emblem into .sys-emblem here again. */
  const emblem = "";
  /* Every interior band is the same height. Facts move to their own strip
     directly beneath it, so the band itself only ever holds crumbs, title,
     sub and actions. */
  return `<section class="phead ${dark ? "sysband" : ""} ${bg ? "has-photo" : ""}">
    ${bg}
    <div class="phead-inner">
      ${crumbs(o.crumbs)}
      ${/* eyebrow pills retired — the title and breadcrumb already carry the context.
           Restore by rendering o.eyebrow here again. */ ""}
      <h2>${o.title}</h2>
      ${o.sub ? `<p class="ph-sub">${o.sub}</p>` : ""}
      ${o.actions ? `<div class="ph-actions">${o.actions}</div>` : ""}
    </div>
    ${emblem}
  </section>
  ${o.facts ? `<section class="factsbar"><div class="fb-grid">${o.facts.map(f =>
      `<div class="fb-item"><div class="fb-l">${f[0]}</div><div class="fb-v">${f[1]}</div></div>`).join("")}</div></section>` : ""}`;
}

function footer(){
  return `<footer class="footer">
    <div class="foot-cols">
      <div>
        <div class="foot-brand" onclick="go('#/home')">
          <span class="fm">${ic("sprout")}</span>
          <span class="bt"><span class="b1">Facilitating</span><span class="b1 g">Commoning</span></span>
        </div>
        <p class="fdesc">A learning system to understand and facilitate the Commoning of Commons.</p>
      </div>
      <div><h5>Learn</h5><ul>
        <li onclick="go('#/commoning')">Commoning of Commons</li>
        <li onclick="go('#/learning-approach')">Learning Approach</li>
        <li onclick="go('#/resource-systems')">Resource Systems</li>
      </ul></div>
      <div><h5>Find</h5><ul>
        <li onclick="go('#/library')">Resource Library</li>
        <li onclick="go('#/courses')">Courses</li>
        <li onclick="openSearch()">Search</li>
        <li onclick="go('#/help')">Help &amp; FAQ</li>
      </ul></div>
      <div><h5>Resource Systems</h5><ul>
        ${SYSTEM_IDS.map(id => `<li onclick="go('#/system/${id}')">${SYSTEMS[id].name}</li>`).join("")}
      </ul></div>
    </div>
    <div class="foot-bar">
      <span>© 2026 Foundation for Ecological Security · Prakriti Karyashala</span>
      <nav class="fr"><a onclick="go('#/about')">About</a><a onclick="go('#/help')">Help</a><a onclick="openContact()">Contact</a><a onclick="toast('Privacy policy — placeholder')">Privacy</a></nav>
    </div>
  </footer>`;
}

const shell = (active, crumbItems, body) =>
  header(active) + `<main>${crumbItems ? `<div class="crumbwrap">${crumbs(crumbItems)}</div>` : ""}${body}</main>` + footer();

/* ── reusable blocks ─────────────────────────────────────────────────────── */
function pathway(activeId, opts){
  opts = opts || {};
  const sysQ = opts.system ? `?sys=${opts.system}` : "";
  const activeIdx = activeId ? STAGES.findIndex(s => s.id === activeId) : -1;
  return `<div class="pathway ${opts.compact ? "compact" : ""}">
    <span class="pw-rule"></span>
    ${STAGES.map((s, i) => `<div class="pw-step ${s.id === activeId ? "active" : (activeIdx > -1 && i < activeIdx ? "done" : "")}"
        onclick="go('#/stage/${s.id}${sysQ}')">
        <span class="pw-node">${ic(s.icon)}</span>
        <span class="pw-num">${s.num}</span>
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

/* ── document-manager style file card (Resource Library + home rows) ─────── */
const LIB_UPLOADERS = ["You","Aditi Joshi","Krishnan Iyer","Sarah Johnson","Kavita Menon","Meera Nair"];
const libInitials = n => n === "You" ? "PS" : n.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase();
const CARD_THEMES = ["Forests","Pastureland","Water"];
const cardTheme = (r, i) => (r.system && r.system !== "All Systems") ? r.system : CARD_THEMES[i % CARD_THEMES.length];
/* primary theme plus one related theme, deduped — each chip filters the library */
function cardThemes(r, i){
  const pool = CARD_THEMES.concat(THEME_LIST().map(t => t.name));
  const out = [cardTheme(r, i)];
  const extra = pool[(i + 1) % pool.length];
  if(extra && out.indexOf(extra) < 0) out.push(extra);
  return out;
}
/* Cover keyed to file type — no fake document preview, and the colour gives the
   grid rhythm without repeating one photograph across every card. */
function libraryFileCard(r, idx){
  const themes = cardThemes(r, idx);
  const who = LIB_UPLOADERS[idx % LIB_UPLOADERS.length];
  const day = 24 - (idx % 20);
  const date = "2026-05-" + (day < 10 ? "0" + day : day);
  const k = mediaKind(r.type);
  const editing = (idx % 9 === 3) ? `<div class="dms-status"><span class="dot"></span>You are editing</div>`
    : (idx % 9 === 6) ? `<div class="dms-status"><span class="dot"></span>${LIB_UPLOADERS[(idx + 1) % LIB_UPLOADERS.length]} is editing</div>` : "";
  return `<article class="dms-card" onclick="go('#/resource/${r.id}')">
    <div class="dms-cover ${k.cls}">
      <span class="dms-ic">${ic(k.icon)}</span>
      <span class="dms-type">${r.type}</span>
      ${editing}
      <button class="dms-kebab" title="File actions" onclick="event.stopPropagation();toast('File actions — placeholder')">${ic("ellipsis-vertical")}</button>
    </div>
    <div class="dms-body">
      <h4 class="dms-name" title="${attr(r.title)}">${r.title}</h4>
      <div class="dms-theme">${themes.map(t => `<a class="dms-theme-tag" title="Filter the library by ${attr(t)}" onclick="event.stopPropagation();go('#/library?sys=' + encodeURIComponent('${js(t)}'))">${ic("tag")}${t}</a>`).join("")}</div>
    </div>
    <div class="dms-foot">
      <span class="dms-avatar">${libInitials(who)}</span>
      <span class="dms-foot-txt">${who === "You" ? "PS · You" : who} · ${date}</span>
    </div>
  </article>`;
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
        <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();toast('Process documents for ${js(STATES.join(', '))} — placeholder')">${ic("file-text")}${STATES.length} states</button>
      </div>
    </div>
  </article>`;
}

function themeCard(t){
  return `<article class="syscard" style="--acc:${t.accent}" onclick="go('#/system/${t.id}')">
    ${cover({photo:t.photo, accent:t.accent, icon:t.icon, tag:"Theme"})}
    <div class="sys-body">
      <h3>${t.name}</h3>
      <p>${t.desc}</p>
      <div class="sys-foot">
        <span class="arrow-link">Begin your learning journey ${ic("arrow-right")}</span>
      </div>
    </div>
  </article>`;
}

function courseListCard(c){
  const files = c.topics.reduce((n, t) => n + t.files.length, 0);
  const acc = accentFor(c.system);
  return `<article class="card click" style="--acc:${acc};padding:0;overflow:hidden" onclick="go('#/course/${c.id}')">
    ${cover({photo:photoFor(c.system), accent:acc, icon:"graduation-cap", tag:"Course", h:"146px"})}
    <div class="cl-body">
      <div class="c-t" style="margin:0">${c.title}</div>
      ${c.desc ? `<p class="c-d">${c.desc}</p>` : ""}
      <div class="tags">
        <span class="tag blue">${c.system}</span>
        <span class="tag">${ic("languages")}${c.lang}</span>
        <span class="tag">${ic("layers")}${c.topics.length} topics</span>
        <span class="tag">${ic("file-text")}${files} files</span>
      </div>
      <div class="c-foot"><span class="arrow-link">Open course ${ic("arrow-right")}</span></div>
    </div>
  </article>`;
}

/* File card for a course topic or a resource-system subtopic. */
function fileCard(f, courseId, topicId, idx, docCtx){
  const k = mediaKind(f.type);
  const view = docCtx
    ? `go('#/doc/${docCtx.sys}?g=${docCtx.group}&topic=${docCtx.topic}&sub=${docCtx.sub}&i=${idx}')`
    : (courseId != null ? `go('#/file/${courseId}/${topicId}/${idx}')`
                        : `toast('Open ${js(f.type)}: ${js(f.name)} — placeholder')`);
  return `<article class="file-card">
    <div class="file-prev ${k.cls}" onclick="${view}">${ic(k.icon)}</div>
    <div class="file-body">
      <span class="badge">${f.type}</span>
      <h4>${f.name}</h4>
      <div class="file-actions">
        <button class="btn btn-solid btn-sm" onclick="${view}">View ${ic("arrow-right")}</button>
        <button class="btn btn-ghost btn-sm" onclick="download('${js(f.name)}')">${ic("download")}</button>
      </div>
    </div>
  </article>`;
}

/* ── faceted filters ─────────────────────────────────────────────────────
   OR within a group, AND across groups. Selections live in FILTERS and are
   surfaced as removable chips above the results.                          */
const FILTER_GROUPS = [
  {key:"system", label:"Resource System",     opts:["Pastureland","Forests","Water"], match:(r, v) => r.system === v || r.system === "All Systems"},
  {key:"stage",  label:"Stage of Commoning",  opts:STAGES.map(s => s.name),           match:(r, v) => r.stage === v},
  {key:"stake",  label:"Stakeholder",         opts:["Facilitator","Learner","Field Practitioner","Community Member","Mentor"], match:(r, v) => r.stake === v},
  {key:"design", label:"Learning Design",     opts:["Modular","LDHF","Both"],         match:(r, v) => r.design === v},
  {key:"type",   label:"Resource Type",       opts:["Course","Training Module","Atomised Course","Video","Audio","PDF","Handbook","Facilitators' Guide","Format","Tool"], match:(r, v) => r.type === v},
  {key:"lang",   label:"Language",            opts:["English","Hindi"],               match:(r, v) => r.lang === v}
];
let FILTERS = {};
const filterActive = () => FILTER_GROUPS.some(g => (FILTERS[g.key] || []).length);
const filterCount  = () => FILTER_GROUPS.reduce((n, g) => n + (FILTERS[g.key] || []).length, 0);
const isFilterOn   = (k, v) => (FILTERS[k] || []).indexOf(v) >= 0;
function toggleFilter(k, v){
  const arr = FILTERS[k] || (FILTERS[k] = []);
  const i = arr.indexOf(v);
  if(i >= 0) arr.splice(i, 1); else arr.push(v);
  if(!arr.length) delete FILTERS[k];
  render();
}
function removeFilter(k, v){
  const arr = FILTERS[k]; if(!arr) return;
  const i = arr.indexOf(v); if(i >= 0) arr.splice(i, 1);
  if(!arr.length) delete FILTERS[k];
  render();
}
function clearAllFilters(){ FILTERS = {}; render(); }
function filterByTheme(name){ FILTERS = {system:[name]}; go("#/library"); }
const applyFilters = rows => rows.filter(r => FILTER_GROUPS.every(g => {
  const sel = FILTERS[g.key] || [];
  return !sel.length || sel.some(v => g.match(r, v));
}));
/* every selected filter stays visible, each removable on its own */
function activeFilterChips(){
  if(!filterActive()) return "";
  let chips = "";
  FILTER_GROUPS.forEach(g => (FILTERS[g.key] || []).forEach(v => {
    chips += `<span class="fchip">${esc(v)}<button class="fchip-x" title="Remove ${attr(v)}" onclick="removeFilter('${g.key}','${js(v)}')">${ic("x")}</button></span>`;
  }));
  return `<div class="applied-filters">
    <span class="af-label">${filterCount()} filter${filterCount() === 1 ? "" : "s"}</span>
    ${chips}
    <button class="af-clearall" onclick="clearAllFilters()">Clear all</button>
  </div>`;
}

/* ── card / list view, shared by the library and search, remembered ─────── */
let libView = "card";
function loadLibView(){ try{ const v = localStorage.getItem("libView"); if(v === "card" || v === "list") libView = v; }catch(e){} }
function setLibView(v){ libView = v; try{ localStorage.setItem("libView", v); }catch(e){} render(); }
function resourceViewToggle(){
  return `<div class="seg view-toggle">
    <button class="seg-btn ${libView === "card" ? "on" : ""}" onclick="setLibView('card')" title="Card view">${ic("layout-grid")}Cards</button>
    <button class="seg-btn ${libView === "list" ? "on" : ""}" onclick="setLibView('list')" title="List view">${ic("list")}List</button>
  </div>`;
}
const resTags = r => [r.system, r.type, r.stage, r.lang, r.design]
  .concat(r.tags || []).filter(x => x && x !== "" && x !== "All Stages");
function resourceListRow(r){
  const k = mediaKind(r.type);
  return `<article class="result-row" onclick="go('#/resource/${r.id}')">
    <span class="rc-ic ${k.cls}" style="width:46px;height:46px">${ic(k.icon)}</span>
    <div class="rr-main">
      <h4>${r.title}</h4>
      <p class="purpose">${r.purpose}</p>
      <div class="tags">${resTags(r).map((t, i) => `<span class="tag ${i === 0 ? "blue" : ""}">${t}</span>`).join("")}</div>
    </div>
    <div class="rr-side">
      <button class="btn btn-solid btn-sm" onclick="event.stopPropagation();go('#/resource/${r.id}')">View ${ic("arrow-right")}</button>
      <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();download('${js(r.title)}')">${ic("download")}Download</button>
    </div>
  </article>`;
}
function renderResources(rows, emptyMsg){
  if(!rows.length) return `<div class="empty" style="grid-column:1/-1"><span class="e-ic">${ic("search-x")}</span><h4>Nothing to show</h4><p>${emptyMsg}</p>
    ${filterActive() ? `<button class="btn btn-ghost" onclick="clearAllFilters()">Clear all filters</button>` : ""}</div>`;
  if(libView === "list") return `<div class="stack">${rows.map(resourceListRow).join("")}</div>`;
  return `<div class="file-grid">${rows.map((r, i) => libraryFileCard(r, i)).join("")}</div>`;
}

function filterSidebar(){
  const grp = g => `<div class="fgroup"><h4>${g.label}</h4>${g.opts.map(i =>
    `<label class="fopt"><input type="checkbox" ${isFilterOn(g.key, i) ? "checked" : ""}
      onchange="toggleFilter('${g.key}','${js(i)}')"> ${i}</label>`).join("")}</div>`;
  return `<aside class="filters">
    <div class="f-head">${ic("sliders-horizontal")}Filter resources${filterActive() ? `<span class="f-count">${filterCount()}</span>` : ""}</div>
    ${FILTER_GROUPS.map(grp).join("")}
    <div class="filter-actions">
      <button class="btn btn-ghost btn-sm" style="flex:1" onclick="clearAllFilters()">Clear all</button>
    </div>
  </aside>`;
}

function clearFilters(el){
  el.closest(".filters").querySelectorAll("input").forEach(i => { i.checked = false; });
  toast("Filters cleared");
}
const sortSelect = () => `<span class="selectwrap">Sort
  <select class="sel" onchange="toast('Sorted by ' + this.value)">
    <option>Recommended</option><option>A–Z</option><option>Recently added</option>
  </select></span>`;
const quickFilters = () => `<div class="row">
  <select class="sel" onchange="toast('Filtered by ' + this.value)"><option>All stakeholders</option><option>Facilitator</option><option>Learner</option><option>Field Practitioner</option><option>Community Member</option></select>
  <select class="sel" onchange="toast('Filtered by ' + this.value)"><option>All formats</option><option>Course</option><option>Training Module</option><option>Atomised Course</option><option>Video</option></select>
  <select class="sel" onchange="toast('Filtered by ' + this.value)"><option>All languages</option><option>English</option><option>Hindi</option></select>
</div>`;

const screens = {};

/* ── HOME ────────────────────────────────────────────────────────────────── */
const INTRO_BLOCKS = [
  {photo:"assets/img/story-gram-sabha-forest.jpg", icon:"book-open", title:"What is Commoning?",
   desc:"A very short explanation of Commoning, with the option to learn more.", href:"#/commoning"},
  {photo:"assets/img/story-water-access.jpg", icon:"graduation-cap", title:"How Learning Enables Action?",
   desc:"A very short explanation of how learning translates into action, with the option to learn more.", href:"#/learning-approach"},
  {photo:"assets/img/about-commons.jpg", icon:"trees", title:"Choose Your Commons",
   desc:"A very short explanation to help you pick a resource system or theme, with the option to learn more.", href:"#/resource-systems"}
];
const homeRow = (title, sub, ids, n) => `
  <section class="sec ${n % 2 ? "soft" : ""} reveal">
    <div class="sec-head">
      <div><h2 class="sec-title">${title}</h2><p class="sec-sub">${sub}</p></div>
      <button class="btn btn-ghost" onclick="go('#/library')">Browse all resources ${ic("arrow-right")}</button>
    </div>
    <div class="grid g3">${ids.map(resById).filter(Boolean).map((r, i) => libraryFileCard(r, i)).join("")}</div>
  </section>`;

screens.home = () => shell("#/home", null, `
  <section class="hero">
    <div class="hero-grid">
      <div class="hero-copy">
        <h1 class="rev d1">Commoning of Commons: <em>Learn. Facilitate. Act.</em></h1>
        <p class="lead rev d2">The Web Repository is a learning system that supports ecosystem actors to build capacities and facilitate the Commoning of Commons. It explains what users can learn and access here.</p>
        <p class="lead rev d3">Inside you will find learning modules, facilitation guides, field tools and mentoring - organised around the Commoning process rather than by file type. Explore by resource system, follow the pathway, or search the library directly for what you need.</p>
        <div class="actions rev d4">
          <button class="btn btn-solid btn-lg" onclick="go('#/learning-approach')">Know more about the learning approach ${ic("arrow-right")}</button>
        </div>
      </div>
    </div>
  </section>

  <section class="sec soft reveal">
    <div class="grid g3">
      ${INTRO_BLOCKS.map(b => `<article class="card click flip" style="padding:0;overflow:hidden" onclick="go('${b.href}')">
        ${cover({photo:b.photo, accent:"var(--blue)", icon:b.icon, h:"168px"})}
        <div class="cl-body">
          <div class="c-t" style="margin:0">${b.title}</div>
          <p class="c-d">${b.desc}</p>
          <div class="c-foot"><span class="arrow-link">Learn more ${ic("arrow-right")}</span></div>
        </div>
      </article>`).join("")}
    </div>
  </section>

  ${homeRow("Featured Resources", "Hand-picked resources to get you started.", ["facilitator-guide","cfr-course"], 0)}
  ${homeRow("What people are reading?", "Most-viewed resources across the community.", ["cfr-claim","gram-sabha-atom","fra-handbook"], 1)}
  ${homeRow("Latest Resource", "Recently added to the repository.", RES.slice(0, 3).map(r => r.id), 2)}
`);

/* ── STORY DETAIL ────────────────────────────────────────────────────────── */
screens.story = (params) => {
  const s = storyById(params.id) || STORIES[0];
  const sysId = systemIdByName(s.system);
  return shell(null, null,
    pageHead({
      tone:"sys", accent:accentFor(s.system), emblem:"quote",
      crumbs:[{label:"Home",href:"#/home"},{label:"Commoning in Action"},{label:s.system}],
      eyebrow:"Commoning in action · field story", eyebrowIcon:"map-pin",
      title:s.title, sub:s.excerpt,
      facts:[["Resource system", s.system],["Commoning stage", s.stage],["Location", s.place]]
    }) + `
    <section class="sec">
      <div class="grid g2" style="gap:30px">
        <div class="preview story"><div class="pv"><div class="pv-play" onclick="toast('Photo gallery — placeholder')">${ic("image")}</div><div class="pv-t">Field photographs</div><div class="pv-s">${s.place}</div></div></div>
        <div class="panel">
          <h3>What happened</h3>
          <p>${s.excerpt}</p>
          <p>The community worked through the ${s.stage} stage of the Commoning pathway — convening the institution, agreeing what needed to change, and recording the decisions so they could be enforced and revisited later.</p>
          <div class="tags mt16"><span class="tag blue">${s.system}</span><span class="tag">${s.stage}</span><span class="tag green">${ic("map-pin")}${s.place}</span></div>
        </div>
      </div>
    </section>
    <section class="sec soft">
      ${callout({icon:"trees", title:"Want to do this in your context?", text:`Follow the ${s.stage} stage for ${s.system}.`,
        actions:`<button class="btn btn-solid" onclick="go('#/system/${sysId || "forests"}')">Open ${s.system} ${ic("arrow-right")}</button>`})}
    </section>
  `);
};

function callout(o){
  return `<div class="callout ${o.dark ? "dark" : ""}">
    <div class="co-main">
      <span class="co-ic">${ic(o.icon || "flag")}</span>
      <div><strong>${o.title}</strong><span>${o.text}</span></div>
    </div>
    <div class="row">${o.actions}</div>
  </div>`;
}

/* ── ABOUT ───────────────────────────────────────────────────────────────── */
screens.about = () => shell(null, null,
  pageHead({
    crumbs:[{label:"Home",href:"#/home"},{label:"About"}],
    eyebrow:"About", eyebrowIcon:"info",
    title:"About the Repository",
    sub:"A learning and action-oriented repository that helps ecosystem actors understand and facilitate the Commoning of Commons."
  }) + `
  <section class="sec">
    <div class="grid g2">
      <div class="panel"><h3>${ic("target")} Purpose</h3>
        <p>This repository helps ecosystem actors understand and facilitate the Commoning of Commons. It brings learning, facilitation guides, field tools and mentoring together in one place — organised around the Commoning process rather than by file type — so users can move from understanding to action on the ground.</p></div>
      <div class="panel"><h3>${ic("users")} Who it supports</h3>
        <p>Ecosystem actors, facilitators, learners, field practitioners and the wider stakeholders who support Commoning.</p></div>
      <div class="panel"><h3>${ic("graduation-cap")} What you can learn</h3>
        <p>What Commoning of Commons means, how the capacity-building approach works (Modular Learning and LDHF), the six-stage Commoning pathway, and what needs to happen at each stage for your resource system.</p></div>
      <div class="panel"><h3>${ic("library")} What resources are available</h3>
        <p>Concept notes and videos, session plans and facilitation guides, field tools and tasks, and mentoring, FAQs and guidance — in English and Hindi.</p></div>
    </div>
  </section>
  <section class="sec soft">
    ${callout({icon:"flag", title:"Ready to begin?", text:"Understand the idea, then choose your resource system.",
      actions:`<button class="btn btn-solid" onclick="go('#/commoning')">Start Learning ${ic("arrow-right")}</button>
               <button class="btn btn-ghost" onclick="go('#/library')">Resource Library</button>`})}
  </section>
`);

/* The three pillars of Commoning, each carrying a photograph of the practice. */
const PILLARS = [
  {name:"Institution Building &amp; Governance", icon:"landmark", acc:"var(--blue)",
   photo:"assets/img/story-gram-sabha-forest.jpg",
   desc:"A legitimate, inclusive community institution that can convene, deliberate, decide and enforce collective rules over the shared resource."},
  {name:"Tenurial Security", icon:"scroll-text", acc:"var(--sys-forests)",
   photo:"assets/img/forests.jpg",
   desc:"Legal recognition and secure rights over the resource, so that collective decisions have standing and long-term investment makes sense."},
  {name:"Restoration &amp; Sustainable Management", icon:"sprout", acc:"var(--sys-water)",
   photo:"assets/img/commons-restoration.jpg",
   desc:"Restoration works, day-to-day management, monitoring and adaptation that keep the resource productive and the ecosystem healthy."}
];

/* ── COMMONING OF COMMONS ────────────────────────────────────────────────── */
screens.commoning = () => shell("#/commoning", null,
  pageHead({
    tone:"sys", photo:"assets/img/about-commons.jpg", emblem:"book-open",
    crumbs:[{label:"Home",href:"#/home"},{label:"Commoning of Commons"}],
    eyebrow:"Concept &amp; approach", eyebrowIcon:"book-open",
    title:"Commoning of Commons",
    sub:"The ongoing practice through which a community takes collective responsibility for a shared natural resource — securing it, governing it, restoring it and sustainably managing it together."
  }) + `
  <section class="sec">
    <div class="grid g2">
      <div class="panel">
        <h3>What does 'Commoning of Commons' mean?</h3>
        <p>Commoning is the ongoing practice through which a community takes collective responsibility for a shared natural resource — securing it, governing it, restoring it and sustainably managing it together.</p>
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
      ${PILLARS.map(p => `<article class="pillar" style="--acc:${p.acc}">
        ${cover({photo:p.photo, accent:p.acc, icon:p.icon, h:"186px"})}
        <div class="pl-body">
          <h3>${p.name}</h3>
          <p>${p.desc}</p>
        </div>
      </article>`).join("")}
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
      <div><div class="sec-label">The process</div><h2 class="sec-title">Six stages of Commoning</h2>
        <p class="sec-sub">Every resource system follows the same broad pathway. Select any stage to see what needs to happen and which resources support it.</p></div>
    </div>
    ${pathway(null)}
  </section>

  <section class="sec soft">
    ${callout({icon:"trees", title:"Next: choose your commons", text:"Select the resource system or theme you are working with.",
      actions:`<button class="btn btn-solid" onclick="go('#/resource-systems')">Resource Systems &amp; Themes ${ic("arrow-right")}</button>`})}
  </section>
`);

/* ── LEARNING APPROACH ───────────────────────────────────────────────────── */
const LA_PAGES = [
  {id:"modular", name:"Modular Training Design", icon:"layers", photo:"assets/img/la-training.jpg",
   blurb:"A cyclical, module-by-module design pairing a Training-of-Trainers focus with a field action."},
  {id:"ldhf",    name:"Low Dose High Frequency", icon:"repeat", photo:"assets/img/la-ldhf.jpg",
   blurb:"High-frequency, low-intensity learning delivered continuously alongside the work."},
  {id:"outcome", name:"Outcome-based Learning",  icon:"target", photo:"assets/img/story-pasture-rules.jpg",
   blurb:"A continuous path from training of trainers to learning translated into action."}
];
screens["learning-approach"] = () => shell("#/learning-approach", null,
  pageHead({
    tone:"sys", photo:"assets/img/la-training.jpg", emblem:"graduation-cap",
    crumbs:[{label:"Home",href:"#/home"},{label:"Learning Approach"}],
    title:"Learning Approach — from information to action",
    sub:"Commoning is a continuous process. It requires ongoing learning, field application, reflection and handholding — rather than a one-time transfer of information."
  }) + `
  <section class="sec">
    <div class="grid g2">
      <div class="panel"><h3>${ic("circle-help")} Why capacity building?</h3>
        <p>Commoning is a continuous process that requires ongoing learning, field application, reflection and handholding. Communities and the actors supporting them need to keep building agency, knowledge and capacity as the work unfolds.</p></div>
      <div class="panel"><h3>${ic("target")} Common purpose</h3>
        <p>Build stakeholder capacities <strong>and</strong> handhold learners as they translate training inputs into action on the ground. Learning is judged by what changes in the field, not by what was delivered in the session.</p></div>
    </div>
  </section>

  <section class="sec soft">
    <div class="sec-center">
      <div class="sec-label">Core elements of the Prakriti Karyashala approach</div>
      <h2 class="sec-title">Three ways to go deeper</h2>
      <p class="sec-sub">Modular Learning builds progressively, LDHF reinforces continuously, and both are judged by the outcome on the ground.</p>
    </div>
    <div class="grid g3">
      ${LA_PAGES.map(p => `<article class="card click flip" style="padding:0;overflow:hidden" onclick="go('#/la/${p.id}')">
        ${cover({photo:p.photo, accent:"var(--blue)", icon:p.icon, h:"178px"})}
        <div class="cl-body">
          <div class="c-t" style="margin:0">${p.name}</div>
          <p class="c-d">${p.blurb}</p>
          <div class="c-foot"><span class="arrow-link">Open ${ic("arrow-right")}</span></div>
        </div>
      </article>`).join("")}
    </div>
  </section>

  <section class="sec">
    ${callout({icon:"book-open", title:"Next: what Commoning actually means", text:"See the practice this learning approach is built to support.",
      actions:`<button class="btn btn-solid" onclick="go('#/commoning')">Commoning of Commons ${ic("arrow-right")}</button>`})}
  </section>
`);

/* ── LEARNING-APPROACH DETAIL PAGES ──────────────────────────────────────── */
const LA_SWITCH = (id) => `
  <section class="sec soft">
    <div class="between">
      <button class="btn btn-ghost" onclick="go('#/learning-approach')">${ic("arrow-left")}Back to Learning Approach</button>
      <div class="row">
        ${LA_PAGES.map(p => `<button class="btn ${p.id === id ? "btn-solid" : "btn-ghost"} btn-sm" onclick="go('#/la/${p.id}')">${p.name}</button>`).join("")}
      </div>
    </div>
  </section>`;

screens.la = (params) => {
  const cr = [{label:"Home",href:"#/home"},{label:"Learning Approach",href:"#/learning-approach"}];

  if(params.id === "modular"){
    const MODS = [
      ["1","Identification & Claiming of Commons","ToT on identification and claiming Commons","Trainee supports the community in identification and mapping of Commons."],
      ["2","Securing Commons","ToT on securing Commons","Trainee supports securing Commons — entry into GP Asset & POB, submitting CFR claims, conversion of revenue lands to grazing."],
      ["3","Institution Building Around Commons","ToT on institution building","Trainee supports initiation of protection measures, evolution of bylaws, benefit-sharing & use mechanisms."],
      ["4","Restoration of Commons","ToT on restoration using MGNREGS","Trainee assists the community in preparing plans under MGNREGS and in implementation."],
      ["5","Monitoring Aspects","ToT on community monitoring","Trainee, with the institution, monitors restoration of resources and ensures better governance."]
    ];
    return shell("#/learning-approach", null,
      pageHead({tone:"sys", photo:"assets/img/la-training.jpg", emblem:"layers",
        crumbs:cr.concat([{label:"Modular Training Design"}]), eyebrow:"Modular Training Design", eyebrowIcon:"layers",
        title:"Securing, Restoration &amp; Governance of Commons",
        sub:"A cyclical, module-by-module design. Each module pairs a Training-of-Trainers (ToT) focus with a field action the trainee then supports — building toward restored commons and better governance."}) + `
      <section class="sec">
        <div class="flow">
          <div class="node">${ic("book-open")}Training intervention</div><span class="arw">${ic("arrow-right")}</span>
          ${MODS.map(m => `<div class="node strong">Module ${m[0]}</div><span class="arw">${ic("arrow-right")}</span>`).join("")}
          <div class="node green">${ic("refresh-cw")}Restored commons &amp; better governance</div>
        </div>
        <div class="grid g3 mt32">
          ${MODS.map(m => `<article class="card hover">
            <div class="mod-head"><span class="mod-n">${m[0]}</span><strong>${m[1]}</strong></div>
            <div class="ctx" style="box-shadow:none;border:none;padding:12px 0 0"><h5>${ic("presentation")}ToT focus</h5><p>${m[2]}</p></div>
            <div class="ctx" style="box-shadow:none;border:none;padding:6px 0 0"><h5>${ic("footprints")}Trainee field action</h5><p>${m[3]}</p></div>
          </article>`).join("")}
        </div>
      </section>
      ${LA_SWITCH("modular")}
    `);
  }

  if(params.id === "ldhf"){
    return shell("#/learning-approach", null,
      pageHead({tone:"sys", photo:"assets/img/la-ldhf.jpg", emblem:"repeat",
        crumbs:cr.concat([{label:"Low Dose High Frequency (LDHF)"}]), eyebrow:"Low Dose High Frequency (LDHF)", eyebrowIcon:"repeat",
        title:"Capacity Building Beyond Training",
        sub:"Shift from high-intensity, low-frequency training to high-frequency, low-intensity learning — delivered continuously alongside action."}) + `
      <section class="sec">
        <div class="grid g2" style="gap:26px">
          <div class="panel">
            <div class="sec-label" style="margin-bottom:14px">Intensity of learning (high → low) · Frequency of learning (low → high)</div>
            <div class="quad">
              <div class="q-cell">High intensity · High frequency</div>
              <div class="q-cell on">High frequency · Low intensity<span>Target</span></div>
              <div class="q-cell">High intensity · Low frequency<span>Old model</span></div>
              <div class="q-cell">Low intensity · Low frequency</div>
            </div>
          </div>
          <div class="stack">
            <div class="ctx"><h5>${ic("messages-square")}More interactions</h5><p>With mentors, experts and peers.</p></div>
            <div class="ctx"><h5>${ic("eye")}More transparency</h5><p>Timely, trusted and verifiable data.</p></div>
            <div class="ctx"><h5>${ic("trending-down")}Fewer resources</h5><p>Less people, funding and effort.</p></div>
            ${callout({icon:"sparkles", title:"A digitally reimagined way of working", text:"Makes all of this possible.", actions:""})}
          </div>
        </div>
      </section>
      ${LA_SWITCH("ldhf")}
    `);
  }

  if(params.id === "outcome"){
    const STEPS = ["Training of Trainers (physical or virtual)","Field implementation","Learning using content on digital platforms following ToT","Guided mentoring","Learning using content following guided mentoring","Refresher &amp; follow-up support","Learning translated into action"];
    return shell("#/learning-approach", null,
      pageHead({tone:"sys", photo:"assets/img/story-pasture-rules.jpg", emblem:"target",
        crumbs:cr.concat([{label:"Approach to Outcome-based Learning"}]), eyebrow:"Approach to capacity building", eyebrowIcon:"target",
        title:"Approach to Outcome-based Learning",
        sub:"A continuous path from training of trainers to learning that is translated into action on the ground."}) + `
      <section class="sec">
        <div class="flow">
          ${STEPS.map((s, i) => `<div class="node ${i === STEPS.length - 1 ? "strong" : ""}">${s}</div>${i < STEPS.length - 1 ? `<span class="arw">${ic("arrow-right")}</span>` : ""}`).join("")}
        </div>
        <div class="grid g3 mt32">
          ${STEPS.map((s, i) => `<article class="card hover"><div class="mod-head"><span class="mod-n">${i + 1}</span><strong>${s}</strong></div></article>`).join("")}
        </div>
      </section>
      ${LA_SWITCH("outcome")}
    `);
  }
  return screens["learning-approach"]();
};

/* ── RESOURCE SYSTEMS & THEMES ───────────────────────────────────────────── */
screens["resource-systems"] = () => shell("#/resource-systems", null,
  pageHead({
    tone:"sys", photo:"assets/img/commons-landscape.jpg", emblem:"trees",
    crumbs:[{label:"Home",href:"#/home"},{label:"Resource Systems & Themes"}],
    eyebrow:"Choose your commons", eyebrowIcon:"trees",
    title:"Resource Systems &amp; Themes",
    sub:"Each pathway explains the process first and then provides resources in the order they are likely to be used."
  }) + `
  <section class="sec">
    <div class="grid g3">${SYSTEM_IDS.map(systemCard).join("")}</div>
  </section>
  <section class="sec soft">
    <div class="sec-head">
      <div><div class="sec-label">Themes</div><h2 class="sec-title">Cross-cutting themes</h2>
        <p class="sec-sub">Themes apply across resource systems and follow the same page flow, without a stage pathway.</p></div>
      ${isAdmin() ? `<button class="btn btn-solid" onclick="openAddTheme()">${ic("plus")}Add Theme</button>` : ""}
    </div>
    <div class="grid g3">${THEME_LIST().map(themeCard).join("")}</div>
  </section>
`);

/* ── RESOURCE-SYSTEM / THEME INFORMATION PAGE ────────────────────────────── */
screens.system = (params) => {
  const s = entityById(params.id);
  if(!s) return screens["resource-systems"]();
  const isTheme = !!THEMES[params.id];
  /* The badge is gone — it only repeated the title. Each option now shows what
     is actually inside it, so the choice is informed rather than decorative. */
  const OPTIONS = [
    {g:"atomized",   name:"Atomized Course Curriculum", icon:"list-checks",    cls:"g",
     desc:"Short, low-dose high-frequency topics you can take a few minutes at a time, plus the learning materials that go with them.",
     holds:"Atomised topics · videos · audio"},
    {g:"modular",    name:"Modular Learning", icon:"layers", cls:"",
     desc:"Progressive training modules delivered as a series, with field activity between them.",
     holds:"Courses · training modules"},
    {g:"supporting", name:"Supporting Resources", icon:"clipboard-list", cls:"o",
     desc:"The handbooks, facilitators' guides, SoPs, formats and field tools you reach for while running a session.",
     holds:"Guides · handbooks · formats · tools"}
  ];
  return shell("#/resource-systems", null,
    pageHead({
      tone:"sys", accent:s.accent, emblem:s.icon, photo:s.photo || "",
      crumbs:[{label:"Home",href:"#/home"},{label:"Resource Systems",href:"#/resource-systems"},{label:s.name}],
      eyebrow:isTheme ? "Theme" : "Commoning of", eyebrowIcon:s.icon,
      title:s.name, sub:s.desc,
      facts:[[isTheme ? "Purpose &amp; relevance to Commons" : "Introduction", s.desc],
             ["Intended users", s.users],
             ["Expected outcome", s.outcome]]
    }) + `
    ${isTheme ? "" : `
    <section class="sec">
      <div class="sec-head">
        <div><div class="sec-label">The process</div><h2 class="sec-title">Commoning Pathway / Process</h2>
          <p class="sec-sub">Six stages, from reading the local context through to monitoring what changes. Select any stage to see what needs to happen and which resources support it.</p></div>
        <button class="btn btn-ghost" onclick="toast('Process documents — ${js(STATES.join(', '))} — placeholder')">${ic("file-text")}Process documents</button>
      </div>
      ${pathway(null, {system:params.id})}
    </section>`}

    <section class="sec ${isTheme ? "" : "soft"}">
      <div class="sec-center">
        <div class="sec-label">Learning design and materials</div>
        <h2 class="sec-title">Choose how you want to learn</h2>
        <p class="sec-sub">The training is delivered as modular learning and as low-dose, high-frequency (LDHF) atomised content. Select an option to explore the relevant training resources.</p>
      </div>
      <div class="ld-grid">
        ${OPTIONS.map(o => {
          const n = s ? resFor(s.name, o.g).length : 0;
          return `<article class="ld-card ${o.cls}" onclick="go('#/modular/${params.id}?g=${o.g}')">
          <span class="ld-ic">${ic(o.icon)}</span>
          <h3>${o.name}</h3>
          <p>${o.desc}</p>
          <div class="ld-meta">
            <span class="ld-holds">${o.holds}</span>
            <span class="ld-count">${n} resource${n === 1 ? "" : "s"}</span>
          </div>
          <span class="arrow-link ld-cta">Explore resources ${ic("arrow-right")}</span>
        </article>`; }).join("")}
      </div>
    </section>
  `);
};

/* ── STAGE DETAIL ────────────────────────────────────────────────────────── */
screens.stage = (params) => {
  const s = stageById(params.id) || STAGES[2];
  const sys = params.sys;
  const sysObj = sys && SYSTEMS[sys] ? SYSTEMS[sys] : null;
  const idx = STAGES.indexOf(s);
  const next = STAGES[idx + 1], prev = STAGES[idx - 1];
  const cr = [{label:"Home",href:"#/home"}];
  if(sysObj) cr.push({label:"Resource Systems",href:"#/resource-systems"}, {label:sysObj.name,href:"#/system/" + sys});
  cr.push({label:`Stage ${s.num} — ${s.name}`});
  const pool = (sysObj ? resFor(sysObj.name) : RES).filter(r => r.stage === s.name || r.stage === "All Stages");

  return shell(null, null,
    pageHead({
      tone:"sys", accent:sysObj ? sysObj.accent : "var(--blue)", emblem:s.icon, crumbs:cr,
      photo:sysObj ? sysObj.photo : "",
      eyebrow:`${sysObj ? sysObj.name + " · " : ""}Commoning stage`, eyebrowIcon:"route",
      title:`Stage ${s.num} — ${s.name}`, sub:s.short,
      facts:[["What needs to happen", s.what]]
    }) + `
    <section class="sec">
      <div class="sec-label">Where you are</div>
      <h2 class="sec-title" style="margin-bottom:24px">The Commoning pathway</h2>
      ${pathway(s.id, {system:sys})}
    </section>

    <section class="sec soft">
      <div class="sec-head">
        <div><h2 class="sec-title">Resources for this stage</h2>
          <p class="sec-sub">Grouped by learning design — Modular Learning, Atomized Course Curriculum (LDHF) and Supporting Resources.</p></div>
        ${quickFilters()}
      </div>
      ${pool.length
        ? `<div class="grid g3">${pool.map(resourceCard).join("")}</div>`
        : `<div class="empty"><span class="e-ic">${ic("package-open")}</span><h4>No resources yet for this stage</h4><p>Resources for this stage are being prepared.</p><button class="btn btn-ghost" onclick="go('#/library')">Browse the full library</button></div>`}
    </section>

    <section class="sec">
      ${callout({icon:next ? "arrow-right" : "flag", title:next ? "Recommended next step" : "You have reached the final stage",
        text:next ? `Continue to Stage ${next.num} — ${next.name}.` : "Revisit the pathway or return to the resource system.",
        actions:next
          ? `<button class="btn btn-solid" onclick="go('#/stage/${next.id}${sys ? "?sys=" + sys : ""}')">Next: ${next.name} ${ic("arrow-right")}</button>`
          : `<button class="btn btn-solid" onclick="go('${sys ? "#/system/" + sys : "#/resource-systems"}')">Back to resource system ${ic("arrow-right")}</button>`})}
      <div class="between mt24">
        ${prev ? `<button class="btn btn-ghost" onclick="go('#/stage/${prev.id}${sys ? "?sys=" + sys : ""}')">${ic("arrow-left")}Previous: ${prev.name}</button>` : `<span></span>`}
        <button class="btn btn-ghost" onclick="go('${sys ? "#/system/" + sys : "#/resource-systems"}')">Keep pathway visible ${ic("arrow-right")}</button>
      </div>
    </section>
  `);
};

/* ── TOPICS + SUBTOPICS (the modular / LDHF / supporting browser) ────────── */
let editMode = false;
function toggleEdit(){ editMode = !editMode; render(); }

screens.modular = (params) => {
  const s = entityById(params.id);
  const label = s ? s.name : "Resource System";
  const group = params.g;
  const gq = group ? "g=" + group + "&" : "";
  const topic = params.topic ? topicById(params.topic) : null;
  const ld = group ? LD.find(x => x.id === group) : null;
  const cr = [{label:"Home",href:"#/home"},{label:"Resource Systems & Themes",href:"#/resource-systems"}];
  if(s) cr.push({label:s.name,href:"#/system/" + params.id});
  if(ld) cr.push({label:ld.name,href:`#/modular/${params.id}?g=${ld.id}`});
  cr.push({label: topic ? topic.name : "Topics"});

  /* ---- topic list ---- */
  if(!topic){
    editMode = false;
    const mapped = s ? topicsForGroup(s.name, group) : [];
    const counts = {}; mapped.forEach(t => counts[t.id] = t.count);
    const topics = TOPICS.map(t => Object.assign({}, t, {count: counts[t.id] != null ? counts[t.id] : t.count}));
    return shell("#/resource-systems", null,
      pageHead({
        tone:"sys", accent:s ? s.accent : "var(--blue)", emblem:ld ? ld.icon : (s ? s.icon : "library"), crumbs:cr,
        eyebrow:s ? s.name : "Resource system", eyebrowIcon:"library",
        title:ld ? ld.name : `Topics under ${label}`,
        sub:"Select a topic to see its courses, modules and resources.",
        actions:isAdmin() ? `<button class="btn btn-white" onclick="openAddTopic('${params.id}','${group || ""}')">${ic("plus")}Add Topic</button>` : ""
      }) + `
      <section class="sec">
        <div class="with-side">
          <aside class="filters">
            <div class="f-head">${ic("sliders-horizontal")}Filter</div>
            <div class="fgroup"><h4>Select state</h4>
              ${["All States"].concat(STATES).map((x, i) => `<label class="fopt"><input type="radio" name="st" ${i === 0 ? "checked" : ""}> ${x}</label>`).join("")}</div>
            <div class="fgroup"><h4>Select language</h4>
              ${["All Languages","English","Hindi"].map((x, i) => `<label class="fopt"><input type="radio" name="lang" ${i === 0 ? "checked" : ""}> ${x}</label>`).join("")}</div>
            <div class="filter-actions">
              <button class="btn btn-solid btn-sm" onclick="toast('Filters applied')">Apply</button>
              <button class="btn btn-ghost btn-sm" onclick="clearFilters(this)">Reset</button>
            </div>
          </aside>
          <div>
            <div class="toolbar"><div class="count"><b>${topics.length}</b> topics under ${label}${ld ? " · " + ld.name : ""}</div>${sortSelect()}</div>
            <div class="grid g3">
              ${topics.map(t => `<article class="card click flip" style="--acc:${s ? s.accent : "var(--blue)"};padding:0;overflow:hidden"
                  onclick="go('#/modular/${params.id}?${gq}topic=${t.id}')">
                ${cover({photo:s ? s.photo : "", accent:s ? s.accent : "var(--blue)", icon:"folder-open", h:"128px"})}
                <div class="cl-body">
                  <div class="c-t" style="margin:0">${t.name}</div>
                  <p class="c-d">${t.desc}</p>
                  <div class="c-foot"><div class="between">
                    <span class="arrow-link">View resources ${ic("arrow-right")}</span>
                    <span class="tag">${t.count} resource${t.count !== 1 ? "s" : ""}</span>
                  </div></div>
                  ${isAdmin() ? `<div class="row mt12" onclick="event.stopPropagation()">
                    <button class="btn btn-ghost btn-sm" onclick="openAddTopic('${params.id}','${group || ""}','${t.id}')">${ic("pencil")}Edit</button>
                    <button class="btn btn-ghost btn-sm dz" onclick="adminDeleteTopic('${t.id}','${params.id}','${group || ""}')">${ic("trash-2")}Delete</button>
                  </div>` : ""}
                </div>
              </article>`).join("")}
            </div>
          </div>
        </div>
      </section>
    `);
  }

  /* ---- topic details: subtopics (left) + selected subtopic's files (right) ---- */
  const groups = subtopicsFor(topic);
  const subs = allSubtopics(topic);
  const activeSub = subs.find(x => x.code === params.sub) || subs[0];
  const canEdit = isAdmin() && editMode;
  return shell("#/resource-systems", null,
    pageHead({
      tone:"sys", accent:s ? s.accent : "var(--blue)", emblem:"folder-open", crumbs:cr,
      eyebrow:`${s ? s.name + " · " : ""}${ld ? ld.name : "Topic"}`, eyebrowIcon:"library",
      title:topic.name, sub:topic.desc,
      actions:isAdmin()
        ? `<button class="btn ${editMode ? "btn-white" : "btn-ghost"} btn-lg" onclick="toggleEdit()">${ic(editMode ? "check" : "pencil")}${editMode ? "Done" : "Edit"}</button>` : ""
    }) + `
    <section class="sec">
      ${canEdit ? `<div class="editbar">${ic("pencil")}Edit mode — add or remove subtopics, and upload or remove files.</div>` : ""}
      <div class="with-side">
        <aside class="filters">
          <div class="f-head">${ic("list")}Subtopics</div>
          ${subs.length ? groups.map(g => `<div class="sub-mod">${g.mod}</div>
            ${g.items.map(it => `<div class="sub-item ${activeSub && it.code === activeSub.code ? "on" : ""}"
                onclick="go('#/modular/${params.id}?${gq}topic=${topic.id}&sub=${it.code}')">
              <span class="sub-code">${it.code}</span><span class="sub-nm">${it.name}</span>
              ${canEdit ? `<button class="sub-del" title="Remove subtopic" onclick="event.stopPropagation();adminRemoveSubtopic('${topic.id}','${it.code}')">${ic("x")}</button>` : ""}
            </div>`).join("")}`).join("") : `<p class="muted" style="font-size:13px;padding:8px 0">No subtopics yet.${canEdit ? " Add one below." : ""}</p>`}
          ${canEdit ? `<div class="filter-actions"><button class="btn btn-ghost btn-sm" style="flex:1" onclick="toggleReveal('add-sub-form')">${ic("plus")}Add Subtopic</button></div>
            <div id="add-sub-form" class="hidden mt12">
              <div class="inp"><input id="ns-name" placeholder="Subtopic name"></div>
              <div class="row mt12"><button class="btn btn-solid btn-sm" onclick="adminAddSubtopic('${topic.id}')">Add</button>
                <button class="btn btn-ghost btn-sm" onclick="toggleReveal('add-sub-form')">Cancel</button></div>
            </div>` : ""}
        </aside>
        <div>
          ${!activeSub ? `<div class="empty"><span class="e-ic">${ic("folder-open")}</span><h4>No subtopics yet</h4>
              <p>${canEdit ? "Use “Add Subtopic” on the left to create the first subtopic, then upload files to it."
                           : (isAdmin() ? "Select “Edit” to add subtopics and upload files." : "This topic has no subtopics yet.")}</p></div>`
          : `<div class="toolbar">
              <div class="count"><b>${activeSub.code}</b> · ${activeSub.name} — ${activeSub.files.length} file${activeSub.files.length !== 1 ? "s" : ""}</div>
              ${canEdit ? `<button class="btn btn-solid btn-sm" onclick="toggleReveal('upload-file-form')">${ic("upload")}Upload File</button>` : sortSelect()}
            </div>
            ${canEdit ? `<div id="upload-file-form" class="panel hidden" style="margin-bottom:18px;max-width:560px">
              <h3>Upload a file to ${activeSub.code} · ${activeSub.name}</h3>
              <div class="grid g2" style="gap:14px">
                <div class="field"><label>File name</label><div class="inp"><input id="uf-name" placeholder="e.g. Field guide"></div></div>
                <div class="field"><label>Type</label><select id="uf-type" class="sel" style="width:100%;height:52px">${["PDF","Video","Image","Audio"].map(o => `<option>${o}</option>`).join("")}</select></div>
              </div>
              <div class="dropzone" onclick="toast('Choose file — placeholder')">${ic("upload")}Drag &amp; drop a file, or click to browse</div>
              <div class="row mt16"><button class="btn btn-solid btn-sm" onclick="adminUploadFile('${topic.id}','${activeSub.code}')">Upload</button>
                <button class="btn btn-ghost btn-sm" onclick="toggleReveal('upload-file-form')">Cancel</button></div>
            </div>` : ""}
            <div class="grid g3">
              ${activeSub.files.length ? activeSub.files.map((f, i) => `<div class="file-wrap">${fileCard(f, null, null, i, {sys:params.id, group:group || "", topic:topic.id, sub:activeSub.code})}
                ${canEdit ? `<button class="file-x" title="Remove file" onclick="adminRemoveFile('${topic.id}','${activeSub.code}',${i})">${ic("x")}</button>` : ""}</div>`).join("")
                : `<div class="empty" style="grid-column:1/-1"><span class="e-ic">${ic("package-open")}</span><h4>No files yet</h4><p>${canEdit ? "Use “Upload File” to add one." : "Files for this subtopic are being prepared."}</p></div>`}
            </div>`}
        </div>
      </div>
    </section>
  `);
};

/* ── COURSES ─────────────────────────────────────────────────────────────── */
screens.courses = (params) => {
  const q = params && params.q ? decodeURIComponent(params.q) : "";
  const list = COURSES.filter(c => {
    if(!q) return true;
    return (c.title + " " + c.system + " " + c.lang + " " + c.topics.map(t => t.name).join(" ")).toLowerCase().includes(q.toLowerCase());
  });
  const box = (fg, items) => items.map(i =>
    `<label class="fopt"><input type="checkbox" data-fg="${fg}" value="${attr(i)}" onchange="applyCourseFilters()"> ${i}</label>`).join("");
  return shell("#/courses", null,
    pageHead({
      crumbs:[{label:"Home",href:"#/home"},{label:"Courses"}],
      title:"Courses",
      sub:"Structured courses. Each course has a set of topics, and each topic holds multiple learning files — images, PDFs and videos.",
      actions:`<div class="searchfield" style="min-width:min(560px,88vw)">
          ${ic("search")}
          <input id="course-search" placeholder="Search courses by title, topic or keyword…" value="${attr(q)}"
            oninput="applyCourseFilters()" onkeydown="if(event.key==='Enter'){applyCourseFilters()}">
          <button class="btn btn-solid" onclick="applyCourseFilters()">Search</button>
        </div>
        ${isAdmin() ? `<button class="btn btn-solid btn-lg" onclick="startCourseFlow()">${ic("plus")}Create Course</button>` : ""}`
    }) + `
    <section class="sec">
      <div class="with-side">
        <aside class="filters">
          <div class="f-head">${ic("sliders-horizontal")}Filter courses</div>
          <div class="fgroup"><h4>Resource System / Theme</h4>${box("sys", ["Forests","Pastureland","Water"].concat(THEME_LIST().map(t => t.name)).concat(["All Systems"]))}</div>
          <div class="fgroup"><h4>Language</h4>${box("lang", ["English","Hindi"])}</div>
          <div class="fgroup"><h4>File type</h4>${box("ftype", ["Image","PDF","Video"])}</div>
          <div class="filter-actions">
            <button class="btn btn-solid btn-sm" onclick="applyCourseFilters()">Apply</button>
            <button class="btn btn-ghost btn-sm" onclick="clearCourseFilters()">Clear all</button>
          </div>
        </aside>
        <div>
          <div class="toolbar"><div class="count" id="course-count"><b>${list.length}</b> course${list.length !== 1 ? "s" : ""}</div>${sortSelect()}</div>
          <div id="course-results" class="grid g3">
            ${list.length ? list.map(courseListCard).join("")
              : `<div class="empty" style="grid-column:1/-1"><span class="e-ic">${ic("search-x")}</span><h4>No courses found</h4><p>Nothing matches “${esc(q)}”. Try a different keyword.</p></div>`}
          </div>
        </div>
      </div>
    </section>
  `);
};
function courseFilterState(){
  const picked = {sys:[], lang:[], ftype:[]};
  document.querySelectorAll('.filters input[data-fg]:checked').forEach(i => picked[i.dataset.fg].push(i.value));
  const el = document.getElementById("course-search");
  return {picked, q:(el ? el.value : "").trim().toLowerCase()};
}
function applyCourseFilters(){
  const {picked, q} = courseFilterState();
  const rows = COURSES.filter(c => {
    if(picked.sys.length && !picked.sys.includes(c.system)) return false;
    if(picked.lang.length && !picked.lang.includes(c.lang)) return false;
    if(picked.ftype.length && !c.topics.some(t => t.files.some(f => picked.ftype.includes(f.type)))) return false;
    if(q && !(c.title + " " + c.system + " " + c.lang + " " + c.topics.map(t => t.name).join(" ")).toLowerCase().includes(q)) return false;
    return true;
  });
  const out = document.getElementById("course-results");
  const cnt = document.getElementById("course-count");
  if(cnt) cnt.innerHTML = `<b>${rows.length}</b> course${rows.length !== 1 ? "s" : ""}`;
  if(out) out.innerHTML = rows.length ? rows.map(courseListCard).join("")
    : `<div class="empty" style="grid-column:1/-1"><span class="e-ic">${ic("search-x")}</span><h4>No courses match these filters</h4><p>Try clearing a filter or searching for something else.</p></div>`;
  if(window.lucide) lucide.createIcons();
}
function clearCourseFilters(){
  document.querySelectorAll('.filters input[data-fg]').forEach(i => { i.checked = false; });
  const el = document.getElementById("course-search"); if(el) el.value = "";
  applyCourseFilters();
  toast("Filters cleared");
}

/* ── COURSE VIEWER (topics left · files right) ───────────────────────────── */
screens.course = (params) => {
  const c = courseById(params.id) || COURSES[0];
  const active = (params.t && c.topics.find(t => t.id === params.t)) || c.topics[0];
  const acc = accentFor(c.system);
  return shell("#/courses", null,
    pageHead({
      tone:"sys", accent:acc, emblem:"graduation-cap",
      crumbs:[{label:"Home",href:"#/home"},{label:"Courses",href:"#/courses"},{label:c.title}],
      eyebrow:"Course", eyebrowIcon:"graduation-cap",
      title:c.title, sub:c.desc || `A structured course for ${c.system.toLowerCase()}, delivered as topics with learning files.`,
      facts:[["Resource system", c.system],["Language", c.lang],
             ["Contents", `${c.topics.length} topics · ${c.topics.reduce((n, t) => n + t.files.length, 0)} files`]],
      actions:isAdmin() ? `<button class="btn btn-white" onclick="editCourse('${c.id}')">${ic("pencil")}Edit Course</button>
        <button class="btn btn-ghost btn-lg" style="background:transparent;color:#fff;border-color:rgba(255,255,255,.35)" onclick="deleteCourse('${c.id}')">${ic("trash-2")}Delete</button>` : ""
    }) + `
    <section class="sec">
      <div class="cur-wrap">
        <aside class="cur-side">
          <div class="cs-h">Topics</div>
          ${c.topics.map(t => `<div class="cur-unit ${t.id === active.id ? "on" : ""}" onclick="go('#/course/${c.id}?t=${t.id}')">
            <span class="cu-code">${ic("folder")}</span>
            <div><div class="cu-t">${t.name}</div><div class="cu-s">${t.files.length} file${t.files.length !== 1 ? "s" : ""}</div></div>
          </div>`).join("")}
        </aside>
        <div>
          <div class="toolbar">
            <div class="count"><b>${active.name}</b> — ${active.files.length} file${active.files.length !== 1 ? "s" : ""}</div>
          </div>
          <p class="sec-sub" style="margin-bottom:20px">Files for this topic — open or download.${isAdmin() ? " Use <strong>Edit Course</strong> to add, rename or remove files." : ""}</p>
          <div class="grid g3">${active.files.map((f, i) => fileCard(f, c.id, active.id, i)).join("")}</div>
        </div>
      </div>
    </section>
  `);
};

/* ── FILE VIEW (a single course file) ────────────────────────────────────── */
screens.file = (params) => {
  const c = courseById(params.id) || COURSES[0];
  const topic = c.topics.find(t => t.id === params.t) || c.topics[0];
  const idx = Math.max(0, Math.min(topic.files.length - 1, parseInt(params.f, 10) || 0));
  const f = topic.files[idx];
  const k = mediaKind(f.type);
  const others = topic.files.filter((_, i) => i !== idx);
  return shell("#/courses", null,
    pageHead({
      crumbs:[{label:"Home",href:"#/home"},{label:"Courses",href:"#/courses"},{label:c.title,href:"#/course/" + c.id},
              {label:topic.name,href:`#/course/${c.id}?t=${topic.id}`},{label:f.name}],
      eyebrow:f.type, eyebrowIcon:k.icon,
      title:f.name, sub:`From “${topic.name}” in ${c.title}.`,
      actions:`<button class="btn btn-solid btn-lg" onclick="toast('Open ${js(f.type)} viewer — placeholder')">${ic(k.icon)}Open ${f.type}</button>
        <button class="btn btn-ghost btn-lg" onclick="download('${js(f.name)}')">${ic("download")}Download</button>
        ${isAdmin() ? `<button class="btn btn-ghost btn-lg" onclick="toast('Replace file — placeholder')">${ic("refresh-cw")}Replace</button>` : ""}`
    }) + `
    <section class="sec">
      <div class="grid g2" style="gap:26px">
        <div class="preview ${k.cls === "d" ? "green" : ""}">
          <div class="pv">
            <div class="pv-play" onclick="toast('Open ${js(f.type)} viewer — placeholder')">${ic(k.icon)}</div>
            <div class="pv-t">${f.type} · ${c.lang}</div>
            <div class="pv-s">${f.type} preview</div>
          </div>
        </div>
        <div class="stack">
          <div class="ctx click" onclick="go('#/course/${c.id}')"><h5>${ic("graduation-cap")}Course</h5><p><span class="arrow-link">${c.title} ${ic("arrow-right")}</span></p></div>
          <div class="ctx click" onclick="go('#/course/${c.id}?t=${topic.id}')"><h5>${ic("folder")}Topic</h5><p><span class="arrow-link">${topic.name} ${ic("arrow-right")}</span></p></div>
          <div class="ctx"><h5>${ic("file-text")}File type</h5><p>${f.type}</p></div>
          <div class="ctx"><h5>${ic("languages")}Language</h5><p>${c.lang}</p></div>
        </div>
      </div>
    </section>
    <section class="sec soft">
      <div class="sec-head">
        <div><h2 class="sec-title">More files in “${topic.name}”</h2></div>
        <button class="btn btn-ghost" onclick="go('#/course/${c.id}?t=${topic.id}')">Back to topic ${ic("arrow-right")}</button>
      </div>
      <div class="grid g3">${others.length ? topic.files.map((ff, i) => i === idx ? "" : fileCard(ff, c.id, topic.id, i)).join("")
        : `<div class="empty" style="grid-column:1/-1"><span class="e-ic">${ic("package-open")}</span><h4>No other files</h4><p>This topic has a single file.</p></div>`}</div>
    </section>
  `);
};

/* ── DOCUMENT DETAIL (a resource-system subtopic file) ───────────────────── */
const DOC_CONTRIBUTORS = ["Krishnan Iyer","Meera Nair","Anil Kumar","Sunita Rao","Ravi Menon"];
const docFileSize = t => ({video:"48.2 MB", pdf:"3.7 MB", image:"1.2 MB", audio:"12.6 MB"})[(t || "").toLowerCase()] || "—";
function docCategory(name){
  const n = (name || "").toLowerCase();
  if(/note|background|overview|explainer/.test(n)) return "Reference";
  if(/guide|handbook|sop|format|manual/.test(n)) return "How-to";
  if(/map|concept|diagram/.test(n)) return "Reference Map";
  if(/video|intro/.test(n)) return "Learning Video";
  return "Resource";
}
screens.doc = (params) => {
  const s = entityById(params.id);
  const topic = topicById(params.topic);
  if(!topic) return screens["resource-systems"]();
  const group = params.g || "";
  const gq = group ? "g=" + group + "&" : "";
  const subs = allSubtopics(topic);
  const sub = subs.find(x => x.code === params.sub) || subs[0];
  if(!sub) return screens["resource-systems"]();
  const idx = Math.max(0, Math.min(sub.files.length - 1, parseInt(params.i, 10) || 0));
  const f = sub.files[idx];
  const k = mediaKind(f.type);
  const who = DOC_CONTRIBUTORS[idx % DOC_CONTRIBUTORS.length];
  const initials = who.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const ld = group ? LD.find(x => x.id === group) : null;
  const cr = [{label:"Home",href:"#/home"},{label:"Resource Systems & Themes",href:"#/resource-systems"},
    s ? {label:s.name,href:"#/system/" + params.id} : {label:"Resource System",href:"#/resource-systems"}];
  if(ld) cr.push({label:ld.name,href:`#/modular/${params.id}?g=${ld.id}`});
  cr.push({label:topic.name,href:`#/modular/${params.id}?${gq}topic=${topic.id}`},
          {label:sub.name,href:`#/modular/${params.id}?${gq}topic=${topic.id}&sub=${sub.code}`},
          {label:f.name});
  const row = (l, v) => `<div class="doc-row"><h5>${l}</h5><div class="doc-val">${v}</div></div>`;
  const tags = [s ? s.name : "Commons", f.type || "File", "Public"];
  return shell("#/resource-systems", null,
    pageHead({
      crumbs:cr, eyebrow:`${k.k === "video" ? "Video" : k.k === "image" ? "Image" : "Document"} · ${sub.code} ${sub.name}`, eyebrowIcon:k.icon,
      title:f.name, sub:`From “${topic.name}”${s ? " under " + s.name : ""}.`,
      actions:`<button class="btn btn-solid btn-lg" onclick="download('${js(f.name)}')">${ic("download")}Download</button>
        <button class="btn btn-ghost btn-lg" onclick="toast('Open full-screen viewer — placeholder')">${ic("maximize")}Full screen</button>`
    }) + `
    <section class="sec">
      <div class="doc-layout">
        <div class="panel doc-preview">
          <div class="between" style="margin-bottom:14px">
            <h3 style="margin:0">${k.k === "video" ? "Video preview" : k.k === "image" ? "Image preview" : "PDF preview"}</h3>
            <button class="btn btn-icon" title="Full screen" onclick="toast('Open full-screen viewer — placeholder')">${ic("maximize")}</button>
          </div>
          <div class="preview ${k.cls === "d" ? "green" : ""}" style="min-height:360px">
            <div class="pv"><div class="pv-play" onclick="toast('Open viewer — placeholder')">${ic(k.icon)}</div><div class="pv-t">${f.name}</div><div class="pv-s">${f.type}</div></div>
          </div>
        </div>
        <aside class="panel doc-meta">
          <h3 style="margin-bottom:14px">Document details</h3>
          ${row("Theme", s ? s.name : "Resource System")}
          ${row("File type", `<span class="tag blue">${f.type}</span>`)}
          ${row("Category", docCategory(f.name))}
          ${row("Visibility", `<span class="tag green">${ic("globe")}Public</span>`)}
          ${row("File size", docFileSize(f.type))}
          ${row("Version", `<code class="doc-ver">v1.0</code>`)}
          <div class="doc-row stack"><h5>Uploaded by</h5>
            <div class="doc-uploader"><span class="doc-avatar">${initials}</span>
              <div><div class="du-n">${who}</div><div class="du-d">2026-05-18</div></div></div>
          </div>
          <div class="doc-row last"><h5>Tags</h5>
            <div class="tags">${tags.map(x => `<span class="tag">${ic("tag")}${x}</span>`).join("")}</div></div>
        </aside>
      </div>
    </section>
    <section class="sec soft">
      <div class="sec-head"><div><h2 class="sec-title">More files in “${sub.name}”</h2></div></div>
      <div class="grid g3">${sub.files.length > 1 ? sub.files.map((ff, i) => i === idx ? "" : fileCard(ff, null, null, i, {sys:params.id, group:group, topic:topic.id, sub:sub.code})).join("")
        : `<div class="empty" style="grid-column:1/-1"><span class="e-ic">${ic("package-open")}</span><h4>No other files</h4><p>This subtopic has a single file.</p></div>`}</div>
    </section>
  `);
};

/* ── CREATE / EDIT COURSE (admin, two phases) ────────────────────────────── */
let courseDraft = null;
const newDraft = () => ({title:"", banner:"", desc:"", system:"Forests", lang:"English", topics:[], sel:0, step:1, uploadType:"Image", editingId:null});
const ensureCourseDraft = () => (courseDraft = courseDraft || newDraft());
function startCourseFlow(){ courseDraft = newDraft(); go("#/course-new"); }
function draftSet(f, v){ ensureCourseDraft()[f] = v; }
function draftSetUploadType(t){ ensureCourseDraft().uploadType = t; go("#/course-new"); }
function draftUploadBanner(){ ensureCourseDraft().banner = "course-banner.jpg"; toast("Cover image uploaded — placeholder"); go("#/course-new"); }
function draftRemoveBanner(){ ensureCourseDraft().banner = ""; go("#/course-new"); }
function draftToStep2(){ ensureCourseDraft(); if(!courseDraft.title.trim()){ toast("Please enter a course name"); return; } courseDraft.step = 2; go("#/course-new"); }
function draftToStep1(){ ensureCourseDraft().step = 1; go("#/course-new"); }
function draftAddTopic(){ ensureCourseDraft(); courseDraft.topics.push({name:"Topic " + (courseDraft.topics.length + 1), files:[]}); courseDraft.sel = courseDraft.topics.length - 1; go("#/course-new"); }
function draftSelectTopic(i){ ensureCourseDraft().sel = i; go("#/course-new"); }
function draftSetTopicName(i, v){ courseDraft.topics[i].name = v; }
function draftRemoveTopic(i){ ensureCourseDraft().topics.splice(i, 1); courseDraft.sel = Math.max(0, Math.min(courseDraft.sel, courseDraft.topics.length - 1)); go("#/course-new"); }
function draftAddFile(type){ ensureCourseDraft(); if(!courseDraft.topics.length) return draftAddTopic(); courseDraft.topics[courseDraft.sel].files.push({name:"", type:type || "PDF"}); go("#/course-new"); }
function draftRemoveFile(fi){ courseDraft.topics[courseDraft.sel].files.splice(fi, 1); go("#/course-new"); }
function draftSetFile(fi, field, v){ courseDraft.topics[courseDraft.sel].files[fi][field] = v; }
function draftCancel(){ courseDraft = null; go("#/courses"); }
function editCourse(id){
  const c = courseById(id); if(!c) return;
  courseDraft = {title:c.title, banner:c.banner || "", desc:c.desc || "", system:c.system, lang:c.lang,
    topics:c.topics.map(t => ({name:t.name, files:t.files.map(f => ({name:f.name, type:f.type}))})),
    sel:0, step:1, uploadType:"Image", editingId:c.id};
  go("#/course-new");
}
function deleteCourse(id){
  if(!confirm("Delete this course? This cannot be undone.")) return;
  const i = COURSES.findIndex(c => c.id === id);
  if(i >= 0){ COURSES.splice(i, 1); toast("Course deleted"); }
  go("#/courses");
}
function publishCourse(){
  ensureCourseDraft();
  if(!courseDraft.title.trim()){ toast("Please enter a course name"); return draftToStep1(); }
  if(!courseDraft.topics.length){ toast("Add at least one topic"); return; }
  const topics = courseDraft.topics.map((t, i) => ({
    id:"t" + (i + 1), name:t.name || ("Topic " + (i + 1)),
    files:t.files.map((f, j) => ({name:f.name || ("File " + (j + 1)), type:f.type}))
  }));
  if(courseDraft.editingId){
    const c = courseById(courseDraft.editingId);
    if(c){ c.title = courseDraft.title; c.desc = courseDraft.desc; c.system = courseDraft.system; c.lang = courseDraft.lang; c.topics = topics; }
    toast("Course updated");
    const id = courseDraft.editingId; courseDraft = null; return go("#/course/" + id);
  }
  const id = "c" + (COURSES.length + 1);
  COURSES.push({id, title:courseDraft.title, desc:courseDraft.desc, system:courseDraft.system, lang:courseDraft.lang, topics});
  toast("Course published");
  courseDraft = null;
  go("#/course/" + id);
}

screens["course-new"] = () => {
  if(!isAdmin()) return gateScreen("Create Course", "Sign in as the Platform Super Admin to create courses.");
  const d = ensureCourseDraft();
  const sysOptions = ["Forests","Pastureland","Water"].concat(THEME_LIST().map(t => t.name)).concat(["All Systems"]);
  const totalFiles = d.topics.reduce((n, t) => n + t.files.length, 0);
  const pageName = d.editingId ? "Edit Course" : "Create a Course";
  const steps = `<div class="cc-steps">
      <button class="cc-step ${d.step >= 1 ? "on" : ""}" onclick="draftToStep1()"><span class="n">1</span>Create a course</button>
      <span class="cc-arw">${ic("chevron-right")}</span>
      <button class="cc-step ${d.step >= 2 ? "on" : ""}" onclick="draftToStep2()"><span class="n">2</span>Course details</button>
      <span class="cc-arw">${ic("chevron-right")}</span>
      <span class="cc-step"><span class="n">3</span>Publish</span>
    </div>`;

  if(d.step === 1){
    return shell(null, null,
      pageHead({crumbs:[{label:"Home",href:"#/home"},{label:"Courses",href:"#/courses"},{label:pageName}],
        eyebrow:"Admin", eyebrowIcon:"shield", title:pageName,
        sub:"Give the course a name, description, cover image and where it belongs."}) + `
      <section class="sec">
        ${steps}
        <div class="panel" style="max-width:680px;margin-top:26px">
          <h3>Course details</h3>
          <div class="field"><label>${ic("type")}Course name <span class="req">*</span></label>
            <div class="inp"><input value="${attr(d.title)}" oninput="draftSet('title',this.value)" placeholder="e.g. Community Forest Resource Rights"></div></div>
          <div class="field"><label>${ic("align-left")}Course description</label>
            <div class="inp tall"><textarea oninput="draftSet('desc',this.value)" placeholder="What is this course about? Who is it for?">${esc(d.desc)}</textarea></div></div>
          <div class="field"><label>${ic("image")}Cover image</label>
            ${d.banner
              ? `<div class="uploaded">${ic("check")}Cover image uploaded
                   <div class="row"><button class="btn btn-ghost btn-sm" onclick="draftUploadBanner()">Change</button>
                   <button class="btn btn-ghost btn-sm dz" onclick="draftRemoveBanner()">Remove</button></div></div>`
              : `<div class="dropzone" onclick="draftUploadBanner()">${ic("upload")}Drag &amp; drop a cover image here, or click to upload</div>`}</div>
          <div class="grid g2" style="gap:14px">
            <div class="field"><label>${ic("trees")}Resource system / Theme</label>
              <select class="sel" style="width:100%;height:52px" onchange="draftSet('system',this.value)">${sysOptions.map(o => `<option ${o === d.system ? "selected" : ""}>${o}</option>`).join("")}</select></div>
            <div class="field"><label>${ic("languages")}Language</label>
              <select class="sel" style="width:100%;height:52px" onchange="draftSet('lang',this.value)">${["English","Hindi"].map(o => `<option ${o === d.lang ? "selected" : ""}>${o}</option>`).join("")}</select></div>
          </div>
          <div class="row mt16"><button class="btn btn-solid" onclick="draftToStep2()">Continue ${ic("arrow-right")}</button>
            <button class="btn btn-ghost" onclick="draftCancel()">Cancel</button></div>
        </div>
      </section>`);
  }

  const sel = Math.max(0, Math.min(d.topics.length - 1, d.sel || 0));
  const active = d.topics[sel];
  const fileRow = (f, fi) => `<div class="file-edit">
      <div class="fe-top"><span class="fe-n">${fi + 1}</span><span class="badge">${f.type}</span>
        <button class="fe-x" title="Remove file" onclick="draftRemoveFile(${fi})">${ic("x")}</button></div>
      <div class="file-prev ${mediaKind(f.type).cls}">${ic(mediaKind(f.type).icon)}</div>
      <div class="field" style="margin:0"><label>Type</label>
        <select class="sel" style="width:100%" onchange="draftSetFile(${fi},'type',this.value)">${["Image","PDF","Video"].map(o => `<option ${o === f.type ? "selected" : ""}>${o}</option>`).join("")}</select></div>
      <div class="field" style="margin:0"><label>File name</label>
        <div class="inp sm"><input value="${attr(f.name)}" oninput="draftSetFile(${fi},'name',this.value)" placeholder="e.g. Overview"></div></div>
    </div>`;
  return shell(null, null,
    pageHead({crumbs:[{label:"Home",href:"#/home"},{label:"Courses",href:"#/courses"},{label:d.title || "Course Details"}],
      eyebrow:"Admin · step 2 of 2", eyebrowIcon:"shield", title:d.title || "Untitled course",
      sub:"Add topics on the left, then upload the files that belong to each topic.",
      facts:[["Resource system", d.system],["Language", d.lang],["Contents", `${d.topics.length} topics · ${totalFiles} files`]]}) + `
    <section class="sec">
      ${steps}
      <div class="cur-wrap" style="margin-top:26px">
        <aside class="cur-side">
          <div class="cs-h">Topics (${d.topics.length})</div>
          ${d.topics.map((t, ti) => `<div class="cur-unit ${ti === sel ? "on" : ""}" onclick="draftSelectTopic(${ti})">
            <span class="cu-code">${ic("folder")}</span>
            <div><div class="cu-t">${esc(t.name) || "Topic " + (ti + 1)}</div><div class="cu-s">${t.files.length} file${t.files.length !== 1 ? "s" : ""}</div></div>
          </div>`).join("") || `<p class="muted" style="font-size:13px;padding:6px 0">No topics yet.</p>`}
          <div class="filter-actions"><button class="btn btn-solid btn-sm" style="flex:1" onclick="draftAddTopic()">${ic("plus")}Add topic</button></div>
        </aside>
        <div>
          ${d.topics.length ? `
            <div class="between" style="margin-bottom:18px">
              <div class="inp" style="flex:1;max-width:440px"><input value="${attr(active.name)}" oninput="draftSetTopicName(${sel},this.value)" placeholder="Topic name" style="font-weight:700"></div>
              <button class="btn btn-ghost btn-sm dz" onclick="draftRemoveTopic(${sel})">${ic("trash-2")}Remove topic</button>
            </div>
            <div class="sec-label" style="margin-bottom:12px">Files in this topic (${active.files.length}) — choose a type and upload</div>
            <div class="file-edit-grid">
              ${active.files.map(fileRow).join("")}
              <div class="upload-single">
                <div class="seg">${["Image","PDF","Video"].map(t => `<button class="seg-btn ${d.uploadType === t ? "on" : ""}" onclick="draftSetUploadType('${t}')">${t}</button>`).join("")}</div>
                <button class="up-plus" onclick="draftAddFile('${d.uploadType}')">${ic("plus")}</button>
                <div onclick="draftAddFile('${d.uploadType}')" style="cursor:pointer">
                  <strong>Upload ${d.uploadType}</strong><span>Drag &amp; drop or click</span>
                </div>
              </div>
            </div>`
          : `<div class="dropzone" style="padding:52px">${ic("folder-plus")}Add a topic on the left to start uploading files.</div>`}
        </div>
      </div>
      <div class="cc-sticky">
        <div><strong>Step 2 of 2</strong><span class="muted"> · ${d.topics.length} topic${d.topics.length !== 1 ? "s" : ""} · ${totalFiles} file${totalFiles !== 1 ? "s" : ""}</span></div>
        <div class="row"><button class="btn btn-ghost" onclick="draftToStep1()">${ic("arrow-left")}Details</button>
          <button class="btn btn-solid" ${d.topics.length ? "" : "disabled"} onclick="publishCourse()">${d.editingId ? "Save changes" : "Publish course"} ${ic("arrow-right")}</button></div>
      </div>
    </section>`);
};

/* ── RESOURCE LIBRARY ────────────────────────────────────────────────────── */
screens.library = (params) => {
  const sys = params && params.sys ? decodeURIComponent(params.sys) : "";
  if(sys && !isFilterOn("system", sys)) FILTERS = {system:[sys]};
  const rows = applyFilters(RES);
  return shell("#/library", null,
    pageHead({
      tone:"sys", photo:"assets/img/about-commons.jpg",
      crumbs:[{label:"Home",href:"#/home"},{label:"Resource Library"}],
      title:"Resource Library",
      sub:"Experienced users can bypass the guided journey. Search or filter to find a specific resource.",
      actions:`<div class="searchfield" style="min-width:min(560px,88vw)">
          ${ic("search")}
          <input placeholder="Search by topic, process, tool, tag or keyword…" onfocus="go('#/search')">
          <button class="btn btn-solid" onclick="go('#/search')">Search</button>
        </div>
        ${isAdmin() ? `<button class="btn btn-ghost btn-lg" onclick="openUploadDoc()">${ic("upload")}Upload Document</button>` : ""}`
    }) + `
    <section class="sec">
      <div class="with-side">
        ${filterSidebar()}
        <div>
          <div class="toolbar">
            <div class="count"><b>${rows.length}</b> of ${RES.length} resource${RES.length !== 1 ? "s" : ""}</div>
            <div class="row mid">${resourceViewToggle()}${sortSelect()}</div>
          </div>
          ${activeFilterChips()}
          ${renderResources(rows, "No resource matches the filters you have applied.")}
        </div>
      </div>
    </section>
  `);
};

/* ── SEARCH RESULTS ──────────────────────────────────────────────────────── */
screens.search = (params) => {
  const q = params.q ? decodeURIComponent(params.q) : "";
  /* the search runs over title, purpose and every tag on the resource */
  const matches = r => !q || (r.title + " " + r.purpose + " " + resTags(r).join(" ")).toLowerCase().includes(q.toLowerCase());
  const rows = applyFilters(RES.filter(matches));
  const totalForQuery = RES.filter(matches).length;
  return shell("#/library", null,
    pageHead({
      tone:"sys", photo:"assets/img/about-commons.jpg",
      crumbs:[{label:"Home",href:"#/home"},{label:"Resource Library",href:"#/library"},{label:"Search Results"}],
      title:q ? `Results for “${esc(q)}”` : "Search the repository",
      sub:`${rows.length} resource${rows.length !== 1 ? "s" : ""} found${filterActive() ? ` · ${filterCount()} filter${filterCount() === 1 ? "" : "s"} applied` : ""}.`,
      actions:`<div class="searchfield" style="min-width:min(560px,88vw)">
          ${ic("search")}
          <input id="results-search" placeholder="Search by topic, process, tool, tag or keyword…" value="${attr(q)}"
            onkeydown="if(event.key==='Enter'){go('#/search?q='+encodeURIComponent(this.value))}">
          <button class="btn btn-solid" onclick="go('#/search?q='+encodeURIComponent(document.getElementById('results-search').value))">Search</button>
        </div>`
    }) + `
    <section class="sec">
      <div class="with-side">
        ${filterSidebar()}
        <div>
          <div class="toolbar">
            <div class="count"><b>${rows.length}</b>${filterActive() ? ` of ${totalForQuery}` : ""} result${rows.length !== 1 ? "s" : ""}</div>
            <div class="row mid">${resourceViewToggle()}${sortSelect()}</div>
          </div>
          ${activeFilterChips()}
          ${renderResources(rows, q ? `Nothing matches “${esc(q)}” with these filters.` : "No resource matches the filters you have applied.")}
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
  if((seg[0] === "modular" || seg[0] === "system") && entityById(seg[1])){
    const s = entityById(seg[1]), t = topicId ? topicById(topicId) : null;
    const mid = t ? {label:t.name, href:`#/modular/${seg[1]}?topic=${topicId}`} : {label:"Resources", href:"#/system/" + seg[1]};
    return [home,{label:"Resource Systems",href:"#/resource-systems"},{label:s.name,href:"#/system/" + seg[1]},mid,here];
  }
  if(seg[0] === "search") return [home,{label:"Resource Library",href:"#/library"},{label:"Search Results",href:"#/search"},here];
  if(seg[0] === "my-learning") return [home,{label:"My Learning",href:"#/my-learning"},here];
  return [home,{label:"Resource Library",href:"#/library"},here];
}
/* Related resources, closest first:
   1. same resource system AND same Commoning stage
   2. same topic (the subject area the resource is filed under)
   3. same resource system
   4. same Commoning stage
   Anything still short is topped up with other resources, never duplicated. */
function relatedTo(r, n){
  const pool = RES.filter(x => x.id !== r.id);
  const sameStage  = x => r.stage && r.stage !== "" && x.stage === r.stage;
  const sameSystem = x => x.system === r.system;
  const tiers = [
    pool.filter(x => sameSystem(x) && sameStage(x)),
    pool.filter(x => topicOf(x) === topicOf(r)),
    pool.filter(sameSystem),
    pool.filter(sameStage),
    pool
  ];
  const out = [], seen = {};
  tiers.forEach(t => t.forEach(x => { if(out.length < n && !seen[x.id]){ seen[x.id] = 1; out.push(x); } }));
  return out;
}

screens.resource = (params) => {
  const r = resById(params.id) || RES[0];
  const idx = Math.max(0, RES.indexOf(r));
  const k = mediaKind(r.type);
  const relatedList = relatedTo(r, 3);
  /* contributor: the credited partner where there is one, otherwise the FES contributor */
  const whoName = r.attribution ? r.attribution : DOC_CONTRIBUTORS[idx % DOC_CONTRIBUTORS.length];
  const initials = r.attribution ? "PO" : whoName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const day = 24 - (idx % 20);
  const date = "2026-05-" + (day < 10 ? "0" + day : day);
  const prevLabel = k.k === "video" ? "Video preview" : k.k === "audio" ? "Audio preview" : "Document preview";
  const tags = [r.system, r.type, r.stage, r.lang, r.design].filter(x => x && x !== "" && x !== "All Stages");
  const row = (l, v) => `<div class="doc-row"><h5>${l}</h5><div class="doc-val">${v}</div></div>`;
  return shell(null, null,
    pageHead({
      crumbs:resourceCrumbs(r),
      title:r.title, sub:r.purpose,
      actions:`<button class="btn btn-solid btn-lg" onclick="download('${js(r.title)}')">${ic("download")}Download</button>
        ${isAdmin() ? `<button class="btn btn-ghost btn-lg" onclick="openUploadDoc('${r.id}')">${ic("pencil")}Edit</button>` : ""}
        ${isRegistered() ? `<button class="btn btn-ghost btn-lg" onclick="toast('Saved to My Learning')">${ic("bookmark")}Save</button>` : ""}`
    }) + `
    <section class="sec">
      <div class="doc-layout">
        <div class="panel doc-preview">
          <div class="between" style="margin-bottom:14px">
            <h3 style="margin:0">${prevLabel}</h3>
            <button class="btn btn-icon" title="Full screen" onclick="toast('Open full-screen viewer — placeholder')">${ic("maximize")}</button>
          </div>
          <div class="preview ${k.cls === "d" ? "green" : ""}" style="min-height:380px">
            <div class="pv">
              <div class="pv-play" onclick="toast('Opening resource viewer — placeholder')">${ic(k.icon)}</div>
              <div class="pv-t">${r.title}</div>
              <div class="pv-s">${r.type} · ${r.lang}</div>
            </div>
          </div>
        </div>

        <aside class="panel doc-meta">
          <h3 style="margin-bottom:14px">Resource details</h3>
          ${row("System / Theme", r.system)}
          ${row("Type", `<span class="tag blue">${r.type}</span>`)}
          ${r.stage && r.stage !== "" ? row("Commoning stage", r.stage) : ""}
          ${row("Intended user", r.stake)}
          ${row("Learning design", r.design)}
          ${row("Language", r.lang)}
          ${row("Version / date", `<code class="doc-ver">${r.version}</code>`)}
          <div class="doc-row stack"><h5>Contributor</h5>
            <div class="doc-uploader"><span class="doc-avatar">${initials}</span>
              <div><div class="du-n">${whoName}</div><div class="du-d">${date}</div></div></div>
          </div>
          <div class="doc-row last"><h5>Tags</h5>
            <div class="tags">${tags.map(x => `<span class="tag">${ic("tag")}${x}</span>`).join("")}</div></div>
        </aside>
      </div>
    </section>

    <section class="sec soft">
      <div class="sec-head"><div><h2 class="sec-title">Related resources</h2>
        <p class="sec-sub">Closest first: same resource system and stage, then the same topic, then the same stage.</p></div>
        <button class="btn btn-ghost" onclick="go('#/library')">Browse the library ${ic("arrow-right")}</button>
      </div>
      <div class="file-grid">${relatedList.map((x, i) => libraryFileCard(x, i)).join("")}</div>
      <div class="mt24"><button class="btn btn-ghost" onclick="goBack()">${ic("arrow-left")}Back</button></div>
    </section>
  `);
};

/* ── HELP ────────────────────────────────────────────────────────────────── */
screens.help = () => shell("#/help", null,
  pageHead({
    tone:"sys", photo:"assets/img/la-training.jpg", emblem:"life-buoy",
    crumbs:[{label:"Home",href:"#/home"},{label:"Help"}],
    title:"Help &amp; guidance",
    sub:"Guidance on using the repository, finding resources and understanding the Commoning approach.",
    actions:`<button class="btn btn-solid" onclick="openContact()">${ic("message-circle")}Contact &amp; support</button>
             <button class="btn btn-ghost" onclick="openTour()">Take a tour</button>`
  }) + `
  <section class="sec">
    <div class="grid g3">
      ${HELP.map(h => `<article class="card click flip" onclick="go('#/help/${h.id}')">
        <span class="c-ic">${ic(h.icon)}</span><div class="c-t">${h.title}</div><p class="c-d">${h.desc}</p>
        <div class="c-foot"><span class="arrow-link">Open ${ic("arrow-right")}</span></div>
      </article>`).join("")}
    </div>
  </section>
  <section class="sec soft">
    <div class="sec-head"><div><div class="sec-label">Quick answers</div><h2 class="sec-title">Frequently asked questions</h2></div>
      <button class="btn btn-ghost" onclick="go('#/help/faq')">All FAQs ${ic("arrow-right")}</button></div>
    <div class="qa">
      ${FAQS.slice(0, 3).map((f, i) => `<div class="qitem ${i === 0 ? "open" : ""}" id="faq-${i}">
        <div class="qq" onclick="toggleQA('faq-${i}')">${f[0]}<span class="qi">${ic("chevron-down")}</span></div>
        <div class="qa-body ${i === 0 ? "" : "hidden"}">${f[1]}</div></div>`).join("")}
    </div>
  </section>
`);

screens.helptopic = (params) => {
  const h = helpById(params.id) || HELP[0];
  const nextTopic = HELP[(HELP.indexOf(h) + 1) % HELP.length];
  let body = "";
  if(h.id === "faq"){
    body = `<div class="qa">${FAQS.map((f, i) => `<div class="qitem ${i === 0 ? "open" : ""}" id="fq-${i}">
      <div class="qq" onclick="toggleQA('fq-${i}')">${f[0]}<span class="qi">${ic("chevron-down")}</span></div>
      <div class="qa-body ${i === 0 ? "" : "hidden"}">${f[1]}</div></div>`).join("")}</div>`;
  } else if(h.id === "how-to-use"){
    body = `<div class="grid g2">
        <div class="panel"><h3>${ic("route")} Guided journey</h3>
          <p>Understand the idea → learn the approach → choose a resource system → follow the pathway → access the resources at each stage.</p>
          <div class="mt16"><button class="btn btn-solid btn-sm" onclick="go('#/commoning')">Start Learning ${ic("arrow-right")}</button></div></div>
        <div class="panel"><h3>${ic("search")} Direct access</h3>
          <p>Go to the Resource Library, search or filter by system, stage, stakeholder, format and language, then open what you need.</p>
          <div class="mt16"><button class="btn btn-solid btn-sm" onclick="go('#/library')">Resource Library ${ic("arrow-right")}</button></div></div>
      </div>`;
  } else if(h.id === "how-to-find"){
    body = `<div class="grid g3">
        <article class="card hover"><span class="c-ic">${ic("search")}</span><div class="c-t">1 · Search</div><p class="c-d">Search by topic, process, tool or keyword from anywhere.</p><div class="c-foot"><button class="btn btn-ghost btn-sm" onclick="openSearch()">Open search</button></div></article>
        <article class="card hover"><span class="c-ic">${ic("sliders-horizontal")}</span><div class="c-t">2 · Filter</div><p class="c-d">Filter by system, stage, stakeholder, learning design, type and language.</p><div class="c-foot"><button class="btn btn-ghost btn-sm" onclick="go('#/library')">Open library</button></div></article>
        <article class="card hover"><span class="c-ic">${ic("route")}</span><div class="c-t">3 · Browse by stage</div><p class="c-d">Open a resource system and pick a stage to see what supports it.</p><div class="c-foot"><button class="btn btn-ghost btn-sm" onclick="go('#/resource-systems')">Resource systems</button></div></article>
      </div>`;
  } else if(h.id === "commoning-stages"){
    body = `<p class="sec-sub">The Commoning process has six stages. The active stage is always highlighted, and each stage tells you what needs to happen.</p>
      ${pathway(null)}
      <div class="grid g2 mt24">${STAGES.map(s => `<div class="ctx click" onclick="go('#/stage/${s.id}')"><h5>${ic(s.icon)}${s.num} · ${s.name}</h5><p>${s.what}</p></div>`).join("")}</div>`;
  } else if(h.id === "modular-learning"){
    body = `<p class="sec-sub">Modular Learning breaks the Commoning process into progressive modules, with field activity between them.</p>
      <div class="flow">
        <div class="node">${ic("book-open")}Learning module</div><span class="arw">${ic("arrow-right")}</span>
        <div class="node">${ic("footprints")}Field activity</div><span class="arw">${ic("arrow-right")}</span>
        <div class="node">${ic("layers")}Next module</div><span class="arw">${ic("arrow-right")}</span>
        <div class="node strong">${ic("flag")}Outcome</div>
      </div>
      <div class="mt24"><button class="btn btn-solid btn-sm" onclick="go('#/la/modular')">See the Modular Training Design ${ic("arrow-right")}</button></div>`;
  } else if(h.id === "ldhf"){
    body = `<p class="sec-sub">Low Dose High Frequency delivers short, frequent, task-focused learning with mentoring between sessions.</p>
      <div class="flow">
        <div class="node green">${ic("zap")}Short learning</div><span class="arw">${ic("arrow-right")}</span>
        <div class="node green">${ic("footprints")}Field application</div><span class="arw">${ic("arrow-right")}</span>
        <div class="node green">${ic("message-circle")}Feedback</div><span class="arw">${ic("arrow-right")}</span>
        <div class="node strong">${ic("refresh-cw")}Repeat</div>
      </div>
      <div class="mt24"><button class="btn btn-solid btn-sm" onclick="go('#/la/ldhf')">See the LDHF approach ${ic("arrow-right")}</button></div>`;
  }
  return shell("#/help", null,
    pageHead({tone:"sys", photo:"assets/img/la-training.jpg", emblem:h.icon,
      crumbs:[{label:"Home",href:"#/home"},{label:"Help",href:"#/help"},{label:h.title}],
      title:h.title, sub:h.desc}) + `
    <section class="sec">${body}</section>
    <section class="sec soft">
      <div class="between">
        <button class="btn btn-ghost" onclick="go('#/help')">${ic("arrow-left")}All help topics</button>
        <div class="row">
          <button class="btn btn-ghost" onclick="openContact()">${ic("message-circle")}Contact &amp; support</button>
          <button class="btn btn-solid" onclick="go('#/help/${nextTopic.id}')">Next: ${nextTopic.title} ${ic("arrow-right")}</button>
        </div>
      </div>
    </section>`);
};

/* ── SIGN IN (three routes into the repository) ──────────────────────────── */
screens.login = () => header(null) + `
  <main><div class="authwrap">
    <div class="auth-form">
      <div class="auth-inner">
        <button class="btn btn-quiet" style="margin-bottom:18px" onclick="go('#/home')">${ic("arrow-left")}Back to the repository</button>
        <h2 class="auth-h">Sign in to Facilitating Commoning</h2>
        <p class="auth-sub">Choose how you want to enter. This is a prototype — no real account or password is required.</p>

        <div class="field"><label>${ic("mail")}Email address</label>
          <div class="inp"><span class="lead">${ic("mail")}</span><input type="email" placeholder="you@example.org"></div></div>
        <div class="field"><label>${ic("lock")}Password</label>
          <div class="inp"><span class="lead">${ic("lock")}</span><input type="password" placeholder="••••••••"><span class="tail" onclick="togglePwField(this)">${ic("eye")}</span></div></div>
        <button class="btn btn-quiet" style="margin-bottom:16px" onclick="toast('Password reset — placeholder')">Forgot password?</button>
        <button class="btn btn-solid btn-block" onclick="setRole('registered')">Sign In ${ic("arrow-right")}</button>
        <p class="auth-alt">New here? <a onclick="toast('Create an account — placeholder')">Create an account</a></p>

        <div class="divide">or continue as</div>
        <div class="rolepick">
          <button class="rolebtn" onclick="setRole('visitor')">
            <span class="rb-ic">${ic("eye")}</span>
            <span><span class="rb-n">Visitor — no account needed</span><span class="rb-d">Browse and read the entire repository. Downloading asks you to sign in.</span></span>
            <span class="rb-go">${ic("arrow-right")}</span></button>
          <button class="rolebtn" onclick="setRole('admin')">
            <span class="rb-ic">${ic("shield")}</span>
            <span><span class="rb-n">Platform Super Admin</span><span class="rb-d">Manage themes, topics, documents and courses.</span></span>
            <span class="rb-go">${ic("arrow-right")}</span></button>
        </div>
        <p class="auth-alt" style="font-size:12.5px;margin-top:22px">Each option simply switches the demo role. You can switch again from the header at any time.</p>
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
        <li>${ic("circle-check")}<span>${COURSES.length} structured courses with topics and files</span></li>
        <li>${ic("circle-check")}<span>Available in English and Hindi</span></li>
      </ul>
    </div>
  </div></main>`;
function togglePwField(el){
  const input = el.parentElement.querySelector("input");
  const show = input.type === "password";
  input.type = show ? "text" : "password";
  el.innerHTML = `<i data-lucide="${show ? "eye-off" : "eye"}"></i>`;
  if(window.lucide) lucide.createIcons();
}

/* ── MY LEARNING ─────────────────────────────────────────────────────────── */
screens["my-learning"] = () => {
  if(!isRegistered()) return gateScreen("My Learning", "Sign in as a Registered User to save resources and track your learning.");
  return shell(null, null,
    pageHead({crumbs:[{label:"Home",href:"#/home"},{label:"My Learning"}], eyebrow:roleLabel(), eyebrowIcon:"user",
      title:"My Learning", sub:"Your saved resources, progress and recommended next steps.",
      actions:`<button class="btn btn-solid" onclick="go('#/library')">Find more resources ${ic("arrow-right")}</button>`}) + `
    <section class="sec">
      <div class="grid g4">
        <div class="stat"><div class="st-top"><span class="st-l">In progress</span><span class="st-ic">${ic("book-open")}</span></div><div class="st-v">2</div><div class="st-d">courses started</div></div>
        <div class="stat"><div class="st-top"><span class="st-l">Saved</span><span class="st-ic">${ic("bookmark")}</span></div><div class="st-v">3</div><div class="st-d">resources bookmarked</div></div>
        <div class="stat"><div class="st-top"><span class="st-l">Downloads</span><span class="st-ic">${ic("download")}</span></div><div class="st-v">5</div><div class="st-d">files downloaded</div></div>
        <div class="stat"><div class="st-top"><span class="st-l">Stages covered</span><span class="st-ic">${ic("route")}</span></div><div class="st-v">2/6</div><div class="st-d">of the pathway</div></div>
      </div>
    </section>
    <section class="sec soft">
      <div class="sec-head"><div><h2 class="sec-title">Saved resources</h2><p class="sec-sub">Resources you bookmarked for later.</p></div></div>
      <div class="grid g3">${RES.slice(0, 3).map(resourceCard).join("")}</div>
    </section>
    <section class="sec">
      ${callout({icon:"arrow-right", title:"Recommended next", text:"Continue where you left off.",
        actions:`<button class="btn btn-solid" onclick="go('#/resource/cfr-claim')">Continue ${ic("arrow-right")}</button>`})}
    </section>`);
};

/* the wireframe retires the admin dashboard — admin actions live inline on each page */
screens.admin = () => screens.home();

function gateScreen(title, msg){
  return shell(null, null,
    pageHead({crumbs:[{label:"Home",href:"#/home"},{label:title}], eyebrow:"Restricted", eyebrowIcon:"lock",
      title:title, sub:"You do not have access to this area with your current role."}) + `
    <section class="sec">
      <div class="empty">
        <span class="e-ic">${ic("lock")}</span><h4>Sign in to continue</h4><p>${msg}</p>
        <div class="row" style="justify-content:center">
          <button class="btn btn-solid" onclick="go('#/login')">Sign In ${ic("arrow-right")}</button>
          <button class="btn btn-ghost" onclick="go('#/home')">Back to home</button>
        </div>
      </div>
    </section>`);
}

/* ============================================================================
   ADMIN ACTIONS — themes, topics, subtopics, files, documents, password
   ========================================================================== */
function openAddTheme(){
  if(!isAdmin()) return;
  openOverlay("form", `<button class="modal-x" onclick="closeOverlay('form')">${ic("x")}</button>
    <h3>Add a Theme</h3><p class="m-sub">Themes appear on Resource Systems &amp; Themes and follow the same page flow.</p>
    <div class="field mt16"><label>${ic("type")}Theme name <span class="req">*</span></label><div class="inp"><input id="th-name" placeholder="e.g. Climate Resilience"></div></div>
    <div class="field"><label>${ic("align-left")}Short description</label><div class="inp tall"><textarea id="th-desc" placeholder="What is this theme about?"></textarea></div></div>
    <div class="field"><label>${ic("users")}Intended users</label><div class="inp"><input id="th-users" placeholder="Who is it for?"></div></div>
    <div class="field"><label>${ic("target")}Expected outcome</label><div class="inp"><input id="th-out" placeholder="What should change?"></div></div>
    <div class="row mt16"><button class="btn btn-solid" onclick="adminAddTheme()">Add theme</button>
      <button class="btn btn-ghost" onclick="closeOverlay('form')">Cancel</button></div>`);
}
function adminAddTheme(){
  const v = id => (document.getElementById(id) || {}).value || "";
  const name = v("th-name").trim();
  if(!name){ toast("Please enter a theme name"); return; }
  const key = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 24) || ("theme" + Object.keys(THEMES).length);
  THEMES[key] = {id:key, name, icon:"sparkles", accent:"var(--sys-theme)",
    desc:v("th-desc").trim() || "Theme added by the platform admin.",
    users:v("th-users").trim() || "Facilitators and practitioners.",
    outcome:v("th-out").trim() || "Outcomes to be defined."};
  closeOverlay("form"); toast("Theme added — " + name); go("#/resource-systems");
}

function openChangePassword(){
  openOverlay("form", `<button class="modal-x" onclick="closeOverlay('form')">${ic("x")}</button>
    <h3>Change password</h3><p class="m-sub">Choose a new password for your account.</p>
    <div class="field mt16"><label>${ic("lock")}Current password</label><div class="inp"><input id="pw-old" type="password" placeholder="••••••••"><span class="tail" onclick="togglePwField(this)">${ic("eye")}</span></div></div>
    <div class="field"><label>${ic("lock-keyhole")}New password</label><div class="inp"><input id="pw-new" type="password" placeholder="At least 8 characters"><span class="tail" onclick="togglePwField(this)">${ic("eye")}</span></div></div>
    <div class="field"><label>${ic("check")}Confirm new password</label><div class="inp"><input id="pw-confirm" type="password" placeholder="Repeat the new password"><span class="tail" onclick="togglePwField(this)">${ic("eye")}</span></div></div>
    <div class="row mt16"><button class="btn btn-solid" onclick="submitChangePassword()">Update password</button>
      <button class="btn btn-ghost" onclick="closeOverlay('form')">Cancel</button></div>`);
}
function submitChangePassword(){
  const v = id => (document.getElementById(id) || {}).value || "";
  if(!v("pw-old")){ toast("Enter your current password"); return; }
  if(v("pw-new").length < 8){ toast("New password must be at least 8 characters"); return; }
  if(v("pw-new") !== v("pw-confirm")){ toast("New passwords do not match"); return; }
  closeOverlay("form"); toast("Password updated — placeholder");
}

let docTags = [];
function openUploadDoc(editId){
  if(!isAdmin()) return;
  const r = editId ? resById(editId) : null;
  docTags = r ? [r.system, r.type].filter(Boolean) : [];
  const sysOptions = ["Forests","Pastureland","Water"].concat(THEME_LIST().map(t => t.name)).concat(["All Systems"]);
  openOverlay("form", `<button class="modal-x" onclick="closeOverlay('form')">${ic("x")}</button>
    <h3>${r ? "Edit document" : "Upload document"}</h3>
    <p class="m-sub">Every resource follows the same metadata structure so the library stays easy to navigate.</p>
    <div class="field mt16"><label>${ic("type")}Title <span class="req">*</span></label><div class="inp"><input id="dc-title" value="${attr(r ? r.title : "")}" placeholder="Resource title"></div></div>
    <div class="field"><label>${ic("align-left")}One-line purpose</label><div class="inp"><input id="dc-purpose" value="${attr(r ? r.purpose : "")}" placeholder="What is it for?"></div></div>
    <div class="grid g2" style="gap:14px">
      <div class="field"><label>${ic("trees")}Resource system / Theme</label>
        <select id="dc-sys" class="sel" style="width:100%;height:52px">${sysOptions.map(o => `<option ${r && r.system === o ? "selected" : ""}>${o}</option>`).join("")}</select></div>
      <div class="field"><label>${ic("file-text")}Resource type</label>
        <select id="dc-type" class="sel" style="width:100%;height:52px">${["Course","Training Module","Atomised Course","Video","Audio","PDF","Handbook","Facilitators' Guide","SoP","Format","Tool"].map(o => `<option ${r && r.type === o ? "selected" : ""}>${o}</option>`).join("")}</select></div>
      <div class="field"><label>${ic("user")}Stakeholder</label>
        <select id="dc-stake" class="sel" style="width:100%;height:52px">${["Facilitator","Learner","Field Practitioner","Community Member","Farmer"].map(o => `<option ${r && r.stake === o ? "selected" : ""}>${o}</option>`).join("")}</select></div>
      <div class="field"><label>${ic("languages")}Language</label>
        <select id="dc-lang" class="sel" style="width:100%;height:52px">${["English","Hindi"].map(o => `<option ${r && r.lang === o ? "selected" : ""}>${o}</option>`).join("")}</select></div>
    </div>
    <div class="field"><label>${ic("tag")}Tags</label>
      <div class="tag-input"><div id="dc-tags" class="tag-chips">${renderDocTags()}</div>
        <input id="dc-tag-in" placeholder="Add a tag and press Enter" onkeydown="if(event.key==='Enter'){event.preventDefault();addDocTag(this.value);this.value='';}"></div></div>
    <div class="field"><label>${ic("upload")}File</label>
      <div class="dropzone" onclick="toast('Choose file — placeholder')">${ic("upload")}Drag &amp; drop a file, or click to browse</div></div>
    <div class="row mt16"><button class="btn btn-solid" onclick="adminUploadDoc('${editId || ""}')">${r ? "Save changes" : "Upload"}</button>
      <button class="btn btn-ghost" onclick="closeOverlay('form')">Cancel</button></div>`);
}
const renderDocTags = () => docTags.map((t, i) => `<span class="tag-chip">${esc(t)}<button onclick="removeDocTag(${i})">${ic("x")}</button></span>`).join("");
function addDocTag(v){
  v = (v || "").trim(); if(!v || docTags.includes(v)) return;
  docTags.push(v);
  const el = document.getElementById("dc-tags");
  if(el){ el.innerHTML = renderDocTags(); if(window.lucide) lucide.createIcons(); }
}
function removeDocTag(i){
  docTags.splice(i, 1);
  const el = document.getElementById("dc-tags");
  if(el){ el.innerHTML = renderDocTags(); if(window.lucide) lucide.createIcons(); }
}
function adminUploadDoc(editId){
  const v = id => (document.getElementById(id) || {}).value || "";
  const title = v("dc-title").trim();
  if(!title){ toast("Please enter a title"); return; }
  const rec = {title, purpose:v("dc-purpose").trim() || "Added by the platform admin.",
    system:v("dc-sys"), stage:"All Stages", stake:v("dc-stake"), design:"Both",
    type:v("dc-type"), group:"supporting", lang:v("dc-lang"), version:"v1.0 · 2026", attribution:""};
  if(editId && resById(editId)) Object.assign(resById(editId), rec);
  else RES.unshift(Object.assign({id:"doc-" + (RES.length + 1)}, rec));
  closeOverlay("form"); toast(editId ? "Document updated" : "Document uploaded"); go("#/library");
}

/* topics + subtopics + files */
function openAddTopic(sysId, group, editId){
  if(!isAdmin()) return;
  const t = editId ? topicById(editId) : null;
  openOverlay("form", `<button class="modal-x" onclick="closeOverlay('form')">${ic("x")}</button>
    <h3>${t ? "Edit topic" : "Add a topic"}</h3><p class="m-sub">Topics group the courses, modules and resources under a resource system.</p>
    <div class="field mt16"><label>${ic("type")}Topic name <span class="req">*</span></label><div class="inp"><input id="tp-name" value="${attr(t ? t.name : "")}" placeholder="e.g. Mapping &amp; Boundaries"></div></div>
    <div class="field"><label>${ic("align-left")}Short description</label><div class="inp tall"><textarea id="tp-desc" placeholder="What does this topic cover?">${esc(t ? t.desc : "")}</textarea></div></div>
    <div class="row mt16"><button class="btn btn-solid" onclick="adminAddTopic('${sysId}','${group || ""}','${editId || ""}')">${t ? "Save changes" : "Add topic"}</button>
      <button class="btn btn-ghost" onclick="closeOverlay('form')">Cancel</button></div>`);
}
function adminAddTopic(sysId, group, editId){
  const v = id => (document.getElementById(id) || {}).value || "";
  const name = v("tp-name").trim();
  if(!name){ toast("Please enter a topic name"); return; }
  const desc = v("tp-desc").trim() || "Added by the platform admin.";
  if(editId && topicById(editId)){ Object.assign(topicById(editId), {name, desc}); toast("Topic updated"); }
  else {
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 24) || ("topic" + TOPICS.length);
    TOPICS.push({id, name, desc, count:0, custom:true});
    toast("Topic added — " + name);
  }
  closeOverlay("form");
  go(`#/modular/${sysId}${group ? "?g=" + group : ""}`);
}
function adminDeleteTopic(id, sysId, group){
  if(!confirm("Delete this topic and its subtopics?")) return;
  const i = TOPICS.findIndex(t => t.id === id);
  if(i >= 0) TOPICS.splice(i, 1);
  delete SUBSTORE[id];
  toast("Topic deleted");
  go(`#/modular/${sysId}${group ? "?g=" + group : ""}`);
}
function adminAddSubtopic(topicId){
  const el = document.getElementById("ns-name");
  const name = (el ? el.value : "").trim();
  if(!name){ toast("Please enter a subtopic name"); return; }
  const topic = topicById(topicId);
  const groups = subtopicsFor(topic);
  if(!groups.length) groups.push({mod:(topic ? topic.name : "Topic") + " — Module 1", items:[]});
  const gi = groups.length - 1;
  groups[gi].items.push({code:_nextCode(groups, gi), name, files:[]});
  toast("Subtopic added — " + name);
  render();
}
function adminRemoveSubtopic(topicId, code){
  const groups = subtopicsFor(topicById(topicId));
  groups.forEach(g => { const i = g.items.findIndex(x => x.code === code); if(i >= 0) g.items.splice(i, 1); });
  toast("Subtopic removed");
  render();
}
function adminUploadFile(topicId, subCode){
  const v = id => (document.getElementById(id) || {}).value || "";
  const name = v("uf-name").trim();
  if(!name){ toast("Please enter a file name"); return; }
  const sub = allSubtopics(topicById(topicId)).find(x => x.code === subCode);
  if(sub) sub.files.push({name, type:v("uf-type") || "PDF"});
  toast("File uploaded — " + name);
  render();
}
function adminRemoveFile(topicId, subCode, idx){
  const sub = allSubtopics(topicById(topicId)).find(x => x.code === subCode);
  if(sub) sub.files.splice(idx, 1);
  toast("File removed");
  render();
}

/* ============================================================================
   OVERLAYS
   ========================================================================== */
function searchOverlayHTML(){
  const suggestions = ["Secure Tenure","Facilitator Guide","Forest rights","Restoration protocol","Water access","LDHF","Gram Sabha"];
  return `<button class="modal-x" onclick="closeOverlay('search')">${ic("x")}</button>
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
      <span class="chip" onclick="closeOverlay('search');go('#/library')">${ic("library")}Resource Library</span>
      <span class="chip" onclick="closeOverlay('search');go('#/courses')">${ic("graduation-cap")}Courses</span>
      <span class="chip" onclick="closeOverlay('search');go('#/resource-systems')">${ic("trees")}Resource Systems</span>
      <span class="chip" onclick="closeOverlay('search');go('#/help')">${ic("life-buoy")}Help</span>
    </div>`;
}
const contactModalHTML = () => `<button class="modal-x" onclick="closeOverlay('contact')">${ic("x")}</button>
    <h3>Contact &amp; support</h3><p class="m-sub">Reach the Karyashala team or a mentor for guided support.</p>
    <div class="stack mt16">
      <div class="ctx"><h5>${ic("hand-helping")}Guided mentoring</h5><p>Request a mentoring session for your current Commoning stage.</p></div>
      <div class="ctx"><h5>${ic("mail")}Email</h5><p>support@fes-karyashala.example</p></div>
      <div class="ctx"><h5>${ic("phone")}Phone</h5><p>+91 00000 00000 · Monday–Friday, 10am–5pm</p></div>
    </div>
    <div class="row mt24"><button class="btn btn-solid" onclick="toast('Mentoring request sent — placeholder');closeOverlay('contact')">${ic("hand-helping")}Request guided mentoring</button>
      <button class="btn btn-ghost" onclick="closeOverlay('contact')">Close</button></div>`;
const tourModalHTML = () => `<button class="modal-x" onclick="closeOverlay('tour')">${ic("x")}</button>
    <h3>Take a tour · get started</h3><p class="m-sub">Five steps to find your way around the repository.</p>
    <div class="stack mt16" style="gap:10px">
      ${JOURNEY5.map(s => `<div class="tourstep" onclick="closeOverlay('tour');go('${s.href}')">
        <span class="ts-n">${s.n}</span>
        <div><div class="ts-k">${s.k}</div><div class="ts-q">${s.q}</div><div class="ts-d">${s.d}</div></div>
      </div>`).join("")}
    </div>
    <div class="row mt24"><button class="btn btn-solid" onclick="closeOverlay('tour');go('#/commoning')">Start Learning ${ic("arrow-right")}</button>
      <button class="btn btn-ghost" onclick="closeOverlay('tour');go('#/resource-systems')">Choose a resource system</button></div>`;
const menuModalHTML = () => `<button class="modal-x" onclick="closeOverlay('menu')">${ic("x")}</button>
    <h3>Menu</h3><p class="m-sub">Navigate the repository.</p>
    <div class="stack mt16" style="gap:8px">
      ${NAV.concat([{id:"#/courses",label:"Courses"},{id:"#/about",label:"About"}]).map(n =>
        `<div class="tourstep" onclick="closeOverlay('menu');go('${n.id}')"><span class="ts-n">${ic("chevron-right")}</span><div><div class="ts-q">${n.label}</div></div></div>`).join("")}
    </div>`;

function openOverlay(id, html){
  const panel = document.getElementById(id + "-panel");
  if(!panel) return;
  panel.innerHTML = html;
  document.getElementById(id + "-overlay").classList.add("open");
  if(window.lucide) lucide.createIcons();
}
function closeOverlay(id){
  const ov = document.getElementById(id + "-overlay");
  if(ov) ov.classList.remove("open");
}
function openSearch(){ openOverlay("search", searchOverlayHTML()); setTimeout(() => { const i = document.getElementById("overlay-input"); if(i) i.focus(); }, 40); }
const openContact = () => openOverlay("contact", contactModalHTML());
const openTour    = () => openOverlay("tour", tourModalHTML());
const openMenu    = () => openOverlay("menu", menuModalHTML());
function runSearch(v){ closeOverlay("search"); go("#/search?q=" + encodeURIComponent(v || "")); }

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
  if(name === "file"){ params.id = parts[1]; params.t = parts[2]; params.f = parts[3]; html = screens.file(params); }
  else if(["system","curriculum","modular","theme","course","la","doc","stage","resource","story"].includes(name)){
    params.id = parts[1];
    html = (screens[name] || screens.home)(params);
  }
  else if(name === "help" && parts[1]){ params.id = parts[1]; html = screens.helptopic(params); }
  else if(screens[name]) html = screens[name](params);
  else html = screens.home(params);

  document.getElementById("app").innerHTML = html;
  window.scrollTo(0, 0);
  if(window.lucide) lucide.createIcons();
  observeReveals();
}
function go(hash){ if(location.hash === hash) render(); else location.hash = hash; }
window.addEventListener("hashchange", e => {
  if(e && e.oldURL && e.oldURL.includes("#")) prevRoute = e.oldURL.slice(e.oldURL.indexOf("#"));
  render();
});

/* themes route to the shared system page */
screens.theme = (params) => screens.system(params);
/* the wireframe keeps the atomized curriculum reachable through the topic browser */
screens.curriculum = (params) => {
  const s = entityById(params.id);
  return screens.modular({id:params.id, g:"atomized", topic:null});
};

let revealObserver;
function observeReveals(){
  if(!("IntersectionObserver" in window)){ document.querySelectorAll(".reveal").forEach(el => el.classList.add("in")); return; }
  if(revealObserver) revealObserver.disconnect();
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(en => { if(en.isIntersecting){ en.target.classList.add("in"); revealObserver.unobserve(en.target); } });
  }, {threshold:.06, rootMargin:"0px 0px -40px 0px"});
  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));
}

function toggleProfile(e){
  if(e) e.stopPropagation();
  const m = document.getElementById("profile-menu"); if(m) m.classList.toggle("open");
  const a = document.getElementById("apps-menu"); if(a) a.classList.remove("open");
}
function toggleApps(e){
  if(e) e.stopPropagation();
  const m = document.getElementById("apps-menu"); if(m) m.classList.toggle("open");
  const p = document.getElementById("profile-menu"); if(p) p.classList.remove("open");
}
function toggleQA(id){
  const item = document.getElementById(id); if(!item) return;
  item.classList.toggle("open");
  item.querySelector(".qa-body").classList.toggle("hidden");
}
function toggleReveal(id){ const el = document.getElementById(id); if(el) el.classList.toggle("hidden"); }

let toastTimer;
function toast(msg){
  const t = document.getElementById("toast");
  t.innerHTML = `<i data-lucide="circle-check"></i><span>${msg}</span>`;
  if(window.lucide) lucide.createIcons();
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2400);
}

["search","contact","tour","menu","form"].forEach(id => {
  const ov = document.getElementById(id + "-overlay");
  if(ov) ov.addEventListener("click", e => { if(e.target === ov) closeOverlay(id); });
});
document.addEventListener("keydown", e => {
  if(e.key === "Escape") ["search","contact","tour","menu","form"].forEach(closeOverlay);
  if((e.metaKey || e.ctrlKey) && e.key === "k"){ e.preventDefault(); openSearch(); }
});
document.addEventListener("click", e => {
  const p = document.getElementById("profile"), m = document.getElementById("profile-menu");
  if(m && m.classList.contains("open") && p && !p.contains(e.target)) m.classList.remove("open");
  const al = document.getElementById("app-launcher"), am = document.getElementById("apps-menu");
  if(am && am.classList.contains("open") && al && !al.contains(e.target)) am.classList.remove("open");
});

/* boot */
loadRole();
loadLibView();
if(!location.hash) location.hash = "#/home";
render();
