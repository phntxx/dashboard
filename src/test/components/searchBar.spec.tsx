import { fireEvent, render } from "@testing-library/react";
import SearchBar, {
  handleQueryWithProvider,
  ISearchProviderProps,
  ISearchBarProps,
} from "../../components/searchBar";

const providers: Array<ISearchProviderProps> = [
  {
    name: "Allmusic",
    url: "https://www.allmusic.com/search/all/",
    prefix: "/a",
  },
  {
    name: "Discogs",
    url: "https://www.discogs.com/search/?q=",
    prefix: "/di",
  },
  {
    name: "Duck Duck Go",
    url: "https://duckduckgo.com/?q=",
    prefix: "/d",
  },
];

const setup = () => {
  const searchBar = render(<SearchBar providers={providers} />);
  const input = searchBar.getByTestId("search-input");
  const clearButton = searchBar.getByTestId("search-clear");
  const submitButton = searchBar.getByTestId("search-submit");

  return {
    searchBar,
    input,
    clearButton,
    submitButton,
  };
};

describe("searchBar.tsx", () => {
  beforeEach(() => {
    delete global.window.location;
    global.window = Object.create(window);
    global.window.location = {
      port: "123",
      protocol: "http:",
      hostname: "localhost",
    };
  });

  it("Tests SearchBar rendering", () => {
    const { asFragment } = render(<SearchBar providers={providers} />);
    expect(asFragment).toMatchSnapshot();
  });

  it("Tests handleQueryWithProvider", () => {
    providers.forEach((provider: ISearchProviderProps) => {
      handleQueryWithProvider(providers, provider.prefix + " test");
      expect(window.location.href).toEqual(provider.url + "test");
    });
  });

  it("Tests handleQueryWithProvider default", () => {
    handleQueryWithProvider(providers, "test");
    expect(window.location.href).toEqual("https://google.com/search?q=test");
  });

  it("Tests handleQueryWithProvider without providers", () => {
    handleQueryWithProvider(undefined, "test");
    expect(window.location.href).toEqual("https://google.com/search?q=test");
  });

  it("Tests SearchBar component with default search", () => {
    const { input, submitButton } = setup();
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.click(submitButton);

    expect(window.location.href).toEqual("https://google.com/search?q=test");
  });

  it("Tests SearchBar component with other search", () => {
    const { input, submitButton } = setup();

    fireEvent.change(input, { target: { value: "/a test" } });
    fireEvent.click(submitButton);

    expect(window.location.href).toEqual(
      "https://www.allmusic.com/search/all/test",
    );
  });

  it("Tests SearchBar component clear", () => {
    const { input, clearButton, submitButton } = setup();

    fireEvent.change(input, { target: { value: "/a test" } });
    fireEvent.click(clearButton);
    fireEvent.click(submitButton);

    expect(window.location.href).toEqual("https://google.com/search?q=");
  });
});
