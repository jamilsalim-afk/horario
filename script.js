// --- Definições Globais e Chaves de Local Storage ---
const LS_KEY_PROFESSORES = 'ifro_professores';
const PROFESSORES_INICIAIS = [
    // Seus dados reais (usados apenas para preencher o LocalStorage na primeira vez)
    { siape: '1889267', nome: 'Adriana Aparecida Rigolon', email: 'adriana.rigolon@ifro.edu.br', situacao: 'DE', restricoes: {} },
    { siape: '1046329', nome: 'Agmar Aparecido Felix Chaves', email: 'agmar.chaves@ifro.edu.br', situacao: '40', restricoes: {} },
    // Adicione os outros professores aqui para inicialização
];

// --- 1. Lógica de Gerenciamento de Abas ---

/**
 * Esconde todas as seções de conteúdo e mostra a seção alvo.
 * @param {string} targetId O ID da seção a ser exibida (ex: 'cadastro-professores').
 */
function mostrarConteudoDaAba(targetId) {
    // 1. Esconder todos os conteúdos
    document.querySelectorAll('.aba-conteudo').forEach(section => {
        section.style.display = 'none';
    });

    // 2. Mostrar o conteúdo alvo
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.style.display = 'block';
    } else {
        // Se a seção não existir, exibe uma mensagem ou a aba inicial
        const mainContent = document.getElementById('conteudo-principal');
        mainContent.innerHTML = `<h3 class="titulo-aba">Página em Desenvolvimento</h3><p>O conteúdo para a aba **${targetId.toUpperCase()}** será construído aqui.</p>`;
    }
}

/**
 * Inicializa a navegação, manipulando cliques nos links do menu.
 */
function inicializarNavegacao() {
    const links = document.querySelectorAll('.link-menu, .sub-link-menu');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // 1. Limpar e Ativar classes de estilo
            document.querySelectorAll('.link-menu, .sub-link-menu').forEach(l => l.classList.remove('ativo'));
            this.classList.add('ativo');

            // 2. Obter o ID do conteúdo alvo
            const targetId = this.getAttribute('href').substring(1);
            
            // Se for um link de menu principal (como 'instituicao'), mostre a primeira sub-aba.
            // Para simplificar, vou direcionar diretamente para o ID do submenu (ex: #cadastro-professores)
            
            mostrarConteudoDaAba(targetId);

            // Se for o cadastro de professores, recarregue a lista.
            if (targetId === 'cadastro-professores') {
                carregarProfessores();
            }
        });
    });

    // Mostrar a aba inicial (Cadastro de Professores) no carregamento
    mostrarConteudoDaAba('cadastro-professores');
    document.querySelector('a[href="#cadastro-professores"]').classList.add('ativo');
}


// --- 2. Funções de Persistência de Dados (Local Storage) ---

/**
 * Obtém a lista de professores do Local Storage.
 * Inicializa com dados padrão se estiver vazio.
 * @returns {Array} Lista de professores.
 */
function obterProfessores() {
    let professores = JSON.parse(localStorage.getItem(LS_KEY_PROFESSORES));
    
    if (!professores || professores.length === 0) {
        // Se o Local Storage estiver vazio, inicializa com a lista fornecida
        professores = PROFESSORES_INICIAIS;
        salvarProfessores(professores);
    }
    
    return professores;
}

/**
 * Salva a lista completa de professores no Local Storage.
 * @param {Array} professores Lista de professores a ser salva.
 */
function salvarProfessores(professores) {
    localStorage.setItem(LS_KEY_PROFESSORES, JSON.stringify(professores));
}

// --- 3. Lógica de Cadastro de Professor ---

/**
 * Captura os dados do formulário e salva um novo professor (ou edita um existente).
 */
