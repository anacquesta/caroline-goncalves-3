export interface JournalItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  vehicle: string;
  date: string;
  category: string;
  impactMetrics: string;
  summary: string;
  fullContent: string[];
  imageUrl: string;
  externalUrl?: string;
  readTime: string;
}

export interface PhotoItem {
  id: string;
  title: string;
  album: string;
  location: string;
  year: string;
  cameraSpecs: string;
  imageUrl: string;
  aspectRatio: string;
  description: string;
  featured: boolean;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  client: string;
  year: string;
  category: string;
  scope: string[];
  summary: string;
  results: string;
  fullStory: string[];
  coverImage: string;
  galleryImages: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface BlogPostItem {
  id: string;
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  date: string;
  category: string;
  readTime: string;
  excerpt: string;
  content: string[];
  coverImage: string;
  quote?: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization: string;
  year: string;
}

export interface PortfolioProfile {
  name: string;
  role: string;
  subRole: string;
  edition: string;
  location: string;
  headline: string;
  currentCompany: string;
  currentRole: string;
  education: string;
  postGrad: string;
  bioIntro: string;
  bioFull: string[];
  manifesto: string[];
  skills: {
    jornalismo: string[];
    fotografia: string[];
    estrategia: string[];
  };
  contact: {
    email: string;
    whatsapp: string;
    whatsappFormatted: string;
    instagram: string;
    linkedin: string;
    locationDetailed: string;
  };
}

export const INITIAL_PROFILE: PortfolioProfile = {
  name: "Caroline Gonçalves",
  role: "Jornalista, Fotógrafa e Comunicadora",
  subRole: "Repórter de Redes Sociais no Metrópoles",
  edition: "PORTFÓLIO / 2026",
  location: "Brasília — DF",
  headline: "Olhar apurado para narrativas visuais, precisão jornalística e comunicação estratégica com impacto social.",
  currentCompany: "Metrópoles",
  currentRole: "Repórter de Redes Sociais",
  education: "Comunicação Social — Jornalismo",
  postGrad: "Marketing Estratégico Digital",
  bioIntro: "Atuando no epicentro da apuração jornalística na capital do país, uno a vivência dinâmica de redação em tempo real com a sensibilidade autoral da fotografia documental e a visão analítica de métricas digitais.",
  bioFull: [
    "Minha trajetória é guiada pela convicção de que toda história merece ser contada com verdade, dignidade e apuro estético. Como Repórter de Redes Sociais no Metrópoles — um dos maiores e mais velozes portais de notícias do Brasil —, vivencio diariamente o desafio de traduzir fatos complexos em formatos nativos que capturam atenção e geram reflexão.",
    "Formada em Comunicação Social com habilitação em Jornalismo e pós-graduada em Marketing Estratégico Digital, construí uma atuação multidisciplinar que abrange desde a apuração minuciosa e redação de reportagens até a cobertura fotográfica in loco, gestão de crises em redes sociais e planejamento transmídia de campanhas institucionais.",
    "Acredito no poder da imagem como extensão da escuta ativa. Minha câmera não é apenas um instrumento técnico, mas uma ferramenta de aproximação com os sujeitos das notícias — das manifestações populares na Esplanada dos Ministérios às narrativas anônimas dos cantos do Distrito Federal."
  ],
  manifesto: [
    "OLHAR. Registrar o invisível aos olhos apressados.",
    "ESCUTAR. Ouvir com empatia antes de narrar.",
    "CONTAR. Comunicar com rigor, beleza e responsabilidade ética."
  ],
  skills: {
    jornalismo: [
      "Reportagem & Investigação",
      "Cobertura em Tempo Real",
      "Entrevistas em Profundidade",
      "Assessoria de Imprensa",
      "Clipping & Monitoramento",
      "Checagem & Ética Editorial"
    ],
    fotografia: [
      "Fotojornalismo Documental",
      "Retratos Editoriais",
      "Arquitetura & Cidades",
      "Cobertura de Eventos & Protestos",
      "Tratamento de Imagem Raw",
      "Direção de Fotografia"
    ],
    estrategia: [
      "Marketing Estratégico Digital",
      "Storytelling para Redes Sociais",
      "Produção de Conteúdo em Vídeo",
      "Análise de Dados & Métricas",
      "Gestão de Crise de Imagem",
      "Branded Content Editorial"
    ]
  },
  contact: {
    email: "caroline.goncalves.jornalismo@gmail.com",
    whatsapp: "5561992348877",
    whatsappFormatted: "+55 (61) 99234-8877",
    instagram: "carolinegoncalves.jor",
    linkedin: "caroline-goncalves-comunicacao",
    locationDetailed: "Brasília — DF • Brasil • 15°47'38\"S 47°52'58\"W"
  }
};

export const INITIAL_JOURNALISM: JournalItem[] = [
  {
    id: "jrn-01",
    slug: "bastidores-do-poder-esplanada",
    title: "Nos Corredores do Poder: A Dança das Decisões e o Pulso do Planalto",
    subtitle: "Cobertura em tempo real e bastidores da política nacional na Esplanada dos Ministérios.",
    vehicle: "Metrópoles",
    date: "Janeiro 2026",
    category: "Política & Poder",
    impactMetrics: "2.4M de visualizações • 82 mil compartilhamentos",
    summary: "Uma imersão visual e textual na rotina de apuração direta no Congresso e Palácio do Planalto, desmistificando o vocabulário das decisões governamentais para o público digital.",
    fullContent: [
      "A rotina de apurar notícias políticas no coração de Brasília exige agilidade extrema sem qualquer renúncia ao rigor factual. Entre uma votação nominal e uma coletiva de imprensa improvisada na chapelaria, os segundos contam tanto quanto a verificação das fontes.",
      "No Metrópoles, o desafio foi transformar os bastidores sisudos das comissões em conteúdos audiovisuais dinâmicos, com linguagem direta e recursos de contextualização histórica. Cada vídeo publicado em menos de 10 minutos após um fato relevante gerava discussões embasadas no feed de milhões de brasileiros.",
      "A fotografia desempenhou papel crucial: focar nas expressões de tensão, nos apertos de mão informais e na arquitetura monumental que muitas vezes apequena o indivíduo perante a magnitude da República."
    ],
    imageUrl: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1400&auto=format&fit=crop",
    externalUrl: "https://www.metropoles.com",
    readTime: "4 min de leitura"
  },
  {
    id: "jrn-02",
    slug: "vozes-invisiveis-do-distrito-federal",
    title: "Além dos Monumentos: As Histórias Anônimas que Erguem o DF",
    subtitle: "Grande reportagem multimídia sobre os trabalhadores das cidades satélites.",
    vehicle: "Metrópoles Especial",
    date: "Novembro 2025",
    category: "Direitos Humanos",
    impactMetrics: "1.8M de alcance orgânico • Prêmio Regional de Jornalismo",
    summary: "Ensaio aprofundado com personagens de Ceilândia, Samambaia e Estrutural, revelando a pulsação humana que contrasta com o concreto modernista da capital planejada.",
    fullContent: [
      "Brasília é frequentemente retratada por suas curvas de Oscar Niemeyer e pelos palácios de mármore branco. No entanto, sua verdadeira musculatura reside nos milhares de brasileiros que cruzam diariamente dezenas de quilômetros das regiões administrativas até o Plano Piloto.",
      "Ao longo de três meses de apuração de campo, visitei feiras livres, terminais de ônibus e cooperativas de reciclagem. Ouvir sem pressa foi a regra de ouro desta reportagem investigativa.",
      "O resultado foi uma série especial em texto, podcast e galeria de retratos em preto e branco que deu visibilidade a demandas urgentes de saneamento, transporte público e memória afetiva coletiva."
    ],
    imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1400&auto=format&fit=crop",
    externalUrl: "https://www.metropoles.com",
    readTime: "6 min de leitura"
  },
  {
    id: "jrn-03",
    slug: "cultura-efervescente-cerrado",
    title: "O Renascimento Cultural sob o Céu de Brasília",
    subtitle: "Movimentos independentes de música, teatro e ocupação pública nos pilotis.",
    vehicle: "Metrópoles Caderno B",
    date: "Setembro 2025",
    category: "Cultura & Sociedade",
    impactMetrics: "950k impressões • 34k interações diretas",
    summary: "Investigação sobre como coletivos de jovens artistas ressignificam o espaço público tombado através de intervenções urbanas, saraus e festivais comunitários.",
    fullContent: [
      "Os amplos pilotis dos blocos residenciais e as praças monumentais ganharam uma nova vida com a juventude brasiliense. Coletivos periféricos e artistas do centro se unem para desconstruir a ideia de uma cidade fria e burocrática.",
      "Nesta série de reportagens, cobri festivais autônomos, batalhas de rima e exposições clandestinas que provam a vitalidade artística pulsante no Planalto Central.",
      "A cobertura integrou reels com edição sincopada, galerias fotográficas no Instagram e artigos aprofundados no portal, alcançando um público jovem tradicionalmente distante dos jornais impressos."
    ],
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1400&auto=format&fit=crop",
    externalUrl: "https://www.metropoles.com",
    readTime: "5 min de leitura"
  }
];

export const INITIAL_PHOTOS: PhotoItem[] = [
  {
    id: "ph-01",
    title: "O Céu de Vidro e Concreto",
    album: "Arquitetura & Poder",
    location: "Congresso Nacional, Brasília — DF",
    year: "2025",
    cameraSpecs: "28mm • f/8.0 • 1/640s • ISO 100",
    imageUrl: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?q=80&w=1600&auto=format&fit=crop",
    aspectRatio: "16/10",
    description: "Geometria modernista dos edifícios governamentais sob a luz dourada do entardecer do cerrado.",
    featured: true
  },
  {
    id: "ph-02",
    title: "Olhar de Resistência",
    album: "Retratos & Cotidiano",
    location: "Feira Central de Ceilândia — DF",
    year: "2025",
    cameraSpecs: "50mm • f/1.8 • 1/250s • ISO 200",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1600&auto=format&fit=crop",
    aspectRatio: "3/4",
    description: "Retrato natural de uma feirante pioneira que chegou a Brasília na década de 1970.",
    featured: true
  },
  {
    id: "ph-03",
    title: "Vigília Republicana",
    album: "Fotojornalismo",
    location: "Praça dos Três Poderes, Brasília — DF",
    year: "2026",
    cameraSpecs: "85mm • f/2.2 • 1/125s • ISO 800",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1600&auto=format&fit=crop",
    aspectRatio: "4/3",
    description: "Silhuetas de jornalistas e cinegrafistas aguardando pronunciamento oficial na madrugada política.",
    featured: true
  },
  {
    id: "ph-04",
    title: "Pilotis e Sombras",
    album: "Arquitetura & Poder",
    location: "Superquadra 308 Sul, Brasília — DF",
    year: "2025",
    cameraSpecs: "35mm • f/4.0 • 1/400s • ISO 100",
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop",
    aspectRatio: "1/1",
    description: "O jogo contínuo entre os cobogós, luz solar direta e a tranquilidade dos jardins de Burle Marx.",
    featured: false
  },
  {
    id: "ph-05",
    title: "Ritmo e Chama",
    album: "Cultura & Ensaios",
    location: "Teatro Nacional Claudio Santoro — DF",
    year: "2025",
    cameraSpecs: "70mm • f/2.8 • 1/500s • ISO 1600",
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop",
    aspectRatio: "16/9",
    description: "Performance artística de rua capturada no ápice do movimento sob iluminação cênica noturna.",
    featured: true
  },
  {
    id: "ph-06",
    title: "O Ponto de Encontro",
    album: "Retratos & Cotidiano",
    location: "Rodoviária do Plano Piloto — DF",
    year: "2026",
    cameraSpecs: "35mm • f/2.0 • 1/320s • ISO 400",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1600&auto=format&fit=crop",
    aspectRatio: "3/4",
    description: "Cenas espontâneas no cruzamento mais movimentado e plural da capital federal.",
    featured: false
  }
];

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: "prj-01",
    slug: "estrategia-social-metropoles",
    title: "Narrativas em Tempo Real & Cobertura Noticiosa nas Redes",
    client: "Metrópoles Notícias",
    year: "2024 — Presente",
    category: "Mídias Sociais & Redação",
    scope: [
      "Produção de Conteúdo em Tempo Real",
      "Roteirização & Edição de Vídeos Curtos",
      "Monitoramento de Tendências & Clipping",
      "Adaptação de Pautas Hard News para Instagram e TikTok"
    ],
    summary: "Estruturação de fluxos operacionais de publicação veloz para notícias urgentes, aumentando a retenção e autoridade da marca jornalística nos canais de maior engajamento.",
    results: "+45% de taxa de compartilhamento e consolidação de formato líder em breaking news.",
    fullStory: [
      "A velocidade com que um fato político ou social se desdobra nas redes sociais exige um alinhamento perfeito entre checagem de fatos e design de informação.",
      "Neste projeto contínuo, liderei a concepção de modelos visuais para alertas urgentes, roteirizei vídeos explicativos com infografia animada e conduzi coberturas ao vivo dos episódios mais marcantes da política nacional.",
      "A abordagem prioriza clareza visual: títulos fortes, contextualização em carrossel e respeito rigoroso às regras deontológicas do jornalismo profissional."
    ],
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1400&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&auto=format&fit=crop"
    ],
    testimonial: {
      quote: "Caroline combina o rigor da apuração com uma leitura aguçada do comportamento do usuário em redes. Seus materiais geram credibilidade instantânea.",
      author: "Editor de Conteúdo Digital",
      role: "Metrópoles"
    }
  },
  {
    id: "prj-02",
    slug: "campanha-cidadania-em-pauta",
    title: "Cidadania em Pauta: Comunicação Institucional com Alma Editorial",
    client: "Campanha Independente de Direitos Sociais",
    year: "2025",
    category: "Comunicação Estratégica",
    scope: [
      "Identidade de Conteúdo",
      "Ensaio Fotográfico Documental",
      "Relações com a Imprensa & Releases",
      "Planejamento de Lançamento Digital"
    ],
    summary: "Campanha integrada para conscientização sobre acesso à justiça e direitos comunitários nas periferias do Distrito Federal.",
    results: "Mais de 12 inserções em grandes veículos de comunicação e alcance de 600 mil pessoas.",
    fullStory: [
      "O projeto necessitava romper com a linguagem burocrática e distante tradicionalmente associada a comunicados institucionais de ONGs e órgãos públicos.",
      "Adotamos uma direção de arte inspirada em publicações de design suíço contemporâneo, com fotografias em alta definição de líderes comunitários e infográficos explicativos de fácil compartilhamento no WhatsApp.",
      "A distribuição foi coordenada através de assessoria de imprensa direcionada e mobilização orgânica de influenciadores locais de educação e direitos humanos."
    ],
    coverImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1400&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: "prj-03",
    slug: "gestao-de-marca-pessoal-liderancas",
    title: "Reposicionamento de Imagem & Autoridade para Porta-Vozes",
    client: "Consultoria Privada",
    year: "2025",
    category: "Branding & Assessoria",
    scope: [
      "Estratégia de Posicionamento LinkedIn",
      "Ensaio Fotográfico Corporativo Editorial",
      "Curadoria de Pautas e Artigos de Opinião",
      "Media Training Básico"
    ],
    summary: "Desenvolvimento de narrativa autêntica e produção de ativos visuais de alto padrão para executivas e jornalistas do mercado de relações governamentais.",
    results: "Crescimento de 320% nas conexões qualificadas e convites frequentes para palestras e comissões setoriais.",
    fullStory: [
      "A consolidação de autoridade profissional no cenário de Brasília exige um equilíbrio sutil entre sobriedade institucional e personalidade genuína.",
      "Realizamos um diagnóstico aprofundado dos valores e diferenciais de cada porta-voz, produzindo ensaios fotográficos com iluminação natural e redigindo artigos de análise setorial que se destacam pela clareza e profundidade."
    ],
    coverImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1400&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
    ]
  }
];

