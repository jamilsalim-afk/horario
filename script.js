// --- Definições Globais e Chaves de Local Storage ---
const LS_KEYS = {
    professor: 'ifro_professores',
    horario: 'ifro_horarios',
    turma: 'ifro_turmas',
    disciplina: 'ifro_disciplinas',
    calendario_integrado: 'ifro_calendario_integrado',
    calendario_superior: 'ifro_calendario_superior',
};

// Dados iniciais (Professores são os mesmos da resposta anterior, usei um placeholder)
const PROFESSORES_INICIAIS_DATA = [
    { siape: '1889267', nome: 'Adriana Aparecida Rigolon', email: 'adriana.rigolon@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '1046329', nome: 'Agmar Aparecido Felix Chaves', email: 'agmar.chaves@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '1041488', nome: 'Aguinaldo Pereira', email: 'aguinaldo.pereira@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '3137523', nome: 'Alberto Ayres Benicio', email: 'alberto.benicio@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '3495475', nome: 'Aline da Silva Correa Valerio Sakyrabiar', email: 'aline.sakyrabiar@ifro.edu.br', situacao: 'Substituto', restricoes: {} },
    { siape: '1825596', nome: 'Andreia Maciel da Silva', email: 'andreia.maciel@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '3433716', nome: 'Angelica Fernandes Estok', email: 'angelica.estok@ifro.edu.br', situacao: 'Substituto', restricoes: {} },
    { siape: '1810830', nome: 'Angelita Aparecida Coutinho Picazevicz', email: 'angelita.aparecida@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '2240652', nome: 'Arilson Ramos', email: 'arilson.ramos@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '2309875', nome: 'Ayrton Schupp Pinheiro Oliveira', email: 'ayrton.oliveira@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '1132760', nome: 'Barbara Ferreira Fadul', email: 'barbara.fadul@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '3304216', nome: 'Cirlania Pereira Batista', email: 'cirlania.batista@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '2060029', nome: 'Claudemir Miranda Barboza', email: 'claudemir.barboza@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '3503067', nome: 'Claudia Aline Puerari Goncalves', email: 'claudia.puerari@ifro.edu.br', situacao: 'Substituto', restricoes: {} },
    { siape: '1209877', nome: 'Daphne Chiara Antonio', email: 'daphne.chiara@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '2395951', nome: 'Debora Costa Barroso Correa', email: 'debora.correa@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '2046133', nome: 'Dheimy da Silva Novelli', email: 'dheimy.novelli@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '3003852', nome: 'Dhieisi Ebert Bolsanello', email: 'dhieisi.ebert@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '1885797', nome: 'Edmilson Maria de Brito', email: 'edmilson.brito@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '1318225', nome: 'Edna Cristiane da Matta', email: 'edna.matta@ifro.edu.br', situacao: 'Substituto', restricoes: {} },
    { siape: '2157441', nome: 'Eduardo Lucas Jorge Serapiao', email: 'eduardo.lucas@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '1223755', nome: 'Erick Rodrigo de Oliveira Mesquita', email: 'erick.mesquita@ifro.edu.br', situacao: 'Substituto', restricoes: {} },
    { siape: '2322486', nome: 'Eslei Justiniano dos Reis', email: 'eslei.reis@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '1120066', nome: 'Gabriel Tenorio dos Santos', email: 'gabriel.santos@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '3388929', nome: 'Gian Willian Tavares de Souza', email: 'gian.souza@ifro.edu.br', situacao: 'Substituto', restricoes: {} },
    { siape: '2261097', nome: 'Gilson Divino Araujo da Silva', email: 'gilson.silva@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '1424350', nome: 'Gilson Pedro Ranzula', email: 'gilson.ranzula@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '1267347', nome: 'Heloisa Helena Ribeiro de Miranda', email: 'heloisa.miranda@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '3504810', nome: 'Henri Francis Ternes de Oliveira', email: 'henri.oliveira@ifro.edu.br', situacao: 'Substituto', restricoes: {} },
    { siape: '3062344', nome: 'Henrique Silva Servio', email: 'henrique.servio@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '1459246', nome: 'Ingrid Leticia Menezes Barbosa', email: 'ingrid.leticia@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '1934082', nome: 'Iramaia Grespan Ferreira de Aquino', email: 'iramaia.grespan@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '2107472', nome: 'Irlan Cordeiro de Souza', email: 'irlan.cordeiro@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '2046612', nome: 'Isis Lazzarini Foroni', email: 'isis.foroni@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '3494080', nome: 'Jefferson Lemes Pinto', email: 'jefferson.pinto@ifro.edu.br', situacao: 'Substituto', restricoes: {} },
    { siape: '1115608', nome: 'Jhonata Lemos da Silva', email: 'jhonata.silva@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '1900386', nome: 'Joel Martins Braga Junior', email: 'joel.martins@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '2298332', nome: 'Joelson Barral do Espirito Santo', email: 'joelson.santo@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '1866708', nome: 'Jorge da Silva Werneck', email: 'jorge.werneck@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '2119073', nome: 'Jose de Anchieta Almeida da Silva', email: 'jose.silva@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '1251214', nome: 'Jose Nilson Rosa Baraldi Molis', email: 'jose.molis@ifro.edu.br', situacao: 'Substituto', restricoes: {} },
    { siape: '1296169', nome: 'Juliana Ferraz Huback Rodrigues', email: 'juliana.rodrigues@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '1905870', nome: 'Juliana Maria Freitas de Assis Holanda', email: 'juliana.holanda@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '3469321', nome: 'Juliane Lima Araujo', email: 'juliane.araujo@ifro.edu.br', situacao: 'Substituto', restricoes: {} },
    { siape: '1831654', nome: 'Juliano Alves de Deus', email: 'juliano.alves@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '3098146', nome: 'Julio Eduardo Neves dos Santos', email: 'julio.santos@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '1206844', nome: 'Jussara Maria Oliveira de Araujo', email: 'jussara.araujo@ifro.edu.br', situacao: 'Substituto', restricoes: {} },
    { siape: '3501741', nome: 'Leia Marcia dos Santos Kempim', email: 'leia.kempim@ifro.edu.br', situacao: 'Substituto', restricoes: {} },
    { siape: '2354704', nome: 'Leonardo dos Santos Franca Shockness', email: 'leonardo.shockness@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '3421792', nome: 'Lilian Andrea dos Santos', email: 'lilian.santos@ifro.edu.br', situacao: 'Substituto', restricoes: {} },
    { siape: '3499505', nome: 'Lilian Barbosa da Silva Lurde', email: 'lilian.barbosa@ifro.edu.br', situacao: 'Substituto', restricoes: {} },
    { siape: '1084749', nome: 'Lilian Catiuscia Eifler Firme da Silva', email: 'lilian.silva@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '3145683', nome: 'Luciana Alves Ranzula', email: 'luciana.ranzula@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '2164739', nome: 'Magno Batista Amorim', email: 'magno.amorim@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '2161540', nome: 'Marcilei Serafim Germano', email: 'marcilei.germano@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '1094604', nome: 'Marco Aurelio Nunes de Barros', email: 'marco.barros@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '1420464', nome: 'Maria Angelica Petrini', email: 'maria.petrini@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '1818605', nome: 'Maria Cristiana de Freitas da Costa', email: 'maria.cristiana@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '3469237', nome: 'Paula Michelli da Silva Franco Belmont', email: 'paula.belmont@ifro.edu.br', situacao: 'Substituto', restricoes: {} },
    { siape: '1786119', nome: 'Sergio Nunes de Jesus', email: 'sergio.nunes@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '2186164', nome: 'Sirley Leite Freitas', email: 'sirley.freitas@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '1055473', nome: 'Thiago Jose Sampaio Kaiser', email: 'thiago.kaiser@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '2164510', nome: 'Tiago Roberto Silva Santos', email: 'tiago.santos@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '1452652', nome: 'Uberlando Tiburtino Leite', email: 'uberlando@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '1411784', nome: 'Uirande Oliveira Costa', email: 'uirande.costa@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '1886531', nome: 'Vera Lucia Lopes Silveira', email: 'vera.lucia@ifro.edu.br', situacao: 'DE', restricoes: {} },
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
        // ... (lógica de inicialização de professor, horario, turma, disciplina) ...

        // NOVA LÓGICA DE INICIALIZAÇÃO DE CALENDÁRIO: Começa com um objeto vazio para o ano.
        if (key === 'calendario_integrado' || key === 'calendario_superior') {
             // O objeto de dados armazenará pares { 'YYYY-MM-DD': 'TIPO_DIA' }
             dados = {}; 
        } else if (key === 'professor') {
             dados = PROFESSORES_INICIAIS_DATA;
        } else if (key === 'horario') { 
             dados = HORARIOS_INICIES;
        } else {
             dados = [];
        }
        
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
        
        // Chamada de carregamento específica apenas para abas que exigem dados atualizados na tabela
        if (targetId === 'cadastro-professores') {
            carregarProfessores();
        } else if (targetId === 'cadastro-horarios') {
            carregarHorarios();
        } else if (targetId === 'cadastro-turmas') {
            carregarTurmas();
        } else if (targetId === 'cadastro-disciplinas') {
            carregarDisciplinas();
            preencherSelectsDisciplina();
        } else if (targetId === 'cadastro-calendario-integrado') {
            renderizarCalendario('integrado'); // NOVO
        } else if (targetId === 'cadastro-calendario-superior') {
            renderizarCalendario('superior'); // NOVO
        } else if (targetId === 'horario-base-gerar') {
            // Verifica se a grade já foi gerada para evitar loops
            if (!window.lastGeneratedGrade) {
                 gerarHorarioBase(); 
            }
        }
        // As demais abas (relatórios, instituição) não precisam de função de carregamento aqui.
        
    } else {
        // Manipula cliques em IDs que não são uma aba-conteudo, apenas por segurança
        const mainContent = document.getElementById('conteudo-principal');
        mainContent.innerHTML = `<h3 class="titulo-aba">Página em Desenvolvimento</h3><p>O conteúdo para a aba **${targetId.toUpperCase()}** será construído aqui.</p>`;
    }
}

function inicializarNavegacao() {
    // CORREÇÃO CRÍTICA: Definir a variável 'links'
    const links = document.querySelectorAll('.link-menu, .sub-link-menu');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            document.querySelectorAll('.link-menu, .sub-link-menu').forEach(l => l.classList.remove('ativo'));
            this.classList.add('ativo');

            let targetId = this.getAttribute('href').substring(1);
            
          // Tratamento para links de Menu Principal que não são uma seção
    if (targetId === 'cadastro' || targetId === 'instituicao-cadastro') {
        // Se clicar em Cadastro, vai para a primeira sub-aba (Professores)
        targetId = 'cadastro-professores'; 
        // Ativa o sub-link de professores
        const profLink = document.querySelector('a[href="#cadastro-professores"]');
        if (profLink) { // <-- Verificação adicionada
           profLink.classList.add('ativo');
        }
    }
            
            mostrarConteudoDaAba(targetId);
        });
    });

    // Garante que a primeira aba visível seja carregada ao iniciar
    const abaInicial = document.querySelector('.aba-conteudo[style*="block"]');
    if (abaInicial) {
        mostrarConteudoDaAba(abaInicial.id);
    } else {
        // Se nenhuma estiver visível, força a abertura da primeira aba de cadastro
        mostrarConteudoDaAba('cadastro-professores');
    }
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

// Função salvarTurma (Mantenha como está)
function salvarTurma() {
    const form = document.getElementById('form-cadastro-turmas');
    const turma = {
        // ... (lógica existente) ...
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
    
    // Atualiza a lista de turmas no dropdown de Disciplinas
    preencherSelectsDisciplina(); 
}

// Função carregarTurmas (Mantenha como está)
function carregarTurmas() {
    // ... (lógica existente) ...
}


/**
 * Preenche os selects de Turma e Professor na aba de Cadastro de Disciplinas.
 */
function preencherSelectsDisciplina() {
    const turmas = obterDados('turma');
    const professores = obterDados('professor');
    const selectTurma = document.getElementById('disciplina_turma');
    const selectProfessor = document.getElementById('disciplina_professor');
    
    // Limpar e preencher Turmas
    selectTurma.innerHTML = '<option value="">Selecione a Turma</option>';
    turmas.forEach(t => {
        selectTurma.innerHTML += `<option value="${t.id}">${t.nome} (${t.modalidade})</option>`;
    });

    // Limpar e preencher Professores
    selectProfessor.innerHTML = '<option value="">Selecione o Professor</option>';
    professores.forEach(p => {
        selectProfessor.innerHTML += `<option value="${p.siape}">${p.nome} (SIAPE: ${p.siape})</option>`;
    });
    
    // Adiciona o ouvinte para a lógica de Aglutinação
    const aulasInput = document.getElementById('disciplina_aulas_semanais');
    if (!aulasInput.dataset.listenerAdded) { // Evita adicionar múltiplos listeners
        aulasInput.addEventListener('change', preencherAglutinacao);
        aulasInput.dataset.listenerAdded = 'true';
    }
    // Garante que a aglutinação seja preenchida se o valor já existir
    preencherAglutinacao(); 
}

/**
 * Preenche as opções de aglutinação baseadas na quantidade de aulas semanais.
 */
function preencherAglutinacao() {
    const aulasSemanais = parseInt(document.getElementById('disciplina_aulas_semanais').value || 0);
    const selectAglutinacao = document.getElementById('disciplina_aglutinacao');
    const aulasInput = document.getElementById('disciplina_aulas_semanais');
    selectAglutinacao.innerHTML = '<option value="">Selecione a Aglutinação</option>';
    selectAglutinacao.disabled = true;

    if (aulasSemanais < 1) {
        return;
    }

    // A disciplina deve ter o número total de aulas. O sistema deve tentar dividir em blocos.
    // As opções são: 1x1, 2x2, 3x1, 2+1, 2+3, etc.
    // O sistema tentará usar blocos grandes (3 aulas) e blocos médios (2 aulas).
    
    const opcoes = [];
    const aulasRestantes = aulasSemanais;
    
    // 1. Opção de uma aula por dia (Sempre disponível)
    opcoes.push({ value: `1x${aulasSemanais}`, label: `${aulasSemanais} Dia(s) de 1 Aula` });
    
    // 2. Opções de blocos maiores
    if (aulasRestantes % 2 === 0) {
        const blocos2 = aulasRestantes / 2;
        opcoes.push({ value: `${blocos2}x2`, label: `${blocos2} Dia(s) de 2 Aulas` });
    }
    
    if (aulasRestantes % 3 === 0) {
        const blocos3 = aulasRestantes / 3;
        opcoes.push({ value: `${blocos3}x3`, label: `${blocos3} Dia(s) de 3 Aulas` });
    }

    // 3. Combinações Complexas (Ex: 5 e 4 aulas)
    switch (aulasSemanais) {
        case 3:
            opcoes.push({ value: '2+1', label: '1 Dia de 2 Aulas + 1 Dia de 1 Aula' });
            opcoes.push({ value: '3x1', label: '1 Dia de 3 Aulas' });
            break;
        case 4:
            opcoes.push({ value: '2x2', label: '2 Dias de 2 Aulas' });
            break;
        case 5:
            opcoes.push({ value: '3+2', label: '1 Dia de 3 Aulas + 1 Dia de 2 Aulas' });
            break;
        case 6:
            opcoes.push({ value: '2x3', label: '2 Dias de 3 Aulas' });
            opcoes.push({ value: '3x2', label: '3 Dias de 2 Aulas' });
            break;
    }
    
    // Filtra duplicatas e preenche o select
    const uniqueOptions = Array.from(new Set(opcoes.map(o => o.value)))
        .map(value => opcoes.find(o => o.value === value));

    uniqueOptions.forEach(opt => {
        selectAglutinacao.innerHTML += `<option value="${opt.value}">${opt.label}</option>`;
    });

    selectAglutinacao.disabled = false;
    
    // Tenta selecionar o valor atual se estiver em edição
    const disciplinaAtual = document.getElementById('form-cadastro-disciplinas').dataset.editingId;
    if (disciplinaAtual) {
        const disciplina = obterDados('disciplina').find(d => d.id == disciplinaAtual);
        if (disciplina) {
            selectAglutinacao.value = disciplina.aglutinacao || '';
        }
    }
}


/**
 * Salva as informações da disciplina no Local Storage.
 */
function salvarDisciplina() {
    const form = document.getElementById('form-cadastro-disciplinas');
    const disciplina = {
        id: form.dataset.editingId || Date.now(),
        nome: form.disciplina_nome.value.trim(),
        turmaId: form.disciplina_turma.value,
        professorSiape: form.disciplina_professor.value,
        aulasSemanais: parseInt(form.disciplina_aulas_semanais.value),
        aglutinacao: form.disciplina_aglutinacao.value,
        fixaHorario: form.disciplina_fixa_horario.value,
        // TODO: Adicionar campos de dia/hora se 'fixaHorario' for 'SIM'
    };

    if (!disciplina.nome || !disciplina.turmaId || !disciplina.professorSiape || disciplina.aulasSemanais < 1 || !disciplina.aglutinacao) {
        alert('Por favor, preencha todos os campos obrigatórios (Disciplina, Turma, Professor, Aulas Semanais e Aglutinação).');
        return;
    }

    let disciplinas = obterDados('disciplina');
    const index = disciplinas.findIndex(d => d.id == disciplina.id);

    if (index !== -1) {
        disciplinas[index] = disciplina;
        alert(`Disciplina ${disciplina.nome} atualizada com sucesso!`);
    } else {
        disciplinas.push(disciplina);
        alert(`Disciplina ${disciplina.nome} cadastrada com sucesso!`);
    }

    salvarDados('disciplina', disciplinas);
    form.reset();
    form.removeAttribute('data-editing-id');
    document.querySelector('#disciplina_aglutinacao').disabled = true; // Desativa até que as aulas sejam definidas
    carregarDisciplinas();
}

/**
 * Preenche a tabela de Disciplinas Cadastradas.
 */
function carregarDisciplinas() {
    const disciplinas = obterDados('disciplina');
    const turmas = obterDados('turma');
    const professores = obterDados('professor');
    const tabelaBody = document.querySelector('#tabela-disciplinas tbody');
    if (!tabelaBody) return;

    tabelaBody.innerHTML = '';
    
    disciplinas.forEach(d => {
        // Encontra os nomes correspondentes para exibição
        const turma = turmas.find(t => t.id == d.turmaId);
        const professor = professores.find(p => p.siape == d.professorSiape);
        
        const row = tabelaBody.insertRow();
        row.insertCell().textContent = d.nome;
        row.insertCell().textContent = turma ? turma.nome : 'Turma Removida';
        row.insertCell().textContent = professor ? professor.nome : 'Prof. Removido';
        row.insertCell().textContent = d.aulasSemanais;
        row.insertCell().textContent = d.aglutinacao;
        
        const cellAcoes = row.insertCell();
        
        const btnEditar = document.createElement('button');
        btnEditar.className = 'botao-acao botao-editar';
        btnEditar.textContent = '✏️ EDITAR';
        btnEditar.onclick = () => editarDisciplina(d.id);
        cellAcoes.appendChild(btnEditar);

        const btnRemover = document.createElement('button');
        btnRemover.className = 'botao-acao botao-remover';
        btnRemover.textContent = '🗑️ REMOVER';
        btnRemover.onclick = () => removerDados('disciplina', d.id, d.nome);
        cellAcoes.appendChild(btnRemover);
    });
}

/**
 * Carrega os dados de uma disciplina no formulário para edição.
 */
function editarDisciplina(id) {
    const disciplinas = obterDados('disciplina');
    const disciplina = disciplinas.find(d => d.id == id);
    const form = document.getElementById('form-cadastro-disciplinas');

    if (disciplina) {
        form.dataset.editingId = id; // Marca que estamos editando
        
        // Popula campos básicos
        form.disciplina_nome.value = disciplina.nome;
        form.disciplina_turma.value = disciplina.turmaId;
        form.disciplina_professor.value = disciplina.professorSiape;
        form.disciplina_aulas_semanais.value = disciplina.aulasSemanais;
        form.disciplina_fixa_horario.value = disciplina.fixaHorario;
        
        // Recarrega as opções de aglutinação baseadas no número de aulas
        preencherAglutinacao(); 
        // Em seguida, define o valor específico de aglutinação
        form.disciplina_aglutinacao.value = disciplina.aglutinacao;
        
        alert(`Carregando disciplina ${disciplina.nome} para edição.`);
        form.disciplina_nome.focus();
    }
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
    Object.keys(LS_KEYS).forEach(key => obterDados(key)); 
    
    // 1. Inicializa a navegação e listeners de clique
    inicializarNavegacao(); 
    
    // 2. Mapeamento dos botões Salvar genéricos
    document.querySelectorAll('.botao-salvar').forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-save-target');
            
            if (target === 'professor') salvarProfessor();
            else if (target === 'horario') salvarHorario();
            else if (target === 'turma') salvarTurma();
            else if (target === 'disciplina') salvarDisciplina();
            else if (target === 'calendario_integrado') salvarCalendario('integrado');
            else if (target === 'calendario_superior') salvarCalendario('superior');
        });
    });

    // 3. Garante que a primeira aba 'Professores' seja exibida ao carregar.
    // Isso é essencial, pois o CSS inicial não define nenhuma aba como 'block'.
    mostrarConteudoDaAba('cadastro-professores');
    
    // Otimização: Carregar os dados de tabela APENAS ao abrir a aba, 
    // por isso as chamadas de carregarProfessores/carregarTurmas foram movidas 
    // para dentro da função mostrarConteudoDaAba.
});

