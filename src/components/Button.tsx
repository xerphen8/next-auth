import { FC } from "react";
import { cva } from "class-variance-authority";

interface ButtonProps {}

const buttonVariants = cva([])

const Button: FC<ButtonProps> = ({name, width, bgColor, func}) => {
    return (
        <button onClick={func}
                className={`bg-${bgColor}-500 hover:bg-${bgColor}-700 w-${width} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                type='button'>
            {name}
        </button>
    )
}

export default Button;