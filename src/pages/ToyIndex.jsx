import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, setFilter } from '../store/actions/toy.actions.js'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
// import { userService } from '../services/user.service.js'

import { Loader } from '../cmps/Loader.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { PageinationButtons } from '../cmps/PageinationButtons.jsx'
import { ToySort } from '../cmps/ToySort.jsx'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { toyService } from '../services/toy.service.js'
import { Link } from 'react-router-dom'

export function ToyIndex() {
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
  const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)

  const pageIdx = filterBy.pageIdx || 0

  useEffect(() => {
    loadToys(filterBy)
  }, [filterBy])

  async function onRemoveToy(toyId) {
    try {
      await removeToy(toyId)
      showSuccessMsg(`Toy id: ${toyId} is removed successfully!`)
    } catch (err) {
      console.log('Cannot remove toy', err)
      showErrorMsg(`Cannot remove toy...`)
    }
  }

  function onSetFilter(filterBy) {
    // To break pointer and create copy i need to spread in an object
    // Set the page to the first one to include all the pages...
    setFilter({ ...filterBy, pageIdx: 0 })
  }

  function onSetSort(sortBy) {
    // To break pointer and create copy i need to spread in an object
    // Set the sortBy
    setFilter({ ...filterBy, sortBy })
  }

  function setPageIdx(newPageIdx) {
    if (newPageIdx < 0) return
    setFilter({ ...filterBy, pageIdx: newPageIdx })
  }

  return (
    <main className='main-toys'>
      <PageinationButtons setPageIdx={setPageIdx} pageIdx={pageIdx} />
      <div className='filterSort-Container'>
        <h2>Filter By</h2>
        <ToyFilter onSetFilter={onSetFilter} filterBy={filterBy} />
        <h4>Sort By</h4>
        <ToySort onSetSort={onSetSort} sortBy={filterBy.sortBy || { type: 'name', desc: 1 }} />
      </div>
      <Link className='add-toy-link' to={`/toy/edit/${toyService.getEmptyToy()}`}>
        Add Toy
      </Link>
      {isLoading ? <Loader /> : <ToyList toys={toys} onRemoveToy={onRemoveToy} />}
    </main>
  )
}
