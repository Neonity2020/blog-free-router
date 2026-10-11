import { getCollection } from 'astro:content';

export async function GET(context: { site: URL }) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  const items = posts
    .map(
      (post) => `    <item>
      <title>${post.data.title}</title>
      <link>${new URL(`/blog/${post.id}/`, context.site)}</link>
      <guid>${new URL(`/blog/${post.id}/`, context.site)}</guid>
      <description>${post.data.description}</description>
      <pubDate>${post.data.pubDate.toUTCString()}</pubDate>
    </item>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>free-router blog</title>
    <link>${context.site}</link>
    <description>关于 AI 协作、数字资产与长期主义的思考与实践</description>
    <language>zh-CN</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
