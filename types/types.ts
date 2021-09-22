import { ChangeEvent, FormEvent } from "react";

export type handleAddNewTodoFn = (event: FormEvent<HTMLFormElement>) => void;
export type handleSetInputFn = (event: ChangeEvent<HTMLInputElement>) => void;