// ----------------------------------------------------------------------
// --- 7. LÓGICA DE CADASTRO DE CALENDÁRIOS (INTERATIVO CÍCLICO) ---
// ----------------------------------------------------------------------

const NOMES_MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
                     'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const DIAS_CURTOS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

/**
 * Sequência de status ao clicar:
 * LETV -> NAO_LETV -> FERIADO -> RECUPERACAO -> EXAME -> LETV
 */
const CICLO_STATUS = [
    'LETV',          // Padrão (Dia Letivo Normal)
    'NAO_LETV',      // 1 Clique
    'FERIADO',       // 2 Cliques
    'RECUPERACAO',   // 3 Cliques
    'EXAME'          // 4 Cliques
];

/**
 * Renderiza o calendário interativo para o tipo (Integrado ou Superior).
 * @param {string} tipo 'integrado' ou 'superior'.
 */
function renderizarCalendario(tipo) {
    const key = `calendario_${tipo}`;
    const ano = document.getElementById(`cal_${tipo}_ano`).value;
    const containerVisual = document.getElementById(`grade-calendario-${tipo}-visual`);
    const dadosCalendario = obterDados(key);
    
    containerVisual.innerHTML = '';
    
    for (let mes = 0; mes < 12; mes++) {
        const primeiroDia = new Date(ano, mes, 1);
        const ultimoDia = new Date(ano, mes + 1, 0).getDate();
        let diaSemanaInicial = primeiroDia.getDay(); // 0 (Domingo) a 6 (Sábado)

        let htmlMes = `<div class="mes-calendario">
            <h5>${NOMES_MESES[mes]} ${ano}</h5>
            <div class="dias-semana">
                ${DIAS_CURTOS.map(d => `<span>${d}</span>`).join('')}
            </div>
            <div class="grade-dias">`;

        // Insere células vazias para alinhar o primeiro dia
        for (let i = 0; i < diaSemanaInicial; i++) {
            htmlMes += `<div class="dia-vazio"></div>`;
        }

        // Itera sobre os dias do mês
        for (let dia = 1; dia <= ultimoDia; dia++) {
            const dataKey = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
            const tipoDiaSalvo = dadosCalendario[dataKey] || 'LETV'; // Padrão: Dia Letivo
            
            // Adiciona a classe 'fim-semana' para melhor visualização (só estilo)
            const diaSemana = (dia + diaSemanaInicial - 1) % 7; 
            const isWeekend = diaSemana === 0 || diaSemana === 6; // 0=Dom, 6=Sáb

            htmlMes += `<div class="dia-calendario ${isWeekend ? 'fim-semana' : ''}" 
                            data-data="${dataKey}" 
                            data-tipo="${tipoDiaSalvo}"
                            onclick="aplicarTipoDiaCiclico(this)">
                            ${dia}
                        </div>`;
        }

        htmlMes += `</div></div>`;
        containerVisual.innerHTML += htmlMes;
    }
}

