export type PlayerId = "clifton" | "clayton" | "matt" | "joey";
export type TeamId = "team1" | "team2";

export const PLAYERS: Record<PlayerId, { name: string; team: TeamId }> = {
  clifton: { name: "Clifton Curry", team: "team1" },
  clayton: { name: "Clayton Lamb", team: "team1" },
  matt: { name: "Matt McDonald", team: "team2" },
  joey: { name: "Joey Prather", team: "team2" },
};

export const TEAMS: Record<TeamId, { name: string; members: PlayerId[] }> = {
  team1: { name: "Curry / Lamb", members: ["clifton", "clayton"] },
  team2: { name: "McDonald / Prather", members: ["matt", "joey"] },
};

export const PLAYER_ORDER: PlayerId[] = ["clifton", "clayton", "matt", "joey"];

export type GameFormat =
  | "team_net_best_ball"
  | "team_random_format"
  | "team_modified_stableford"
  | "team_net_best_ball_championship"
  | "solo_four_strikes"
  | "solo_stroke_play";

export type RoundId =
  | "wed_am"
  | "wed_pm"
  | "thu_am"
  | "fri_am"
  | "fri_pm"
  | "sat_am"
  | "sat_pm";

export type Round = {
  id: RoundId;
  day: string;
  date: string;
  slot: "AM" | "PM";
  course: string;
  teeTime: string;
  format: GameFormat;
  formatLabel: string;
  isCupMatch: boolean;
  isSolo: boolean;
  isChampionship?: boolean;
  cost: string;
  notes?: string;
  website?: string;
};

export const ROUNDS: Round[] = [
  {
    id: "wed_am",
    day: "Wednesday",
    date: "2026-06-10",
    slot: "AM",
    course: "Quail Run Golf Course",
    teeTime: "8:12 AM",
    format: "team_net_best_ball",
    formatLabel: "Team Net Best Ball",
    isCupMatch: true,
    isSolo: false,
    cost: "$95 walk / $115 cart / $125 scooter",
    notes: "16725 Northridge Dr, La Pine, OR",
  },
  {
    id: "wed_pm",
    day: "Wednesday",
    date: "2026-06-10",
    slot: "PM",
    course: "Quail Run Golf Course (Twilight)",
    teeTime: "2:30 PM",
    format: "team_random_format",
    formatLabel: "Random Team Format",
    isCupMatch: true,
    isSolo: false,
    cost: "$60 walk / $75 cart / $90 scooter",
    notes: "Team selects each hole at lunch (see score sheet)",
  },
  {
    id: "thu_am",
    day: "Thursday",
    date: "2026-06-11",
    slot: "AM",
    course: "Sunriver Meadows",
    teeTime: "8:40 AM",
    format: "solo_four_strikes",
    formatLabel: "Four Strikes and You're Out",
    isCupMatch: false,
    isSolo: true,
    cost: "$185",
    notes: "Handicaps used. Worst net score on hole = strike. 4 strikes = out.",
  },
  {
    id: "fri_am",
    day: "Friday",
    date: "2026-06-12",
    slot: "AM",
    course: "Juniper Golf Course",
    teeTime: "~8:00 AM",
    format: "team_modified_stableford",
    formatLabel: "Team Net Modified Stableford (with multiplier)",
    isCupMatch: true,
    isSolo: false,
    cost: "$120 with Cart",
    notes: "Book 60 days out — still need to book.",
  },
  {
    id: "fri_pm",
    day: "Friday",
    date: "2026-06-12",
    slot: "PM",
    course: "Pronghorn — Nicklaus Course",
    teeTime: "3:00 PM",
    format: "team_net_best_ball",
    formatLabel: "Team Net Best Ball",
    isCupMatch: true,
    isSolo: false,
    cost: "$149 walking",
    website: "https://pronghorn.com/golf/nicklaus-course",
  },
  {
    id: "sat_am",
    day: "Saturday",
    date: "2026-06-13",
    slot: "AM",
    course: "Caldera Links (Short Course)",
    teeTime: "8:00 AM",
    format: "solo_stroke_play",
    formatLabel: "Solo Stroke Play (No Handicap)",
    isCupMatch: false,
    isSolo: true,
    cost: "$80 first round / $15 replay",
    notes: "9 or 18 holes pending time. Gross score only — lowest wins.",
  },
  {
    id: "sat_pm",
    day: "Saturday",
    date: "2026-06-13",
    slot: "PM",
    course: "Sunriver Crosswater Course",
    teeTime: "3:00 PM",
    format: "team_net_best_ball_championship",
    formatLabel: "Team Net Best Ball — Championship",
    isCupMatch: true,
    isSolo: false,
    isChampionship: true,
    cost: "$250",
    notes: "Team starts up holes based on cup matches won during the week.",
  },
];

