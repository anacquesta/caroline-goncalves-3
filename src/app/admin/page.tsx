"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePortfolio } from "@/context/PortfolioContext";
import {
  LayoutDashboard,
  Newspaper,
  Camera,
  FolderKanban,
  FileText,
  MessageSquareQuote,
  Settings,
  ArrowUpRight,
  Plus,
  Trash2,
  Edit,
  Save,
  RotateCcw,
  CheckCircle,
  ExternalLink
} from "lucide-react";
import styles from "./admin.module.css";

type AdminTab =
  | "dashboard"
  | "jornalismo"
  | "fotografia"
  | "projetos"
  | "blog"
  | "depoimentos"
  | "configuracoes";

export default function AdminPage() {
  const {
    profile,
    updateProfile,
    journalism,
    addJournalItem,
    deleteJournalItem,
    photos,
    addPhotoItem,
    deletePhotoItem,
    projects,
    addProjectItem,
    deleteProjectItem,
    blogPosts,
    addBlogPost,
    deleteBlogPost,
    testimonials,
    addTestimonial,
    deleteTestimonial,
    resetAllData,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [successMsg, setSuccessMsg] = useState("");

  const showFeedback = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3500);
  };

  // Form states for creating new items
  // 1. New Journalism Item
  const [newJrnTitle, setNewJrnTitle] = useState("");
  const [newJrnSubtitle, setNewJrnSubtitle] = useState("");
  const [newJrnCategory, setNewJrnCategory] = useState("Política & Poder");
  const [newJrnVehicle, setNewJrnVehicle] = useState("Metrópoles");
  const [newJrnDate, setNewJrnDate] = useState("Fevereiro 2026");
  const [newJrnImpact, setNewJrnImpact] = useState("1.5M visualizações");
  const [newJrnSummary, setNewJrnSummary] = useState("");
  const [newJrnImg, setNewJrnImg] = useState("https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1400&auto=format&fit=crop");

  const handleCreateJournalism = (e: React.FormEvent) => {
    e.preventDefault();
    addJournalItem({
      slug: newJrnTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title: newJrnTitle,
      subtitle: newJrnSubtitle,
      category: newJrnCategory,
      vehicle: newJrnVehicle,
      date: newJrnDate,
      impactMetrics: newJrnImpact,
      summary: newJrnSummary,
      fullContent: [newJrnSummary],
      imageUrl: newJrnImg,
      readTime: "4 min de leitura",
      externalUrl: "https://www.metropoles.com",
    });
    setNewJrnTitle("");
    setNewJrnSubtitle("");
    setNewJrnSummary("");
    showFeedback("Reportagem adicionada com sucesso ao portfólio!");
  };

  // 2. New Photo Item
  const [newPhotoTitle, setNewPhotoTitle] = useState("");
  const [newPhotoAlbum, setNewPhotoAlbum] = useState("Arquitetura & Poder");
  const [newPhotoLoc, setNewPhotoLoc] = useState("Brasília — DF");
  const [newPhotoYear, setNewPhotoYear] = useState("2026");
  const [newPhotoSpecs, setNewPhotoSpecs] = useState("35mm • f/2.0 • 1/500s");
  const [newPhotoUrl, setNewPhotoUrl] = useState("https://images.unsplash.com/photo-1572021335469-31706a17aaef?q=80&w=1600&auto=format&fit=crop");
  const [newPhotoDesc, setNewPhotoDesc] = useState("");

  const handleCreatePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    addPhotoItem({
      title: newPhotoTitle,
      album: newPhotoAlbum,
      location: newPhotoLoc,
      year: newPhotoYear,
      cameraSpecs: newPhotoSpecs,
      imageUrl: newPhotoUrl,
      aspectRatio: "16/10",
      description: newPhotoDesc,
      featured: true,
    });
    setNewPhotoTitle("");
    setNewPhotoDesc("");
    showFeedback("Fotografia cadastrada com sucesso!");
  };

  // Profile Edit state
  const [profName, setProfName] = useState(profile.name);
  const [profHeadline, setProfHeadline] = useState(profile.headline);
  const [profCompany, setProfCompany] = useState(profile.currentCompany);
  const [profRole, setProfRole] = useState(profile.currentRole);
  const [profEducation, setProfEducation] = useState(profile.education);
  const [profPostGrad, setProfPostGrad] = useState(profile.postGrad);
  const [profEmail, setProfEmail] = useState(profile.contact.email);
  const [profWhatsapp, setProfWhatsapp] = useState(profile.contact.whatsapp);
  const [profWhatsappFormatted, setProfWhatsappFormatted] = useState(profile.contact.whatsappFormatted);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: profName,
      headline: profHeadline,
      currentCompany: profCompany,
      currentRole: profRole,
      education: profEducation,
      postGrad: profPostGrad,
      contact: {
        ...profile.contact,
        email: profEmail,
        whatsapp: profWhatsapp,
        whatsappFormatted: profWhatsappFormatted,
      },
    });
    showFeedback("Configurações do perfil salvas com sucesso!");
  };

  return (
    <div className={styles.adminContainer}>
      {/* Sidebar conventional layout as requested */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.adminLogo}>
            <span className={styles.logoName}>CAROLINE GONÇALVES</span>
            <span className={styles.logoTag}>PAINEL CMS • EDITORIAL</span>
          </div>
        </div>

        <nav className={styles.sidebarNav}>
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`${styles.navBtn} ${activeTab === "dashboard" ? styles.navActive : ""}`}
          >
            <LayoutDashboard size={17} />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab("jornalismo")}
            className={`${styles.navBtn} ${activeTab === "jornalismo" ? styles.navActive : ""}`}
          >
            <Newspaper size={17} />
            <span>Jornalismo</span>
            <span className={styles.navCount}>{journalism.length}</span>
          </button>

          <button
            onClick={() => setActiveTab("fotografia")}
            className={`${styles.navBtn} ${activeTab === "fotografia" ? styles.navActive : ""}`}
          >
            <Camera size={17} />
            <span>Fotografia</span>
            <span className={styles.navCount}>{photos.length}</span>
          </button>

          <button
            onClick={() => setActiveTab("projetos")}
            className={`${styles.navBtn} ${activeTab === "projetos" ? styles.navActive : ""}`}
          >
            <FolderKanban size={17} />
            <span>Projetos & Redes</span>
            <span className={styles.navCount}>{projects.length}</span>
          </button>

          <button
            onClick={() => setActiveTab("blog")}
            className={`${styles.navBtn} ${activeTab === "blog" ? styles.navActive : ""}`}
          >
            <FileText size={17} />
            <span>Caderno de Textos</span>
            <span className={styles.navCount}>{blogPosts.length}</span>
          </button>

          <button
            onClick={() => setActiveTab("depoimentos")}
            className={`${styles.navBtn} ${activeTab === "depoimentos" ? styles.navActive : ""}`}
          >
            <MessageSquareQuote size={17} />
            <span>Depoimentos</span>
            <span className={styles.navCount}>{testimonials.length}</span>
          </button>

          <button
            onClick={() => setActiveTab("configuracoes")}
            className={`${styles.navBtn} ${activeTab === "configuracoes" ? styles.navActive : ""}`}
          >
            <Settings size={17} />
            <span>Configurações & SEO</span>
          </button>
        </nav>

        <div className={styles.sidebarFooter}>
          <Link href="/" className={styles.liveSiteBtn}>
            <span>VISUALIZAR PORTFÓLIO</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={styles.mainWorkspace}>
        {/* Top Header */}
        <header className={styles.topHeader}>
          <div className={styles.pageTitleBlock}>
            <span className={styles.crumb}>PORTFÓLIO EDITORIAL / CMS</span>
            <h1 className={styles.currentTabTitle}>
              {activeTab === "dashboard" && "Painel Geral & Métricas"}
              {activeTab === "jornalismo" && "Gestão de Reportagens & Jornalismo"}
              {activeTab === "fotografia" && "Galeria de Fotografias & Álbuns"}
              {activeTab === "projetos" && "Projetos de Comunicação & Redes Sociais"}
              {activeTab === "blog" && "Caderno de Textos & Ensaios"}
              {activeTab === "depoimentos" && "Depoimentos & Citações"}
              {activeTab === "configuracoes" && "Configurações Gerais, Bio & Contatos"}
            </h1>
          </div>

          <div className={styles.topActions}>
            <button
              onClick={() => {
                if (confirm("Deseja restaurar todos os conteúdos para a versão editorial padrão?")) {
                  resetAllData();
                  showFeedback("Dados restaurados para o padrão com sucesso!");
                }
              }}
              className={styles.resetBtn}
            >
              <RotateCcw size={14} />
              <span>Restaurar Padrão</span>
            </button>
          </div>
        </header>

        {/* Feedback Alert */}
        {successMsg && (
          <div className={styles.feedbackBanner}>
            <CheckCircle size={16} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Tab 1: Dashboard */}
        {activeTab === "dashboard" && (
          <div className={styles.dashboardGrid}>
            <div className={styles.metricCard}>
              <span className={styles.metricLabel}>REPORTAGENS ATIVAS</span>
              <span className={styles.metricVal}>{journalism.length}</span>
              <span className={styles.metricSub}>Veículo principal: Metrópoles</span>
            </div>

            <div className={styles.metricCard}>
              <span className={styles.metricLabel}>FOTOGRAFIAS EM EXPOSIÇÃO</span>
              <span className={styles.metricVal}>{photos.length}</span>
              <span className={styles.metricSub}>Galeria com Lightbox imersivo</span>
            </div>

            <div className={styles.metricCard}>
              <span className={styles.metricLabel}>PROJETOS DE COMUNICAÇÃO</span>
              <span className={styles.metricVal}>{projects.length}</span>
              <span className={styles.metricSub}>Estudos de caso e cobertura digital</span>
            </div>

            <div className={styles.metricCard}>
              <span className={styles.metricLabel}>TEXTOS NO CADERNO</span>
              <span className={styles.metricVal}>{blogPosts.length}</span>
              <span className={styles.metricSub}>Leitura vertical de 680–780px</span>
            </div>

            <div className={styles.profileOverviewBox}>
              <h3 className={styles.boxHeading}>Identidade Cadastrada</h3>
              <div className={styles.profileDetailsGrid}>
                <div>
                  <span className={styles.pLabel}>PROFISSIONAL</span>
                  <p className={styles.pVal}>{profile.name}</p>
                </div>
                <div>
                  <span className={styles.pLabel}>CARGO ATUAL</span>
                  <p className={styles.pVal}>{profile.subRole}</p>
                </div>
                <div>
                  <span className={styles.pLabel}>LOCALIDADE</span>
                  <p className={styles.pVal}>{profile.location}</p>
                </div>
                <div>
                  <span className={styles.pLabel}>WHATSAPP</span>
                  <p className={styles.pVal}>{profile.contact.whatsappFormatted}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Jornalismo */}
        {activeTab === "jornalismo" && (
          <div className={styles.tabContent}>
            {/* Create form */}
            <div className={styles.createBox}>
              <h3 className={styles.boxHeading}>Nova Matéria Jornalística</h3>
              <form onSubmit={handleCreateJournalism} className={styles.formGrid}>
                <div className={styles.inputWrap}>
                  <label>Título da Matéria</label>
                  <input
                    type="text"
                    value={newJrnTitle}
                    onChange={(e) => setNewJrnTitle(e.target.value)}
                    placeholder="Ex: Cobertura Especial na Esplanada..."
                    required
                  />
                </div>
                <div className={styles.inputWrap}>
                  <label>Subtítulo</label>
                  <input
                    type="text"
                    value={newJrnSubtitle}
                    onChange={(e) => setNewJrnSubtitle(e.target.value)}
                    placeholder="Ex: Bastidores da votação histórica..."
                    required
                  />
                </div>
                <div className={styles.inputWrap}>
                  <label>Categoria</label>
                  <input
                    type="text"
                    value={newJrnCategory}
                    onChange={(e) => setNewJrnCategory(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.inputWrap}>
                  <label>Métricas de Impacto</label>
                  <input
                    type="text"
                    value={newJrnImpact}
                    onChange={(e) => setNewJrnImpact(e.target.value)}
                    placeholder="Ex: 2.1M visualizações • 45k compartilhamentos"
                  />
                </div>
                <div className={`${styles.inputWrap} ${styles.inputFull}`}>
                  <label>Resumo / Contexto Editorial</label>
                  <textarea
                    value={newJrnSummary}
                    onChange={(e) => setNewJrnSummary(e.target.value)}
                    rows={3}
                    placeholder="Descreva a apuração e relevância..."
                    required
                  />
                </div>
                <div className={`${styles.inputWrap} ${styles.inputFull}`}>
                  <label>URL da Fotografia de Cobertura</label>
                  <input
                    type="text"
                    value={newJrnImg}
                    onChange={(e) => setNewJrnImg(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className={styles.addBtn}>
                  <Plus size={16} />
                  <span>Publicar Matéria no Portfólio</span>
                </button>
              </form>
            </div>

            {/* List */}
            <div className={styles.listSection}>
              <h3 className={styles.boxHeading}>Matérias Publicadas ({journalism.length})</h3>
              <div className={styles.itemsTable}>
                {journalism.map((item) => (
                  <div key={item.id} className={styles.tableRow}>
                    <div className={styles.itemThumb}>
                      <Image src={item.imageUrl} alt={item.title} fill className={styles.thumbImg} />
                    </div>
                    <div className={styles.itemInfo}>
                      <span className={styles.itemCat}>{item.category} • {item.date}</span>
                      <h4 className={styles.itemTitle}>{item.title}</h4>
                      <span className={styles.itemMeta}>{item.vehicle} • {item.impactMetrics}</span>
                    </div>
                    <div className={styles.itemActions}>
                      <button
                        onClick={() => {
                          if (confirm(`Excluir a matéria "${item.title}"?`)) {
                            deleteJournalItem(item.id);
                            showFeedback("Matéria excluída com sucesso.");
                          }
                        }}
                        className={styles.deleteBtn}
                        title="Excluir"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Fotografia */}
        {activeTab === "fotografia" && (
          <div className={styles.tabContent}>
            {/* Create Photo form */}
            <div className={styles.createBox}>
              <h3 className={styles.boxHeading}>Cadastrar Nova Fotografia</h3>
              <form onSubmit={handleCreatePhoto} className={styles.formGrid}>
                <div className={styles.inputWrap}>
                  <label>Título da Foto</label>
                  <input
                    type="text"
                    value={newPhotoTitle}
                    onChange={(e) => setNewPhotoTitle(e.target.value)}
                    placeholder="Ex: Luzes do Entardecer no Congresso"
                    required
                  />
                </div>
                <div className={styles.inputWrap}>
                  <label>Álbum / Ensaio</label>
                  <select
                    value={newPhotoAlbum}
                    onChange={(e) => setNewPhotoAlbum(e.target.value)}
                  >
                    <option value="Arquitetura & Poder">Arquitetura & Poder</option>
                    <option value="Retratos & Cotidiano">Retratos & Cotidiano</option>
                    <option value="Fotojornalismo">Fotojornalismo</option>
                    <option value="Cultura & Ensaios">Cultura & Ensaios</option>
                  </select>
                </div>
                <div className={styles.inputWrap}>
                  <label>Local do Registro</label>
                  <input
                    type="text"
                    value={newPhotoLoc}
                    onChange={(e) => setNewPhotoLoc(e.target.value)}
                    placeholder="Ex: Brasília — DF"
                    required
                  />
                </div>
                <div className={styles.inputWrap}>
                  <label>Configurações da Câmera (Specs)</label>
                  <input
                    type="text"
                    value={newPhotoSpecs}
                    onChange={(e) => setNewPhotoSpecs(e.target.value)}
                    placeholder="Ex: 50mm • f/1.8 • 1/250s • ISO 100"
                    required
                  />
                </div>
                <div className={`${styles.inputWrap} ${styles.inputFull}`}>
                  <label>URL da Imagem em Alta Resolução</label>
                  <input
                    type="text"
                    value={newPhotoUrl}
                    onChange={(e) => setNewPhotoUrl(e.target.value)}
                    required
                  />
                </div>
                <div className={`${styles.inputWrap} ${styles.inputFull}`}>
                  <label>Descrição / Nota de Campo</label>
                  <textarea
                    value={newPhotoDesc}
                    onChange={(e) => setNewPhotoDesc(e.target.value)}
                    rows={2}
                    placeholder="Detalhes sobre a captura..."
                    required
                  />
                </div>
                <button type="submit" className={styles.addBtn}>
                  <Plus size={16} />
                  <span>Cadastrar Fotografia</span>
                </button>
              </form>
            </div>

            {/* Photos Grid */}
            <div className={styles.listSection}>
              <h3 className={styles.boxHeading}>Acervo Fotográfico ({photos.length})</h3>
              <div className={styles.photosAdminGrid}>
                {photos.map((ph) => (
                  <div key={ph.id} className={styles.photoAdminCard}>
                    <div className={styles.photoAdminImg}>
                      <Image src={ph.imageUrl} alt={ph.title} fill className={styles.thumbImg} />
                    </div>
                    <div className={styles.photoAdminMeta}>
                      <span className={styles.photoAdminAlbum}>{ph.album}</span>
                      <h4 className={styles.photoAdminTitle}>{ph.title}</h4>
                      <span className={styles.photoAdminLoc}>{ph.location} ({ph.year})</span>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm(`Excluir foto "${ph.title}"?`)) {
                          deletePhotoItem(ph.id);
                          showFeedback("Foto removida.");
                        }
                      }}
                      className={styles.deleteBtnInline}
                      title="Excluir foto"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Projetos */}
        {activeTab === "projetos" && (
          <div className={styles.tabContent}>
            <div className={styles.listSection}>
              <h3 className={styles.boxHeading}>Projetos Especiais & Casos ({projects.length})</h3>
              <div className={styles.itemsTable}>
                {projects.map((proj) => (
                  <div key={proj.id} className={styles.tableRow}>
                    <div className={styles.itemThumb}>
                      <Image src={proj.coverImage} alt={proj.title} fill className={styles.thumbImg} />
                    </div>
                    <div className={styles.itemInfo}>
                      <span className={styles.itemCat}>{proj.category} • {proj.year}</span>
                      <h4 className={styles.itemTitle}>{proj.title}</h4>
                      <span className={styles.itemMeta}>Cliente: {proj.client}</span>
                    </div>
                    <div className={styles.itemActions}>
                      <button
                        onClick={() => {
                          if (confirm(`Excluir projeto "${proj.title}"?`)) {
                            deleteProjectItem(proj.id);
                            showFeedback("Projeto excluído.");
                          }
                        }}
                        className={styles.deleteBtn}
                        title="Excluir"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Blog */}
        {activeTab === "blog" && (
          <div className={styles.tabContent}>
            <div className={styles.listSection}>
              <h3 className={styles.boxHeading}>Artigos & Ensaios no Caderno ({blogPosts.length})</h3>
              <div className={styles.itemsTable}>
                {blogPosts.map((post) => (
                  <div key={post.id} className={styles.tableRow}>
                    <div className={styles.itemThumb}>
                      <Image src={post.coverImage} alt={post.title} fill className={styles.thumbImg} />
                    </div>
                    <div className={styles.itemInfo}>
                      <span className={styles.itemCat}>ENSAIO {post.number} • {post.category}</span>
                      <h4 className={styles.itemTitle}>{post.title}</h4>
                      <span className={styles.itemMeta}>{post.date} • {post.readTime}</span>
                    </div>
                    <div className={styles.itemActions}>
                      <button
                        onClick={() => {
                          if (confirm(`Excluir o texto "${post.title}"?`)) {
                            deleteBlogPost(post.id);
                            showFeedback("Artigo removido.");
                          }
                        }}
                        className={styles.deleteBtn}
                        title="Excluir"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: Depoimentos */}
        {activeTab === "depoimentos" && (
          <div className={styles.tabContent}>
            <div className={styles.listSection}>
              <h3 className={styles.boxHeading}>Depoimentos Cadastrados ({testimonials.length})</h3>
              <div className={styles.itemsTable}>
                {testimonials.map((t) => (
                  <div key={t.id} className={styles.tableRow}>
                    <div className={styles.itemInfo}>
                      <h4 className={styles.itemTitle}>{t.author}</h4>
                      <span className={styles.itemCat}>{t.role} ({t.organization})</span>
                      <p className={styles.tstQuoteSnippet}>“{t.quote.slice(0, 120)}...”</p>
                    </div>
                    <div className={styles.itemActions}>
                      <button
                        onClick={() => {
                          if (confirm(`Excluir depoimento de ${t.author}?`)) {
                            deleteTestimonial(t.id);
                            showFeedback("Depoimento excluído.");
                          }
                        }}
                        className={styles.deleteBtn}
                        title="Excluir"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 7: Configurações */}
        {activeTab === "configuracoes" && (
          <div className={styles.tabContent}>
            <div className={styles.createBox}>
              <h3 className={styles.boxHeading}>Dados Pessoais, Bio & Redes</h3>
              <form onSubmit={handleSaveProfile} className={styles.formGrid}>
                <div className={styles.inputWrap}>
                  <label>Nome Completo</label>
                  <input
                    type="text"
                    value={profName}
                    onChange={(e) => setProfName(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.inputWrap}>
                  <label>Veículo Atual</label>
                  <input
                    type="text"
                    value={profCompany}
                    onChange={(e) => setProfCompany(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.inputWrap}>
                  <label>Cargo Atual</label>
                  <input
                    type="text"
                    value={profRole}
                    onChange={(e) => setProfRole(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.inputWrap}>
                  <label>E-mail de Contato</label>
                  <input
                    type="email"
                    value={profEmail}
                    onChange={(e) => setProfEmail(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.inputWrap}>
                  <label>WhatsApp (somente números com DDD)</label>
                  <input
                    type="text"
                    value={profWhatsapp}
                    onChange={(e) => setProfWhatsapp(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.inputWrap}>
                  <label>WhatsApp Formatado</label>
                  <input
                    type="text"
                    value={profWhatsappFormatted}
                    onChange={(e) => setProfWhatsappFormatted(e.target.value)}
                    required
                  />
                </div>
                <div className={`${styles.inputWrap} ${styles.inputFull}`}>
                  <label>Headline Editorial da Capa</label>
                  <textarea
                    value={profHeadline}
                    onChange={(e) => setProfHeadline(e.target.value)}
                    rows={2}
                    required
                  />
                </div>
                <div className={styles.inputWrap}>
                  <label>Graduação</label>
                  <input
                    type="text"
                    value={profEducation}
                    onChange={(e) => setProfEducation(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.inputWrap}>
                  <label>Pós-Graduação</label>
                  <input
                    type="text"
                    value={profPostGrad}
                    onChange={(e) => setProfPostGrad(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className={styles.addBtn}>
                  <Save size={16} />
                  <span>Salvar Alterações no Portfólio</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
