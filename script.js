async function D1P1(file) {
  let text = await file.text();
  let counter = 0;

  text = text.split("\r\n");
  ints = text.map((num) => {
    return Number(num);
  });

  for (let x = 0; x < ints.length; x++) {
    if (ints[x + 1] > ints[x]) counter += 1;
  }
  console.log("len:", ints.length);

  console.log(counter);
}

async function D1P2(file) {
  let text = await file.text();
  // initialize vars
  let counter = 0;
  const newlist = [];
  // split on newlines, convert from strings to ints
  text = text.split("\r\n");
  ints = text.map((num) => {
    return Number(num);
  });
  // slice lengths of 3, start with pos (2) and increment until end
  // slice from pos-2 to pos+1 to take (0,3]
  // sum slice, push to a list which we will use to evaluate increases
  for (let pos = 2; pos < ints.length; pos++) {
    newlist.push(
      ints.slice(pos - 2, pos + 1).reduce(function (sum, num) {
        return sum + num;
      })
    );
  }
  // p2 ends, now just counting increases from this list
  for (let x = 0; x < newlist.length; x++) {
    if (newlist[x + 1] > newlist[x]) counter += 1;
  }
  console.log("len:", newlist.length);
  console.log("counter:", counter);
}

async function D2P1(file) {
  let text = await file.text();
  text = text.split("\r\n");

  // amt never > 9, so can just look at last digit
  // can't go backwards, so add all forward for final horizontal
  // sum all down
  // sum all up
  // find difference of (down - up) for depth

  let f_sum = 0;
  let d_sum = 0;
  let u_sum = 0;

  for (let x = 0; x < text.length; x++) {
    if (text[x][0] == "f") {
      f_sum += Number(text[x][text[x].length - 1]);
    } else if (text[x][0] == "d") {
      d_sum += Number(text[x][text[x].length - 1]);
    } else {
      u_sum += Number(text[x][text[x].length - 1]);
    }
  }
  console.log(f_sum * (d_sum - u_sum));
}

async function D2P2(file) {
  let text = await file.text();
  text = text.split("\r\n");

  let f_sum = 0;
  let d_sum = 0;
  let u_sum = 0;
  let a_sum = 0;

  for (let x = 0; x < text.length; x++) {
    if (text[x][0] == "f") {
      f_sum += Number(text[x][text[x].length - 1]);
      d_sum += a_sum * Number(text[x][text[x].length - 1]);
    } else if (text[x][0] == "d") {
      a_sum += Number(text[x][text[x].length - 1]);
    } else {
      a_sum -= Number(text[x][text[x].length - 1]);
    }
  }
  console.log(f_sum * (d_sum - u_sum));
}

async function D3P1(file) {
  let text = await file.text();
  nums = text.split("\r\n");

  // vars
  let [g, e] = [0, 0];
  numLength = nums[0].length;
  const binListG = new Array(numLength).fill(0);

  // loop through lines
  for (let line = 0; line < nums.length; line++) {
    // loop through bits, incrementing "1" counts.
    //if last line, choose 1 or 0
    for (let i = 0; i < nums[line].length; i++) {
      if (nums[line][i] === "1") binListG[i]++;
      if (line === nums.length - 1)
        binListG[i] = binListG[i] > nums.length / 2 ? 1 : 0;
    }
  }

  for (x = 0; x < numLength; x++) {
    g += binListG[x] * 2 ** (binListG.length - x - 1);
    e += (!binListG[x] + 0) * 2 ** (binListG.length - x - 1);
  }
  console.log(g, e);
}

// regular loop w/ incs
async function D3P2(file) {
  let text = await file.text();
  nums = text.split("\r\n");

  // vars
  let [ogr, csr, i, testcount] = [0, 0, 0, 0];
  let [winner, ogr_bin, csr_bin] = [[], [], []];
  numLength = nums[0].length;
  const binListG = new Array(numLength).fill(0);

  // why can't I make any var = to the return of the recursion function??
  recursion(nums, winner, 1);
  ogr_bin = winner.map((num) => {
    return Number(num);
  });
  winner = [];
  recursion(nums, winner, 2);
  csr_bin = winner.map((num) => {
    return Number(num);
  });
  console.log(ogr_bin);
  console.log(csr_bin);

  for (x = 0; x < numLength; x++) {
    ogr += ogr_bin[x] * 2 ** (ogr_bin.length - x - 1);
    csr += csr_bin[x] * 2 ** (csr_bin.length - x - 1);
  }
  console.log(ogr, csr, ogr * csr);
}

