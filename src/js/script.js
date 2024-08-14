document.addEventListener('DOMContentLoaded', () => {
    // Determine the current category based on the data-page attribute in the body tag
    const currentPage = document.body.getAttribute('data-page');
    // Fetch news articles for the current category
    fetchNews(currentPage);
});

/**
 * Fetches news articles based on the category
 * @param {string} category - The category of news to fetch (e.g., 'general', 'business')
 */
async function fetchNews(category) {
    const apiKey = 'b0bd52e5e07843009eb60c37a02243fc'; // Your API key for the News API
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;

    try {
        // Fetch news articles from the API
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`); // Handle HTTP errors
        }
        const data = await response.json(); // Parse the JSON response from the API
        // Display the fetched news articles
        displayNews(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error); // Log any errors
        const newsContainer = document.getElementById('news-container');
        if (newsContainer) {
            newsContainer.innerHTML = `<p>Failed to fetch news. Please try again later.</p>`; // Display an error message in the UI
        }
    }
}

/**
 * Displays news articles on the page
 * @param {Array} articles - The list of articles to display
 */
function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ''; // Clear any existing content

    // Check if we're in the 'pages' directory
    const isInPagesFolder = window.location.pathname.includes('/pages/');

    // Loop through each article and create a news card
    articles.forEach((article) => {
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card p-4 bg-white rounded-lg shadow-md mb-4';

        // Determine the correct image URL; use default.jpg if the article image is missing
        const imageUrl = article.urlToImage && article.urlToImage.trim() !== '' 
            ? article.urlToImage 
            : isInPagesFolder ? '../assets/default.jpg' : 'assets/default.jpg';

        // Generate the HTML content for each news card
        newsCard.innerHTML = `
            <h2 class="font-bold text-xl mb-2" style="height: 85px; title="${article.title}">${article.title}</h2>
            <img class="w-full h-48 object-cover mb-4" src="${imageUrl}" alt="${article.title}">
            <p class="text-gray-700 text-base mb-4">${article.author || 'Unknown author'}</p>
            <p class="text-gray-700 text-base mb-4">${article.description || ''}</p>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onclick="window.open('${article.url}', '_blank')">Source</button>
            <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onclick="goToDetails('${encodeURIComponent(article.title)}', '${encodeURIComponent(article.author || '')}', '${encodeURIComponent(article.publishedAt)}', '${encodeURIComponent(article.source.name)}', '${encodeURIComponent(article.description || '')}', '${encodeURIComponent(article.content || '')}', '${encodeURIComponent(imageUrl)}', '${encodeURIComponent(article.url)}')">Details</button>
        `;

        // Append the news card to the news container
        newsContainer.appendChild(newsCard);
    });
}

/**
 * Redirects to the details page with article details passed as query parameters
 * @param {string} title - The title of the article
 * @param {string} author - The author of the article
 * @param {string} date - The date the article was published
 * @param {string} source - The source of the article
 * @param {string} description - The description of the article
 * @param {string} content - The content of the article
 * @param {string} imageUrl - The URL of the article's image
 * @param {string} url - The URL of the article
 */
function goToDetails(title, author, date, source, description, content, imageUrl, url) {
    const currentPagePath = window.location.pathname;
    const isInPagesFolder = currentPagePath.includes('/pages/');
    
    let basePath = isInPagesFolder ? '' : 'pages/';
    
    const detailsUrl = `${basePath}details.html?title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}&date=${encodeURIComponent(date)}&source=${encodeURIComponent(source)}&description=${encodeURIComponent(description)}&content=${encodeURIComponent(content)}&imageUrl=${encodeURIComponent(imageUrl)}&url=${encodeURIComponent(url)}`;
    
    console.log('Navigating to:', detailsUrl); // For debugging
    window.location.href = detailsUrl;
}




//////////////for tablet's and mobile navbar ////////////

document.getElementById('burger-menu').addEventListener('click', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.style.display = mobileMenu.style.display === 'none' || mobileMenu.style.display === '' ? 'block' : 'none';
});

/**
 * Handles navigation between pages
 * @param {string} targetPage - The page to navigate to (e.g., 'index.html', 'business.html')
 */
function handleNavigation(targetPage) {
    const currentPagePath = window.location.pathname;
    const isInPagesFolder = currentPagePath.includes('/pages/');
    const isNavigatingToHome = targetPage === 'index.html';
    let basePath = '';

    if (isInPagesFolder) {
        if (isNavigatingToHome) {
            // If navigating to the homepage, remove 'pages/' from the path
            basePath = currentPagePath.replace('/pages/', '/').replace(/\/[^\/]*$/, '/');
        }
    } else if (!isNavigatingToHome) {
        // If not navigating to the homepage and currently on the homepage or root, prepend 'pages/'
        basePath = 'pages/';
    }

    // Navigate to the target page
    window.location.href = `${basePath}${targetPage}`;
}
