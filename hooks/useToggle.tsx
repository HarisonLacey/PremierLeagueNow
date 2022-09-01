import { useReducer } from 'react'

// useToggle hook
export const useToggle = (initialState: boolean = false): any => {
    const [state, dispatch] = useReducer(
        (isState: boolean) => !isState,
        initialState,
    )
    return [state, dispatch]
}
