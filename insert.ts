const books = [
  {
    id: "book_1",
    type: "book",
    title:
      "フェイクニュースを科学する 拡散するデマ，陰謀論，プロパガンダのしくみ",
    isbn: "9784759825039",
    authors: [{ id: "author_1", name: "笹原 和俊" }],
  },
  {
    id: "book_2",
    type: "book",
    title: "ぬるめた (1)",
    isbn: "9784759825039",
    authors: [{ id: "author_2", name: "こかむも" }],
    series: [{ id: "bookseries_1", name: "ぬるめた" }],
  },
];

const authors = [
  {
    id: "author_1",
    name: "笹原 和俊",
  },
  {
    id: "author_2",
    name: "こかむも",
  },
];

const bookseries = [
  {
    id: "bookseries",
    type: "book_series",
    title: "ぬるめた",
  },
];

import { MeiliSearch } from "meilisearch";

(async () => {
  const client = new MeiliSearch({ host: "http://localhost:7700" });
  await client
    .index("content")
    .addDocuments([
      ...books.map(({ id, title }) => ({ id, query: title })),
      ...authors.map(({ id, name }) => ({ id, query: name })),
      ...bookseries.map(({ id, title }) => ({ id, query: title })),
    ]);
  await client.index("books").addDocuments(books);
  await client.index("authors").addDocuments(authors);
  await client.index("bookseries").addDocuments(bookseries);
})();
