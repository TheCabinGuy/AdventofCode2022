import { readFile } from "../utils.js";

const testData = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

const data = readFile("Day 7/puzzleInput.txt");

function transformData(data) {
  return data.split("\n").filter((a) => a !== "$ ls" && !a.includes("dir"));
}

function isCommand(string) {
  return string.includes("$");
}

function createFileStructure(data) {
  let currentDirectory = "";
  return data.reduce((fileSystem, command) => {
    if (isCommand(command)) {
      const [changeDirectory] = command.split(" ").reverse();
      if (changeDirectory === ".." && currentDirectory) {
        currentDirectory = currentDirectory
          .split("/")
          .slice(0, -2)
          .join("/")
          .concat("/");
      } else if (changeDirectory === "/") {
        currentDirectory = changeDirectory;
      } else {
        currentDirectory = currentDirectory.concat(`${changeDirectory}/`);
      }
    } else {
      const [fileSize, fileName] = command.split(" ");
      fileSystem[currentDirectory.concat(fileName)] = Number(fileSize);
    }
    return fileSystem;
  }, {});
}

function fileStructureToFolderSizeMap(data) {
  return data.reduce((total, [directory, size]) => {
    directory
      .split("/")
      .slice(0, -1)
      .forEach((_, index, self) => {
        const temp = self.slice(0, index + 1).join("/") || "/";
        total[temp] = (total[temp] || 0) + size;
      });
    return total;
  }, {});
}

function filterFolderSizes(maxSize) {
  return function (data) {
    return data.filter(([_, size]) => size <= maxSize);
  };
}

function addTotalFolderSizes(data) {
  return data.reduce((total, [_, size]) => total + size, 0);
}

function puzzle1() {
  return [
    transformData,
    createFileStructure,
    Object.entries,
    fileStructureToFolderSizeMap,
    Object.entries,
    filterFolderSizes(100000),
    addTotalFolderSizes,
  ].reduce((output, func) => func(output), data);
}

function puzzle2() {
  const folderSizeMap = [
    transformData,
    createFileStructure,
    Object.entries,
    fileStructureToFolderSizeMap,
  ].reduce((output, func) => func(output), data);

  const totalSize = folderSizeMap["/"];
  const SPACE_NEEDED = 30000000;
  const TOTAL_SPACE = 70000000;
  const unusedSpace = TOTAL_SPACE - totalSize;
  const spaceForDeletion = SPACE_NEEDED - unusedSpace;

  const folderForDeletion = Object.entries(folderSizeMap)
    .filter(([_, size]) => size >= spaceForDeletion)
    .sort(([, a], [, b]) => a - b)[0];

  return folderForDeletion[1];
}
console.log(puzzle1());

console.log(puzzle2());
