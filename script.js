// --- Definições Globais e Chaves de Local Storage ---
const LS_KEYS = {
    professor: 'ifro_professores',
    horario: 'ifro_horarios',
    turma: 'ifro_turmas',
    disciplina: 'ifro_disciplinas',
};

// Dados iniciais (Professores são os mesmos da resposta anterior, usei um placeholder)
const PROFESSORES_INICIAIS_DATA = [
    { siape: '1889267', nome: 'Adriana Rigolon', email: 'adriana.rigolon@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '1046329', nome: 'Agmar Chaves', email: 'agmar.chaves@ifro.edu.br', situacao: '40', restricoes: {} },
];

const HORARIOS_INICIAIS = {
    matutino: ['07:30-08:20', '08:20-09:10', 'INTERVALO', '09:30-10:20', '10:20-11:10', '11:10-12:00'],
    vespertino: ['13:50-14:40', '14:40-15:30', 'INTERVALO', '15:50-16:40', '16:40-17:30', '17:30-18:20'],
    noturno: ['19:00-19:50', '19:50-20:40', 'INTERVALO', '20:50-21:40', '21:40-22:30'],
};


// ----------------------------------------------------------------------
// --- 1. FUNÇÕES DE PERSISTÊNCIA (GENÉRICAS) ---
// ----------------------------------------------------------------------

/**
 * Obtém dados do Local Storage, inicializando se estiver vazio.
 */
function obterDados(key) {
    let dados = JSON.parse(localStorage.getItem(LS_KEYS[key]));
    
    if (!dados) {
        // Inicialização de dados
        if (key === 'professor') dados = PROFESSORES_INICIAIS_DATA;
        else if (key === 'horario') dados = HORARIOS_INICIAIS;
        else dados = [];
        
        salvarDados(key, dados);
    }
    return dados;
}

/**
 * Salva dados no Local Storage.
 */
function salvarDados(key, dados) {
    localStorage.setItem(LS_KEYS[key], JSON.stringify(dados));
}


// ----------------------------------------------------------------------
// --- 2. LÓGICA DE NAVEGAÇÃO E RECARGA ---
// ----------------------------------------------------------------------

function mostrarConteudoDaAba(targetId) {
    document.querySelectorAll('.aba-conteudo').forEach(section => {
        section.style.display = 'none';
    });
    
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.style.display = 'block';
        
        // Chamada de carregamento específica para a aba
        if (targetId === 'cadastro-professores') {
            carregarProfessores();
        } else if (targetId === 'cadastro-horarios') {
            carregarHorarios();
        } else if (targetId === 'cadastro-turmas') {
            carregarTurmas();
        } else if (targetId === 'cadastro-disciplinas') {
            carregarDisciplinas();
            preencherSelectsDisciplina();
        }
    }
}

function inicializarNavegacao() {
    const links = document.querySelectorAll('.link-menu, .sub-link-menu');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            document.querySelectorAll('.link-menu, .sub-link-menu').forEach(l => l.classList.remove('ativo'));
            this.classList.add('ativo');

            let targetId = this.getAttribute('href').substring(1);
            
            // Se o link principal 'CADASTRO' for clicado, direciona para o primeiro sub-link
            if (targetId === 'cadastro') {
                targetId = 'cadastro-professores';
                document.querySelector('a[href="#cadastro-professores"]').classList.add('ativo');
            }
            
            mostrarConteudoDaAba(targetId);
        });
    });

    // Configuração inicial ao carregar a página
    mostrarConteudoDaAba('cadastro-professores');
    document.querySelector('a[href="#cadastro-professores"]').classList.add('ativo');
}


// ----------------------------------------------------------------------
// --- 3. LÓGICA DE CADASTRO DE PROFESSOR (Com Restrições Expandidas) ---
// ----------------------------------------------------------------------

function capturarRestricoesProfessor() {
    return {
        // Exemplo de captura de todas as restrições
        prd_principal: {
            dia: document.getElementById('prd_principal_dia').value,
            periodo: document.getElementById('prd_principal_periodo').value
        },
        pgd_principal: {
            dia: document.getElementById('pgd_principal_dia').value,
            periodo: document.getElementById('pgd_principal_periodo').value
        },
        gerais: {
            restricao_manha: document.getElementById('restricao_manha').value,
            restricao_primeira_manha: document.getElementById('restricao_primeira_manha').value,
            // ... capture todos os outros campos aqui ...
        }
    };
}

