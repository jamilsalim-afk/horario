// ======================================================================
// --- 1. VARIÁVEIS GLOBAIS E FUNÇÕES AUXILIARES (SIMPLES) ---
// ======================================================================

const LS_KEYS = {
    professor: 'SCHEDULER_PROFESSOR',
    horario: 'SCHEDULER_HORARIO',
    turma: 'SCHEDULER_TURMA',
    disciplina: 'SCHEDULER_DISCIPLINA',
    calendario_integrado: 'SCHEDULER_CAL_INT',
    calendario_superior: 'SCHEDULER_CAL_SUP'
};

// Dados de Exemplo (para inicializar se o Local Storage estiver vazio)
const PROFESSORES_INICIAIS_DATA = []; 
const HORARIOS_INICIES = { 
    matutino: ['07:30-08:20', '08:20-09:10', '09:10-10:00', 'INTERVALO', '10:20-11:10', '11:10-12:00'], 
    vespertino: ['13:30-14:20', '14:20-15:10', 'INTERVALO', '15:30-16:20', '16:20-17:10'], 
    noturno: ['18:30-19:20', '19:20-20:10', 'INTERVALO', '20:30-21:20', '21:20-22:10'] 
};

/**
 * Obtém dados do Local Storage, inicializando se estiver vazio.
 * @param {string} key Chave lógica dos dados (ex: 'professor', 'horario').
 */
function obterDados(key) {
    const lsKey = LS_KEYS[key];
    let dados = JSON.parse(localStorage.getItem(lsKey));
    
    if (!dados) {
        if (key === 'calendario_integrado' || key === 'calendario_superior') {
            dados = {};
        } else if (key === 'professor') {
            dados = JSON.parse(JSON.stringify(PROFESSORES_INICIAIS_DATA));
        } else if (key === 'horario') {
            dados = JSON.parse(JSON.stringify(HORARIOS_INICIES));
        } else {
            dados = [];
        }
        // Não salva o padrão, apenas retorna para ser usado
    }
    return dados;
}

/**
 * Salva dados no Local Storage.
 * @param {string} key Chave lógica dos dados.
 * @param {Object|Array} dados Os dados a serem salvos.
 */
function salvarDados(key, dados) {
    const lsKey = LS_KEYS[key];
    localStorage.setItem(lsKey, JSON.stringify(dados));
}
// ======================================================================
// --- 2. LÓGICA DE CADASTRO DE CALENDÁRIOS (INTERATIVO CÍCLICO) ---
// ======================================================================

const NOMES_MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                     'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
// D, S, T, Q, Q, S, S (Domingo = 0)
const DIAS_CURTOS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']; 

/**
 * Sequência de status ao clicar:
 * LETV -> NAO_LETV -> FERIADO -> RECUPERACAO -> EXAME -> LETV
 */
const CICLO_STATUS = [
    'LETV',      // 0: Dia Letivo Normal (Padrão)
    'NAO_LETV',  // 1: Não Letivo
    'FERIADO',   // 2: Feriado
    'RECUPERACAO', // 3: Recuperação
    'EXAME'      // 4: Exame
];

// Mapeamento de classes/rótulos para melhor visualização (se necessário para o CSS/interface)
const RÓTULOS_STATUS = {
    'LETV': 'Letivo',
    'NAO_LETV': 'Não Letivo',
    'FERIADO': 'Feriado',
    'RECUPERACAO': 'Recuperação',
    'EXAME': 'Exame'
};

/**
 * Renderiza o calendário de 12 meses interativo para o tipo ('integrado' ou 'superior').
 * Cada dia permite seleção cíclica dos tipos de dia.
 * @param {string} tipo 'integrado' ou 'superior'.
 */
function renderizarCalendario(tipo) {
    const key = `calendario_${tipo}`;
    // Assume que existe um campo de input com o ID `cal_${tipo}_ano`
    const ano = document.getElementById(`cal_${tipo}_ano`).value; 
    // Assume que existe um container com o ID `grade-calendario-${tipo}-visual`
    const containerVisual = document.getElementById(`grade-calendario-${tipo}-visual`);
    
    // Supondo que 'obterDados' seja uma função externa para carregar o estado salvo.
    const dadosCalendario = obterDados(key) || {}; 
    
    // Limpa o conteúdo anterior
    containerVisual.innerHTML = '';
    
    // Adiciona uma classe para garantir que os 12 meses sejam exibidos em um grid (necessita de CSS)
    containerVisual.classList.add('calendario-anual-container'); 

    for (let mes = 0; mes < 12; mes++) {
        const primeiroDia = new Date(ano, mes, 1);
        // O dia 0 do mês seguinte é o último dia do mês atual
        const ultimoDia = new Date(ano, mes + 1, 0).getDate(); 
        // 0 (Domingo) a 6 (Sábado)
        let diaSemanaInicial = primeiroDia.getDay(); 

        let htmlMes = `<div class="mes-calendario">
            <h5>${NOMES_MESES[mes]} ${ano}</h5>
            <div class="dias-semana">
                ${DIAS_CURTOS.map(d => `<span class="dia-semana-titulo">${d}</span>`).join('')}
            </div>
            <div class="grade-dias-mes">`;

        // Insere células vazias para alinhar o primeiro dia (preenchimento inicial)
        for (let i = 0; i < diaSemanaInicial; i++) {
            htmlMes += `<div class="dia-vazio"></div>`;
        }

        // Itera sobre os dias do mês
        for (let dia = 1; dia <= ultimoDia; dia++) {
            // Formato YYYY-MM-DD
            const dataKey = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
            // Pega o status salvo ou usa 'LETV' como padrão
            const tipoDiaSalvo = dadosCalendario[dataKey] || 'LETV'; 
            
            // Calcula o dia da semana para o dia atual (0=Dom, 6=Sáb)
            const diaSemana = (dia + diaSemanaInicial - 1) % 7; 
            const isWeekend = diaSemana === 0 || diaSemana === 6; 

            // data-data: Chave para salvar/carregar.
            // data-tipo: Tipo atual (usado para styling e lógica cíclica).
            // onclick: Chama a função para mudar o status.
            htmlMes += `<div class="dia-calendario ${isWeekend ? 'fim-semana' : ''}" 
                                data-data="${dataKey}" 
                                data-tipo="${tipoDiaSalvo}"
                                title="${RÓTULOS_STATUS[tipoDiaSalvo]}"
                                onclick="aplicarTipoDiaCiclico(this)">
                                ${dia}
                            </div>`;
        }
        
        // Preenchimento final para completar a última semana (opcional, para estética)
        let diasNoGrid = diaSemanaInicial + ultimoDia;
        let diasRestantes = (7 - (diasNoGrid % 7)) % 7;
        for (let i = 0; i < diasRestantes; i++) {
            htmlMes += `<div class="dia-vazio"></div>`;
        }


        htmlMes += `</div></div>`; // Fecha .grade-dias-mes e .mes-calendario
        containerVisual.innerHTML += htmlMes;
    }
}

