# AWS Cloud Practitioner Flashcards

A clean, interactive flashcard app for AWS Cloud Practitioner exam preparation with challenging scenario-based questions.

![Alt text]([URL-to-your-imagehttps://github.com/aslanemrecan/aws_cp_examprep_flashcards/blob/1a95814218402f5c4d20dc2a47184d754491a8f2/uuid%3DA1C883F9-8FB6-423A-8E47-4D01C4D8898E%26code%3D001%26library%3D1%26type%3D1%26mode%3D1%26loc%3Dtrue%26cap%3Dtrue.jpeg](https://github.com/aslanemrecan/aws_cp_examprep_flashcards/blob/6f000c1fcd3d9bf056517da70788cc82ac703819/ORNEK.jpeg))

*Interactive 3D flip cards with modern gradient design and comprehensive AWS exam questions*

## Features

- 📚 **25 challenging scenario-based AWS questions** covering real exam topics
- 🎯 **Advanced difficulty** with architecture design and business scenarios
- 🔄 **3D flip animations** with smooth card transitions
- ⌨️ **Enhanced keyboard navigation** (Space, arrows, S for shuffle, R for reset)
- 📱 **Mobile-responsive** with touch/swipe support
- 📊 **Progress tracking** with visual progress bar
- 🔀 **Shuffle & reset** functionality for varied practice
- 🎨 **Modern gradient UI** with professional design
- ⚡ **Zero dependencies** - works offline after first load

## Usage

1. Open `index.html` in your browser
2. Click cards or press Space/Enter to flip
3. Use Previous/Next buttons or arrow keys to navigate
4. Click "Shuffle Cards" to randomize order

## Keyboard Shortcuts

- **Space/Enter**: Flip card
- **Left Arrow**: Previous card  
- **Right Arrow**: Next card
- **S**: Shuffle cards
- **R**: Reset to original order

## Question Categories

Our 25 challenging questions cover:

- 🏗️ **Architecture Design**: Multi-tier applications, disaster recovery, scaling strategies
- 🔒 **Security & Compliance**: IAM, encryption, HIPAA, data residency
- 💰 **Cost Optimization**: Pricing models, Reserved Instances, Spot Instances
- 📊 **Data & Analytics**: RDS vs DynamoDB vs Redshift, big data processing
- 🚀 **DevOps & CI/CD**: Infrastructure as Code, deployment strategies
- 🌐 **Networking**: VPC design, connectivity options, load balancing
- ⚡ **Performance**: Auto-scaling, caching, monitoring strategies

## How to Run

### Method 1: Direct File Opening
```bash
# Simply double-click index.html or:
open index.html
```

### Method 2: Local Server (Recommended)
```bash
# Using Python
python3 -m http.server 8000
# Then visit: http://localhost:8000

# Using Node.js
npx serve .
```

### Method 3: GitHub Pages
Visit the live demo: `https://aslanemrecan.github.io/kiro_temp`

## Customization

Add more flashcards by editing `flashcards.json` with this format:

```json
{
    "question": "Your question here?",
    "answer": "Your answer here."
}
```

## Tech Stack

- **HTML5** - Semantic structure
- **CSS3** - Modern styling with CSS Grid/Flexbox
- **Vanilla JavaScript** - No frameworks, pure performance
- **Google Fonts** - Inter font family for clean typography

## Browser Support

- ✅ Chrome/Edge (recommended)
- ✅ Safari
- ✅ Firefox
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

Perfect for AWS Cloud Practitioner exam prep! 🚀🎓
