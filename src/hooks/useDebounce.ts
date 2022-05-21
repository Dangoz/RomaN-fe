import { useRef } from 'react'
import { debounce } from 'lodash'

const useDebounce = (func: (...args: any[]) => any, delay: number) => {
  const debouncedFunc = useRef(debounce(func, delay))
  return debouncedFunc.current
}

export default useDebounce
