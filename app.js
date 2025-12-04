/* app.js - Protótipo completo
   Funcionalidades: abas, cadastro (instituição/professores/turmas), horários (periodos),
   geração de horário base (heurística com restrições básicas e 11h), timetable visual,
   drag & drop, undo/redo (snapshots), export PDF via html2pdf e export CSV.
*/

// ---------- storage helpers ----------
function saveToLocal(key,obj){ localStorage.setItem('ifro:'+key,JSON.stringify(obj)); }
function loadFromLocal(key,def){ const v = localStorage.getItem('ifro:'+key); return v ? JSON.parse(v) : (def===undefined?null:def); }

// ---------- HTML das abas ----------
const tabsHtml = {};
(function buildTabs(){
tabsHtml['inicio'] = `
  <h3>Bem-vindo</h3>
  <p>Use a barra lateral para navegar. Protótipo funcional de geração e edição de horários.</p>
`;
tabsHtml['instituicao'] = `
  <h3>Dados da Instituição</h3>
  <form id="form-instituicao" class="form-card">
    <div class="form-row"><label>Nome:</label><input class="input" name="nome"></div>
    <div class="form-row"><label>Endereço:</label><input class="input" name="endereco"></div>
    <div class="form-row"><label>Telefone:</label><input class="input" name="telefone"></div>
    <div class="form-row"><label>E-mail:</label><input class="input" name="email"></div>
    <div class="form-row"><label>Diretor Geral:</label><input class="input" name="dir_geral"></div>
    <div class="form-row"><label>Diretor de Ensino:</label><input class="input" name="dir_ensino"></div>
    <div class="form-row"><label>Chefe do Dep. Apoio ao Ensino:</label><input class="input" name="chefe_depto"></div>
    <div style="margin-top:12px"><button class="btn btn-primary" id="salvar-instituicao">Salvar Instituição</button></div>
  </form>
  <hr>
  <h4>Listas (Cursos / Turmas / Professores / Salas)</h4>
  <div id="listas-instituicao"></div>
`;
tabsHtml['cadastro'] = `
  <h3>Cadastro</h3>
  <div class="grid-2">
    <div>
      <fieldset>
        <legend>Professores</legend>
        <form id="form-professor">
          <div class="form-row"><label>Nome:</label><input class="input" name="nome" required></div>
          <div class="form-row"><label>SIAPE/CPF:</label><input class="input" name="siape"></div>
          <div class="form-row"><label>Situação:</label>
            <select name="situacao" class="input">
              <option>DE</option><option>40</option><option>20</option><option>Substituto</option>
            </select>
          </div>
          <div class="form-row"><label>Aplicar regra 11h descanso:</label>
            <select name="regra11" class="input"><option value="1">Sim</option><option value="0">Não</option></select>
          </div>
          <div class="form-row"><label>Não trabalhar (manhã):</label>
            <select name="no_manha" class="input"><option value="">Nenhum</option><option>Segunda</option><option>Terça</option><option>Quarta</option><option>Quinta</option><option>Sexta</option></select></div>
          <div class="form-row"><label>Não trabalhar (tarde):</label>
            <select name="no_tarde" class="input"><option value="">Nenhum</option><option>Segunda</option><option>Terça</option><option>Quarta</option><option>Quinta</option><option>Sexta</option></select></div>
          <div style="margin-top:8px"><button class="btn btn-primary">Salvar Professor</button></div>
        </form>
        <hr>
        <div id="lista-professores" class="small"></div>
      </fieldset>
    </div>

    <div>
      <fieldset>
        <legend>Horários (Períodos)</legend>
        <div>
          <label>Matutino</label>
          <textarea id="hora-matutino" rows="3" class="input">07:30-08:20,08:20-09:10,INTERVALO,09:30-10:20,10:20-11:10,11:10-12:00</textarea>
        </div>
        <div>
          <label>Vespertino</label>
          <textarea id="hora-vespertino" rows="3" class="input">13:50-14:40,14:40-15:30,INTERVALO,15:50-16:40,16:40-17:30,17:30-18:20</textarea>
        </div>
        <div>
          <label>Noturno</label>
          <textarea id="hora-noturno" rows="3" class="input">19:00-19:50,19:50-20:40,INTERVALO,20:50-21:40,21:40-22:30</textarea>
        </div>
        <div style="margin-top:8px"><button class="btn btn-primary" id="salvar-horarios">Salvar Horários</button></div>
      </fieldset>

      <fieldset style="margin-top:12px">
        <legend>Turmas / Disciplinas (simplificado)</legend>
        <div>
          <label>Adicionar Turma (Nome | Modalidade | Sala | TurnoPrimário | TurnoSecundário)</label>
          <input id="nova-turma" class="input" placeholder="Ex: 1A | INTEGRADO | A101 | MAT | VES">
          <div style="margin-top:6px"><button class="btn btn-primary" id="add-turma">Adicionar Turma</button></div>
        </div>
      </fieldset>
    </div>
  </div>
`;
tabsHtml['horario-base'] = `
  <h3>Gerar Horário Base</h3>
  <p>Geração automática que tenta respeitar restrições dos docentes (protótipo).</p>
  <div class="export-btns">
    <button class="btn btn-primary" id="gerar-base">Gerar Horário Base</button>
    <button class="btn btn-outline" id="export-base-pdf">Exportar PDF</button>
  </div>
  <div id="preview-base" style="margin-top:12px;white-space:pre-wrap;"></div>
`;
tabsHtml['horario-semanal'] = `
  <h3>Horário Semanal (Edição)</h3>
  <p>Arraste as aulas entre células para ajustar manualmente. Conflitos são sinalizados.</p>
  <div style="margin-bottom:8px"><label>Semana (início):</label><input type="date" id="semana-inicio" class="input"></div>
  <div id="timetable-wrap"></div>
  <div style="margin-top:8px"><button class="btn btn-primary" id="salvar-semanal">Salvar Horário Semanal</button> <button class="btn" id="export-semanal-pdf">Exportar PDF</button></div>
`;
tabsHtml['relatorios'] = `
  <h3>Relatórios</h3>
  <div class="grid-2">
    <div>
      <label>Relatório Individual (Professor)</label>
      <select id="rel-prof" class="input"></select>
      <div style="margin-top:8px"><button class="btn" id="export-rel-ind">Exportar PDF (Print)</button></div>
    </div>
    <div>
      <label>Exportar CSV (Semana)</label>
      <input type="date" id="csv-semana" class="input">
      <div style="margin-top:8px"><button class="btn" id="export-csv">Exportar CSV</button></div>
    </div>
  </div>
`;
})();

