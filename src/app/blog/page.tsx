import Link from "next/link";

import {
  ArrowRight,
  BookOpen
} from "lucide-react";

import {
  Header
} from "@/features/navigation";

import {
  Footer
} from "@/features/layout";

import {
  blogPosts
} from "@/features/blog/data/posts";

import {
  PageHero
} from "@/shared/ui";

export default function BlogPage() {
  return (
    <>
      <Header />

      <PageHero
        eyebrow="CONSEJOS CAYO"
        title="Blog"
        description="Ideas, recomendaciones y consejos para tus proyectos."
      />

      <main className="wrap blog-page">

        <div className="blog-grid">

          {blogPosts.map(
            (post) => (

              <article
                className="blog-card"
                key={post.slug}
              >

                <Link
                  href={`/blog/${post.slug}`}
                  className="blog-card-image"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                  />
                </Link>

                <div className="blog-card-body">

                  <div className="blog-category">
                    <BookOpen size={14} />
                    {post.category}
                  </div>

                  <p className="blog-date">
                    {post.date}
                  </p>

                  <Link
                    href={`/blog/${post.slug}`}
                  >
                    <h2>
                      {post.title}
                    </h2>
                  </Link>

                  <p>
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="blog-read"
                  >
                    Leer artículo
                    <ArrowRight size={16} />
                  </Link>

                </div>

              </article>

            )
          )}

        </div>

      </main>

      <Footer />
    </>
  );
}