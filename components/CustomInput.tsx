import React from 'react'
import { FormField, FormLabel, FormControl, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Control, FieldPath } from 'react-hook-form'
import { z } from 'zod'
import { authFormSchema } from '@/lib/utils'

const formSchema = authFormSchema('sign-up')
interface CustomInputProps {
    control: Control<z.infer<typeof formSchema>>,
    name: FieldPath<z.infer<typeof formSchema>>,
    label: string,
    placeholder: string
    type?: React.HTMLInputTypeAttribute
    id?: string
    required?: boolean
    autocomplete?: React.HTMLInputAutoCompleteAttribute
}

const CustomInput = ({ control, name, label, placeholder, type, id, required, autocomplete = 'on' }: CustomInputProps) => {
    
    
    const uniqueId = id || React.useId()
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className='form-item'>
                    <FormLabel className='form-label'>{label} {required ? <i className='text-red-600'> *</i> : null}</FormLabel>
                    <div className="flex w-full flex-col">
                        <FormControl>
                            <Input
                                id={uniqueId}
                                placeholder={placeholder}
                                className='input-class'
                                type={type}
                                autoComplete={autocomplete}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage className='form-message mt-2' />
                    </div>
                </div>
            )}
        />
    )
}

export default CustomInput