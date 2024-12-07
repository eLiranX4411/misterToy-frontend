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

export function ToyIndex() {
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
  const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)

  useEffect(() => {
    loadToys(filterBy)
  }, [filterBy])

  function onRemoveToy(toyId) {
    removeToy(toyId)
      .then(() => {
        showSuccessMsg(`Toy id: ${toyId} is removed successfully!`)
      })
      .catch((err) => {
        console.log('Cannot remove toy', err)
        showErrorMsg(`Cannot remove toy...`, err)
      })
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

  function setPageIdx(pageIdx) {
    setFilter({ pageIdx })
  }

  return (
    <main className='main-toys'>
      <PageinationButtons setPageIdx={setPageIdx} />
      <div className='filterSort-Container'>
        <h2>Filter By</h2>
        <ToyFilter onSetFilter={onSetFilter} filterBy={filterBy} />
        <h4>Sort By</h4>
        <ToySort onSetSort={onSetSort} sortBy={filterBy.sortBy || { type: 'name', desc: 1 }} />
      </div>
      {isLoading ? <Loader /> : <ToyList toys={toys} onRemoveToy={onRemoveToy} />}
    </main>
  )
}
