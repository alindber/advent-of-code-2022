interface Monkey {
  name: number;
  items: number[];
  divisor: number;
  operation: (old: number) => number;
  test: (newItem: number) => number;
}

export const day11 = () => {
  console.log("****** Day 10 *****************");

  const monkeys: Monkey[] = input.split("\n\n").map((monkeyLine) => {
    const monkeyName = /Monkey (\d+)\:/gm.exec(monkeyLine);
    if (monkeyName) {
      const [_, name] = monkeyName;
      const items = /Starting items: (.*)\n/gm.exec(monkeyLine);
      const operation = /Operation: new = old (.*)\n/gm.exec(monkeyLine);
      const test = /Test: divisible by (\d+)/gm.exec(monkeyLine);
      const throwToTrue = /If true: throw to monkey (\d+)/gm.exec(monkeyLine);
      const throwToFalse = /If false: throw to monkey (\d+)/gm.exec(monkeyLine);
      if (items && operation && test && throwToTrue && throwToFalse) {
        const [__, itemsString] = items;
        const [___, operationString] = operation;
        const [____, testString] = test;
        const [_____, throwToString] = throwToTrue;
        const [______, throwToFalseString] = throwToFalse;
        return {
          name: Number(name),
          items: itemsString.trim().split(", ").map(Number),
          operation: (old: number): number => {
            const [operation, constant] = operationString.trim().split(" ");
            const value = constant === "old" ? old : Number(constant);
            switch (operation) {
              case "+":
                return old + value;
              case "-":
                return old - value;
              case "*":
                return old * value;
              case "/":
                return old / value;
              default:
                throw new Error("Invalid operation");
            }
          },
          divisor: Number(testString),
          test: (newItem: number) => {
            if (newItem % Number(testString) === 0) {
              return Number(throwToString);
            } else {
              return Number(throwToFalseString);
            }
          },
        };
      } else {
        throw new Error("Invalid input - inner");
      }
    } else {
      throw new Error("Invalid input - outer");
    }
  });

  const monkeysPart1 = monkeys.map((m) => ({ ...m, items: [...m.items] }));
  const monkeysPart2 = monkeys.map((m) => ({ ...m, items: [...m.items] }));

  let inspectCounts = getInspectionCounts("part1", monkeysPart1);
  console.log("Part 1: ", getMonkeyBusiness(inspectCounts));
  inspectCounts = getInspectionCounts("part2", monkeysPart2);
  console.log("Part 2: ", getMonkeyBusiness(inspectCounts));
  console.log("*******************************");
};

function getMonkeyBusiness(inspectCounts: Map<number, number>): number {
  const inspectCountsArray = Array.from(inspectCounts.values()).sort(
    (a, b) => a - b
  );
  const topTwo = inspectCountsArray.slice(-2);
  return topTwo[0] * topTwo[1];
}

function getInspectionCounts(
  part: "part1" | "part2",
  monkeys: Monkey[]
): Map<number, number> {
  const inspectCounts: Map<number, number> = new Map();

  const lcm = monkeys
    .map((m) => m.divisor)
    .reduce((a, b) => {
      const gcd = (a: number, b: number): number => {
        if (b === 0) {
          return a;
        }
        return gcd(b, a % b);
      };
      return (a * b) / gcd(a, b);
    }, 1);

  for (let i = 0; i < (part === "part1" ? 20 : 10000); i++) {
    for (let m = 0; m < monkeys.length; m++) {
      while (monkeys[m].items.length > 0) {
        const item = monkeys[m].items.shift();
        if (item) {
          if (inspectCounts.has(m)) {
            const count = inspectCounts.get(m) || 0;
            inspectCounts.set(m, count + 1);
          } else {
            inspectCounts.set(m, 1);
          }
          const newItem = monkeys[m].operation(item);
          const worryLevel =
            part === "part1" ? Math.floor(newItem / 3) : newItem % lcm;
          const nextMonkey = monkeys[m].test(worryLevel);
          monkeys[nextMonkey].items.push(worryLevel);
        }
      }
    }
  }
  return inspectCounts;
}

const smallInput = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`;

const input = `Monkey 0:
Starting items: 75, 75, 98, 97, 79, 97, 64
Operation: new = old * 13
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 7

Monkey 1:
Starting items: 50, 99, 80, 84, 65, 95
Operation: new = old + 2
Test: divisible by 3
  If true: throw to monkey 4
  If false: throw to monkey 5

Monkey 2:
Starting items: 96, 74, 68, 96, 56, 71, 75, 53
Operation: new = old + 1
Test: divisible by 11
  If true: throw to monkey 7
  If false: throw to monkey 3

Monkey 3:
Starting items: 83, 96, 86, 58, 92
Operation: new = old + 8
Test: divisible by 17
  If true: throw to monkey 6
  If false: throw to monkey 1

Monkey 4:
Starting items: 99
Operation: new = old * old
Test: divisible by 5
  If true: throw to monkey 0
  If false: throw to monkey 5

Monkey 5:
Starting items: 60, 54, 83
Operation: new = old + 4
Test: divisible by 2
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 6:
Starting items: 77, 67
Operation: new = old * 17
Test: divisible by 13
  If true: throw to monkey 4
  If false: throw to monkey 1

Monkey 7:
Starting items: 95, 65, 58, 76
Operation: new = old + 5
Test: divisible by 7
  If true: throw to monkey 3
  If false: throw to monkey 6`;
