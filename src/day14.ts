interface Point {
  x: number;
  y: number;
}

interface Line {
  paths: Point[];
}

export const day14 = () => {
  console.log("****** Day 14 *****************");
  const lines: Line[] = input
    .split("\n")
    .map((line) => line.split(" -> "))
    .map((line) => line.map((point) => point.split(",")))
    .map((line) =>
      line.map((point) => ({ x: parseInt(point[0]), y: parseInt(point[1]) }))
    )
    .map((line) => ({ paths: line }));

  const maxY = getMaxY(lines);

  const lines2 = [
    ...lines,
    {
      paths: [
        { x: 315, y: maxY + 2 },
        { x: 750, y: maxY + 2 },
      ],
    },
  ];

  const map = createMap(lines);
  const map2 = createMap(lines2);

  const count = countSand(lines, map);
  const count2 = countSand(lines2, map2, true);

  // printMap(map, lines, hole);
  console.log("Part 1:", count, "units of sand");
  console.log("Part 2:", count2, "units of sand");
  console.log("*******************************");
};

function countSand(lines: Line[], map: string[][], part2 = false) {
  const maxY = getMaxY(lines);

  let endless = false;
  let count = 0;
  while (!endless) {
    let sand: Point = { x: 500, y: 0 };
    let stillFalling = true;

    while (stillFalling) {
      if (!part2 && sand.y >= maxY) {
        endless = true;
        break;
      }

      if (
        map[sand.y + 1] === undefined ||
        map[sand.y + 1][sand.x + 1] === undefined
      ) {
        stillFalling = false;
        break;
      }

      if (
        map[sand.y + 1][sand.x - 1] !== "." &&
        map[sand.y + 1][sand.x + 1] !== "." &&
        map[sand.y + 1][sand.x] !== "."
      ) {
        stillFalling = false;
      }

      if (map[sand.y + 1][sand.x] === ".") {
        sand.y++;
      } else if (map[sand.y + 1][sand.x - 1] === ".") {
        sand.x--;
        sand.y++;
      } else if (map[sand.y + 1][sand.x + 1] === ".") {
        sand.x++;
        sand.y++;
      }
    }

    map[sand.y][sand.x] = "o";

    if (sand.x === 500 && sand.y === 0) {
      if (part2) {
        count++;
      }
      break;
    }

    count++;
  }
  return count;
}

function createMap(lines: Line[]) {
  const hole = { x: 500, y: 0 };

  const maxY = getMaxY(lines);

  const map = Array.from({ length: maxY + 3 }, () =>
    Array.from({ length: 801 }, () => ".")
  );

  map[hole.y][hole.x] = "+";

  lines.forEach((line) => {
    for (let i = 0; i < line.paths.length - 1; i++) {
      const point = line.paths[i];
      const nextPoint = line.paths[i + 1];
      if (point.x === nextPoint.x) {
        const start = point.y < nextPoint.y ? point.y : nextPoint.y;
        const end = point.y > nextPoint.y ? point.y : nextPoint.y;
        for (let j = start; j <= end; j++) {
          map[j][point.x] = "#";
        }
      } else if (point.y === nextPoint.y) {
        const start = point.x < nextPoint.x ? point.x : nextPoint.x;
        const end = point.x > nextPoint.x ? point.x : nextPoint.x;
        for (let j = start; j <= end; j++) {
          map[point.y][j] = "#";
        }
      }
    }
  });

  return map;
}

function getMinY(lines: Line[]) {
  return lines.reduce((min, line) => {
    const minLine = line.paths.reduce((min, point) => {
      return point.y < min ? point.y : min;
    }, 0);
    return minLine < min ? minLine : min;
  }, 0);
}

function getMaxY(lines: Line[]) {
  return lines.reduce((max, line) => {
    const maxLine = line.paths.reduce((max, point) => {
      return point.y > max ? point.y : max;
    }, 0);
    return maxLine > max ? maxLine : max;
  }, 0);
}

function getMinX(lines: Line[]) {
  return lines.reduce((min, line) => {
    const minLine = line.paths.reduce((min, point) => {
      return point.x < min ? point.x : min;
    }, Number.MAX_SAFE_INTEGER);
    return minLine < min ? minLine : min;
  }, Number.MAX_SAFE_INTEGER);
}

function getMaxX(lines: Line[]) {
  return lines.reduce((max, line) => {
    const maxLine = line.paths.reduce((max, point) => {
      return point.x > max ? point.x : max;
    }, 0);
    return maxLine > max ? maxLine : max;
  }, 0);
}

function printMap(map: string[][], lines: Line[], hole: Point) {
  const maxY = getMaxY(lines);
  const maxX = getMaxX(lines);
  const minY = getMinY(lines);
  const minX = getMinX(lines);

  for (let i = minY; i <= maxY; i++) {
    let line = "";
    for (let j = minX; j <= maxX; j++) {
      line += map[i][j];
    }
    console.log(line);
  }
}

const smallInput = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

