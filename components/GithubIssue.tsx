import React from 'react'
import { RepoIssue } from '../types/index'
import Bountea from './Bountea'
import Link from 'next/link'
import dayjs from 'dayjs'

interface GithubIssueProps {
  issue: RepoIssue
  slug: string
  activated: boolean
}

export const testId = 'gh-issue'

export default function GithubIssue({
  issue,
  activated,
  slug,
}: GithubIssueProps) {
  const issurUrl = `https://github.com/${slug}/issues/${issue.issue_number}`
  return (
    <a href={issurUrl} target="_blank" rel="noopener noreferrer">
      <div
        data-testid={testId}
        className="cursor-pointer card card-side bg-base-100 shadow-xl hover:bg-gray-100 transition-colors"
      >
        <figure className="pl-4">
          <Bountea active={activated} amount={issue.bountea} />
        </figure>
        <div className="card-body overflow-hidden">
          <h2 className="card-title">{issue.title}</h2>
          <h3>
            created by <span className="text-blue-400"> {issue.author}</span>{' '}
            last {dayjs(issue.created_at).format('MMMM D, YYYY h:mm A')}
          </h3>
          <p className="truncate">{issue.body}</p>
        </div>
      </div>
    </a>
  )
}
