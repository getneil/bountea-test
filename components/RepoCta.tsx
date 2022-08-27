import React from 'react'
import { RepoIssue } from '../types/index'
import Bountea from './Bountea'
import Link from 'next/link'

interface RepoCtaProps {
  issueCount: number
  bountea: number
  slug: string
  activated: boolean
}

export const testId = 'cta-test-id'

export default function RepoCta({
  issueCount,
  bountea,
  activated,
  slug,
}: RepoCtaProps) {
  const issurUrl = `https://github.com/${slug}/issues`
  return (
    <div
      data-testid={testId}
      className="cursor-pointer card shadow-xl bg-green-200 text-center hover:bg-green-300 transition-colors"
    >
      {!activated ? (
        <div className="card-body flex md:flex-row">
          <p className="md:text-left">
            This package is not yet registered with Tea. Are you the owner or
            one of the contributors? Claim this package and start getting
            incentives for maintaining it.
          </p>
          <a target="_blank" rel="noopener noreferrer" href="https://tea.xyz">
            <button className="btn btn-primary text-white w-32">CLAIM</button>
          </a>
        </div>
      ) : (
        <div className="card-body flex md:flex-row items-center">
          <p className="md:text-right md:pr-4 text-xl">
            {' '}
            This package has {issueCount} issues with a total{' '}
            <i className="font-bold">BounTea</i> of{' '}
            <span className="font-bold">{bountea} tokens</span>. <br /> You can
            help by:
          </p>
          <div className="flex flex-row gap-4 items-center">
            <a target="_blank" rel="noopener noreferrer" href="https://tea.xyz">
              <button className="btn btn-primary text-white">
                ADD BOUNTEAS
              </button>
            </a>
            <div>or</div>
            <a target="_blank" rel="noopener noreferrer" href={issurUrl}>
              <button className="btn btn-primary text-white">
                SOLVE ISSUES
              </button>
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
