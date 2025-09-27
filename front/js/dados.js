// Dados das matérias e assuntos para o Estudo Certo - ENEM

const subjectsData = {
    matematica: {
        name: 'Matemática',
        icon: 'fas fa-calculator',
        color: 'blue',
        topics: [
            'Álgebra Básica',
            'Equações do 2º Grau (Bhaskara)',
            'Funções',
            'Trigonometria',
            'Geometria Plana',
            'Geometria Espacial',
            'Progressões',
            'Logaritmos',
            'Análise Combinatória',
            'Probabilidade',
            'Estatística',
            'Matemática Financeira'
        ],
        diverseTopics: [
            'História da Matemática',
            'Matemática no Cotidiano',
            'Resolução de Problemas',
            'Matemática e Tecnologia',
            'Dicas de Cálculo Mental',
            'Erros Comuns em Matemática',
            'Matemática no ENEM',
            'Curiosidades Matemáticas'
        ]
    },
    fisica: {
        name: 'Física',
        icon: 'fas fa-atom',
        color: 'green',
        topics: [
            'Cinemática',
            'Dinâmica',
            'Estática',
            'Hidrostática',
            'Termodinâmica',
            'Óptica',
            'Ondulatória',
            'Eletrostática',
            'Eletrodinâmica',
            'Magnetismo',
            'Física Moderna'
        ],
        diverseTopics: [
            'Física no Dia a Dia',
            'Experimentos Simples',
            'Grandes Físicos da História',
            'Física e Meio Ambiente',
            'Unidades de Medida',
            'Física no Esporte',
            'Tecnologia e Física',
            'Fenômenos Naturais'
        ]
    },
    quimica: {
        name: 'Química',
        icon: 'fas fa-flask',
        color: 'purple',
        topics: [
            'Estrutura Atômica',
            'Tabela Periódica',
            'Ligações Químicas',
            'Reações Químicas',
            'Estequiometria',
            'Soluções',
            'Termoquímica',
            'Cinética Química',
            'Equilíbrio Químico',
            'Eletroquímica',
            'Química Orgânica',
            'Isomeria'
        ],
        diverseTopics: [
            'Química no Cotidiano',
            'Segurança no Laboratório',
            'Química dos Alimentos',
            'Química e Medicina',
            'Poluição e Química',
            'Nomenclatura Química',
            'Grandes Químicos',
            'Química Verde'
        ]
    },
    biologia: {
        name: 'Biologia',
        icon: 'fas fa-dna',
        color: 'emerald',
        topics: [
            'Citologia',
            'Histologia',
            'Embriologia',
            'Genética',
            'Evolução',
            'Taxonomia',
            'Anatomia Humana',
            'Fisiologia',
            'Ecologia',
            'Botânica',
            'Zoologia',
            'Microbiologia'
        ],
        diverseTopics: [
            'Biodiversidade Brasileira',
            'Biotecnologia',
            'Saúde e Doenças',
            'Biologia Molecular',
            'Conservação Ambiental',
            'Alimentação Saudável',
            'Primeiros Socorros',
            'Biologia Forense'
        ]
    },
    historia: {
        name: 'História',
        icon: 'fas fa-landmark',
        color: 'yellow',
        topics: [
            'História Antiga',
            'História Medieval',
            'História Moderna',
            'História Contemporânea',
            'Brasil Colônia',
            'Brasil Império',
            'Brasil República',
            'Primeira Guerra Mundial',
            'Segunda Guerra Mundial',
            'Guerra Fria',
            'Ditadura Militar',
            'Nova República'
        ],
        diverseTopics: [
            'História Local e Regional',
            'Patrimônio Histórico',
            'Historiografia',
            'Fontes Históricas',
            'História Oral',
            'Museus e Arquivos',
            'Cronologia Histórica',
            'História das Mentalidades'
        ]
    },
    geografia: {
        name: 'Geografia',
        icon: 'fas fa-globe-americas',
        color: 'teal',
        topics: [
            'Cartografia',
            'Geologia',
            'Geomorfologia',
            'Climatologia',
            'Hidrografia',
            'Biogeografia',
            'Demografia',
            'Urbanização',
            'Industrialização',
            'Agropecuária',
            'Globalização',
            'Geopolítica'
        ],
        diverseTopics: [
            'Geografia do Brasil',
            'Desastres Naturais',
            'Sustentabilidade',
            'Turismo e Geografia',
            'Geografia Urbana',
            'Sensoriamento Remoto',
            'SIG - Sistemas de Informação Geográfica',
            'Geografia Cultural'
        ]
    },
    portugues: {
        name: 'Português',
        icon: 'fas fa-book',
        color: 'red',
        topics: [
            'Fonética e Fonologia',
            'Morfologia',
            'Sintaxe',
            'Semântica',
            'Concordância',
            'Regência',
            'Crase',
            'Pontuação',
            'Interpretação de Textos',
            'Gêneros Textuais',
            'Redação',
            'Figuras de Linguagem'
        ],
        diverseTopics: [
            'Variações Linguísticas',
            'Português do Brasil vs Portugal',
            'Estrangeirismos',
            'Oratória e Comunicação',
            'Redação para Concursos',
            'Leitura Dinâmica',
            'Técnicas de Estudo',
            'Língua e Sociedade'
        ]
    },
    literatura: {
        name: 'Literatura',
        icon: 'fas fa-feather-alt',
        color: 'pink',
        topics: [
            'Trovadorismo',
            'Humanismo',
            'Classicismo',
            'Barroco',
            'Arcadismo',
            'Romantismo',
            'Realismo',
            'Naturalismo',
            'Parnasianismo',
            'Simbolismo',
            'Pré-Modernismo',
            'Modernismo'
        ],
        diverseTopics: [
            'Literatura Contemporânea',
            'Literatura Africana de Língua Portuguesa',
            'Crítica Literária',
            'Teoria Literária',
            'Literatura Comparada',
            'Adaptações Cinematográficas',
            'Literatura Digital',
            'Grandes Autores Brasileiros'
        ]
    }
};

// Exportar dados para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { subjectsData };
}