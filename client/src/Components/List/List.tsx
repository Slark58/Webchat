import React, { ReactNode } from 'react'


interface IListProps<T> {
    data: T[],
    mapperData: (data: T, i: number) => ReactNode
}

function List<T>({data = [], mapperData}: IListProps<T>) {

  return (
    <>
        {data.map(mapperData)}
    </>
  )
}

export {List}