export type DayPlan = {
  date: string;
  day: string;
  title: string;
  items: { time?: string; label: string; detail?: string; kind?: "golf" | "meal" | "travel" | "activity" }[];
};

export const DAYS: DayPlan[] = [
  {
    date: "2026-06-08",
    day: "Monday",
    title: "Pack & Prep",
    items: [
      { label: "Load vehicle for early departure", kind: "travel" },
      { label: "Bring cereal, protein bars, drinks, etc.", kind: "activity" },
    ],
  },
  {
    date: "2026-06-09",
    day: "Tuesday",
    title: "Travel Day",
    items: [
      { time: "5:30 AM", label: "Leave — drive to Bend, OR", kind: "travel" },
      { time: "2:30–3:00 PM", label: "Pick up Clayton", detail: "Redmond Airport or Juniper Golf Course", kind: "travel" },
      { time: "4:00 PM", label: "Check in to Sunriver house & unpack", kind: "activity" },
      { time: "5:30 PM", label: "Dinner — Village Bar & Grill", kind: "meal" },
      { label: "Driving range / putting green ($20 putting course)", kind: "activity" },
      { label: "Hot tub & unwind", kind: "activity" },
    ],
  },
  {
    date: "2026-06-10",
    day: "Wednesday",
    title: "Day 2 — Two Rounds (Team Games)",
    items: [
      { label: "Breakfast — House or Brewed Awakenings", detail: "57100 Beaver Dr, Sunriver, OR", kind: "meal" },
      { time: "8:12 AM", label: "Quail Run — Team Net Best Ball (Cup Match)", kind: "golf" },
      { label: "Lunch — Legends Cider Company", detail: "16481 Bluewood Pl, La Pine, OR", kind: "meal" },
      { time: "2:30 PM", label: "Quail Run Twilight — Random Team Format (Cup Match)", kind: "golf" },
    ],
  },
  {
    date: "2026-06-11",
    day: "Thursday",
    title: "Day 3 — One Round (Solo + Rec + Trivia)",
    items: [
      { label: "Breakfast — House or Brewed Awakenings", kind: "meal" },
      { time: "8:40 AM", label: "Sunriver Meadows — Four Strikes (Solo)", kind: "golf" },
      { label: "Lunch — Josie K's Deli & Kitchen", detail: "56870 Venture Ln, Sunriver, OR", kind: "meal" },
      { label: "Resort activities / games / free time", kind: "activity" },
      { label: "Dinner & resort activities — or Bend + Trivia", kind: "meal" },
      { label: "Trivia options:", detail: "Ponch's Place 6 PM • Wonderland Chicken 7 PM • Bridge 99 Brewery 6:30 PM • Silver Moon 7 PM", kind: "activity" },
    ],
  },
  {
    date: "2026-06-12",
    day: "Friday",
    title: "Day 4 — Two Rounds (Team Games)",
    items: [
      { time: "~8:00 AM", label: "Juniper — Team Net Modified Stableford (Cup Match)", kind: "golf" },
      { label: "Lunch — Coastal Smash or The Landing", detail: "639 SW 8th St, Redmond • 1865 NW Hemlock Ave", kind: "meal" },
      { time: "3:00 PM", label: "Pronghorn Nicklaus — Team Net Best Ball (Cup Match)", kind: "golf" },
    ],
  },
  {
    date: "2026-06-13",
    day: "Saturday",
    title: "Day 5 — Finals Day",
    items: [
      { time: "8:00 AM", label: "Caldera Links — Solo Stroke Play", kind: "golf" },
      { label: "Lunch — Sunriver Pub", kind: "meal" },
      { time: "3:00 PM", label: "Crosswater — Team Championship + Final Solo Points", kind: "golf" },
    ],
  },
  {
    date: "2026-06-14",
    day: "Sunday",
    title: "Departure",
    items: [
      { time: "4:30 AM", label: "Take Clayton to airport", kind: "travel" },
      { label: "Head home", kind: "travel" },
    ],
  },
];

export const TRIP_START = "2026-06-09";
export const TRIP_END = "2026-06-14";