function salvarProfessor() {
    const nome = document.getElementById('nome').value.trim();
    const siape = document.getElementById('siape').value.trim();
    const email = document.getElementById('email').value.trim();
    const situacao = document.getElementById('situacao').value;
    
    if (!nome || !siape || !email) {
        alert('Por favor, preencha Nome, SIAPE/CPF e E-mail.');
        return;
    }

    let professores = obterDados('professor');
    const professorExistenteIndex = professores.findIndex(p => p.siape === siape);
    const restricoes = capturarRestricoesProfessor();

    const novoProfessor = { nome, siape, email, situacao, restricoes };

    if (professorExistenteIndex !== -1) {
        // Edição (o SIAPE estará desativado, então usamos ele como chave)
        professores[professorExistenteIndex] = { ...professores[professorExistenteIndex], ...novoProfessor };
        alert(`Professor(a) ${nome} (SIAPE: ${siape}) atualizado(a) com sucesso!`);
    } else {
        // Novo
        professores.push(novoProfessor);
        alert(`Professor(a) ${nome} cadastrado(a) com sucesso!`);
    }

    salvarDados('professor', professores);
    document.getElementById('form-cadastro-professor').reset();
    document.getElementById('siape').removeAttribute('disabled');
    carregarProfessores();
}

function carregarProfessores() {
    const professores = obterDados('professor');
    const tabelaBody = document.querySelector('#tabela-professores tbody');
    if (!tabelaBody) return;

    tabelaBody.innerHTML = '';

    professores.forEach(professor => {
        const row = tabelaBody.insertRow();
        row.insertCell().textContent = professor.siape;
        row.insertCell().textContent = professor.nome;
        row.insertCell().textContent = professor.email;
        row.insertCell().textContent = professor.situacao;
        
        const cellAcoes = row.insertCell();
        
        const btnEditar = document.createElement('button');
        btnEditar.className = 'botao-acao botao-editar';
        btnEditar.textContent = '✏️ EDITAR';
        btnEditar.onclick = () => editarProfessor(professor.siape);
        cellAcoes.appendChild(btnEditar);

        const btnRemover = document.createElement('button');
        btnRemover.className = 'botao-acao botao-remover';
        btnRemover.textContent = '🗑️ REMOVER';
        btnRemover.onclick = () => removerDados('professor', professor.siape, professor.nome);
        cellAcoes.appendChild(btnRemover);
    });
}

function editarProfessor(siape) {
    const professores = obterDados('professor');
    const professor = professores.find(p => p.siape === siape);

    if (professor) {
        document.getElementById('nome').value = professor.nome;
        document.getElementById('siape').value = professor.siape;
        document.getElementById('email').value = professor.email;
        document.getElementById('situacao').value = professor.situacao;
        document.getElementById('siape').setAttribute('disabled', 'true');
        
        // TODO: Popular todos os campos de restrição com professor.restricoes
        
        document.getElementById('nome').focus();
        alert(`Carregando dados de ${professor.nome} para edição.`);
    }
}


// ----------------------------------------------------------------------
// --- 4. LÓGICA DE CADASTRO DE HORÁRIOS ---
// ----------------------------------------------------------------------

function carregarHorarios() {
    const horarios = obterDados('horario');
    
    // Matutino
    const containerMatutino = document.getElementById('horarios-matutino');
    containerMatutino.innerHTML = '';
    horarios.matutino.forEach(tempo => adicionarCampoHorario('matutino', tempo));

    // Vespertino
    const containerVespertino = document.getElementById('horarios-vespertino');
    containerVespertino.innerHTML = '';
    horarios.vespertino.forEach(tempo => adicionarCampoHorario('vespertino', tempo));

    // Noturno
    const containerNoturno = document.getElementById('horarios-noturno');
    containerNoturno.innerHTML = '';
    horarios.noturno.forEach(tempo => adicionarCampoHorario('noturno', tempo));
}

function adicionarCampoHorario(periodo, valor = '') {
    const container = document.getElementById(`horarios-${periodo}`);
    
    const div = document.createElement('div');
    div.className = 'item-horario';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.name = `${periodo}_horario[]`; // Array de horários
    input.value = valor;
    input.placeholder = 'HH:MM-HH:MM ou INTERVALO';
    
    const btnRemover = document.createElement('button');
    btnRemover.type = 'button';
    btnRemover.className = 'botao-remover-horario';
    btnRemover.textContent = '🗑️';
    btnRemover.onclick = () => div.remove();
    
    div.appendChild(input);
    div.appendChild(btnRemover);
    container.appendChild(div);
}

function salvarHorario() {
    const novosHorarios = {
        matutino: [],
        vespertino: [],
        noturno: []
    };
    
    // Captura os horários dos inputs
    ['matutino', 'vespertino', 'noturno'].forEach(periodo => {
        const inputs = document.querySelectorAll(`#horarios-${periodo} input`);
        inputs.forEach(input => {
            if (input.value.trim()) {
                novosHorarios[periodo].push(input.value.trim().toUpperCase());
            }
        });
    });

    salvarDados('horario', novosHorarios);
    alert('Horários de Períodos salvos com sucesso!');
    carregarHorarios();
}


// ----------------------------------------------------------------------
// --- 5. LÓGICA DE CADASTRO DE TURMAS e DISCIPLINAS (Esboço) ---
// ----------------------------------------------------------------------

