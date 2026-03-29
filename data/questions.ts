export type Difficulty = "easy" | "medium" | "hard";

export type Question = {
  id: string;
  code: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: Difficulty;
};

export const questions: Question[] = [
  {
    id: "e1",
    difficulty: "easy",
    code: `#include <iostream>
using namespace std;

int main() {
    for (int i = 0; i < 5; i++) {
        cout << i;
    }
}`,
    options: ["01234", "12345", "012345", "54321"],
    correctAnswer: "01234",
    explanation: "The loop prints i from 0 through 4.",
  },
  {
    id: "e2",
    difficulty: "easy",
    code: `#include <iostream>
using namespace std;

int main() {
    int i = 0;
    while (i <= 3) {
        cout << i;
        i++;
    }
}`,
    options: ["0123", "1234", "012", "00112233"],
    correctAnswer: "0123",
    explanation: "i starts at 0 and prints until i becomes 4.",
  },
  {
    id: "e3",
    difficulty: "easy",
    code: `#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 4; i++) {
        cout << i * 2;
    }
}`,
    options: ["2468", "24810", "1234", "46810"],
    correctAnswer: "2468",
    explanation: "Values are 2, 4, 6, and 8 for i = 1 to 4.",
  },
  {
    id: "e4",
    difficulty: "easy",
    code: `#include <iostream>
using namespace std;

int main() {
    int i = 5;
    while (i > 1) {
        cout << i;
        i -= 2;
    }
}`,
    options: ["531", "53", "54321", "51"],
    correctAnswer: "53",
    explanation: "i takes values 5 and 3, then becomes 1 and stops.",
  },
  {
    id: "e5",
    difficulty: "easy",
    code: `#include <iostream>
using namespace std;

int main() {
    for (int i = 0; i < 7; i += 2) {
        cout << i;
    }
}`,
    options: ["0246", "0123456", "246", "135"],
    correctAnswer: "0246",
    explanation: "i increases by 2 each time: 0, 2, 4, 6.",
  },
  {
    id: "e6",
    difficulty: "easy",
    code: `#include <iostream>
using namespace std;

int main() {
    int i = 1;
    while (i < 10) {
        cout << i;
        i *= 2;
    }
}`,
    options: ["1248", "1234", "24816", "1111"],
    correctAnswer: "1248",
    explanation: "i doubles each step: 1 -> 2 -> 4 -> 8.",
  },
  {
    id: "e7",
    difficulty: "easy",
    code: `#include <iostream>
using namespace std;

int main() {
    for (int i = 3; i >= 0; i--) {
        cout << i;
    }
}`,
    options: ["0123", "3210", "321", "43210"],
    correctAnswer: "3210",
    explanation: "The loop counts down from 3 to 0.",
  },
  {
    id: "e8",
    difficulty: "easy",
    code: `#include <iostream>
using namespace std;

int main() {
    int i = 0;
    while (i < 5) {
        i++;
        cout << i;
    }
}`,
    options: ["01234", "12345", "1234", "54321"],
    correctAnswer: "12345",
    explanation: "i is incremented before printing, so output starts at 1.",
  },
  {
    id: "e9",
    difficulty: "easy",
    code: `#include <iostream>
using namespace std;

int main() {
    for (int i = 0; i < 5; i++) {
        if (i == 3) {
            break;
        }
        cout << i;
    }
}`,
    options: ["012", "0123", "123", "01234"],
    correctAnswer: "012",
    explanation: "The loop breaks when i becomes 3, so 0, 1, 2 are printed.",
  },
  {
    id: "e10",
    difficulty: "easy",
    code: `#include <iostream>
using namespace std;

int main() {
    for (int i = 0; i < 6; i++) {
        if (i % 2 == 0) {
            continue;
        }
        cout << i;
    }
}`,
    options: ["024", "135", "12345", "015"],
    correctAnswer: "135",
    explanation: "Only odd i values are printed because even values continue.",
  },
  {
    id: "m1",
    difficulty: "medium",
    code: `#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 3; i++) {
        for (int j = 0; j < 2; j++) {
            cout << i + j;
        }
    }
}`,
    options: ["1234", "122334", "112233", "123123"],
    correctAnswer: "122334",
    explanation: "Pairs are (1,2), (2,3), (3,4) from nested loops.",
  },
  {
    id: "m2",
    difficulty: "medium",
    code: `#include <iostream>
using namespace std;

int main() {
    for (int i = 0; i < 5; i++) {
        cout << i;
        i++;
    }
}`,
    options: ["01234", "024", "013", "0246"],
    correctAnswer: "024",
    explanation: "i is incremented once in the body and once by the loop update.",
  },
  {
    id: "m3",
    difficulty: "medium",
    code: `#include <iostream>
using namespace std;

int main() {
    int i = 0;
    while (i < 4) {
        cout << i;
        ++i;
        cout << i;
    }
}`,
    options: ["0123", "01122334", "00112233", "1234"],
    correctAnswer: "01122334",
    explanation: "Each iteration prints i before and after pre-increment.",
  },
  {
    id: "m4",
    difficulty: "medium",
    code: `#include <iostream>
using namespace std;

int main() {
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (j == 1) {
                break;
            }
            cout << i << j;
        }
    }
}`,
    options: ["001122", "001020", "000102", "010203"],
    correctAnswer: "001020",
    explanation: "For each i, inner loop prints only j = 0, then breaks at j = 1.",
  },
  {
    id: "m5",
    difficulty: "medium",
    code: `#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 3; i++) {
        for (int j = 1; j <= i; j++) {
            cout << j;
        }
    }
}`,
    options: ["123", "111222333", "112123", "12123"],
    correctAnswer: "112123",
    explanation: "Rows are 1, then 12, then 123.",
  },
  {
    id: "m6",
    difficulty: "medium",
    code: `#include <iostream>
using namespace std;

int main() {
    int i = 0;
    while (i < 6) {
        i++;
        if (i % 3 == 0) {
            continue;
        }
        cout << i;
    }
}`,
    options: ["123456", "1245", "145", "1256"],
    correctAnswer: "1245",
    explanation: "Values 3 and 6 are skipped due to continue.",
  },
  {
    id: "m7",
    difficulty: "medium",
    code: `#include <iostream>
using namespace std;

int main() {
    for (int i = 0; i < 4; i++) {
        cout << i;
        for (int j = 0; j < 2; j++) {
            cout << j;
        }
    }
}`,
    options: ["001101201301", "01230123", "00112233", "01012123"],
    correctAnswer: "001101201301",
    explanation: "Each i is followed by inner-loop output 01.",
  },
  {
    id: "m8",
    difficulty: "medium",
    code: `#include <iostream>
using namespace std;

int main() {
    int i = 1;
    for (; i < 8; i *= 2) {
        cout << i;
    }
}`,
    options: ["124", "123", "248", "1248"],
    correctAnswer: "124",
    explanation: "i takes values 1, 2, 4; next is 8 and loop stops.",
  },
  {
    id: "m9",
    difficulty: "medium",
    code: `#include <iostream>
using namespace std;

int main() {
    for (int i = 5; i > 0; i -= 2) {
        cout << i;
        if (i == 3) {
            cout << i - 1;
        }
    }
}`,
    options: ["531", "5321", "521", "54321"],
    correctAnswer: "5321",
    explanation: "Loop prints 5, then 3 and extra 2, then 1.",
  },
  {
    id: "m10",
    difficulty: "medium",
    code: `#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 3; i++) {
        for (int j = 1; j <= 3; j++) {
            if (i == j) {
                continue;
            }
            cout << i + j;
        }
    }
}`,
    options: ["343545", "123456", "334455", "345345"],
    correctAnswer: "343545",
    explanation: "Pairs where i == j are skipped; remaining sums are printed.",
  },
  {
    id: "h1",
    difficulty: "hard",
    code: `#include <iostream>
using namespace std;

int main() {
    for (int i = 0; i < 5;) {
        cout << i;
        i += (i % 2 == 0) ? 1 : 2;
    }
}`,
    options: ["01234", "013", "024", "014"],
    correctAnswer: "013",
    explanation: "i changes as 0 -> 1 -> 3 -> 5, so 0,1,3 are printed.",
  },
  {
    id: "h2",
    difficulty: "hard",
    code: `#include <iostream>
using namespace std;

int main() {
    int i = 0;
    while (i < 5) {
        cout << i++;
        if (i == 3) {
            break;
        }
        cout << i;
    }
}`,
    options: ["01234", "01122", "001122", "012"],
    correctAnswer: "01122",
    explanation: "The second print is skipped when i becomes 3 because break runs.",
  },
  {
    id: "h3",
    difficulty: "hard",
    code: `#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 3; i++) {
        for (int j = 1; j <= 3; j++) {
            if (j == 2) {
                continue;
            }
            cout << i * j;
        }
    }
}`,
    options: ["123456789", "132639", "369", "123369"],
    correctAnswer: "132639",
    explanation: "For each i, j = 2 is skipped; products for j = 1 and 3 are printed.",
  },
  {
    id: "h4",
    difficulty: "hard",
    code: `#include <iostream>
using namespace std;

int main() {
    for (int i = 0; i < 4; i++) {
        cout << i;
        if (i % 2 == 0) {
            i++;
        }
    }
}`,
    options: ["0123", "02", "024", "013"],
    correctAnswer: "02",
    explanation: "When i is even (0 and 2), it is incremented inside the loop too.",
  },
  {
    id: "h5",
    difficulty: "hard",
    code: `#include <iostream>
using namespace std;

int main() {
    int i = 1;
    while (i <= 10) {
        if (i % 2 == 0) {
            i++;
            continue;
        }
        cout << i;
        i += 2;
    }
}`,
    options: ["12345678910", "246810", "13579", "111111"],
    correctAnswer: "13579",
    explanation: "Only odd values are printed; loop jumps forward by 2 from odd values.",
  },
  {
    id: "h6",
    difficulty: "hard",
    code: `#include <iostream>
using namespace std;

int main() {
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (i + j == 2) {
                break;
            }
            cout << i << j;
        }
    }
}`,
    options: ["000102", "001122", "000110", "001020"],
    correctAnswer: "000110",
    explanation: "Inner loop breaks as soon as i + j becomes 2.",
  },
  {
    id: "h7",
    difficulty: "hard",
    code: `#include <iostream>
using namespace std;

int main() {
    for (int i = 0; i < 5;) {
        cout << i;
        if (i++ % 2 == 0) {
            ++i;
        }
    }
}`,
    options: ["01234", "013", "024", "0246"],
    correctAnswer: "024",
    explanation: "i advances by 2 each cycle due to post-increment plus conditional pre-increment.",
  },
  {
    id: "h8",
    difficulty: "hard",
    code: `#include <iostream>
using namespace std;

int main() {
    int i = 1;
    while (i <= 3) {
        int j = 1;
        while (j <= 3) {
            if ((i + j) % 2 == 0) {
                j++;
                continue;
            }
            cout << i << j;
            j++;
        }
        i++;
    }
}`,
    options: ["123123", "111222333", "12212332", "132231"],
    correctAnswer: "12212332",
    explanation: "Only pairs with odd i + j are printed.",
  },
  {
    id: "h9",
    difficulty: "hard",
    code: `#include <iostream>
using namespace std;

int main() {
    for (int i = 3; i > 0; --i) {
        for (int j = i; j < 4; ++j) {
            if (j == 3) {
                continue;
            }
            cout << j;
        }
    }
}`,
    options: ["321", "123", "212", "2211"],
    correctAnswer: "212",
    explanation: "j = 3 is always skipped; printed values come from j = 2 and j = 1,2.",
  },
  {
    id: "h10",
    difficulty: "hard",
    code: `#include <iostream>
using namespace std;

int main() {
    int i = 0;
    while (i++ < 4) {
        cout << i;
        if (i == 2) {
            continue;
        }
        cout << i - 1;
    }
}`,
    options: ["01234", "1023243", "12343", "1023432"],
    correctAnswer: "1023243",
    explanation: "Post-increment affects loop condition; when i is 2, second print is skipped.",
  },
];
