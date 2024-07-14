"use client";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function CreatePage() {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const titleInput = form.elements.namedItem("title") as HTMLInputElement;
    const bodyTextarea = form.elements.namedItem("body") as HTMLTextAreaElement;
    const title = titleInput.value;
    const body = bodyTextarea.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_JSON_DB_URL}/topics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body }),
    });
    const result = await res.json();
    router.push(`/read/${result.id}`);
    router.refresh();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <p>
          <input type="text" name="title" placeholder="title" />
        </p>
        <p>
          <textarea name="body" placeholder="body"></textarea>
        </p>
        <p>
          <button type="submit">create</button>
        </p>
      </form>
    </>
  );
}
