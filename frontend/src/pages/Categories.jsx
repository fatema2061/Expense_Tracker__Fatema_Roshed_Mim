import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { apiRequest } from '../api/api'

function Categories() {
  const [categories, setCategories] = useState([])

  const [categoryName, setCategoryName] = useState('')
  const [categoryType, setCategoryType] = useState('EXPENSE')

  const [editingId, setEditingId] = useState(null)
  const [editName, setEditName] = useState('')
  const [editType, setEditType] = useState('EXPENSE')

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Load Categories
  const loadCategories = async () => {
    try {
      setLoading(true)
      setError('')

      const data = await apiRequest('/categories')

      setCategories(data.categories)
    } catch (error) {
      console.error(error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCategories()
  }, [])

  // Add Category
  const handleAddCategory = async (e) => {
    e.preventDefault()

    const name = categoryName.trim()

    if (!name) {
      alert('Please enter a category name.')
      return
    }

    try {
      setError('')

      await apiRequest('/categories', {
        method: 'POST',
        body: JSON.stringify({
          name,
          type: categoryType,
        }),
      })

      alert('Category added successfully')

      setCategoryName('')
      setCategoryType('EXPENSE')

      await loadCategories()
    } catch (error) {
      console.error(error)

      alert(
        error.message || 'Failed to add category'
      )
    }
  }

  // Delete Category
  const handleDeleteCategory = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this category?'
    )

    if (!confirmDelete) {
      return
    }

    try {
      setError('')

      await apiRequest(`/categories/${id}`, {
        method: 'DELETE',
      })

      alert('Category deleted successfully')

      await loadCategories()
    } catch (error) {
      console.error(error)

      // Show delete error as popup
      alert(
        error.message ||
          'Cannot delete a category that has transactions'
      )
    }
  }

  // Start Editing
  const handleEdit = (category) => {
    setEditingId(category.id)
    setEditName(category.name)
    setEditType(category.type)
  }

  // Cancel Editing
  const handleCancelEdit = () => {
    setEditingId(null)
    setEditName('')
    setEditType('EXPENSE')
  }

  // Save Edited Category
  const handleSaveEdit = async (id) => {
    const name = editName.trim()

    if (!name) {
      alert('Please enter a category name.')
      return
    }

    try {
      setError('')

      await apiRequest(`/categories/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          name,
          type: editType,
        }),
      })

      alert('Category updated successfully')

      handleCancelEdit()

      await loadCategories()
    } catch (error) {
      console.error(error)

      alert(
        error.message || 'Failed to update category'
      )
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="categories-page">
          <h1>Loading categories...</h1>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />

      <div className="categories-page">

        {/* Page Header */}
        <div className="categories-header">
          <h1>Categories</h1>

          <p>
            Create and manage your income and expense categories.
          </p>
        </div>

        {/* Add Category */}
        <div className="category-form-card">

          <h2>Add New Category</h2>

          <form onSubmit={handleAddCategory}>

            <div className="category-form-row">

              <div className="category-form-group">
                <label>Category Name</label>

                <input
                  type="text"
                  placeholder="e.g. Food"
                  value={categoryName}
                  onChange={(e) =>
                    setCategoryName(e.target.value)
                  }
                />
              </div>

              <div className="category-form-group">
                <label>Type</label>

                <select
                  value={categoryType}
                  onChange={(e) =>
                    setCategoryType(e.target.value)
                  }
                >
                  <option value="EXPENSE">
                    EXPENSE
                  </option>

                  <option value="INCOME">
                    INCOME
                  </option>
                </select>
              </div>

              <button
                type="submit"
                className="add-category-button"
              >
                Add Category
              </button>

            </div>

          </form>

        </div>

        {/* Category List */}
        <div className="category-list-card">

          <div className="category-list-header">
            <h2>Available Categories</h2>

            <span>
              {categories.length} categor
              {categories.length === 1 ? 'y' : 'ies'}
            </span>
          </div>

          <div className="category-list">

            {categories.length === 0 ? (
              <p>No categories found.</p>
            ) : (
              categories.map((category) => (

                <div
                  className="category-item"
                  key={category.id}
                >

                  {editingId === category.id ? (

                    /* Edit Mode */

                    <div className="category-edit-row">

                      <input
                        type="text"
                        value={editName}
                        onChange={(e) =>
                          setEditName(e.target.value)
                        }
                      />

                      <select
                        value={editType}
                        onChange={(e) =>
                          setEditType(e.target.value)
                        }
                      >
                        <option value="EXPENSE">
                          EXPENSE
                        </option>

                        <option value="INCOME">
                          INCOME
                        </option>
                      </select>

                      <button
                        type="button"
                        className="save-category-button"
                        onClick={() =>
                          handleSaveEdit(category.id)
                        }
                      >
                        Save
                      </button>

                      <button
                        type="button"
                        className="cancel-category-button"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>

                    </div>

                  ) : (

                    /* Normal Mode */

                    <>
                      <div className="category-info">

                        <span className="category-name">
                          {category.name}
                        </span>

                        <span
                          className={
                            category.type === 'INCOME'
                              ? 'income-badge'
                              : 'expense-badge'
                          }
                        >
                          {category.type}
                        </span>

                      </div>

                      <div className="category-actions">

                        <button
                          type="button"
                          className="edit-category-button"
                          onClick={() =>
                            handleEdit(category)
                          }
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="delete-category-button"
                          onClick={() =>
                            handleDeleteCategory(
                              category.id
                            )
                          }
                        >
                          Delete
                        </button>

                      </div>
                    </>

                  )}

                </div>

              ))
            )}

          </div>

        </div>

      </div>
    </>
  )
}

export default Categories