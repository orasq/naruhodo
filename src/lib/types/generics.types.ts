import React, { Dispatch, SetStateAction } from "react";

export type Dispatcher<T> = Dispatch<SetStateAction<T>>;
