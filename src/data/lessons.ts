export interface Lesson {
  day: number;
  newKeys: string[];
  allKeys: string[];
  title: string;
  paragraph: string;
}

export const lessons: Lesson[] = [
  {
    day: 1,
    newKeys: ["f", "j"],
    allKeys: ["f", "j"],
    title: "Home Row Start",
    paragraph: "fff jjj fjf jfj ffj jjf fjfj jfjf ffjj jjff fjfjfj jfjfjf fff jjj fjfj",
  },
  {
    day: 2,
    newKeys: ["d", "k"],
    allKeys: ["f", "j", "d", "k"],
    title: "Expanding Home",
    paragraph: "ddd kkk dkd kdk fdk jdk dfk kjf dkfj fkdj djfk kjdf dkfj fjdk",
  },
  {
    day: 3,
    newKeys: ["s", "l"],
    allKeys: ["f", "j", "d", "k", "s", "l"],
    title: "Outer Reach",
    paragraph: "sss lll sls lsl fds jkl sldk fdsl jkls dslf kjds slfd lkjf sdlk",
  },
  {
    day: 4,
    newKeys: ["a", ";"],
    allKeys: ["f", "j", "d", "k", "s", "l", "a", ";"],
    title: "Full Home Row",
    paragraph: "aaa ;;; a;a ;a; asdf jkl; fdsa ;lkj asdf jkl; ask dad falls flask salad",
  },
  {
    day: 5,
    newKeys: ["g", "h"],
    allKeys: ["f", "j", "d", "k", "s", "l", "a", ";", "g", "h"],
    title: "Center Keys",
    paragraph: "ggg hhh ghg hgh flag half gash dash hash glad shag lash shall flash gala",
  },
  {
    day: 6,
    newKeys: ["e", "i"],
    allKeys: ["f", "j", "d", "k", "s", "l", "a", ";", "g", "h", "e", "i"],
    title: "First Vowels",
    paragraph: "see die fie hie lie silk like file side hide seek feel heel deal sigh high",
  },
  {
    day: 7,
    newKeys: ["r", "u"],
    allKeys: ["f", "j", "d", "k", "s", "l", "a", ";", "g", "h", "e", "i", "r", "u"],
    title: "Upper Reach",
    paragraph: "rule sure fire dire huge sure ride guide surge ridge rule figure like argued",
  },
  {
    day: 8,
    newKeys: ["t", "y"],
    allKeys: ["f", "j", "d", "k", "s", "l", "a", ";", "g", "h", "e", "i", "r", "u", "t", "y"],
    title: "Index Stretch",
    paragraph: "they that this yell yet style stay duty tray dirty fifty kitty thirty dirty",
  },
  {
    day: 9,
    newKeys: ["w", "o"],
    allKeys: ["f", "j", "d", "k", "s", "l", "a", ";", "g", "h", "e", "i", "r", "u", "t", "y", "w", "o"],
    title: "Ring Fingers Up",
    paragraph: "work word two wood woke flow show slow grow throw wrote whole world tour",
  },
  {
    day: 10,
    newKeys: ["q", "p"],
    allKeys: ["f", "j", "d", "k", "s", "l", "a", ";", "g", "h", "e", "i", "r", "u", "t", "y", "w", "o", "q", "p"],
    title: "Pinky Reach",
    paragraph: "quip equip put poke quote power peque topple pupil quest pilot quiet proud",
  },
  {
    day: 11,
    newKeys: ["v", "n"],
    allKeys: ["f", "j", "d", "k", "s", "l", "a", ";", "g", "h", "e", "i", "r", "u", "t", "y", "w", "o", "q", "p", "v", "n"],
    title: "Lower Row Start",
    paragraph: "never even given seven prove drove nerve novel vine revive invoice prevent given",
  },
  {
    day: 12,
    newKeys: ["b", "m"],
    allKeys: ["f", "j", "d", "k", "s", "l", "a", ";", "g", "h", "e", "i", "r", "u", "t", "y", "w", "o", "q", "p", "v", "n", "b", "m"],
    title: "Bottom Middle",
    paragraph: "maybe number member bottom submit blame climb timber marble mumble humble stumble mob",
  },
  {
    day: 13,
    newKeys: ["c", ","],
    allKeys: ["f", "j", "d", "k", "s", "l", "a", ";", "g", "h", "e", "i", "r", "u", "t", "y", "w", "o", "q", "p", "v", "n", "b", "m", "c", ","],
    title: "C and Comma",
    paragraph: "come, once, since, voice, choice, force, prince, twice, chance, circle, concert, become,",
  },
  {
    day: 14,
    newKeys: ["x", "."],
    allKeys: ["f", "j", "d", "k", "s", "l", "a", ";", "g", "h", "e", "i", "r", "u", "t", "y", "w", "o", "q", "p", "v", "n", "b", "m", "c", ",", "x", "."],
    title: "X and Period",
    paragraph: "next. text. mix. fix. exist. expect. box. complex. extreme. extra. six. taxi. exact.",
  },
  {
    day: 15,
    newKeys: ["z", "/"],
    allKeys: ["f", "j", "d", "k", "s", "l", "a", ";", "g", "h", "e", "i", "r", "u", "t", "y", "w", "o", "q", "p", "v", "n", "b", "m", "c", ",", "x", ".", "z", "/"],
    title: "Final Keys",
    paragraph: "the quick brown fox jumps over the lazy dog. size, prize, breeze, and freeze. yes/no, left/right, up/down.",
  },
];

export const KEYBOARD_ROWS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";"],
  ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"],
];

export const HOME_ROW_KEYS = ["a", "s", "d", "f", "j", "k", "l", ";"];