/**
 * Aplica o tipo de dia no clique, seguindo o ciclo.
 * LETV -> NAO_LETV -> FERIADO -> RECUPERACAO -> EXAME -> LETV
 * @param {HTMLElement} element O elemento do dia clicado.
 */
function aplicarTipoDiaCiclico(element) {
    const tipoAtual = element.getAttribute('data-tipo');
    
    // Encontra o índice atual
    let indexAtual = CICLO_STATUS.indexOf(tipoAtual);
    
    // Se não encontrou, começa em LETV (0)
    if (indexAtual === -1) {
        indexAtual = 0;
    }
    
    // Calcula o próximo índice (cíclico)
    const proximoIndex = (indexAtual + 1) % CICLO_STATUS.length;
    const novoTipo = CICLO_STATUS[proximoIndex];
    
    // Aplica o novo tipo ao DOM (atualiza estilo e valor)
    element.setAttribute('data-tipo', novoTipo);
    element.setAttribute('title', RÓTULOS_STATUS[novoTipo]); // Atualiza o Tooltip
    
    // Opcional: Adicionar feedback visual ou log
    console.log(`Dia ${element.getAttribute('data-data')} alterado para: ${novoTipo}`);
}

// ----------------------------------------------------------------------
// --- As funções 'selecionarDiaSemana', 'limparSelecao' e 'salvarCalendario'
// --- NÃO NECESSITAM DE REFORMULAÇÃO E PODEM SER MANTIDAS IGUAIS.
// ----------------------------------------------------------------------

/**
 * Aplica o mesmo tipo de dia a todos os dias de uma determinada semana do ano.
 * @param {string} tipo 'integrado' ou 'superior'.
 * @param {number} diaSemana Dia da semana (0=Domingo, 1=Segunda, ..., 6=Sábado).
 */
function selecionarDiaSemana(tipo, diaSemana) {
    const selectTipo = document.getElementById(`cal_${tipo}_tipo`);
    const novoTipo = selectTipo ? selectTipo.value : null;
    
    if (!novoTipo || !CICLO_STATUS.includes(novoTipo)) {
        alert('Selecione um Tipo de Dia válido antes de usar as Ações Rápidas.');
        return;
    }

    let diasAfetados = 0;
    
    document.querySelectorAll(`#grade-calendario-${tipo}-visual .dia-calendario`).forEach(diaElement => {
        const dataKey = diaElement.getAttribute('data-data');
        // Usar 'T12:00:00' corrige problemas de fuso horário (DST)
        const data = new Date(dataKey + 'T12:00:00'); 
        
        // Compara com o dia da semana do JS (0=Dom, 1=Seg, ..., 6=Sab)
        if (data.getDay() === diaSemana) {
            diaElement.setAttribute('data-tipo', novoTipo);
            diaElement.setAttribute('title', RÓTULOS_STATUS[novoTipo]);
            diasAfetados++;
        }
    });
    
    alert(`${diasAfetados} dias (todas as ${DIAS_CURTOS[diaSemana]}s) foram definidos como ${RÓTULOS_STATUS[novoTipo]}.`);
}

/**
 * Limpa o tipo de dia de todos os dias selecionados (volta para LETV).
 * @param {string} tipo 'integrado' ou 'superior'.
 */
function limparSelecao(tipo) {
    document.querySelectorAll(`#grade-calendario-${tipo}-visual .dia-calendario`).forEach(diaElement => {
        diaElement.setAttribute('data-tipo', 'LETV');
        diaElement.setAttribute('title', RÓTULOS_STATUS['LETV']);
    });
    alert(`Calendário ${tipo} zerado. Todos os dias estão como Letivo Normal (LETV).`);
}

/**
 * Salva o estado atual do calendário do DOM.
 * @param {string} tipo 'integrado' ou 'superior'.
 */
