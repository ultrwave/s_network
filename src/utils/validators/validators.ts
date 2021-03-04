export const required = (value: string) => {
    if (value) return undefined
    return 'Field is required'
}

export const setMaxLength = (length: number) => (value: string) => {
    if (value && value.length > length) return ('Max length is ' + length)
    return undefined
}

export const formErrorPass = (error: string | undefined) => () => {
    return error? 'Invalid username or password' : undefined
}

export const formErrorEmail = (error: string | undefined) => () => error