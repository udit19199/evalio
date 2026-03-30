import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Re-seeding database with new skills and questions...");

  // 1. Create Core Skills
  const langSkill = await prisma.skill.upsert({
    where: { name: "Languages" },
    update: {},
    create: { name: "Languages" },
  });

  const engSkill = await prisma.skill.upsert({
    where: { name: "Engineering" },
    update: {},
    create: { name: "Engineering" },
  });

  const fundamentalsSkill = await prisma.skill.upsert({
    where: { name: "Fundamentals" },
    update: {},
    create: { name: "Fundamentals" },
  });

  // 2. Define Topics and Questions
  const data = [
    {
      skillId: fundamentalsSkill.id,
      topicName: "Programming Fundamentals",
      questions: [
        {
          text: "What is the difference between a shallow copy and a deep copy?",
          options: "Shallow copy copies references; Deep copy copies values and objects|||They are the same|||Shallow copy is faster|||Deep copy only works for strings",
          correctAnswer: "Shallow copy copies references; Deep copy copies values and objects",
          explanation: "A shallow copy creates a new object but inserts references to the original nested objects. A deep copy creates a new object and recursively copies everything.",
          difficulty: "medium"
        },
        {
          text: "What is a 'Pure Function' in programming?",
          options: "A function that has no side effects and returns the same output for the same input|||A function written in C++|||A function that uses only integers|||A function that doesn't return anything",
          correctAnswer: "A function that has no side effects and returns the same output for the same input",
          explanation: "Pure functions are deterministic and don't modify any state outside their scope.",
          difficulty: "easy"
        },
        {
          text: "What is the Big O complexity of searching an item in a balanced Binary Search Tree?",
          options: "O(log n)|||O(n)|||O(1)|||O(n log n)",
          correctAnswer: "O(log n)",
          explanation: "In a balanced BST, each comparison eliminates half the remaining nodes.",
          difficulty: "medium"
        },
        {
          text: "What is 'Hoisting' in various programming contexts?",
          options: "Moving declarations to the top of their scope during execution|||Lifting an object in memory|||A way to delete variables|||Compiling code faster",
          correctAnswer: "Moving declarations to the top of their scope during execution",
          explanation: "Hoisting allows variables and functions to be used before they are declared in the code.",
          difficulty: "medium"
        },
        {
          text: "What is the primary purpose of an Interface?",
          options: "To define a contract that classes must follow|||To store data|||To speed up execution|||To hide private variables",
          correctAnswer: "To define a contract that classes must follow",
          explanation: "Interfaces define 'what' a class must do, but not 'how'.",
          difficulty: "easy"
        }
      ]
    },
    {
      skillId: langSkill.id,
      topicName: "Rust",
      questions: [
        {
          text: "What is 'Ownership' in Rust?",
          options: "A system to manage memory without a garbage collector|||A way to buy software licenses|||A feature to prevent code copying|||A method for class inheritance",
          correctAnswer: "A system to manage memory without a garbage collector",
          explanation: "Ownership is Rust's most unique feature, managing memory through a set of rules the compiler checks at compile time.",
          difficulty: "hard"
        },
        {
          text: "What does the 'mut' keyword do in Rust?",
          options: "Allows a variable's value to be changed|||Makes a function private|||Mutes compiler warnings|||Creates a new thread",
          correctAnswer: "Allows a variable's value to be changed",
          explanation: "In Rust, variables are immutable by default. 'mut' makes them mutable.",
          difficulty: "easy"
        },
        {
          text: "What is a 'Borrow Checker'?",
          options: "A compiler tool that ensures references are valid|||A tool to track library dependencies|||A way to use memory from other processes|||A debt management system",
          correctAnswer: "A compiler tool that ensures references are valid",
          explanation: "The borrow checker enforces rules about how long references to data can last.",
          difficulty: "medium"
        },
        {
          text: "What is the difference between String and &str?",
          options: "String is owned heap data; &str is a reference to a string slice|||String is faster|||&str is only for numbers|||They are identical",
          correctAnswer: "String is owned heap data; &str is a reference to a string slice",
          explanation: "String is an owned, growable buffer. &str is an immutable view into a string.",
          difficulty: "medium"
        },
        {
          text: "What is an 'Option' enum used for?",
          options: "To represent a value that could be something or nothing (null safety)|||To choose between two functions|||To set compiler options|||To handle user input",
          correctAnswer: "To represent a value that could be something or nothing (null safety)",
          explanation: "Rust doesn't have null. It uses Option<T> to handle the absence of a value.",
          difficulty: "easy"
        }
      ]
    },
    {
      skillId: langSkill.id,
      topicName: "Javascript",
      questions: [
        {
          text: "What is 'Event Delegation'?",
          options: "Attaching one listener to a parent to manage events for children|||Passing an event to another server|||Deleting an event listener|||A way to trigger events manually",
          correctAnswer: "Attaching one listener to a parent to manage events for children",
          explanation: "It leverages event bubbling to handle events at a higher level in the DOM.",
          difficulty: "medium"
        },
        {
          text: "What is a 'Closure' in Javascript?",
          options: "A function that remembers the environment in which it was created|||Closing a browser window|||The end of a script file|||A way to hide code from the user",
          correctAnswer: "A function that remembers the environment in which it was created",
          explanation: "Closures allow a function to access variables from an outer scope even after that scope has closed.",
          difficulty: "hard"
        },
        {
          text: "What is the difference between '==' and '==='?",
          options: "== checks value with coercion; === checks value and type|||== is for numbers only|||=== is slower|||They are the same",
          correctAnswer: "== checks value with coercion; === checks value and type",
          explanation: "=== is the strict equality operator and is generally recommended.",
          difficulty: "easy"
        },
        {
          text: "What is the 'this' keyword in a regular function?",
          options: "Refers to the object that called the function|||Refers to the current file|||Refers to the first variable declared|||It has no meaning",
          correctAnswer: "Refers to the object that called the function",
          explanation: "The value of 'this' is determined by how the function is called.",
          difficulty: "medium"
        },
        {
          text: "What is an 'IIFE'?",
          options: "Immediately Invoked Function Expression|||Internal Interface For Events|||Integrated Information Flow Engine|||It is a syntax error",
          correctAnswer: "Immediately Invoked Function Expression",
          explanation: "It is a function that runs as soon as it is defined.",
          difficulty: "easy"
        }
      ]
    },
    {
      skillId: langSkill.id,
      topicName: "Typescript",
      questions: [
        {
          text: "What is the primary benefit of using Typescript over Javascript?",
          options: "Static typing and early error detection|||It makes the code run faster|||It removes the need for CSS|||It works only on servers",
          correctAnswer: "Static typing and early error detection",
          explanation: "Typescript adds a type system that helps catch bugs during development rather than at runtime.",
          difficulty: "easy"
        },
        {
          text: "What is an 'Interface' in Typescript?",
          options: "A way to define the shape of an object|||A UI component|||A connection to a database|||A type of loop",
          correctAnswer: "A way to define the shape of an object",
          explanation: "Interfaces describe the structure of objects, ensuring they have the required properties.",
          difficulty: "easy"
        },
        {
          text: "What is 'Generics' in Typescript?",
          options: "A way to create reusable components that work with a variety of types|||Variables that don't have types|||A standard library of functions|||A way to generate random numbers",
          correctAnswer: "A way to create reusable components that work with a variety of types",
          explanation: "Generics allow you to pass types as parameters to functions or classes.",
          difficulty: "hard"
        },
        {
          text: "What does the 'any' type do?",
          options: "Disables type checking for that variable|||Checks for any number|||Allows only strings|||It is a type of array",
          correctAnswer: "Disables type checking for that variable",
          explanation: "Using 'any' tells the compiler to ignore type safety for that specific variable.",
          difficulty: "easy"
        },
        {
          text: "What is 'Type Inference'?",
          options: "The compiler automatically determining the type of a variable|||Guessing what the user will type|||Converting strings to numbers|||A way to import types",
          correctAnswer: "The compiler automatically determining the type of a variable",
          explanation: "Typescript can often figure out the type based on the value assigned to a variable.",
          difficulty: "medium"
        }
      ]
    },
    {
      skillId: engSkill.id,
      topicName: "DevOps",
      questions: [
        {
          text: "What is 'CI/CD'?",
          options: "Continuous Integration and Continuous Deployment|||Computer Integration / Computer Design|||Code Improvement / Code Delivery|||It's a type of server",
          correctAnswer: "Continuous Integration and Continuous Deployment",
          explanation: "CI/CD is a method to frequently deliver apps to customers by introducing automation into the stages of app development.",
          difficulty: "medium"
        },
        {
          text: "What is the purpose of Docker?",
          options: "To package applications and dependencies into containers|||To edit code online|||To host websites for free|||To manage database passwords",
          correctAnswer: "To package applications and dependencies into containers",
          explanation: "Containers allow applications to run consistently across different environments.",
          difficulty: "easy"
        },
        {
          text: "What is 'Infrastructure as Code' (IaC)?",
          options: "Managing infrastructure using configuration files instead of manual tools|||Writing code for routers|||Building servers by hand|||A way to encrypt hardware",
          correctAnswer: "Managing infrastructure using configuration files instead of manual tools",
          explanation: "IaC allows for automated and version-controlled infrastructure management (e.g., Terraform).",
          difficulty: "hard"
        },
        {
          text: "What is a 'Kubernetes Pod'?",
          options: "The smallest deployable unit in Kubernetes|||A storage device|||A type of network cable|||A group of developers",
          correctAnswer: "The smallest deployable unit in Kubernetes",
          explanation: "A Pod represents a single instance of a running process in your cluster.",
          difficulty: "medium"
        },
        {
          text: "What is 'Blue-Green Deployment'?",
          options: "A technique that reduces downtime by running two identical production environments|||Using only green energy for servers|||A UI design pattern|||A way to test code on mobile",
          correctAnswer: "A technique that reduces downtime by running two identical production environments",
          explanation: "One environment (Blue) handles live traffic while the other (Green) is updated.",
          difficulty: "hard"
        }
      ]
    },
    {
      skillId: engSkill.id,
      topicName: "Backend Development",
      questions: [
        {
          text: "What is a 'REST API'?",
          options: "An architectural style for networked applications using HTTP|||A way to reset a database|||A library for sleep tracking|||A type of backend server",
          correctAnswer: "An architectural style for networked applications using HTTP",
          explanation: "Representational State Transfer (REST) uses standard HTTP methods like GET, POST, PUT, DELETE.",
          difficulty: "easy"
        },
        {
          text: "What is the difference between SQL and NoSQL?",
          options: "SQL is relational; NoSQL is non-relational|||SQL is only for web; NoSQL is for mobile|||NoSQL is always faster|||SQL is free; NoSQL is paid",
          correctAnswer: "SQL is relational; NoSQL is non-relational",
          explanation: "SQL databases use tables and schemas; NoSQL databases use documents, key-values, or graphs.",
          difficulty: "medium"
        },
        {
          text: "What is an 'ORM' (Object-Relational Mapping)?",
          options: "A technique to interact with a database using an object-oriented language|||A database engine|||A way to organize files|||A security protocol",
          correctAnswer: "A technique to interact with a database using an object-oriented language",
          explanation: "ORMs (like Prisma) allow you to write database queries in your preferred language instead of SQL.",
          difficulty: "medium"
        },
        {
          text: "What is 'MiddleWare' in a backend context?",
          options: "Functions that execute between receiving a request and sending a response|||Software for hardware control|||A type of database|||The middle layer of a computer",
          correctAnswer: "Functions that execute between receiving a request and sending a response",
          explanation: "Middleware is used for logging, auth, parsing, and more.",
          difficulty: "medium"
        },
        {
          text: "What is 'Database Indexing'?",
          options: "A data structure technique to quickly locate and access data|||Naming the database tables|||Organizing files in folders|||A way to backup data",
          correctAnswer: "A data structure technique to quickly locate and access data",
          explanation: "Indexing improves the speed of data retrieval operations on a database table.",
          difficulty: "hard"
        }
      ]
    },
    {
      skillId: engSkill.id,
      topicName: "System Design",
      questions: [
        {
          text: "What is 'Load Balancing'?",
          options: "Distributing incoming network traffic across multiple servers|||Balancing the power usage of a PC|||Dividing tasks between developers|||A way to weigh hardware",
          correctAnswer: "Distributing incoming network traffic across multiple servers",
          explanation: "It ensures no single server bears too much demand, improving reliability.",
          difficulty: "medium"
        },
        {
          text: "What is 'Microservices Architecture'?",
          options: "An approach where an app is built as a suite of small, independent services|||Building apps for small screens|||Using very small servers|||Writing very short functions",
          correctAnswer: "An approach where an app is built as a suite of small, independent services",
          explanation: "Each service runs its own process and communicates with lightweight mechanisms (e.g., HTTP).",
          difficulty: "hard"
        },
        {
          text: "What is 'Caching' in system design?",
          options: "Storing copies of data in a temporary storage location for fast access|||Collecting money from users|||A way to delete old files|||Hiding secret data",
          correctAnswer: "Storing copies of data in a temporary storage location for fast access",
          explanation: "Caching reduces latency and load on the primary data source.",
          difficulty: "easy"
        },
        {
          text: "What is 'Sharding'?",
          options: "A method for distributing data across multiple databases|||Breaking a screen|||A security breach|||Merging two companies",
          correctAnswer: "A method for distributing data across multiple databases",
          explanation: "Database sharding is a type of horizontal scaling that splits large datasets into smaller parts.",
          difficulty: "hard"
        },
        {
          text: "What is the 'CAP Theorem'?",
          options: "Consistency, Availability, Partition Tolerance - choose two|||Computer / Application / Program|||A way to cap server costs|||A law about internet speed",
          correctAnswer: "Consistency, Availability, Partition Tolerance - choose two",
          explanation: "In a distributed system, you can only provide two of the three guarantees.",
          difficulty: "hard"
        }
      ]
    },
    {
      skillId: engSkill.id,
      topicName: "Frontend Development",
      questions: [
        {
          text: "What is the 'Virtual DOM'?",
          options: "A lightweight copy of the real DOM used by libraries like React|||A 3D model of a website|||A browser extension|||A way to access the internet via VR",
          correctAnswer: "A lightweight copy of the real DOM used by libraries like React",
          explanation: "It allows for efficient UI updates by only re-rendering what has changed.",
          difficulty: "medium"
        },
        {
          text: "What is 'Responsive Design'?",
          options: "A design that adapts to different screen sizes and devices|||A website that responds quickly to clicks|||A site with many animations|||A way to send emails",
          correctAnswer: "A design that adapts to different screen sizes and devices",
          explanation: "It uses flexible grids, layouts, and media queries to ensure a good UX on all devices.",
          difficulty: "easy"
        },
        {
          text: "What is 'State Management'?",
          options: "Handling the data that changes over time in a UI|||Managing a country|||Storing files on a server|||A type of CSS layout",
          correctAnswer: "Handling the data that changes over time in a UI",
          explanation: "It involves tracking user interactions, API responses, and local UI state.",
          difficulty: "medium"
        },
        {
          text: "What is 'Server-Side Rendering' (SSR)?",
          options: "Generating HTML on the server for each request|||Rendering 3D images on a server|||A way to speed up the mouse|||Using a server to store images",
          correctAnswer: "Generating HTML on the server for each request",
          explanation: "SSR improves SEO and initial load time by sending a fully rendered page to the browser.",
          difficulty: "hard"
        },
        {
          text: "What is 'CSS-in-JS'?",
          options: "A styling technique where CSS is written using Javascript|||Writing JS inside CSS files|||A new browser feature|||It is not possible",
          correctAnswer: "A styling technique where CSS is written using Javascript",
          explanation: "Libraries like Styled Components or Emotion use this approach for scoped and dynamic styling.",
          difficulty: "medium"
        }
      ]
    }
  ];

  for (const item of data) {
    const topic = await prisma.topic.upsert({
      where: { name: item.topicName },
      update: { skillId: item.skillId },
      create: { name: item.topicName, skillId: item.skillId },
    });

    for (const q of item.questions) {
      await prisma.question.create({
        data: {
          text: q.text,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          difficulty: q.difficulty,
          topics: { connect: { id: topic.id } }
        },
      });
    }
  }

  console.log("Re-seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
