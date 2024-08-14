document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);

    const title = urlParams.get('title');
    const author = urlParams.get('author');
    const date = urlParams.get('date');
    const source = urlParams.get('source');
    const description = urlParams.get('description');
    const content = urlParams.get('content');
    const articleUrl = urlParams.get('url');
    const imageUrl = urlParams.get('imageUrl');

    // Populate the details page with the article information
    document.getElementById('article-title').textContent = decodeURIComponent(title);
    document.getElementById('article-author').textContent = author ? `By ${decodeURIComponent(author)}` : 'Unknown Author';
    document.getElementById('article-date').textContent = date ? new Date(decodeURIComponent(date)).toLocaleDateString() : 'Date not available';
    document.getElementById('article-source').textContent = `Source: ${decodeURIComponent(source)}`;
    document.getElementById('article-description').textContent = decodeURIComponent(description);
    document.getElementById('article-content').textContent = decodeURIComponent(content);

    // Set the link for the "Read Full Article" button
    const readFullArticleButton = document.getElementById('article-url');
    readFullArticleButton.href = decodeURIComponent(articleUrl); // Ensure the source button has the correct URL
    readFullArticleButton.target = '_blank'; // Open the article in a new tab

    // Handle the image
    const imageElement = document.getElementById('article-image');

// Check if the imageUrl is valid and not null
if (imageUrl && imageUrl !== 'null' && imageUrl !== 'undefined') {
    imageElement.src = decodeURIComponent(imageUrl);  // Set the image source to the provided URL
} else {
    imageElement.src = '../assets/default.jpg';  // Fallback to the default image if no valid URL is provided
}

// Handle image load error (e.g., if the provided image URL is broken)
imageElement.onerror = function() {
    imageElement.src = '../assets/default.jpg';  // Use the default image if the original fails to load
};

});
