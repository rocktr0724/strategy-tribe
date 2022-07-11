import { BountyView } from '@/lib/models/bounty/BountyPage';
import { BountyUrl } from '@/lib/models/bounty/BountyUrl';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

export const useBountyUrl = () => {
  const router = useRouter();

  function buildRoute(qry: BountyUrl, url: string) {
    router.pathname = url;

    return {
      pathname: router.pathname,
      query: {
        view: qry.view,
      },
    };
  }

  const query: BountyUrl = useMemo(() => {
    const urlQuery = router.query;

    if (!urlQuery.view) {
      return { view: BountyView.Submissions };
    }

    const query: BountyUrl = {
      view: (urlQuery.view as string as BountyView) || BountyView.Submissions,
    };

    return query;
  }, [router.query]);

  return {
    setQuery: (qry: BountyUrl, url: string, options?: { scroll?: boolean }) => {
      const newRouter = buildRoute(qry, url);
      router.push(newRouter, undefined, { scroll: !!options?.scroll });
    },
    query,
  };
};
