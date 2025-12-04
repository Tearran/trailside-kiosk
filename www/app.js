/**
 * Trailside Kiosk - Single Page Application
 * Handles navigation, content loading, and statistics
 */

class TrailsideApp {
    constructor() {
        this.currentCategory = null;
        this.currentContent = null;
        this.stats = { views: 0, sessions: 0 };
        this.init();
    }
    
    init() {
        console.log('Trailside Kiosk initializing...');
        this.attachEventListeners();
        this.loadStats();
    }
    
    attachEventListeners() {
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                this.loadCategory(category);
            });
        });
    }
    
    async loadCategory(category) {
        console.log(`Loading category: ${category}`);
        this.currentCategory = category;
        
        try {
            // Load category index
            const response = await fetch(`tours/content/${category}/index.json`);
            if (response.ok) {
                const index = await response.json();
                this.displayCategoryIndex(category, index);
            } else {
                // If no index, scan for content files
                this.displayCategoryBrowse(category);
            }
        } catch (error) {
            console.error(`Error loading category ${category}:`, error);
            this.displayCategoryBrowse(category);
        }
    }
    
    displayCategoryIndex(category, index) {
        const content = document.getElementById('content');
        content.innerHTML = `
            <h2>${this.categoryTitle(category)}</h2>
            <div class="content-grid">
                ${index.items.map(item => `
                    <div class="content-card" data-id="${item.id}">
                        <h3>${item.name}</h3>
                        <p>${item.summary}</p>
                    </div>
                `).join('')}
            </div>
            <button class="back-btn">← Back</button>
        `;
        
        this.attachContentListeners();
    }
    
    displayCategoryBrowse(category) {
        const content = document.getElementById('content');
        content.innerHTML = `
            <h2>${this.categoryTitle(category)}</h2>
            <p>Browse ${category} content...</p>
            <button class="back-btn">← Back</button>
        `;
        
        this.attachContentListeners();
    }
    
    async loadContent(category, contentId) {
        try {
            const response = await fetch(`tours/content/${category}/${contentId}.json`);
            if (response.ok) {
                const content = await response.json();
                this.displayContent(content);
                this.recordView(content.id);
            }
        } catch (error) {
            console.error(`Error loading content ${contentId}:`, error);
        }
    }
    
    displayContent(content) {
        const contentDiv = document.getElementById('content');
        contentDiv.innerHTML = `
            <article class="content-detail">
                <h2>${content.name}</h2>
                ${content.scientific_name ? `<p class="scientific-name">${content.scientific_name}</p>` : ''}
                <p class="summary">${content.summary}</p>
                <div class="description">${content.description}</div>
                ${content.safety ? `<div class="safety-note">! ${content.safety}</div>` : ''}
                ${content.fun_fact ? `<div class="fun-fact">◈ Fun Fact: ${content.fun_fact}</div>` : ''}
            </article>
            <button class="back-btn">← Back to ${this.categoryTitle(this.currentCategory)}</button>
        `;
        
        this.attachContentListeners();
    }
    
    attachContentListeners() {
        const backBtn = document.querySelector('.back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                if (this.currentCategory) {
                    this.loadCategory(this.currentCategory);
                } else {
                    location.reload();
                }
            });
        }
        
        const contentCards = document.querySelectorAll('.content-card');
        contentCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const id = e.currentTarget.dataset.id;
                this.loadContent(this.currentCategory, id);
            });
        });
    }
    
    categoryTitle(category) {
        const titles = {
            fauna: '◉ Fauna',
            flora: '❋ Flora',
            fungi: '⚘ Fungi',
            water: '≋ Water Resources',
            geology: '▲ Geology',
            cultural: '◆ Cultural Heritage',
            safety: '! Safety Guidelines',
            stewardship: '✤ Land Stewardship'
        };
        return titles[category] || category;
    }
    
    loadStats() {
        // TODO: Load from stats.json
        this.stats.sessions++;
    }
    
    recordView(contentId) {
        this.stats.views++;
        console.log(`Recorded view: ${contentId}`);
        // TODO: Update stats.json
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new TrailsideApp();
});
