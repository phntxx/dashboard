import React, { useCallback, useEffect, useState } from "react";
import { AppCategory } from "./appCategory";

import {
  handleResponse,
  Headline,
  ListContainer,
  ErrorMessage,
} from "./elements";

const useAppData = () => {
  const [appData, setAppData] = useState({
    categories: [],
    apps: [],
    error: false,
  });
  const fetchAppData = useCallback(() => {
    (process.env.NODE_ENV === "production"
      ? fetch("/data/apps.json").then(handleResponse)
      : import("./data/apps.json")
    )
      .then((jsonResponse) => {
        setAppData({ ...jsonResponse, error: false });
      })
      .catch((error) => {
        setAppData({ categories: [], apps: [], error: error.message });
      });
  }, []);

  useEffect(() => {
    fetchAppData();
  }, [fetchAppData]);
  return { appData, fetchAppData };
};

const AppList = () => {
  const {
    appData: { categories, apps, error },
  } = useAppData();

  return (
    <ListContainer>
      <Headline>Applications</Headline>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {categories &&
        categories.map(({ name, items }, idx) => (
          <AppCategory key={[name, idx].join("")} name={name} items={items} />
        ))}
      {apps && (
        <AppCategory
          name={categories ? "Uncategorized apps" : ""}
          items={apps}
        />
      )}
    </ListContainer>
  );
};

export default AppList;
