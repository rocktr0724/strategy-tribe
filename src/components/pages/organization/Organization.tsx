import { Organization as OrganizationData } from '@/lib/models/organizations/organization';
import { OrgHeader } from './OrgHeader';
import { OrganizationContextProvider } from './OrganizationContext';
import { OrgContent } from './OrgContent';

export function Organization({ org }: { org: OrganizationData }) {
  return (
    <OrganizationContextProvider org={org}>
      <div className="space-y-8">
        <OrgHeader />
        <OrgContent />
      </div>
    </OrganizationContextProvider>
  );
}
