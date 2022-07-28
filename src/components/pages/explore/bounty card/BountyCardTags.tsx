import { useUrlSearchParams } from '@/lib/hooks/useUrlSearchParams';
import { Bounty } from '@/lib/models';

export function BountyCardTags({ bounty }: { bounty: Bounty }) {
  const type = bounty.requirements.at(0)?.type || '';
  const org = bounty.organizationName;

  const { urlFilter, setUrlFilter } = useUrlSearchParams();

  function addOrgToFilters() {
    setUrlFilter({ relatedTo: [...(urlFilter.query.relatedTo ?? []), org] });
  }

  return (
    <div className="flex gap-5 pb-2">
      <Tag tag={type} />
      <Tag tag={org} onClick={addOrgToFilters} />
    </div>
  );
}

function Tag({ tag, onClick }: { tag: string; onClick?: () => void }) {
  return (
    <button
      className="label-sm text-on-surface-unactive text-left capitalize"
      onClick={onClick}
    >
      {tag?.length > 14 ? `${tag.slice(0, 28)}...` : tag}
    </button>
  );
}
