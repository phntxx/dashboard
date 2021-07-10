import { ok } from "assert";
import useFetcher, {
  defaults,
  handleResponse,
  handleError,
  fetchProduction,
  fetchDevelopment,
} from "../../lib/fetcher";

describe("fetcher.tsx", () => {
  it("Tests handleResponse", () => {});

  it("Tests handleError", () => {
    expect(handleError("apps", Error("Test!"))).toEqual({
      ...defaults.app,
      error: "Test!",
    });

    expect(handleError("bookmark", Error("Test!"))).toEqual({
      ...defaults.bookmark,
      error: "Test!",
    });

    expect(handleError("searchProvider", Error("Test!"))).toEqual({
      ...defaults.search,
      error: "Test!",
    });

    expect(handleError("theme", Error("Test!"))).toEqual({
      ...defaults.theme,
      error: "Test!",
    });

    expect(handleError("imprint", Error("Test!"))).toEqual({
      ...defaults.imprint,
      error: "Test!",
    });

    expect(handleError("greeter", Error("Test!"))).toEqual({
      ...defaults.greeter,
      error: "Test!",
    });

    expect(handleError("", Error("Test!"))).toEqual(undefined);
  });
});
