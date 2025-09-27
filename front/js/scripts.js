// Configuração da API OpenAI
const OPENAI_API_KEY = ''; // Substitua pela sua chave da OpenAI
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// Estado global da aplicação
let currentState = {
    subject: null,
    topic: null,
    topicType: 'principais', // 'principais' ou 'diversos'
    chatHistory: []
};

// Utilitários
function saveState() {
    localStorage.setItem('estudoCertoState', JSON.stringify(currentState));
}

function loadState() {
    const saved = localStorage.getItem('estudoCertoState');
    if (saved) {
        currentState = JSON.parse(saved);
    }
}

function goBack() {
    const currentPage = window.location.pathname.split('/').pop();

    if (currentPage === 'chat.html') {
        window.location.href = 'assuntos.html';
    } else if (currentPage === 'assuntos.html') {
        window.location.href = 'index.html';
    }
}

// Página inicial - Seleção de matérias
function initIndexPage() {
    if (!window.location.pathname.includes('index.html') && window.location.pathname === '/') return;

    const subjectCards = document.querySelectorAll('.subject-card');

    subjectCards.forEach(card => {
        card.addEventListener('click', function () {
            const subject = this.dataset.subject;
            currentState.subject = subject;
            currentState.topic = null;
            currentState.topicType = 'principais';
            currentState.chatHistory = [];
            saveState();
            window.location.href = 'assuntos.html';
        });
    });
}

// Página de assuntos
function initAssuntosPage() {
    if (!window.location.pathname.includes('assuntos.html')) return;

    loadState();

    if (!currentState.subject) {
        window.location.href = 'index.html';
        return;
    }

    const subjectData = subjectsData[currentState.subject];
    if (!subjectData) {
        window.location.href = 'index.html';
        return;
    }

    // Atualizar cabeçalho
    document.getElementById('subject-name').textContent = subjectData.name;
    document.getElementById('subject-title').textContent = subjectData.name;

    // Atualizar ícone
    const iconElement = document.querySelector('#subject-icon i');
    iconElement.className = `${subjectData.icon} text-3xl text-${subjectData.color}-600`;
    document.getElementById('subject-icon').className = `w-20 h-20 bg-${subjectData.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`;

    // Configurar abas
    setupTabs(subjectData);

    // Carregar assuntos principais por padrão
    loadTopics(subjectData.topics, subjectData, 'principais');
}

function setupTabs(subjectData) {
    const tabMain = document.getElementById('tab-main');
    const tabDiverse = document.getElementById('tab-diverse');

    tabMain.addEventListener('click', function () {
        setActiveTab('main');
        loadTopics(subjectData.topics, subjectData, 'principais');
    });

    tabDiverse.addEventListener('click', function () {
        setActiveTab('diverse');
        loadTopics(subjectData.diverseTopics, subjectData, 'diversos');
    });
}

function setActiveTab(activeTab) {
    const tabMain = document.getElementById('tab-main');
    const tabDiverse = document.getElementById('tab-diverse');

    // Remover classes ativas
    tabMain.classList.remove('bg-indigo-600', 'text-white');
    tabMain.classList.add('bg-gray-200', 'text-gray-700');

    tabDiverse.classList.remove('bg-indigo-600', 'text-white');
    tabDiverse.classList.add('bg-gray-200', 'text-gray-700');

    // Adicionar classe ativa à aba selecionada
    if (activeTab === 'main') {
        tabMain.classList.remove('bg-gray-200', 'text-gray-700');
        tabMain.classList.add('bg-indigo-600', 'text-white');
    } else {
        tabDiverse.classList.remove('bg-gray-200', 'text-gray-700');
        tabDiverse.classList.add('bg-indigo-600', 'text-white');
    }
}

