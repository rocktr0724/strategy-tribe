import { Organization } from '@/lib/models/organizations/organization';
import { useRouter } from 'next/router';
import { GoToOrgPage } from '@/utils/Routes';
import { motion } from 'framer-motion';

export function OrgEntry({
  org,
  variants,
}: {
  org: Organization;
  variants?: {};
}) {
  const router = useRouter();
  return (
    <motion.div
      variants={variants}
      className="space-y-2 cursor-pointer bt:max-w-xl laptop:max-w-none group"
      onClick={() => router.push(GoToOrgPage(org.id as string))}
    >
      <div className="flex justify-between font-grotesk items-start gap-2">
        <h3 className="title-sm group-hover:underline capitalize">
          {org.name}
        </h3>
        <span className="text-purpleLight shrink-0 label mt-1">
          {org.bounties} {org.bounties === 1 ? 'bounty' : 'bounties'}
        </span>
      </div>
      {org.bio && (
        <p className="text-unactive line-clamp-3 max-w-sm body">{org.bio}</p>
      )}
    </motion.div>
  );
}
