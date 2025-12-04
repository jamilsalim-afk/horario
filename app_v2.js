/* Protótipo v2: algoritmo aprimorado, 11h entre dias com datas, aglutinação simples, undo/redo reativo e PDFs via html2pdf.
function timeStrToMinutes(t){ const [hh,mm]=t.split(':').map(Number); return hh*60+mm; }


// ---------- Regra das 11 horas (robusta com datas) ----------
// recebe: prof (obj), prevDateTime (ISO string or null), currDateTime (ISO string)
function check11hours(prof,prevDateTime,currDateTime){ if(!prof.regra11) return true; if(!prevDateTime) return true; try{ const prev = new Date(prevDateTime); const curr = new Date(currDateTime); const diffMin = (curr - prev)/60000; return diffMin >= 11*60; }catch(e){ return true; } }


// ---------- Algoritmo de alocação melhorado (aglutinação e aulas semanais) ----------
function gerarHorarioBaseAvancado(){
const turmas = loadFromLocal('turmas',[]) || [];
const professores = loadFromLocal('professores',[]) || [];
const horarios = loadFromLocal('horarios',{mat:'',ves:'',not:''});
const slots = parseSlots(horarios.mat).concat(parseSlots(horarios.ves),parseSlots(horarios.not));


// construir disciplinas simuladas por turma (quando não houver estrutura completa)
const disciplinas = [];
turmas.forEach((t,i)=>{
let obj = typeof t === 'string' ? (function(){ const p=t.split('|').map(s=>s.trim()); return {nome:p[0]||`Turma${i}`,modalidade:p[1]||'INTEGRADO',sala:p[2]||'',turnoPrim:p[3]||'',turnoSec:p[4]||'',disciplinas:[{nome:'Disciplina',aulasSemana:4,aglut:'2-2'}]}; })() : t;
obj.disciplinas.forEach(d=> disciplinas.push({turma:obj.nome,disc:d}));
});


// ordenar por aulas semanais decrescente
disciplinas.sort((a,b)=> (b.disc.aulasSemana||1)-(a.disc.aulasSemana||1));


const ocupacao = {}; // chave slot|dia -> {turma,disc,prof,datetime}
// simples: atribuiremos slots em dias sequenciais a partir de uma semana base (hoje)
const weekStart = new Date(); weekStart.setHours(0,0,0,0);


// helper para getDateTimeForSlot(dayIndex,slotString)
function dateTimeFor(dayIndex,slot){ // dayIndex 0..4
const start = new Date(weekStart.getTime() + dayIndex*24*60*60000);
const hhmm = slot.match(/(\d{2}:\d{2})/); const t = hhmm ? hhmm[1] : '07:30'; const [hh,mm] = t.split(':').map(Number); start.setHours(hh,mm,0,0); return start.toISOString();
}


function professorAvailable(prof,dayIndex,slot){ // check basic restrictions and 11h relative to prof last assignment
if(!respectsTimeRestrictions(prof,slot)) return false;
// find last assignment datetime
const last = Object.values(ocupacao).filter(o=> o.profSiape === prof.siape).sort((a,b)=> new Date(b.datetime)-new Date(a.datetime))[0];
const prevDT = last ? last.datetime : null;
const currDT = dateTimeFor(dayIndex,slot);
return check11hours(prof,prevDT,currDT);
}


function respectsTimeRestrictions(prof,slot){ const p = slotPeriod(slot); if(prof.no_manha && p==='mat') return false; if(prof.no_tarde && p==='ves') return false; if(prof.no_noite && p==='not') return false; return true; }


// allocate each discipline's required number of lessons across week days
for(const item of disciplinas){ const needed = item.disc.aulasSemana || 1; let placed = 0; for(let day=0; day<5 && placed<needed; day++){ for(let s=0; s<slots.length && placed<needed; s++){ const slot = slots[s]; const slotKey = `${day}|${slot}`; if(ocupacao[slotKey]) continue; // occupied
// choose a professor round-robin for now
const prof = professores[(placed + Math.abs(hashCode(item.turma)) ) % Math.max(1,professores.length)] || {siape:'0000',nome:'(sem prof)'};
if(!professorAvailable(prof,day,slot)) continue;
ocupacao[slotKey] = {turma:item.turma,disc:item.disc.nome,profName:prof.nome,profSiape:prof.siape,datetime:dateTimeFor(day,slot)}; placed++; break; }
}
if(placed < needed){ console.warn(`Não conseguiu alocar todas as ${needed} aulas para ${item.turma} - ${item.disc.nome}`); }
}


saveToLocal('horario_base',{ocupacao});
return {ocupacao};
}


function hashCode(str){ let h=0; for(let i=0;i<str.length;i++) h = ((h<<5)-h)+str.charCodeAt(i); return Math.abs(h); }


// ---------- Undo/Redo com snapshots completos ----------
const historyStack = []; let historyPtr = -1;
function pushSnapshot(){ const snap = {horario_base: loadFromLocal('horario_base',{}),horarios_semanais: loadFromLocal('horarios_semanais',[])}; historyStack.splice(historyPtr+1); historyStack.push(JSON.stringify(snap)); historyPtr++; }
function canUndo(){ return historyPtr>0; }
function undo(){ if(!canUndo()) return alert('Nada para desfazer'); historyPtr--; const snap = JSON.parse(historyStack[historyPtr]); restoreSnapshot(snap); }
function redo(){ if(historyPtr >= historyStack.length-1) return alert('Nada para refazer'); historyPtr++; const snap = JSON.parse(historyStack[historyPtr]); restoreSnapshot(snap); }
function restoreSnapshot(snap){ if(!snap) return; saveToLocal('horario_base',snap.horario_base); saveToLocal('horarios_semanais',snap.horarios_semanais||[]); // re-render current tab