function salvarProfessor() {
    const nome = document.getElementById('nome').value.trim();
    const siape = document.getElementById('siape').value.trim();
    const email = document.getElementById('email').value.trim();
    const situacao = document.getElementById('situacao').value; // Implementar no HTML
    
    if (!nome || !siape || !email) {
        alert('Por favor, preencha Nome, SIAPE/CPF e E-mail.');
        return;
    }

    let professores = obterProfessores();
    const professorExistenteIndex = professores.findIndex(p => p.siape === siape);

    // TODO: Adicionar a lógica para capturar todas as restrições complexas (PRD/PGD)

    const novoProfessor = {
        nome,
        siape,
        email,
        situacao: situacao || 'DE', // Valor padrão caso o campo 'situacao' não esteja pronto no HTML
        restricoes: {}, // Aqui entrariam todas as restrições (PRD, PGD, dias livres, etc.)
    };

    if (professorExistenteIndex !== -1) {
        // Editar professor existente
        professores[professorExistenteIndex] = { ...professores[professorExistenteIndex], ...novoProfessor };
        alert(`Professor(a) ${nome} (SIAPE: ${siape}) atualizado(a) com sucesso!`);
    } else {
        // Adicionar novo professor
        professores.push(novoProfessor);
        alert(`Professor(a) ${nome} cadastrado(a) com sucesso!`);
    }

    salvarProfessores(professores);
    document.querySelector('.formulario-cadastro form').reset(); // Limpar formulário (você precisa envolver os campos em uma tag <form>)
    carregarProfessores(); // Recarrega a tabela
}

/**
 * Preenche a tabela com a lista atual de professores.
 */
function carregarProfessores() {
    const professores = obterProfessores();
    const tabelaBody = document.querySelector('.lista-professores .tabela-dados tbody');
    if (!tabelaBody) return;

    tabelaBody.innerHTML = ''; // Limpa as linhas existentes

    professores.forEach(professor => {
        const row = tabelaBody.insertRow();
        row.insertCell().textContent = professor.siape;
        row.insertCell().textContent = professor.nome;
        row.insertCell().textContent = professor.email;
        
        const cellAcoes = row.insertCell();
        
        // Botão EDITAR
        const btnEditar = document.createElement('button');
        btnEditar.className = 'botao-acao botao-editar';
        btnEditar.textContent = '✏️ EDITAR';
        btnEditar.onclick = () => editarProfessor(professor.siape);
        cellAcoes.appendChild(btnEditar);

        // Botão REMOVER
        const btnRemover = document.createElement('button');
        btnRemover.className = 'botao-acao botao-remover';
        btnRemover.textContent = '🗑️ REMOVER';
        btnRemover.onclick = () => removerProfessor(professor.siape, professor.nome);
        cellAcoes.appendChild(btnRemover);
    });
}

/**
 * Remove um professor com base no SIAPE/CPF.
 * @param {string} siape SIAPE/CPF do professor.
 * @param {string} nome Nome do professor (para confirmação).
 */
function removerProfessor(siape, nome) {
    if (confirm(`Tem certeza que deseja remover o(a) professor(a) ${nome} (SIAPE: ${siape})?`)) {
        let professores = obterProfessores();
        // Filtra, mantendo apenas os professores cujo SIAPE não corresponde ao alvo
        professores = professores.filter(p => p.siape !== siape);
        salvarProfessores(professores);
        carregarProfessores();
        alert(`Professor(a) ${nome} removido(a) com sucesso.`);
    }
}

/**
 * Carrega os dados de um professor no formulário para edição.
 * @param {string} siape SIAPE/CPF do professor.
 */
function editarProfessor(siape) {
    const professores = obterProfessores();
    const professor = professores.find(p => p.siape === siape);

    if (professor) {
        // Carrega dados básicos
        document.getElementById('nome').value = professor.nome;
        document.getElementById('siape').value = professor.siape;
        document.getElementById('email').value = professor.email;
        
        // O campo SIAPE/CPF deve ser desativado durante a edição para garantir a chave única
        document.getElementById('siape').setAttribute('disabled', 'true');
        
        // Foca no primeiro campo do formulário
        document.getElementById('nome').focus();
        
        // TODO: Carregar todas as restrições (PRD/PGD/Gerais) nos campos de seleção suspensa
        alert(`Carregando dados de ${professor.nome} para edição.`);
    }
}


// --- 4. Inicialização da Aplicação ---

document.addEventListener('DOMContentLoaded', () => {
    // Garante que a lista inicial de professores esteja no Local Storage
    obterProfessores(); 
    
    // Configura os ouvintes de clique e mostra a primeira aba
    inicializarNavegacao();
    
    // Preenche a tabela com os dados iniciais
    carregarProfessores();
    
    // Adiciona o ouvinte de evento ao botão SALVAR
    const botaoSalvar = document.querySelector('.botao-salvar');
    if (botaoSalvar) {
        botaoSalvar.addEventListener('click', salvarProfessor);
    }
});
