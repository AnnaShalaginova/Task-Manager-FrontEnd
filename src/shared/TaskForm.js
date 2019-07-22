import React from 'react'
import { Link } from 'react-router-dom'

const TaskForm = ({ movie, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label>Title</label>
    <input
      placeholder="Title of Film"
      value={movie.title}
      name="title"
      onChange={handleChange}

    />
    <label>Director</label>
    <input
      placeholder="Director"
      value = {movie.director}
      name="director"
      onChange={handleChange}
    />
    <label>Year</label>
    <input
      placeholder="YYYY-MM-DD"
      value = {movie.year}
      name="year"
      onChange={handleChange}
      type="date"
    />

    <button type="submit">Submit</button>
    <Link to={cancelPath}>
      <button>Cancel</button>
    </Link>
  </form>

)

export default TaskForm
