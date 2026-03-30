import { prisma } from "@/lib/prisma";

export async function calculateHireability(userId: string) {
  // 1. Get all topic mastery for the user
  const masteries = await prisma.userTopicMastery.findMany({
    where: { userId },
  });

  if (masteries.length === 0) return 0;

  // 2. Simple Weighted Score: (Sum of Avg Scores / Number of Topics) * (Factor of attempts)
  const totalAvgScore = masteries.reduce((acc, m) => acc + m.averageScore, 0);
  const baseScore = totalAvgScore / masteries.length;
  
  // Cap it at 100
  const finalScore = Math.min(100, Math.round(baseScore));

  // 3. Update User Score
  await prisma.user.update({
    where: { id: userId },
    data: { hireabilityScore: finalScore },
  });

  return finalScore;
}

export async function updateGlobalRanks() {
  // This is a simplified ranking update. In a large app, this would be a background job.
  const users = await prisma.user.findMany({
    orderBy: { hireabilityScore: "desc" },
  });

  for (let i = 0; i < users.length; i++) {
    await prisma.user.update({
      where: { id: users[i].id },
      data: { overallRank: i + 1 },
    });
  }
}

export async function updateTopicRanks(topicId: string) {
  const masteries = await prisma.userTopicMastery.findMany({
    where: { topicId },
    orderBy: { averageScore: "desc" },
  });

  for (let i = 0; i < masteries.length; i++) {
    await prisma.userTopicMastery.update({
      where: { id: masteries[i].id },
      data: { rank: i + 1 },
    });
  }
}
