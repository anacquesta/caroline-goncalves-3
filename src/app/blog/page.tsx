import type { Metadata } from "next";
import { BlogBoard } from "@/components/boards/BlogBoard";
import { INITIAL_BLOG } from "@/data/portfolioData";

export const metadata: Metadata = {
  title: "Caderno de Textos & Ensaios — Caroline Gonçalves",
  description:
    "Reflexões editoriais, crônicas urbanas sobre Brasília e ensaios sobre fotojornalismo e a velocidade da informação digital por Caroline Gonçalves.",
  openGraph: {
    title: "Caderno de Textos & Ensaios — Caroline Gonçalves",
    description: "Crônicas, artigos e ensaios sobre jornalismo e cidade.",
  },
};

export default function BlogPage() {
  return (
    <>
      <div className="sr-only">
        <h1>Caderno de Textos e Ensaios Editoriais — Caroline Gonçalves</h1>
        {INITIAL_BLOG.map((post) => (
          <article key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.subtitle}</p>
            <p>{post.excerpt}</p>
          </article>
        ))}
      </div>
      <BlogBoard />
    </>
  );
}