/**
 * Aplica o tipo de dia no clique, seguindo o ciclo.
 * @param {HTMLElement} element O elemento do dia clicado.
 */
function aplicarTipoDiaCiclico(element) {
    const tipoAtual = element.getAttribute('data-tipo');
    
    // Encontra o índice atual e calcula o próximo (cíclico)
    let indexAtual = CICLO_STATUS.indexOf(tipoAtual);
    
    // Se não encontrou (erro ou tipo não padrão), começa em LETV
    if (indexAtual === -1) {
        indexAtual = 0;
    }
    
    const proximoIndex = (indexAtual + 1) % CICLO_STATUS.length;
    const novoTipo = CICLO_STATUS[proximoIndex];
    
    // Aplica o novo tipo ao DOM
    element.setAttribute('data-tipo', novoTipo);
}

/**
 * Aplica ações rápidas a vários dias (ex: todas as segundas, ou mês inteiro).
 * @param {string} tipo 'integrado' ou 'superior'.
 * @param {string} acao Tipo de ação ('diaSemana' ou 'mes').
 * @param {number} valor Valor da ação (dia da semana JS: 0-6, ou mês JS: 0-11).
 * @param {string} novoTipo O tipo de dia a ser aplicado.
 */
function aplicarAcaoRapida(tipo, acao, valor, novoTipo) {
    const ano = document.getElementById(`cal_${tipo}_ano`).value;
    const diasAfetados = [];

    document.querySelectorAll(`#grade-calendario-${tipo}-visual .dia-calendario`).forEach(diaElement => {
        const dataKey = diaElement.getAttribute('data-data');
        const data = new Date(dataKey);
        
        let deveAplicar = false;

        if (acao === 'diaSemana') {
            // JS getDay(): 0 (Domingo) a 6 (Sábado).
            // Nossos botões usam 1 (Segunda) a 6 (Sábado).
            // Exemplo: valor 1 (Segunda), data.getDay() deve ser 1.
            if (data.getDay() === valor) {
                 deveAplicar = true;
            }
        }
        // Se acao === 'mes', implementaremos mais tarde.

        if (deveAplicar) {
             diaElement.setAttribute('data-tipo', novoTipo);
             diasAfetados.push(dataKey);
        }
    });

    if (diasAfetados.length > 0) {
        alert(`${diasAfetados.length} dias foram definidos como ${novoTipo}.`);
    } else {
        alert('Nenhum dia foi alterado. Verifique o ano selecionado.');
    }
}

