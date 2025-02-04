import AppLayout from '@/components/layouts/AppLayout';
import RulesContent from '@/components/pages/rules/rulesContent';
import { AfterRead, ReadingSection } from '@/components/reading/utils';

import { NextPageWithLayout } from './_app';

const RulesPage: NextPageWithLayout = () => {
  return (
    <>
      <ReadingSection title="Submission rules">
        <RulesContent />
      </ReadingSection>
      <AfterRead />
    </>
  );
};

RulesPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
export default RulesPage;
