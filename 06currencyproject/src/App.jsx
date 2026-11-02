import { useState } from 'react'
import InputBox from './components/InputBox'
import useCurrencyInfo from './hooks/useCurrencyInfo'

function App() {
  const [amount, setAmount] = useState(1)
  const [from, setFrom] = useState('usd')
  const [to, setTo] = useState('inr')
  const [convertedAmount, setConvertedAmount] = useState(0)
  const { rates, updatedAt, loading, error } = useCurrencyInfo(from)
  const options = Object.keys(rates)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setAmount(convertedAmount)
    setConvertedAmount(amount)
  }

  const convert = () => {
    const rate = rates[to]

    if (Number.isFinite(amount) && Number.isFinite(rate)) {
      setConvertedAmount(amount * rate)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-slate-900">
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
      </div>

      <section className="relative w-full max-w-lg rounded-3xl border border-white/15 bg-white/10 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
        <header className="mb-7 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Quick and simple
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Currency converter
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Check the latest available exchange rate.
          </p>
        </header>

        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault()
            convert()
          }}
        >
          <InputBox
            label="From"
            amount={amount}
            currencyOptions={options}
            onCurrencyChange={(currency) => {
              setFrom(currency)
              setConvertedAmount(0)
            }}
            onAmountChange={setAmount}
            selectedCurrency={from}
          />

          <div className="relative flex justify-center">
            <div className="absolute top-1/2 h-px w-full bg-white/15" />
            <button
              type="button"
              onClick={swap}
              aria-label="Swap currencies"
              className="relative rounded-full border border-white/20 bg-slate-800 px-5 py-2 text-sm font-semibold text-cyan-200 shadow-lg transition hover:border-cyan-300 hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
            >
              Swap
            </button>
          </div>

          <InputBox
            label="To"
            amount={convertedAmount}
            amountDisable
            currencyOptions={options}
            onCurrencyChange={(currency) => {
              setTo(currency)
              setConvertedAmount(0)
            }}
            selectedCurrency={to}
          />

          {loading && (
            <p className="text-center text-sm text-slate-300" role="status">
              Loading exchange rates…
            </p>
          )}
          {error && (
            <p className="text-center text-sm text-rose-300" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || Boolean(error) || !Number.isFinite(rates[to])}
            className="w-full rounded-xl bg-cyan-400 px-4 py-3.5 font-bold text-slate-950 shadow-lg shadow-cyan-950/30 transition hover:bg-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>

        {updatedAt && !error && (
          <p className="mt-5 text-center text-xs text-slate-400">
            Rates updated {updatedAt}
          </p>
        )}
      </section>
    </main>
  )
}

export default App
