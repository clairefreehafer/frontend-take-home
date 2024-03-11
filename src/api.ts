
const SEARCH_URL = "https://api.npms.io/v2/search/suggestions?q=";

export type Package = {
  name: string;
  description: string;
  npmLink: string;
}

export async function fetchSearch(query: string): Promise<Package[]> {
  try {
    const results = await fetch(`${SEARCH_URL}${query}`)
    const resultsJson = await results.json();

    // ideally this would be typed better, but keeping it generic for now.
    return resultsJson.map((result: { [key: string]: any }) => ({
      name: result.package.name,
      description: result.package.description,
      npmLink: result.package.links.npm,
    }));
  } catch (e) {
    console.error(e);
  }

  return [];
}