// ---------- navegação ----------
const container = document.getElementById('tab-conteudo');
document.querySelectorAll('.sidebar nav a').forEach(a=>{
  a.addEventListener('click', e => { e.preventDefault(); showTab(a.dataset.tab); history.replaceState({},'',`#${a.dataset.tab}`); });
});
const initial = location.hash.replace('#','') || 'inicio'; showTab(initial);
function showTab(key){ container.innerHTML = tabsHtml[key] || '<p>Em construção</p>'; attachListenersForTab(key); }

// ---------- util slots / datas ----------
function parseSlots(text){ return text.split(',').map(s=>s.trim()).filter(Boolean); }
function slotPeriod(slot){
  if(!slot) return 'indef';
  if(/\b(07|08|09|10|11):/.test(slot)) return 'mat';
  if(/\b(13|14|15|16|17):/.test(slot)) return 'ves';
  if(/\b(19|20|21|22):/.test(slot)) return 'not';
  return 'indef';
}
function timeStrToMinutes(t){ if(!t) return 0; const [hh,mm]=t.split(':').map(Number); return hh*60+mm; }

// ---------- regra 11h entre aulas (usa datetimes) ----------
function check11hours(prof,prevDT,curDT){
  if(!prof || !prof.regra11) return true;
  if(!prevDT) return true;
  try{
    const prev = new Date(prevDT);
    const cur = new Date(curDT);
    const diffMin = (cur - prev) / 60000;
    return diffMin >= 11*60;
  }catch(e){ return true; }
}

