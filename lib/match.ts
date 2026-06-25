import { services, stages, categories, type Stage, type CategoryId } from "@/data/seed-data";
import type { Service, Segment, Region, CompanySize } from "@/data/seed-data";

export type WizardAnswers = {
  stage: Stage;
  segments: Segment[];
  regions: Region[];
  goals: CategoryId[];
  companySize?: CompanySize;
};

function scoreService(service: Service, answers: WizardAnswers): number {
  let score = 0;
  const bf = service.bestFor;

  if (bf.stages.includes(answers.stage)) score += 3;

  const segmentMatches = answers.segments.filter((s) => bf.segments.includes(s)).length;
  score += segmentMatches * 2;

  const regionMatches = answers.regions.filter((r) => bf.regions.includes(r)).length;
  score += regionMatches;

  if (answers.companySize && bf.companySize.includes(answers.companySize)) score += 1;

  return score;
}

export function getMatchExplanation(service: Service, answers: WizardAnswers): string {
  const stageName =
    answers.stage === "nystartat"
      ? "nystartade"
      : answers.stage === "etablerat"
      ? "etablerade"
      : "väletablerade";

  const segmentNames: Record<Segment, string> = {
    rot: "ROT",
    nybyggnation: "nybyggnation",
    anlaggning: "anläggning",
    installation: "installation",
    el: "el",
    vvs: "VVS",
  };

  const matchedSegments = answers.segments.filter((s) =>
    service.bestFor.segments.includes(s)
  );

  if (matchedSegments.length > 0) {
    return `Bra för ${stageName} ${segmentNames[matchedSegments[0]]}-företag.`;
  }
  return `Passar ${stageName} företag.`;
}

export type CategoryResult = {
  categoryId: CategoryId;
  categoryName: string;
  services: Array<{ service: Service; explanation: string }>;
};

export function getRecommendations(answers: WizardAnswers): CategoryResult[] {
  const stage = stages.find((s) => s.id === answers.stage);
  if (!stage) return [];

  const priorityCategories =
    answers.goals.length > 0
      ? answers.goals
      : stage.priorityCategories;

  return priorityCategories.map((catId) => {
    const cat = categories.find((c) => c.id === catId)!;
    const categoryServices = services.filter((s) => s.category === catId);

    const scored = categoryServices
      .map((s) => ({ service: s, score: scoreService(s, answers) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    return {
      categoryId: catId,
      categoryName: cat.name,
      services: scored.map(({ service }) => ({
        service,
        explanation: getMatchExplanation(service, answers),
      })),
    };
  });
}

export function getStageRecommendations(stage: Stage): CategoryResult[] {
  return getRecommendations({
    stage,
    segments: [],
    regions: ["hela-sverige"],
    goals: [],
  });
}
