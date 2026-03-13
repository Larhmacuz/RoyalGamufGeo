import { z } from "zod";

const SIZE_MAP = {
  bungalow: {
    3: 140,
    4: 180,
  },
  duplex: {
    4: 260,
    5: 320,
  },
} as const;

const COST_PER_SQM = {
  basic: 220000,
  standard: 320000,
  luxury: 450000,
} as const;

const LOCATION_MULTIPLIER = {
  lagos: 1.15,
  abuja: 1.1,
  other: 1,
} as const;

export const estimatorInputSchema = z.object({
  bedrooms: z.number().int().min(3).max(5),
  houseType: z.enum(["bungalow", "duplex"]),
  finish: z.enum(["basic", "standard", "luxury"]),
  location: z.enum(["lagos", "abuja", "other"]),
}).superRefine((input, ctx) => {
  const supportedSizes = SIZE_MAP[input.houseType];
  if (!(input.bedrooms in supportedSizes)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["bedrooms"],
      message: `Unsupported bedroom count for ${input.houseType}`,
    });
  }
});

export type EstimatorInput = z.infer<typeof estimatorInputSchema>;

export interface EstimateResult {
  estimatedSize: number;
  costPerSqm: number;
  constructionCost: number;
  professionalFees: number;
  contingency: number;
  totalLow: number;
  totalHigh: number;
}

export function estimateBuildingCost(input: EstimatorInput): EstimateResult {
  const estimatedSize = SIZE_MAP[input.houseType][input.bedrooms as keyof typeof SIZE_MAP[typeof input.houseType]];
  const costPerSqm = COST_PER_SQM[input.finish];
  const locationMultiplier = LOCATION_MULTIPLIER[input.location];

  const constructionCost = estimatedSize * costPerSqm * locationMultiplier;
  const professionalFees = constructionCost * 0.07;
  const contingency = constructionCost * 0.1;
  const total = constructionCost + professionalFees + contingency;

  return {
    estimatedSize,
    costPerSqm,
    constructionCost,
    professionalFees,
    contingency,
    totalLow: total * 0.9,
    totalHigh: total * 1.1,
  };
}
