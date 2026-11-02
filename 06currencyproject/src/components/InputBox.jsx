import { useId } from 'react'

function InputBox({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectedCurrency = "usd",
    amountDisable = false,
    currencyDisable = false,
    className = "",
}) {
   const amountInputId = useId()

    return (
        <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
            <div className="w-1/2">
                <label htmlFor={amountInputId} className="mb-2 inline-block text-black/50">
                    {label}
                </label>
                <input
                    id={amountInputId}
                    className="w-full bg-transparent py-1.5 outline-none"
                    type="number"
                    placeholder="Amount"
                    min="0"
                    step="any"
                    disabled={amountDisable}
                    value={amount}
                    onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
                />
            </div>
            <div className="flex w-1/2 flex-wrap justify-end text-right">
                <label htmlFor={`${amountInputId}-currency`} className="mb-2 w-full text-black/50">
                    Currency
                </label>
                <select
                    id={`${amountInputId}-currency`}
                    className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
                    value={selectedCurrency}
                    onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                    disabled={currencyDisable}
                >
                    
                        {currencyOptions.map((currency) => (
                            <option key={currency} value={currency}>
                            {currency}
                            </option>
                        ))}
                
                </select>
            </div>
        </div>
    );
}

export default InputBox;