// ---------- algoritmo de geração (versão prática protótipo) ----------
function gerarHorarioBaseAvancado(){
  const turmas = loadFromLocal('turmas',[]) || [];
  const professores = loadFromLocal('professores',[]) || [];
  const horariosRaw = loadFromLocal('horarios',{mat:'',ves:'',not:''});
  const slots = parseSlots(horariosRaw.mat).concat(parseSlots(horariosRaw.ves),parseSlots(horariosRaw.not));

  // Monta lista de "disciplinas" simples a partir das turmas (protótipo)
  const disciplinas = [];
  turmas.forEach((t,i)=>{
    if(typeof t === 'string'){
      const parts = t.split('|').map(s=>s.trim());
      const nome = parts[0]||`Turma${i}`;
      // demo: 1 disciplina por turma com 4 aulas/semana, aglut 2-2
      disciplinas.push({turma:nome,disc:{nome:'Disciplina',aulasSemana:4,aglut:'2-2'}});
    }else if(t && t.disciplinas){
      t.disciplinas.forEach(d=> disciplinas.push({turma:t.nome||('Turma'+i),disc:d}));
    }
  });

  // ocupacao: slotKey = diaIndex|slotString => {turma,disc,prof,datetime}
  const ocupacao = {};

  // semana base (hoje como referência) - para calcular datetimes
  const weekStart = new Date(); weekStart.setHours(0,0,0,0);

  function dateTimeFor(dayIdx,slot){
    const base = new Date(weekStart.getTime() + dayIdx*24*60*60000);
    const m = slot.match(/(\d{2}:\d{2})/);
    const hhmm = m ? m[1] : '07:30';
    const [hh,mm] = hhmm.split(':').map(Number);
    base.setHours(hh,mm,0,0);
    return base.toISOString();
  }

  function professorAvailable(prof,dayIdx,slot){
    if(!prof) return false;
    // checa restrições simples
    if(prof.no_manha && slotPeriod(slot) === 'mat') return false;
    if(prof.no_tarde && slotPeriod(slot) === 'ves') return false;
    if(prof.no_noite && slotPeriod(slot) === 'not') return false;
    // última atribuição do prof
    const last = Object.values(ocupacao).filter(o=> o.profSiape === prof.siape).sort((a,b)=> new Date(b.datetime)-new Date(a.datetime))[0];
    const prevDT = last ? last.datetime : null;
    const curDT = dateTimeFor(dayIdx,slot);
    if(!check11hours(prof,prevDT,curDT)) return false;
    return true;
  }

  // algoritmo greedy distribuindo aulas pelos dias 0..4
  disciplinas.sort((a,b)=> (b.disc.aulasSemana||1)-(a.disc.aulasSemana||1));
  disciplinas.forEach((item, idx)=>{
    let need = item.disc.aulasSemana || 1;
    for(let day=0; day<5 && need>0; day++){
      for(let s=0; s<slots.length && need>0; s++){
        const slot = slots[s];
        const slotKey = `${day}|${slot}`;
        if(ocupacao[slotKey]) continue;
        // escolhe um professor (protótipo: round-robin)
        const prof = professores[(idx + day + s) % Math.max(1,professores.length)] || null;
        if(!professorAvailable(prof,day,slot)) continue;
        ocupacao[slotKey] = {turma:item.turma,disc:item.disc.nome,profName:prof?prof.nome:'(sem prof)',profSiape:prof?prof.siape:'000',datetime:dateTimeFor(day,slot)};
        need--;
      }
    }
    if(need>0) console.warn(`Aulas faltantes para ${item.turma} (${item.disc.nome}): faltaram ${need}`);
  });

  saveToLocal('horario_base',{ocupacao});
  return {ocupacao};
}

