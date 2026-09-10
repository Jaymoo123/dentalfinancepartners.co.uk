import {
  Building2,
  Coins,
  DoorOpen,
  FlaskConical,
  FolderOpen,
  Landmark,
  MonitorSmartphone,
  Receipt,
  UserCheck,
  Users,
} from "lucide-react";
import type { Prompt } from "@accounting-network/web-shared/design/marketing/PromptMarquee";

/**
 * Self-identification prompts for the homepage "Sound familiar?" band.
 *
 * Set verbatim from docs/generalist/_port/DISPOSITION_SLICE1.md §B. They are
 * deliberately UNATTRIBUTED and must stay that way: they are things a reader
 * would say about their own position, not client quotes. The set must stay EVEN
 * in length, or the marquee's zigzag flips where the duplicated loop joins.
 */
export const HOME_PROMPTS: Prompt[] = [
  {
    tag: "Structure",
    text: "I have been a sole trader for three years and I still do not know if I should be a limited company.",
    icon: Building2,
  },
  {
    tag: "Director pay",
    text: "I take a bit of salary and a bit of dividend because someone told me to, and I have never checked the split.",
    icon: Coins,
  },
  {
    tag: "VAT",
    text: "Turnover is creeping towards the VAT threshold and I do not know what happens the month I cross it.",
    icon: Receipt,
  },
  {
    tag: "Making Tax Digital",
    text: "I keep getting emails about Making Tax Digital and I cannot tell which of them apply to me.",
    icon: MonitorSmartphone,
  },
  {
    tag: "Payroll",
    text: "I am about to take on my first employee and I have no idea what I am signing up for.",
    icon: Users,
  },
  {
    tag: "Corporation tax",
    text: "The company made more than I expected this year and now I am worried about the bill.",
    icon: Landmark,
  },
  {
    tag: "Bookkeeping",
    text: "My records are a bank feed and a shoebox, and year end is in eight weeks.",
    icon: FolderOpen,
  },
  {
    tag: "R&D",
    text: "We build our own software and people keep telling me there is a tax credit, but nobody will tell me if we qualify.",
    icon: FlaskConical,
  },
  {
    tag: "Accountant fit",
    text: "My accountant files the accounts and never once has told me anything I did not already know.",
    icon: UserCheck,
  },
  {
    tag: "Exit",
    text: "I might sell in two years and I do not know what I should be doing now to make that go well.",
    icon: DoorOpen,
  },
];
