export function ProductBadge({
  value,
}: {
  value?: string;
}) {

  if (!value) {
    return null;
  }

  return (
    <span className="badge">
      {value}
    </span>
  );
}