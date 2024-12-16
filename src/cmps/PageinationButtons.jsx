/* eslint-disable react/prop-types */

export function PageinationButtons({ setPageIdx, pageIdx }) {
  return (
    <section className='page-buttons-container'>
      <button
        className='prev-page'
        onClick={() => setPageIdx(pageIdx - 1)}
        disabled={pageIdx === 0}
      >
        Prev
      </button>
      <span>Page: {pageIdx + 1}</span>
      <button className='next-page' onClick={() => setPageIdx(pageIdx + 1)} disabled={pageIdx > 3}>
        Next
      </button>
    </section>
  )
}
