import '../Loaders/CustomCss.css'


export const TweetCardSkeleton = () => {
    return (
        <article class="tweet-card skeleton">
            <div class="tweet-avatar skeleton-avatar"></div>
            <div class="tweet-content">
                <div class="tweet-header">
                    <div class="skeleton-tweet-user-info">
                        <div class="skeleton-line short"></div>
                        <div class="skeleton-line xshort"></div>
                    </div>
                    {/* <div class="skeleton-line xshort"></div> */}
                </div>
                <div class="skeleton-line"></div>
                <div class="skeleton-line"></div>
                <div class="skeleton-line short"></div>
                <div class="tweet-actions">
                    <div class="skeleton-icon"></div>
                    <div class="skeleton-icon"></div>
                    <div class="skeleton-icon"></div>
                    <div class="skeleton-icon"></div>
                </div>
            </div>
        </article>
    )
}