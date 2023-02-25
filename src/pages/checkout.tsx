import { ReactElement } from 'react';
import Layout from '../module/Layout';
import { NextPageWithLayout } from '../shared/types';

const Checkout: NextPageWithLayout = () => {
  return <div>Checkout page</div>;
};

Checkout.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Checkout;
