import Link from "next/link";

import {
  ArrowRight,
  BookOpen
} from "lucide-react";

import {
  blogPosts
} from "@/features/blog/data/posts";

const featuredImages = [
  {
    title: "Herramientas",
    subtitle: "Equipa tu taller",
    image:
      "https://www.materiel-mngi.fr/public/donnees/cms/sources/pages/mngi-4.jpg",
    href:
      "/subcategorias/herramientas-manuales"
  },

  {
    title: "Construcción",
    subtitle: "Materiales para tu proyecto",
    image:
      "https://www.buildsvia.com/uploadfile/ueditor/image/202509/1758530864ab8f91.jpg",
    href:
      "/subcategorias/materiales-de-construccion"
  },

  {
    title: "Pinturas",
    subtitle: "Renueva tus espacios",
    image:
      "https://www.mondopratico.it/media/arts/cfadda_cagliari_%283%29.jpeg",
    href:
      "/subcategorias/pinturas-y-acabados"
  }
];

export function HomeExtras() {
  return (
    <>
      <section className="home-showcase">

        <div className="section-head">

          <div>
            <span className="eyebrow dark">
              DESCUBRE MÁS
            </span>

            <h2 className="title">
              Todo para tu proyecto
            </h2>
          </div>

        </div>

        <div className="home-image-grid">

          {featuredImages.map(
            (item) => (

              <Link
                href={item.href}
                className="home-image-card"
                key={item.title}
              >

                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                />

                <div className="home-image-overlay">

                  <span>
                    {item.subtitle}
                  </span>

                  <h3>
                    {item.title}
                  </h3>

                  <div>
                    Ver productos
                    <ArrowRight size={18} />
                  </div>

                </div>

              </Link>

            )
          )}

        </div>

      </section>

      <section className="home-blog">

        <div className="section-head">

          <div>

            <span className="eyebrow dark">
              CONSEJOS CAYO
            </span>

            <h2 className="title">
              Blog de Ferretería Cayo
            </h2>

          </div>

          <Link
            href="/blog"
            className="blog-all-link"
          >
            Ver todos
            <ArrowRight size={17} />
          </Link>

        </div>

        <div className="blog-grid">

          {blogPosts.slice(0, 3).map(
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
                    loading="lazy"
                  />
                </Link>

                <div className="blog-card-body">

                  <div className="blog-category">
                    <BookOpen size={14} />
                    {post.category}
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                  >
                    <h3>
                      {post.title}
                    </h3>
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

      </section>
    </>
  );
}