import Link from "next/link";

type CategoryCardProps = {
  title: string;
  image: string;
  href: string;
};

export function CategoryCard({
  title,
  image,
  href,
}: CategoryCardProps) {

  return (
    <Link
      className="subcard"
      href={href}
    >

      <div className="image-wrap">
        <img
          src={image}
          alt={title}
        />
      </div>

      <h3>
        {title}
      </h3>

      <span>
        Ver productos →
      </span>

    </Link>
  );
}