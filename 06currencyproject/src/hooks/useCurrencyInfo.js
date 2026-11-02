import { useEffect, useState } from 'react'

function useCurrencyInfo(currency) {
    const [rates, setRates] = useState({})
    const [updatedAt, setUpdatedAt] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const controller = new AbortController()

        async function fetchRates() {
            setLoading(true)
            setError('')

            try {
                const urls = [
                    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`,
                    `https://latest.currency-api.pages.dev/v1/currencies/${currency}.json`,
                ]
                let result
                let requestError

                for (const url of urls) {
                    try {
                        const response = await fetch(url, { signal: controller.signal })

                        if (!response.ok) {
                            throw new Error(`Exchange rates could not be loaded (${response.status}).`)
                        }

                        result = await response.json()
                        break
                    } catch (fetchError) {
                        if (controller.signal.aborted) {
                            return
                        }

                        requestError = fetchError
                    }
                }

                if (!result) {
                    throw requestError || new Error('Exchange rates could not be loaded.')
                }

                const currencyRates = result[currency]

                if (!currencyRates || typeof currencyRates !== 'object') {
                    throw new Error('The exchange-rate response was invalid.')
                }

                setRates(currencyRates)
                setUpdatedAt(result.date || '')
            } catch (fetchError) {
                if (controller.signal.aborted) {
                    return
                }

                setRates({})
                setUpdatedAt('')
                setError(fetchError.message || 'Exchange rates could not be loaded.')
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false)
                }
            }
        }

        fetchRates()

        return () => controller.abort()
    }, [currency])

    return { rates, updatedAt, loading, error }
}

export default useCurrencyInfo