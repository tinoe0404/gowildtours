import prisma from "./lib/db";
async function main() {
  console.log("Testing db connection...");
  const users = await prisma.siteSetting.findMany({ take: 1 });
  console.log("Success:", users);
}
main().catch(console.error);
