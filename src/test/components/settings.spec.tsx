import { fireEvent, render } from "@testing-library/react";
import Settings, {
  FormContainer,
  Table,
  TableRow,
  TableCell,
  HeadCell,
  Section,
  SectionHeadline,
  SelectorStyle,
} from "../../components/settings";
import { ISearchProviderProps } from "../../components/searchBar";
import { IThemeProps } from "../../lib/theme";

const themes: Array<IThemeProps> = [
  {
    label: "Classic",
    value: 0,
    mainColor: "#000000",
    accentColor: "#1e272e",
    backgroundColor: "#ffffff",
  },
  {
    label: "Classic",
    value: 0,
    mainColor: "#000000",
    accentColor: "#1e272e",
    backgroundColor: "#ffffff",
  },
];

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

const propsList = [
  {
    themes: themes,
    providers: providers,
  },
  {
    themes: themes,
    providers: undefined,
  },
  {
    themes: undefined,
    providers: providers,
  },
  {
    themes: undefined,
    providers: undefined,
  },
];

describe("settings.tsx", () => {
  const location: Location = window.location;
  8;

  beforeEach(() => {
    // @ts-ignore
    delete window.location;

    window.location = {
      ...location,
      reload: jest.fn(),
    };
  });

  it("Tests forms", () => {
    const { asFragment } = render(<FormContainer />);
    expect(asFragment).toMatchSnapshot();
  });

  it("Tests tables", () => {
    const { asFragment } = render(
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

    expect(asFragment).toMatchSnapshot();
  });

  it("Tests sections", () => {
    const { asFragment } = render(
      <Section>
        <SectionHeadline>Test</SectionHeadline>
      </Section>,
    );

    expect(asFragment).toMatchSnapshot();
  });

  it("Tests settings rendering", () => {
    propsList.forEach((props) => {
      const settings = render(
        <Settings themes={props.themes} providers={props.providers} />,
      );

      expect(settings.asFragment).toMatchSnapshot();
    });
  });

  // TODO: Finish this test
  it("Tests theme setting", () => {
    const settings = render(
      <Settings
        themes={propsList[0].themes}
        providers={propsList[0].providers}
      />,
    );

    const toggleButton = settings.getByTestId("toggle-button");

    const submitButton = settings.getByTestId("button-submit");
    const refreshButton = settings.getByTestId("button-refresh");

    fireEvent.click(toggleButton);

    fireEvent.click(submitButton);
  });
});
