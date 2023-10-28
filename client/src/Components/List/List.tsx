import React, { ReactNode } from 'react'


interface IListProps<T> {
    data: T[],
    maaperData: (data: T, i: number) => ReactNode
}

function List<T>({data, maaperData}: IListProps<T>) {

  return (
    <>
        {data.map(maaperData)}
    </>
  )
}

export {List}