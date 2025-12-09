CREATE TABLE `albums` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `albums_created_at` ON `albums` (`created_at`);--> statement-breakpoint
CREATE TABLE `pictures` (
	`id` text PRIMARY KEY NOT NULL,
	`album_id` text,
	`original_key` text NOT NULL,
	`thumbnail_key` text NOT NULL,
	`taken_at` integer NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`album_id`) REFERENCES `albums`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `pictures_album_id` ON `pictures` (`album_id`);--> statement-breakpoint
CREATE INDEX `pictures_album_id_taken_at` ON `pictures` (`album_id`,`taken_at`);