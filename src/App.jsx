import { createSignal, createEffect, createMemo, Show, Switch, Match } from 'solid-js'
import { dummyTweets } from './data/tweets'
import Header from './components/Header/Header'
import SearchBar from './components/SearchBar/SearchBar'
import TweetList from './components/TweetList/TweetList'
import EmptyState from './components/EmptyState/EmptyState'
import './App.css'
import { TweetCardSkeleton } from './components/Loaders/TweetSkeleton'

function App() {
  const [searchTerm, setSearchTerm] = createSignal('');
  const [isDarkMode, setIsDarkMode] = createSignal(true);
  const [allTweets, setAllTweets] = createSignal([]);
  const [loading, setLoading] = createSignal(true);
  
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
    } finally {
      setLoading(false);
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

        <Switch>
          <Match when={loading()}>
            <TweetCardSkeleton />
          </Match>

          <Match when={!loading() && allTweets().length === 0}>
            <EmptyState searchTerm={searchTerm()} />
          </Match>
          <Match when={!loading() && allTweets().length > 0}>
            <TweetList tweets={filteredTweets()} />
          </Match>
        </Switch>
      </main>
    </div>
  )
}

export default App