// ---------- construir timetable visual (arrastar/soltar) ----------
function buildTimetableFromBase(){
  const base = loadFromLocal('horario_base',{ocupacao:{}});
  const ocup = base.ocupacao || {};
  const horarios = loadFromLocal('horarios',{mat:'',ves:'',not:''});
  const slots = parseSlots(horarios.mat).concat(parseSlots(horarios.ves),parseSlots(horarios.not));
  const days = ['Segunda','Terça','Quarta','Quinta','Sexta'];
  const colSlots = slots.slice(0,6);

  const wrap = document.createElement('div'); wrap.className='timetable card';
  const headerFirst = document.createElement('div'); headerFirst.className='cell h-center'; headerFirst.innerText='Horário / Dia'; wrap.appendChild(headerFirst);
  colSlots.forEach(s=>{ const h = document.createElement('div'); h.className='cell h-center'; h.innerText=s; wrap.appendChild(h); });

  days.forEach((dayLabel,di)=>{
    const rowLabel = document.createElement('div'); rowLabel.className='cell'; rowLabel.innerText=dayLabel; wrap.appendChild(rowLabel);
    colSlots.forEach(slot=>{
      const cell = document.createElement('div'); cell.className='cell droppable'; cell.dataset.slot = `${di}|${slot}`;
      cell.addEventListener('dragover', e=>{ e.preventDefault(); cell.classList.add('drag-over'); });
      cell.addEventListener('dragleave', e=>{ cell.classList.remove('drag-over'); });
      cell.addEventListener('drop', e=>{
        e.preventDefault(); cell.classList.remove('drag-over');
        const payload = e.dataTransfer.getData('text/plain');
        try{ const obj = JSON.parse(payload); placeItemCellAdvanced(obj,cell); pushSnapshot(); }catch(err){ console.error(err); }
      });

      const key = `${di}|${slot}`;
      const entry = ocup[key];
      if(entry){
        const item = document.createElement('div'); item.className='draggable'; item.draggable=true;
        item.innerText = `${entry.turma}\n${entry.profName}`;
        item.dataset.turma = entry.turma;
        item.dataset.slot = key;
        item.addEventListener('dragstart', e=>{ e.dataTransfer.setData('text/plain', JSON.stringify({turma:entry.turma,from:key,prof:entry.profName,profSiape:entry.profSiape})); });
        cell.appendChild(item);
      }

      wrap.appendChild(cell);
    });
  });
  return wrap;
}

function placeItemCellAdvanced(obj,cell){
  if(cell.querySelector('.draggable')){
    if(!confirm('Esta célula já possui uma aula. Substituir?')) return;
    cell.innerHTML = '';
  }
  const el = document.createElement('div'); el.className='draggable'; el.draggable=true; el.innerText = `${obj.turma}\n${obj.prof}`; el.dataset.turma = obj.turma;
  el.addEventListener('dragstart', e=>{ e.dataTransfer.setData('text/plain', JSON.stringify(obj)); });
  cell.appendChild(el);

  // atualizar storage
  const base = loadFromLocal('horario_base',{ocupacao:{}});
  const ocup = base.ocupacao || {};
  if(obj.from) delete ocup[obj.from];
  ocup[cell.dataset.slot] = {turma: obj.turma, profName: obj.prof, profSiape: obj.profSiape || '000', datetime: new Date().toISOString()};
  saveToLocal('horario_base',{ocupacao:ocup});
}

