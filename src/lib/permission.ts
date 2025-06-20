import { subScriptionLevel } from "./subscription";

export default function canCreateResume(
  subsLevel: subScriptionLevel,
  currResCount: number
) {
  const maxResumeMap: Record<subScriptionLevel, number> = {
    free: 2,
    premium: Infinity,
  };
  const maxResumes = maxResumeMap[subsLevel];
  return currResCount < maxResumes;
}

// need to add check for additional templates for free users