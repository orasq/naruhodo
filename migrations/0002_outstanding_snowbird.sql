CREATE TABLE `activateToken` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`token` text NOT NULL,
	`activatedAt` integer,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `activateToken_token_unique` ON `activateToken` (`token`);--> statement-breakpoint
ALTER TABLE `users` ADD `active` integer DEFAULT false;--> statement-breakpoint
CREATE UNIQUE INDEX `emailUniqueIndex` ON `users` (lower("email"));