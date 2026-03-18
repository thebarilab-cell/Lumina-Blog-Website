const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');
const heroBg = document.querySelector('.hero-bg');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    dot.style.left = `${posX}px`;
    dot.style.top = `${posY}px`;

    outline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });

    // Parallax effect for hero
    if (heroBg) {
        const moveX = (posX - window.innerWidth / 2) / 50;
        const moveY = (posY - window.innerHeight / 2) / 50;
        heroBg.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;
    }
});

// Cursor hover effect
document.querySelectorAll('a, button, .article-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        outline.style.transform = 'translate(-50%, -50%) scale(2)';
        outline.style.borderColor = 'var(--accent-color)';
    });
    el.addEventListener('mouseleave', () => {
        outline.style.transform = 'translate(-50%, -50%) scale(1)';
        outline.style.borderColor = 'var(--text-color)';
    });
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Blog Posts Data
const posts = [
    {
        title: "The Evolution of Digital Interfaces",
        excerpt: "Exploring how spatial computing and AI are reshaping the way we interact with information.",
        category: "Technology",
        date: "Jan 12, 2024",
        image: "assets/post1.png",
        author: "Alex Rivera"
    },
    {
        title: "Minimalism in the Age of Noise",
        excerpt: "Why the most effective designs are often the ones that dare to stay silent.",
        category: "Design",
        date: "Jan 15, 2024",
        image: "assets/post2.png",
        author: "Sarah Chen"
    },
    {
        title: "The Future of Sustainable Tech",
        excerpt: "How emerging technologies are paving the way for a more eco-conscious digital world.",
        category: "Ethics",
        date: "Jan 18, 2024",
        image: "assets/hero.png",
        author: "Jordan Lee"
    },
    {
        title: "Bridging the Gap: AI & Creativity",
        excerpt: "Can machines truly create art, or are they just sophisticated mirrors of human intent?",
        category: "AI",
        date: "Jan 20, 2024",
        image: "assets/post1.png",
        author: "Elena Vance"
    },
    {
        title: "Hyper-Realism in Web Design",
        excerpt: "The comeback of textures, shadows, and depth in modern user interfaces.",
        category: "Trends",
        date: "Jan 22, 2024",
        image: "assets/post2.png",
        author: "Marcus Thorne"
    },
    {
        title: "The Soul of Typography",
        excerpt: "How choosing the right typeface can completely change the emotional impact of your message.",
        category: "Typography",
        date: "Jan 24, 2024",
        image: "assets/hero.png",
        author: "Lila Rose"
    }
];

// Inject Blog Posts
function renderPosts(containerId, limit = null) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    const displayPosts = limit ? posts.slice(0, limit) : posts;

    displayPosts.forEach((post, index) => {
        const article = document.createElement('article');
        article.className = 'article-card';
        article.innerHTML = `
            <div class="card-image">
                <img src="${post.image}" alt="${post.title}">
            </div>
            <div class="card-content">
                <div class="card-meta">
                    <span>${post.category}</span>
                    <span>${post.date}</span>
                </div>
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <div class="card-footer">
                    <div class="author">
                        <div class="author-img"></div>
                        <span>${post.author}</span>
                    </div>
                    <a href="post-detail.html" class="read-more">Read More <i data-lucide="arrow-right"></i></a>
                </div>
            </div>
        `;
        container.appendChild(article);

        // Observe for animation
        if (typeof observer !== 'undefined') {
            observer.observe(article);
        }
    });

    // Re-run lucide for new icons
    lucide.createIcons();
}

// Initial renders based on page
document.addEventListener('DOMContentLoaded', () => {
    renderPosts('blog-posts', 3); // Home page limited
    renderPosts('all-posts');     // Articles page
    renderPosts('related-posts-grid', 3); // Related posts on detail page
});

// Intersection Observer for Reveal Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.article-card').forEach(card => {
    observer.observe(card);
});

// Smooth Scroll for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
