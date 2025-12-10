// Comprehensive Knowledge Base for Accurate AI Responses

const knowledgeBase = {
  // Technology & Programming
  technology: {
    'javascript': {
      definition: 'JavaScript is a high-level, interpreted programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.',
      details: 'It enables interactive web pages and is an essential part of web applications. JavaScript supports object-oriented, imperative, and functional programming styles. Key features include: variables (let, const, var), functions, objects, arrays, async/await for asynchronous operations, and ES6+ features like arrow functions, destructuring, and modules.',
      useCases: 'Used for frontend development (React, Vue, Angular), backend (Node.js), mobile apps (React Native), and desktop applications.'
    },
    'react': {
      definition: 'React is an open-source JavaScript library for building user interfaces, particularly web applications.',
      details: 'Developed by Facebook, React uses a component-based architecture where UI is broken into reusable components. Key concepts include: JSX (JavaScript XML), components (functional and class-based), props (properties passed to components), state (component data), hooks (useState, useEffect), and the Virtual DOM for efficient rendering.',
      useCases: 'Building single-page applications, mobile apps with React Native, and complex user interfaces.'
    },
    'python': {
      definition: 'Python is a high-level, interpreted programming language known for its simplicity and readability.',
      details: 'Python emphasizes code readability with its clear syntax. It supports multiple programming paradigms including procedural, object-oriented, and functional programming. Key features: dynamic typing, automatic memory management, extensive standard library, and strong community support.',
      useCases: 'Web development (Django, Flask), data science, AI/ML (TensorFlow, PyTorch), automation, scripting, and scientific computing.'
    },
    'node.js': {
      definition: 'Node.js is a JavaScript runtime built on Chrome\'s V8 JavaScript engine that allows JavaScript to run on the server-side.',
      details: 'It uses an event-driven, non-blocking I/O model making it efficient for real-time applications. Key features: npm (Node Package Manager), asynchronous programming, single-threaded event loop, and extensive package ecosystem.',
      useCases: 'Building REST APIs, real-time applications (chat, gaming), microservices, and server-side web applications.'
    },
    'html': {
      definition: 'HTML (HyperText Markup Language) is the standard markup language for creating web pages and web applications.',
      details: 'HTML describes the structure of a web page using elements and tags. It works with CSS (styling) and JavaScript (behavior) to create complete web pages. Key elements include: headings, paragraphs, links, images, forms, and semantic elements (header, nav, article, section, footer).',
      useCases: 'Creating web page structure, forms, and content organization.'
    },
    'css': {
      definition: 'CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation of a document written in HTML.',
      details: 'CSS controls layout, colors, fonts, spacing, and responsive design. Key concepts: selectors, properties, values, box model, flexbox, grid, and media queries for responsive design.',
      useCases: 'Styling web pages, creating layouts, and making websites responsive.'
    },
    'java': {
      definition: 'Java is a high-level, object-oriented programming language designed to have as few implementation dependencies as possible.',
      details: 'Java is platform-independent (write once, run anywhere). Key features: object-oriented, strongly typed, automatic memory management (garbage collection), multi-threading support, and extensive standard library.',
      useCases: 'Enterprise applications, Android app development, web applications (Spring), desktop applications, and large-scale systems.'
    },
    'c++': {
      definition: 'C++ is a general-purpose programming language developed as an extension of the C programming language.',
      details: 'C++ supports both procedural and object-oriented programming. Key features: low-level memory manipulation, high performance, templates, STL (Standard Template Library), and operator overloading.',
      useCases: 'System programming, game development, embedded systems, high-performance applications, and operating systems.'
    },
    'c#': {
      definition: 'C# (C-Sharp) is a modern, object-oriented programming language developed by Microsoft.',
      details: 'C# is part of the .NET framework. Key features: type-safe, garbage collection, LINQ (Language Integrated Query), async/await, and strong typing.',
      useCases: 'Windows applications, web development (ASP.NET), game development (Unity), and enterprise software.'
    },
    'go': {
      definition: 'Go (Golang) is an open-source programming language developed by Google, designed for simplicity and efficiency.',
      details: 'Go features: compiled language, garbage collection, built-in concurrency (goroutines), fast compilation, and simple syntax.',
      useCases: 'Cloud services, microservices, distributed systems, DevOps tools, and high-performance network servers.'
    },
    'rust': {
      definition: 'Rust is a systems programming language focused on safety, speed, and concurrency.',
      details: 'Rust prevents memory errors without garbage collection. Key features: zero-cost abstractions, ownership system, pattern matching, and fearless concurrency.',
      useCases: 'System programming, web assembly, embedded systems, blockchain development, and performance-critical applications.'
    },
    'php': {
      definition: 'PHP (Hypertext Preprocessor) is a server-side scripting language designed for web development.',
      details: 'PHP is embedded in HTML and executed on the server. Key features: easy to learn, extensive library, database integration, and large community.',
      useCases: 'Web development, content management systems (WordPress, Drupal), e-commerce platforms, and server-side scripting.'
    },
    'ruby': {
      definition: 'Ruby is a dynamic, object-oriented programming language known for its simplicity and productivity.',
      details: 'Ruby emphasizes convention over configuration. Key features: everything is an object, dynamic typing, blocks and iterators, and elegant syntax.',
      useCases: 'Web development (Ruby on Rails), scripting, automation, and rapid prototyping.'
    },
    'swift': {
      definition: 'Swift is a powerful and intuitive programming language developed by Apple for iOS, macOS, watchOS, and tvOS.',
      details: 'Swift is designed to be safe, fast, and expressive. Key features: type safety, optionals, closures, and automatic memory management.',
      useCases: 'iOS app development, macOS applications, watchOS apps, and Apple ecosystem development.'
    },
    'kotlin': {
      definition: 'Kotlin is a modern, statically typed programming language that runs on the Java Virtual Machine (JVM).',
      details: 'Kotlin is fully interoperable with Java. Key features: null safety, concise syntax, coroutines for async programming, and extension functions.',
      useCases: 'Android app development, server-side development, multiplatform development, and Java interop projects.'
    },
    'vue': {
      definition: 'Vue.js is a progressive JavaScript framework for building user interfaces.',
      details: 'Vue is approachable and versatile. Key features: reactive data binding, component-based architecture, virtual DOM, and single-file components.',
      useCases: 'Building interactive web interfaces, single-page applications, and progressive web apps.'
    },
    'angular': {
      definition: 'Angular is a TypeScript-based open-source web application framework developed by Google.',
      details: 'Angular is a complete framework with built-in solutions. Key features: two-way data binding, dependency injection, routing, forms handling, and TypeScript support.',
      useCases: 'Enterprise web applications, large-scale projects, and complex single-page applications.'
    },
    'django': {
      definition: 'Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.',
      details: 'Django follows the "batteries included" philosophy. Key features: ORM (Object-Relational Mapping), admin panel, authentication, URL routing, and template engine.',
      useCases: 'Web applications, content management systems, e-commerce sites, and API development.'
    },
    'flask': {
      definition: 'Flask is a lightweight Python web framework that provides the essentials for web development.',
      details: 'Flask is minimal and flexible. Key features: simple routing, template engine (Jinja2), request handling, and extensible architecture.',
      useCases: 'Small to medium web applications, REST APIs, microservices, and rapid prototyping.'
    },
    'express': {
      definition: 'Express.js is a minimal and flexible Node.js web application framework.',
      details: 'Express provides a robust set of features for web and mobile applications. Key features: routing, middleware, template engines, and HTTP utility methods.',
      useCases: 'REST APIs, web applications, microservices, and server-side applications with Node.js.'
    },
    'mongodb': {
      definition: 'MongoDB is a NoSQL document database that stores data in flexible, JSON-like documents.',
      details: 'MongoDB is schema-less and horizontally scalable. Key features: document storage, indexing, replication, sharding, and flexible query language.',
      useCases: 'Content management, real-time analytics, mobile apps, IoT applications, and big data storage.'
    },
    'mysql': {
      definition: 'MySQL is an open-source relational database management system (RDBMS).',
      details: 'MySQL uses SQL (Structured Query Language) for database operations. Key features: ACID compliance, transactions, indexing, replication, and high performance.',
      useCases: 'Web applications, e-commerce sites, content management systems, and data warehousing.'
    },
    'git': {
      definition: 'Git is a distributed version control system for tracking changes in source code during software development.',
      details: 'Git allows multiple developers to work on the same project. Key features: branching, merging, commit history, distributed architecture, and staging area.',
      useCases: 'Version control, collaboration, code review, deployment, and project management.'
    },
    'docker': {
      definition: 'Docker is a platform for developing, shipping, and running applications using containerization.',
      details: 'Docker packages applications with dependencies into containers. Key features: containerization, image management, Dockerfile, orchestration, and portability.',
      useCases: 'Application deployment, microservices, CI/CD pipelines, development environments, and cloud deployments.'
    },
    'kubernetes': {
      definition: 'Kubernetes (K8s) is an open-source container orchestration platform for automating deployment, scaling, and management of containerized applications.',
      details: 'Kubernetes manages containers across clusters. Key features: auto-scaling, load balancing, self-healing, rolling updates, and service discovery.',
      useCases: 'Container orchestration, microservices management, cloud-native applications, and large-scale deployments.'
    }
  },

  // AI & Machine Learning
  ai: {
    'artificial intelligence': {
      definition: 'Artificial Intelligence (AI) is the simulation of human intelligence in machines that are programmed to think and learn like humans.',
      details: 'AI encompasses machine learning, natural language processing, computer vision, robotics, and expert systems. Types include: Narrow AI (specific tasks) and General AI (human-like intelligence). AI systems can recognize patterns, make decisions, process language, and solve complex problems.',
      applications: 'Used in chatbots, recommendation systems, autonomous vehicles, medical diagnosis, image recognition, speech recognition, and predictive analytics.'
    },
    'machine learning': {
      definition: 'Machine Learning (ML) is a subset of AI that enables systems to learn and improve from experience without being explicitly programmed.',
      details: 'ML algorithms build mathematical models based on training data to make predictions or decisions. Types include: Supervised Learning (labeled data), Unsupervised Learning (unlabeled data), and Reinforcement Learning (reward-based).',
      applications: 'Email spam filtering, recommendation systems, fraud detection, image recognition, natural language processing, and predictive maintenance.'
    },
    'deep learning': {
      definition: 'Deep Learning is a subset of machine learning that uses neural networks with multiple layers to learn representations of data.',
      details: 'It mimics the human brain\'s neural networks. Deep learning excels at processing unstructured data like images, text, and audio. Popular frameworks include TensorFlow, PyTorch, and Keras.',
      applications: 'Image recognition, speech recognition, natural language processing, autonomous vehicles, and medical image analysis.'
    },
    'neural network': {
      definition: 'A neural network is a computing system inspired by biological neural networks that constitute animal brains.',
      details: 'Neural networks consist of interconnected nodes (neurons) organized in layers. They process information through weighted connections and activation functions. Types include: feedforward, convolutional (CNN), recurrent (RNN), and transformer networks.',
      applications: 'Pattern recognition, image classification, natural language processing, speech recognition, and predictive modeling.'
    },
    'natural language processing': {
      definition: 'Natural Language Processing (NLP) is a branch of AI that helps computers understand, interpret, and manipulate human language.',
      details: 'NLP combines computational linguistics with machine learning. Key tasks include: text classification, sentiment analysis, named entity recognition, machine translation, and question answering.',
      applications: 'Chatbots, language translation, sentiment analysis, text summarization, voice assistants, and information extraction.'
    },
    'computer vision': {
      definition: 'Computer Vision is a field of AI that trains computers to interpret and understand the visual world.',
      details: 'Computer vision uses digital images and videos to extract meaningful information. Key tasks include: image classification, object detection, image segmentation, facial recognition, and optical character recognition (OCR).',
      applications: 'Autonomous vehicles, medical image analysis, facial recognition, quality control in manufacturing, and augmented reality.'
    },
    'data science': {
      definition: 'Data Science is an interdisciplinary field that uses scientific methods, processes, algorithms, and systems to extract knowledge from structured and unstructured data.',
      details: 'Data science combines statistics, programming, and domain expertise. Key processes include: data collection, cleaning, analysis, visualization, and machine learning modeling.',
      applications: 'Business intelligence, predictive analytics, recommendation systems, fraud detection, and scientific research.'
    }
  },

  // Science & Math
  science: {
    'gravity': {
      definition: 'Gravity is a fundamental force that attracts objects with mass toward each other.',
      details: 'On Earth, gravity gives weight to physical objects. The acceleration due to gravity on Earth is approximately 9.8 m/s². Newton\'s law of universal gravitation states that every particle attracts every other particle with a force proportional to the product of their masses and inversely proportional to the square of the distance between them.',
      formula: 'F = G × (m1 × m2) / r²'
    },
    'photosynthesis': {
      definition: 'Photosynthesis is the process by which plants, algae, and some bacteria convert light energy into chemical energy stored in glucose.',
      details: 'The process occurs in chloroplasts and involves two main stages: light-dependent reactions (capture light energy) and light-independent reactions (Calvin cycle - convert CO2 to glucose).',
      equation: '6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂'
    },
    'atom': {
      definition: 'An atom is the smallest unit of matter that retains the properties of an element.',
      details: 'Atoms consist of a nucleus (protons and neutrons) and electrons orbiting around it. The number of protons determines the element. Atoms combine to form molecules.',
      structure: 'Nucleus (protons + neutrons) at center, electrons in shells/orbitals around nucleus.'
    },
    'molecule': {
      definition: 'A molecule is a group of two or more atoms held together by chemical bonds.',
      details: 'Molecules can be simple (like O₂) or complex (like DNA). Chemical bonds can be covalent (sharing electrons), ionic (transferring electrons), or metallic.',
      examples: 'Water (H₂O), oxygen (O₂), carbon dioxide (CO₂), and glucose (C₆H₁₂O₆).'
    },
    'cell': {
      definition: 'A cell is the basic structural and functional unit of all living organisms.',
      details: 'Cells contain genetic material, cytoplasm, and various organelles. Types include: prokaryotic cells (bacteria) and eukaryotic cells (plants, animals).',
      components: 'Nucleus, mitochondria, ribosomes, endoplasmic reticulum, Golgi apparatus, and cell membrane.'
    },
    'dna': {
      definition: 'DNA (Deoxyribonucleic Acid) is the molecule that carries genetic instructions in all living organisms.',
      details: 'DNA has a double-helix structure and consists of four bases: adenine (A), thymine (T), cytosine (C), and guanine (G). DNA sequences encode proteins and genetic information.',
      structure: 'Double helix with base pairs (A-T, C-G) connected by sugar-phosphate backbone.'
    },
    'evolution': {
      definition: 'Evolution is the process by which species change over time through natural selection and genetic variation.',
      details: 'Charles Darwin proposed the theory of evolution. Key mechanisms include: natural selection, genetic drift, mutation, and gene flow. Evolution explains the diversity of life on Earth.',
      evidence: 'Fossil records, comparative anatomy, molecular biology, and observed changes in species.'
    },
    'energy': {
      definition: 'Energy is the capacity to do work or cause change.',
      details: 'Energy exists in various forms: kinetic (motion), potential (stored), thermal (heat), chemical, electrical, and nuclear. Energy cannot be created or destroyed, only transformed (conservation of energy).',
      formula: 'E = mc² (mass-energy equivalence)'
    },
    'force': {
      definition: 'Force is a push or pull that can cause an object to accelerate, change direction, or deform.',
      details: 'Force is measured in Newtons (N). Newton\'s laws describe how forces affect motion. Types include: gravitational, electromagnetic, strong nuclear, and weak nuclear forces.',
      formula: 'F = ma (Force = mass × acceleration)'
    },
    'electricity': {
      definition: 'Electricity is the flow of electric charge, typically electrons, through a conductor.',
      details: 'Electricity can be static (stationary charge) or current (flowing charge). Key concepts: voltage (potential difference), current (flow rate), resistance, and power.',
      formula: 'V = IR (Voltage = Current × Resistance), P = IV (Power = Current × Voltage)'
    },
    'magnetism': {
      definition: 'Magnetism is a force that attracts or repels objects with magnetic properties.',
      details: 'Magnetic fields are created by moving electric charges. Key concepts: magnetic poles (north and south), magnetic field lines, and electromagnetic induction.',
      applications: 'Electric motors, generators, MRI machines, compasses, and data storage devices.'
    }
  },

  // General Knowledge
  general: {
    'computer': {
      definition: 'A computer is an electronic device that processes data according to instructions (programs) to perform calculations, store information, and execute tasks.',
      details: 'Components include: CPU (Central Processing Unit), RAM (Random Access Memory), storage (HDD/SSD), motherboard, and input/output devices. Computers operate using binary code (0s and 1s) and can perform billions of operations per second.',
      types: 'Personal computers, laptops, servers, supercomputers, smartphones, and embedded systems.'
    },
    'internet': {
      definition: 'The Internet is a global network of interconnected computers and networks that communicate using standardized protocols (TCP/IP).',
      details: 'It enables worldwide communication, information sharing, and access to services. Key components include: servers, routers, protocols (HTTP, HTTPS, FTP), DNS (Domain Name System), and the World Wide Web (web pages and websites).',
      uses: 'Email, web browsing, social media, online shopping, video streaming, cloud computing, and remote work.'
    },
    'algorithm': {
      definition: 'An algorithm is a step-by-step procedure or set of rules for solving a problem or completing a task.',
      details: 'In programming, algorithms are implemented as code to process data, perform calculations, or make decisions. Algorithms have time complexity (how fast they run) and space complexity (how much memory they use).',
      examples: 'Sorting algorithms (bubble sort, quicksort), search algorithms (binary search), pathfinding algorithms (Dijkstra\'s algorithm), and machine learning algorithms.'
    },
    'database': {
      definition: 'A database is an organized collection of data stored and accessed electronically.',
      details: 'Databases allow efficient storage, retrieval, and management of information. They use structured query language (SQL) for relational databases or query languages for NoSQL databases.',
      types: 'Relational databases (MySQL, PostgreSQL, SQL Server), NoSQL databases (MongoDB, Cassandra, Redis), and graph databases (Neo4j).'
    },
    'api': {
      definition: 'API (Application Programming Interface) is a set of protocols and tools for building software applications.',
      details: 'APIs define how different software components should interact. REST APIs use HTTP methods (GET, POST, PUT, DELETE) to communicate. APIs enable different applications to share data and functionality.',
      uses: 'Web services, mobile apps, third-party integrations, microservices architecture, and cloud services.'
    },
    'cloud computing': {
      definition: 'Cloud computing is the delivery of computing services (servers, storage, databases, networking, software) over the Internet.',
      details: 'Instead of owning physical servers, you rent access to services from cloud providers. Types include: Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS).',
      providers: 'Amazon Web Services (AWS), Microsoft Azure, Google Cloud Platform (GCP), and many others.'
    },
    'aws': {
      definition: 'Amazon Web Services (AWS) is a comprehensive cloud computing platform provided by Amazon.',
      details: 'AWS offers over 200 services including computing, storage, databases, networking, analytics, machine learning, and security. Key services: EC2 (virtual servers), S3 (storage), RDS (databases), and Lambda (serverless).',
      useCases: 'Web hosting, data storage, application deployment, machine learning, and enterprise solutions.'
    },
    'microservices': {
      definition: 'Microservices is an architectural approach where applications are built as a collection of small, independent services.',
      details: 'Each microservice handles a specific business function and communicates via APIs. Benefits include: scalability, independent deployment, technology diversity, and fault isolation.',
      useCases: 'Large-scale applications, cloud-native systems, and distributed systems requiring high scalability.'
    },
    'rest api': {
      definition: 'REST (Representational State Transfer) API is an architectural style for designing web services.',
      details: 'REST APIs use HTTP methods (GET, POST, PUT, DELETE) to perform operations on resources. Key principles: stateless communication, resource-based URLs, and standard HTTP status codes.',
      useCases: 'Web services, mobile app backends, third-party integrations, and microservices communication.'
    },
    'graphql': {
      definition: 'GraphQL is a query language and runtime for APIs that allows clients to request exactly the data they need.',
      details: 'GraphQL provides a single endpoint and allows clients to specify the structure of the response. Key features: type system, introspection, and efficient data fetching.',
      useCases: 'Mobile applications, complex data requirements, and reducing over-fetching of data.'
    },
    'json': {
      definition: 'JSON (JavaScript Object Notation) is a lightweight data-interchange format that is easy for humans to read and write.',
      details: 'JSON is language-independent and uses key-value pairs. It supports strings, numbers, booleans, arrays, objects, and null values.',
      useCases: 'API communication, configuration files, data storage, and web applications.'
    },
    'xml': {
      definition: 'XML (eXtensible Markup Language) is a markup language that defines rules for encoding documents in a format that is both human-readable and machine-readable.',
      details: 'XML uses tags to structure data hierarchically. It\'s self-descriptive and supports custom tags and attributes.',
      useCases: 'Data exchange, configuration files, web services (SOAP), and document storage.'
    },
    'http': {
      definition: 'HTTP (HyperText Transfer Protocol) is the foundation of data communication on the World Wide Web.',
      details: 'HTTP is a request-response protocol. Common methods: GET (retrieve), POST (create), PUT (update), DELETE (remove). Status codes indicate response status (200 OK, 404 Not Found, 500 Server Error).',
      useCases: 'Web browsing, API communication, and web service interactions.'
    },
    'https': {
      definition: 'HTTPS (HTTP Secure) is the secure version of HTTP that uses encryption (SSL/TLS) to protect data transmission.',
      details: 'HTTPS encrypts data between client and server, preventing interception and tampering. It uses certificates to verify server identity.',
      useCases: 'Secure web browsing, online transactions, login pages, and sensitive data transmission.'
    },
    'ssl': {
      definition: 'SSL (Secure Sockets Layer) is a security protocol that establishes encrypted links between web servers and browsers.',
      details: 'SSL ensures data privacy and integrity. It uses certificates to authenticate servers and encrypt data. TLS (Transport Layer Security) is the modern successor to SSL.',
      useCases: 'Secure web connections, email encryption, and protecting sensitive data in transit.'
    },
    'security': {
      definition: 'Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks.',
      details: 'Security involves protecting data, preventing unauthorized access, and ensuring system integrity. Key concepts: encryption, authentication, authorization, firewalls, and vulnerability management.',
      practices: 'Strong passwords, two-factor authentication, regular updates, encryption, and security audits.'
    },
    'encryption': {
      definition: 'Encryption is the process of converting information into a code to prevent unauthorized access.',
      details: 'Encryption uses algorithms and keys to transform readable data (plaintext) into unreadable data (ciphertext). Types include: symmetric (same key) and asymmetric (public/private keys).',
      useCases: 'Secure communication, data protection, password storage, and digital signatures.'
    }
  },

  // Career & Education
  career: {
    'resume': {
      definition: 'A resume (or CV) is a document that summarizes your work experience, education, skills, and achievements.',
      details: 'A good resume should be clear, concise, and tailored to the job you\'re applying for. Include: contact information, professional summary, work experience, education, skills, and relevant achievements.',
      tips: 'Keep it to 1-2 pages, use action verbs, quantify achievements, and proofread carefully.'
    },
    'interview': {
      definition: 'A job interview is a conversation between a job candidate and employer to assess if the candidate is suitable for the position.',
      details: 'Types include: phone interviews, video interviews, technical interviews, and behavioral interviews. Preparation involves researching the company, practicing common questions, and preparing questions to ask.',
      tips: 'Be punctual, dress appropriately, be honest, ask thoughtful questions, and follow up with a thank-you note.'
    },
    'portfolio': {
      definition: 'A portfolio is a collection of work samples that demonstrate your skills, experience, and achievements.',
      details: 'A good portfolio showcases your best projects, includes code samples, provides project descriptions, and demonstrates problem-solving abilities. It should be well-organized and accessible online.',
      tips: 'Include diverse projects, provide live demos, explain your role, use version control (GitHub), and keep it updated.'
    },
    'networking': {
      definition: 'Networking is the process of building and maintaining professional relationships for career development.',
      details: 'Effective networking involves: attending events, connecting on LinkedIn, offering value to others, following up, and maintaining relationships over time.',
      benefits: 'Job opportunities, mentorship, industry insights, collaboration opportunities, and career growth.'
    },
    'coding interview': {
      definition: 'A coding interview is a technical assessment where candidates solve programming problems to demonstrate their coding skills.',
      details: 'Common formats include: algorithm problems, system design questions, pair programming, and take-home assignments. Popular platforms: LeetCode, HackerRank, CodeSignal.',
      tips: 'Practice regularly, understand data structures and algorithms, explain your thought process, write clean code, and test your solutions.'
    },
    'soft skills': {
      definition: 'Soft skills are personal attributes and interpersonal abilities that enable effective interaction and collaboration.',
      details: 'Important soft skills include: communication, teamwork, problem-solving, time management, adaptability, leadership, and emotional intelligence.',
      importance: 'Soft skills complement technical skills and are crucial for career success, team collaboration, and professional growth.'
    },
    'time management': {
      definition: 'Time management is the process of planning and controlling how much time to spend on specific activities.',
      details: 'Effective time management involves: prioritizing tasks, setting goals, creating schedules, avoiding procrastination, and using productivity techniques like Pomodoro or time blocking.',
      benefits: 'Increased productivity, reduced stress, better work-life balance, and achievement of goals.'
    },
    'study techniques': {
      definition: 'Study techniques are methods and strategies used to improve learning and retention of information.',
      details: 'Effective techniques include: active recall, spaced repetition, the Feynman technique (explain simply), mind mapping, practice testing, and the Pomodoro technique.',
      tips: 'Create a study schedule, eliminate distractions, take breaks, use multiple senses, and teach others what you learn.'
    },
    'project management': {
      definition: 'Project management is the practice of planning, executing, and completing projects to achieve specific goals.',
      details: 'Key phases: initiation, planning, execution, monitoring, and closure. Popular methodologies: Agile, Scrum, Waterfall, and Kanban.',
      tools: 'Project management software (Jira, Trello, Asana), Gantt charts, and collaboration platforms.'
    }
  },

  // RGUKT University Information
  rgukt: {
    'rgukt': {
      definition: 'RGUKT (Rajiv Gandhi University of Knowledge Technologies) is a state university established in 2008 by the Government of Andhra Pradesh to cater to the educational needs of gifted rural youth.',
      details: 'RGUKT offers a unique six-year integrated program: two years of Pre-University Course (PUC) followed by four years of Bachelor of Technology (B.Tech) degree. The curriculum provides a strong foundation in mathematics, physics, chemistry, and life sciences, blended with courses in humanities and social sciences.',
      campuses: 'RGUKT has multiple campuses: Nuzvid (Krishna District, AP), RK Valley (Idupulapaya, Kadapa District, AP), Srikakulam (Srikakulam District, AP), and Basar (Nirmal District, Telangana).',
      website: 'Official website: https://www.rgukt.in/'
    },
    'rgukt nuzvid': {
      definition: 'RGUKT Nuzvid is one of the main campuses located in Nuzvid, Krishna District, Andhra Pradesh.',
      details: 'The Nuzvid campus offers comprehensive education with focus on holistic development, including extracurricular activities and internships. The campus provides modern facilities and a conducive learning environment for students.',
      website: 'Campus website: https://www.rguktn.ac.in/',
      location: 'Nuzvid, Krishna District, Andhra Pradesh'
    },
    'rgukt rk valley': {
      definition: 'RGUKT RK Valley campus is located in Idupulapaya, Kadapa District, Andhra Pradesh.',
      details: 'The RK Valley campus emphasizes research and development, offering various workshops and seminars to enhance student learning. The campus focuses on innovation and academic excellence.',
      website: 'Campus website: https://www.rguktrkv.ac.in/',
      location: 'Idupulapaya, Kadapa District, Andhra Pradesh',
      alumni: 'Alumni Help Desk: https://alumni.rguktrkv.ac.in/'
    },
    'rgukt srikakulam': {
      definition: 'RGUKT Srikakulam campus is located in Srikakulam District, Andhra Pradesh.',
      details: 'The Srikakulam campus focuses on providing quality education with modern facilities and a conducive learning environment. The campus offers various academic programs and student support services.',
      website: 'Campus website: https://rguktsklm.ac.in/',
      location: 'Srikakulam District, Andhra Pradesh'
    },
    'rgukt basar': {
      definition: 'RGUKT Basar campus is located in Basar, Nirmal District, Telangana.',
      details: 'The Basar campus offers various programs and has facilities aimed at fostering innovation and research among students. The campus provides quality technical education.',
      website: 'Campus website: https://www.rgukt.ac.in/',
      location: 'Basar, Nirmal District, Telangana'
    },
    'rgukt admission': {
      definition: 'RGUKT admission is based on merit and is open to rural students from Andhra Pradesh and Telangana.',
      details: 'The university offers a six-year integrated program: 2 years Pre-University Course (PUC) + 4 years B.Tech. Admission is typically based on academic performance and entrance examinations. The program is designed specifically for gifted rural youth.',
      eligibility: 'Students from rural areas with strong academic performance are eligible. Specific eligibility criteria are announced each year.',
      process: 'Admission process includes application submission, entrance examination (if applicable), and merit-based selection.'
    },
    'rgukt courses': {
      definition: 'RGUKT offers a six-year integrated program leading to B.Tech degree in various engineering disciplines.',
      details: 'The program structure: Years 1-2 (PUC): Foundation courses in Mathematics, Physics, Chemistry, Life Sciences, Humanities, and Social Sciences. Years 3-6 (B.Tech): Specialized engineering courses in various branches.',
      branches: 'B.Tech programs are offered in multiple engineering branches including Computer Science, Electronics, Mechanical, Civil, Chemical, and other engineering disciplines.',
      curriculum: 'The curriculum emphasizes both theoretical knowledge and practical skills, with hands-on laboratory work and project-based learning.'
    },
    'rgukt academic regulations': {
      definition: 'RGUKT has detailed academic rules and regulations to maintain high educational standards.',
      details: 'Academic regulations cover attendance requirements, examination policies, grading systems, promotion criteria, and code of conduct. These regulations ensure academic integrity and quality education.',
      attendance: 'Students must maintain minimum attendance (typically 75%) to be eligible for examinations.',
      examinations: 'The university conducts regular internal assessments, mid-term examinations, and end-semester examinations.',
      grading: 'Performance is evaluated using a credit-based grading system.'
    },
    'rgukt student services': {
      definition: 'RGUKT provides various student support services including academic counseling, career guidance, library facilities, and extracurricular activities.',
      details: 'Student services include: academic support, library and learning resources, career counseling, placement assistance, hostel facilities, healthcare services, sports and recreation, and student clubs and societies.',
      support: 'The university provides comprehensive support to help students succeed academically and personally.'
    },
    'rgukt library': {
      definition: 'RGUKT libraries provide extensive resources including books, journals, e-resources, and digital materials.',
      details: 'Each campus has a well-equipped library with physical and digital resources. Libraries offer study spaces, computer facilities, and access to online databases and e-journals.',
      resources: 'Libraries contain textbooks, reference books, research journals, e-books, and access to online academic databases.'
    },
    'rgukt placement': {
      definition: 'RGUKT has a placement cell that assists students in securing job opportunities after graduation.',
      details: 'The placement cell organizes campus recruitment drives, provides career counseling, conducts mock interviews, and helps students prepare for job placements. Companies from various sectors visit the campus for recruitment.',
      support: 'Students receive training in soft skills, technical skills, and interview preparation to enhance their employability.'
    },
    'rgukt hostel': {
      definition: 'RGUKT provides hostel accommodation for students with modern facilities.',
      details: 'Hostels offer comfortable living spaces, mess facilities, common areas, and 24/7 security. Separate hostels are available for boys and girls. Hostel facilities include internet connectivity, study rooms, and recreational areas.',
      facilities: 'Hostels provide accommodation, dining facilities, laundry services, and basic amenities for comfortable student living.'
    },
    'rgukt alumni': {
      definition: 'RGUKT has an active alumni network that helps maintain connections with former students.',
      details: 'The alumni network provides mentorship, career guidance, and networking opportunities. Alumni help desk manages alumni-related queries and maintains connections. Alumni contribute to the university\'s growth and support current students.',
      network: 'Alumni are working in various industries and organizations, contributing to the university\'s reputation and supporting current students.'
    },
    'rgukt btech': {
      definition: 'B.Tech (Bachelor of Technology) is the four-year engineering degree program offered by RGUKT after the two-year PUC.',
      details: 'The B.Tech program provides specialized knowledge in engineering disciplines. Students choose their branch after completing PUC. The program includes theoretical courses, laboratory work, projects, internships, and industry exposure.',
      duration: 'B.Tech program duration is 4 years (Years 3-6 of the integrated program).',
      branches: 'Various engineering branches are available including Computer Science, Electronics, Mechanical, Civil, Chemical, and others.'
    },
    'rgukt puc': {
      definition: 'PUC (Pre-University Course) is the two-year foundation program (Years 1-2) at RGUKT before B.Tech.',
      details: 'PUC provides strong foundation in Mathematics, Physics, Chemistry, Life Sciences, along with courses in Humanities and Social Sciences. This foundation prepares students for specialized engineering education in B.Tech program.',
      duration: 'PUC duration is 2 years (Years 1-2 of the integrated program).',
      subjects: 'PUC covers Mathematics, Physics, Chemistry, Life Sciences, English, and Social Sciences.'
    },
    'rgukt website': {
      definition: 'RGUKT official websites provide comprehensive information about the university, campuses, programs, and services.',
      details: 'Main website: https://www.rgukt.in/ provides general information. Campus-specific websites: Nuzvid (rguktn.ac.in), RK Valley (rguktrkv.ac.in), Srikakulam (rguktsklm.ac.in), and Basar (rgukt.ac.in). These websites contain admission information, academic details, announcements, and student resources.',
      resources: 'Websites provide access to academic regulations, course materials, examination schedules, results, and important announcements.'
    }
  }
};

