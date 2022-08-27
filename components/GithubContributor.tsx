import React from 'react'
import { RepoContributor } from '../types/index'

interface GithubContributorProps {
  user: RepoContributor
}

export const testId = 'contributor'

export default function GithubContributor({ user }: GithubContributorProps) {
  return (
    <div
      data-testid={testId}
      className="flex flex-col justify-center align-middle items-center"
    >
      <a
        target="_blank"
        href={`https://github.com/${user.name}`}
        rel="noopener noreferrer"
      >
        <div className="avatar bg-slate-300">
          <div className="w-24 rounded">
            <img src={user.avatar_url} />
          </div>
        </div>
      </a>
      <p className="text-gray-500">{user.name}</p>
    </div>
  )
}
