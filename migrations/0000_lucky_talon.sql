CREATE TABLE IF NOT EXISTS "tbl_author" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"image" text,
	"bio" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tbl_book" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"author_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tbl_book_genre" (
	"book_id" integer NOT NULL,
	"genres_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tbl_genre" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tbl_book" ADD CONSTRAINT "tbl_book_author_id_tbl_author_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."tbl_author"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tbl_book_genre" ADD CONSTRAINT "tbl_book_genre_book_id_tbl_book_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."tbl_book"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tbl_book_genre" ADD CONSTRAINT "tbl_book_genre_genres_id_tbl_genre_id_fk" FOREIGN KEY ("genres_id") REFERENCES "public"."tbl_genre"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
