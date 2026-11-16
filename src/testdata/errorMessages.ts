export function getProtectedRouteError(pagePath: string) {
  return `You can only access '${pagePath}' when you are logged in.`;
}
