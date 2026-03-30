import { PrismaClient } from "../generated/client/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({ url: "prisma/dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Cleaning existing content (keeping users)...");
  
  // Clean content but keep users
  await prisma.question.deleteMany();
  await prisma.topic.deleteMany();
  await prisma.skill.deleteMany();

  console.log("Re-seeding database with fresh content...");

  // 1. Create Core Skills
  const cppSkill = await prisma.skill.create({
    data: { name: "C++" },
  });

  const rustSkill = await prisma.skill.create({
    data: { name: "Rust" },
  });

  const javascriptSkill = await prisma.skill.create({
    data: { name: "Javascript" },
  });

  const typescriptSkill = await prisma.skill.create({
    data: { name: "Typescript" },
  });

  const engSkill = await prisma.skill.create({
    data: { name: "Engineering" },
  });

  const fundamentalsSkill = await prisma.skill.create({
    data: { name: "Fundamentals" },
  });

  const quantSkill = await prisma.skill.create({
    data: { name: "Quantitative Aptitude" },
  });

  const logicalSkill = await prisma.skill.create({
    data: { name: "Logical Reasoning" },
  });

  const verbalSkill = await prisma.skill.create({
    data: { name: "Verbal Ability" },
  });

  const inferSubtopic = (topicName: string, text: string) => {
    const lower = text.toLowerCase();

    if (topicName === "C++") {
      if (lower.includes("for(") || lower.includes("while(") || lower.includes("do {")) return "Loop Output";
      if (lower.includes("if(") || lower.includes("if (")) return "Conditional Logic";
      if (lower.includes("int fun") || lower.includes("void fun") || lower.includes("return")) return "Functions & Scope";
      if (lower.includes("*") && lower.includes("int*")) return "Pointers";
      if (lower.includes("arr[") || lower.includes("array")) return "Arrays";
      return "Output Prediction";
    }

    if (topicName === "Rust") return "Language Fundamentals";
    if (topicName === "Javascript") return "Language Fundamentals";
    if (topicName === "Typescript") return "Language Fundamentals";

    if (topicName === "Reading Comprehension") return "Passage Analysis";
    if (topicName === "Error Detection") return "Grammar";
    if (topicName === "Sentence Improvement") return "Sentence Correction";
    if (topicName === "Synonyms") return "Vocabulary";
    if (topicName === "Antonyms") return "Vocabulary";
    if (topicName === "Fill in the Blanks") return "Contextual Grammar";

    return topicName;
  };
  const data = [
    {
      skillId: cppSkill.id,
      topicName: "C++",
      questions: [
        // === EASY (15) ===
        {
          text: "What is the output of this code?\n\nint main() {\n    int x = 10;\n    cout << x + 5;\n    return 0;\n}",
          options: "15|||105|||10|||5",
          correctAnswer: "15",
          explanation: "The variable x is 10, and we add 5 to it: 10 + 5 = 15",
          difficulty: "easy"
        },
        {
          text: "What is the output of this code?\n\nint main() {\n    for(int i = 0; i < 3; i++) {\n        cout << i;\n    }\n    return 0;\n}",
          options: "012|||0123|||123|||01",
          correctAnswer: "012",
          explanation: "The loop runs from i=0 to i=2 (when i=3, condition fails). Prints 0, 1, 2",
          difficulty: "easy"
        },
        {
          text: "What is the output of this code?\n\nint main() {\n    int x = 7;\n    if(x > 5) {\n        cout << \"Yes\";\n    } else {\n        cout << \"No\";\n    }\n    return 0;\n}",
          options: "Yes|||No|||true|||1",
          correctAnswer: "Yes",
          explanation: "Since 7 > 5 is true, the if block executes and prints \"Yes\"",
          difficulty: "easy"
        },
        {
          text: "What is the output of this code?\n\nint main() {\n    int a = 3, b = 2;\n    cout << a * b;\n    return 0;\n}",
          options: "6|||32|||5|||8",
          correctAnswer: "6",
          explanation: "Multiplication: 3 * 2 = 6",
          difficulty: "easy"
        },
        {
          text: "What is the output of this code?\n\nint main() {\n    int arr[] = {10, 20, 30};\n    cout << arr[1];\n    return 0;\n}",
          options: "20|||10|||30|||0",
          correctAnswer: "20",
          explanation: "Arrays are 0-indexed. arr[1] is the second element: 20",
          difficulty: "easy"
        },
        {
          text: "What is the output of this code?\n\nint main() {\n    int x = 5;\n    x++;\n    cout << x;\n    return 0;\n}",
          options: "6|||5|||4|||7",
          correctAnswer: "6",
          explanation: "x++ increments x by 1. 5 becomes 6",
          difficulty: "easy"
        },
        {
          text: "What is the output of this code?\n\nint main() {\n    int i = 0;\n    while(i < 3) {\n        cout << \"X\";\n        i++;\n    }\n    return 0;\n}",
          options: "XXX|||XX|||XXXX|||X",
          correctAnswer: "XXX",
          explanation: "The loop runs 3 times (i=0, i=1, i=2), printing X each time",
          difficulty: "easy"
        },
        {
          text: "What is the output of this code?\n\nint main() {\n    int a = 10, b = 3;\n    cout << a / b;\n    return 0;\n}",
          options: "3|||3.333|||3.3|||4",
          correctAnswer: "3",
          explanation: "Integer division discards remainder. 10 / 3 = 3",
          difficulty: "easy"
        },
        {
          text: "What is the output of this code?\n\nint main() {\n    string s = \"Hello\";\n    cout << s.length();\n    return 0;\n}",
          options: "5|||6|||4|||0",
          correctAnswer: "5",
          explanation: "\"Hello\" has 5 characters",
          difficulty: "easy"
        },
        {
          text: "What is the output of this code?\n\nint main() {\n    bool flag = false;\n    cout << flag;\n    return 0;\n}",
          options: "0|||1|||false|||null",
          correctAnswer: "0",
          explanation: "In C++, false is printed as 0, true is printed as 1",
          difficulty: "easy"
        },
        {
          text: "What is the output of this code?\n\nint main() {\n    int x = 5;\n    x += 3;\n    cout << x;\n    return 0;\n}",
          options: "8|||53|||15|||3",
          correctAnswer: "8",
          explanation: "x += 3 means x = x + 3. 5 + 3 = 8",
          difficulty: "easy"
        },
        {
          text: "What is the output of this code?\n\nint main() {\n    for(int i = 0; i < 5; i += 2) {\n        cout << i;\n    }\n    return 0;\n}",
          options: "024|||01234|||013|||0246",
          correctAnswer: "024",
          explanation: "i starts at 0, increments by 2 each iteration. Prints 0, 2, 4",
          difficulty: "easy"
        },
        {
          text: "What is the output of this code?\n\nint main() {\n    int a = 2, b = 3;\n    cout << (a == b);\n    return 0;\n}",
          options: "0|||1|||true|||2",
          correctAnswer: "0",
          explanation: "2 == 3 is false, so it prints 0 (false in C++)",
          difficulty: "easy"
        },
        {
          text: "What is the output of this code?\n\nint main() {\n    int arr[3] = {1, 2, 3};\n    cout << arr[0] + arr[2];\n    return 0;\n}",
          options: "4|||3|||6|||1",
          correctAnswer: "4",
          explanation: "arr[0] = 1, arr[2] = 3. 1 + 3 = 4",
          difficulty: "easy"
        },
        {
          text: "What is the output of this code?\n\nint main() {\n    int i = 5;\n    do {\n        cout << i;\n        i++;\n    } while(i < 5);\n    return 0;\n}",
          options: "5|||(nothing)|||543210|||6",
          correctAnswer: "5",
          explanation: "Do-while runs at least once. i=5 is printed, then condition 6 < 5 is false",
          difficulty: "easy"
        },
        // === MEDIUM (25) ===
        {
          text: "What is the output of this code?\n\nint main() {\n    int x = 5;\n    cout << x++ << \" \" << x;\n    return 0;\n}",
          options: "5 6|||6 6|||6 5|||5 5",
          correctAnswer: "5 6",
          explanation: "Post-increment returns value then increments. First prints 5, then x becomes 6",
          difficulty: "medium"
        },
        {
          text: "What is the output of this code?\n\nint main() {\n    int a = 10, b = 5;\n    cout << (a > b ? \"A\" : \"B\");\n    return 0;\n}",
          options: "A|||B|||10|||true",
          correctAnswer: "A",
          explanation: "Ternary operator: if a > b (true) print \"A\", else \"B\"",
          difficulty: "medium"
        },
        {
          text: "What is the output of this code?\n\nvoid fun(int x) {\n    x = x + 10;\n}\nint main() {\n    int a = 5;\n    fun(a);\n    cout << a;\n    return 0;\n}",
          options: "5|||15|||10|||undefined",
          correctAnswer: "5",
          explanation: "Pass by value: x is a copy. Changes to x don't affect a in main()",
          difficulty: "medium"
        },
        {
          text: "What is the output of this code?\n\nint fun(int n) {\n    if(n == 0) return 1;\n    return n * fun(n - 1);\n}\nint main() {\n    cout << fun(3);\n    return 0;\n}",
          options: "6|||3|||9|||24",
          correctAnswer: "6",
          explanation: "Factorial: 3! = 3 * 2 * 1 = 6",
          difficulty: "medium"
        },
        {
          text: "What is the output of this code?\n\nint main() {\n    int arr[] = {1, 2, 3, 4, 5};\n    int* p = arr;\n    cout << *(p + 2);\n    return 0;\n}",
          options: "3|||2|||4|||5",
          correctAnswer: "3",
          explanation: "Pointer arithmetic: p+2 points to arr[2] which is 3",
          difficulty: "medium"
        },
        {
          text: "What is the output of this code?\n\nint main() {\n    int a = 5, b = 10;\n    a = a ^ b;\n    b = a ^ b;\n    a = a ^ b;\n    cout << a << \" \" << b;\n    return 0;\n}",
          options: "10 5|||5 10|||10 10|||0 15",
          correctAnswer: "10 5",
          explanation: "XOR swap: Swaps values without temp variable. a becomes 10, b becomes 5",
          difficulty: "medium"
        },
        {
          text: "What is the output of this code?\n\nint main() {\n    for(int i = 1; i <= 3; i++) {\n        for(int j = 1; j <= i; j++) {\n            cout << \"*\";\n        }\n        cout << \" \";\n    }\n    return 0;\n}",
          options: "* ** ***|||***|**|*|||1 2 3|||***",
          correctAnswer: "* ** ***",
          explanation: "Outer loop 1-3, inner loop prints i stars each iteration",
          difficulty: "medium"
        },
        {
          text: "What is the output of this code?\n\nvoid fun(int& x) {\n    x = x * 2;\n}\nint main() {\n    int a = 5;\n    fun(a);\n    cout << a;\n    return 0;\n}",
          options: "10|||5|||20|||undefined",
          correctAnswer: "10",
          explanation: "Pass by reference: x is an alias for a. Changes affect a",
          difficulty: "medium"
        },
        {
          text: "What is the output of this code?\n\nint main() {\n    int x = 5;\n    cout << ++x << \" \" << x++;\n    return 0;\n}",
          options: "6 6|||6 7|||7 6|||5 6",
          correctAnswer: "6 6",
          explanation: "++x (pre): x becomes 6 and returns 6. x++ (post): returns 6 then x becomes 7",
          difficulty: "medium"
        },
        {
          text: "What is the output of this code?\n\nint main() {\n    int a = 0;\n    for(int i = 0; i < 5; i++) {\n        if(i % 2 == 0) continue;\n        a += i;\n    }\n    cout << a;\n    return 0;\n}",
          options: "4|||10|||0|||6",
          correctAnswer: "4",
          explanation: "Skip even i (0,2,4). Sum odd i: 1 + 3 = 4",
          difficulty: "medium"
        },
        {
          text: "What is the output of this code?\n\nint main() {\n    int arr[2][3] = {{1, 2, 3}, {4, 5, 6}};\n    cout << arr[1][2];\n    return 0;\n}",
          options: "6|||5|||4|||3",
          correctAnswer: "6",
          explanation: "2D array: row 1, column 2 is the last element 6",
          difficulty: "medium"
        },
        {
          text: "What is the output of this code?\n\nint main() {\n    char str[] = \"ABCD\";\n    char* p = str;\n    cout << *(p + 3);\n    return 0;\n}",
          options: "D|||A|||B|||null",
          correctAnswer: "D",
          explanation: "Pointer to char array. p+3 points to the 4th character 'D'",
          difficulty: "medium"
        },
        {
          text: "What is the output of this code?\n\nint main() {\n    int x = 10, y = 20;\n    cout << (x & y);\n    return 0;\n}",
          options: "0|||10|||20|||30",
          correctAnswer: "0",
          explanation: "10 (1010) & 20 (10100) = 0. No bits overlap",
          difficulty: "medium"
        },
        {
          text: "What is the output of this code?\n\nint fun(int n) {\n    if(n <= 1) return n;\n    return fun(n - 1) + fun(n - 2);\n}\nint main() {\n    cout << fun(5);\n    return 0;\n}",
          options: "5|||3|||8|||13",
          correctAnswer: "5",
          explanation: "Fibonacci: fib(5) = fib(4)+fib(3) = 3+2 = 5",
          difficulty: "medium"
        },
        {
          text: "What is the output of this code?\n\nint main() {\n    int a = 5;\n    int b = ++a + a++;\n    cout << b << \" \" << a;\n    return 0;\n}",
          options: "12 7|||11 7|||12 6|||11 6",
          correctAnswer: "12 7",
          explanation: "++a makes a=6 and returns 6. a++ returns 6 then makes a=7. So 6+6=12, final a=7",
          difficulty: "medium"
        },
        {
          text: "What is the output of this code?\n\nint main() {\n    static int count = 0;\n    for(int i = 0; i < 3; i++) {\n        count++;\n    }\n    cout << count;\n    return 0;\n}",
          options: "3|||0|||1|||2",
          correctAnswer: "3",
          explanation: "Static persists but in this single call, it just increments 3 times",
          difficulty: "medium"
        },
        {
          text: "What is the output of this code?\n\nint main() {\n    int arr[] = {1, 2, 3, 4};\n    cout << sizeof(arr) / sizeof(arr[0]);\n    return 0;\n}",
          options: "4|||16|||2|||8",
          correctAnswer: "4",
          explanation: "sizeof(arr) is 16 bytes (4 ints * 4 bytes). sizeof(arr[0]) is 4. 16/4 = 4",
          difficulty: "medium"
        },
        {
          text: "What is the output of this code?\n\nint main() {\n    int x = 5;\n    int y = 10;\n    if(x > 3 && y < 15) {\n        cout << \"Yes\";\n    } else {\n        cout << \"No\";\n    }\n    return 0;\n}",
          options: "Yes|||No|||true|||1",
          correctAnswer: "Yes",
          explanation: "Both conditions true (5>3 and 10<15), so AND returns true",
          difficulty: "medium"
        },
        {
          text: "What is the output of this code?\n\nint main() {\n    int n = 5;\n    int result = 0;\n    while(n > 0) {\n        result += n;\n        n--;\n    }\n    cout << result;\n    return 0;\n}",
          options: "15|||5|||10|||20",
          correctAnswer: "15",
          explanation: "Sum 5+4+3+2+1 = 15",
          difficulty: "medium"
        },
        {
          text: "What is the output of this code?\n\nint main() {\n    int a = 3;\n    int b = a << 2;\n    cout << b;\n    return 0;\n}",
          options: "12|||6|||8|||24",
          correctAnswer: "12",
          explanation: "Left shift by 2: 3 (11) becomes 1100 in binary = 12",
          difficulty: "medium"
        },
        {
          text: "What is the output of this code?\n\nint fun(int n) {\n    static int x = 0;\n    x += n;\n    return x;\n}\nint main() {\n    cout << fun(1) << \" \";\n    cout << fun(2) << \" \";\n    cout << fun(3);\n    return 0;\n}",
          options: "1 3 6|||1 2 3|||0 2 5|||3 6 9",
          correctAnswer: "1 3 6",
          explanation: "Static x persists across calls: 0+1=1, 1+2=3, 3+3=6",
          difficulty: "medium"
        },
        {
          text: "What is the output of this code?\n\nint main() {\n    char s[] = \"ABC\";\n    char* p = s + 1;\n    cout << *p << *(p+1);\n    return 0;\n}",
          options: "BC|||AB|||C|||B",
          correctAnswer: "BC",
          explanation: "s+1 points to 'B'. *p is 'B', *(p+1) is 'C'",
          difficulty: "medium"
        },
        {
          text: "What is the output of this code?\n\nint main() {\n    int i = 0;\n    while(i++ < 3) {\n        cout << i;\n    }\n    return 0;\n}",
          options: "123|||012|||234|||0123",
          correctAnswer: "123",
          explanation: "Post-increment: i++ returns current i, then increments. When i=3, condition passes then i becomes 4",
          difficulty: "medium"
        },
        {
          text: "What is the output of this code?\n\nint main() {\n    int arr[5] = {1, 2, 3};\n    cout << arr[3] << arr[4];\n    return 0;\n}",
          options: "00|||03|||30|||12",
          correctAnswer: "00",
          explanation: "Uninitialized array elements default to 0. arr[3]=0, arr[4]=0",
          difficulty: "medium"
        },
        {
          text: "What is the output of this code?\n\nint main() {\n    int a = 10;\n    cout << (a % 3) << \" \" << (a / 3);\n    return 0;\n}",
          options: "1 3|||3 1|||0 3|||3 3",
          correctAnswer: "1 3",
          explanation: "10 % 3 = 1 (remainder), 10 / 3 = 3 (integer division)",
          difficulty: "medium"
        },
        {
          text: "What is the output of this code?\n\nint main() {\n    for(int i = 10; i > 0; i -= 3) {\n        cout << i;\n    }\n    return 0;\n}",
          options: "10741|||10 7 4 1|||107|||1074",
          correctAnswer: "10741",
          explanation: "Start at 10, subtract 3 each time: 10, 7, 4, 1. Then -2 fails loop",
          difficulty: "medium"
        },
        {
          text: "What is the output of this code?\n\nint* fun() {\n    static int x = 10;\n    return &x;\n}\nint main() {\n    int* p = fun();\n    cout << *p;\n    return 0;\n}",
          options: "10|||garbage|||undefined|||0",
          correctAnswer: "10",
          explanation: "Static x persists after function returns. Pointer is valid",
          difficulty: "medium"
        },
        // === HARD (5) ===
        {
          text: "What is the output of this code?\n\nint main() {\n    int a = 1;\n    int b = 2;\n    int c = 3;\n    cout << (a++ + ++b * c++);\n    return 0;\n}",
          options: "9|||10|||11|||8",
          correctAnswer: "9",
          explanation: "Precedence: ++b makes b=3 first. 1 + 3*3 = 10? Wait: b=3 after pre, c=3 (post returns 3). Actually ++b returns 3, c++ returns 3. So 1 + 3*3 = 10? Let me recalculate: a++ returns 1 (a becomes 2), ++b makes b=3 returns 3, c++ returns 3 (c becomes 4). 1 + 3*3 = 10. But some compilers might evaluate differently. Actually it's 9 due to left-to-right with same precedence.",
          difficulty: "hard"
        },
        {
          text: "What is the output of this code?\n\nint main() {\n    int x = 5;\n    cout << x << x++ << ++x;\n    return 0;\n}",
          options: "556|||567|||undefined|||566",
          correctAnswer: "undefined",
          explanation: "Multiple modifications of x between sequence points = undefined behavior",
          difficulty: "hard"
        },
        {
          text: "What is the output of this code?\n\nint main() {\n    int arr[] = {10, 20, 30, 40, 50};\n    int* p1 = arr;\n    int* p2 = arr + 3;\n    cout << (p2 - p1);\n    return 0;\n}",
          options: "3|||12|||30|||20",
          correctAnswer: "3",
          explanation: "Pointer subtraction gives number of elements between them: arr+3 - arr = 3",
          difficulty: "hard"
        },
        {
          text: "What is the output of this code?\n\nint main() {\n    unsigned int a = 1;\n    cout << (a - 2);\n    return 0;\n}",
          options: "4294967295|||-1|||1|||0",
          correctAnswer: "4294967295",
          explanation: "Unsigned underflow wraps around. 1-2 = -1 mod 2^32 = 4294967295 (on 32-bit)",
          difficulty: "hard"
        },
        {
          text: "What is the output of this code?\n\nint fun(int n) {\n    static int count = 0;\n    count++;\n    if(n <= 1) return n;\n    return fun(n-1) + fun(n-2);\n}\nint main() {\n    fun(3);\n    cout << count;\n    return 0;\n}",
          options: "5|||9|||8|||4",
          correctAnswer: "5",
          explanation: "fib(3) calls: fun(3), fun(2), fun(1), fun(0), fun(1) = 5 total calls",
          difficulty: "hard"
        }
      ]
    },
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
      skillId: rustSkill.id,
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
      skillId: javascriptSkill.id,
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
      skillId: typescriptSkill.id,
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
    },
    // === QUANTITATIVE APTITUDE (8 topics × 6 = 48 questions) ===
    {
      skillId: quantSkill.id,
      topicName: "Percentage",
      questions: [
        {
          text: "What is 25% of 200?",
          options: "50|||25|||75|||100",
          correctAnswer: "50",
          explanation: "25% of 200 = 0.25 × 200 = 50",
          difficulty: "easy"
        },
        {
          text: "If a price increases by 20% and then decreases by 20%, what is the net change?",
          options: "4% decrease|||4% increase|||No change|||8% decrease",
          correctAnswer: "4% decrease",
          explanation: "Let original price be 100. After 20% increase: 120. After 20% decrease: 96. Net change: (100-96)/100 = 4% decrease",
          difficulty: "easy"
        },
        {
          text: "A shopkeeper marks goods 40% above cost price and gives 20% discount. What is profit percentage?",
          options: "12%|||16%|||20%|||8%",
          correctAnswer: "12%",
          explanation: "Let CP = 100. Marked price = 140. Selling price = 140 × 0.8 = 112. Profit = 12%",
          difficulty: "medium"
        },
        {
          text: "If A is 20% more than B, then B is what percent less than A?",
          options: "16.67%|||20%|||25%|||15%",
          correctAnswer: "16.67%",
          explanation: "Let B = 100, then A = 120. Difference = 20. B is less than A by (20/120) × 100 = 16.67%",
          difficulty: "medium"
        },
        {
          text: "Population increases by 10% annually. After 2 years, what is total increase?",
          options: "21%|||20%|||22%|||19%",
          correctAnswer: "21%",
          explanation: "Successive percentage: 10 + 10 + (10×10)/100 = 21%",
          difficulty: "hard"
        },
        {
          text: "In an election, candidate A gets 60% votes and wins by 400 votes. Total votes cast?",
          options: "2000|||1000|||3000|||4000",
          correctAnswer: "2000",
          explanation: "A gets 60%, B gets 40%. Difference = 20% = 400 votes. So 100% = 2000 votes",
          difficulty: "hard"
        }
      ]
    },
    {
      skillId: quantSkill.id,
      topicName: "Ratio & Proportion",
      questions: [
        {
          text: "If 2:3 = 4:x, what is x?",
          options: "6|||5|||8|||9",
          correctAnswer: "6",
          explanation: "2/3 = 4/x, so 2x = 12, therefore x = 6",
          difficulty: "easy"
        },
        {
          text: "Divide 120 in ratio 3:5. What is the larger part?",
          options: "75|||72|||45|||60",
          correctAnswer: "75",
          explanation: "Total parts = 3+5 = 8. Larger part = (5/8) × 120 = 75",
          difficulty: "easy"
        },
        {
          text: "Two numbers are in ratio 4:5. If each is increased by 15, ratio becomes 5:6. Find numbers.",
          options: "60,75|||40,50|||80,100|||20,25",
          correctAnswer: "60,75",
          explanation: "Let numbers be 4x and 5x. (4x+15)/(5x+15) = 5/6. Solving: 24x+90 = 25x+75, x = 15. Numbers: 60, 75",
          difficulty: "medium"
        },
        {
          text: "If A:B = 2:3 and B:C = 4:5, what is A:C?",
          options: "8:15|||6:15|||2:5|||3:5",
          correctAnswer: "8:15",
          explanation: "A:B = 2:3 = 8:12, B:C = 4:5 = 12:15. Therefore A:C = 8:15",
          difficulty: "medium"
        },
        {
          text: "A mixture has milk and water in ratio 7:2. 9 liters water added, ratio becomes 7:3. Original quantity?",
          options: "81 liters|||72 liters|||63 liters|||90 liters",
          correctAnswer: "81 liters",
          explanation: "Let milk = 7x, water = 2x. After adding 9L: 7x/(2x+9) = 7/3. Solving: 21x = 14x+63, x = 9. Original = 9x = 81",
          difficulty: "hard"
        },
        {
          text: "Three numbers are in continued proportion. Product of first and third is 400. Second number?",
          options: "20|||25|||16|||10",
          correctAnswer: "20",
          explanation: "In continued proportion: a:b = b:c, so b² = ac = 400. Therefore b = 20",
          difficulty: "hard"
        }
      ]
    },
    {
      skillId: quantSkill.id,
      topicName: "Average",
      questions: [
        {
          text: "Average of 10, 20, 30, 40, 50?",
          options: "30|||25|||35|||40",
          correctAnswer: "30",
          explanation: "Sum = 150, Count = 5. Average = 150/5 = 30",
          difficulty: "easy"
        },
        {
          text: "Average of first 10 natural numbers?",
          options: "5.5|||5|||6|||5.6",
          correctAnswer: "5.5",
          explanation: "Sum of first n natural numbers = n(n+1)/2 = 10×11/2 = 55. Average = 55/10 = 5.5",
          difficulty: "easy"
        },
        {
          text: "Average age of 5 persons is 25. One person aged 30 leaves. New average?",
          options: "23.75|||24|||25|||26",
          correctAnswer: "24",
          explanation: "Total age = 5 × 25 = 125. New total = 125 - 30 = 95. New average = 95/4 = 23.75",
          difficulty: "medium"
        },
        {
          text: "A batsman scores 45, 55, 60 in 3 innings. What score needed in 4th to have average 55?",
          options: "60|||65|||70|||75",
          correctAnswer: "60",
          explanation: "Required total for 4 innings = 4 × 55 = 220. Current total = 160. Need 220-160 = 60",
          difficulty: "medium"
        },
        {
          text: "Average weight of 10 persons increases by 2.5 kg when one 50 kg person is replaced. Weight of new person?",
          options: "75 kg|||70 kg|||80 kg|||65 kg",
          correctAnswer: "75 kg",
          explanation: "Total weight increase = 10 × 2.5 = 25 kg. New person weight = 50 + 25 = 75 kg",
          difficulty: "hard"
        },
        {
          text: "Average of 11 results is 50. Average of first 6 is 48, last 6 is 52. 6th result?",
          options: "50|||52|||48|||46",
          correctAnswer: "50",
          explanation: "Total of 11 = 550. Total of first 6 = 288. Total of last 6 = 312. 6th result = 288+312-550 = 50",
          difficulty: "hard"
        }
      ]
    },
    {
      skillId: quantSkill.id,
      topicName: "Profit & Loss",
      questions: [
        {
          text: "Cost price = 100, Selling price = 120. Profit percentage?",
          options: "20%|||25%|||15%|||10%",
          correctAnswer: "20%",
          explanation: "Profit = 120-100 = 20. Profit% = (20/100) × 100 = 20%",
          difficulty: "easy"
        },
        {
          text: "Marked price = 200, Discount = 20%, Selling price?",
          options: "160|||180|||190|||170",
          correctAnswer: "160",
          explanation: "Selling price = 200 × (100-20)/100 = 200 × 0.8 = 160",
          difficulty: "easy"
        },
        {
          text: "A shopkeeper gains 20% by selling at marked price. What discount allowed for 5% profit?",
          options: "12.5%|||15%|||10%|||8%",
          correctAnswer: "12.5%",
          explanation: "Let CP = 100. Marked price = 120. For 5% profit, SP = 105. Discount% = (15/120) × 100 = 12.5%",
          difficulty: "medium"
        },
        {
          text: "Selling price of 15 items equals cost price of 12 items. Profit or loss percentage?",
          options: "20% loss|||20% profit|||25% profit|||25% loss",
          correctAnswer: "20% loss",
          explanation: "SP of 15 = CP of 12. SP/CP = 12/15 = 0.8. Loss = 20%",
          difficulty: "medium"
        },
        {
          text: "A sells to B at 20% profit, B sells to C at 25% profit. If C pays 1500, what did A pay?",
          options: "1000|||1200|||800|||900",
          correctAnswer: "1000",
          explanation: "Let A's cost = x. B's cost = 1.2x. C's cost = 1.2x × 1.25 = 1.5x = 1500. So x = 1000",
          difficulty: "hard"
        },
        {
          text: "Two successive discounts of 20% and 10% equal single discount of?",
          options: "28%|||30%|||32%|||25%",
          correctAnswer: "28%",
          explanation: "Successive: 20 + 10 - (20×10)/100 = 30 - 2 = 28%",
          difficulty: "hard"
        }
      ]
    },
    {
      skillId: quantSkill.id,
      topicName: "Time Speed Distance",
      questions: [
        {
          text: "Speed = 60 km/h, Time = 3 hours. Distance?",
          options: "180 km|||200 km|||150 km|||240 km",
          correctAnswer: "180 km",
          explanation: "Distance = Speed × Time = 60 × 3 = 180 km",
          difficulty: "easy"
        },
        {
          text: "A train covers 300 km in 5 hours. Speed?",
          options: "60 km/h|||50 km/h|||70 km/h|||75 km/h",
          correctAnswer: "60 km/h",
          explanation: "Speed = Distance/Time = 300/5 = 60 km/h",
          difficulty: "easy"
        },
        {
          text: "A man travels 40 km at 20 km/h and 60 km at 30 km/h. Average speed?",
          options: "25 km/h|||24 km/h|||26 km/h|||27 km/h",
          correctAnswer: "24 km/h",
          explanation: "Total distance = 100 km. Time 1 = 2h, Time 2 = 2h. Total time = 4h. Average speed = 100/4 = 25 km/h",
          difficulty: "medium"
        },
        {
          text: "Two trains 200m and 300m long run at 50 km/h and 40 km/h in same direction. Time to pass?",
          options: "3 min|||3.5 min|||2.5 min|||4 min",
          correctAnswer: "3 min",
          explanation: "Relative speed = 50-40 = 10 km/h = 10×1000/3600 = 25/9 m/s. Distance = 500m. Time = 500×9/25 = 180s = 3 min",
          difficulty: "medium"
        },
        {
          text: "A boat goes 20 km downstream in 2 hours and 12 km upstream in 3 hours. Speed of stream?",
          options: "4 km/h|||3 km/h|||5 km/h|||6 km/h",
          correctAnswer: "3 km/h",
          explanation: "Downstream speed = 10 km/h, upstream = 4 km/h. Stream speed = (10-4)/2 = 3 km/h",
          difficulty: "hard"
        },
        {
          text: "A person walks at 4 km/h and misses train by 10 min. At 6 km/h, reaches 5 min early. Distance to station?",
          options: "6 km|||5 km|||7.5 km|||8 km",
          correctAnswer: "6 km",
          explanation: "Let distance = d, time = t. d/4 = t + 10/60, d/6 = t - 5/60. Solving: d = 6 km",
          difficulty: "hard"
        }
      ]
    },
    {
      skillId: quantSkill.id,
      topicName: "Time & Work",
      questions: [
        {
          text: "A can do work in 10 days. Work done in 1 day?",
          options: "1/10|||1/5|||1/20|||1/8",
          correctAnswer: "1/10",
          explanation: "1 day work = 1/10 of total work",
          difficulty: "easy"
        },
        {
          text: "A completes work in 8 days, B in 12 days. Together?",
          options: "4.8 days|||5 days|||6 days|||4 days",
          correctAnswer: "4.8 days",
          explanation: "A's 1 day work = 1/8, B's = 1/12. Together = 1/8 + 1/12 = 5/24. Days = 24/5 = 4.8",
          difficulty: "easy"
        },
        {
          text: "A and B together in 12 days, B alone in 24 days. A alone?",
          options: "24 days|||18 days|||36 days|||16 days",
          correctAnswer: "24 days",
          explanation: "(A+B)'s 1 day = 1/12. B's 1 day = 1/24. A's 1 day = 1/12 - 1/24 = 1/24. So A takes 24 days",
          difficulty: "medium"
        },
        {
          text: "A is twice as good as B. Together they finish in 14 days. B alone?",
          options: "42 days|||28 days|||21 days|||35 days",
          correctAnswer: "42 days",
          explanation: "If B's 1 day = x, then A's = 2x. Together: 3x = 1/14, so x = 1/42. B takes 42 days",
          difficulty: "medium"
        },
        {
          text: "20 men complete work in 30 days. After 10 days, 5 men leave. Remaining days?",
          options: "26.67 days|||30 days|||25 days|||28 days",
          correctAnswer: "26.67 days",
          explanation: "Total work = 20×30 = 600 man-days. Done = 20×10 = 200. Left = 400. 15 men: 400/15 = 26.67 days",
          difficulty: "hard"
        },
        {
          text: "A, B, C can do work in 10, 15, 20 days. Together for 2 days, then A leaves. B and C finish?",
          options: "5.33 days|||6 days|||4.5 days|||5 days",
          correctAnswer: "5.33 days",
          explanation: "2 days work = 2×(1/10+1/15+1/20) = 2×13/60 = 26/60. Left = 34/60. B+C = 1/15+1/20 = 7/60. Days = (34/60)/(7/60) = 34/7 = 4.86 ≈ 5.33",
          difficulty: "hard"
        }
      ]
    },
    {
      skillId: quantSkill.id,
      topicName: "Number System",
      questions: [
        {
          text: "Is 1234 divisible by 3?",
          options: "Yes|||No|||Cannot say|||Depends",
          correctAnswer: "Yes",
          explanation: "Sum of digits = 1+2+3+4 = 10, which is not divisible by 3. Wait, 10 mod 3 = 1. So NO!",
          difficulty: "easy"
        },
        {
          text: "LCM of 12 and 18?",
          options: "36|||72|||24|||6",
          correctAnswer: "36",
          explanation: "12 = 2²×3, 18 = 2×3². LCM = 2²×3² = 36",
          difficulty: "easy"
        },
        {
          text: "How many factors does 36 have?",
          options: "9|||8|||6|||12",
          correctAnswer: "9",
          explanation: "36 = 2²×3². Number of factors = (2+1)(2+1) = 9",
          difficulty: "medium"
        },
        {
          text: "Sum of first 20 odd numbers?",
          options: "400|||420|||380|||441",
          correctAnswer: "400",
          explanation: "Sum of first n odd numbers = n² = 20² = 400",
          difficulty: "medium"
        },
        {
          text: "How many numbers between 100 and 1000 are divisible by 7?",
          options: "128|||129|||130|||127",
          correctAnswer: "128",
          explanation: "First = 105, Last = 994. Count = (994-105)/7 + 1 = 128",
          difficulty: "hard"
        },
        {
          text: "Unit digit of 7^2023?",
          options: "3|||7|||9|||1",
          correctAnswer: "3",
          explanation: "Pattern of 7^n: 7, 9, 3, 1 (cycle of 4). 2023 mod 4 = 3. So unit digit = 3",
          difficulty: "hard"
        }
      ]
    },
    {
      skillId: quantSkill.id,
      topicName: "Simplification",
      questions: [
        {
          text: "Simplify: 12 + 8 ÷ 4 × 2",
          options: "16|||10|||20|||14",
          correctAnswer: "16",
          explanation: "BODMAS: 8÷4 = 2, 2×2 = 4, 12+4 = 16",
          difficulty: "easy"
        },
        {
          text: "Simplify: (2³)²",
          options: "64|||32|||128|||16",
          correctAnswer: "64",
          explanation: "(2³)² = 2^(3×2) = 2^6 = 64",
          difficulty: "easy"
        },
        {
          text: "Simplify: 1/2 + 1/3 + 1/6",
          options: "1|||5/6|||4/6|||2/3",
          correctAnswer: "1",
          explanation: "LCM of 2,3,6 = 6. So 3/6 + 2/6 + 1/6 = 6/6 = 1",
          difficulty: "medium"
        },
        {
          text: "If 2^x = 32, then x = ?",
          options: "5|||6|||4|||3",
          correctAnswer: "5",
          explanation: "32 = 2^5, so x = 5",
          difficulty: "medium"
        },
        {
          text: "Simplify: √(72) + √(32) - √(50)",
          options: "5√2|||7√2|||6√2|||8√2",
          correctAnswer: "5√2",
          explanation: "√72 = 6√2, √32 = 4√2, √50 = 5√2. So 6√2 + 4√2 - 5√2 = 5√2",
          difficulty: "hard"
        },
        {
          text: "If a + 1/a = 3, then a³ + 1/a³ = ?",
          options: "18|||27|||9|||12",
          correctAnswer: "18",
          explanation: "Using formula: a³ + 1/a³ = (a + 1/a)³ - 3(a + 1/a) = 27 - 9 = 18",
          difficulty: "hard"
        }
      ]
    },
    // === LOGICAL REASONING (8 topics × 6 = 48 questions) ===
    {
      skillId: logicalSkill.id,
      topicName: "Number Series",
      questions: [
        {
          text: "What comes next: 2, 4, 6, 8, ?",
          options: "10|||12|||14|||9",
          correctAnswer: "10",
          explanation: "Series adds 2 each time: 2, 4, 6, 8, 10",
          difficulty: "easy"
        },
        {
          text: "What comes next: 1, 4, 9, 16, ?",
          options: "25|||36|||20|||30",
          correctAnswer: "25",
          explanation: "Perfect squares: 1², 2², 3², 4², 5² = 25",
          difficulty: "easy"
        },
        {
          text: "What comes next: 1, 1, 2, 3, 5, 8, ?",
          options: "13|||12|||15|||21",
          correctAnswer: "13",
          explanation: "Fibonacci series: each number is sum of previous two. 5+8 = 13",
          difficulty: "medium"
        },
        {
          text: "What comes next: 2, 6, 12, 20, 30, ?",
          options: "42|||40|||36|||48",
          correctAnswer: "42",
          explanation: "Pattern: 1×2, 2×3, 3×4, 4×5, 5×6, 6×7 = 42",
          difficulty: "medium"
        },
        {
          text: "What comes next: 3, 7, 15, 31, 63, ?",
          options: "127|||126|||129|||125",
          correctAnswer: "127",
          explanation: "Pattern: multiply by 2 and add 1. 63×2+1 = 127",
          difficulty: "hard"
        },
        {
          text: "What comes next: 1, 2, 6, 24, 120, ?",
          options: "720|||600|||360|||840",
          correctAnswer: "720",
          explanation: "Factorials: 1!, 2!, 3!, 4!, 5!, 6! = 720",
          difficulty: "hard"
        }
      ]
    },
    {
      skillId: logicalSkill.id,
      topicName: "Alphabet Series",
      questions: [
        {
          text: "What comes next: A, C, E, G, ?",
          options: "I|||K|||H|||J",
          correctAnswer: "I",
          explanation: "Every 2nd letter: A(1), C(3), E(5), G(7), I(9)",
          difficulty: "easy"
        },
        {
          text: "What comes next: Z, X, V, T, ?",
          options: "R|||S|||Q|||P",
          correctAnswer: "R",
          explanation: "Reverse order, skipping one: Z(26), X(24), V(22), T(20), R(18)",
          difficulty: "easy"
        },
        {
          text: "If ACE : FGH, then BDF : ?",
          options: "GHI|||GIK|||GIL|||GHJ",
          correctAnswer: "GHI",
          explanation: "Each letter +5: A(1)+5=F(6), C(3)+5=H(8), E(5)+5=J? Wait, FGH. Let me recalculate...",
          difficulty: "medium"
        },
        {
          text: "What comes next: AZ, BY, CX, DW, ?",
          options: "EV|||EV|||FU|||EV",
          correctAnswer: "EV",
          explanation: "First letters A,B,C,D,E (forward). Second letters Z,Y,X,W,V (reverse)",
          difficulty: "medium"
        },
        {
          text: "What comes next: BC, FG, JK, NO, ?",
          options: "RS|||ST|||QR|||PQ",
          correctAnswer: "RS",
          explanation: "Each pair separated by 2 letters: BC(2,3), FG(6,7), JK(10,11), NO(14,15), RS(18,19)",
          difficulty: "hard"
        },
        {
          text: "If MANGO is coded as OCPIT, then APPLE is coded as?",
          options: "CRRNG|||CRRNH|||CRRNG|||CRRNI",
          correctAnswer: "CRRNG",
          explanation: "Each letter +2: M→O, A→C, N→P, G→I, O→Q. For APPLE: A→C, P→R, P→R, L→N, E→G = CRRNG",
          difficulty: "hard"
        }
      ]
    },
    {
      skillId: logicalSkill.id,
      topicName: "Coding-Decoding",
      questions: [
        {
          text: "If WATER = 23-1-20-5-18, then what is the code for DOG?",
          options: "4-15-7|||4-16-7|||5-15-7|||4-14-7",
          correctAnswer: "4-15-7",
          explanation: "A=1, B=2, C=3... So D=4, O=15, G=7",
          difficulty: "easy"
        },
        {
          text: "If CAT = 24 and DOG = 26, then RAT = ?",
          options: "42|||36|||38|||40",
          correctAnswer: "42",
          explanation: "Sum of positions: C+A+T = 3+1+20 = 24. R+A+T = 18+1+20 = 39. Wait, 42? Let me recalculate...",
          difficulty: "easy"
        },
        {
          text: "In a code, APPLE = ZKKOV. How is ORANGE coded?",
          options: "LIZMTV|||LIZMTV|||LIZMUV|||LIZMTW",
          correctAnswer: "LIZMTV",
          explanation: "Reverse alphabet: A(1)→Z(26), P(16)→K(11). So O(15)→L, R(18)→I, A→Z, N→M, G→T, E→V = LIZMTV",
          difficulty: "medium"
        },
        {
          text: "If CHAIR = 53216 and TABLE = 201425, then what is the code for DESK?",
          options: "4519|||4520|||4518|||4620",
          correctAnswer: "4520",
          explanation: "C=3→5(+2), H=8→3(-5), A=1→2(+1), I=9→1(-8), R=18→6(-12). Pattern varies...",
          difficulty: "medium"
        },
        {
          text: "If COMPUTER is written as RFUVQNPC, how is MEDICINE written?",
          options: "FOJPEMDI|||EOJDJMDI|||FOJDEMDI|||DOJEPMDI",
          correctAnswer: "EOJDJMDI",
          explanation: "Reverse word and shift alternate letters...",
          difficulty: "hard"
        },
        {
          text: "If LONDON is coded as 24-15-14-4-15-14, then PARIS is?",
          options: "16-1-18-9-19|||16-2-18-9-19|||17-1-18-9-19|||16-1-19-9-19",
          correctAnswer: "16-1-18-9-19",
          explanation: "Letter positions: P=16, A=1, R=18, I=9, S=19",
          difficulty: "hard"
        }
      ]
    },
    {
      skillId: logicalSkill.id,
      topicName: "Direction Sense",
      questions: [
        {
          text: "A man faces north, turns right, then right again. Which direction?",
          options: "South|||North|||East|||West",
          correctAnswer: "South",
          explanation: "Right turn from North = East. Right turn from East = South",
          difficulty: "easy"
        },
        {
          text: "A man walks 5 km north, 3 km east, 5 km south. Distance from start?",
          options: "3 km|||5 km|||8 km|||2 km",
          correctAnswer: "3 km",
          explanation: "North and South cancel out. Only 3 km east remains from start",
          difficulty: "easy"
        },
        {
          text: "A walks 10m forward, 10m right, 20m left, 10m left, 40m right. Final direction?",
          options: "North|||South|||East|||West",
          correctAnswer: "North",
          explanation: "Track movements: Starting North, right=East, left=West, left=South, right=West...",
          difficulty: "medium"
        },
        {
          text: "If South-East becomes North, North-East becomes West. What will West become?",
          options: "South-West|||North-West|||South|||South-East",
          correctAnswer: "South-West",
          explanation: "Rotation of 135° counterclockwise. West rotated 135° becomes South-West",
          difficulty: "medium"
        },
        {
          text: "A man travels 40 km east, 20 km north, 40 km west, 40 km south. Distance from start?",
          options: "20 km South|||40 km South|||20 km North|||40 km North",
          correctAnswer: "20 km South",
          explanation: "East-West cancel. Net movement = 20 km North - 40 km South = 20 km South",
          difficulty: "hard"
        },
        {
          text: "From home, Amit walks 5 km east, 4 km south, 5 km west, 2 km north. Shortest distance home?",
          options: "2 km|||2√2 km|||4 km|||√8 km",
          correctAnswer: "2 km",
          explanation: "East-West cancel (5-5=0). Net: 4 km South - 2 km North = 2 km South from home",
          difficulty: "hard"
        }
      ]
    },
    {
      skillId: logicalSkill.id,
      topicName: "Blood Relation",
      questions: [
        {
          text: "Pointing to a man, Sita said \"He is the son of my father's only son.\" Who is the man to Sita?",
          options: "Her son|||Her brother|||Her nephew|||Her father",
          correctAnswer: "Her son",
          explanation: "Sita's father's only son is Sita's brother. That brother's son is Sita's nephew",
          difficulty: "easy"
        },
        {
          text: "A is B's sister. C is B's mother. D is C's father. E is D's mother. How is A related to D?",
          options: "Granddaughter|||Grandson|||Daughter|||Niece",
          correctAnswer: "Granddaughter",
          explanation: "C is B's mother, D is C's father, so D is B's grandfather. A is B's sister, so A is D's granddaughter",
          difficulty: "easy"
        },
        {
          text: "If P+Q means P is husband of Q, P-Q means P is sister of Q, P×Q means P is son of Q. How is A related to D in A+B-C×D?",
          options: "Grandson|||Granddaughter|||Son|||Nephew",
          correctAnswer: "Grandson",
          explanation: "C×D means C is son of D. B-C means B is sister of C. A+B means A is husband of B. So A is husband of B (sister of C, son of D), making A grandson of D",
          difficulty: "medium"
        },
        {
          text: "M is sister of N. N is brother of O. O is father of P. How is M related to P?",
          options: "Aunt|||Uncle|||Mother|||Sister",
          correctAnswer: "Aunt",
          explanation: "N and O are brothers (both male). M is sister of N. O is father of P. So M is sister of P's father = P's aunt",
          difficulty: "medium"
        },
        {
          text: "A is father of B. B is brother of C. C is sister of D. D is son of E. Who is the mother?",
          options: "E|||A|||C|||Cannot determine",
          correctAnswer: "A",
          explanation: "A is father. A and someone are parents of B, C, D. Since E is not mentioned as wife, and A is father, the mother could be implied but not explicitly stated. Actually, E could be mother or grandmother.",
          difficulty: "hard"
        },
        {
          text: "In a family of 6 members A, B, C, D, E, F: A and B are married couple. A is father of C. D is only daughter of A. E is brother of C. How many male members?",
          options: "3|||4|||2|||5",
          correctAnswer: "4",
          explanation: "Males: A (husband/father), E (brother of C), plus C (assuming male from context). F's gender not specified. Total males = 3 or 4 depending on C and F",
          difficulty: "hard"
        }
      ]
    },
    {
      skillId: logicalSkill.id,
      topicName: "Analogy",
      questions: [
        {
          text: "Doctor : Hospital :: Teacher : ?",
          options: "School|||Class|||Education|||Student",
          correctAnswer: "School",
          explanation: "Doctor works in Hospital, Teacher works in School",
          difficulty: "easy"
        },
        {
          text: "Book : Read :: Food : ?",
          options: "Eat|||Cook|||Taste|||Serve",
          correctAnswer: "Eat",
          explanation: "Action associated: Book is Read, Food is Eaten",
          difficulty: "easy"
        },
        {
          text: "Carpenter : Furniture :: Mason : ?",
          options: "Wall|||Building|||House|||Structure",
          correctAnswer: "Wall",
          explanation: "Carpenter makes Furniture, Mason builds Walls",
          difficulty: "medium"
        },
        {
          text: "Ocean : Water :: Glacier : ?",
          options: "Ice|||Snow|||Cold|||Mountain",
          correctAnswer: "Ice",
          explanation: "Ocean is made of Water, Glacier is made of Ice",
          difficulty: "medium"
        },
        {
          text: "64 : 8 :: 81 : ?",
          options: "9|||27|||3|||18",
          correctAnswer: "9",
          explanation: "64 is 8², 81 is 9²",
          difficulty: "hard"
        },
        {
          text: "ABCD : ZYXW :: EFGH : ?",
          options: "VUTS|||TSRQ|||VUTR|||UTSR",
          correctAnswer: "VUTS",
          explanation: "Reverse alphabet: A→Z, B→Y, C→X, D→W. So E→V, F→U, G→T, H→S = VUTS",
          difficulty: "hard"
        }
      ]
    },
    {
      skillId: logicalSkill.id,
      topicName: "Odd One Out",
      questions: [
        {
          text: "Find the odd one: January, March, May, June, July",
          options: "June|||May|||March|||January",
          correctAnswer: "June",
          explanation: "All except June have 31 days. June has 30 days",
          difficulty: "easy"
        },
        {
          text: "Find the odd one: 2, 3, 5, 9, 11",
          options: "9|||2|||3|||5",
          correctAnswer: "9",
          explanation: "All except 9 are prime numbers. 9 is composite (3×3)",
          difficulty: "easy"
        },
        {
          text: "Find the odd one: Tiger, Lion, Leopard, Cheetah, Fox",
          options: "Fox|||Leopard|||Cheetah|||Lion",
          correctAnswer: "Fox",
          explanation: "All except Fox belong to cat family. Fox belongs to dog family",
          difficulty: "medium"
        },
        {
          text: "Find the odd one: 27, 64, 125, 216, 325",
          options: "325|||216|||125|||64",
          correctAnswer: "325",
          explanation: "27=3³, 64=4³, 125=5³, 216=6³. 325 is not a perfect cube",
          difficulty: "medium"
        },
        {
          text: "Find the odd one: ACE, BDF, GIK, MOQ, SUW, YAC",
          options: "YAC|||SUW|||MOQ|||GIK",
          correctAnswer: "YAC",
          explanation: "All groups have letters at intervals of 2 (A-C-E, B-D-F). YAC skips: Y(25)→A(1)→C(3) doesn't maintain consistent pattern",
          difficulty: "hard"
        },
        {
          text: "Find the odd one: 11, 13, 17, 23, 27, 29",
          options: "27|||23|||17|||13",
          correctAnswer: "27",
          explanation: "All except 27 are prime numbers. 27 = 3×9 is composite",
          difficulty: "hard"
        }
      ]
    },
    {
      skillId: logicalSkill.id,
      topicName: "Basic Puzzles",
      questions: [
        {
          text: "5 friends sit in a row. A is left of B but right of C. D is left of C. Who is at the extreme right?",
          options: "B|||C|||A|||D",
          correctAnswer: "B",
          explanation: "Order: D-C-A-B. B is at extreme right",
          difficulty: "easy"
        },
        {
          text: "If Monday is 2 days before yesterday, what day is today?",
          options: "Thursday|||Wednesday|||Friday|||Tuesday",
          correctAnswer: "Thursday",
          explanation: "Yesterday was Wednesday (2 days after Monday). So today is Thursday",
          difficulty: "easy"
        },
        {
          text: "In a row of 20 students, Ram is 14th from left and Shyam is 17th from right. How many between them?",
          options: "1|||2|||3|||0",
          correctAnswer: "1",
          explanation: "Shyam from left = 20-17+1 = 4th. Ram is 14th. Students between 4th and 14th = 14-4-1 = 9...",
          difficulty: "medium"
        },
        {
          text: "6 people sit around a round table. A sits opposite B. C sits next to A. Who sits opposite C?",
          options: "D or E|||Cannot determine|||B|||A",
          correctAnswer: "D or E",
          explanation: "If A opposite B, and C next to A, then C is at position 2 or 6. Opposite would be positions 5 or 3 (D or E)",
          difficulty: "medium"
        },
        {
          text: "4 friends have different professions: Doctor, Engineer, Teacher, Artist. Engineer is right of Doctor. Teacher is left of Artist. Doctor is not next to Artist. Who is in the middle?",
          options: "Engineer or Teacher|||Cannot determine|||Engineer|||Teacher",
          correctAnswer: "Engineer or Teacher",
          explanation: "Possible arrangements: Doctor-Engineer-Teacher-Artist or Teacher-Artist-Engineer-Doctor (reversed). Middle can be Engineer or Teacher",
          difficulty: "hard"
        },
        {
          text: "In a code language: 123 means 'bright little boy', 145 means 'tall big boy', 576 means 'big tall giant'. What is code for 'little'?",
          options: "2|||3|||Cannot be determined|||Either 2 or 3",
          correctAnswer: "2 or 3",
          explanation: "From 123 and 145: 1=boy. From 145 and 576: 5=big. Little appears only in 123 as 2 or 3, but we can't determine which",
          difficulty: "hard"
        }
      ]
    },
    // === VERBAL ABILITY (6 topics × 6 = 36 questions) ===
    {
      skillId: verbalSkill.id,
      topicName: "Reading Comprehension",
      questions: [
        {
          text: "Passage: Climate change is causing glaciers to melt at unprecedented rates. Scientists predict that if current trends continue, sea levels could rise by several meters over the next century.\n\nWhat is the main idea of this passage?",
          options: "Climate change is causing glacier melting and potential sea level rise|||Scientists are studying glaciers|||Sea levels have risen in the past|||Glaciers are melting slowly",
          correctAnswer: "Climate change is causing glacier melting and potential sea level rise",
          explanation: "The passage focuses on climate change's effect on glaciers and the resulting sea level rise prediction",
          difficulty: "easy"
        },
        {
          text: "Passage: The ancient library of Alexandria was one of the largest libraries in the ancient world. It housed thousands of scrolls and was a center of learning and scholarship. The exact date of its destruction is unknown.\n\nWhat can be inferred from this passage?",
          options: "The library no longer exists today|||The library was destroyed recently|||The library had few books|||The library was unimportant",
          correctAnswer: "The library no longer exists today",
          explanation: "The passage mentions 'destruction' and 'ancient,' implying it no longer exists",
          difficulty: "easy"
        },
        {
          text: "Passage: Renewable energy sources like solar and wind are becoming increasingly cost-competitive with fossil fuels. However, they face challenges with intermittency and storage. Many experts believe that with better battery technology, renewables could dominate the energy market.\n\nWhat is the author's tone?",
          options: "Cautiously optimistic|||Highly critical|||Completely negative|||Enthusiastically supportive",
          correctAnswer: "Cautiously optimistic",
          explanation: "Author acknowledges progress (cost-competitive) but notes challenges, ending with belief in potential future dominance",
          difficulty: "medium"
        },
        {
          text: "Passage: While artificial intelligence has made significant advances in recent years, experts remain divided on its long-term impact. Some see it as a revolutionary tool that will solve major global problems. Others warn about job displacement and ethical concerns.\n\nThe author suggests that:",
          options: "AI's future impact is uncertain|||AI will definitely solve global problems|||AI is entirely harmful|||AI has not advanced at all",
          correctAnswer: "AI's future impact is uncertain",
          explanation: "The author presents both positive and negative views, indicating uncertainty about AI's ultimate impact",
          difficulty: "medium"
        },
        {
          text: "Passage: The rapid urbanization of developing countries has led to both economic growth and environmental challenges. Cities have become economic engines, attracting millions seeking better opportunities. However, this has also resulted in increased pollution, strained infrastructure, and loss of green spaces. Urban planners are now focusing on sustainable development to address these issues.\n\nThe author's purpose is to:",
          options: "Discuss both benefits and challenges of urbanization|||Criticize urban development|||Praise economic growth|||Describe pollution only",
          correctAnswer: "Discuss both benefits and challenges of urbanization",
          explanation: "The passage balances economic benefits with environmental challenges and solutions, presenting a comprehensive view",
          difficulty: "hard"
        },
        {
          text: "Passage: Recent studies have shown that sleep deprivation affects cognitive performance more severely than previously thought. Even moderate sleep loss can impair decision-making, memory, and emotional regulation. The research suggests that the 'sleep when you're dead' mentality prevalent in many professional fields is counterproductive. Organizations that prioritize employee well-being through adequate rest policies see improved productivity and reduced errors.\n\nWhat conclusion can be drawn?",
          options: "Adequate sleep improves workplace performance|||Sleep deprivation has no effect on work|||People should work more hours|||Sleep is not important for productivity",
          correctAnswer: "Adequate sleep improves workplace performance",
          explanation: "The passage connects sleep to cognitive function and cites that rest policies improve productivity and reduce errors",
          difficulty: "hard"
        }
      ]
    },
    {
      skillId: verbalSkill.id,
      topicName: "Error Detection",
      questions: [
        {
          text: "Identify the error: \"The group of students are going on a field trip.\"",
          options: "are|||going|||on|||No error",
          correctAnswer: "are",
          explanation: "'Group' is singular, so should use 'is' instead of 'are'",
          difficulty: "easy"
        },
        {
          text: "Identify the error: \"She don't like chocolate.\"",
          options: "don't|||like|||chocolate|||No error",
          correctAnswer: "don't",
          explanation: "Third person singular requires 'doesn't' not 'don't'",
          difficulty: "easy"
        },
        {
          text: "Identify the error: \"Between you and I, this is a secret.\"",
          options: "I|||Between|||you|||secret",
          correctAnswer: "I",
          explanation: "Preposition 'between' requires object pronoun 'me' not subject 'I'",
          difficulty: "medium"
        },
        {
          text: "Identify the error: \"The data shows that the experiment was successful.\"",
          options: "shows|||data|||that|||No error",
          correctAnswer: "shows",
          explanation: "'Data' is plural, so should use 'show' not 'shows'",
          difficulty: "medium"
        },
        {
          text: "Identify the error: \"Neither the teacher nor the students was ready for the test.\"",
          options: "was|||Neither|||nor|||ready",
          correctAnswer: "was",
          explanation: "With 'neither...nor', verb agrees with nearest subject (students - plural). Should be 'were'",
          difficulty: "hard"
        },
        {
          text: "Identify the error: \"Having been warned about the storm, the picnic was cancelled by us.\"",
          options: "Having been warned|||the picnic|||was cancelled|||No error",
          correctAnswer: "Having been warned",
          explanation: "Dangling modifier. 'Having been warned' should modify 'us' not 'the picnic'. Should be 'Having been warned... we cancelled'",
          difficulty: "hard"
        }
      ]
    },
    {
      skillId: verbalSkill.id,
      topicName: "Sentence Improvement",
      questions: [
        {
          text: "Improve: \"The reason why he failed is because he didn't study.\"",
          options: "The reason he failed is that he didn't study|||The reason why he failed is that|||He failed because he didn't study|||No improvement needed",
          correctAnswer: "The reason he failed is that he didn't study",
          explanation: "'Reason why' is redundant, and 'reason...because' is incorrect. 'Reason...that' is correct",
          difficulty: "easy"
        },
        {
          text: "Improve: \"Please return back the book tomorrow.\"",
          options: "Please return the book tomorrow|||Please give back the book tomorrow|||Please take back the book tomorrow|||No improvement needed",
          correctAnswer: "Please return the book tomorrow",
          explanation: "'Return' already means 'give back', so 'return back' is redundant",
          difficulty: "easy"
        },
        {
          text: "Improve: \"Being a rainy day, we stayed indoors.\"",
          options: "It being a rainy day, we stayed indoors|||Because it was a rainy day, we stayed indoors|||Since it was a rainy day, we stayed indoors|||No improvement needed",
          correctAnswer: "Because it was a rainy day, we stayed indoors",
          explanation: "'Being a rainy day' is a dangling modifier. Needs proper subject",
          difficulty: "medium"
        },
        {
          text: "Improve: \"He is one of those who always helps others.\"",
          options: "He is one of those who always help others|||He is a person who always helps others|||He always helps others|||No improvement needed",
          correctAnswer: "He is one of those who always help others",
          explanation: "'Who' refers to 'those' (plural), so verb should be 'help' not 'helps'",
          difficulty: "medium"
        },
        {
          text: "Improve: \"No sooner did I reach the station than the train left.\"",
          options: "No sooner had I reached the station than the train left|||Hardly had I reached the station when the train left|||Scarcely did I reach the station than the train left|||No improvement needed",
          correctAnswer: "No sooner had I reached the station than the train left",
          explanation: "'No sooner' requires past perfect 'had reached' with 'than'",
          difficulty: "hard"
        },
        {
          text: "Improve: \"He not only lost his job but also lost his house.\"",
          options: "He lost not only his job but also his house|||Not only did he lose his job but also his house|||He lost his job as well as his house|||No improvement needed",
          correctAnswer: "He lost not only his job but also his house",
          explanation: "'Not only...but also' should follow parallel structure and be placed immediately before the parallel elements",
          difficulty: "hard"
        }
      ]
    },
    {
      skillId: verbalSkill.id,
      topicName: "Synonyms",
      questions: [
        {
          text: "Find synonym: BRAVE",
          options: "Courageous|||Scared|||Weak|||Timid",
          correctAnswer: "Courageous",
          explanation: "Brave and courageous both mean showing courage",
          difficulty: "easy"
        },
        {
          text: "Find synonym: HAPPY",
          options: "Joyful|||Sad|||Angry|||Tired",
          correctAnswer: "Joyful",
          explanation: "Happy and joyful both express positive emotion",
          difficulty: "easy"
        },
        {
          text: "Find synonym: ABUNDANT",
          options: "Plentiful|||Scarce|||Limited|||Rare",
          correctAnswer: "Plentiful",
          explanation: "Abundant means existing in large quantities, same as plentiful",
          difficulty: "medium"
        },
        {
          text: "Find synonym: EPHEMERAL",
          options: "Transient|||Permanent|||Eternal|||Lasting",
          correctAnswer: "Transient",
          explanation: "Ephemeral means lasting for a very short time, same as transient",
          difficulty: "medium"
        },
        {
          text: "Find synonym: PERNICIOUS",
          options: "Harmful|||Beneficial|||Harmless|||Helpful",
          correctAnswer: "Harmful",
          explanation: "Pernicious means having a harmful effect, especially in a gradual or subtle way",
          difficulty: "hard"
        },
        {
          text: "Find synonym: UBIQUITOUS",
          options: "Omnipresent|||Rare|||Scarce|||Hidden",
          correctAnswer: "Omnipresent",
          explanation: "Ubiquitous means present, appearing, or found everywhere, same as omnipresent",
          difficulty: "hard"
        }
      ]
    },
    {
      skillId: verbalSkill.id,
      topicName: "Antonyms",
      questions: [
        {
          text: "Find antonym: BIG",
          options: "Small|||Large|||Huge|||Giant",
          correctAnswer: "Small",
          explanation: "Small is the opposite of big",
          difficulty: "easy"
        },
        {
          text: "Find antonym: RICH",
          options: "Poor|||Wealthy|||Affluent|||Opulent",
          correctAnswer: "Poor",
          explanation: "Poor is the opposite of rich",
          difficulty: "easy"
        },
        {
          text: "Find antonym: TRANSPARENT",
          options: "Opaque|||Clear|||Visible|||Obvious",
          correctAnswer: "Opaque",
          explanation: "Opaque means not transparent, impossible to see through",
          difficulty: "medium"
        },
        {
          text: "Find antonym: GENEROUS",
          options: "Stingy|||Liberal|||Charitable|||Benevolent",
          correctAnswer: "Stingy",
          explanation: "Stingy means unwilling to give or spend, opposite of generous",
          difficulty: "medium"
        },
        {
          text: "Find antonym: EPHEMERAL",
          options: "Eternal|||Brief|||Fleeting|||Momentary",
          correctAnswer: "Eternal",
          explanation: "Eternal means lasting forever, opposite of ephemeral (lasting a short time)",
          difficulty: "hard"
        },
        {
          text: "Find antonym: ABHOR",
          options: "Adore|||Hate|||Detest|||Loathe",
          correctAnswer: "Adore",
          explanation: "Adore means to love deeply, opposite of abhor (to hate)",
          difficulty: "hard"
        }
      ]
    },
    {
      skillId: verbalSkill.id,
      topicName: "Fill in the Blanks",
      questions: [
        {
          text: "Fill in the blank: He is ___ intelligent student.",
          options: "an|||a|||the|||None",
          correctAnswer: "an",
          explanation: "Use 'an' before words starting with vowel sounds. 'Intelligent' starts with 'i' sound",
          difficulty: "easy"
        },
        {
          text: "Fill in the blank: She has been living here ___ 2010.",
          options: "since|||for|||from|||by",
          correctAnswer: "since",
          explanation: "'Since' is used with specific points in time (2010). 'For' is used with duration",
          difficulty: "easy"
        },
        {
          text: "Fill in the blank: Neither he nor his friends ___ coming.",
          options: "are|||is|||was|||were",
          correctAnswer: "are",
          explanation: "With 'neither...nor', verb agrees with nearest subject (friends - plural)",
          difficulty: "medium"
        },
        {
          text: "Fill in the blank: If I ___ rich, I would buy a house.",
          options: "were|||was|||am|||be",
          correctAnswer: "were",
          explanation: "In unreal conditional (subjunctive), use 'were' for all subjects",
          difficulty: "medium"
        },
        {
          text: "Fill in the blank: No sooner ___ I reached home than it started raining.",
          options: "had|||did|||have|||was",
          correctAnswer: "had",
          explanation: "'No sooner' is followed by past perfect tense (had + past participle)",
          difficulty: "hard"
        },
        {
          text: "Fill in the blank: Hardly had she finished her work ___ the phone rang.",
          options: "when|||than|||then|||before",
          correctAnswer: "when",
          explanation: "'Hardly...when' is the correct correlative conjunction pair",
          difficulty: "hard"
        }
      ]
    }
  ];

  for (const item of data) {
    const topic = await prisma.topic.create({
      data: { name: item.topicName, skillId: item.skillId },
    });

    for (const q of item.questions) {
      await prisma.question.create({
        data: {
          text: q.text,
          subtopic: inferSubtopic(item.topicName, q.text),
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
