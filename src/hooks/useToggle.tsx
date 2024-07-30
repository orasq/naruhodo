import { Dispatcher } from "@/lib/types/generics.types";
import { useCallback, useState } from "react";

function useToggle(
  initialValue: boolean = false
): [boolean, Dispatcher<boolean>] {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((v) => !v);
  }, []);

  return [value, toggle];
}

export default useToggle;
