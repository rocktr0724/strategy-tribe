import React, { useEffect, useState } from 'react';
import { Bounty } from '@/lib/models/bounty';
import { GetWordCount } from '@/utils/StringHelpers';
import { Requirement, RequirementType } from '@/lib/models/requirement';
import { MessageForUser } from './MessageForUser';
import { Stat } from '../pages/submission/Stat';
import Icon from './Icon';

export function BountyRequirementsShowcase({
  bounty,
}: {
  bounty: Bounty;
  size?: string;
}) {
  const requeriedConditions = bounty.requirements?.filter((f) => !f.optional);
  const optionalConditions = bounty.requirements.filter((f) => f.optional);

  return (
    <div className="space-y-8">
      <Stat
        title="Requirements"
        contents={requeriedConditions?.map((f) => f.title)}
        content={requeriedConditions?.length ? undefined : 'None'}
      />
      <Stat
        title="Optional"
        contents={optionalConditions?.map((f) => f.title)}
        content={optionalConditions?.length ? undefined : 'None'}
      />
      <MessageForUser
        text="More evidence and better reports increase the chances of your submission
        being approved."
      />
    </div>
  );
}

export function BountyRequirementsChecker({
  requirements,
  checks,
  setChecks,
  content,
  files,
}: {
  requirements: Requirement[];
  size?: string;
  checks: Check[];
  setChecks: (s: Check[]) => void;
  //
  content: string;
  files: File[];
}) {
  const requeriedConditions = requirements?.filter((f) => !f.optional);
  const optionalConditions = requirements.filter((f) => f.optional);

  function ManageNewValue(requirement: Requirement, passed: boolean) {
    const newChecks = checks.filter(
      (check) => check.requirement !== requirement
    );
    newChecks.push({ requirement, passed });
    setChecks(newChecks);
  }

  return (
    <>
      <div>
        <h3 className={`font-grotesk font-semibold text-white`}>
          Requirements
        </h3>
        {requeriedConditions.map((requirement, i) => {
          return (
            <RequirementChecker
              key={i}
              requirement={requirement}
              content={content}
              files={files}
              setPassed={(passed) => ManageNewValue(requirement, passed)}
              //
            />
          );
        })}
      </div>
      {optionalConditions.length > 0 && (
        <div>
          <h3 className={`font-grotesk font-semibold text-white`}>Optional</h3>
          {optionalConditions.map((requirement, i) => {
            return (
              <RequirementChecker
                key={i}
                requirement={requirement}
                content={content}
                files={files}
                setPassed={(passed) => ManageNewValue(requirement, passed)}
                //
              />
            );
          })}
        </div>
      )}
    </>
  );
}

export type Check = {
  requirement: Requirement;
  passed: boolean;
};

function RequirementChecker({
  requirement,
  content,
  files,
  size = 'text-base',
  setPassed,
}: {
  requirement: Requirement;
  setPassed: (val: boolean) => void;
  content: string;
  files: File[];
  size?: string;
}): JSX.Element {
  const { title, type, optional } = requirement;
  const [_passed, _setPassed] = useState<boolean>(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setPassed(_passed);
  }, [_passed]);

  useEffect(() => {
    switch (type) {
      case RequirementType.Email:
        _setPassed(optional ? true : content.includes('@'));
        setMessage('Your input must contain an email address.');
        break;
      case RequirementType.Image:
        _setPassed(optional ? true : files.length > 0);
        setMessage('You must attach at least one image.');
        break;
      case RequirementType.Report:
        const wordCount = GetWordCount(content);
        _setPassed(optional ? true : wordCount > 200);
        setMessage('Your input must be longer than 200 words');
        break;
      case RequirementType.Domain:
        _setPassed(
          optional
            ? true
            : content.includes('http://') || content.includes('https://')
        );
        setMessage('Your input must be http link');
        break;
      case RequirementType.Wallet:
        _setPassed(optional ? true : content.length > 12);
        setMessage('Your input must contain a wallet address');
        break;
      default:
        throw 'Unknown type ';
    }
  }, [content, files]);

  return (
    <div
      className={`group cursor-default label-lg min-w-[10rem] flex items-center gap-4 -translate-x-10`}
    >
      {/* Icon */}
      <Icon
        className={`text-redLight ${!!_passed && 'invisible'} `}
        icon="close"
      />

      {/* Text */}
      <p className={`${!_passed && ''} ${size}`}>
        <span className={`${!_passed && 'group-hover:hidden'}`}>{title}</span>
        <span
          className={`text-redLight hidden ${
            !_passed && 'group-hover:inline '
          }`}
        >
          {message}
        </span>
      </p>
    </div>
  );
}
