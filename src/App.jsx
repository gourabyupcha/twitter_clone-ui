import { createSignal, createEffect, createMemo, Show } from 'solid-js'
import { dummyTweets } from './data/tweets'
import Header from './components/Header/Header'
import SearchBar from './components/SearchBar/SearchBar'
import TweetList from './components/TweetList/TweetList'
import EmptyState from './components/EmptyState/EmptyState'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = createSignal('');
  const [isDarkMode, setIsDarkMode] = createSignal(true);
  const [allTweets, setAllTweets] = createSignal([]);
  
  const filteredTweets = createMemo(() => {
    const term = searchTerm().toLowerCase().trim();
    if (!term) return allTweets() || [];
    
    return allTweets()?.filter(tweet => 
      tweet.content.toLowerCase().includes(term) || 
      tweet.username.toLowerCase().includes(term) ||
      tweet.handle.toLowerCase().includes(term)
    );
  });


  const getAllTweets = async() => {
    try {
      const res = await fetch(`https://twitterclone-server-2xz2.onrender.com/tweets`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      if(data.status) {

        const soortedtweets = data.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setAllTweets(soortedtweets);
      }
    } catch (error) {
      console.error('Error fetching tweets:', error);
    }
  }

  createEffect(() => {
    getAllTweets()
  })

  createEffect(() => {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        setIsDarkMode(!isDarkMode());
        document.body.classList.toggle('light-mode', !isDarkMode());
      });
    }
    
    document.body.classList.toggle('light-mode', !isDarkMode());
  });

  return (
    <div class="app-container">
      <Header />
      <main>
        <SearchBar searchTerm={searchTerm()} setSearchTerm={setSearchTerm} />
        <Show 
          when={filteredTweets().length > 0}
          fallback={<EmptyState searchTerm={searchTerm()} />}
        >
          <TweetList tweets={filteredTweets()} />
        </Show>
      </main>
    </div>
  )
}

export default App