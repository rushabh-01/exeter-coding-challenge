const fs = require("fs");
const {performance} = require("perf_hooks");


//reading the files
const words = fs.readFileSync("./find_words.txt","utf-8");
const text = fs.readFileSync("./t8.shakespeare.txt", "utf-8");
const frenchDictionary = fs.readFileSync("./french_dictionary.csv", "utf-8");

// console.log(words)
// console.log(text)
// console.log(frenchDictionary)

// creating a map  to make english as the key and french as the value
let frequency = {};
const lines = frenchDictionary.trim().split("\n");
for (let i = 1; i < lines.length; i++) {
    const [english, french] = lines[i].split(",");
    frequency[english] = french;
  }

// console.log(frequency)  


//swapping words in find_word file

const wordList = words.trim().split("\n")
// console.log(wordList)
let replace = {};
const translate = text.replace(/\b\w+\b/g, (match)=> {
    if(wordList.includes(match) && frequency[match]){
        replace[match] = replace[match] ? replace[match] + 1 : 1;
        return frequency[match];
    }
    return match;
})


console.log(replace);

//  get the output

fs.writeFileSync("./t8.shakespeare.translated.txt",translate);

//frequency.csv file

const freq = Object.entries(replace)
  .map(([english, count]) => [english, frequency[english], count])
  .join("\n");

fs.writeFileSync(
  "./frequency.csv",
  "English word,French word,Frequency\n" + freq
);


const timeTaken = performance.now();
fs.writeFileSync(
    "./performance.txt",
    `Time to process: ${timeTaken} ms`
  );

  fs.writeFileSync(
    "./githublink.txt",
    "https://github.com/rushabh-01/exeter-coding-challenge"
  );