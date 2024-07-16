const apiUrl = 'https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json';

// Function to fetch data and update content
async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Get the navigation buttons and card section
        const buttons = document.querySelectorAll('.nav-container button');
        const cardSection = document.querySelector('.card-section');

        // Function to truncate title
        function truncateTitle(title, wordLimit) {
            const words = title.split(' ');
            if (words.length > wordLimit) {
                return words.slice(0, wordLimit).join(' ') + '...';
            }
            return title;
        }

        // Function to generate card HTML
        function createCardHtml(product) {
            return `
                <div class="card-parent">
                    <div class="img-parent">
                        <div class="img-child">
                            <img src="${product.image}" alt="${product.title}" class="product-image">
                            <div class="btn-on-img">
                                <button class="${product.badge_text ? 'badge-button' : 'no-badge'}">
                                    ${product.badge_text || ''}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="content-container">
                        <div class="wear-type-and-name-container">
                            <div class="wear-type truncate">${product.title.length > 30 ? `${product.title.substring(0, 10)}...` : product.title}</div>
                            <div><div class="dot"></div></div>
                            <div class="wear-name">${product.vendor}</div>
                        </div>
                        <div class="price-container">
                            <div class="offer-price">Rs ${product.price}</div>
                            <div class="price">Rs ${product.compare_at_price}</div>
                            <div class="discount">${product.badge_text || ''}</div>
                        </div>
                        <div class="add-to-cart-btn-container">
                            <button class="add-to-cart-btn">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `;
        }

        // Function to update cards based on category
        function updateCards(categoryName) {
            const category = data.categories.find(cat => cat.category_name === categoryName);
            const products = category.category_products;
            cardSection.innerHTML = products.map(createCardHtml).join('');
        }

        // Function to handle button click
        function handleButtonClick(event) {
            const category = event.target.textContent;

            // Remove active class from all buttons
            buttons.forEach(btn => btn.classList.remove('active-btn'));

            // Add active class to the clicked button
            event.target.classList.add('active-btn');

            // Update cards based on category
            updateCards(category);
        }

        // Attach event listeners to buttons
        buttons.forEach(button => button.addEventListener('click', handleButtonClick));

        // Initially display Men category
        updateCards('Men');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Fetch data on page load
fetchData();