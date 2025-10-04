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
        <div className='w-full'>

            {label && <label className='block mb-1 text-sm font-medium' htmlFor={id}>{label}</label>}

            <input
                 type={type} 
                 // sets the type of the input

                 className={'w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 text-white'} 
                 // default styling for dark mode, borders, and focus effect

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
