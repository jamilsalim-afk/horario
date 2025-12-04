--- index.html ---
```html
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Gerador de Horários - IFRO Campus Cacoal (Protótipo)</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="app-wrap">
    <aside class="sidebar">
      <div class="logo">IFRO — Horários</div>
      <nav>
        <a href="#" data-tab="inicio">Início</a>
        <a href="#" data-tab="instituicao">Instituição</a>
        <a href="#" data-tab="cadastro">Cadastro</a>
        <a href="#" data-tab="horario-base">Horário Base</a>
        <a href="#" data-tab="horario-semanal">Horário Semanal</a>
        <a href="#" data-tab="relatorios">Relatórios</a>
      </nav>
      <hr>
      <button class="btn btn-primary" id="save-all">Salvar Tudo (local)</button>
    </aside>

    <main class="main-content">
      <header class="header-institucional">
        <h1>INSTITUTO FEDERAL DE RONDÔNIA</h1>
        <h2>CAMPUS CACOAL</h2>
        <p>DEPARTAMENTO DE APOIO AO ENSINO</p>
        <p>COORDENAÇÃO DE DESENVOLVIMENTO DE FERRAMENTAS PEDAGÓGICAS</p>
      </header>

      <section class="card" id="tab-conteudo">
        <!-- Conteúdo das abas aparece aqui -->
      </section>

    </main>
  </div>

  <script src="app.js"></script>
</body>
</html>
```

--- style.css ---
```css
/* Conteúdo extraído do arquivo ifro-cores-e-layout.css (variáveis e regras base) */
:root{
  --if-amarelo-sol: #FFD000;
  --if-verde-amazonia: #007a3d; /* ajuste para melhor contraste */
  --if-azul-atlantico: #183EFF;
  --if-vermelho-urucum: #c91f37;
  --if-primario-escuro: #107039;
  --bg: #ffffff;
  --surface: #fbfbfb;
  --text: #111;
  --muted: #666;
  --sidebar-width: 300px;
  --gutter: 16px;
  --radius: 8px;
}
html,body{font-family: 'Open Sans', Arial, sans-serif;color:var(--text);background:var(--bg);margin:0;padding:0}
.app-wrap{display:flex;min-height:100vh}
.sidebar{width:var(--sidebar-width);background:var(--if-primario-escuro);color:#fff;padding:20px;box-sizing:border-box}
.sidebar .logo{font-weight:700;margin-bottom:18px}
.sidebar nav a{display:block;color:inherit;padding:10px;border-radius:6px;text-decoration:none;margin-bottom:6px}
.sidebar nav a:hover{background:rgba(255,255,255,0.06)}
.header-institucional{background:linear-gradient(90deg,var(--if-azul-atlantico) 0%, var(--if-amarelo-sol) 100%);color:#fff;padding:24px;border-radius:8px;margin-bottom:12px}
.main-content{flex:1;padding:var(--gutter)}
.card{background:var(--surface);padding:16px;border-radius:var(--radius);box-shadow:0 2px 6px rgba(0,0,0,0.04);margin-bottom:12px}
.btn{display:inline-block;padding:8px 12px;border-radius:6px;border:none;cursor:pointer;font-weight:600}
.btn-primary{background:var(--if-verde-amazonia);color:#fff}
.btn-danger{background:var(--if-vermelho-urucum);color:#fff}
.form-row{display:flex;gap:12px;flex-wrap:wrap}
.input,select,textarea{padding:8px;border-radius:6px;border:1px solid #ddd;min-width:220px}
.table{width:100%;border-collapse:collapse}
.table th{background:var(--if-azul-atlantico);color:#fff;padding:10px;text-align:left}
.table td{padding:8px;border-bottom:1px solid #eee}
.small{font-size:13px;color:var(--muted)}
fieldset{border:1px dashed #eee;padding:12px;border-radius:6px}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.timetable{display:grid;grid-template-columns:150px repeat(5,1fr);gap:4px}
.timetable .cell{min-height:56px;border:1px solid #eee;padding:6px;background:#fff}
.draggable{padding:6px;border-radius:6px;background:#f0f7f2;border:1px dashed #cfd}
.export-btns{display:flex;gap:8px}
@media (max-width:900px){.sidebar{display:none}.header-institucional{padding-left:20px}}
```