// Intelligent topic extraction and matching
const findKnowledge = (query) => {
  const lowerQuery = query.toLowerCase().trim();
  
  // Extract topic from "what is X" questions
  let topic = lowerQuery;
  if (lowerQuery.startsWith('what is ') || lowerQuery.startsWith('what\'s ')) {
    topic = lowerQuery.replace(/^what (is|'s) /, '').trim();
  } else if (lowerQuery.startsWith('explain ')) {
    topic = lowerQuery.replace(/^explain /, '').trim();
  } else if (lowerQuery.startsWith('tell me about ')) {
    topic = lowerQuery.replace(/^tell me about /, '').trim();
  }
  
  // Remove question words and common phrases
  topic = topic.replace(/^(the |a |an )/, '').trim();
  
  // Search in knowledge base
  for (const category in knowledgeBase) {
    for (const key in knowledgeBase[category]) {
      // Exact match
      if (key === topic || key === lowerQuery) {
        return { category, key, data: knowledgeBase[category][key] };
      }
      // Partial match
      if (topic.includes(key) || key.includes(topic)) {
        return { category, key, data: knowledgeBase[category][key] };
      }
      // RGUKT-specific matching (handle variations)
      if (category === 'rgukt') {
        if (lowerQuery.includes('rgukt') && (key.includes('rgukt') || lowerQuery.includes(key.replace('rgukt ', '')))) {
          return { category, key, data: knowledgeBase[category][key] };
        }
        // Match campus names
        if ((lowerQuery.includes('nuzvid') && key.includes('nuzvid')) ||
            (lowerQuery.includes('rk valley') && key.includes('rk valley')) ||
            (lowerQuery.includes('srikakulam') && key.includes('srikakulam')) ||
            (lowerQuery.includes('basar') && key.includes('basar'))) {
          return { category, key, data: knowledgeBase[category][key] };
        }
      }
    }
  }
  
  return null;
};

// Generate comprehensive answer
const generateAnswer = (knowledge, query) => {
  if (!knowledge) return null;
  
  const { data } = knowledge;
  let answer = `${data.definition}\n\n`;
  
  if (data.details) {
    answer += `${data.details}\n\n`;
  }
  
  if (data.useCases) {
    answer += `Use cases: ${data.useCases}\n\n`;
  }
  
  if (data.applications) {
    answer += `Applications: ${data.applications}\n\n`;
  }
  
  if (data.formula) {
    answer += `Formula: ${data.formula}\n\n`;
  }
  
  if (data.equation) {
    answer += `Equation: ${data.equation}\n\n`;
  }
  
  if (data.types) {
    answer += `Types: ${data.types}\n\n`;
  }
  
  if (data.website) {
    answer += `Website: ${data.website}\n\n`;
  }
  
  if (data.location) {
    answer += `Location: ${data.location}\n\n`;
  }
  
  if (data.campuses) {
    answer += `Campuses: ${data.campuses}\n\n`;
  }
  
  if (data.eligibility) {
    answer += `Eligibility: ${data.eligibility}\n\n`;
  }
  
  if (data.process) {
    answer += `Process: ${data.process}\n\n`;
  }
  
  if (data.branches) {
    answer += `Branches: ${data.branches}\n\n`;
  }
  
  if (data.curriculum) {
    answer += `Curriculum: ${data.curriculum}\n\n`;
  }
  
  if (data.attendance) {
    answer += `Attendance: ${data.attendance}\n\n`;
  }
  
  if (data.examinations) {
    answer += `Examinations: ${data.examinations}\n\n`;
  }
  
  if (data.grading) {
    answer += `Grading: ${data.grading}\n\n`;
  }
  
  if (data.support) {
    answer += `Support: ${data.support}\n\n`;
  }
  
  if (data.resources) {
    answer += `Resources: ${data.resources}\n\n`;
  }
  
  if (data.facilities) {
    answer += `Facilities: ${data.facilities}\n\n`;
  }
  
  if (data.network) {
    answer += `Network: ${data.network}\n\n`;
  }
  
  if (data.duration) {
    answer += `Duration: ${data.duration}\n\n`;
  }
  
  if (data.subjects) {
    answer += `Subjects: ${data.subjects}\n\n`;
  }
  
  if (data.alumni) {
    answer += `Alumni Portal: ${data.alumni}\n\n`;
  }
  
  if (data.examples) {
    answer += `Examples: ${data.examples}\n\n`;
  }
  
  if (data.structure) {
    answer += `Structure: ${data.structure}\n\n`;
  }
  
  if (data.components) {
    answer += `Components: ${data.components}\n\n`;
  }
  
  if (data.evidence) {
    answer += `Evidence: ${data.evidence}\n\n`;
  }
  
  if (data.benefits) {
    answer += `Benefits: ${data.benefits}\n\n`;
  }
  
  if (data.importance) {
    answer += `Importance: ${data.importance}\n\n`;
  }
  
  if (data.tips) {
    answer += `Tips: ${data.tips}`;
  }
  
  return answer.trim();
};

module.exports = {
  knowledgeBase,
  findKnowledge,
  generateAnswer
};

