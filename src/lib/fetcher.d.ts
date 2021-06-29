import { ISearchProps } from "../components/searchBar";
import { IBookmarkGroupProps } from "../components/bookmarks";
import { IAppCategoryProps } from "../components/appCategory";
import { IAppProps } from "../components/app";
import { IThemeProps } from "./theme";
import { IImprintProps } from "../components/imprint";
import { IGreeterProps } from "../components/greeter";

declare module "../data/apps.json" {
  export const categories: IAppCategoryProps[];
  export const apps: IAppProps[];
}

declare module "../data/search.json" {
  export const search: ISearchProps;
}

declare module "../data/bookmarks.json" {
  export const groups: IBookmarkGroupProps[];
}

declare module "../data/themes.json" {
  export const themes: IThemeProps[];
}

declare module "../data/imprint.json" {
  export const imprint: IImprintProps;
}

declare module "../data/greeter.json" {
  export const greeter: IGreeterProps;
}
