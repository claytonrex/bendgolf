export type CourseId =
  | "quail_run"
  | "sunriver_meadows"
  | "juniper"
  | "pronghorn"
  | "caldera"
  | "crosswater";

export type Hole = {
  number: number;
  par: number;
  yardage: number | null;
  handicap?: number;
  defaultStrategy?: string;
};

export type Course = {
  id: CourseId;
  name: string;
  location: string;
  tee: string; // which tee these yardages are from
  holes: Hole[];
  website?: string;
  scorecardUrl?: string;
  notes?: string;
};

export const COURSES: Record<CourseId, Course> = {
  quail_run: {
    id: "quail_run",
    name: "Quail Run Golf Course",
    location: "La Pine, OR",
    tee: "White",
    website: "https://www.quailrungolf.com/",
    notes: "Par 72, Jim Ramey design (2006).",
    holes: [
      { number: 1, par: 4, yardage: 399, handicap: 5 },
      { number: 2, par: 3, yardage: 167, handicap: 15 },
      { number: 3, par: 4, yardage: 349, handicap: 13 },
      { number: 4, par: 5, yardage: 471, handicap: 11 },
      { number: 5, par: 4, yardage: 388, handicap: 9 },
      { number: 6, par: 5, yardage: 504, handicap: 7 },
      { number: 7, par: 4, yardage: 407, handicap: 3 },
      { number: 8, par: 3, yardage: 136, handicap: 17 },
      { number: 9, par: 4, yardage: 433, handicap: 1 },
      { number: 10, par: 3, yardage: 158, handicap: 18 },
      { number: 11, par: 4, yardage: 385, handicap: 10 },
      { number: 12, par: 5, yardage: 473, handicap: 16 },
      { number: 13, par: 4, yardage: 329, handicap: 12 },
      { number: 14, par: 3, yardage: 138, handicap: 14 },
      { number: 15, par: 4, yardage: 365, handicap: 8 },
      { number: 16, par: 4, yardage: 381, handicap: 4 },
      { number: 17, par: 5, yardage: 468, handicap: 6 },
      { number: 18, par: 4, yardage: 402, handicap: 2 },
    ],
  },
  sunriver_meadows: {
    id: "sunriver_meadows",
    name: "Sunriver Meadows",
    location: "Sunriver, OR",
    tee: "White",
    website: "https://www.sunriverresort.com/golf/meadows-course",
    notes: "Par 71, John Fought redesign. White tees ~6,314 yds.",
    holes: [
      { number: 1, par: 4, yardage: 357 },
      { number: 2, par: 5, yardage: 497 },
      { number: 3, par: 4, yardage: 405 },
      { number: 4, par: 3, yardage: 146 },
      { number: 5, par: 4, yardage: 310 },
      { number: 6, par: 4, yardage: 322 },
      { number: 7, par: 4, yardage: 387 },
      { number: 8, par: 3, yardage: 174 },
      { number: 9, par: 4, yardage: 360 },
      { number: 10, par: 5, yardage: 499 },
      { number: 11, par: 4, yardage: 357 },
      { number: 12, par: 4, yardage: 351 },
      { number: 13, par: 3, yardage: 165 },
      { number: 14, par: 4, yardage: 350 },
      { number: 15, par: 4, yardage: 326 },
      { number: 16, par: 3, yardage: 158 },
      { number: 17, par: 5, yardage: 490 },
      { number: 18, par: 4, yardage: 368 },
    ],
  },
  juniper: {
    id: "juniper",
    name: "Juniper Golf Course",
    location: "Redmond, OR",
    tee: "White",
    website: "https://www.playjuniper.com/",
    notes: "Par 72, John Harbottle III design (2005). White tees ~6,063 yds.",
    holes: [
      { number: 1, par: 4, yardage: 366, handicap: 5 },
      { number: 2, par: 4, yardage: 336, handicap: 11 },
      { number: 3, par: 3, yardage: 133, handicap: 17 },
      { number: 4, par: 4, yardage: 310, handicap: 13 },
      { number: 5, par: 4, yardage: 391, handicap: 9 },
      { number: 6, par: 5, yardage: 553, handicap: 1 },
      { number: 7, par: 5, yardage: 496, handicap: 3 },
      { number: 8, par: 3, yardage: 180, handicap: 15 },
      { number: 9, par: 4, yardage: 402, handicap: 7 },
      { number: 10, par: 5, yardage: 469, handicap: 2 },
      { number: 11, par: 4, yardage: 358, handicap: 6 },
      { number: 12, par: 4, yardage: 252, handicap: 10 },
      { number: 13, par: 3, yardage: 118, handicap: 18 },
      { number: 14, par: 4, yardage: 340, handicap: 12 },
      { number: 15, par: 4, yardage: 341, handicap: 14 },
      { number: 16, par: 3, yardage: 157, handicap: 16 },
      { number: 17, par: 4, yardage: 399, handicap: 4 },
      { number: 18, par: 5, yardage: 462, handicap: 8 },
    ],
  },
  pronghorn: {
    id: "pronghorn",
    name: "Pronghorn — Nicklaus Course",
    location: "Bend, OR (Juniper Preserve)",
    tee: "Rust",
    website: "https://pronghorn.com/golf/nicklaus-course",
    scorecardUrl: "https://pronghornresort.com/wp-content/uploads/2018/06/Pronghorn-Resort-Jack-Nicklause-Scorecard.pdf",
    notes: "Par 72, Jack Nicklaus Signature. Rust tees 6,533 yds (70.8/138). Comfort stations on 7 & 13.",
    holes: [
      { number: 1, par: 4, yardage: 355, handicap: 17 },
      { number: 2, par: 5, yardage: 524, handicap: 7 },
      { number: 3, par: 3, yardage: 203, handicap: 11 },
      { number: 4, par: 4, yardage: 300, handicap: 15 },
      { number: 5, par: 4, yardage: 400, handicap: 9 },
      { number: 6, par: 4, yardage: 445, handicap: 3 },
      { number: 7, par: 3, yardage: 137, handicap: 13 },
      { number: 8, par: 5, yardage: 589, handicap: 1 },
      { number: 9, par: 4, yardage: 392, handicap: 5 },
      { number: 10, par: 4, yardage: 419, handicap: 4 },
      { number: 11, par: 4, yardage: 407, handicap: 6 },
      { number: 12, par: 4, yardage: 281, handicap: 12 },
      { number: 13, par: 4, yardage: 330, handicap: 14 },
      { number: 14, par: 3, yardage: 152, handicap: 18 },
      { number: 15, par: 5, yardage: 498, handicap: 2 },
      { number: 16, par: 5, yardage: 506, handicap: 10 },
      { number: 17, par: 3, yardage: 177, handicap: 16 },
      { number: 18, par: 4, yardage: 418, handicap: 8 },
    ],
  },
  caldera: {
    id: "caldera",
    name: "Caldera Links",
    location: "Sunriver, OR",
    tee: "Blue",
    website: "https://www.sunriverresort.com/play/golf-caldera-springs",
    notes: "9-hole par 3 course. Robert Cupp & Jim Ramey (2007). Yardages approximate.",
    holes: [
      { number: 1, par: 3, yardage: 100 },
      { number: 2, par: 3, yardage: 120 },
      { number: 3, par: 3, yardage: 115 },
      { number: 4, par: 3, yardage: 130 },
      { number: 5, par: 3, yardage: 120 },
      { number: 6, par: 3, yardage: 140 },
      { number: 7, par: 3, yardage: 145 },
      { number: 8, par: 3, yardage: 172 },
      { number: 9, par: 3, yardage: 100 },
    ],
  },
  crosswater: {
    id: "crosswater",
    name: "Sunriver Crosswater Course",
    location: "Sunriver, OR",
    tee: "White",
    website: "https://www.sunriverresort.com/golf/crosswater-course",
    notes: "Par 72, Robert E. Cupp design (1995). White tees ~6,185 yds. Premier course on property.",
    holes: [
      { number: 1, par: 4, yardage: 320 },
      { number: 2, par: 5, yardage: 485 },
      { number: 3, par: 3, yardage: 160 },
      { number: 4, par: 4, yardage: 344 },
      { number: 5, par: 4, yardage: 357 },
      { number: 6, par: 5, yardage: 471 },
      { number: 7, par: 3, yardage: 177 },
      { number: 8, par: 4, yardage: 336 },
      { number: 9, par: 4, yardage: 355 },
      { number: 10, par: 4, yardage: 334 },
      { number: 11, par: 4, yardage: 386 },
      { number: 12, par: 5, yardage: 572 },
      { number: 13, par: 3, yardage: 137 },
      { number: 14, par: 4, yardage: 343 },
      { number: 15, par: 4, yardage: 347 },
      { number: 16, par: 5, yardage: 503 },
      { number: 17, par: 3, yardage: 204 },
      { number: 18, par: 4, yardage: 354 },
    ],
  },
};

export const COURSE_ORDER: CourseId[] = [
  "quail_run",
  "sunriver_meadows",
  "juniper",
  "pronghorn",
  "caldera",
  "crosswater",
];