function salvarCalendario(tipo) {
    const key = `calendario_${tipo}`;
    const ano = document.getElementById(`cal_${tipo}_ano`).value;
    const novosDados = {};
    
    document.querySelectorAll(`#grade-calendario-${tipo}-visual .dia-calendario`).forEach(diaElement => {
        const dataKey = diaElement.getAttribute('data-data'); // YYYY-MM-DD
        const tipoDia = diaElement.getAttribute('data-tipo');
        
        // Só salva dias que não são 'LETV' para economizar espaço
        if (tipoDia !== 'LETV') {
            novosDados[dataKey] = tipoDia;
        }
    });

    // Supondo que 'salvarDados' seja uma função externa (ex: para Local Storage)
    salvarDados(key, novosDados); 
    alert(`Calendário Anual (${ano}) para Cursos ${tipo.toUpperCase()} salvo com sucesso!`);
}

// Suponha que estas funções existam globalmente no seu ambiente:
// function obterDados(key) { return JSON.parse(localStorage.getItem(key)); }
// function salvarDados(key, data) { localStorage.setItem(key, JSON.stringify(data)); }
// ======================================================================
// --- 3. LÓGICA DE GERAÇÃO DE HORÁRIO BASE (Heurística de Priorização) ---
// ======================================================================

const DIAS_SEMANA = ['SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA'];

/**
 * Mapeamento: Dia atual -> Dia anterior na sequência letiva
 * Usado para a Regra das 11 Horas de descanso.
 */
const DIA_ANTERIOR = {
    'SEGUNDA': 'SEXTA',
    'TERCA': 'SEGUNDA',
    'QUARTA': 'TERCA',
    'QUINTA': 'QUARTA',
    'SEXTA': 'QUINTA'
};

/**
 * Gera a estrutura de todos os slots de horário disponíveis.
 * @returns {Object} Estrutura da grade semanal vazia.
 */
function inicializarGradeVazia() {
    const grade = {};
    const horarios = obterDados('horario'); // {matutino: [...], vespertino: [...], noturno: [...]}
    
    // Cria uma matriz 5xN (Dias x Slots)
    DIAS_SEMANA.forEach(dia => {
        grade[dia] = {};
        
        // Combina todos os slots de todos os turnos para aquele dia
        ['matutino', 'vespertino', 'noturno'].forEach(periodo => {
            if (horarios[periodo]) {
                horarios[periodo].forEach(slotTempo => {
                    // Ignora o slot de intervalo
                    if (slotTempo !== 'INTERVALO') { 
                        // O slot é um objeto que armazenará a disciplina alocada
                        grade[dia][slotTempo] = { 
                            status: 'LIVRE', // LIVRE, ALOCADO, RESTRITO
                            periodo: periodo,
                            turmaId: null, // Turma que ocupa o slot
                            disciplinaId: null, // Disciplina alocada
                            professorSiape: null, // Professor alocado
                            restritos: [] // Array de SIAPEs de professores restritos (PRD/PGD)
                        };
                    }
                });
            }
        });
    });
    
    return grade;
}

/**
 * Aplica restrições de PRD/PGD na grade.
 * @param {Object} grade Grade de horário inicializada.
 * @returns {Object} Grade com restrições de PGD/PRD aplicadas.
 */
function aplicarRestricoesIniciais(grade) {
    const professores = obterDados('professor');

    professores.forEach(prof => {
        const rest = prof.restricoes;

        // 1. PRD / PGD
        if (rest && rest.prd_principal &&
            rest.prd_principal.dia &&
            rest.prd_principal.periodo) {
            
            const diaPRD = rest.prd_principal.dia;
            const periodoPRD = rest.prd_principal.periodo;
            
            if (DIAS_SEMANA.includes(diaPRD)) {
                Object.keys(grade[diaPRD]).forEach(slotTempo => {
                    const slotObj = grade[diaPRD][slotTempo];

                    if (periodoPRD === 'INTEIRO' ||
                        slotObj.periodo.toUpperCase().startsWith(periodoPRD)) {

                        // Marca o professor como restrito no slot
                        slotObj.restritos.push(prof.siape);
                    }
                });
            }
        }
    });

    return grade;
}

/**
 * Verifica se um slot está livre para uma determinada Turma e Professor,
 * incluindo verificações de 11h de descanso.
 */
function verificarConflitosSlot(grade, dia, slotTempo, turmaId, professorSiape) {
    const slot = grade[dia][slotTempo];
    const horarios = obterDados('horario');

    // 1. Conflito de Turma (Slot já alocado)
    if (slot.disciplinaId !== null) { 
        return 'TURMA_OCUPADA';
    }

    // 2. Conflito de Professor (PRD/PGD)
    if (slot.restritos && slot.restritos.includes(professorSiape)) {
        return 'PROFESSOR_RESTRITO';
    }

    // 3. Conflito das 11 Horas de Descanso (Regra Rígida)
    const slotsMatutino = horarios.matutino || [];
    const slotsNoturno = horarios.noturno || [];
    
    // O conflito das 11h geralmente só ocorre no primeiro horário matutino
    const isSlotMatutinoPrimeiro = slotsMatutino[0] === slotTempo; 

    if (isSlotMatutinoPrimeiro) {
        const diaAnterior = DIA_ANTERIOR[dia]; 
        
        if (diaAnterior) {
            const ultimoSlotNoturno = slotsNoturno[slotsNoturno.length - 1];
            
            // Verifica se o professor está escalado no último slot noturno do dia anterior
            if (grade[diaAnterior] && grade[diaAnterior][ultimoSlotNoturno] && 
                grade[diaAnterior][ultimoSlotNoturno].professorSiape === professorSiape) {
                
                return '11H_DESCANSO'; 
            }
        }
    }
    
    return null; // Slot está livre para Turma e Professor
}

