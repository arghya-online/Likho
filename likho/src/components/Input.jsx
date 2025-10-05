import React, { useId } from 'react'

// Input component allows creating a reusable input field with an optional label
// forwardRef is used so parent components can get a reference to the input element directly
const Input = React.forwardRef(function Input({
    label, // optional text to show above the input
    type = 'text', // input type, default is 'text' if not provided
    className = '', // allows adding extra CSS classes if needed
    ...props // any other props like placeholder, value, onChange etc.
}, ref) {

    const id = useId(); // generates a unique id so label and input are linked

    return (
        <div className='w-full flex flex-col mb-4'>
            {/* always column layout — one below another on all devices */}

            {label && (
                <label
                    className='block mb-2 text-sm sm:text-base font-medium text-gray-200'
                    htmlFor={id}
                >
                    {label}
                </label>
            )}

            <input
                type={type}
                // sets the type of the input

                className={`w-full px-3 py-2 sm:px-4 sm:py-3 rounded-md bg-gray-800 border border-gray-700 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 text-white text-sm sm:text-base ${className}`}
                // responsive padding, text size, and full width

                ref={ref}
                // allows parent to access this input directly

                {...props}
                // spread other props like placeholder, value, onChange

                id={id}
                // links input with label using htmlFor
            />
        </div>
    )
})

export default Input
