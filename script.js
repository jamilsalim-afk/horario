// --- Definições Globais e Chaves de Local Storage ---
const LS_KEYS = {
    professor: 'ifro_professores',
    horario: 'ifro_horarios',
    turma: 'ifro_turmas',
    disciplina: 'ifro_disciplinas',
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
    Object.keys(LS_KEYS).forEach(obterDados); 
    
    inicializarNavegacao();
    carregarProfessores(); // Carrega a tabela inicial de Professores
    carregarTurmas(); // Carrega a tabela inicial de Turmas
    carregarDisciplinas(); // Carrega a tabela inicial de Disciplinas
    
    // Garante que os selects de disciplina estejam prontos
    preencherSelectsDisciplina(); 
    
    // Mapeamento dos botões Salvar genéricos (Mantenha este bloco como está)
    document.querySelectorAll('.botao-salvar').forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-save-target');
            if (target === 'professor') salvarProfessor();
            else if (target === 'horario') salvarHorario();
            else if (target === 'turma') salvarTurma();
            else if (target === 'disciplina') salvarDisciplina(); // Novo mapeamento
        });
    });
});
