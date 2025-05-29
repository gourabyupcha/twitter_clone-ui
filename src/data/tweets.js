const getRandomTimestamp = () => {
  const now = new Date();
  const randomMinutes = Math.floor(Math.random() * 60 * 24 * 7);
  const date = new Date(now.getTime() - randomMinutes * 60 * 1000);
  
  if (date.toDateString() === now.toDateString()) {
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
  }
  
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return `${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()}`;
};

export const dummyTweets = [
  {
    id: '1',
    username: 'John Doe',
    handle: '@johndoe',
    content: 'Just deployed my new website! Check it out at my profile. #webdev #coding',
    timestamp: getRandomTimestamp(),
    likes: 42,
    retweets: 5,
    replies: 3,
    isLiked: false,
    isRetweeted: false
  },
  {
    id: '2',
    username: 'Tech News',
    handle: '@technews',
    content: 'Breaking: New JavaScript framework promises to solve all your problems and create new ones you didn\'t know you had!',
    timestamp: getRandomTimestamp(),
    likes: 153,
    retweets: 78,
    replies: 24,
    isLiked: true,
    isRetweeted: false
  },
  {
    id: '3',
    username: 'Code Wizard',
    handle: '@codewizard',
    content: 'Unpopular opinion: TypeScript is worth the initial learning curve. The long-term benefits far outweigh the short-term pain.',
    timestamp: getRandomTimestamp(),
    likes: 321,
    retweets: 112,
    replies: 67,
    isLiked: false,
    isRetweeted: true
  },
  {
    id: '4',
    username: 'Sarah Smith',
    handle: '@sarahcodes',
    content: 'Just finished my 30-day coding challenge! Learned so much about React, SolidJS, and Svelte. Excited to build more projects!',
    timestamp: getRandomTimestamp(),
    likes: 87,
    retweets: 12,
    replies: 9,
    isLiked: false,
    isRetweeted: false
  },
  {
    id: '5',
    username: 'Dev Humor',
    handle: '@devhumor',
    content: 'Why do programmers prefer dark mode? Because light attracts bugs! 🐛',
    timestamp: getRandomTimestamp(),
    likes: 532,
    retweets: 231,
    replies: 42,
    isLiked: true,
    isRetweeted: true
  }
]