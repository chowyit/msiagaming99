import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

export type Concrete<T> = {
  [Property in keyof T as string]: Nullable<UndefinedAble<T[Property]>>;
};

export type Nullable<T> = T | null;

export type UndefinedAble<T> = T | undefined;

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
