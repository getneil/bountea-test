import React from 'react'
import { FaGithub, FaEye, FaRegStar } from 'react-icons/fa'
import { SiTarget } from 'react-icons/si'

interface BounteaProps {
  slug: string
  watchers: number
  stars: number
  issues: number
}

export const testId = 'gh-stats'

export default function GithubStats({
  slug,
  watchers,
  stars,
  issues,
}: BounteaProps) {
  const url = `https://github.com/${slug}`

  return (
    <section
      data-testid={testId}
      className="flex justify-between mt-4 text-center text-4xl md:text-2xl"
    >
      <a
        title="Github Repo"
        target="_blank"
        href={url}
        rel="noopener noreferrer"
      >
        <div className="flex flex-col items-center">
          <FaGithub />
        </div>
      </a>
      <a
        title="Github Watcher Count"
        target="_blank"
        href={url}
        rel="noopener noreferrer"
      >
        <div className="flex flex-col items-center">
          <FaEye />
          <p className="text-sm">{numberWithCommas(watchers)}</p>
        </div>
      </a>
      <a
        title="Github Stars Count"
        target="_blank"
        href={url}
        rel="noopener noreferrer"
      >
        <div className="flex flex-col items-center">
          <FaRegStar />
          <p className="text-sm">{numberWithCommas(stars)}</p>
        </div>
      </a>
      <a
        title="Github Issues Count"
        target="_blank"
        href={url}
        rel="noopener noreferrer"
      >
        <div className="flex flex-col items-center">
          <SiTarget />
          <p className="text-sm">{numberWithCommas(issues)}</p>
        </div>
      </a>
    </section>
  )
}

function numberWithCommas(x: number): string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
