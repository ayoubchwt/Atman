function AuthHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-1 items-center">
      <h1 className="text-3xl font-bold font-serif text-(--text)">{title}</h1>
      <p className="text-sm font-sans text-(--text-light) text-center">
        {description}
      </p>
    </div>
  );
}
export default AuthHeader;
