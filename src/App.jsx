import { createSignal, createEffect, createMemo, Show, Switch, Match, onMount, onCleanup } from 'solid-js'
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
  const [page, setPage] = createSignal(1);
  const [hasMore, setHasMore] = createSignal(true);
  const limit = 10; // match the backend default or desired batch size

  const filteredTweets = createMemo(() => {
    const term = searchTerm().toLowerCase().trim();
    if (!term) return allTweets() || [];

    return allTweets()?.filter(tweet =>
      tweet.content.toLowerCase().includes(term) ||
      tweet.username.toLowerCase().includes(term) ||
      tweet.handle.toLowerCase().includes(term)
    );
  });


  // const getAllTweets = async() => {
  //   try {
  //     const res = await fetch(`https://twitterclone-server-2xz2.onrender.com/tweets`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //     const data = await res.json()
  //     if(data.status) {

  //       const soortedtweets = data.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  //       setAllTweets(soortedtweets);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching tweets:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  const getAllTweets = async () => {
    if (!hasMore()) return;

    setLoading(true);

    try {
      const res = await fetch(`https://twitterclone-server-2xz2.onrender.com/tweets?page=${page()}&limit=${limit}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      if (data.status === "success") {
        const newTweets = data.data;

        if (newTweets.length === 0) {
          setHasMore(false); // no more tweets to fetch
        } else {
          // append new tweets
          setAllTweets(prev => [...prev, ...newTweets]);
          setPage(prev => prev + 1);
        }
      }
    } catch (error) {
      console.error('Error fetching tweets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const innerHeight = window.innerHeight;
    const bodyHeight = document.body.offsetHeight;

    if (scrollY + innerHeight >= bodyHeight - 300 && !loading()) {
      getAllTweets();
    }
  };

  onMount(() => {
    window.addEventListener('scroll', handleScroll);

    // Initial load
    getAllTweets();

    onCleanup(() => {
      window.removeEventListener('scroll', handleScroll);
    });
  });

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
            <TweetCardSkeleton />
            <TweetCardSkeleton />
            <TweetCardSkeleton />
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