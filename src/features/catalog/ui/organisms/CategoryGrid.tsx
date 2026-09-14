import {
  CategoryCard,
} from "../molecules/CategoryCard";

export type CategoryGridItem = {
  title: string;
  image: string;
  href: string;
};

type CategoryGridProps = {
  items: CategoryGridItem[];
  compact?: boolean;
};

export function CategoryGrid({
  items,
  compact = false,
}: CategoryGridProps) {

  return (
    <div
      className={`subgrid${compact ? " compact" : ""}`}
    >

      {items.map((item) => (

        <CategoryCard
          key={`${item.title}-${item.href}`}
          {...item}
        />

      ))}

    </div>
  );
}