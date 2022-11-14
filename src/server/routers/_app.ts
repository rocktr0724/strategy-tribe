import { bountyRouter } from './bounty';
import { fileRouter } from './files';
import { invoiceRouter } from './invoice';
import { mapRouter } from './map';
import { orgRouter } from './org';
import { reviewRouter } from './review';
import { submissionRouter } from './submission';
import { tagRouter } from './tags';
import { targetRouter } from './targets';
import { walletRouter } from './wallet';
import { router } from '../procedures';

export const appRouter = router({
  bounty: bountyRouter,
  orgs: orgRouter,
  target: targetRouter,
  tag: tagRouter,
  review: reviewRouter,
  submission: submissionRouter,
  invoice: invoiceRouter,
  wallet: walletRouter,
  map: mapRouter,
  file: fileRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
