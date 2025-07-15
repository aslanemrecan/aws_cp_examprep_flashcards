class FlashcardApp {
    constructor() {
        this.flashcards = [];
        this.originalFlashcards = [];
        this.currentIndex = 0;
        this.isFlipped = false;
        
        this.initElements();
        this.loadFlashcards();
        this.bindEvents();
    }
    
    initElements() {
        this.questionEl = document.getElementById('question');
        this.answerEl = document.getElementById('answer');
        this.flipBtn = document.getElementById('flip-btn');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.shuffleBtn = document.getElementById('shuffle-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.currentCardEl = document.getElementById('current-card');
        this.totalCardsEl = document.getElementById('total-cards');
        this.flashcardEl = document.getElementById('flashcard');
        this.progressFillEl = document.getElementById('progress-fill');
    }
    
    async loadFlashcards() {
        try {
            const response = await fetch('flashcards.json');
            this.flashcards = await response.json();
            this.originalFlashcards = [...this.flashcards];
            this.updateDisplay();
            this.showLoadingComplete();
        } catch (error) {
            console.error('Error loading flashcards:', error);
            this.questionEl.textContent = 'Error loading flashcards. Please refresh the page.';
        }
    }
    
    showLoadingComplete() {
        // Add a subtle animation when cards are loaded
        this.flashcardEl.style.opacity = '0';
        setTimeout(() => {
            this.flashcardEl.style.transition = 'opacity 0.5s ease';
            this.flashcardEl.style.opacity = '1';
        }, 100);
    }
    
    bindEvents() {
        this.flipBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.flipCard();
        });
        
        this.prevBtn.addEventListener('click', () => this.previousCard());
        this.nextBtn.addEventListener('click', () => this.nextCard());
        this.shuffleBtn.addEventListener('click', () => this.shuffleCards());
        this.resetBtn.addEventListener('click', () => this.resetCards());
        this.flashcardEl.addEventListener('click', () => this.flipCard());
        
        // Enhanced keyboard navigation
        document.addEventListener('keydown', (e) => {
            // Prevent default for handled keys
            const handledKeys = [' ', 'Enter', 'ArrowLeft', 'ArrowRight', 's', 'S', 'r', 'R'];
            if (handledKeys.includes(e.key)) {
                e.preventDefault();
            }
            
            switch(e.key) {
                case ' ':
                case 'Enter':
                    this.flipCard();
                    break;
                case 'ArrowLeft':
                    this.previousCard();
                    break;
                case 'ArrowRight':
                    this.nextCard();
                    break;
                case 's':
                case 'S':
                    this.shuffleCards();
                    break;
                case 'r':
                case 'R':
                    this.resetCards();
                    break;
            }
        });
        
        // Add touch/swipe support for mobile
        this.addTouchSupport();
    }
    
    addTouchSupport() {
        let startX = 0;
        let startY = 0;
        
        this.flashcardEl.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        this.flashcardEl.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Only handle horizontal swipes (ignore vertical)
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.nextCard(); // Swipe left = next
                } else {
                    this.previousCard(); // Swipe right = previous
                }
            }
            
            startX = 0;
            startY = 0;
        });
    }
    
    updateDisplay() {
        if (this.flashcards.length === 0) return;
        
        const card = this.flashcards[this.currentIndex];
        this.questionEl.textContent = card.question;
        this.answerEl.textContent = card.answer;
        
        // Update stats and progress
        this.currentCardEl.textContent = this.currentIndex + 1;
        this.totalCardsEl.textContent = this.flashcards.length;
        
        const progress = ((this.currentIndex + 1) / this.flashcards.length) * 100;
        this.progressFillEl.style.width = `${progress}%`;
        
        // Update navigation buttons
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex === this.flashcards.length - 1;
        
        // Reset flip state
        this.resetFlip();
    }
    
    flipCard() {
        this.isFlipped = !this.isFlipped;
        
        if (this.isFlipped) {
            this.flashcardEl.classList.add('flipped');
            this.flipBtn.textContent = 'Show Question';
        } else {
            this.flashcardEl.classList.remove('flipped');
            this.flipBtn.textContent = 'Flip Card';
        }
        
        // Add haptic feedback on mobile
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }
    
    resetFlip() {
        this.isFlipped = false;
        this.flashcardEl.classList.remove('flipped');
        this.flipBtn.textContent = 'Flip Card';
    }
    
    nextCard() {
        if (this.currentIndex < this.flashcards.length - 1) {
            this.currentIndex++;
            this.updateDisplay();
            this.animateCardTransition('next');
        }
    }
    
    previousCard() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateDisplay();
            this.animateCardTransition('prev');
        }
    }
    
    animateCardTransition(direction) {
        // Add subtle slide animation
        const translateX = direction === 'next' ? '20px' : '-20px';
        this.flashcardEl.style.transform = `translateX(${translateX})`;
        this.flashcardEl.style.opacity = '0.7';
        
        setTimeout(() => {
            this.flashcardEl.style.transform = 'translateX(0)';
            this.flashcardEl.style.opacity = '1';
        }, 150);
    }
    
    shuffleCards() {
        // Fisher-Yates shuffle algorithm
        const shuffled = [...this.flashcards];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        
        this.flashcards = shuffled;
        this.currentIndex = 0;
        this.updateDisplay();
        
        // Visual feedback
        this.showNotification('Cards shuffled! 🔀');
    }
    
    resetCards() {
        this.flashcards = [...this.originalFlashcards];
        this.currentIndex = 0;
        this.updateDisplay();
        
        // Visual feedback
        this.showNotification('Cards reset! 🔄');
    }
    
    showNotification(message) {
        // Create temporary notification
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 0.9rem;
            z-index: 1000;
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 100);
        
        // Remove after 2 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 2000);
    }
    
    // Performance optimization: preload next card content
    preloadNextCard() {
        if (this.currentIndex < this.flashcards.length - 1) {
            const nextCard = this.flashcards[this.currentIndex + 1];
            // Preload content (helps with smooth transitions)
            const tempDiv = document.createElement('div');
            tempDiv.textContent = nextCard.question + nextCard.answer;
            tempDiv.style.display = 'none';
            document.body.appendChild(tempDiv);
            setTimeout(() => document.body.removeChild(tempDiv), 100);
        }
    }
}

// Initialize the app with loading state
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation
    const questionEl = document.getElementById('question');
    questionEl.innerHTML = 'Loading flashcards<span class="loading-dots">...</span>';
    
    // Add CSS for loading animation
    const style = document.createElement('style');
    style.textContent = `
        .loading-dots {
            animation: loading 1.5s infinite;
        }
        @keyframes loading {
            0%, 20% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize app
    new FlashcardApp();
});