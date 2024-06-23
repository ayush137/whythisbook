import { relations } from "drizzle-orm";
import {
  integer,
  text,
  pgTable,
  serial,
  varchar,
  smallint,
  primaryKey,
} from "drizzle-orm/pg-core";

export const books = pgTable("tbl_book", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  authorId: integer("author_id").references(() => author.id),
});

export const bookRelations = relations(books, ({ one, many }) => ({
  author: one(author, { fields: [books.authorId], references: [author.id] }),
  genre: many(booksOnGenres),
}));

export const author = pgTable("tbl_author", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  image: text("image"),
  bio: text("bio").notNull(),
});

export const authorRelations = relations(author, ({ many }) => ({
  book: many(books),
}));

export const genres = pgTable("tbl_genre", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
});

export const genresRelations = relations(genres, ({ many }) => ({
  books: many(booksOnGenres),
}));

export const booksOnGenres = pgTable(
  "tbl_book_genre",
  {
    bookId: integer("book_id")
      .notNull()
      .references(() => books.id),
    genreId: integer("genres_id")
      .notNull()
      .references(() => genres.id),
  },
  (t) => ({
    pk: primaryKey(t.bookId, t.genreId),
  })
);

export const booksOnGenresRelations = relations(booksOnGenres, ({ one }) => ({
  book: one(books, { fields: [booksOnGenres.bookId], references: [books.id] }),
  genre: one(genres, {
    fields: [booksOnGenres.genreId],
    references: [genres.id],
  }),
}));

export const users = pgTable("tbl_user", {
  id: text("id").notNull().primaryKey(),
  email: text("email").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  image: text("image"),
});

export const usersRelations = relations(users, ({ many }) => ({
  reviews: many(bookReviews),
}));

export const bookReviews = pgTable("tbl_book_review", {
  id: serial("id").notNull().primaryKey(),
  bookId: integer("book_id")
    .notNull()
    .references(() => books.id),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  count: smallint("count").notNull(),
  comment: text("comment"),
});

export const bookReviewsRelations = relations(bookReviews, ({ one }) => ({
  user: one(users, { fields: [bookReviews.bookId], references: [users.id] }),
}));