/**
 * Limpa o tipo de dia de todos os dias selecionados (volta para LETV).
 * @param {string} tipo 'integrado' ou 'superior'.
 */
function limparSelecao(tipo) {
    document.querySelectorAll(`#grade-calendario-${tipo}-visual .dia-calendario`).forEach(diaElement => {
        diaElement.setAttribute('data-tipo', 'LETV');
    });
    alert(`Calendário ${tipo} zerado. Todos os dias estão como Letivo Normal (LETV).`);
}

/**
 * Salva o estado atual do calendário do DOM para o Local Storage.
 * @param {string} tipo 'integrado' ou 'superior'.
 */
function salvarCalendario(tipo) {
    const key = `calendario_${tipo}`;
    const ano = document.getElementById(`cal_${tipo}_ano`).value;
    const novosDados = {};
    
    document.querySelectorAll(`#grade-calendario-${tipo}-visual .dia-calendario`).forEach(diaElement => {
        const dataKey = diaElement.getAttribute('data-data');
        const tipoDia = diaElement.getAttribute('data-tipo');
        
        // Salva apenas dias que não são 'LETV' para economizar espaço
        if (tipoDia !== 'LETV') {
            novosDados[dataKey] = tipoDia;
        }
    });
    
    // Salvamos a grade completa do ano em uma única chave.
    // Para salvar anos diferentes, a chave de LS deveria ser dinamica (ex: 'ifro_cal_int_2025')
    // Por enquanto, manteremos a chave simples, focando no ano selecionado.
    
    salvarDados(key, novosDados);
    alert(`Calendário Anual (${ano}) para Cursos ${tipo.toUpperCase()} salvo com sucesso!`);
}