export const INITIAL_BLOG: BlogPostItem[] = [
  {
    id: "blg-01",
    slug: "a-urgencia-do-tempo-real-e-a-profundidade-do-olhar",
    number: "01",
    title: "A Urgência do Tempo Real e a Profundidade do Olhar",
    subtitle: "Como apurar em segundos sem perder a densidade humana que sustenta o bom jornalismo.",
    date: "14 de Fevereiro de 2026",
    category: "Ensaio & Teoria",
    readTime: "05 MIN",
    excerpt: "Em uma era pautada pela corrida pelo primeiro clique, a verdadeira coragem do comunicador está em saber desacelerar o olhar quando a história exige respeito.",
    coverImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1400&auto=format&fit=crop",
    quote: "A velocidade atrai a atenção instantânea; a precisão comovente constrói a memória.",
    content: [
      "Trabalhar em uma redação digital de alcance massivo como o Metrópoles ensina uma lição inegociável: o tempo não perdoa a hesitação técnica. Quando uma notícia urgente estoura nos canais oficiais, as telas piscam em sincronia, os repórteres checam dados com os olhos no relógio e o público espera atualizações no segundo exato.",
      "Contudo, a pressa mecânica pode se tornar a armadilha mais perigosa para quem produz conteúdo. Se reduzirmos o jornalismo à mera transmissão veloz de caracteres, nos tornamos redundantes perante os algoritmos geradores de texto. O que nos distingue é a capacidade de captar o que não foi dito nos discursos oficiais.",
      "É precisamente nesse interstício que a fotografia e a escuta apurada se encontram. Uma matéria sobre um protesto político não termina quando os manifestantes se dispersam; ela ganha vida quando registramos o cansaço nos olhos de uma policial, a faixa feita à mão por uma mãe de família ou o silêncio pesado das calçadas da capital.",
      "Praticar a comunicação em 2026 exige um duplo movimento: ter a destreza motora para publicar em minutos, mas guardar no peito a serenidade de quem sabe que toda notícia é, antes de tudo, o registro de uma vida humana afetada pelo mundo."
    ]
  },
  {
    id: "blg-02",
    slug: "a-lente-como-instrumento-de-escuta",
    number: "02",
    title: "A Lente Fotográfica como Instrumento de Escuta Ativa",
    subtitle: "Por que uma fotografia documental potente começa muito antes de erguer o visor aos olhos.",
    date: "28 de Janeiro de 2026",
    category: "Fotografia & Prática",
    readTime: "06 MIN",
    excerpt: "Fotografar pessoas não é um ato de apropriação, mas um pacto de confidencialidade construído no tempo do silêncio compartilhado.",
    coverImage: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=1400&auto=format&fit=crop",
    quote: "Uma câmera aberta captura luz; uma fotógrafa atenta captura intenções.",
    content: [
      "Há um vício comum entre fotógrafos iniciantes que consiste em crer que o equipamento é o responsável pelo impacto da imagem. Lentes ultrarrápidas, sensores de dezenas de megapixels e autofoco rastreador de olhos são ferramentas admiráveis, mas são incapazes de gerar empatia.",
      "Quando entro em uma comunidade do Distrito Federal para uma cobertura documental, a câmera permanece guardada na bolsa durante a primeira meia hora. O primeiro passo nunca é enquadrar; o primeiro passo é cumprimentar, olhar nos olhos, pedir licença para sentar e ouvir o que aquela pessoa tem a dizer sobre seu dia.",
      "Quando o botão do obturador é finalmente pressionado, ele não invade o espaço do sujeito retratado. Trata-se, ao contrário, de um momento consentido, onde o fotografado se reconhece na narrativa que construímos em conjunto.",
      "Em tempos de saturação de imagens descartáveis, o retrato que sobrevive ao tempo é aquele que carrega em seus pixels o peso de uma conversa real."
    ]
  },
  {
    id: "blg-03",
    slug: "brasilia-entre-o-monumento-e-a-esquina",
    number: "03",
    title: "Brasília: A Tensão entre o Monumento e a Esquina",
    subtitle: "Crônica urbana sobre a convivência entre o rigor modernista e o afeto imprevisto.",
    date: "10 de Janeiro de 2026",
    category: "Crônica & Cidade",
    readTime: "04 MIN",
    excerpt: "A capital que nasceu de uma régua e um compasso só encontrou sua alma quando as pessoas ousaram desenhar caminhos tortos na grama.",
    coverImage: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1400&auto=format&fit=crop",
    quote: "A beleza de Brasília reside no confronto diário entre a ordem do projeto e o calor do improviso.",
    content: [
      "Dizem os visitantes ocasionais que Brasília é uma cidade sem esquinas. De fato, os eixos monumentais e as superquadras desenhadas por Lúcio Costa criaram uma escala deliberadamente pensada para o automóvel e para o horizonte infinito.",
      "Entretanto, quem vive a cidade em sua intimidade descobre que as esquinas existem: elas se manifestam sob a copa das mangueiras nos intervalos de aula na UnB, no cheiro do pastel frito nas feiras de domingo e nas conversas entre jornalistas ao redor do lago.",
      "Fotografar e narrar Brasília é documentar essa deliciosa contradição. É mostrar que o concreto armado, longe de ser frio, serve como uma tela límpida onde a luz incandescente do cerrado pinta todos os dias um espetáculo irrepetível."
    ]
  }
];

