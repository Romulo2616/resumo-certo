# Estudo Certo - ENEM 📚

Um site inteligente para ajudar alunos do ensino médio a estudar para o ENEM, com chat integrado ao ChatGPT para tirar dúvidas e receber recomendações de questões.

## 🚀 Funcionalidades

- **Seleção de Matérias**: 8 matérias principais do ENEM (Matemática, Física, Química, Biologia, História, Geografia, Português, Literatura)
- **Assuntos Específicos**: Cada matéria possui vários assuntos detalhados (ex: Bhaskara, Trigonometria)
- **Chat Inteligente**: Integração com ChatGPT para tirar dúvidas e explicar conceitos
- **Recomendação de Questões**: IA sugere exercícios práticos após o estudo
- **Design Responsivo**: Interface moderna usando Tailwind CSS
- **Navegação Intuitiva**: Fluxo simples: Matéria → Assunto → Chat

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Framework CSS**: Tailwind CSS
- **Ícones**: Font Awesome
- **API**: OpenAI GPT-3.5-turbo
- **Armazenamento**: LocalStorage para estado da aplicação

## 📁 Estrutura do Projeto

```
front/
├── index.html          # Página inicial - seleção de matérias
├── assuntos.html       # Página de assuntos por matéria
├── chat.html           # Interface do chat com IA
├── css/
│   └── estilo.css      # Estilos customizados
└── js/
    └── scripts.js      # Lógica da aplicação e integração API
```

## ⚙️ Configuração

### 1. Obter Chave da API OpenAI

1. Acesse [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Faça login ou crie uma conta OpenAI
3. Clique em "Create new secret key"
4. Copie a chave gerada (ela aparece apenas uma vez!)

### 2. Configurar a Aplicação

1. Abra o arquivo `js/scripts.js`
2. Encontre a linha:
   ```javascript
   const OPENAI_API_KEY = 'SUA_CHAVE_API_AQUI';
   ```
3. Substitua `'SUA_CHAVE_API_AQUI'` pela sua chave da OpenAI:
   ```javascript
   const OPENAI_API_KEY = 'sk-sua-chave-aqui';
   ```

### 3. Executar a Aplicação

#### Opção 1: Servidor Local
```bash
# Se você tem Python instalado
python -m http.server 8000

# Se você tem Node.js instalado
npx http-server

# Acesse http://localhost:8000
```

#### Opção 2: Live Server (VS Code)
1. Instale a extensão "Live Server" no VS Code
2. Clique com botão direito em `index.html`
3. Selecione "Open with Live Server"

## 🎯 Como Usar

### 1. Selecionar Matéria
- Na página inicial, clique na matéria que deseja estudar
- Cada matéria tem um ícone e cor característicos

### 2. Escolher Assunto
- Selecione o assunto específico dentro da matéria
- Por exemplo: em Matemática você pode escolher "Bhaskara", "Trigonometria", etc.

### 3. Estudar no Chat
- Faça perguntas sobre o assunto
- Use as ações rápidas para começar:
  - "Explique o conceito básico"
  - "Dê um exemplo prático"
  - "Como resolve exercícios?"
  - "Quero questões para praticar"

### 4. Receber Questões
- Após estudar, peça à IA para recomendar questões
- As questões são personalizadas para o assunto estudado

## 📚 Matérias e Assuntos Disponíveis

### Matemática
- Álgebra Básica, Bhaskara, Funções, Trigonometria, Geometria, Progressões, Logaritmos, Análise Combinatória, Probabilidade, Estatística, Matemática Financeira

### Física
- Cinemática, Dinâmica, Estática, Hidrostática, Termodinâmica, Óptica, Ondulatória, Eletrostática, Eletrodinâmica, Magnetismo, Física Moderna

### Química
- Estrutura Atômica, Tabela Periódica, Ligações Químicas, Reações Químicas, Estequiometria, Soluções, Termoquímica, Cinética Química, Equilíbrio Químico, Eletroquímica, Química Orgânica, Isomeria

### Biologia
- Citologia, Histologia, Embriologia, Genética, Evolução, Taxonomia, Anatomia Humana, Fisiologia, Ecologia, Botânica, Zoologia, Microbiologia

### História
- História Antiga, Medieval, Moderna, Contemporânea, Brasil Colônia, Império, República, Guerras Mundiais, Guerra Fria, Ditadura Militar, Nova República

### Geografia
- Cartografia, Geologia, Geomorfologia, Climatologia, Hidrografia, Biogeografia, Demografia, Urbanização, Industrialização, Agropecuária, Globalização, Geopolítica

### Português
- Fonética, Morfologia, Sintaxe, Semântica, Concordância, Regência, Crase, Pontuação, Interpretação de Textos, Gêneros Textuais, Redação, Figuras de Linguagem

### Literatura
- Trovadorismo, Humanismo, Classicismo, Barroco, Arcadismo, Romantismo, Realismo, Naturalismo, Parnasianismo, Simbolismo, Pré-Modernismo, Modernismo

## 🔧 Personalização

### Adicionar Nova Matéria
1. No arquivo `js/scripts.js`, adicione uma nova entrada no objeto `subjectsData`
2. Adicione o card correspondente no `index.html`

### Modificar Assuntos
1. Edite o array `topics` da matéria desejada em `subjectsData`

### Alterar Cores e Estilos
1. Modifique as classes Tailwind nos arquivos HTML
2. Adicione estilos customizados em `css/estilo.css`

## 💡 Dicas de Uso

1. **Seja Específico**: Faça perguntas detalhadas para obter melhores respostas
2. **Use Exemplos**: Peça exemplos práticos para entender melhor os conceitos
3. **Pratique**: Sempre peça questões após estudar um assunto
4. **Navegação**: Use os botões de voltar para navegar entre as páginas
5. **Estado Salvo**: Sua sessão é salva automaticamente no navegador

## 🛡️ Segurança

- **Nunca compartilhe sua chave API**: Mantenha sua chave OpenAI privada
- **Uso Local**: Este projeto é para uso local, não publique com a chave exposta
- **Limite de Uso**: Monitore o uso da API para evitar custos excessivos

## 🆘 Solução de Problemas

### Chat não funciona
- Verifique se a chave da API está configurada corretamente
- Confirme sua conexão com a internet
- Verifique o console do navegador para erros

### Páginas não carregam assuntos
- Limpe o cache do navegador
- Verifique se todos os arquivos estão no local correto

### Problema de CORS
- Execute através de um servidor HTTP (não abra diretamente o arquivo HTML)

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique este README
2. Consulte o console do navegador para erros
3. Verifique a documentação da OpenAI

## 📄 Licença

Este projeto é open source e está disponível sob a licença MIT.

---

**Bons estudos! 🎓**