function salvarTurma() {
    const form = document.getElementById('form-cadastro-turmas');
    const turma = {
        id: Date.now(), // ID único para a turma
        nome: form.turma_nome.value.trim(),
        modalidade: form.turma_modalidade.value,
        sala: form.turma_sala.value.trim(),
        turno_primario: form.turma_turno_primario.value,
        turno_secundario: form.turma_turno_secundario.value,
    };

    if (!turma.nome || !turma.modalidade) {
        alert('Preencha os campos obrigatórios da turma.');
        return;
    }

    let turmas = obterDados('turma');
    turmas.push(turma);
    salvarDados('turma', turmas);
    alert(`Turma ${turma.nome} salva com sucesso!`);
    form.reset();
    carregarTurmas();
}

function carregarTurmas() {
    const turmas = obterDados('turma');
    const tabelaBody = document.querySelector('#tabela-turmas tbody');
    if (!tabelaBody) return;

    tabelaBody.innerHTML = '';
    turmas.forEach(t => {
        const row = tabelaBody.insertRow();
        row.insertCell().textContent = t.nome;
        row.insertCell().textContent = t.modalidade;
        row.insertCell().textContent = t.sala;
        row.insertCell().textContent = `${t.turno_primario} ${t.turno_secundario ? 'e ' + t.turno_secundario : ''}`;
        
        const cellAcoes = row.insertCell();
        const btnRemover = document.createElement('button');
        btnRemover.className = 'botao-acao botao-remover';
        btnRemover.textContent = '🗑️';
        btnRemover.onclick = () => removerDados('turma', t.id, t.nome);
        cellAcoes.appendChild(btnRemover);
    });
}

function preencherSelectsDisciplina() {
    const turmas = obterDados('turma');
    const professores = obterDados('professor');
    const selectTurma = document.getElementById('disciplina_turma');
    const selectProfessor = document.getElementById('disciplina_professor');
    
    selectTurma.innerHTML = '<option value="">Selecione a Turma</option>';
    turmas.forEach(t => {
        selectTurma.innerHTML += `<option value="${t.id}">${t.nome} (${t.modalidade})</option>`;
    });

    selectProfessor.innerHTML = '<option value="">Selecione o Professor</option>';
    professores.forEach(p => {
        selectProfessor.innerHTML += `<option value="${p.siape}">${p.nome} (SIAPE: ${p.siape})</option>`;
    });
    
    // Lógica para Aglutinação (exige JS para preencher as opções corretamente)
    document.getElementById('disciplina_aulas_semanais').addEventListener('change', preencherAglutinacao);
}

function preencherAglutinacao() {
    const aulasSemanais = parseInt(document.getElementById('disciplina_aulas_semanais').value);
    const selectAglutinacao = document.getElementById('disciplina_aglutinacao');
    selectAglutinacao.innerHTML = '<option value="">Selecione a Aglutinação</option>';

    if (aulasSemanais > 0) {
        // Exemplo de aglutinação para 4 aulas
        if (aulasSemanais === 4) {
             selectAglutinacao.innerHTML += '<option value="2x2">2 Dias de 2 Aulas</option>';
        } else if (aulasSemanais === 3) {
             selectAglutinacao.innerHTML += '<option value="3x1">1 Dia de 3 Aulas</option>';
             selectAglutinacao.innerHTML += '<option value="2+1">1 Dia de 2 Aulas + 1 Dia de 1 Aula</option>';
        } else {
             selectAglutinacao.innerHTML += `<option value="${aulasSemanais}x1">1 Dia de ${aulasSemanais} Aula(s)</option>`;
        }
    }
}

function salvarDisciplina() {
    // Implementar a lógica de salvar e carregar disciplinas, similar a Turmas
    alert('Função salvarDisciplina em construção...');
}

function carregarDisciplinas() {
    // Implementar a lógica de carregar a tabela de disciplinas
}

// ----------------------------------------------------------------------
// --- 6. FUNÇÃO GENÉRICA DE REMOÇÃO E INICIALIZAÇÃO ---
// ----------------------------------------------------------------------

function removerDados(key, id, nome) {
    if (confirm(`Tem certeza que deseja remover ${key} ${nome}?`)) {
        let dados = obterDados(key);
        
        if (key === 'professor') {
            dados = dados.filter(d => d.siape !== id);
        } else {
            // Assume que outros cadastros usam o 'id' (timestamp)
            dados = dados.filter(d => d.id !== id);
        }
        
        salvarDados(key, dados);
        
        // Recarregar a tabela correta
        if (key === 'professor') carregarProfessores();
        if (key === 'turma') carregarTurmas();
        
        alert(`${key} ${nome} removido(a) com sucesso.`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Garante que os dados iniciais existam
    Object.keys(LS_KEYS).forEach(obterDados); 
    
    inicializarNavegacao();
    carregarProfessores(); // Carrega a tabela inicial
    
    // Mapeamento dos botões Salvar genéricos
    document.querySelectorAll('.botao-salvar').forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-save-target');
            if (target === 'professor') salvarProfessor();
            else if (target === 'horario') salvarHorario();
            else if (target === 'turma') salvarTurma();
            else if (target === 'disciplina') salvarDisciplina();
        });
    });
});