/**
 * Tenta encontrar um bloco de slots consecutivos (aglutinação) disponível.
 * @param {Object} grade A grade atual.
 * @param {number} numAulas O tamanho do bloco de aulas a aglutinar (ex: 2 ou 3).
 * @param {string} turmaId ID da turma.
 * @param {string} professorSiape SIAPE do professor.
 * @returns {Object|null} {dia: string, slots: Array<string>} ou null se não encontrar.
 */
function encontrarBlocoAglutinado(grade, numAulas, turmaId, professorSiape) {
    // Garante que há slots para iterar
    const slotTempos = Object.keys(grade.SEGUNDA || {}); 
    if (slotTempos.length === 0) return null; 
    
    for (const dia of DIAS_SEMANA) {
        for (let i = 0; i <= slotTempos.length - numAulas; i++) {
            let slotsCandidatos = [];
            let blocoLivre = true;
            
            for (let j = 0; j < numAulas; j++) {
                const slotTempo = slotTempos[i + j];
                
                // 1. Verifica se o slot não gera conflito para Turma/Professor/Restrições
                const conflito = verificarConflitosSlot(grade, dia, slotTempo, turmaId, professorSiape);
                
                if (conflito !== null) {
                    blocoLivre = false;
                    break;
                }
                
                // 2. Garante que os slots são consecutivos dentro de um mesmo período (Manhã/Tarde/Noite)
                if (j > 0) {
                    const periodoAtual = grade[dia][slotTempo].periodo;
                    const periodoAnterior = grade[dia][slotTempos[i + j - 1]].periodo;
                    if (periodoAtual !== periodoAnterior) {
                        blocoLivre = false;
                        break;
                    }
                }
                
                slotsCandidatos.push(slotTempo);
            }
            
            if (blocoLivre) {
                return { dia: dia, slots: slotsCandidatos };
            }
        }
    }
    return null;
}

/**
 * Executa o algoritmo heurístico de alocação de disciplinas.
 */
function gerarHorarioBase() {
    // 1. Obter Dados e Inicializar
    const disciplinas = obterDados('disciplina');
    const turmas = obterDados('turma');
    let grade = inicializarGradeVazia();
    let conflitos = [];
    
    // Aplica restrições estáticas (PGD/PRD)
    grade = aplicarRestricoesIniciais(grade); 
    
    // Etapa 2: Priorização (Maior número de aulas primeiro)
    const disciplinasOrdenadas = [...disciplinas].sort((a, b) => {
        return b.aulasSemanais - a.aulasSemanais; 
    });
    
    // Etapa 3: Alocação por Blocos (Aglutinação)
    disciplinasOrdenadas.forEach(disc => {
        let aulasAlocadas = 0;
        const aulasNecessarias = disc.aulasSemanais;
        
        // Parse da Aglutinação (Ex: "3+2" -> [3, 2]; "2x2" -> [2, 2, 2, 2])
        let blocosParaAlocar = [];
        
        disc.aglutinacao.split('+').forEach(p => {
            if (p.includes('x')) {
                const [dias, aulas] = p.split('x').map(Number);
                // Ex: '2x2' significa 2 blocos de 2 aulas
                blocosParaAlocar.push(...Array(dias).fill(aulas)); 
            } else {
                blocosParaAlocar.push(Number(p));
            }
        });
        
        // Tenta alocar os blocos maiores primeiro
        blocosParaAlocar.sort((a, b) => b - a);
        
        // Tenta alocar cada bloco
        blocosParaAlocar.forEach(tamanhoBloco => {
            if (aulasAlocadas < aulasNecessarias) {
                // Tenta encontrar um bloco livre para a Turma e o Professor
                const bloco = encontrarBlocoAglutinado(grade, tamanhoBloco, disc.turmaId, disc.professorSiape);
                
                if (bloco) {
                    // Aloca os slots encontrados
                    bloco.slots.forEach(slotTempo => {
                        const slot = grade[bloco.dia][slotTempo];
                        slot.status = 'ALOCADO';
                        slot.turmaId = disc.turmaId;
                        slot.disciplinaId = disc.id;
                        slot.professorSiape = disc.professorSiape;
                        aulasAlocadas++;
                    });
                }
            }
        });
        
        // Etapa 4: Reportar Conflitos
        if (aulasAlocadas < aulasNecessarias) {
            conflitos.push({
                disciplina: disc.nome,
                turma: turmas.find(t => t.id === disc.turmaId)?.nome || 'N/A',
                aulasFaltantes: aulasNecessarias - aulasAlocadas,
                motivo: 'FALHA NA AGLUTINAÇÃO OU CONFLITO DE RESTRICÃO'
            });
        }
    });

    // Etapa 5: Renderizar
    renderizarGradeFinal(grade, conflitos);
    
}

/**
 * Renderiza a grade de horário na seção de Horário Base.
 * @param {Object} grade Grade de horário gerada.
 * @param {Array} conflitos Lista de conflitos.
 */