function recursion(list, winner, round) {
  //console.log("entered recursion");
  if (list.length === 1) {
    // add remaining digits to winner, a list we will use to convert to decimal from binary
    if (list[0] != "") {
      winner.push(...list[0]);
    }
    console.log(winner);
    return winner;
  }
  //console.log("list len:", list.length);
  //sort list, find line index of line[0] = 1
  list.sort();
  const index = list.findIndex((value) => /^1/.test(value));
  //console.log("location of '1' in list:", index);

  //compare to listSize/2, set 1/0
  //add string of it to winner for later
  mostCommon = index > list.length / 2 ? 0 : 1;
  leastCommon = index <= list.length / 2 ? 0 : 1;
  console.log(leastCommon);
  console.log(list);
  //console.log("mostcommon:", mostCommon);
  //  console.log("winner", winner);

  if (round === 1) {
    winner.push(String(mostCommon));
    newList = mostCommon === 1 ? list.slice(index) : list.slice(0, index);
  } else {
    winner.push(String(leastCommon));
    newList = leastCommon === 1 ? list.slice(index) : list.slice(0, index);
  }

  //slice whole list [0:pos] for all 0 or [pos:] for all 1

  //loop through with map and slice[i:]
  //console.log("ABC List 1", newList);
  newList = newList.map((line) => {
    return line.slice(1);
  });
  //console.log("ABC List 2", newList);

  // time to re-sort the list
  recursion(newList, winner, round);
}

// sort method
async function D3P2_2(file) {
  let text = await file.text();
  nums = text.split("\r\n");

  // vars
  let [ogr, csr, i, testcount] = [0, 0, 0, 0];
  let [winner, ogr_bin, csr_bin] = [[], [], []];
  numLength = nums[0].length;
  const binListG = new Array(numLength).fill(0);

  // why can't I make any var = to the return of the recursion function??
  recursion2(nums, winner, 1);
  ogr_bin = winner.map((num) => {
    return Number(num);
  });
  winner = [];
  recursion2(nums, winner, 2);
  csr_bin = winner.map((num) => {
    return Number(num);
  });
  console.log(ogr_bin);
  console.log(csr_bin);

  for (x = 0; x < numLength; x++) {
    ogr += ogr_bin[x] * 2 ** (ogr_bin.length - x - 1);
    csr += csr_bin[x] * 2 ** (csr_bin.length - x - 1);
  }
  console.log(ogr, csr, ogr * csr);
}

function recursion2(list, winner, round) {
  //console.log("entered recursion");
  if (list.length === 1) {
    // add remaining digits to winner, a list we will use to convert to decimal from binary
    if (list[0] != "") {
      winner.push(...list[0]);
    }
    console.log(winner);
    return winner;
  }
  let ones = 0;
  let zeroes = 0;
  for (x = 0; x < list.length; x++) {
    if (list[x][0] === "1") {
      ones++;
    } else {
      zeroes++;
    }
  }
  mostCommon = ones >= zeroes ? 1 : 0;
  leastCommon = ones < zeroes ? 1 : 0;

  if (round === 1) {
    winner.push(String(mostCommon));
    newList = list.filter((num) => num[0] === String(mostCommon));
  } else {
    winner.push(String(leastCommon));
    newList = list.filter((num) => num[0] === String(leastCommon));
  }

  //loop through with map and slice[i:]
  newList = newList.map((line) => {
    return line.slice(1);
  });

  // time to re-sort the list
  recursion2(newList, winner, round);
}

async function D4P1(file) {
  let text = await file.text();
  text = text.split("\r\n\r\n").map((board) => {
    return board.split("\r\n");
  });
  let calls = text[0][0].split(",");
  let boards = [];
  let win = 0;
  let lineLen = text[1].length;

  class Board {
    constructor(lines) {
      // establish list of all nums
      this.ind = [];
      // clean lines, establish row and col lists
      for (let x = 0; x < lineLen; x++) {
        this[`l${x}`] = lines[x].replaceAll("  ", " ").trim().split(" ");
        this[`c${x}`] = 5;
        this[`r${x}`] = 5;
      }
      // loop thru rows, cols. add each value to ind
      for (let x = 0; x < lineLen; x++) {
        for (let i = 0; i < lineLen; i++) {
          this.ind.push(this[`l${x}`][i]);
        }
      }
      // copy ind after it's populated
      this.indFull = [...this.ind];
    }
    check(call, win) {
      if (this.ind.includes(call)) {
        // get call's position in full list,
        // derive r and c using math
        const index = this.indFull.indexOf(call);
        const r = Math.floor(index / lineLen);
        const c = index % lineLen;

        // remove from lists, decrement score
        this.ind.splice(this.ind.indexOf(call), 1);
        this[`r${r}`]--;
        this[`c${c}`]--;
        // if either score reached 0 (all tiles hit),
        // return a win
        if (this[`r${r}`] === 0 || this[`c${c}`] === 0) {
          return win + 1;
        }
      }
    }
  }
  // create the board objects and fill boards arr with them
  for (x = 1; x < text.length; x++) {
    boards.push(new Board(text[x]));
  }
  // for each call num, check each board
  for (let x = 0; x < calls.length; x++) {
    const call = calls[x];
    for (let i = 0; i < boards.length; i++) {
      const board = boards[i];
      // if check returns a win, log our answer
      if (board.check(call, win)) {
        console.log(
          board.ind
            .map((num) => {
              return (num = Number(num));
            })
            .reduce(function (sum, num) {
              return sum + 0 + Number(num);
            }) * Number(call),
          board.ind.length
        );
        return;
      }
    }
  }
}

