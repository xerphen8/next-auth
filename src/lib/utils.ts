import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const ValidationEmail = (value: string) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        return true
    } else{
        return false
    }
}

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs))
}