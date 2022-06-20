import React, { useState } from 'react';
import { SupportButton } from '../../donations/SupportButton';
import {
  iNotification,
  NotificationStyle,
  iNotificationConfig,
  DelayType,
  NotificationType,
} from '../../notifications/iNotification';
import { useNotification } from '../../notifications/NotificationContext';
export function Donate() {
  const ST_WALLET = process.env.NEXT_PUBLIC_ST_WALLET as string;
  const [amount, setAmount] = useState(0);
  const [typed, setTyped] = useState(false);

  const canSubmit = amount > 0;

  const { notify } = useNotification();

  function onDonationSuccess() {
    const msg: iNotification = {
      title: 'Your donation is being processed',
      content: 'Thank you',
      style: NotificationStyle.success,
    };

    const config: iNotificationConfig = {
      condition: false,
      delayTime: 3,
      delayType: DelayType.Time,
      type: NotificationType.Banner,
    };

    notify(msg, config);
  }

  function onDonationError(e: any) {
    const msg: iNotification = {
      title: 'There has been an error',
      content: `${e}`,
      style: NotificationStyle.error,
    };

    const config: iNotificationConfig = {
      condition: false,
      delayTime: 3,
      delayType: DelayType.Time,
      type: NotificationType.Banner,
    };

    notify(msg, config);
  }

  return (
    <div id="support" className="space-y-8">
      <div>
        <h2 className="text-3xl font-inter font-bold text-white">
          Support StrategyTribe
        </h2>
        <span
          className={`bg-purpleDark h-1 inline-block -translate-y-2 w-16`}
        ></span>
      </div>

      {/* Why */}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto excepturi
        saepe fuga vel quo sunt cum in porro, suscipit corporis ipsam laborum
        odit alias recusandae officiis et autem dolorem voluptatum.
      </p>

      {/* Donation */}
      <div className="text-text rounded-lg space-y-6">
        <div className="space-y-4">
          <label className="flex flex-col">
            <span className="label">Amount (ETH)</span>
            <input
              type="number"
              step={0.001}
              value={amount}
              min={0}
              onChange={(e) => {
                const value = Number(e.target.value);
                setAmount(value);
                setTyped(true);
              }}
              className="bg-black border-0 border-b-2 border-dark focus:ring-0 focus:border-purpleDark"
            />
          </label>
          {!canSubmit && typed && (
            <p className="label text-redLight">
              The donation must be greater than 0
            </p>
          )}
        </div>

        <div className="flex items-center gap-8 justify-end">
          {
            <SupportButton
              amountInEth={amount}
              recipient={{
                wallet: ST_WALLET,
              }}
              after={{
                onError: onDonationError,
                onSuccess: onDonationSuccess,
              }}
              disabled={amount <= 0}
            />
          }
        </div>
      </div>
    </div>
  );
}
