import { randomId } from "@mui/x-data-grid-generator";

export const title = "Skill investment in 2023";
export const chartColor = {
  types: [
    { type: "Create", color: "rgba(226, 240,217, 1)" },
    { type: "Grow", color: "rgba(222, 235, 247, 1)" },
    { type: "Enhance", color: "rgba(255, 242, 204, 1)" },
    { type: "R&D", color: "rgba(251, 229, 214, 1)" },
  ],
  dotted: "#385994",
  highlight: "#ff1744",
  label: {
    title: "#000000",
    gotSkill: "black",
    onGoing: "orange",
    finished: "#3333ff",
    plan: "#00cc00",
    ytd: "#80aaff",
  },
};

export const NoteType = [
  {
    id: "1",
    type: "Create",
    color: "rgba(226, 240,217, 1)",
  },
  {
    id: "2",
    type: "Grow",
    color: "rgba(222, 235, 247, 1)",
  },
  {
    id: "3",
    type: "Enhance",
    color: "rgba(255, 242, 204, 1)",
  },
  {
    id: "4",
    type: "R&D",
    color: "rgba(251, 229, 214, 1)",
  },
];
export const addedType = ["Finished", "Ongoing"];
export const mockData = [
  {
    id: "1",
    type: "Create",
    color: "rgba(226, 240,217, 1)",
    data: [
      {
        id: randomId(),
        name: "Lorem Ipsum",
        gotSkill: 80,
        YTD: 24,
        target: 250,
        x: 85,
        y: 50,
        priority: 2,
        LM: 0,
        addedType: "Finished",
        type: "Enhance",
      },
      {
        id: randomId(),
        name: "10",
        gotSkill: 80,
        YTD: 24,
        target: 100,
        x: 96,
        y: 50,
        priority: 2,
        LM: 0,
        addedType: "Finished",
        type: "Enhance",
      },
    ],
  },
  {
    type: "Grow",
    color: "rgba(222, 235, 247, 1)",
    id: "2",
    data: [
      {
        id: randomId(),
        name: "Lorem Ipsum",
        gotSkill: 80,
        YTD: 24,
        target: 49,
        x: 81,
        y: 78,
        priority: 2,
        LM: 0,
        addedType: "Finished",
        type: "Enhance",
      },
      {
        id: randomId(),
        name: "Lorem Ipsum",
        gotSkill: 80,
        YTD: 24,
        target: 10,
        x: 74,
        y: 63,
        priority: 2,
        LM: 0,
        addedType: "Ongoing",
        type: "Enhance",
      },
      {
        id: randomId(),
        name: "Lorem Ipsum",
        gotSkill: 80,
        YTD: 24,
        target: 40,
        x: 71,
        y: 88,
        priority: 2,
        LM: 0,
        addedType: "Finished",
        type: "Enhance",
      },
      {
        id: randomId(),
        name: "Lorem Ipsum",
        gotSkill: 80,
        YTD: 24,
        target: 67,
        x: 62,
        y: 90,
        priority: 2,
        LM: 0,
        addedType: "Finished",
        type: "Enhance",
      },
      {
        id: randomId(),
        name: "Lorem Ipsum",
        gotSkill: 80,
        YTD: 24,
        target: 10,
        x: 57,
        y: 89,
        priority: 2,
        LM: 0,
        addedType: "Ongoing",
        type: "Enhance",
      },
      {
        id: randomId(),
        name: "Lorem Ipsum",
        gotSkill: 80,
        YTD: 24,
        target: 10,
        x: 55,
        y: 52,
        priority: 2,
        LM: 0,
        addedType: "Finished",
        type: "Enhance",
      },
      {
        id: randomId(),
        name: "Lorem Ipsum",
        gotSkill: 80,
        YTD: 24,
        target: 10,
        x: 67,
        y: 49,
        priority: 2,
        LM: 0,
        addedType: "Finished",
        type: "Enhance",
      },
      {
        id: randomId(),
        name: "Lorem Ipsum",
        gotSkill: 80,
        YTD: 24,
        target: 39,
        x: 61,
        y: 36,
        priority: 2,
        LM: 0,
        addedType: "Finished",
        type: "Enhance",
      },
      {
        id: randomId(),
        name: "Lorem Ipsum",
        gotSkill: 80,
        YTD: 24,
        target: 10,
        x: 49,
        y: 46,
        priority: 2,
        LM: 0,
        addedType: "Finished",
        type: "Enhance",
      },
      {
        id: randomId(),
        name: "Lorem Ipsum",
        gotSkill: 80,
        YTD: 24,
        target: 10,
        x: 53,
        y: 19,
        priority: 2,
        LM: 0,
        addedType: "Ongoing",
        type: "Enhance",
      },
      {
        id: randomId(),
        name: "Lorem Ipsum",
        gotSkill: 80,
        YTD: 24,
        target: 10,
        x: 41,
        y: 14,
        priority: 2,
        LM: 35,
        addedType: "Finished",
        type: "Enhance",
      },
      {
        id: randomId(),
        name: "Lorem Ipsum",
        gotSkill: 80,
        YTD: 24,
        target: 250,
        x: 30,
        y: 17,
        priority: 2,
        LM: 0,
        addedType: "Finished",
        type: "Enhance",
      },
      {
        id: randomId(),
        name: "Lorem Ipsum",
        gotSkill: 80,
        YTD: 24,
        target: 710,
        x: 19,
        y: 25,
        priority: 2,
        LM: 78,
        addedType: "Finished",
        type: "Enhance",
      },
      {
        id: randomId(),
        name: "Lorem Ipsum",
        gotSkill: 80,
        YTD: 24,
        target: 10,
        x: 29,
        y: 36,
        priority: 2,
        LM: 2,
        addedType: "Finished",
        type: "Enhance",
      },
      {
        id: randomId(),
        name: "Lorem Ipsum",
        gotSkill: 80,
        YTD: 24,
        target: 10,
        x: 38,
        y: 44,
        priority: 2,
        LM: 0,
        addedType: "Finished",
        type: "Enhance",
      },
      {
        id: randomId(),
        name: "Lorem Ipsum",
        gotSkill: 80,
        YTD: 24,
        target: 10,
        x: 43,
        y: 52,
        priority: 2,
        LM: 0,
        addedType: "Finished",
        type: "Enhance",
      },
      {
        id: randomId(),
        name: "Lorem Ipsum",
        gotSkill: 80,
        YTD: 24,
        target: 10,
        x: 27,
        y: 51,
        priority: 2,
        LM: 0,
        addedType: "Finished",
        type: "Enhance",
      },
      {
        id: randomId(),
        name: "Lorem Ipsum",
        gotSkill: 80,
        YTD: 24,
        target: 10,
        x: 13,
        y: 48,
        priority: 2,
        LM: 0,
        addedType: "Finished",
        type: "Enhance",
      },
      {
        id: randomId(),
        name: "Lorem Ipsum",
        gotSkill: 80,
        YTD: 24,
        target: 10,
        x: 12,
        y: 65,
        priority: 2,
        LM: 0,
        addedType: "Finished",
        type: "Enhance",
      },
      {
        id: randomId(),
        name: "Lorem Ipsum",
        gotSkill: 80,
        YTD: 24,
        target: 10,
        x: 31,
        y: 87,
        priority: 2,
        LM: 0,
        addedType: "Ongoing",
        type: "Enhance",
      },
      {
        id: randomId(),
        name: "Lorem Ipsum",
        gotSkill: 80,
        YTD: 24,
        target: 10,
        x: 17,
        y: 87,
        priority: 2,
        LM: 0,
        addedType: "Finished",
        type: "Enhance",
      },
      {
        id: randomId(),
        name: "Lorem Ipsum",
        gotSkill: 80,
        YTD: 24,
        target: 10,
        x: 29,
        y: 69,
        priority: 2,
        LM: 0,
        addedType: "Finished",
        type: "Enhance",
      },
      {
        id: randomId(),
        name: "Lorem Ipsum",
        gotSkill: 80,
        YTD: 24,
        target: 10,
        x: 39,
        y: 75,
        priority: 2,
        LM: 0,
        addedType: "Finished",
        type: "Enhance",
      },
      {
        id: randomId(),
        name: "Lorem Ipsum",
        gotSkill: 80,
        YTD: 24,
        target: 10,
        x: 27,
        y: 51,
        priority: 2,
        LM: 0,
        addedType: "Finished",
        type: "Enhance",
      },
      {
        id: randomId(),
        name: "Lorem Ipsum",
        gotSkill: 80,
        YTD: 24,
        target: 10,
        x: 43,
        y: 52,
        priority: 2,
        LM: 0,
        addedType: "Ongoing",
        type: "Enhance",
      },
      {
        id: randomId(),
        name: "Lorem Ipsum",
        gotSkill: 80,
        YTD: 24,
        target: 10,
        x: 64,
        y: 68,
        priority: 2,
        LM: 0,
        addedType: "Finished",
        type: "Enhance",
      },
      {
        id: randomId(),
        name: "Lorem Ipsum",
        gotSkill: 80,
        YTD: 24,
        target: 10,
        x: 47,
        y: 90,
        priority: 2,
        LM: 0,
        addedType: "Finished",
        type: "Enhance",
      },
      {
        id: randomId(),
        name: "Lorem Ipsum",
        gotSkill: 80,
        YTD: 24,
        target: 10,
        x: 19,
        y: 75,
        priority: 2,
        LM: 0,
        addedType: "Ongoing",
        type: "Enhance",
      },
    ],
  },
  {
    type: "Enhance",
    color: "rgba(255, 242, 204, 1)",
    id: "3",
    data: [
      {
        id: randomId(),
        name: "Lorem Ipsum",
        gotSkill: 80,
        YTD: 24,
        target: 10,
        x: 64,
        y: 20,
        priority: 2,
        LM: 0,
        addedType: "Finished",
        type: "Enhance",
      },
      {
        id: randomId(),
        name: "Lorem Ipsum",
        gotSkill: 80,
        YTD: 24,
        target: 10,
        x: 72,
        y: 30,
        priority: 2,
        LM: 0,
        addedType: "Ongoing",
        type: "Enhance",
      },
      {
        id: randomId(),
        name: "Lorem Ipsum",
        gotSkill: 80,
        YTD: 24,
        target: 10,
        x: 81,
        y: 37,
        priority: 2,
        LM: 0,
        addedType: "Finished",
        type: "Enhance",
      },
      {
        id: randomId(),
        name: "Lorem Ipsum",
        gotSkill: 80,
        YTD: 24,
        target: 10,
        x: 92,
        y: 37,
        priority: 2,
        LM: 0,
        addedType: "Finished",
        type: "Enhance",
      },
      {
        id: randomId(),
        name: "Lorem Ipsum",
        gotSkill: 80,
        YTD: 24,
        target: 2000,
        x: 87,
        y: 24,
        priority: 2,
        LM: 150,
        addedType: "Ongoing",
        type: "Enhance",
      },
      {
        id: randomId(),
        name: "Lorem Ipsum",
        gotSkill: 80,
        YTD: 24,
        target: 10,
        x: 92,
        y: 54,
        priority: 2,
        LM: 45,
        addedType: "Finished",
        type: "Enhance",
      },
      {
        id: randomId(),
        name: "Lorem Ipsum",
        gotSkill: 80,
        YTD: 24,
        target: 120,
        x: 90,
        y: 80,
        priority: 2,
        LM: 40,
        addedType: "Ongoing",
        type: "Enhance",
      },
      {
        id: randomId(),
        name: "Lorem Ipsum",
        gotSkill: 80,
        YTD: 24,
        target: 90,
        x: 54,
        y: 68,
        priority: 2,
        LM: 10,
        addedType: "Finished",
        type: "Enhance",
      },
    ],
  },
  {
    type: "R&D",
    color: "rgba(251, 229, 214, 1)",
    id: "4",
    data: [],
  },
];