const input = `521,154 -> 526,154
474,44 -> 474,38 -> 474,44 -> 476,44 -> 476,39 -> 476,44 -> 478,44 -> 478,34 -> 478,44 -> 480,44 -> 480,40 -> 480,44 -> 482,44 -> 482,36 -> 482,44 -> 484,44 -> 484,34 -> 484,44 -> 486,44 -> 486,38 -> 486,44 -> 488,44 -> 488,36 -> 488,44 -> 490,44 -> 490,36 -> 490,44
499,13 -> 499,17 -> 493,17 -> 493,24 -> 507,24 -> 507,17 -> 501,17 -> 501,13
497,80 -> 497,83 -> 489,83 -> 489,87 -> 505,87 -> 505,83 -> 501,83 -> 501,80
471,77 -> 475,77
502,122 -> 502,115 -> 502,122 -> 504,122 -> 504,114 -> 504,122 -> 506,122 -> 506,115 -> 506,122 -> 508,122 -> 508,119 -> 508,122 -> 510,122 -> 510,113 -> 510,122 -> 512,122 -> 512,116 -> 512,122 -> 514,122 -> 514,115 -> 514,122 -> 516,122 -> 516,113 -> 516,122 -> 518,122 -> 518,117 -> 518,122
545,157 -> 545,160 -> 544,160 -> 544,167 -> 556,167 -> 556,160 -> 549,160 -> 549,157
477,73 -> 481,73
532,137 -> 537,137
502,122 -> 502,115 -> 502,122 -> 504,122 -> 504,114 -> 504,122 -> 506,122 -> 506,115 -> 506,122 -> 508,122 -> 508,119 -> 508,122 -> 510,122 -> 510,113 -> 510,122 -> 512,122 -> 512,116 -> 512,122 -> 514,122 -> 514,115 -> 514,122 -> 516,122 -> 516,113 -> 516,122 -> 518,122 -> 518,117 -> 518,122
502,122 -> 502,115 -> 502,122 -> 504,122 -> 504,114 -> 504,122 -> 506,122 -> 506,115 -> 506,122 -> 508,122 -> 508,119 -> 508,122 -> 510,122 -> 510,113 -> 510,122 -> 512,122 -> 512,116 -> 512,122 -> 514,122 -> 514,115 -> 514,122 -> 516,122 -> 516,113 -> 516,122 -> 518,122 -> 518,117 -> 518,122
500,109 -> 500,100 -> 500,109 -> 502,109 -> 502,103 -> 502,109 -> 504,109 -> 504,106 -> 504,109 -> 506,109 -> 506,108 -> 506,109 -> 508,109 -> 508,108 -> 508,109 -> 510,109 -> 510,105 -> 510,109
513,142 -> 513,143 -> 528,143
497,80 -> 497,83 -> 489,83 -> 489,87 -> 505,87 -> 505,83 -> 501,83 -> 501,80
474,44 -> 474,38 -> 474,44 -> 476,44 -> 476,39 -> 476,44 -> 478,44 -> 478,34 -> 478,44 -> 480,44 -> 480,40 -> 480,44 -> 482,44 -> 482,36 -> 482,44 -> 484,44 -> 484,34 -> 484,44 -> 486,44 -> 486,38 -> 486,44 -> 488,44 -> 488,36 -> 488,44 -> 490,44 -> 490,36 -> 490,44
464,57 -> 464,49 -> 464,57 -> 466,57 -> 466,53 -> 466,57 -> 468,57 -> 468,54 -> 468,57 -> 470,57 -> 470,56 -> 470,57 -> 472,57 -> 472,47 -> 472,57 -> 474,57 -> 474,53 -> 474,57 -> 476,57 -> 476,51 -> 476,57 -> 478,57 -> 478,50 -> 478,57 -> 480,57 -> 480,55 -> 480,57
500,109 -> 500,100 -> 500,109 -> 502,109 -> 502,103 -> 502,109 -> 504,109 -> 504,106 -> 504,109 -> 506,109 -> 506,108 -> 506,109 -> 508,109 -> 508,108 -> 508,109 -> 510,109 -> 510,105 -> 510,109
512,128 -> 526,128 -> 526,127
480,71 -> 484,71
474,44 -> 474,38 -> 474,44 -> 476,44 -> 476,39 -> 476,44 -> 478,44 -> 478,34 -> 478,44 -> 480,44 -> 480,40 -> 480,44 -> 482,44 -> 482,36 -> 482,44 -> 484,44 -> 484,34 -> 484,44 -> 486,44 -> 486,38 -> 486,44 -> 488,44 -> 488,36 -> 488,44 -> 490,44 -> 490,36 -> 490,44
497,80 -> 497,83 -> 489,83 -> 489,87 -> 505,87 -> 505,83 -> 501,83 -> 501,80
507,95 -> 507,96 -> 515,96 -> 515,95
502,122 -> 502,115 -> 502,122 -> 504,122 -> 504,114 -> 504,122 -> 506,122 -> 506,115 -> 506,122 -> 508,122 -> 508,119 -> 508,122 -> 510,122 -> 510,113 -> 510,122 -> 512,122 -> 512,116 -> 512,122 -> 514,122 -> 514,115 -> 514,122 -> 516,122 -> 516,113 -> 516,122 -> 518,122 -> 518,117 -> 518,122
514,154 -> 519,154
478,60 -> 478,62 -> 472,62 -> 472,66 -> 484,66 -> 484,62 -> 482,62 -> 482,60
528,134 -> 533,134
474,44 -> 474,38 -> 474,44 -> 476,44 -> 476,39 -> 476,44 -> 478,44 -> 478,34 -> 478,44 -> 480,44 -> 480,40 -> 480,44 -> 482,44 -> 482,36 -> 482,44 -> 484,44 -> 484,34 -> 484,44 -> 486,44 -> 486,38 -> 486,44 -> 488,44 -> 488,36 -> 488,44 -> 490,44 -> 490,36 -> 490,44
502,122 -> 502,115 -> 502,122 -> 504,122 -> 504,114 -> 504,122 -> 506,122 -> 506,115 -> 506,122 -> 508,122 -> 508,119 -> 508,122 -> 510,122 -> 510,113 -> 510,122 -> 512,122 -> 512,116 -> 512,122 -> 514,122 -> 514,115 -> 514,122 -> 516,122 -> 516,113 -> 516,122 -> 518,122 -> 518,117 -> 518,122
502,122 -> 502,115 -> 502,122 -> 504,122 -> 504,114 -> 504,122 -> 506,122 -> 506,115 -> 506,122 -> 508,122 -> 508,119 -> 508,122 -> 510,122 -> 510,113 -> 510,122 -> 512,122 -> 512,116 -> 512,122 -> 514,122 -> 514,115 -> 514,122 -> 516,122 -> 516,113 -> 516,122 -> 518,122 -> 518,117 -> 518,122
535,154 -> 540,154
502,122 -> 502,115 -> 502,122 -> 504,122 -> 504,114 -> 504,122 -> 506,122 -> 506,115 -> 506,122 -> 508,122 -> 508,119 -> 508,122 -> 510,122 -> 510,113 -> 510,122 -> 512,122 -> 512,116 -> 512,122 -> 514,122 -> 514,115 -> 514,122 -> 516,122 -> 516,113 -> 516,122 -> 518,122 -> 518,117 -> 518,122
500,109 -> 500,100 -> 500,109 -> 502,109 -> 502,103 -> 502,109 -> 504,109 -> 504,106 -> 504,109 -> 506,109 -> 506,108 -> 506,109 -> 508,109 -> 508,108 -> 508,109 -> 510,109 -> 510,105 -> 510,109
515,140 -> 520,140
464,57 -> 464,49 -> 464,57 -> 466,57 -> 466,53 -> 466,57 -> 468,57 -> 468,54 -> 468,57 -> 470,57 -> 470,56 -> 470,57 -> 472,57 -> 472,47 -> 472,57 -> 474,57 -> 474,53 -> 474,57 -> 476,57 -> 476,51 -> 476,57 -> 478,57 -> 478,50 -> 478,57 -> 480,57 -> 480,55 -> 480,57
464,57 -> 464,49 -> 464,57 -> 466,57 -> 466,53 -> 466,57 -> 468,57 -> 468,54 -> 468,57 -> 470,57 -> 470,56 -> 470,57 -> 472,57 -> 472,47 -> 472,57 -> 474,57 -> 474,53 -> 474,57 -> 476,57 -> 476,51 -> 476,57 -> 478,57 -> 478,50 -> 478,57 -> 480,57 -> 480,55 -> 480,57
502,122 -> 502,115 -> 502,122 -> 504,122 -> 504,114 -> 504,122 -> 506,122 -> 506,115 -> 506,122 -> 508,122 -> 508,119 -> 508,122 -> 510,122 -> 510,113 -> 510,122 -> 512,122 -> 512,116 -> 512,122 -> 514,122 -> 514,115 -> 514,122 -> 516,122 -> 516,113 -> 516,122 -> 518,122 -> 518,117 -> 518,122
502,122 -> 502,115 -> 502,122 -> 504,122 -> 504,114 -> 504,122 -> 506,122 -> 506,115 -> 506,122 -> 508,122 -> 508,119 -> 508,122 -> 510,122 -> 510,113 -> 510,122 -> 512,122 -> 512,116 -> 512,122 -> 514,122 -> 514,115 -> 514,122 -> 516,122 -> 516,113 -> 516,122 -> 518,122 -> 518,117 -> 518,122
478,60 -> 478,62 -> 472,62 -> 472,66 -> 484,66 -> 484,62 -> 482,62 -> 482,60
502,122 -> 502,115 -> 502,122 -> 504,122 -> 504,114 -> 504,122 -> 506,122 -> 506,115 -> 506,122 -> 508,122 -> 508,119 -> 508,122 -> 510,122 -> 510,113 -> 510,122 -> 512,122 -> 512,116 -> 512,122 -> 514,122 -> 514,115 -> 514,122 -> 516,122 -> 516,113 -> 516,122 -> 518,122 -> 518,117 -> 518,122
497,80 -> 497,83 -> 489,83 -> 489,87 -> 505,87 -> 505,83 -> 501,83 -> 501,80
502,122 -> 502,115 -> 502,122 -> 504,122 -> 504,114 -> 504,122 -> 506,122 -> 506,115 -> 506,122 -> 508,122 -> 508,119 -> 508,122 -> 510,122 -> 510,113 -> 510,122 -> 512,122 -> 512,116 -> 512,122 -> 514,122 -> 514,115 -> 514,122 -> 516,122 -> 516,113 -> 516,122 -> 518,122 -> 518,117 -> 518,122
518,137 -> 523,137
490,31 -> 494,31
502,122 -> 502,115 -> 502,122 -> 504,122 -> 504,114 -> 504,122 -> 506,122 -> 506,115 -> 506,122 -> 508,122 -> 508,119 -> 508,122 -> 510,122 -> 510,113 -> 510,122 -> 512,122 -> 512,116 -> 512,122 -> 514,122 -> 514,115 -> 514,122 -> 516,122 -> 516,113 -> 516,122 -> 518,122 -> 518,117 -> 518,122
526,146 -> 531,146
502,122 -> 502,115 -> 502,122 -> 504,122 -> 504,114 -> 504,122 -> 506,122 -> 506,115 -> 506,122 -> 508,122 -> 508,119 -> 508,122 -> 510,122 -> 510,113 -> 510,122 -> 512,122 -> 512,116 -> 512,122 -> 514,122 -> 514,115 -> 514,122 -> 516,122 -> 516,113 -> 516,122 -> 518,122 -> 518,117 -> 518,122
464,57 -> 464,49 -> 464,57 -> 466,57 -> 466,53 -> 466,57 -> 468,57 -> 468,54 -> 468,57 -> 470,57 -> 470,56 -> 470,57 -> 472,57 -> 472,47 -> 472,57 -> 474,57 -> 474,53 -> 474,57 -> 476,57 -> 476,51 -> 476,57 -> 478,57 -> 478,50 -> 478,57 -> 480,57 -> 480,55 -> 480,57
474,44 -> 474,38 -> 474,44 -> 476,44 -> 476,39 -> 476,44 -> 478,44 -> 478,34 -> 478,44 -> 480,44 -> 480,40 -> 480,44 -> 482,44 -> 482,36 -> 482,44 -> 484,44 -> 484,34 -> 484,44 -> 486,44 -> 486,38 -> 486,44 -> 488,44 -> 488,36 -> 488,44 -> 490,44 -> 490,36 -> 490,44
474,44 -> 474,38 -> 474,44 -> 476,44 -> 476,39 -> 476,44 -> 478,44 -> 478,34 -> 478,44 -> 480,44 -> 480,40 -> 480,44 -> 482,44 -> 482,36 -> 482,44 -> 484,44 -> 484,34 -> 484,44 -> 486,44 -> 486,38 -> 486,44 -> 488,44 -> 488,36 -> 488,44 -> 490,44 -> 490,36 -> 490,44
487,29 -> 491,29
499,13 -> 499,17 -> 493,17 -> 493,24 -> 507,24 -> 507,17 -> 501,17 -> 501,13
464,57 -> 464,49 -> 464,57 -> 466,57 -> 466,53 -> 466,57 -> 468,57 -> 468,54 -> 468,57 -> 470,57 -> 470,56 -> 470,57 -> 472,57 -> 472,47 -> 472,57 -> 474,57 -> 474,53 -> 474,57 -> 476,57 -> 476,51 -> 476,57 -> 478,57 -> 478,50 -> 478,57 -> 480,57 -> 480,55 -> 480,57
478,60 -> 478,62 -> 472,62 -> 472,66 -> 484,66 -> 484,62 -> 482,62 -> 482,60
502,122 -> 502,115 -> 502,122 -> 504,122 -> 504,114 -> 504,122 -> 506,122 -> 506,115 -> 506,122 -> 508,122 -> 508,119 -> 508,122 -> 510,122 -> 510,113 -> 510,122 -> 512,122 -> 512,116 -> 512,122 -> 514,122 -> 514,115 -> 514,122 -> 516,122 -> 516,113 -> 516,122 -> 518,122 -> 518,117 -> 518,122
474,44 -> 474,38 -> 474,44 -> 476,44 -> 476,39 -> 476,44 -> 478,44 -> 478,34 -> 478,44 -> 480,44 -> 480,40 -> 480,44 -> 482,44 -> 482,36 -> 482,44 -> 484,44 -> 484,34 -> 484,44 -> 486,44 -> 486,38 -> 486,44 -> 488,44 -> 488,36 -> 488,44 -> 490,44 -> 490,36 -> 490,44
534,150 -> 539,150
536,140 -> 541,140
474,44 -> 474,38 -> 474,44 -> 476,44 -> 476,39 -> 476,44 -> 478,44 -> 478,34 -> 478,44 -> 480,44 -> 480,40 -> 480,44 -> 482,44 -> 482,36 -> 482,44 -> 484,44 -> 484,34 -> 484,44 -> 486,44 -> 486,38 -> 486,44 -> 488,44 -> 488,36 -> 488,44 -> 490,44 -> 490,36 -> 490,44
478,60 -> 478,62 -> 472,62 -> 472,66 -> 484,66 -> 484,62 -> 482,62 -> 482,60
464,57 -> 464,49 -> 464,57 -> 466,57 -> 466,53 -> 466,57 -> 468,57 -> 468,54 -> 468,57 -> 470,57 -> 470,56 -> 470,57 -> 472,57 -> 472,47 -> 472,57 -> 474,57 -> 474,53 -> 474,57 -> 476,57 -> 476,51 -> 476,57 -> 478,57 -> 478,50 -> 478,57 -> 480,57 -> 480,55 -> 480,57
528,154 -> 533,154
474,44 -> 474,38 -> 474,44 -> 476,44 -> 476,39 -> 476,44 -> 478,44 -> 478,34 -> 478,44 -> 480,44 -> 480,40 -> 480,44 -> 482,44 -> 482,36 -> 482,44 -> 484,44 -> 484,34 -> 484,44 -> 486,44 -> 486,38 -> 486,44 -> 488,44 -> 488,36 -> 488,44 -> 490,44 -> 490,36 -> 490,44
500,109 -> 500,100 -> 500,109 -> 502,109 -> 502,103 -> 502,109 -> 504,109 -> 504,106 -> 504,109 -> 506,109 -> 506,108 -> 506,109 -> 508,109 -> 508,108 -> 508,109 -> 510,109 -> 510,105 -> 510,109
464,57 -> 464,49 -> 464,57 -> 466,57 -> 466,53 -> 466,57 -> 468,57 -> 468,54 -> 468,57 -> 470,57 -> 470,56 -> 470,57 -> 472,57 -> 472,47 -> 472,57 -> 474,57 -> 474,53 -> 474,57 -> 476,57 -> 476,51 -> 476,57 -> 478,57 -> 478,50 -> 478,57 -> 480,57 -> 480,55 -> 480,57
502,122 -> 502,115 -> 502,122 -> 504,122 -> 504,114 -> 504,122 -> 506,122 -> 506,115 -> 506,122 -> 508,122 -> 508,119 -> 508,122 -> 510,122 -> 510,113 -> 510,122 -> 512,122 -> 512,116 -> 512,122 -> 514,122 -> 514,115 -> 514,122 -> 516,122 -> 516,113 -> 516,122 -> 518,122 -> 518,117 -> 518,122
484,31 -> 488,31
464,57 -> 464,49 -> 464,57 -> 466,57 -> 466,53 -> 466,57 -> 468,57 -> 468,54 -> 468,57 -> 470,57 -> 470,56 -> 470,57 -> 472,57 -> 472,47 -> 472,57 -> 474,57 -> 474,53 -> 474,57 -> 476,57 -> 476,51 -> 476,57 -> 478,57 -> 478,50 -> 478,57 -> 480,57 -> 480,55 -> 480,57
507,95 -> 507,96 -> 515,96 -> 515,95
545,157 -> 545,160 -> 544,160 -> 544,167 -> 556,167 -> 556,160 -> 549,160 -> 549,157
512,128 -> 526,128 -> 526,127
502,122 -> 502,115 -> 502,122 -> 504,122 -> 504,114 -> 504,122 -> 506,122 -> 506,115 -> 506,122 -> 508,122 -> 508,119 -> 508,122 -> 510,122 -> 510,113 -> 510,122 -> 512,122 -> 512,116 -> 512,122 -> 514,122 -> 514,115 -> 514,122 -> 516,122 -> 516,113 -> 516,122 -> 518,122 -> 518,117 -> 518,122
502,122 -> 502,115 -> 502,122 -> 504,122 -> 504,114 -> 504,122 -> 506,122 -> 506,115 -> 506,122 -> 508,122 -> 508,119 -> 508,122 -> 510,122 -> 510,113 -> 510,122 -> 512,122 -> 512,116 -> 512,122 -> 514,122 -> 514,115 -> 514,122 -> 516,122 -> 516,113 -> 516,122 -> 518,122 -> 518,117 -> 518,122
464,57 -> 464,49 -> 464,57 -> 466,57 -> 466,53 -> 466,57 -> 468,57 -> 468,54 -> 468,57 -> 470,57 -> 470,56 -> 470,57 -> 472,57 -> 472,47 -> 472,57 -> 474,57 -> 474,53 -> 474,57 -> 476,57 -> 476,51 -> 476,57 -> 478,57 -> 478,50 -> 478,57 -> 480,57 -> 480,55 -> 480,57
464,57 -> 464,49 -> 464,57 -> 466,57 -> 466,53 -> 466,57 -> 468,57 -> 468,54 -> 468,57 -> 470,57 -> 470,56 -> 470,57 -> 472,57 -> 472,47 -> 472,57 -> 474,57 -> 474,53 -> 474,57 -> 476,57 -> 476,51 -> 476,57 -> 478,57 -> 478,50 -> 478,57 -> 480,57 -> 480,55 -> 480,57
464,57 -> 464,49 -> 464,57 -> 466,57 -> 466,53 -> 466,57 -> 468,57 -> 468,54 -> 468,57 -> 470,57 -> 470,56 -> 470,57 -> 472,57 -> 472,47 -> 472,57 -> 474,57 -> 474,53 -> 474,57 -> 476,57 -> 476,51 -> 476,57 -> 478,57 -> 478,50 -> 478,57 -> 480,57 -> 480,55 -> 480,57
500,109 -> 500,100 -> 500,109 -> 502,109 -> 502,103 -> 502,109 -> 504,109 -> 504,106 -> 504,109 -> 506,109 -> 506,108 -> 506,109 -> 508,109 -> 508,108 -> 508,109 -> 510,109 -> 510,105 -> 510,109
545,157 -> 545,160 -> 544,160 -> 544,167 -> 556,167 -> 556,160 -> 549,160 -> 549,157
502,122 -> 502,115 -> 502,122 -> 504,122 -> 504,114 -> 504,122 -> 506,122 -> 506,115 -> 506,122 -> 508,122 -> 508,119 -> 508,122 -> 510,122 -> 510,113 -> 510,122 -> 512,122 -> 512,116 -> 512,122 -> 514,122 -> 514,115 -> 514,122 -> 516,122 -> 516,113 -> 516,122 -> 518,122 -> 518,117 -> 518,122
499,13 -> 499,17 -> 493,17 -> 493,24 -> 507,24 -> 507,17 -> 501,17 -> 501,13
525,137 -> 530,137
478,60 -> 478,62 -> 472,62 -> 472,66 -> 484,66 -> 484,62 -> 482,62 -> 482,60
497,80 -> 497,83 -> 489,83 -> 489,87 -> 505,87 -> 505,83 -> 501,83 -> 501,80
464,57 -> 464,49 -> 464,57 -> 466,57 -> 466,53 -> 466,57 -> 468,57 -> 468,54 -> 468,57 -> 470,57 -> 470,56 -> 470,57 -> 472,57 -> 472,47 -> 472,57 -> 474,57 -> 474,53 -> 474,57 -> 476,57 -> 476,51 -> 476,57 -> 478,57 -> 478,50 -> 478,57 -> 480,57 -> 480,55 -> 480,57
464,57 -> 464,49 -> 464,57 -> 466,57 -> 466,53 -> 466,57 -> 468,57 -> 468,54 -> 468,57 -> 470,57 -> 470,56 -> 470,57 -> 472,57 -> 472,47 -> 472,57 -> 474,57 -> 474,53 -> 474,57 -> 476,57 -> 476,51 -> 476,57 -> 478,57 -> 478,50 -> 478,57 -> 480,57 -> 480,55 -> 480,57
502,122 -> 502,115 -> 502,122 -> 504,122 -> 504,114 -> 504,122 -> 506,122 -> 506,115 -> 506,122 -> 508,122 -> 508,119 -> 508,122 -> 510,122 -> 510,113 -> 510,122 -> 512,122 -> 512,116 -> 512,122 -> 514,122 -> 514,115 -> 514,122 -> 516,122 -> 516,113 -> 516,122 -> 518,122 -> 518,117 -> 518,122
464,57 -> 464,49 -> 464,57 -> 466,57 -> 466,53 -> 466,57 -> 468,57 -> 468,54 -> 468,57 -> 470,57 -> 470,56 -> 470,57 -> 472,57 -> 472,47 -> 472,57 -> 474,57 -> 474,53 -> 474,57 -> 476,57 -> 476,51 -> 476,57 -> 478,57 -> 478,50 -> 478,57 -> 480,57 -> 480,55 -> 480,57
520,150 -> 525,150
502,122 -> 502,115 -> 502,122 -> 504,122 -> 504,114 -> 504,122 -> 506,122 -> 506,115 -> 506,122 -> 508,122 -> 508,119 -> 508,122 -> 510,122 -> 510,113 -> 510,122 -> 512,122 -> 512,116 -> 512,122 -> 514,122 -> 514,115 -> 514,122 -> 516,122 -> 516,113 -> 516,122 -> 518,122 -> 518,117 -> 518,122
486,71 -> 490,71
474,44 -> 474,38 -> 474,44 -> 476,44 -> 476,39 -> 476,44 -> 478,44 -> 478,34 -> 478,44 -> 480,44 -> 480,40 -> 480,44 -> 482,44 -> 482,36 -> 482,44 -> 484,44 -> 484,34 -> 484,44 -> 486,44 -> 486,38 -> 486,44 -> 488,44 -> 488,36 -> 488,44 -> 490,44 -> 490,36 -> 490,44
502,122 -> 502,115 -> 502,122 -> 504,122 -> 504,114 -> 504,122 -> 506,122 -> 506,115 -> 506,122 -> 508,122 -> 508,119 -> 508,122 -> 510,122 -> 510,113 -> 510,122 -> 512,122 -> 512,116 -> 512,122 -> 514,122 -> 514,115 -> 514,122 -> 516,122 -> 516,113 -> 516,122 -> 518,122 -> 518,117 -> 518,122
474,44 -> 474,38 -> 474,44 -> 476,44 -> 476,39 -> 476,44 -> 478,44 -> 478,34 -> 478,44 -> 480,44 -> 480,40 -> 480,44 -> 482,44 -> 482,36 -> 482,44 -> 484,44 -> 484,34 -> 484,44 -> 486,44 -> 486,38 -> 486,44 -> 488,44 -> 488,36 -> 488,44 -> 490,44 -> 490,36 -> 490,44
517,152 -> 522,152
489,73 -> 493,73
474,44 -> 474,38 -> 474,44 -> 476,44 -> 476,39 -> 476,44 -> 478,44 -> 478,34 -> 478,44 -> 480,44 -> 480,40 -> 480,44 -> 482,44 -> 482,36 -> 482,44 -> 484,44 -> 484,34 -> 484,44 -> 486,44 -> 486,38 -> 486,44 -> 488,44 -> 488,36 -> 488,44 -> 490,44 -> 490,36 -> 490,44
464,57 -> 464,49 -> 464,57 -> 466,57 -> 466,53 -> 466,57 -> 468,57 -> 468,54 -> 468,57 -> 470,57 -> 470,56 -> 470,57 -> 472,57 -> 472,47 -> 472,57 -> 474,57 -> 474,53 -> 474,57 -> 476,57 -> 476,51 -> 476,57 -> 478,57 -> 478,50 -> 478,57 -> 480,57 -> 480,55 -> 480,57
474,44 -> 474,38 -> 474,44 -> 476,44 -> 476,39 -> 476,44 -> 478,44 -> 478,34 -> 478,44 -> 480,44 -> 480,40 -> 480,44 -> 482,44 -> 482,36 -> 482,44 -> 484,44 -> 484,34 -> 484,44 -> 486,44 -> 486,38 -> 486,44 -> 488,44 -> 488,36 -> 488,44 -> 490,44 -> 490,36 -> 490,44
530,148 -> 535,148
500,109 -> 500,100 -> 500,109 -> 502,109 -> 502,103 -> 502,109 -> 504,109 -> 504,106 -> 504,109 -> 506,109 -> 506,108 -> 506,109 -> 508,109 -> 508,108 -> 508,109 -> 510,109 -> 510,105 -> 510,109
502,122 -> 502,115 -> 502,122 -> 504,122 -> 504,114 -> 504,122 -> 506,122 -> 506,115 -> 506,122 -> 508,122 -> 508,119 -> 508,122 -> 510,122 -> 510,113 -> 510,122 -> 512,122 -> 512,116 -> 512,122 -> 514,122 -> 514,115 -> 514,122 -> 516,122 -> 516,113 -> 516,122 -> 518,122 -> 518,117 -> 518,122
474,44 -> 474,38 -> 474,44 -> 476,44 -> 476,39 -> 476,44 -> 478,44 -> 478,34 -> 478,44 -> 480,44 -> 480,40 -> 480,44 -> 482,44 -> 482,36 -> 482,44 -> 484,44 -> 484,34 -> 484,44 -> 486,44 -> 486,38 -> 486,44 -> 488,44 -> 488,36 -> 488,44 -> 490,44 -> 490,36 -> 490,44
538,152 -> 543,152
464,57 -> 464,49 -> 464,57 -> 466,57 -> 466,53 -> 466,57 -> 468,57 -> 468,54 -> 468,57 -> 470,57 -> 470,56 -> 470,57 -> 472,57 -> 472,47 -> 472,57 -> 474,57 -> 474,53 -> 474,57 -> 476,57 -> 476,51 -> 476,57 -> 478,57 -> 478,50 -> 478,57 -> 480,57 -> 480,55 -> 480,57
502,122 -> 502,115 -> 502,122 -> 504,122 -> 504,114 -> 504,122 -> 506,122 -> 506,115 -> 506,122 -> 508,122 -> 508,119 -> 508,122 -> 510,122 -> 510,113 -> 510,122 -> 512,122 -> 512,116 -> 512,122 -> 514,122 -> 514,115 -> 514,122 -> 516,122 -> 516,113 -> 516,122 -> 518,122 -> 518,117 -> 518,122
464,57 -> 464,49 -> 464,57 -> 466,57 -> 466,53 -> 466,57 -> 468,57 -> 468,54 -> 468,57 -> 470,57 -> 470,56 -> 470,57 -> 472,57 -> 472,47 -> 472,57 -> 474,57 -> 474,53 -> 474,57 -> 476,57 -> 476,51 -> 476,57 -> 478,57 -> 478,50 -> 478,57 -> 480,57 -> 480,55 -> 480,57
474,44 -> 474,38 -> 474,44 -> 476,44 -> 476,39 -> 476,44 -> 478,44 -> 478,34 -> 478,44 -> 480,44 -> 480,40 -> 480,44 -> 482,44 -> 482,36 -> 482,44 -> 484,44 -> 484,34 -> 484,44 -> 486,44 -> 486,38 -> 486,44 -> 488,44 -> 488,36 -> 488,44 -> 490,44 -> 490,36 -> 490,44
499,13 -> 499,17 -> 493,17 -> 493,24 -> 507,24 -> 507,17 -> 501,17 -> 501,13
513,142 -> 513,143 -> 528,143
464,57 -> 464,49 -> 464,57 -> 466,57 -> 466,53 -> 466,57 -> 468,57 -> 468,54 -> 468,57 -> 470,57 -> 470,56 -> 470,57 -> 472,57 -> 472,47 -> 472,57 -> 474,57 -> 474,53 -> 474,57 -> 476,57 -> 476,51 -> 476,57 -> 478,57 -> 478,50 -> 478,57 -> 480,57 -> 480,55 -> 480,57
524,131 -> 529,131
500,109 -> 500,100 -> 500,109 -> 502,109 -> 502,103 -> 502,109 -> 504,109 -> 504,106 -> 504,109 -> 506,109 -> 506,108 -> 506,109 -> 508,109 -> 508,108 -> 508,109 -> 510,109 -> 510,105 -> 510,109
483,69 -> 487,69
474,75 -> 478,75
493,29 -> 497,29
527,150 -> 532,150
545,157 -> 545,160 -> 544,160 -> 544,167 -> 556,167 -> 556,160 -> 549,160 -> 549,157
499,13 -> 499,17 -> 493,17 -> 493,24 -> 507,24 -> 507,17 -> 501,17 -> 501,13
474,44 -> 474,38 -> 474,44 -> 476,44 -> 476,39 -> 476,44 -> 478,44 -> 478,34 -> 478,44 -> 480,44 -> 480,40 -> 480,44 -> 482,44 -> 482,36 -> 482,44 -> 484,44 -> 484,34 -> 484,44 -> 486,44 -> 486,38 -> 486,44 -> 488,44 -> 488,36 -> 488,44 -> 490,44 -> 490,36 -> 490,44
500,109 -> 500,100 -> 500,109 -> 502,109 -> 502,103 -> 502,109 -> 504,109 -> 504,106 -> 504,109 -> 506,109 -> 506,108 -> 506,109 -> 508,109 -> 508,108 -> 508,109 -> 510,109 -> 510,105 -> 510,109
500,109 -> 500,100 -> 500,109 -> 502,109 -> 502,103 -> 502,109 -> 504,109 -> 504,106 -> 504,109 -> 506,109 -> 506,108 -> 506,109 -> 508,109 -> 508,108 -> 508,109 -> 510,109 -> 510,105 -> 510,109
499,13 -> 499,17 -> 493,17 -> 493,24 -> 507,24 -> 507,17 -> 501,17 -> 501,13
489,77 -> 493,77
524,152 -> 529,152
496,89 -> 496,90 -> 509,90
500,109 -> 500,100 -> 500,109 -> 502,109 -> 502,103 -> 502,109 -> 504,109 -> 504,106 -> 504,109 -> 506,109 -> 506,108 -> 506,109 -> 508,109 -> 508,108 -> 508,109 -> 510,109 -> 510,105 -> 510,109
521,134 -> 526,134
464,57 -> 464,49 -> 464,57 -> 466,57 -> 466,53 -> 466,57 -> 468,57 -> 468,54 -> 468,57 -> 470,57 -> 470,56 -> 470,57 -> 472,57 -> 472,47 -> 472,57 -> 474,57 -> 474,53 -> 474,57 -> 476,57 -> 476,51 -> 476,57 -> 478,57 -> 478,50 -> 478,57 -> 480,57 -> 480,55 -> 480,57
496,31 -> 500,31
500,109 -> 500,100 -> 500,109 -> 502,109 -> 502,103 -> 502,109 -> 504,109 -> 504,106 -> 504,109 -> 506,109 -> 506,108 -> 506,109 -> 508,109 -> 508,108 -> 508,109 -> 510,109 -> 510,105 -> 510,109
490,27 -> 494,27
474,44 -> 474,38 -> 474,44 -> 476,44 -> 476,39 -> 476,44 -> 478,44 -> 478,34 -> 478,44 -> 480,44 -> 480,40 -> 480,44 -> 482,44 -> 482,36 -> 482,44 -> 484,44 -> 484,34 -> 484,44 -> 486,44 -> 486,38 -> 486,44 -> 488,44 -> 488,36 -> 488,44 -> 490,44 -> 490,36 -> 490,44
474,44 -> 474,38 -> 474,44 -> 476,44 -> 476,39 -> 476,44 -> 478,44 -> 478,34 -> 478,44 -> 480,44 -> 480,40 -> 480,44 -> 482,44 -> 482,36 -> 482,44 -> 484,44 -> 484,34 -> 484,44 -> 486,44 -> 486,38 -> 486,44 -> 488,44 -> 488,36 -> 488,44 -> 490,44 -> 490,36 -> 490,44
478,60 -> 478,62 -> 472,62 -> 472,66 -> 484,66 -> 484,62 -> 482,62 -> 482,60
464,57 -> 464,49 -> 464,57 -> 466,57 -> 466,53 -> 466,57 -> 468,57 -> 468,54 -> 468,57 -> 470,57 -> 470,56 -> 470,57 -> 472,57 -> 472,47 -> 472,57 -> 474,57 -> 474,53 -> 474,57 -> 476,57 -> 476,51 -> 476,57 -> 478,57 -> 478,50 -> 478,57 -> 480,57 -> 480,55 -> 480,57
502,122 -> 502,115 -> 502,122 -> 504,122 -> 504,114 -> 504,122 -> 506,122 -> 506,115 -> 506,122 -> 508,122 -> 508,119 -> 508,122 -> 510,122 -> 510,113 -> 510,122 -> 512,122 -> 512,116 -> 512,122 -> 514,122 -> 514,115 -> 514,122 -> 516,122 -> 516,113 -> 516,122 -> 518,122 -> 518,117 -> 518,122
474,44 -> 474,38 -> 474,44 -> 476,44 -> 476,39 -> 476,44 -> 478,44 -> 478,34 -> 478,44 -> 480,44 -> 480,40 -> 480,44 -> 482,44 -> 482,36 -> 482,44 -> 484,44 -> 484,34 -> 484,44 -> 486,44 -> 486,38 -> 486,44 -> 488,44 -> 488,36 -> 488,44 -> 490,44 -> 490,36 -> 490,44
545,157 -> 545,160 -> 544,160 -> 544,167 -> 556,167 -> 556,160 -> 549,160 -> 549,157
529,140 -> 534,140
545,157 -> 545,160 -> 544,160 -> 544,167 -> 556,167 -> 556,160 -> 549,160 -> 549,157
500,109 -> 500,100 -> 500,109 -> 502,109 -> 502,103 -> 502,109 -> 504,109 -> 504,106 -> 504,109 -> 506,109 -> 506,108 -> 506,109 -> 508,109 -> 508,108 -> 508,109 -> 510,109 -> 510,105 -> 510,109
483,73 -> 487,73
523,148 -> 528,148
542,154 -> 547,154
500,109 -> 500,100 -> 500,109 -> 502,109 -> 502,103 -> 502,109 -> 504,109 -> 504,106 -> 504,109 -> 506,109 -> 506,108 -> 506,109 -> 508,109 -> 508,108 -> 508,109 -> 510,109 -> 510,105 -> 510,109
480,75 -> 484,75
495,77 -> 499,77
478,60 -> 478,62 -> 472,62 -> 472,66 -> 484,66 -> 484,62 -> 482,62 -> 482,60
474,44 -> 474,38 -> 474,44 -> 476,44 -> 476,39 -> 476,44 -> 478,44 -> 478,34 -> 478,44 -> 480,44 -> 480,40 -> 480,44 -> 482,44 -> 482,36 -> 482,44 -> 484,44 -> 484,34 -> 484,44 -> 486,44 -> 486,38 -> 486,44 -> 488,44 -> 488,36 -> 488,44 -> 490,44 -> 490,36 -> 490,44
522,140 -> 527,140
474,44 -> 474,38 -> 474,44 -> 476,44 -> 476,39 -> 476,44 -> 478,44 -> 478,34 -> 478,44 -> 480,44 -> 480,40 -> 480,44 -> 482,44 -> 482,36 -> 482,44 -> 484,44 -> 484,34 -> 484,44 -> 486,44 -> 486,38 -> 486,44 -> 488,44 -> 488,36 -> 488,44 -> 490,44 -> 490,36 -> 490,44
500,109 -> 500,100 -> 500,109 -> 502,109 -> 502,103 -> 502,109 -> 504,109 -> 504,106 -> 504,109 -> 506,109 -> 506,108 -> 506,109 -> 508,109 -> 508,108 -> 508,109 -> 510,109 -> 510,105 -> 510,109
496,89 -> 496,90 -> 509,90
492,75 -> 496,75
499,13 -> 499,17 -> 493,17 -> 493,24 -> 507,24 -> 507,17 -> 501,17 -> 501,13
464,57 -> 464,49 -> 464,57 -> 466,57 -> 466,53 -> 466,57 -> 468,57 -> 468,54 -> 468,57 -> 470,57 -> 470,56 -> 470,57 -> 472,57 -> 472,47 -> 472,57 -> 474,57 -> 474,53 -> 474,57 -> 476,57 -> 476,51 -> 476,57 -> 478,57 -> 478,50 -> 478,57 -> 480,57 -> 480,55 -> 480,57
507,95 -> 507,96 -> 515,96 -> 515,95
500,109 -> 500,100 -> 500,109 -> 502,109 -> 502,103 -> 502,109 -> 504,109 -> 504,106 -> 504,109 -> 506,109 -> 506,108 -> 506,109 -> 508,109 -> 508,108 -> 508,109 -> 510,109 -> 510,105 -> 510,109
464,57 -> 464,49 -> 464,57 -> 466,57 -> 466,53 -> 466,57 -> 468,57 -> 468,54 -> 468,57 -> 470,57 -> 470,56 -> 470,57 -> 472,57 -> 472,47 -> 472,57 -> 474,57 -> 474,53 -> 474,57 -> 476,57 -> 476,51 -> 476,57 -> 478,57 -> 478,50 -> 478,57 -> 480,57 -> 480,55 -> 480,57
464,57 -> 464,49 -> 464,57 -> 466,57 -> 466,53 -> 466,57 -> 468,57 -> 468,54 -> 468,57 -> 470,57 -> 470,56 -> 470,57 -> 472,57 -> 472,47 -> 472,57 -> 474,57 -> 474,53 -> 474,57 -> 476,57 -> 476,51 -> 476,57 -> 478,57 -> 478,50 -> 478,57 -> 480,57 -> 480,55 -> 480,57
497,80 -> 497,83 -> 489,83 -> 489,87 -> 505,87 -> 505,83 -> 501,83 -> 501,80
477,77 -> 481,77
497,80 -> 497,83 -> 489,83 -> 489,87 -> 505,87 -> 505,83 -> 501,83 -> 501,80
486,75 -> 490,75
502,122 -> 502,115 -> 502,122 -> 504,122 -> 504,114 -> 504,122 -> 506,122 -> 506,115 -> 506,122 -> 508,122 -> 508,119 -> 508,122 -> 510,122 -> 510,113 -> 510,122 -> 512,122 -> 512,116 -> 512,122 -> 514,122 -> 514,115 -> 514,122 -> 516,122 -> 516,113 -> 516,122 -> 518,122 -> 518,117 -> 518,122
464,57 -> 464,49 -> 464,57 -> 466,57 -> 466,53 -> 466,57 -> 468,57 -> 468,54 -> 468,57 -> 470,57 -> 470,56 -> 470,57 -> 472,57 -> 472,47 -> 472,57 -> 474,57 -> 474,53 -> 474,57 -> 476,57 -> 476,51 -> 476,57 -> 478,57 -> 478,50 -> 478,57 -> 480,57 -> 480,55 -> 480,57
474,44 -> 474,38 -> 474,44 -> 476,44 -> 476,39 -> 476,44 -> 478,44 -> 478,34 -> 478,44 -> 480,44 -> 480,40 -> 480,44 -> 482,44 -> 482,36 -> 482,44 -> 484,44 -> 484,34 -> 484,44 -> 486,44 -> 486,38 -> 486,44 -> 488,44 -> 488,36 -> 488,44 -> 490,44 -> 490,36 -> 490,44
502,122 -> 502,115 -> 502,122 -> 504,122 -> 504,114 -> 504,122 -> 506,122 -> 506,115 -> 506,122 -> 508,122 -> 508,119 -> 508,122 -> 510,122 -> 510,113 -> 510,122 -> 512,122 -> 512,116 -> 512,122 -> 514,122 -> 514,115 -> 514,122 -> 516,122 -> 516,113 -> 516,122 -> 518,122 -> 518,117 -> 518,122
474,44 -> 474,38 -> 474,44 -> 476,44 -> 476,39 -> 476,44 -> 478,44 -> 478,34 -> 478,44 -> 480,44 -> 480,40 -> 480,44 -> 482,44 -> 482,36 -> 482,44 -> 484,44 -> 484,34 -> 484,44 -> 486,44 -> 486,38 -> 486,44 -> 488,44 -> 488,36 -> 488,44 -> 490,44 -> 490,36 -> 490,44
474,44 -> 474,38 -> 474,44 -> 476,44 -> 476,39 -> 476,44 -> 478,44 -> 478,34 -> 478,44 -> 480,44 -> 480,40 -> 480,44 -> 482,44 -> 482,36 -> 482,44 -> 484,44 -> 484,34 -> 484,44 -> 486,44 -> 486,38 -> 486,44 -> 488,44 -> 488,36 -> 488,44 -> 490,44 -> 490,36 -> 490,44
531,152 -> 536,152
545,157 -> 545,160 -> 544,160 -> 544,167 -> 556,167 -> 556,160 -> 549,160 -> 549,157
474,44 -> 474,38 -> 474,44 -> 476,44 -> 476,39 -> 476,44 -> 478,44 -> 478,34 -> 478,44 -> 480,44 -> 480,40 -> 480,44 -> 482,44 -> 482,36 -> 482,44 -> 484,44 -> 484,34 -> 484,44 -> 486,44 -> 486,38 -> 486,44 -> 488,44 -> 488,36 -> 488,44 -> 490,44 -> 490,36 -> 490,44
500,109 -> 500,100 -> 500,109 -> 502,109 -> 502,103 -> 502,109 -> 504,109 -> 504,106 -> 504,109 -> 506,109 -> 506,108 -> 506,109 -> 508,109 -> 508,108 -> 508,109 -> 510,109 -> 510,105 -> 510,109
483,77 -> 487,77
464,57 -> 464,49 -> 464,57 -> 466,57 -> 466,53 -> 466,57 -> 468,57 -> 468,54 -> 468,57 -> 470,57 -> 470,56 -> 470,57 -> 472,57 -> 472,47 -> 472,57 -> 474,57 -> 474,53 -> 474,57 -> 476,57 -> 476,51 -> 476,57 -> 478,57 -> 478,50 -> 478,57 -> 480,57 -> 480,55 -> 480,57
474,44 -> 474,38 -> 474,44 -> 476,44 -> 476,39 -> 476,44 -> 478,44 -> 478,34 -> 478,44 -> 480,44 -> 480,40 -> 480,44 -> 482,44 -> 482,36 -> 482,44 -> 484,44 -> 484,34 -> 484,44 -> 486,44 -> 486,38 -> 486,44 -> 488,44 -> 488,36 -> 488,44 -> 490,44 -> 490,36 -> 490,44
464,57 -> 464,49 -> 464,57 -> 466,57 -> 466,53 -> 466,57 -> 468,57 -> 468,54 -> 468,57 -> 470,57 -> 470,56 -> 470,57 -> 472,57 -> 472,47 -> 472,57 -> 474,57 -> 474,53 -> 474,57 -> 476,57 -> 476,51 -> 476,57 -> 478,57 -> 478,50 -> 478,57 -> 480,57 -> 480,55 -> 480,57
500,109 -> 500,100 -> 500,109 -> 502,109 -> 502,103 -> 502,109 -> 504,109 -> 504,106 -> 504,109 -> 506,109 -> 506,108 -> 506,109 -> 508,109 -> 508,108 -> 508,109 -> 510,109 -> 510,105 -> 510,109`;
