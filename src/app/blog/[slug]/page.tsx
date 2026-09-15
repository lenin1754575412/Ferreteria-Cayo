import Link from "next/link";

import {
  ArrowLeft
} from "lucide-react";

import {
  notFound
} from "next/navigation";

import {
  Header
} from "@/features/navigation";

import {
  Footer
} from "@/features/layout";

import {
  getBlogPost
} from "@/features/blog/data/posts";

export default function BlogPostPage({
  params
}: {
  params: {
    slug: string;
  };
}) {

  const post =
    getBlogPost(
      params.slug
    );

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />

      <main className="blog-article">

        <div className="blog-article-header">

          <div className="wrap blog-article-header-inner">

            <Link
              href="/blog"
              className="blog-back"
            >
              <ArrowLeft size={17} />
              Volver al blog
            </Link>

            <span className="blog-article-category">
              {post.category}
            </span>

            <h1>
              {post.title}
            </h1>

            <p>
              {post.excerpt}
            </p>

            <small>
              {post.date}
            </small>

          </div>

        </div>

        <div className="wrap">

          <div className="blog-main-image">

            <img
              src={post.image}
              alt={post.title}
            />

          </div>

          <article className="blog-content">

            {post.content.map(
              (paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              )
            )}

            <div className="blog-cta">

              <h2>
                ¿Buscas materiales para tu proyecto?
              </h2>

              <p>
                Revisa nuestro catálogo de productos de Ferretería Cayo.
              </p>

              <Link
                href="/productos"
                className="btn"
              >
                Ver productos
              </Link>

            </div>

          </article>

        </div>

      </main>

      <Footer />
    </>
  );
}