/**
 * Seleciona e aplica o tipo de dia a todos os dias de uma determinada semana (e mês).
 * @param {string} tipo 'integrado' ou 'superior'.
 * @param {number} diaSemana Dia da semana (1=Segunda, 6=Sábado, 0=Domingo).
 */
function selecionarDiaSemana(tipo, diaSemana) {
    const selectTipo = document.getElementById(`cal_${tipo}_tipo`);
    const novoTipo = selectTipo.value;
    
    if (!novoTipo) {
        alert('Selecione um Tipo de Dia antes de usar as Ações Rápidas.');
        return;
    }

    // A função Date.getDay() retorna 0 (Domingo) a 6 (Sábado).
    // Nossa função recebe 1 (Segunda) a 6 (Sábado) e 7 (Domingo, se necessário, mas vamos usar 0-6 do JS).
    // Ajuste: 1=Seg (1), 2=Ter (2), ..., 5=Sex (5), 6=Sab (6), 7=Dom (0)
    
    const diaJS = diaSemana % 7; // Garante que 7 seja 0 (Domingo), mas como só temos 1-6 no botão, vai de 1-6.
    
    document.querySelectorAll(`#grade-calendario-${tipo}-visual .dia-calendario`).forEach(diaElement => {
        const dataKey = diaElement.getAttribute('data-data');
        const data = new Date(dataKey);
        
        // Compara com o dia da semana do JS (1=Seg, 6=Sab)
        if (data.getDay() === diaSemana) {
             diaElement.setAttribute('data-tipo', novoTipo);
        }
    });
}

