import './EmptyState.css'

function EmptyState(props) {
  return (
    <div class="empty-state">
      <div class="empty-state-icon">🔍</div>
      <h2>No results found for "{props.searchTerm}"</h2>
      <p>Try searching for something else or check your spelling.</p>
    </div>
  )
}

export default EmptyState