function renderizarGradeFinal(grade, conflitos) {
    const secaoHorarioBase = document.getElementById('horario-base-gerar');
    if (!secaoHorarioBase) return;
    
    // 1. Configura a UI de Output
    const turmas = obterDados('turma');
    const dropdownTurmas = `<select id="seletor-turma-grade" onchange="renderizarGradeTurma(this.value, window.lastGeneratedGrade, turmas, professores, disciplinas)">
        <option value="">Selecione a Turma para Visualizar</option>
        ${turmas.map(t => `<option value="${t.id}">${t.nome}</option>`).join('')}
    </select>`;

    secaoHorarioBase.innerHTML = `
        <h3 class="titulo-aba">📅 Geração de Horário Base</h3>
        <button class="botao-acao botao-editar" onclick="gerarHorarioBase()">🔄 RE-GERAR HORÁRIO BASE</button>
        <div id="resultado-conflitos"></div>
        <div id="grade-horario-output">
            <h4>Visualizar Grade por Turma:</h4>
            ${dropdownTurmas}
            <div id="grade-turma-visual"></div>
        </div>
    `;

    // 2. Reportar Conflitos
    const outputConflitos = document.getElementById('resultado-conflitos');
    if (conflitos.length > 0) {
        // Exibir a lista detalhada de conflitos aqui
        outputConflitos.innerHTML = `<p class="nota-regra">⚠️ **CONFLITOS ENCONTRADOS (${conflitos.length}):** O sistema não conseguiu alocar todas as aulas.</p>`;
    } else {
        outputConflitos.innerHTML = `<p class="nota-regra" style="border-left-color: var(--ifro-verde);">✅ **SUCESSO:** Horário Base gerado sem conflitos conhecidos.</p>`;
    }
    
    // 3. Renderizar a Primeira Turma
    window.lastGeneratedGrade = grade; // Armazena globalmente para ser usada pelo onchange
    const professores = obterDados('professor');
    const disciplinas = obterDados('disciplina');
    
    if (turmas.length > 0) {
        document.getElementById('seletor-turma-grade').value = turmas[0].id;
        renderizarGradeTurma(turmas[0].id, grade, turmas, professores, disciplinas);
    }
}

/**
 * Função utilitária para renderizar a grade de uma turma específica.
 */
function renderizarGradeTurma(turmaId, grade, turmas, professores, disciplinas) {
    const container = document.getElementById('grade-turma-visual');
    if (!container || !grade) {
        container.innerHTML = `<p>Grade não gerada ou container ausente.</p>`;
        return;
    }

    const turma = turmas.find(t => t.id == turmaId);
    if (!turma) {
        container.innerHTML = `<p>Selecione uma Turma para visualizar.</p>`;
        return;
    }
    
    // Extrai todos os slots únicos para montar o cabeçalho de tempo
    const slotTempos = Object.keys(grade[DIAS_SEMANA[0]] || {}); 
    if (slotTempos.length === 0) {
        container.innerHTML = `<p>Horários não configurados (Turnos Vazios).</p>`;
        return;
    }
    
    let html = `<h5>Horário da Turma: ${turma.nome}</h5>`;
    html += `<table class="tabela-dados tabela-horario">
        <thead>
            <tr><th>Horário</th>${DIAS_SEMANA.map(d => `<th>${d}</th>`).join('')}</tr>
        </thead>
        <tbody>`;
        
    slotTempos.forEach(slotTempo => {
        html += `<tr><th>${slotTempo}</th>`; // Cabeçalho do Horário (HH:MM-HH:MM)
        
        DIAS_SEMANA.forEach(dia => {
            const slot = grade[dia][slotTempo];
            let conteudo = '';
            let classe = 'slot-livre';

            if (!slot) { // Deve ser um intervalo ou dia inválido (embora já filtrado)
                conteudo = '';
                classe = 'slot-vazio';
            } else if (slot.disciplinaId && slot.turmaId == turmaId) {
                // Slot Alocado para esta Turma
                const disc = disciplinas.find(d => d.id === slot.disciplinaId);
                const prof = professores.find(p => p.siape === slot.professorSiape);
                
                conteudo = `${disc.nome || 'DISCIPLINA N/A'} <br> <small>${prof?.nome || 'PROF N/A'}</small>`;
                classe = 'slot-alocado';
            } else if (slot.restritos && slot.restritos.length > 0) {
                // Slot Restrito para Algum Professor (Visualização de Turma, não Professor)
                // Se a turma está livre, mas o slot é restrito para outros, mostra como livre (ou usa outra cor)
                // conteudo = 'Restrito (Prof)'; 
                // classe = 'slot-restrito';
                // Deixa como livre para não poluir a visualização da turma
            } 

            html += `<td class="${classe}">${conteudo}</td>`;
        });
        
        html += `</tr>`;
    });

    html += `</tbody></table>`;
    container.innerHTML = html;
}
// ======================================================================
// --- 4. LÓGICA DE CADASTRO DE PROFESSORES ---
// ======================================================================

/**
 * Adiciona ou atualiza os dados de um professor no Local Storage.
 */
function salvarProfessor() {
    const siape = document.getElementById('prof_siape').value;
    const nome = document.getElementById('prof_nome').value;
    const email = document.getElementById('prof_email').value;
    const campus = document.getElementById('prof_campus').value;
    const prdDia = document.getElementById('prof_prd_dia').value;
    const prdPeriodo = document.getElementById('prof_prd_periodo').value;
    
    if (!siape || !nome || !campus) {
        alert('SIAPE, Nome e Campus são obrigatórios.');
        return;
    }

    let professores = obterDados('professor');
    const novoProfessor = {
        siape: siape,
        nome: nome,
        email: email,
        campus: campus,
        restricoes: {
            prd_principal: {
                dia: prdDia,
                periodo: prdPeriodo // MATUTINO, VESPERTINO, NOTURNO, INTEIRO
            },
            // Outras restrições futuras (ex: preferência de dia, limite de aulas diárias)
        }
    };

    const index = professores.findIndex(p => p.siape === siape);

    if (index !== -1) {
        professores[index] = novoProfessor; // Atualiza
        alert(`Professor ${nome} (SIAPE ${siape}) atualizado!`);
    } else {
        professores.push(novoProfessor); // Adiciona
        alert(`Professor ${nome} (SIAPE ${siape}) cadastrado!`);
    }

    salvarDados('professor', professores);
    renderizarTabelaProfessores();
    document.getElementById('form-professor').reset(); // Limpa o formulário após salvar
}