/**
 * Limpa o tipo de dia de todos os dias selecionados (volta para LETV).
 * @param {string} tipo 'integrado' ou 'superior'.
 */
function limparSelecao(tipo) {
    document.querySelectorAll(`#grade-calendario-${tipo}-visual .dia-calendario`).forEach(diaElement => {
        diaElement.setAttribute('data-tipo', 'LETV');
    });
    alert(`Seleção de ${tipo} limpa. Todos os dias estão como Letivo Normal.`);
}

/**
 * Salva o estado atual do calendário do DOM para o Local Storage.
 * @param {string} tipo 'integrado' ou 'superior'.
 */
function salvarCalendario(tipo) {
    const key = `calendario_${tipo}`;
    const ano = document.getElementById(`cal_${tipo}_ano`).value;
    const novosDados = {};
    
    // Itera sobre todos os dias no DOM
    document.querySelectorAll(`#grade-calendario-${tipo}-visual .dia-calendario`).forEach(diaElement => {
        const dataKey = diaElement.getAttribute('data-data'); // YYYY-MM-DD
        const tipoDia = diaElement.getAttribute('data-tipo');
        
        // Só salva dias que não são 'LETV' (Letivo Normal) para economizar espaço
        if (tipoDia !== 'LETV') {
            novosDados[dataKey] = tipoDia;
        }
    });

    // Pega os dados salvos de anos anteriores e mescla
    // (Por enquanto, apenas sobrescrevemos o ano atual)
    
    salvarDados(key, novosDados);
    alert(`Calendário Anual (${ano}) para Cursos ${tipo.toUpperCase()} salvo com sucesso!`);
}

// ----------------------------------------------------------------------
// --- 8. LÓGICA DE GERAÇÃO DE HORÁRIO BASE (Heurística de Priorização) ---
// ----------------------------------------------------------------------

/**
 * Mapeamento dos dias da semana e períodos.
 */
const DIAS_SEMANA = ['SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA'];

/**
 * Gera a estrutura de todos os slots de horário disponíveis.
 * @returns {Object} Estrutura da grade semanal.
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
                    if (slotTempo !== 'INTERVALO') {
                        // O slot é um objeto que armazenará a disciplina alocada
                        grade[dia][slotTempo] = { 
                            status: 'LIVRE', // LIVRE, ALOCADO, RESTRITO, CALENDARIO
                            periodo: periodo,
                            turmaId: null, // Turma que ocupa o slot
                            disciplinaId: null, // Disciplina alocada
                            professorSiape: null // Professor alocado
                        };
                    }
                });
            }
        });
    });
    
    return grade;
}

/**
 * Aplica restrições de PRD/PGD e a Regra das 11 Horas na grade.
 * Isso deve ser feito ANTES da alocação de disciplinas.
 * @param {Object} grade Grade de horário inicializada.
 * @returns {Object} Grade com restrições aplicadas.
 */
