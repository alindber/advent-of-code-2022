export const day15 = () => {
  console.log("****** Day 15 *****************");

  // read in sensor and beacon data
  const sensorBeaconData = input.split("\n").map((line) => {
    const [sensor, beacon] = line.split(":");
    const sensorCoords = sensor
      .replace("Sensor at x=", "")
      .replace(", y=", ",");
    const beaconCoords = beacon
      .replace("closest beacon is at x=", "")
      .replace(", y=", ",");

    const sx = parseInt(sensorCoords.split(",")[0]);
    const sy = parseInt(sensorCoords.split(",")[1]);
    const bx = parseInt(beaconCoords.split(",")[0]);
    const by = parseInt(beaconCoords.split(",")[1]);

    return {
      sensor: { x: sx, y: sy },
      beacon: { x: bx, y: by },
      distance: calculateManhattanDistance(sx, sy, bx, by),
    };
  });

  let count = 0;
  let y = 2000000;

  const seenXs = new Set();
  for (const {
    sensor: { x: sx, y: sy },
    beacon: { x: bx, y: by },
    distance: dist,
  } of sensorBeaconData) {
    if (sy === y) seenXs.add(sx);
    if (by === y) seenXs.add(bx);

    for (let x = sx - dist; x <= sx + dist; x++) {
      if (!seenXs.has(x) && calculateManhattanDistance(sx, sy, x, y) <= dist) {
        seenXs.add(x);
        count++;
      }
    }
  }

  console.log("Part 1 - Positions:", count);

  function isOurOfAllSensorRanges(x: number, y: number) {
    return sensorBeaconData.every(
      ({ sensor: { x: sx, y: sy }, distance: dist }) =>
        calculateManhattanDistance(sx, sy, x, y) > dist
    );
  }

  for (const {
    sensor: { x: sx, y: sy },
    distance: dist,
  } of sensorBeaconData) {
    for (const xo of [-1, 1]) {
      for (const yo of [-1, 1]) {
        for (let dx = 0; dx <= dist + 1; dx++) {
          const dy = dist + 1 - dx;
          const x = sx + dx * xo;
          const y = sy + dy * yo;
          if (
            x >= 0 &&
            y >= 0 &&
            x <= 4000000 &&
            y <= 4000000 &&
            isOurOfAllSensorRanges(x, y)
          ) {
            console.log("Part 2 - Tuning Frequency:", x * 4000000 + y);
            console.log("*******************************");
            return;
          }
        }
      }
    }
  }
};

function calculateManhattanDistance(
  x1: number,
  y1: number,
  x2: number,
  y2: number
) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function printMap(
  map: { [key: string]: string },
  minX: number,
  maxX: number,
  minY: number,
  maxY: number
) {
  for (let y = minY; y <= maxY; y++) {
    let line = "";
    for (let x = minX; x <= maxX; x++) {
      line += map[`${x},${y}`] || ".";
    }
    console.log(line);
  }
}

const smallInput = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`;

const input = `Sensor at x=251234, y=759482: closest beacon is at x=-282270, y=572396
Sensor at x=2866161, y=3374117: closest beacon is at x=2729330, y=3697325
Sensor at x=3999996, y=3520742: closest beacon is at x=3980421, y=3524442
Sensor at x=3988282, y=3516584: closest beacon is at x=3980421, y=3524442
Sensor at x=3005586, y=3018139: closest beacon is at x=2727127, y=2959718
Sensor at x=3413653, y=3519082: closest beacon is at x=3980421, y=3524442
Sensor at x=2900403, y=187208: closest beacon is at x=2732772, y=2000000
Sensor at x=1112429, y=3561166: closest beacon is at x=2729330, y=3697325
Sensor at x=3789925, y=3283328: closest beacon is at x=3980421, y=3524442
Sensor at x=3991533, y=3529053: closest beacon is at x=3980421, y=3524442
Sensor at x=3368119, y=2189371: closest beacon is at x=2732772, y=2000000
Sensor at x=2351157, y=2587083: closest beacon is at x=2727127, y=2959718
Sensor at x=3326196, y=2929990: closest beacon is at x=3707954, y=2867627
Sensor at x=3839244, y=1342691: closest beacon is at x=3707954, y=2867627
Sensor at x=2880363, y=3875503: closest beacon is at x=2729330, y=3697325
Sensor at x=1142859, y=1691416: closest beacon is at x=2732772, y=2000000
Sensor at x=3052449, y=2711719: closest beacon is at x=2727127, y=2959718
Sensor at x=629398, y=214610: closest beacon is at x=-282270, y=572396
Sensor at x=3614706, y=3924106: closest beacon is at x=3980421, y=3524442
Sensor at x=3999246, y=2876762: closest beacon is at x=3707954, y=2867627
Sensor at x=3848935, y=3020496: closest beacon is at x=3707954, y=2867627
Sensor at x=123637, y=2726215: closest beacon is at x=-886690, y=3416197
Sensor at x=4000000, y=3544014: closest beacon is at x=3980421, y=3524442
Sensor at x=2524955, y=3861248: closest beacon is at x=2729330, y=3697325
Sensor at x=2605475, y=3152151: closest beacon is at x=2727127, y=2959718`;
