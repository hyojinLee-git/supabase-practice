"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Control() {
  const params = useParams();
  const router = useRouter();

  const handleDelete = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_JSON_DB_URL}/topics/${params.id}`, {
      method: "DELETE",
    });
    router.push("/");
    router.refresh();
  };

  return (
    <ul>
      <li>
        <Link href="/create">Create</Link>
      </li>
      {params.id ? (
        <>
          <li>
            <Link href={`/update/${params.id}`}>Update</Link>
          </li>
          <li>
            <button onClick={handleDelete}>delete</button>
          </li>
        </>
      ) : null}
    </ul>
  );
}
