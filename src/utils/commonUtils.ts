export function getRequiredEnvValue(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is required. Check your .env file against .env.example.`);
  }
  return value;
}
