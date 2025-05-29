import './SearchBar.css'

function SearchBar(props) {
  return (
    <div class="search-container">
      <div class="search-bar">
        <div class="search-icon">🔍</div>
        <input
          type="text"
          placeholder="Search tweets"
          value={props.searchTerm}
          onInput={(e) => props.setSearchTerm(e.target.value)}
        />
        {props.searchTerm && (
          <button 
            class="clear-button" 
            onClick={() => props.setSearchTerm('')}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchBar