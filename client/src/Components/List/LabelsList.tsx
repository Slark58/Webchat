import { TabType } from '@/Pages/RequestsPage/RequestsPage';
import { TLinks } from '@/Pages/RequestsPage/links';
import React, { ChangeEvent } from 'react';
import { Label, List } from '..';

interface ILabelsListProps {
  data: TLinks[];
  activeTab: TabType;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const LabelsList = ({ data, activeTab, handleChange }: ILabelsListProps) => {
  return (
    <List
      data={data}
      mapperData={(item) => (
        <Label
          htmlFor={item.binding}
          className={
            activeTab == item.binding
              ? 'requestsPage__tabs-label tab-active'
              : 'requestsPage__tabs-label'
          }
        >
          <Label.Input
            id={item.binding}
            type='radio'
            name='tab'
            value={item.binding}
            onChange={handleChange}
            className='requestsPage__tabs-input'
          />
          <Label.Title className='requestsPage__tabs-tab'>
            {item.label}
          </Label.Title>
        </Label>
      )}
    />
  );
};

export { LabelsList };