/**
 * Renderiza a tabela de professores cadastrados.
 */
function renderizarTabelaProfessores() {
    const professores = obterDados('professor');
    const container = document.getElementById('tabela-professores-container');
    
    if (!container) return;

    let html = `
        <table class="tabela-dados">
            <thead>
                <tr>
                    <th>SIAPE</th>
                    <th>Nome</th>
                    <th>Campus</th>
                    <th>Restrição (PGD/PRD)</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
    `;

    professores.forEach(prof => {
        const prd = prof.restricoes.prd_principal;
        const restDesc = prd.dia && prd.periodo ? `${prd.dia} (${prd.periodo})` : 'Nenhuma';

        html += `
            <tr>
                <td>${prof.siape}</td>
                <td>${prof.nome}</td>
                <td>${prof.campus}</td>
                <td>${restDesc}</td>
                <td>
                    <button onclick="carregarProfessorParaEdicao('${prof.siape}')">✏️ Editar</button>
                    <button class="botao-remover" onclick="removerProfessor('${prof.siape}')">🗑️ Remover</button>
                </td>
            </tr>
        `;
    });

    html += `</tbody></table>`;
    container.innerHTML = html;
}

/**
 * Carrega dados do professor para edição no formulário.
 * @param {string} siape SIAPE do professor a ser carregado.
 */
function carregarProfessorParaEdicao(siape) {
    const professores = obterDados('professor');
    const prof = professores.find(p => p.siape === siape);

    if (prof) {
        document.getElementById('prof_siape').value = prof.siape;
        document.getElementById('prof_nome').value = prof.nome;
        document.getElementById('prof_email').value = prof.email;
        document.getElementById('prof_campus').value = prof.campus;
        
        const prd = prof.restricoes.prd_principal;
        document.getElementById('prof_prd_dia').value = prd.dia || '';
        document.getElementById('prof_prd_periodo').value = prd.periodo || '';
        
        // Desabilita a edição do SIAPE após carregar
        document.getElementById('prof_siape').disabled = true; 
        alert(`Professor ${prof.nome} carregado para edição.`);
    }
}

/**
 * Remove um professor pelo SIAPE.
 * @param {string} siape SIAPE do professor a ser removido.
 */
function removerProfessor(siape) {
    if (confirm(`Tem certeza que deseja remover o professor com SIAPE ${siape}?`)) {
        let professores = obterDados('professor');
        professores = professores.filter(p => p.siape !== siape);
        salvarDados('professor', professores);
        renderizarTabelaProfessores();
        alert('Professor removido com sucesso.');
    }
}
// ======================================================================
// --- 5. LÓGICA DE CADASTRO DE TURMAS ---
// ======================================================================

/**
 * Gera um ID único simples.
 * @returns {string} ID único.
 */
function gerarIdUnico() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
}

/**
 * Adiciona ou atualiza uma turma no Local Storage.
 */
function salvarTurma() {
    const id = document.getElementById('turma_id').value || gerarIdUnico();
    const nome = document.getElementById('turma_nome').value;
    const nivel = document.getElementById('turma_nivel').value; // INTEGRADO, SUPERIOR
    const turno = document.getElementById('turma_turno').value; // MATUTINO, VESPERTINO, NOTURNO

    if (!nome || !nivel || !turno) {
        alert('Nome, Nível e Turno são obrigatórios.');
        return;
    }

    let turmas = obterDados('turma');
    const novaTurma = {
        id: id,
        nome: nome,
        nivel: nivel,
        turno: turno
    };

    const index = turmas.findIndex(t => t.id === id);

    if (index !== -1) {
        turmas[index] = novaTurma; // Atualiza
        alert(`Turma ${nome} atualizada!`);
    } else {
        turmas.push(novaTurma); // Adiciona
        alert(`Turma ${nome} cadastrada!`);
    }

    salvarDados('turma', turmas);
    renderizarTabelaTurmas();
    document.getElementById('form-turma').reset();
    document.getElementById('turma_id').value = ''; // Limpa o ID escondido
}

/**
 * Renderiza a tabela de turmas cadastradas.
 */
function renderizarTabelaTurmas() {
    const turmas = obterDados('turma');
    const container = document.getElementById('tabela-turmas-container');
    
    if (!container) return;

    let html = `
        <table class="tabela-dados">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Nível</th>
                    <th>Turno</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
    `;

    turmas.forEach(t => {
        html += `
            <tr>
                <td>${t.nome}</td>
                <td>${t.nivel}</td>
                <td>${t.turno}</td>
                <td>
                    <button onclick="carregarTurmaParaEdicao('${t.id}')">✏️ Editar</button>
                    <button class="botao-remover" onclick="removerTurma('${t.id}')">🗑️ Remover</button>
                </td>
            </tr>
        `;
    });

    html += `</tbody></table>`;
    container.innerHTML = html;
}

/**
 * Carrega dados da turma para edição no formulário.
 * @param {string} id ID da turma a ser carregada.
 */
function carregarTurmaParaEdicao(id) {
    const turmas = obterDados('turma');
    const turma = turmas.find(t => t.id === id);

    if (turma) {
        document.getElementById('turma_id').value = turma.id;
        document.getElementById('turma_nome').value = turma.nome;
        document.getElementById('turma_nivel').value = turma.nivel;
        document.getElementById('turma_turno').value = turma.turno;
        alert(`Turma ${turma.nome} carregada para edição.`);
    }
}

/**
 * Remove uma turma pelo ID.
 * @param {string} id ID da turma a ser removida.
 */
