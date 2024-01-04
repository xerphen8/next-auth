import { ButtonHTMLAttributes, FC } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/libs/utils"

const buttonVariants = cva(
    "font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
    {
        variants: {
            variant: {
                default: 
                    'bg-blue-500 text-white hover:bg-blue-700',
                destructive:
                    'bg-red-500 text-white hover:bg-red-700',
                secondary:
                    'bg-purple-500 text-white hover:bg-purple-700',
            },
            size: {
                default:
                    'py-2 px-5 rounded-md',
                long:
                    'w-full rounded-md',
                parallelogram:
                    'py-2 px-10 -skew-y-[20deg] rotate-[20deg]',
                sm: 
                    'px-3 rounded-md',
                lg:
                    'px-6 rounded-md'
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default'
        }
    }
)

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, 
    VariantProps<typeof buttonVariants> {}

const Button: FC<ButtonProps> = (({className, size, variant, ...props}) => {
    return <button className={cn(buttonVariants({className, size, variant}))} {...props}/>
})

export {Button, buttonVariants};