async function D4P2(file) {
  let text = await file.text();
  text = text.split("\r\n\r\n").map((board) => {
    return board.split("\r\n");
  });
  let calls = text[0][0].split(",");
  let boards = [];
  let win = 0;
  let lineLen = text[1].length;

  class Board {
    constructor(lines) {
      // establish list of all nums
      this.ind = [];
      // clean lines, establish row and col lists
      for (let x = 0; x < lineLen; x++) {
        this[`l${x}`] = lines[x].replaceAll("  ", " ").trim().split(" ");
        this[`c${x}`] = 5;
        this[`r${x}`] = 5;
      }
      // loop thru rows, cols. add each value to ind
      for (let x = 0; x < lineLen; x++) {
        for (let i = 0; i < lineLen; i++) {
          this.ind.push(this[`l${x}`][i]);
        }
      }
      // copy ind after it's populated
      this.indFull = [...this.ind];
    }
    check(call, win) {
      if (this.ind.includes(call)) {
        // get call's position in full list,
        // derive r and c using math
        const index = this.indFull.indexOf(call);
        const r = Math.floor(index / lineLen);
        const c = index % lineLen;

        // remove from list, decrement score
        this.ind.splice(this.ind.indexOf(call), 1);
        this[`r${r}`]--;
        this[`c${c}`]--;
        // if either score reached 0 (all tiles hit),
        // return a win
        if (this[`r${r}`] === 0 || this[`c${c}`] === 0) {
          return win + 1;
        }
      }
    }
  }
  // create the board objects and fill boards arr with them
  for (x = 1; x < text.length; x++) {
    boards.push(new Board(text[x]));
  }
  // for each call num, check each board
  for (let x = 0; x < calls.length; x++) {
    const call = calls[x];
    for (let i = 0; i < boards.length; i++) {
      const board = boards[i];
      if (board.check(call, win)) {
        // if board wins, remove it from the boards list
        boards.splice(boards.indexOf(board), 1);
        // decrement i otherwise we skip an index when removing
        i--;
        // log our answer if we just removed the last board
        if (boards.length === 0) {
          console.log(
            board.ind
              .map((num) => {
                return (num = Number(num));
              })
              .reduce(function (sum, num) {
                return sum + 0 + Number(num);
              }) * Number(call),
            board.ind.length
          );
        }
      }
    }
  }
}

async function D5P1(file) {
  let text = await file.text();
  let gridSize = 0;
  let grid = [];
  let blank = "0";
  const dangers = {};

  // flatten, find max, create grid
  let flattened = text
    .replaceAll("\r\n", ",")
    .replaceAll(" -> ", ",")
    .split(",")
    .map((num) => {
      return Number(num);
    });
  gridSize = Math.max(...flattened);
  push = blank.repeat(gridSize + 1).split("");
  for (let x = 0; x <= gridSize; x++) {
    grid.push(
      blank
        .repeat(gridSize + 1)
        .split("")
        .map((num) => {
          return Number(num);
        })
    );
  }

  // split by lines
  text = text.split("\r\n");
  // split line by coord pairs
  for (let x = 0; x < text.length; x++) {
    text[x] = text[x].split(" -> ");
    // split pair by x,y
    for (let i = 0; i < text[x].length; i++) {
      text[x][i] = text[x][i].split(",").map((num) => {
        return Number(num);
      });
    }
    if (text[x][0][0] === text[x][1][0] || text[x][0][1] === text[x][1][1]) {
      [cord1, cord2] = [text[x][0], text[x][1]];

      // if x is different
      if (cord1[0] !== cord2[0]) {
        let min = Math.min(cord1[0], cord2[0]);
        let max = Math.max(cord1[0], cord2[0]);
        let y = cord1[1];

        for (let x = min; x <= max; x++) {
          grid[y][x] += 1;
          if (grid[y][x] > 1) {
            dangers[`${x}+${y}`] = grid[y][x];
          }
        }
      }
      // if y is different
      if (cord1[1] !== cord2[1]) {
        let min = Math.min(cord1[1], cord2[1]);
        let max = Math.max(cord1[1], cord2[1]);
        let x = cord1[0];

        for (let y = min; y <= max; y++) {
          grid[y][x] += 1;
          if (grid[y][x] > 1) {
            dangers[`${x}+${y}`] = grid[y][x];
          }
        }
      }
    }
  }
  console.log(Object.keys(dangers).length);
}

