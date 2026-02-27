/**
 * @description Extracts a safe redirect path from search params, preventing open redirect attacks.
 * Uses a query param (not React Router state) to survive external OAuth redirects (e.g. Cognito).
 * @returns A validated relative path or "/" as fallback
 */
export const getSafeRedirectPath = (
  searchParams: URLSearchParams,
): string => {
  const redirect = searchParams.get("redirect");

  if (
    redirect &&
    redirect.startsWith("/") &&
    !redirect.startsWith("//") &&
    !redirect.includes(":")
  ) {
    return redirect;
  }

  return "/";
};
