import { stdout } from "process";

export const day10 = () => {
  console.log("****** Day 10 *****************");

  let x = 1;
  const cycleValues = [];
  let cycleCount = 0;

  const instructions = largeInput.split("\n").map((line) => {
    let cycleCount = 0;
    const [op, arg] = line.split(" ");
    if (op === "addx") {
      cycleCount = 2;
    } else if (op === "noop") {
      cycleCount = 1;
    }
    return { op, arg: parseInt(arg), cycleCount };
  });

  for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i];
    for (let j = 0; j < instruction.cycleCount; j++) {
      cycleCount++;
      cycleValues.push(x);
    }
    if (instruction.op === "addx") {
      x += instruction.arg;
    }
  }

  const twentyCycle = cycleValues[19] * 20;
  const sixtyCycle = cycleValues[59] * 60;
  const hundredCycle = cycleValues[99] * 100;
  const oneFortyCycle = cycleValues[139] * 140;
  const oneEightyCycle = cycleValues[179] * 180;
  const twoTwentyCycle = cycleValues[219] * 220;

  console.log(
    "Part 1 - sum of 20th, 60th, 100th, 140th, 180th, 220th: ",
    twentyCycle +
      sixtyCycle +
      hundredCycle +
      oneFortyCycle +
      oneEightyCycle +
      twoTwentyCycle
  );

  console.log("Part 2 - output:");
  let cycle = 0;
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 40; j++, cycle++) {
      if (cycleValues[cycle] >= j - 1 && cycleValues[cycle] <= j + 1) {
        stdout.write("#");
      } else {
        stdout.write(".");
      }
    }
    console.log("");
  }

  console.log("*******************************");
};

const input = `noop
addx 3
addx -5`;

const mediumInput = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;

const largeInput = `addx 1
addx 4
noop
noop
noop
addx 5
addx 3
noop
addx 2
noop
noop
noop
noop
addx 3
addx 5
addx 2
addx 1
noop
addx 5
addx -1
addx 5
noop
addx 3
noop
addx -40
noop
addx 38
addx -31
addx 3
noop
addx 2
addx -7
addx 8
addx 2
addx 5
addx 2
addx 3
addx -2
noop
noop
noop
addx 5
addx 2
noop
addx 3
addx 2
noop
addx 3
addx -36
noop
noop
addx 5
noop
noop
addx 8
addx -5
addx 5
addx 2
addx -15
addx 16
addx 4
noop
addx 1
noop
noop
addx 4
addx 5
addx -30
addx 35
addx -1
addx 2
addx -36
addx 5
noop
noop
addx -2
addx 5
addx 2
addx 3
noop
addx 2
noop
noop
addx 5
noop
addx 14
addx -13
addx 5
addx -14
addx 18
addx 3
addx 2
addx -2
addx 5
addx -40
noop
addx 32
addx -25
addx 3
noop
addx 2
addx 3
addx -2
addx 2
addx 2
noop
addx 3
addx 5
addx 2
addx 9
addx -36
addx 30
addx 5
addx 2
addx -25
addx 26
addx -38
addx 10
addx -3
noop
noop
addx 22
addx -16
addx -1
addx 5
addx 3
noop
addx 2
addx -20
addx 21
addx 3
addx 2
addx -24
addx 28
noop
addx 5
addx 3
noop
addx -24
noop`;