function aplicarRestricoesIniciais(grade) {
    const professores = obterDados('professor');
    const diaPRD = rest.prd_principal?.dia; // <-- 'rest.prd_principal' pode ser undefined
    const periodoPRD = rest.prd_principal?.periodo; // <-- 'rest.prd_principal' pode ser undefined
    // TODO: Implementar a aplicação de restrições de Calendário (Feriados) aqui.

    professores.forEach(prof => {
    const rest = prof.restricoes;
    
        // 1. Aplica PRD/PGD (transforma slots em RESTRITO)
        // Lógica de PRD/PGD é complexa, mas o conceito é simples:
        // Se o professor tem PRD na SEGUNDA/INTEIRO, todos os slots da SEGUNDA ficam "RESTRITOS" para ele.
        
        // Exemplo Simplificado: PRD Principal (SEGUNDA/INTEIRO)
           if (rest.prd_principal && rest.prd_principal.dia && rest.prd_principal.periodo) {
        const diaPRD = rest.prd_principal.dia;
        const periodoPRD = rest.prd_principal.periodo;
        
        if (diaPRD && DIAS_SEMANA.includes(diaPRD)) {
        
        if (diaPRD && DIAS_SEMANA.includes(diaPRD)) {
            // Marca o professor como restrito para todos os slots nesse dia/período
            Object.keys(grade[diaPRD]).forEach(slotTempo => {
                const slotObj = grade[diaPRD][slotTempo];
                // Se o período do slot bate com o período da restrição (ou se é INTEIRO)
                if (periodoPRD === 'INTEIRO' || slotObj.periodo.toUpperCase().startsWith(periodoPRD)) {
                    // Adiciona o SIAPE do professor à lista de restritos para este slot
                    if (!slotObj.restritos) slotObj.restritos = [];
                    slotObj.restritos.push(prof.siape);
                }
            });
        }
        
        // 2. Aplica Regra das 11 Horas de Descanso (Verifica Noturno -> Manhã seguinte)
        // Isso exigiria a ordem dos slots, mas o conceito é: 
        // Se um professor tem aula no último slot da Noite (dia N), ele deve ser RESTRITO nos primeiros slots da Manhã (dia N+1).
    });

    return grade;
}
// ... (Mantenha as definições de DIAS_SEMANA e inicializarGradeVazia) ...

/**
 * Verifica se um professor tem restrição (PGD/PRD/11h) em um slot.
 * @param {string} siape SIAPE do professor.
 * @param {string} dia Dia da semana.
 * @param {string} slotTempo ID do slot de tempo.
 * @param {Object} grade Estrutura de grade (para verificar restritos).
 * @returns {boolean} True se o professor está restrito neste slot.
 */
function professorRestrito(siape, dia, slotTempo, grade) {
    // 1. Verifica Restrições de PRD/PGD
    const slot = grade[dia][slotTempo];
    if (slot && slot.restritos && slot.restritos.includes(siape)) {
        return true;
    }
    
    // 2. Verifica Restrição das 11 Horas (Complexo, mas essencial)
    // Se hoje é segunda e o professor teve aula no último slot da sexta passada, ele deveria ser restrito.
    // Simplificação: Se o professor tem aula no slot NOTURNO (último horário) no dia anterior, ele é restrito no MATUTINO (primeiro horário) de hoje.
    const horarios = obterDados('horario');
    
    const slotsMatutino = horarios.matutino || [];
    const slotsNoturno = horarios.noturno || [];
    
    const isSlotMatutino = slotsMatutino.includes(slotTempo);
    
    if (isSlotMatutino) {
        const diaAnteriorIndex = (DIAS_SEMANA.indexOf(dia) + 4) % 5; // Mapeia 0->4, 1->0, 2->1, etc.
        const diaAnterior = DIAS_SEMANA[diaAnteriorIndex];
        
        // Verifica se o professor está escalado no último slot noturno do dia anterior
        const ultimoSlotNoturno = slotsNoturno[slotsNoturno.length - 1];
        if (grade[diaAnterior] && grade[diaAnterior][ultimoSlotNoturno] && 
            grade[diaAnterior][ultimoSlotNoturno].professorSiape === siape) {
            
            // CONFLITO DE 11 HORAS!
            return true; 
        }
    }
    
    return false;
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
    // CORREÇÃO: Pega os slots do primeiro dia da grade (SEGUNDA) de forma segura.
    const slotTempos = Object.keys(grade.SEGUNDA || {}); 
    
    // Se não houver slots de horário definidos, não há como gerar
    if (slotTempos.length === 0) return null;
    
    for (const dia of DIAS_SEMANA) {
        for (let i = 0; i <= slotTempos.length - numAulas; i++) {
            let blocoLivre = true;
            let slotsCandidatos = [];
            
            // Verifica os N slots consecutivos
            for (let j = 0; j < numAulas; j++) {
                const slotTempo = slotTempos[i + j];
                const slot = grade[dia][slotTempo];
                
                // CRITÉRIOS:
                // 1. Slot deve existir (não ser intervalo)
                // 2. Turma deve estar LIVRE
                // 3. Professor não deve ter restrição (PGD/11h)
                if (!slot || slot.turmaId !== null || professorRestrito(professorSiape, dia, slotTempo, grade)) {
                    blocoLivre = false;
                    break;
                }
                
                // 4. Se for bloco > 1, não deve haver intervalo entre os slots
                if (j > 0) {
                    // Aqui precisaríamos de um mapeamento de tempo para checar se há intervalo no meio.
                    // Simplificação: Assume-se que a lista de slotTempos já removeu os intervalos.
                    // Se o slot estiver em períodos diferentes (ex: último da manhã e primeiro da tarde), é inválido.
                    if (grade[dia][slotTempos[i + j - 1]].periodo !== slot.periodo) {
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
    // 1. Obter Dados
    const disciplinas = obterDados('disciplina');
    const turmas = obterDados('turma');
    const professores = obterDados('professor');
    const dadosCalendario = obterDados('calendario_integrado'); // Usaremos o integrado como base por enquanto
    let grade = inicializarGradeVazia();
    let conflitos = [];
    
    // Etapa 1: Aplica Restrições de Professores (PGD/PRD) na grade
    grade = aplicarRestricoesIniciais(grade); 
    
    // Etapa 2: Priorização das Disciplinas
    // Ordenar para tentar alocar disciplinas mais complexas primeiro (por aglutinação)
    const disciplinasOrdenadas = [...disciplinas].sort((a, b) => b.aulasSemanais - a.aulasSemanais);
    
    // Etapa 3: Alocação com Aglutinação
    disciplinasOrdenadas.forEach(disc => {
        let aulasAlocadas = 0;
        const aulasNecessarias = disc.aulasSemanais;
        
        // Exemplo: Aglutinação "3+2" -> blocos de 3 e 2 aulas
        const partesAglutinacao = disc.aglutinacao.split('+').map(p => {
            if (p.includes('x')) {
                // Ex: "2x2" -> [2, 2]
                const [dias, aulas] = p.split('x').map(Number);
                return Array(dias).fill(aulas);
            }
            return [Number(p)]; // Ex: "3" -> [3]
        }).flat(); // [3, 2]
        
        // Tentativa de alocação para cada bloco necessário (parte da aglutinação)
        let blocosParaAlocar = [...partesAglutinacao];
        
        // Se a aglutinação não foi totalmente definida (ex: 5 aulas, mas aglutinação 2x2), 
        // o resto é alocado individualmente, mas aqui assumimos que partesAglutinacao soma aulasNecessarias.

        const blocosAlocados = [];
        
        // Tenta alocar os blocos maiores primeiro
        blocosParaAlocar.sort((a, b) => b - a);

        blocosParaAlocar.forEach(tamanhoBloco => {
            const bloco = encontrarBlocoAglutinado(grade, tamanhoBloco, disc.turmaId, disc.professorSiape);
            
            if (bloco) {
                // Se um bloco foi encontrado, aloca os slots
                bloco.slots.forEach(slotTempo => {
                    const slot = grade[bloco.dia][slotTempo];
                    slot.status = 'ALOCADO';
                    slot.turmaId = disc.turmaId;
                    slot.disciplinaId = disc.id;
                    slot.professorSiape = disc.professorSiape;
                    aulasAlocadas++;
                });
                blocosAlocados.push(bloco);
            }
        });
        
        // Etapa 4: Reportar Conflitos
        if (aulasAlocadas < aulasNecessarias) {
            conflitos.push({
                disciplina: disc.nome,
                turma: turmas.find(t => t.id === disc.turmaId)?.nome || 'N/A',
                aulasFaltantes: aulasNecessarias - aulasAlocadas,
                motivo: 'FALHA NA AGLUTINAÇÃO ou CONFLITO DE RESTRICÃO'
            });
        }
    });

    // Etapa 5: Renderizar a Grade e Conflitos
    renderizarGradeFinal(grade, conflitos);
    
    // Exibe o diagrama de como o processo se deu.
    // 
}

/**
 * Renderiza a grade de horário na seção de Horário Base.
 * @param {Object} grade Grade de horário gerada.
 * @param {Array} conflitos Lista de conflitos.
 */
function renderizarGradeFinal(grade, conflitos) {
    const secaoHorarioBase = document.getElementById('horario-base-gerar');
    if (!secaoHorarioBase) return;
    
    // Título e Botão de Geração (para reexecutar)
    secaoHorarioBase.innerHTML = `
        <h3 class="titulo-aba">📅 Geração de Horário Base</h3>
        <button class="botao-acao botao-editar" onclick="gerarHorarioBase()">🔄 RE-GERAR HORÁRIO BASE</button>
        <div id="resultado-conflitos"></div>
        <div id="grade-horario-output"></div>
    `;

    // 1. Reportar Conflitos
    const outputConflitos = document.getElementById('resultado-conflitos');
    if (conflitos.length > 0) {
        outputConflitos.innerHTML = `<p class="nota-regra">⚠️ **CONFLITOS ENCONTRADOS (${conflitos.length}):** O sistema não conseguiu alocar todas as aulas.</p>`;
        // ... (código para listar os conflitos em uma tabela)
    } else {
        outputConflitos.innerHTML = `<p class="nota-regra" style="border-left-color: var(--ifro-verde);">✅ **SUCESSO:** Horário Base gerado sem conflitos conhecidos.</p>`;
    }
    
    // 2. Montar a Grade Visual (Apenas para as turmas)
    const outputGrade = document.getElementById('grade-horario-output');
    
    // Simplificando a visualização: Mostrar a grade por Turma, uma de cada vez.
    const turmas = obterDados('turma');
    const professores = obterDados('professor');
    const disciplinas = obterDados('disciplina');
    
    const dropdownTurmas = `<select id="seletor-turma-grade" onchange="renderizarGradeTurma(this.value, grade, turmas, professores, disciplinas)">
        <option value="">Selecione a Turma para Visualizar</option>
        ${turmas.map(t => `<option value="${t.id}">${t.nome}</option>`).join('')}
    </select>`;
    
    outputGrade.innerHTML = `<h4>Visualizar Grade por Turma:</h4>${dropdownTurmas}<div id="grade-turma-visual"></div>`;
    
    // Armazenar a grade gerada globalmente ou no DOM para ser usada na visualização
    window.lastGeneratedGrade = grade;
    
    // Tentativa de renderizar a primeira turma automaticamente
    if (turmas.length > 0) {
        document.getElementById('seletor-turma-grade').value = turmas[0].id;
        renderizarGradeTurma(turmas[0].id, grade, turmas, professores, disciplinas);
    }
}

/**
 * Função utilitária para renderizar a grade de uma turma específica.
 */
function renderizarGradeTurma(turmaId, grade, turmas, professores, disciplinas) {
    // ... (código para inicializar) ...
    const dadosCalendario = obterDados('calendario_integrado'); // Obtem o calendário
    
    // ... (loop slotTempos.forEach) ...
        
        DIAS_SEMANA.forEach(dia => {
            const slot = grade[dia][slotTempo];
            let conteudo = '';
            let classe = 'slot-livre';

            // Primeiro: Checar Restrição do Calendário
            const dataHoje = moment().day(dia).format('YYYY-MM-DD'); // Retorna a data de hoje para o dia da semana atual
            const tipoDia = dadosCalendario[dataHoje] || 'LETV';

            if (tipoDia !== 'LETV') {
                conteudo = tipoDia;
                classe = 'slot-calendario';
            } else if (slot.disciplinaId && slot.turmaId == turmaId) {
                // ... (lógica de slot alocado existente) ...
            } 
            // ... (restante da lógica de slot livre/restrito) ...
            
            html += `<td class="${classe}">${conteudo}</td>`;
        });
    
    const turma = turmas.find(t => t.id == turmaId);
    if (!turma) return;
    
    // Extrai todos os slots únicos para montar o cabeçalho de tempo
    const slotTempos = Object.keys(grade[DIAS_SEMANA[0]]); 
    
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

            if (slot.disciplinaId && slot.turmaId == turmaId) {
                const disc = disciplinas.find(d => d.id === slot.disciplinaId);
                const prof = professores.find(p => p.siape === slot.professorSiape);
                
                conteudo = `${disc.nome} <br> <small>${prof.nome}</small>`;
                classe = 'slot-alocado';
            } else if (slot.restritos && slot.restritos.length > 0) {
                conteudo = 'Restrito';
                classe = 'slot-restrito';
            } else if (slot.status === 'LIVRE') {
                 // conteudo = 'Livre';
            }

            html += `<td class="${classe}">${conteudo}</td>`;
        });
        
        html += `</tr>`;
    });

    html += `</tbody></table>`;
    container.innerHTML = html;
    
    // Se for interessante, podemos mostrar um diagrama da grade
    // 
}
