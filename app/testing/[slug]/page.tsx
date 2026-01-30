export async function generateStaticParams() {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts").then(
    (res) => res.json(),
  );

  const slug = data.map((post: any) => ({
    slug: post.id.toString(),
  }));

  return slug;
}

export default async function testing({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${slug}`,
    { next: { revalidate: 10 } },
  ).then((res) => res.json());

  return (
    <div>
      <h1>
        {data.id} - {data.title}
      </h1>
      <p>{new Date().getSeconds()}</p>
    </div>
  );
}
