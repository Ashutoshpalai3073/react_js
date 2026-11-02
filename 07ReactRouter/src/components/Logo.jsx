import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link
      to="/"
      aria-label="Home"
      className="inline-flex items-center rounded-lg text-lg font-extrabold tracking-tight text-slate-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-600"
    >
      <span>your</span>
      <span className="ml-1 text-orange-600">logo</span>
      <span aria-hidden="true" className="mb-3 ml-0.5 h-1.5 w-1.5 rounded-full bg-orange-600" />
    </Link>
  )
}