function loadTopics(topics, subjectData, type) {
    const topicsContainer = document.getElementById('topics-container');
    topicsContainer.innerHTML = '';

    // Adicionar animação de fade
    topicsContainer.style.opacity = '0';

    setTimeout(() => {
        topics.forEach((topic, index) => {
            const topicCard = document.createElement('div');
            topicCard.className = 'topic-card bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1';

            const iconClass = type === 'diversos' ? 'fas fa-lightbulb' : 'fas fa-arrow-right';
            const description = type === 'diversos' ? 'Assunto complementar e interdisciplinar' : 'Clique para estudar este assunto';

            topicCard.innerHTML = `
                <div class="p-6">
                    <div class="flex items-center justify-between mb-3">
                        <h3 class="text-lg font-semibold text-gray-900">${topic}</h3>
                        <i class="${iconClass} text-${subjectData.color}-600"></i>
                    </div>
                    <p class="text-gray-600 text-sm">${description}</p>
                    ${type === 'diversos' ? `<span class="inline-block mt-2 px-2 py-1 bg-${subjectData.color}-100 text-${subjectData.color}-700 text-xs rounded-full">Diversos</span>` : ''}
                </div>
            `;

            topicCard.addEventListener('click', function () {
                currentState.topic = topic;
                currentState.topicType = type;
                currentState.chatHistory = [];
                saveState();
                window.location.href = 'chat.html';
            });

            topicsContainer.appendChild(topicCard);
        });

        // Fade in
        topicsContainer.style.opacity = '1';
    }, 150);
}

// Página do chat
function initChatPage() {
    if (!window.location.pathname.includes('chat.html')) return;

    loadState();

    if (!currentState.subject || !currentState.topic) {
        window.location.href = 'index.html';
        return;
    }

    const subjectData = subjectsData[currentState.subject];

    // Atualizar cabeçalho
    document.getElementById('current-subject').textContent = subjectData.name;
    document.getElementById('current-topic').textContent = currentState.topic;
    document.getElementById('topic-name').textContent = currentState.topic;

    // Mostrar badge se for assunto diverso
    const topicTypeBadge = document.getElementById('topic-type-badge');
    if (currentState.topicType === 'diversos') {
        topicTypeBadge.classList.remove('hidden');
        topicTypeBadge.textContent = 'Diversos';
        topicTypeBadge.className = `ml-2 px-2 py-1 bg-${subjectData.color}-100 text-${subjectData.color}-700 text-xs rounded-full`;
    } else {
        topicTypeBadge.classList.add('hidden');
    }

    // Configurar eventos
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const quickActions = document.querySelectorAll('.quick-action');

    // Evento de envio
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Ações rápidas
    quickActions.forEach(button => {
        button.addEventListener('click', function () {
            const message = this.textContent;
            messageInput.value = message;
            sendMessage();
        });
    });

    // Carregar histórico do chat se existir
    loadChatHistory();
}

function loadChatHistory() {
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML = '';

    currentState.chatHistory.forEach(message => {
        addMessageToChat(message.content, message.isUser);
    });

    if (currentState.chatHistory.length === 0) {
        // Mensagem inicial da IA
        const initialMessage = `Olá! Vamos estudar ${currentState.topic} em ${subjectsData[currentState.subject].name}. Como posso ajudá-lo hoje?`;
        addMessageToChat(initialMessage, false);
    }
}

function addMessageToChat(message, isUser) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');

    if (isUser) {
        messageDiv.className = 'flex justify-end';
        messageDiv.innerHTML = `
            <div class="bg-indigo-600 text-white p-4 rounded-lg max-w-2xl">
                <p>${message}</p>
            </div>
        `;
    } else {
        messageDiv.className = 'flex justify-start';
        messageDiv.innerHTML = `
            <div class="flex items-start max-w-2xl">
                <div class="flex-shrink-0 mr-3">
                    <div class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <i class="fas fa-robot text-gray-600 text-sm"></i>
                    </div>
                </div>
                <div class="bg-white border p-4 rounded-lg">
                    <div class="prose prose-sm max-w-none">
                        ${formatMessage(message)}
                    </div>
                </div>
            </div>
        `;
    }

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function formatMessage(message) {
    // Converter markdown simples para HTML
    let formatted = message
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>');

    return `<p>${formatted}</p>`;
}