function removerTurma(id) {
    if (confirm('Tem certeza que deseja remover esta turma? Todas as disciplinas associadas deverão ser verificadas manualmente.')) {
        let turmas = obterDados('turma');
        turmas = turmas.filter(t => t.id !== id);
        salvarDados('turma', turmas);
        renderizarTabelaTurmas();
        alert('Turma removida com sucesso.');
    }
}
// ======================================================================
// --- 6. LÓGICA DE CADASTRO DE DISCIPLINAS ---
// ======================================================================

/**
 * Popula os dropdowns de Turma e Professor no formulário de Disciplina.
 */
function popularSelectsDisciplina() {
    const turmas = obterDados('turma');
    const professores = obterDados('professor');
    
    const selectTurma = document.getElementById('disc_turma');
    const selectProfessor = document.getElementById('disc_professor');

    // Limpa selects
    selectTurma.innerHTML = '<option value="">Selecione a Turma</option>';
    selectProfessor.innerHTML = '<option value="">Selecione o Professor</option>';

    // Popula Turmas
    turmas.forEach(t => {
        selectTurma.innerHTML += `<option value="${t.id}">${t.nome} (${t.turno})</option>`;
    });

    // Popula Professores
    professores.forEach(p => {
        selectProfessor.innerHTML += `<option value="${p.siape}">${p.nome} (${p.siape})</option>`;
    });
}

/**
 * Adiciona ou atualiza uma disciplina.
 */
function salvarDisciplina() {
    const id = document.getElementById('disc_id').value || gerarIdUnico();
    const nome = document.getElementById('disc_nome').value;
    const turmaId = document.getElementById('disc_turma').value;
    const professorSiape = document.getElementById('disc_professor').value;
    const aulasSemanais = parseInt(document.getElementById('disc_aulas_semanais').value);
    const aglutinacao = document.getElementById('disc_aglutinacao').value;

    if (!nome || !turmaId || !professorSiape || isNaN(aulasSemanais) || !aglutinacao) {
        alert('Todos os campos são obrigatórios.');
        return;
    }
    
    // Validação de Aglutinação vs. Aulas Semanais
    const totalAglutinacao = aglutinacao.split('+').reduce((sum, block) => {
        if (block.includes('x')) {
            const [dias, aulas] = block.split('x').map(Number);
            return sum + (dias * aulas);
        }
        return sum + Number(block);
    }, 0);

    if (totalAglutinacao !== aulasSemanais) {
        alert(`Erro: A soma da aglutinação (${totalAglutinacao} aulas) não corresponde às Aulas Semanais (${aulasSemanais}).`);
        return;
    }

    let disciplinas = obterDados('disciplina');
    const novaDisciplina = {
        id: id,
        nome: nome,
        turmaId: turmaId,
        professorSiape: professorSiape,
        aulasSemanais: aulasSemanais,
        aglutinacao: aglutinacao // Ex: "3+2" ou "2x2+1"
    };

    const index = disciplinas.findIndex(d => d.id === id);

    if (index !== -1) {
        disciplinas[index] = novaDisciplina; // Atualiza
        alert(`Disciplina ${nome} atualizada!`);
    } else {
        disciplinas.push(novaDisciplina); // Adiciona
        alert(`Disciplina ${nome} cadastrada!`);
    }

    salvarDados('disciplina', disciplinas);
    renderizarTabelaDisciplinas();
    document.getElementById('form-disciplina').reset();
    document.getElementById('disc_id').value = '';
}

/**
 * Renderiza a tabela de disciplinas cadastradas.
 */
function renderizarTabelaDisciplinas() {
    const disciplinas = obterDados('disciplina');
    const turmas = obterDados('turma');
    const professores = obterDados('professor');
    const container = document.getElementById('tabela-disciplinas-container');
    
    if (!container) return;

    let html = `
        <table class="tabela-dados">
            <thead>
                <tr>
                    <th>Disciplina</th>
                    <th>Turma</th>
                    <th>Prof. (SIAPE)</th>
                    <th>Carga Semanal</th>
                    <th>Aglutinação</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
    `;

    disciplinas.forEach(d => {
        const turma = turmas.find(t => t.id === d.turmaId)?.nome || 'N/A';
        const prof = professores.find(p => p.siape === d.professorSiape)?.nome || 'N/A';
        
        html += `
            <tr>
                <td>${d.nome}</td>
                <td>${turma}</td>
                <td>${prof} (${d.professorSiape})</td>
                <td>${d.aulasSemanais}</td>
                <td>${d.aglutinacao}</td>
                <td>
                    <button onclick="carregarDisciplinaParaEdicao('${d.id}')">✏️ Editar</button>
                    <button class="botao-remover" onclick="removerDisciplina('${d.id}')">🗑️ Remover</button>
                </td>
            </tr>
        `;
    });

    html += `</tbody></table>`;
    container.innerHTML = html;
}

/**
 * Carrega dados da disciplina para edição.
 * @param {string} id ID da disciplina.
 */
function carregarDisciplinaParaEdicao(id) {
    const disciplinas = obterDados('disciplina');
    const disc = disciplinas.find(d => d.id === id);

    if (disc) {
        // Assegura que os selects estejam populados antes de carregar
        popularSelectsDisciplina(); 
        
        document.getElementById('disc_id').value = disc.id;
        document.getElementById('disc_nome').value = disc.nome;
        document.getElementById('disc_turma').value = disc.turmaId;
        document.getElementById('disc_professor').value = disc.professorSiape;
        document.getElementById('disc_aulas_semanais').value = disc.aulasSemanais;
        document.getElementById('disc_aglutinacao').value = disc.aglutinacao;
        
        alert(`Disciplina ${disc.nome} carregada para edição.`);
    }
}

