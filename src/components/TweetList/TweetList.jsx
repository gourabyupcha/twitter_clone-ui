import { For } from 'solid-js'
import TweetCard from '../TweetCard/TweetCard'
import './TweetList.css'

function TweetList(props) {
  return (
    <div class="tweet-list">
      <For each={props.tweets}>
        {(tweet) => <TweetCard tweet={tweet} />}
      </For>
    </div>
  )
}

export default TweetList