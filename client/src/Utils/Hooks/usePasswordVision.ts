import { useState } from "react"

export const usePasswordVision = () => {
    const [vision, setVision] = useState<boolean>(false)

    const handleVision = () => {
        setVision(!vision)
    }
    return {vision, handleVision}
}

