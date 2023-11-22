import { ReactNode } from "react";
import { List } from "..";

interface ChatsListProps<T> {
  data: T[]
  renderPreview: (item: T, i: number) => ReactNode
}

function ChatsList<T>({data = [], renderPreview}: ChatsListProps<T>): JSX.Element {
  return (
    <List
      data={data}
      mapperData={(item: T, i: number) => (
        <div key={i}>
          {renderPreview(item, i)}
        </div>
      )}
    />
  );
};

export {ChatsList};