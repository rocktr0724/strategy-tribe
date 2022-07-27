import { GoToOrgBountiesPage } from '@/lib/utils/Routes';
import { OrgView } from './OrgView';
import { useOrganizationContext } from './OrganizationContext';
import Link from 'next/link';

export function OrgSideMap() {
  const { org } = useOrganizationContext();

  return (
    <aside className="w-[160px] flex flex-col gap-2 shrink-0">
      <button
        className={`border-2 border-main text-on-surface-p0 rounded text-left pr-8 p-4 label capitalize`}
      >
        {OrgView.About}
      </button>

      <Link href={GoToOrgBountiesPage(org.id!)}>
        <a className="hover:bg-surface-dark rounded text-left pr-8 p-4 label capitalize">
          {OrgView.Bounties}
        </a>
      </Link>
    </aside>
  );
}
