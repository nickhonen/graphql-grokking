import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query getAllAuthors {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query getAllBooks {
    allBooks {
      title
      author
      published
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres,
    ) {
      title
      published
      author
      genres
      id
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation updateAuthor($name: String!, $setBorn: Int!) {
    editAuthor (
      name: $name,
      setBorn: $setBorn,
    ) {
      name
      born
    }
  }
`