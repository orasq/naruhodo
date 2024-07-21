import configuration from "../../content-collections.ts";
import { GetTypeByName } from "@content-collections/core";

export type Book = GetTypeByName<typeof configuration, "books">;
export declare const allBooks: Array<Book>;

export {};
