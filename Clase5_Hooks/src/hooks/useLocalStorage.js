import { useEffect, useState } from "react"

const readStorageValue = (key, initialValue) => {
    if (typeof window === "undefined") {
        return initialValue
    }

    try {
        const item = window.localStorage.getItem(key)

        if (item === null) {
            return initialValue
        }

        return JSON.parse(item)
    } catch {
        return initialValue
    }
}

const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => readStorageValue(key, initialValue))

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]
}

export { useLocalStorage }