--- app.js ---
```javascript
// Protótipo funcional: abas, salvamento local, formulários, export simples (PDF via print e CSV)
const tabsHtml = {
  'inicio': `
    <h3>Bem-vindo</h3>
    <p>Use a barra lateral para navegar entre as abas. Este é um protótipo funcional; dados são salvos no armazenamento local do navegador.</p>
  `,
  'instituicao': `
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
  `,
  'cadastro': `
    <h3>Cadastro</h3>
    <div class="grid-2">
      <div>
        <fieldset>
          <legend>Professores</legend>
          <form id="form-professor">
            <div class="form-row"><label>Nome:</label><input class="input" name="nome"></div>
            <div class="form-row"><label>SIAPE/CPF:</label><input class="input" name="siape"></div>
            <div class="form-row"><label>Situação:</label>
              <select name="situacao" class="input">
                <option>DE</option><option>40</option><option>20</option><option>Substituto</option>
              </select>
            </div>
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
            <label>Matutino (ex.: 07:30-08:20, ...)</label>
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
  `,
  'horario-base': `
    <h3>Gerar Horário Base</h3>
    <p>Botão gera um horário base simples com alocação sequencial respeitando restrições básicas salvas no cadastro (protótipo).</p>
    <div class="export-btns">
      <button class="btn btn-primary" id="gerar-base">Gerar Horário Base</button>
      <button class="btn btn-outline" id="export-base-pdf">Exportar PDF</button>
    </div>
    <div id="preview-base" style="margin-top:12px"></div>
  `,
  'horario-semanal': `
    <h3>Horário Semanal</h3>
    <p>Escolha a semana (baseada no cadastro de dias letivos) e gere a cópia do horário base para ajustes manuais.</p>
    <div>
      <label>Semana (início):</label>
      <input type="date" id="semana-inicio" class="input">
      <div style="margin-top:8px"><button class="btn btn-primary" id="gerar-semanal">Gerar Horário Semanal</button></div>
    </div>
    <div id="preview-semanal" style="margin-top:12px"></div>
  `,
  'relatorios': `
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
  `
};

// inicialização
const container = document.getElementById('tab-conteudo');
function showTab(key){ container.innerHTML = tabsHtml[key] || '<p>Em construção</p>'; attachListenersForTab(key); }

document.querySelectorAll('.sidebar nav a').forEach(a=>{
  a.addEventListener('click',e=>{ e.preventDefault(); showTab(a.dataset.tab); history.replaceState({},'',`#${a.dataset.tab}`); });
});

// carregar aba inicial
const initial = location.hash.replace('#','') || 'inicio'; showTab(initial);

// salvamento local
function saveToLocal(key,obj){ localStorage.setItem('ifro:'+key,JSON.stringify(obj)); }
function loadFromLocal(key){ const v = localStorage.getItem('ifro:'+key); return v ? JSON.parse(v) : null; }

