/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"
import { useQuery, useMutation } from '@apollo/client'

const Authors = ({ show, setError }) => {
  const [name, setName] = useState('')
  const [birth, setBirth] = useState(2024)
  const { loading, data } = useQuery(ALL_AUTHORS)
  const [ updateAuthor, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS }]
  })

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError('person not found')
    }
  }, [result.data])
    
  if (loading) return <div>loading...</div>

  if (!show) {
    return null
  }

  const submitAuthor = async (event) => {
    event.preventDefault()

    console.log('edit author...')
    console.log(birth)

    updateAuthor({ variables: { name: name, setBorn: birth }})
      .catch(error => console.log(error.message))
    
    setName('')
    setBirth(2024)
  }

  return (
    <div>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {data.allAuthors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Set birthyear</h2>
        <form 
          onSubmit={submitAuthor}>
          <div>
            name
            <input
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </div>
          <div>
            born
            <input
              type="number"
              value={birth}
              onChange={({ target }) => setBirth(parseInt(target.value))}
            />
          </div>
          <button type="submit">edit author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
