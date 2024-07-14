export default async function ReadPage({ params }: { params: { id: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_JSON_DB_URL}/topics/${params.id}`, { cache: "no-store" });
  const { title, body } = await res.json();

  return (
    <>
      <h2>Read {title}</h2>
      {body}
    </>
  );
}
