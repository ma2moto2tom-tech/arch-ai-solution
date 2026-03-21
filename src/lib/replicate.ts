import Replicate from "replicate";

let replicateClient: Replicate | null = null;

export function getReplicateClient(): Replicate | null {
  if (!process.env.REPLICATE_API_TOKEN) return null;
  if (!replicateClient) {
    replicateClient = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });
  }
  return replicateClient;
}

export function isReplicateConfigured(): boolean {
  return !!process.env.REPLICATE_API_TOKEN;
}
