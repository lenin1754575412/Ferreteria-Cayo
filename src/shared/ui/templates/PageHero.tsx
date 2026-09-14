import { Eyebrow } from "@/shared/ui/atoms/Eyebrow";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function PageHero({
  eyebrow = "FERRETERÍA CAYO",
  title,
  description,
}: PageHeroProps) {

  return (
    <div className="page-hero">
      <div className="wrap">

        <Eyebrow>
          {eyebrow}
        </Eyebrow>

        <h1>
          {title}
        </h1>

        <p>
          {description}
        </p>

      </div>
    </div>
  );
}