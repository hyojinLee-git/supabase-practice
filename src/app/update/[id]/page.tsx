"use client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";

export default function UpdatePage() {
  const router = useRouter();
  const params = useParams();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const $form = e.target as HTMLFormElement;
    const $titleInput = $form.elements.namedItem("title") as HTMLInputElement;
    const $bodyTextarea = $form.elements.namedItem("body") as HTMLTextAreaElement;
    const title = $titleInput.value;
    const body = $bodyTextarea.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_JSON_DB_URL}/topics/${params.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body }),
    });
    const result = await res.json();
    router.push(`/read/${result.id}`);
    router.refresh();
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleChangeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const getPageData = useCallback(async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_JSON_DB_URL}/topics/${params.id}`);
    const { title, body } = await res.json();
    setTitle(title);
    setBody(body);
  }, [params.id]);

  useEffect(() => {
    getPageData();
  }, [getPageData]);

  return (
    <>
      <form onSubmit={handleUpdate}>
        <p>
          <input type="text" name="title" placeholder="title" value={title} onChange={handleChangeInput} />
        </p>
        <p>
          <textarea name="body" placeholder="body" value={body} onChange={handleChangeTextarea}></textarea>
        </p>
        <p>
          <button type="submit">update</button>
        </p>
      </form>
    </>
  );
}
