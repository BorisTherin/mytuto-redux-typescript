import { PestoProjectApiEntity } from "./pestoProjectSlice"
/**
 * FEED RANDOM WORD FOR NEW REQUEST VARS FEED
 * @returns string (length 5 to 10)
 */
export function randomProject() {
  function randomWords() {
    const char: string[] = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ]
    let word: string = ""
    for (let i: number = 0; i < 5 + Math.round(Math.random() * 5); i++) {
      word += char[Math.round(Math.random() * 26)]
    }
    return word
  }
  const ret: PestoProjectApiEntity = {
    name: randomWords(),
    description: randomWords() + " " + randomWords() + " " + randomWords(),
    git_ssh_uri: "git@github.com:" + randomWords() + "/" + randomWords(),
  }
  return JSON.stringify(ret)
}
