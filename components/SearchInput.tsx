import { ChangeEvent, useState, useMemo, useEffect } from 'react'
import { debounce } from 'lodash'

interface SearchInputProps {
  onChange: (search: string) => void
}

const SearchInput = ({ onChange }: SearchInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  const debouncedResults = useMemo(() => {
    return debounce(handleChange, 300)
  }, [])

  useEffect(() => {
    return () => {
      debouncedResults.cancel()
    }
  })

  return (
    <div className="form-control">
      <div className="input-group">
        <input
          type="text"
          placeholder="Search: name, language etc..."
          className="input input-bordered w-full"
          onChange={debouncedResults}
        />
        <button className="btn btn-square">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default SearchInput
