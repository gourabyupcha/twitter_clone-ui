import { createSignal } from 'solid-js'
import './TweetCard.css'
import { toTwitterDateFormat } from '../../functions/timestampConvert';

function TweetCard(props) {
  const [isLiked, setIsLiked] = createSignal(props.tweet.isLiked);
  const [isRetweeted, setIsRetweeted] = createSignal(props.tweet.isRetweeted);
  const [likeCount, setLikeCount] = createSignal(props.tweet.likes);
  const [retweetCount, setRetweetCount] = createSignal(props.tweet.retweets);

  const handleLike = () => {
    if (isLiked()) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setIsLiked(!isLiked());
  };

  const handleRetweet = () => {
    if (isRetweeted()) {
      setRetweetCount(prev => prev - 1);
    } else {
      setRetweetCount(prev => prev + 1);
    }
    setIsRetweeted(!isRetweeted());
  };

  return (
    <article class="tweet-card">
      <div class="tweet-avatar">
        {props.tweet.username.charAt(0).toUpperCase()}
      </div>
      <div class="tweet-content">
        <div class="tweet-header">
          <div class="tweet-user-info">
            <span class="tweet-username">{props.tweet.username}</span>
            <span class="tweet-handle">{props.tweet.handle}</span>
          </div>
          <span class="tweet-timestamp">Posted: {toTwitterDateFormat(props.tweet.timestamp)}</span>
        </div>
        <p class="tweet-text">{props.tweet.content}</p>
        <div class="tweet-actions">
          <button class="tweet-action reply-button" aria-label="Reply">
            💬 <span>{props.tweet.replies}</span>
          </button>
          <button 
            class={`tweet-action retweet-button ${isRetweeted() ? 'active' : ''}`}
            onClick={handleRetweet}
            aria-label="Retweet"
          >
            🔄 <span>{retweetCount()}</span>
          </button>
          <button 
            class={`tweet-action like-button ${isLiked() ? 'active' : ''}`}
            onClick={handleLike}
            aria-label="Like"
          >
            {isLiked() ? '❤️' : '🤍'} <span>{likeCount()}</span>
          </button>
          <button class="tweet-action share-button" aria-label="Share">
            📤
          </button>
        </div>
      </div>
    </article>
  )
}

export default TweetCard