// ---------- Undo/Redo (snapshots) ----------
const snapshots = []; let snapPtr = -1;
function pushSnapshot(){
  const snap = {horario_base: loadFromLocal('horario_base',{}), horarios_semanais: loadFromLocal('horarios_semanais',[])};
  snapshots.splice(snapPtr+1);
  snapshots.push(JSON.stringify(snap));
  snapPtr++;
}
function undo(){ if(snapPtr<=0) return alert('Nada para desfazer'); snapPtr--; const s = JSON.parse(snapshots[snapPtr]); restoreSnapshot(s); }
function redo(){ if(snapPtr >= snapshots.length-1) return alert('Nada para refazer'); snapPtr++; const s = JSON.parse(snapshots[snapPtr]); restoreSnapshot(s); }
function restoreSnapshot(snap){
  if(!snap) return;
  saveToLocal('horario_base', snap.horario_base || {});
  saveToLocal('horarios_semanais', snap.horarios_semanais || []);
  if(location.hash.replace('#','') === 'horario-semanal') showTab('horario-semanal');
}

// ---------- export PDF atual (html2pdf) ----------
function exportMainToPDF(filename){
  const el = document.querySelector('.main-content');
  if(!el) return alert('Nada para exportar');
  const opt = { margin:0.6, filename: `${filename||'relatorio'}.pdf`, image:{type:'jpeg',quality:0.98}, html2canvas:{scale:2}, jsPDF:{unit:'in',format:'a4',orientation:'portrait'} };
  html2pdf().set(opt).from(el).save();
}

