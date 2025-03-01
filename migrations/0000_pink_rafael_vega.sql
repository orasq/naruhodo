CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text,
	`email` text NOT NULL,
	`password` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);