// listeners por aba
function attachListenersForTab(tab){
  if(tab==='instituicao'){
    const form = document.getElementById('form-instituicao');
    const listas = document.getElementById('listas-instituicao');
    const saved = loadFromLocal('instituicao');
    if(saved){ Object.keys(saved).forEach(k=>{ if(form[k]) form[k].value = saved[k]; }) }
    form?.addEventListener('submit',e=>{ e.preventDefault(); const fd = Object.fromEntries(new FormData(form).entries()); saveToLocal('instituicao',fd); alert('Informações da instituição salvas.'); });
    listas.innerHTML = `
      <p class="small">Cursos: (exemplo)</p>
      <ul class="small"><li>Integrado</li><li>Superior</li></ul>
      <p class="small">Turmas salvas: <span id="count-turmas">0</span></p>
    `;
    const turmas = loadFromLocal('turmas')||[]; document.getElementById('count-turmas').innerText = turmas.length;
  }

  if(tab==='cadastro'){
    // professores
    const formProf = document.getElementById('form-professor');
    const listaProf = document.getElementById('lista-professores');
    const renderProf = ()=>{
      const profs = loadFromLocal('professores')||[];
      listaProf.innerHTML = profs.map((p,idx)=>`<div>${p.nome||'(sem nome)'} — <button onclick="__editProf(${idx})">Editar</button> <button onclick="__delProf(${idx})">Remover</button></div>`).join('')||'<div class="small">Sem professores</div>';
      // preencher selects em relatórios
      const relSel = document.getElementById('rel-prof'); if(relSel){ relSel.innerHTML = '<option value="">-- selecione --</option>' + profs.map(p=>`<option>${p.nome}</option>`).join(''); }
    };
    window.__editProf = function(i){ const profs = loadFromLocal('professores')||[]; const p = profs[i]; if(!p) return alert('Não encontrado'); const name = prompt('Editar nome',p.nome); if(name!==null){ p.nome = name; saveToLocal('professores',profs); renderProf(); } }
    window.__delProf = function(i){ const profs = loadFromLocal('professores')||[]; if(confirm('Remover?')){ profs.splice(i,1); saveToLocal('professores',profs); renderProf(); } }
    formProf?.addEventListener('submit',e=>{ e.preventDefault(); const fd = Object.fromEntries(new FormData(formProf).entries()); const profs = loadFromLocal('professores')||[]; profs.push(fd); saveToLocal('professores',profs); formProf.reset(); renderProf(); });
    renderProf();

    // horas
    document.getElementById('salvar-horarios')?.addEventListener('click',e=>{ const m = document.getElementById('hora-matutino').value; const v = document.getElementById('hora-vespertino').value; const n = document.getElementById('hora-noturno').value; saveToLocal('horarios',{mat:m,ves:v,not:n}); alert('Horários salvos.'); });

    // turmas
    document.getElementById('add-turma')?.addEventListener('click',e=>{ const t = document.getElementById('nova-turma').value.trim(); if(!t) return alert('Preencha a turma'); const turmas = loadFromLocal('turmas')||[]; turmas.push(t); saveToLocal('turmas',turmas); document.getElementById('nova-turma').value=''; alert('Turma adicionada.'); });
  }

  if(tab==='horario-base'){
    document.getElementById('gerar-base')?.addEventListener('click',()=>{
      // algoritmo simples: pega turmas e disciplinas mínimas e aloca sequencialmente
      const turmas = loadFromLocal('turmas')||[]; const profs = loadFromLocal('professores')||[]; const horarios = loadFromLocal('horarios') || {mat:'',ves:'',not:''};
      const slots = (horarios.mat.split(',').concat(horarios.ves.split(','),horarios.not.split(','))).filter(Boolean).slice(0,30);
      const schedule = {};
      let sIdx=0;
      turmas.forEach((t,i)=>{
        const prof = profs[i % Math.max(1,profs.length)] || {nome:'Professor (não atribuído)'};
        const slot = slots[sIdx++ % slots.length];
        schedule[t] = schedule[t] || [];
        schedule[t].push({slot,prof:prof.nome});
      });
      saveToLocal('horario_base',schedule);
      document.getElementById('preview-base').innerText = JSON.stringify(schedule,null,2);
      alert('Horário base gerado (protótipo).');
    });
    document.getElementById('export-base-pdf')?.addEventListener('click',()=>{ window.print(); });
  }

  if(tab==='horario-semanal'){
    document.getElementById('gerar-semanal')?.addEventListener('click',()=>{
      const inicio = document.getElementById('semana-inicio').value; if(!inicio) return alert('Escolha a data de início');
      const base = loadFromLocal('horario_base')||{}; const semanal = {inicio,base};
      const lista = loadFromLocal('horarios_semanais')||[]; lista.push(semanal); saveToLocal('horarios_semanais',lista); document.getElementById('preview-semanal').innerText = JSON.stringify(semanal,null,2); alert('Horário semanal gerado e salvo.');
    });
  }

  if(tab==='relatorios'){
    document.getElementById('export-rel-ind')?.addEventListener('click',()=>{ window.print(); });
    document.getElementById('export-csv')?.addEventListener('click',()=>{
      const date = document.getElementById('csv-semana').value; if(!date) return alert('Escolha a semana');
      const semanal = loadFromLocal('horarios_semanais')||[]; if(semanal.length===0) return alert('Não há horários semanais salvos');
      // montar CSV minimal
      let csv = 'data,diadasemana,horario,turma,disciplina,professor
';
      semanal.forEach(s=>{ csv += `${s.inicio},SEMANA,00:00,Exemplo,Disciplina,Professor
`; });
      const blob = new Blob([csv],{type:'text/csv'}); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'export-semana.csv'; a.click(); URL.revokeObjectURL(url);
    });
  }
}

// salvar tudo
document.getElementById('save-all')?.addEventListener('click',()=>{ alert('Os dados estão sendo mantidos localmente no navegador (localStorage). Use exportações para baixar relatórios.'); });

// carregar inicialmente algumas listas (professores reais fornecidos)
(function preloadProfessores(){
  if(!loadFromLocal('professores')){
    const dados = [
      {siape:'1889267',nome:'Adriana Aparecida Rigolon',email:'adriana.rigolon@ifro.edu.br'},
      {siape:'1046329',nome:'Agmar Aparecido Felix Chaves',email:'agmar.chaves@ifro.edu.br'},
      {siape:'1041488',nome:'Aguinaldo Pereira',email:'aguinaldo.pereira@ifro.edu.br'},
      {siape:'3137523',nome:'Alberto Ayres Benicio',email:'alberto.benicio@ifro.edu.br'}
    ];
    saveToLocal('professores',dados);
  }
})();

// expor utilitário de debug
window.__showLocal = ()=>console.log(localStorage);
```
```