export const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "tst-01",
    quote: "Caroline possui uma capacidade rara de traduzir matérias densas em narrativas ágeis e visualmente fascinantes para redes sociais. Seu compromisso com a apuração precisa e sua sensibilidade fotográfica elevam qualquer projeto em que se envolve.",
    author: "Rodrigo Mendonça",
    role: "Editor Executivo de Mídias",
    organization: "Portal de Notícias Metrópoles",
    year: "2025"
  },
  {
    id: "tst-02",
    quote: "Trabalhar com a Caroline na cobertura de eventos e pautas de direitos humanos em Brasília foi uma experiência transformadora. Ela tem a rara virtude de ouvir antes de julgar e enxergar a beleza nos detalhes cotidianos que passariam despercebidos.",
    author: "Juliana Vasconcelos",
    role: "Coordenadora de Comunicação Institucional",
    organization: "Rede Cidadania & Justiça",
    year: "2025"
  },
  {
    id: "tst-03",
    quote: "Além de seu primor visual no fotojornalismo, a visão estratégica que ela tem para distribuição digital garantiu que nossas publicações atingissem patamares históricos de engajamento qualificado.",
    author: "Marcelo Albuquerque",
    role: "Diretor de Estratégia Digital",
    organization: "Agência Farol Comunicação",
    year: "2024"
  },
  {
    id: "tst-04",
    quote: "O olhar da Caroline para a arquitetura e para as pessoas de Brasília é poético sem deixar de ser contundente. Uma profissional completa, ágil e de extremo bom gosto editorial.",
    author: "Beatriz Lins",
    role: "Curadora de Artes & Fotografia",
    organization: "Galeria Horizonte Cerrado",
    year: "2026"
  }
];

export const NAVIGATION_PAGES = [
  { index: 0, path: "/", label: "Início", num: "01", tag: "CAPA" },
  { index: 1, path: "/sobre", label: "Sobre", num: "02", tag: "PERFIL" },
  { index: 2, path: "/jornalismo", label: "Jornalismo", num: "03", tag: "REPORTAGENS" },
  { index: 3, path: "/fotografia", label: "Fotografia", num: "04", tag: "ENSAIOS" },
  { index: 4, path: "/projetos", label: "Projetos", num: "05", tag: "ESTRATÉGIA" },
  { index: 5, path: "/blog", label: "Blog", num: "06", tag: "CADERNO" },
  { index: 6, path: "/depoimentos", label: "Depoimentos", num: "07", tag: "OPINIÃO" },
  { index: 7, path: "/contato", label: "Contato", num: "08", tag: "CONEXÃO" }
];
