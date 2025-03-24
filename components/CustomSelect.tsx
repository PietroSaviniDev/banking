import React from 'react'
import { FormField, FormLabel, FormControl, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Control, FieldPath } from 'react-hook-form'
import { z } from 'zod'
import { authFormSchema } from '@/lib/utils'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

const formSchema = authFormSchema('sign-up')

interface CustomInputProps {
    control: Control<z.infer<typeof formSchema>>,
    name: FieldPath<z.infer<typeof formSchema>>,
    options: {value:string, label:string}[],
    label: string,
    placeholder: string
    type?: React.HTMLInputTypeAttribute
    id?: string
    required?: boolean
}



const CustomSelect = ({ control, name, label, placeholder, type, id, required, options }: CustomInputProps) => {


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
                            <Select
                                {...field}
                            >
                                <SelectTrigger className="min-w-[194px]">
                                    <SelectValue placeholder={placeholder} />
                                </SelectTrigger>
                                <SelectContent>
                                    {options.map((option : {value:string, label:string}, index) => <SelectItem key={index} value={option.value}>{option.label}</SelectItem> )}
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage className='form-message mt-2' />
                    </div>
                </div>
            )}
        />
    )
}

export default CustomSelect