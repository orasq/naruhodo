# Naruhodo

A simple application to help me read Japanese books with click-to-open dictionary functionality.

![](public/images/naruhodo.gif)

## Run application locally

```bash
scripts/start.sh
```

For the "tokenize" API endpoint, you could run the following app locally as well: https://github.com/orasq/naruhodo-api

## To-do

- Use React Query to make requests to the tokenize API
- Implement list virtualization on book pages to avoid rendering too many DOM elements (paragraphs).
- Add authentication to enable private book collections.
- Add search and filtering functionality to the book collection
- Improve accessibility
- Generate AI audio on demand for each paragraph?
