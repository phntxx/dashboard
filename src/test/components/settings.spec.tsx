import { fireEvent, render } from "@testing-library/react";
import Settings, {
  FormContainer,
  Table,
  TableRow,
  TableCell,
  HeadCell,
  Section,
  SectionHeadline,
} from "../../components/settings";
import { ISearchProps } from "../../components/searchBar";
import { IThemeDataProps } from "../../lib/useTheme";

const themes: IThemeDataProps = {
  themes: [
    {
      label: "Classic",
      value: 0,
      mainColor: "#000000",
      accentColor: "#1e272e",
      backgroundColor: "#ffffff",
    },
    {
      label: "Classic",
      value: 1,
      mainColor: "#000000",
      accentColor: "#1e272e",
      backgroundColor: "#ffffff",
    },
  ],
};

const search: ISearchProps = {
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

const propsList = [
  {
    themes: themes,
    search: search,
  },
  {
    themes: themes,
    search: undefined,
  },
  {
    themes: undefined,
    search: search,
  },
  {
    themes: undefined,
    search: undefined,
  },
];

describe("settings.tsx", () => {
  const location: Location = window.location;

  beforeEach(() => {
    // @ts-ignore
    delete window.location;

    window.location = {
      ...location,
      reload: jest.fn(),
    };
  });

  it("Tests forms", () => {
    const { baseElement } = render(<FormContainer />);
    expect(baseElement).toMatchSnapshot();
  });

  it("Tests tables", () => {
    const { baseElement } = render(
      <Table>
        <tbody>
          <TableRow>
            <HeadCell>Test</HeadCell>
          </TableRow>
          <TableRow>
            <TableCell>Test</TableCell>
          </TableRow>
        </tbody>
      </Table>,
    );

    expect(baseElement).toMatchSnapshot();
  });

  it("Tests sections", () => {
    const { baseElement } = render(
      <Section>
        <SectionHeadline>Test</SectionHeadline>
      </Section>,
    );

    expect(baseElement).toMatchSnapshot();
  });

  it("Tests settings rendering", () => {
    propsList.forEach((props) => {
      const { baseElement } = render(
        <Settings themes={props.themes} search={props.search} />,
      );

      expect(baseElement).toMatchSnapshot();
    });
  });

  it("Tests submit button", () => {
    const settings = render(<Settings themes={themes} search={search} />);

    fireEvent.click(settings.getByTestId("button-refresh"));
    expect(window.location.reload).toHaveBeenCalledTimes(1);
  });

  it("Tests light theme selection", () => {
    const settings = render(<Settings themes={themes} search={search} />);

    fireEvent.change(settings.getByTestId("select-light"), {
      target: { value: 0 },
    });

    fireEvent.click(settings.getByTestId("button-submit"));
    expect(window.location.reload).toHaveBeenCalledTimes(1);
  });

  it("Tests dark theme selection", () => {
    const settings = render(<Settings themes={themes} search={search} />);

    fireEvent.change(settings.getByTestId("select-dark"), {
      target: { value: 0 },
    });

    fireEvent.click(settings.getByTestId("button-submit"));
    expect(window.location.reload).toHaveBeenCalledTimes(1);
  });

  it("Tests theme selection", () => {
    const settings = render(<Settings themes={themes} search={search} />);

    fireEvent.change(settings.getByTestId("select-light"), {
      target: { value: 5 },
    });

    fireEvent.click(settings.getByTestId("button-submit"));
    expect(window.location.reload).toHaveBeenCalledTimes(0);
  });
});