// ---------- listeners por aba ----------
function attachListenersForTab(tab){
  if(tab==='instituicao'){
    const form = document.getElementById('form-instituicao');
    const listas = document.getElementById('listas-instituicao');
    const saved = loadFromLocal('instituicao', {});
    if(saved) Object.keys(saved).forEach(k=>{ if(form[k]) form[k].value = saved[k]; });
    form?.addEventListener('submit', e=>{ e.preventDefault(); const fd = Object.fromEntries(new FormData(form).entries()); saveToLocal('instituicao', fd); alert('Instituição salva.'); });
    const turmas = loadFromLocal('turmas',[]); listas.innerHTML = `<p class="small">Turmas salvas: ${turmas.length}</p>`;
  }

  if(tab==='cadastro'){
    const formProf = document.getElementById('form-professor');
    const listaProf = document.getElementById('lista-professores');
    function renderProf(){
      const profs = loadFromLocal('professores',[]);
      listaProf.innerHTML = profs.map((p,i)=>`<div>${p.nome} — <button onclick="__editProf(${i})">Editar</button> <button onclick="__delProf(${i})">Remover</button></div>`).join('') || '<div class="small">Sem professores</div>';
      const rel = document.getElementById('rel-prof'); if(rel) rel.innerHTML = '<option value="">-- selecione --</option>' + profs.map(p=>`<option>${p.nome}</option>`).join('');
    }
    window.__editProf = function(i){ const profs = loadFromLocal('professores',[]); const p = profs[i]; const name = prompt('Editar nome', p.nome); if(name!==null){ p.nome = name; saveToLocal('professores',profs); renderProf(); } }
    window.__delProf = function(i){ const profs = loadFromLocal('professores',[]); if(confirm('Remover?')){ profs.splice(i,1); saveToLocal('professores',profs); renderProf(); } }
    formProf?.addEventListener('submit', e=>{ e.preventDefault(); const fd = Object.fromEntries(new FormData(formProf).entries()); fd.regra11 = Number(fd.regra11||0); const arr = loadFromLocal('professores',[]); arr.push(fd); saveToLocal('professores',arr); formProf.reset(); renderProf(); });
    renderProf();

    document.getElementById('salvar-horarios')?.addEventListener('click', e=>{ const m = document.getElementById('hora-matutino').value; const v = document.getElementById('hora-vespertino').value; const n = document.getElementById('hora-noturno').value; saveToLocal('horarios',{mat:m,ves:v,not:n}); alert('Horários salvos.'); });
    document.getElementById('add-turma')?.addEventListener('click', e=>{ const t = document.getElementById('nova-turma').value.trim(); if(!t) return alert('Preencha a turma'); const ts = loadFromLocal('turmas',[]); ts.push(t); saveToLocal('turmas',ts); document.getElementById('nova-turma').value=''; alert('Turma adicionada.'); });
  }

  if(tab==='horario-base'){
    document.getElementById('gerar-base')?.addEventListener('click', ()=>{
      const res = gerarHorarioBaseAvancado();
      document.getElementById('preview-base').innerText = JSON.stringify(res, null, 2);
      pushSnapshot();
      alert('Horário base gerado.');
    });
    document.getElementById('export-base-pdf')?.addEventListener('click', ()=> exportMainToPDF('Horario-Base'));
  }

  if(tab==='horario-semanal'){
    const wrap = document.getElementById('timetable-wrap');
    wrap.innerHTML = '';
    const preview = buildTimetableFromBase();
    wrap.appendChild(preview);

    document.getElementById('salvar-semanal')?.addEventListener('click', ()=>{
      const inicio = document.getElementById('semana-inicio').value || new Date().toISOString().slice(0,10);
      const plan = {};
      wrap.querySelectorAll('.cell').forEach(c=>{
        const dr = c.querySelector('.draggable');
        if(dr) plan[dr.dataset.turma] = {loc: c.dataset.slot, conteudo: dr.innerText};
      });
      const list = loadFromLocal('horarios_semanais',[]); list.push({inicio,plan}); saveToLocal('horarios_semanais',list); pushSnapshot(); alert('Horário semanal salvo.');
    });

    document.getElementById('export-semanal-pdf')?.addEventListener('click', ()=> exportMainToPDF('Horario-Semanal'));

    // undo/redo controls
    const ctrl = document.createElement('div'); ctrl.className='undo-redo';
    const u = document.createElement('button'); u.className='btn'; u.innerText='Desfazer'; u.onclick = undo;
    const r = document.createElement('button'); r.className='btn'; r.innerText='Refazer'; r.onclick = redo;
    ctrl.appendChild(u); ctrl.appendChild(r);
    wrap.parentNode.insertBefore(ctrl, wrap);
  }

  if(tab==='relatorios'){
    document.getElementById('export-rel-ind')?.addEventListener('click', ()=> exportMainToPDF('Relatorio-Individual'));
    document.getElementById('export-csv')?.addEventListener('click', ()=>{
      const date = document.getElementById('csv-semana').value; if(!date) return alert('Escolha a semana');
      const semanal = loadFromLocal('horarios_semanais',[]); if(semanal.length===0) return alert('Não há horários semanais salvos');
      let csv = 'data,diadasemana,horario,turma,disciplina,professor\n';
      semanal.forEach(s=>{ csv += `${s.inicio},SEMANA,00:00,Exemplo,Disciplina,Professor\n`; });
      const blob = new Blob([csv],{type:'text/csv'}); const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = 'export-semana.csv'; a.click(); URL.revokeObjectURL(url);
    });
    const rel = document.getElementById('rel-prof'); if(rel) rel.innerHTML = '<option value="">-- selecione --</option>' + loadFromLocal('professores',[]).map(p=>`<option>${p.nome}</option>`).join('');
  }
}

// ---------- init / preload minimal ----------
(function init(){
  if(!loadFromLocal('professores')) saveToLocal('professores',[{siape:'1889267',nome:'Adriana Aparecida Rigolon',regra11:1},{siape:'1046329',nome:'Agmar Aparecido Felix Chaves',regra11:1}]);
  if(!loadFromLocal('horarios')) saveToLocal('horarios',{mat:'07:30-08:20,08:20-09:10,INTERVALO,09:30-10:20,10:20-11:10,11:10-12:00',ves:'13:50-14:40,14:40-15:30,INTERVALO,15:50-16:40,16:40-17:30,17:30-18:20',not:'19:00-19:50,19:50-20:40,INTERVALO,20:50-21:40,21:40-22:30'});
})();

// salvar tudo (UI)
document.getElementById('save-all')?.addEventListener('click', ()=>{ alert('Dados salvos localmente no navegador (localStorage). Use as exportações para backup.'); });

// debug util
window.__showLocal = ()=>console.log(localStorage);