async function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const message = messageInput.value.trim();

    if (!message) return;

    // Desabilitar input
    messageInput.disabled = true;
    sendButton.disabled = true;
    messageInput.value = '';

    // Adicionar mensagem do usuário
    addMessageToChat(message, true);
    currentState.chatHistory.push({ content: message, isUser: true });

    // Mostrar indicador de carregamento
    showLoading(true);

    try {
        // Chamar API do OpenAI
        const response = await callOpenAI(message);

        // Adicionar resposta da IA
        addMessageToChat(response, false);
        currentState.chatHistory.push({ content: response, isUser: false });

        saveState();
    } catch (error) {
        console.error('Erro ao chamar API:', error);
        addMessageToChat('Desculpe, ocorreu um erro. Tente novamente.', false);
    } finally {
        // Reabilitar input
        messageInput.disabled = false;
        sendButton.disabled = false;
        messageInput.focus();
        showLoading(false);
    }
}

async function callOpenAI(userMessage) {
    // Verificar se a chave da API foi configurada
    if (OPENAI_API_KEY === 'SUA_CHAVE_API_AQUI') {
        return `**Configuração necessária:** Para usar o chat, você precisa configurar sua chave da API OpenAI no arquivo \`js/scripts.js\`.

**Como obter a chave:**
1. Acesse https://platform.openai.com/api-keys
2. Faça login ou crie uma conta
3. Gere uma nova chave de API
4. Substitua "SUA_CHAVE_API_AQUI" pela sua chave no código

**Simulação de resposta para ${currentState.topic}:**
Este é um exemplo de como a IA responderia sobre ${currentState.topic}. Com a API configurada, você terá respostas personalizadas e inteligentes para suas dúvidas de estudo.`;
    }

    const topicTypeText = currentState.topicType === 'diversos' ? 'um assunto complementar e interdisciplinar' : 'um assunto específico';
    const systemMessage = `Você é um assistente especializado em ensinar ${subjectsData[currentState.subject].name} para alunos do ensino médio que estão se preparando para o ENEM. 

Contexto atual:
- Matéria: ${subjectsData[currentState.subject].name}
- Assunto específico: ${currentState.topic}
- Tipo: ${topicTypeText}

Diretrizes:
- Seja didático e use linguagem clara
- Dê exemplos práticos quando possível
- Relacione com questões do ENEM quando relevante
- Se o aluno pedir questões ou exercícios, forneça problemas no estilo ENEM
- Seja encorajador e motivador
- Use formatação markdown para melhor legibilidade
${currentState.topicType === 'diversos' ? '- Este é um assunto complementar, então explore conexões interdisciplinares e aplicações práticas' : ''}`;

    const messages = [
        { role: 'system', content: systemMessage },
        ...currentState.chatHistory.map(msg => ({
            role: msg.isUser ? 'user' : 'assistant',
            content: msg.content
        })),
        { role: 'user', content: userMessage }
    ];

    const response = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: messages,
            max_tokens: 1000,
            temperature: 0.7
        })
    });

    if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

function showLoading(show) {
    const loadingIndicator = document.getElementById('loading-indicator');
    if (show) {
        loadingIndicator.classList.remove('hidden');
    } else {
        loadingIndicator.classList.add('hidden');
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', function () {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    switch (currentPage) {
        case 'index.html':
        case '':
            initIndexPage();
            break;
        case 'assuntos.html':
            initAssuntosPage();
            break;
        case 'chat.html':
            initChatPage();
            break;
    }
});

// Limpar estado quando necessário
function clearState() {
    localStorage.removeItem('estudoCertoState');
    currentState = { subject: null, topic: null, chatHistory: [] };
}