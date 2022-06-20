import { useNotification } from '@/components/notifications/NotificationContext';
import Icon, { IconSize } from '@/components/utils/Icon';
import React from 'react';

export function Stat({
  title,
  content,
  after = '',
  copyable = false,
  contents = [],
  copyThis = '',
  size = 'body',
  className,
}: {
  copyThis?: string;
  copyable?: boolean;
  title: string;
  content?: string;
  contents?: string[];
  after?: string;
  size?: string;
  className?: string;
}): JSX.Element {
  const { notify: show } = useNotification();

  const showCopyIcon = !!content && !contents.length && copyable;

  return (
    <div
      className={`flex flex-col group items-start ${size} ${
        copyable && 'cursor-pointer'
      }`}
      onClick={() => {
        if (copyable && content) {
          let x = copyThis ? copyThis : content;
          navigator.clipboard.writeText(x);
          show({ title: 'Copied', content: x });
        }
      }}
    >
      <span className="font-grotesk font-semibold text-white">{title}</span>
      <p
        className={`relative whitespace-pre-line first-letter:capitalize ${
          copyable && 'group-hover:underline'
        } ${className}`}
      >
        {showCopyIcon && (
          <Icon
            icon="content_copy"
            size={IconSize.Small}
            className="group-hover:inline hidden absolute -translate-x-8"
          />
        )}
        {content}
        {!content &&
          contents.map((c, i) => {
            return (
              <span key={i}>
                {c}
                <br />
              </span>
            );
          })}
        {after}
      </p>
    </div>
  );
}
