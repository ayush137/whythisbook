CREATE TABLE IF NOT EXISTS "tbl_book_review" (
	"id" serial PRIMARY KEY NOT NULL,
	"book_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"count" smallint NOT NULL,
	"comment" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tbl_user" (
	"id" integer PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "tbl_book_genre" ADD CONSTRAINT "tbl_book_genre_book_id_genres_id_pk" PRIMARY KEY("book_id","genres_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tbl_book_review" ADD CONSTRAINT "tbl_book_review_book_id_tbl_book_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."tbl_book"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tbl_book_review" ADD CONSTRAINT "tbl_book_review_user_id_tbl_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."tbl_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
