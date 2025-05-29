import './Header.css'

function Header() {
  return (
    <header class="main-header">
      <div class="header-content">
        <h1 class="app-title">
          <span>Twitter Clone</span>
        </h1>
        <button class="theme-toggle" aria-label="Toggle dark mode">
          🌞
        </button>
      </div>
    </header>
  )
}

export default Header