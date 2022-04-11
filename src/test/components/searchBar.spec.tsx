import { fireEvent, render } from "@testing-library/react";
import SearchBar, {
  handleQueryWithProvider,
  ISearchProviderProps,
  ISearchProps,
} from "../../components/searchBar";

const defaultProps: ISearchProps = {
  defaultProvider: "https://test.com?q=",
  placeholder: "",
  providers: [
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
  ],
};

const setup = (props: ISearchProps = defaultProps) => {
  const searchBar = render(<SearchBar search={props} />);
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

const location: Location = window.location;

describe("searchBar.tsx", () => {
  beforeEach(() => {
    // @ts-ignore
    delete window.location;

    window.location = {
      ...location,
      reload: jest.fn(),
    };
  });

  it("Tests SearchBar rendering with properties", () => {
    const { searchBar } = setup();
    expect(searchBar.baseElement).toMatchSnapshot();
  });

  it("Tests searchBar rendering without properties", () => {
    const searchBar = render(<SearchBar />);
    expect(searchBar.baseElement).toMatchSnapshot();
  });

  it("Tests handleQueryWithProvider", () => {
    defaultProps.providers?.forEach((provider: ISearchProviderProps) => {
      handleQueryWithProvider(defaultProps, provider.prefix + " test");
      expect(window.location.href).toEqual(provider.url + "test");
    });
  });

  it("Tests handleQueryWithProvider default", () => {
    handleQueryWithProvider(defaultProps, "test");
    expect(window.location.href).toEqual(defaultProps.defaultProvider + "test");
  });

  it("Tests handleQueryWithProvider without providers", () => {
    const test: ISearchProps = {
      defaultProvider: "https://test.com?q=",
      placeholder: "",
      providers: undefined,
    };

    handleQueryWithProvider(test, "test");
    expect(window.location.href).toEqual(test.defaultProvider + "test");
  });

  it("Tests SearchBar with autoFocus not set", () => {
    const { input } = setup();
    expect(input).not.toHaveFocus();
  });

  it("Tests SearchBar with autoFocus set to true", () => {
    const { input } = setup({ ...defaultProps, autoFocus: true });
    expect(input).toHaveFocus();
  });

  it("Tests SearchBar with autoFocus set to false", () => {
    const { input } = setup({ ...defaultProps, autoFocus: false });
    expect(input).not.toHaveFocus();
  });

  it("Tests SearchBar component with default search", () => {
    const { input, submitButton } = setup();
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.click(submitButton);

    expect(window.location.href).toEqual(defaultProps.defaultProvider + "test");
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

    expect(window.location.href).toEqual(defaultProps.defaultProvider);
  });
});
