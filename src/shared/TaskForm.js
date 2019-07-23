import React from 'react'
import { Link } from 'react-router-dom'

const TaskForm = ({ task, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label>Title</label>
    <input
      placeholder="Task name"
      value={task.title}
      name="name"
      onChange={handleChange}

    />
    <label>Description</label>
    <input
      placeholder="Description"
      value = {task.director}
      name="description"
      onChange={handleChange}
    />
    <label>Status</label>
    <input
      placeholder="Status"
      value = {task.status}
      name="status"
      onChange={handleChange}
    />
    <label>Notes</label>
    <input
      placeholder="Notes"
      value = {task.notes}
      name="notes"
      onChange={handleChange}
    />
    <label>Due Date</label>
    <input
      placeholder="MM-DD-YYYY"
      value = {task.year}
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
