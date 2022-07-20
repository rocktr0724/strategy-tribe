import { useOrganizationContext } from './OrganizationContext';
import { useGetBounties } from '@/lib/hooks/bountyHooks';
import { Order } from '@/lib/models/queries/Order';
import { BountyOrderBy } from '@/lib/models/queries/BountyQueryParams';
import { BountyCard, DummyBountyCard } from '../explore/bounty card/BountyCard';
import { ArrayOfNumbers } from '@/lib/utils/ArrayHelpers';
import { Button, ButtonStyle } from '@/components/utils/Button';
import { GoToOrgBountiesPage } from '@/lib/utils/Routes';

const AMOUNT_OF_BOUNTIES = 9;

export function OrgBounties() {
  const { org } = useOrganizationContext();

  const { bounties, isLoading, count } = useGetBounties({
    order: Order.Desc,
    orderBy: BountyOrderBy.Bounty,
    amount: AMOUNT_OF_BOUNTIES,
    specificityOfOrgName: 'Exact',
    orgName: org.name,
  });

  const theresMore = (count ?? 0) > AMOUNT_OF_BOUNTIES;

  return (
    <div className="space-y-8">
      <h2 className="title">Bounties</h2>

      <div className="grid grid-cols-3 gap-x-16 gap-y-10 -translate-x-1">
        {isLoading &&
          ArrayOfNumbers(9).map((n) => {
            return <DummyBountyCard key={n} />;
          })}
        {!isLoading &&
          bounties.map((b) => {
            return <BountyCard bounty={b} key={b.id} />;
          })}
      </div>

      {theresMore && !!count && (
        <Button
          info={{
            className: '-translate-x-2 w-fit',
            label: `${count - AMOUNT_OF_BOUNTIES} more`,
            style: ButtonStyle.TextPurple,
            icon: 'arrow_forward',
            removeMinWidth: true,
            removePadding: true,
            isALink: GoToOrgBountiesPage(org.id!),
          }}
        />
      )}
    </div>
  );
}
