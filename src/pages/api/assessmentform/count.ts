import StudentNeedsForm from "@/models/forms/StudentNeedsForm";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const form = {
        needsAssistance: {
          anxiety: 0,
          depression: 0,
        },
        pushedLimitsResponse: {
          attemptedToEndLife: 0,
          thoughtBetterDead: 0,
          hurtMySelf: 0,
        },
        iFindMyself: {
          havingSuicidal: 0,
        },
      };
      form.needsAssistance.anxiety = await StudentNeedsForm.countDocuments({
        needsAssistance: { $in: ["Anxiety"] },
      });
      form.needsAssistance.depression = await StudentNeedsForm.countDocuments({
        needsAssistance: { $in: ["Depression/Sadness"] },
      });

      form.pushedLimitsResponse.attemptedToEndLife =
        await StudentNeedsForm.countDocuments({
          pushedLimitsResponse: { $in: ["Attempted to end my life"] },
        });
      form.pushedLimitsResponse.thoughtBetterDead =
        await StudentNeedsForm.countDocuments({
          pushedLimitsResponse: { $in: ["Thought it would be better dead"] },
        });
      form.pushedLimitsResponse.hurtMySelf =
        await StudentNeedsForm.countDocuments({
          pushedLimitsResponse: { $in: ["Hurt myself"] },
        });

      form.iFindMyself.havingSuicidal = await StudentNeedsForm.countDocuments({
        iFindMyself: { $in: ["Having suicidal thoughts"] },
      });

      res.json(form);
      return;

    default:
      return;
  }
}
