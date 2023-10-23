import { Loader } from '@/Components/index';
import { ElementType, Suspense } from 'react';

export const Loadable = (Component: ElementType) => (props: object) => {
  return (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );
};