/**
 * Remove uma disciplina.
 * @param {string} id ID da disciplina.
 */
function removerDisciplina(id) {
    if (confirm('Tem certeza que deseja remover esta disciplina?')) {
        let disciplinas = obterDados('disciplina');
        disciplinas = disciplinas.filter(d => d.id !== id);
        salvarDados('disciplina', disciplinas);
        renderizarTabelaDisciplinas();
        alert('Disciplina removida com sucesso.');
    }
}
// ======================================================================
// --- 7. LÓGICA DE CONFIGURAÇÃO DE HORÁRIOS (SLOTS DE TEMPO) ---
// ======================================================================

/**
 * Adiciona um slot de horário (aula ou intervalo) a um turno.
 * @param {string} turno 'matutino', 'vespertino' ou 'noturno'.
 * @param {boolean} isIntervalo Se true, adiciona 'INTERVALO'.
 */
function adicionarSlot(turno, isIntervalo) {
    let horarios = obterDados('horario');
    const slotInput = document.getElementById(`slot_${turno}_input`);
    
    if (isIntervalo) {
        horarios[turno].push('INTERVALO');
    } else {
        const novoSlot = slotInput.value;
        const padraoHorario = /^\d{2}:\d{2}-\d{2}:\d{2}$/;

        if (!padraoHorario.test(novoSlot)) {
            alert('Formato de horário inválido. Use HH:MM-HH:MM (ex: 07:30-08:20).');
            return;
        }
        
        horarios[turno].push(novoSlot);
        slotInput.value = ''; // Limpa o campo
    }

    salvarDados('horario', horarios);
    renderizarHorariosConfiguracao();
}

/**
 * Remove um slot de horário de um turno.
 * @param {string} turno 'matutino', 'vespertino' ou 'noturno'.
 * @param {number} index Índice do slot a ser removido.
 */
function removerSlot(turno, index) {
    if (confirm(`Tem certeza que deseja remover este slot do turno ${turno}?`)) {
        let horarios = obterDados('horario');
        horarios[turno].splice(index, 1);
        salvarDados('horario', horarios);
        renderizarHorariosConfiguracao();
    }
}

/**
 * Renderiza a visualização da grade de horários configurados.
 */
function renderizarHorariosConfiguracao() {
    const horarios = obterDados('horario');
    const turnos = ['matutino', 'vespertino', 'noturno'];
    const container = document.getElementById('horarios-config-visual');
    
    if (!container) return;
    
    let html = '';

    turnos.forEach(turno => {
        const slots = horarios[turno] || [];
        
        html += `
            <div class="config-turno">
                <h4>Turno ${turno.toUpperCase()}</h4>
                <div class="lista-slots">
        `;
        
        if (slots.length === 0) {
             html += `<p class="nota-regra">Nenhum slot definido para este turno.</p>`;
        }

        slots.forEach((slot, index) => {
            const isIntervalo = slot === 'INTERVALO';
            const classe = isIntervalo ? 'tag-intervalo' : 'tag-slot';
            const conteudo = isIntervalo ? 'INTERVALO' : slot;
            
            html += `
                <span class="${classe}">
                    ${conteudo} 
                    <button onclick="removerSlot('${turno}', ${index})" title="Remover Slot">x</button>
                </span>
            `;
        });
        
        html += `
                </div>
                <div class="controles-slot">
                    <input type="text" id="slot_${turno}_input" placeholder="HH:MM-HH:MM">
                    <button class="botao-acao" onclick="adicionarSlot('${turno}', false)">+ Aula</button>
                    <button class="botao-editar" onclick="adicionarSlot('${turno}', true)">+ Intervalo</button>
                </div>
            </div>
            <hr>
        `;
    });

    container.innerHTML = html;
}
// ======================================================================
// --- 8. LÓGICA DE INICIALIZAÇÃO DA APLICAÇÃO ---
// ======================================================================

/**
 * Função principal para inicializar o estado da aplicação ao carregar a página.
 */
function inicializarSistema() {
    console.log('Sistema de Agendamento Inicializado.');
    
    // 1. Configurações de Horário (Slots)
    if (document.getElementById('horarios-config-visual')) {
        renderizarHorariosConfiguracao();
    }
    
    // 2. Cadastro de Professores
    if (document.getElementById('tabela-professores-container')) {
        renderizarTabelaProfessores();
    }

    // 3. Cadastro de Turmas
    if (document.getElementById('tabela-turmas-container')) {
        renderizarTabelaTurmas();
    }

    // 4. Cadastro de Disciplinas (Requer Professores e Turmas)
    if (document.getElementById('tabela-disciplinas-container')) {
        popularSelectsDisciplina();
        renderizarTabelaDisciplinas();
    }

    // 5. Calendário (Assume-se que o ano padrão está selecionado)
    if (document.getElementById('grade-calendario-integrado-visual')) {
        // Assume renderização inicial para o ano atual
        const anoAtual = new Date().getFullYear();
        document.getElementById('cal_integrado_ano').value = anoAtual;
        document.getElementById('cal_superior_ano').value = anoAtual;
        renderizarCalendario('integrado');
        renderizarCalendario('superior');
    }

    
    // 6. Horário Base (Não renderiza automaticamente, aguarda o clique em "Gerar")
    // O algoritmo de geração é acionado pelo botão 'Gerar Horário Base'.
}

// Associa a função de inicialização ao evento de carregamento da página
// window.onload = inicializarSistema; 
// Se o script for carregado no final do BODY, basta chamar:
// inicializarSistema();