async function D5P2(file) {
  let text = await file.text();
  let gridSize = 0;
  let grid = [];
  let blank = "0";
  const dangers = {};

  // flatten, find max, create grid
  let flattened = text
    .replaceAll("\r\n", ",")
    .replaceAll(" -> ", ",")
    .split(",")
    .map((num) => {
      return Number(num);
    });
  gridSize = Math.max(...flattened);
  push = blank.repeat(gridSize + 1).split("");
  for (let x = 0; x <= gridSize; x++) {
    grid.push(
      blank
        .repeat(gridSize + 1)
        .split("")
        .map((num) => {
          return Number(num);
        })
    );
  }

  // split by lines
  text = text.split("\r\n");
  // split line by coord pairs
  for (let x = 0; x < text.length; x++) {
    text[x] = text[x].split(" -> ");
    // split pair by x,y
    for (let i = 0; i < text[x].length; i++) {
      text[x][i] = text[x][i].split(",").map((num) => {
        return Number(num);
      });
    }
    // if x or y is same
    if (text[x][0][0] === text[x][1][0] || text[x][0][1] === text[x][1][1]) {
      [cord1, cord2] = [text[x][0], text[x][1]];
      // if y is same
      if (cord1[0] !== cord2[0]) {
        let min = Math.min(cord1[0], cord2[0]);
        let max = Math.max(cord1[0], cord2[0]);
        let y = cord1[1];

        for (let x = min; x <= max; x++) {
          grid[y][x] += 1;
          if (grid[y][x] > 1) {
            dangers[`${x}+${y}`] = grid[y][x];
          }
        }
      }
      // if x is same
      else if (cord1[1] !== cord2[1]) {
        let min = Math.min(cord1[1], cord2[1]);
        let max = Math.max(cord1[1], cord2[1]);
        let x = cord1[0];

        for (let y = min; y <= max; y++) {
          grid[y][x] += 1;
          if (grid[y][x] > 1) {
            dangers[`${x}+${y}`] = grid[y][x];
          }
        }
      }
    } // if no cords are shared
    else {
      [cord1, cord2] = [text[x][0], text[x][1]];
      let slope = (cord2[1] - cord1[1]) / (cord2[0] - cord1[0]);
      let min = Math.min(cord1[0], cord2[0]);
      let max = Math.max(cord1[0], cord2[0]);
      let y = cord1[0] === min ? cord1[1] : cord2[1];

      // had to change my inds to i because X was overwriting something else, I think...
      for (i = min; i <= max; i++) {
        grid[y][i] += 1;
        if (grid[y][i] > 1) {
          dangers[`${i}+${y}`] = grid[y][i];
        }
        y += slope;
      }
    }
  }
  console.log(grid);
  console.log(Object.keys(dangers).length);
}

async function D6P1(file) {
  let text = await file.text();
  text = text.split(",");
  fish = text.map((num) => {
    return Number(num);
  });
  console.log(fish);

  for (let x = 0; x < 80; x++) {
    fish.forEach((num, i) => {
      if (fish[i] === 0) {
        fish.push(8);
        fish[i] = 6;
      } else {
        fish[i] -= 1;
      }
    });
    //console.log(fish);
  }
  console.log(fish.length);
}

async function D6P2(file) {
  let text = await file.text();
  text = text.split(",");
  fish = text.map((num) => {
    return Number(num);
  });
  console.log(fish);

  for (let x = 0; x < 80; x++) {
    fish.forEach((num, i) => {
      if (fish[i] === 0) {
        fish.push(8);
        fish[i] = 6;
      } else {
        fish[i] -= 1;
      }
    });
    //console.log(fish);
  }
  console.log(fish.length);
}

async function D7P1(file) {
  let text = await file.text();
  text = text.split(",");
  crabs = text.map((num) => {
    return Number(num);
  });
  console.log(crabs);
}
