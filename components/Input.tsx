import Form from 'next/form'
import SearchFormReset from './SearchFormReset'
import { SearchIcon } from 'lucide-react'

export default function Input({ query }: { query?: string }) {

  // const query = 'test'

  // console.log(query)

  return (
    <Form action="/" scroll={false} className='search-form'>
      {/* On submission, the input value will be appended to
          the URL, e.g. /search?query=abc */}
      <input name="query" className='search-input' placeholder='Search Startups' />

      <div className='flex gap-2'>
        {
          query && <SearchFormReset />
        }

        <button type='submit' className='search-btn text-white'>
          <SearchIcon className="size-5" />
        </button>
      </div>
    </Form>
  )
}
