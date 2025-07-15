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
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.flashcards = await response.json();
            this.originalFlashcards = [...this.flashcards];
            this.updateDisplay();
            this.showLoadingComplete();
        } catch (error) {
            console.error('Error loading flashcards:', error);
            console.log('Falling back to embedded flashcards...');
            this.loadEmbeddedFlashcards();
        }
    }

    loadEmbeddedFlashcards() {
        // Fallback flashcards embedded directly in JavaScript
        this.flashcards = [
            {
                "question": "A company needs to ensure their application can handle sudden traffic spikes during Black Friday sales. Which combination of AWS services would provide the MOST cost-effective auto-scaling solution?",
                "answer": "Amazon EC2 Auto Scaling Groups with Application Load Balancer and CloudWatch metrics. This automatically adds/removes instances based on demand, with ALB distributing traffic and CloudWatch monitoring performance metrics."
            },
            {
                "question": "Your organization stores sensitive customer data in S3. Which security measures should be implemented to meet compliance requirements for data at rest and in transit?",
                "answer": "Enable S3 Server-Side Encryption (SSE-S3, SSE-KMS, or SSE-C), use HTTPS/TLS for data in transit, implement bucket policies with least privilege access, enable S3 Access Logging, and use AWS CloudTrail for API auditing."
            },
            {
                "question": "A startup wants to migrate their monolithic application to AWS with minimal changes initially, but plans to modernize later. What migration strategy should they use?",
                "answer": "Lift-and-Shift (Rehosting) strategy using EC2 instances or AWS Application Migration Service. This allows quick migration with minimal code changes, then gradually refactor to microservices using containers (ECS/EKS) or serverless (Lambda)."
            },
            {
                "question": "Compare the use cases: When would you choose Amazon RDS vs DynamoDB vs Amazon Redshift for different data scenarios?",
                "answer": "RDS: Relational data with ACID transactions, complex queries, existing SQL applications. DynamoDB: NoSQL, high-performance apps, gaming, IoT, mobile backends. Redshift: Data warehousing, analytics, OLAP, business intelligence with large datasets."
            },
            {
                "question": "A company needs disaster recovery with RTO of 4 hours and RPO of 1 hour. Which AWS DR strategy and services should they implement?",
                "answer": "Warm Standby strategy: Maintain scaled-down version in secondary region using RDS Cross-Region Read Replicas, S3 Cross-Region Replication, Route 53 health checks for failover, and AWS Backup for point-in-time recovery."
            },
            {
                "question": "Explain the difference between AWS IAM Roles, Policies, and Groups. When would you use each?",
                "answer": "Policies: JSON documents defining permissions. Groups: Collections of users with similar access needs. Roles: Temporary credentials for services/applications. Use Groups for user management, Policies for permission definition, Roles for service-to-service access and cross-account access."
            },
            {
                "question": "A global e-commerce site needs to serve static content with low latency worldwide while protecting against DDoS attacks. What AWS architecture would you recommend?",
                "answer": "CloudFront CDN with S3 origin for static content, AWS Shield Standard/Advanced for DDoS protection, WAF for application-layer filtering, Route 53 for DNS with health checks, and multiple edge locations for global distribution."
            },
            {
                "question": "What are the key differences between AWS Lambda, ECS, EKS, and EC2 for running applications? When would you choose each?",
                "answer": "Lambda: Serverless, event-driven, short-running functions, pay-per-execution. ECS: Container orchestration, Docker support, managed service. EKS: Kubernetes-based, complex orchestration, hybrid deployments. EC2: Full control, persistent workloads, custom configurations."
            },
            {
                "question": "A company wants to implement a multi-tier architecture with high availability. How would you design the network architecture using VPC components?",
                "answer": "Create VPC with public subnets (web tier) and private subnets (app/DB tiers) across multiple AZs. Use Internet Gateway for public access, NAT Gateway for private subnet internet access, Application Load Balancer for traffic distribution, and Security Groups/NACLs for security layers."
            },
            {
                "question": "Compare AWS pricing models: On-Demand vs Reserved Instances vs Spot Instances vs Savings Plans. What are the trade-offs and optimal use cases?",
                "answer": "On-Demand: Flexible, no commitment, highest cost, good for unpredictable workloads. Reserved: 1-3 year commitment, up to 75% savings, steady workloads. Spot: Up to 90% savings, can be interrupted, fault-tolerant apps. Savings Plans: Flexible, commitment-based, covers compute across services."
            },
            {
                "question": "A financial services company needs to ensure data residency compliance. How can they control where their data is stored and processed in AWS?",
                "answer": "Choose specific AWS Regions for data residency, use S3 bucket policies to restrict cross-region replication, implement AWS Config rules for compliance monitoring, use AWS Organizations SCPs to prevent resource creation in non-compliant regions, and enable CloudTrail for audit trails."
            },
            {
                "question": "What is the difference between AWS CloudFormation, CDK, Terraform, and manual deployment? When would you use Infrastructure as Code?",
                "answer": "CloudFormation: AWS-native, JSON/YAML templates, tight AWS integration. CDK: Code-based, multiple languages, generates CloudFormation. Terraform: Multi-cloud, HCL syntax, state management. Use IaC for version control, repeatability, consistency, and automated deployments."
            },
            {
                "question": "A company experiences intermittent performance issues with their RDS database. What monitoring and optimization strategies should they implement?",
                "answer": "Enable RDS Performance Insights, CloudWatch metrics monitoring, set up CloudWatch alarms for CPU/memory/connections, implement read replicas for read-heavy workloads, consider Multi-AZ for high availability, and use RDS Proxy for connection pooling."
            },
            {
                "question": "Explain the AWS Well-Architected Framework's 6 pillars with specific implementation examples for each pillar.",
                "answer": "1. Operational Excellence: CloudFormation, CI/CD pipelines. 2. Security: IAM, encryption, VPC. 3. Reliability: Multi-AZ, auto-scaling, backups. 4. Performance: CloudFront, right-sizing, monitoring. 5. Cost Optimization: Reserved Instances, auto-scaling, rightsizing. 6. Sustainability: Efficient architectures, managed services."
            },
            {
                "question": "A startup needs to choose between serverless (Lambda + API Gateway + DynamoDB) vs traditional (EC2 + RDS) architecture. What factors should influence their decision?",
                "answer": "Serverless: Lower operational overhead, automatic scaling, pay-per-use, faster development, good for variable/unpredictable traffic. Traditional: More control, consistent performance, complex applications, existing SQL expertise, predictable costs for steady workloads."
            },
            {
                "question": "How would you implement a secure CI/CD pipeline in AWS that follows DevSecOps best practices?",
                "answer": "Use CodeCommit for source control, CodeBuild with security scanning (SAST/DAST), CodeDeploy for deployment, CodePipeline for orchestration, IAM roles for service permissions, AWS Secrets Manager for credentials, and AWS Config for compliance monitoring."
            },
            {
                "question": "A company wants to analyze large datasets for business intelligence. Compare Amazon Redshift, Athena, EMR, and QuickSight for different analytics scenarios.",
                "answer": "Redshift: Data warehouse, structured data, complex queries, consistent performance. Athena: Serverless, query S3 data, ad-hoc analysis, pay-per-query. EMR: Big data processing, Hadoop/Spark, complex analytics. QuickSight: BI visualization, dashboards, business users."
            },
            {
                "question": "What are the security implications and best practices when using AWS Lambda functions that access other AWS services?",
                "answer": "Use IAM roles (not access keys), implement least privilege principle, encrypt environment variables, use VPC for network isolation when needed, enable CloudTrail logging, implement input validation, use AWS Secrets Manager for sensitive data, and regularly rotate credentials."
            },
            {
                "question": "A company needs to migrate 100TB of data to AWS with minimal downtime. What data transfer options and strategies should they consider?",
                "answer": "AWS DataSync for online transfer, AWS Snow family (Snowball/Snowmobile) for offline transfer, AWS Direct Connect for dedicated network connection, S3 Transfer Acceleration for faster uploads, and hybrid approach combining multiple methods based on timeline and bandwidth constraints."
            },
            {
                "question": "Explain the concept of eventual consistency in DynamoDB and how it affects application design. What are the trade-offs with strongly consistent reads?",
                "answer": "Eventual consistency: Changes propagate across replicas within seconds, higher performance, lower cost. Strong consistency: Immediate consistency, higher latency, double cost. Design considerations: Use strong consistency for critical reads, eventual for performance-sensitive operations, implement retry logic for consistency delays."
            },
            {
                "question": "A company wants to implement blue-green deployment strategy on AWS. What services and architecture patterns would enable this approach?",
                "answer": "Use Elastic Load Balancer with two identical environments (blue/green), Route 53 weighted routing for traffic shifting, Auto Scaling Groups for each environment, CodeDeploy for automated deployments, and CloudWatch for monitoring during transitions."
            },
            {
                "question": "What are the differences between AWS Organizations, Control Tower, and Config for governance and compliance management?",
                "answer": "Organizations: Multi-account management, consolidated billing, SCPs for policy enforcement. Control Tower: Landing zone setup, guardrails, account factory for standardized environments. Config: Resource compliance monitoring, configuration history, remediation actions."
            },
            {
                "question": "A company needs to ensure their AWS architecture can handle a 10x increase in traffic during peak events. What scalability patterns and services should they implement?",
                "answer": "Implement horizontal scaling with Auto Scaling Groups, use Application Load Balancer for traffic distribution, CloudFront for content caching, ElastiCache for database caching, RDS read replicas for database scaling, and SQS for decoupling components."
            },
            {
                "question": "Compare the networking capabilities: VPC Peering vs Transit Gateway vs AWS PrivateLink. When would you use each for different connectivity scenarios?",
                "answer": "VPC Peering: Direct connection between two VPCs, simple setup, no transitive routing. Transit Gateway: Hub-and-spoke model, multiple VPC connections, transitive routing, complex networks. PrivateLink: Private connectivity to AWS services, no internet routing, enhanced security."
            },
            {
                "question": "A healthcare company needs to ensure HIPAA compliance for their AWS workloads. What specific AWS services and configurations are required?",
                "answer": "Use HIPAA-eligible services (EC2, S3, RDS, etc.), enable encryption at rest and in transit, implement access logging with CloudTrail, use dedicated instances/hosts when required, sign AWS BAA, implement proper IAM policies, and use AWS Config for compliance monitoring."
            }
        ];

        this.originalFlashcards = [...this.flashcards];
        this.updateDisplay();
        this.showLoadingComplete();
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

            switch (e.key) {
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