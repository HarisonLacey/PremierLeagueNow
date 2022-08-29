import { useReducer } from 'react'

export const useToggle = (initialState: boolean = false): any => {
    const [state, dispatch] = useReducer(
        (isState: boolean) => !isState,
        initialState,
    )
    return [state, dispatch]
}
