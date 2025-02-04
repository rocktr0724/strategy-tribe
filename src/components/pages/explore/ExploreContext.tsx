import { useGetBounties } from '@/lib/hooks/bountyHooks';
import { useUrlSearchParams } from '@/lib/hooks/useUrlSearchParams';
import { MapData } from '@/lib/models/MapData';
import { createContext, ReactNode, useContext } from 'react';


interface iExploreContext {
  bountyFetch: ReturnType<typeof useGetBounties> | undefined;
  countries: string[];
  addCountry: (country: string) => void;
  removeCountry: (country: string) => void;
  map: MapData | undefined;
}

const ExploreContext = createContext<iExploreContext>({
  bountyFetch: undefined,
  countries: [],
  addCountry: () => {
    return;
  },
  removeCountry: () => {
    return;
  },
  map: undefined,
});

export const ExploreContextProvider = ({
  children,
  data,
}: {
  children: ReactNode;
  data: MapData | undefined;
}) => {
  const {
    urlFilter: { query },
    setUrlFilter,
  } = useUrlSearchParams();
  const bountyFetch = useGetBounties(query);

  function addCountry(newCountry: string) {
    if (query.countries?.includes(newCountry)) return;
    else {
      const oldCountries = query.countries || [];
      setUrlFilter({ countries: [...oldCountries, newCountry], page: 0 });
    }
  }
  function removeCountry(country: string) {
    if (!query.countries?.includes(country)) return;
    else {
      const countries =
        query.countries.filter((c: string) => c !== country) || [];
      setUrlFilter({ ...query, countries });
    }
  }

  return (
    <ExploreContext.Provider
      value={{
        map: data,
        bountyFetch,
        countries: query?.countries ?? [],
        addCountry,
        removeCountry,
      }}
    >
      {children}
    </ExploreContext.Provider>
  );
};

export const useExploreContext = () => {
  return useContext(ExploreContext);
};
