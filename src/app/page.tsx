import Image from "next/image";

export default function Home() {
  return (
    <>
      <h2>Welcome</h2>
      <div>Hello, WEB!</div>
      <Image
        priority
        width={200}
        height={200}
        src="/pusheen-cat.png"
        alt="image"
      ></Image>
    </>
  );
}
