import '../shared/styles/globals.css';
import type { AppProps } from 'next/app';
import { NextPageWithLayout } from '../shared/types';
import {
  DehydratedState,
  Hydrate,
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AxiosError } from 'axios';
import NProgress from 'nprogress';
import { Router } from 'next/router';
import 'public/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

type AppPropsWithLayout<T> = AppProps<T> & {
  Component: NextPageWithLayout<T>;
};

const errorHandler = (error: unknown) => {
  let errorMessage = error;
  if (error instanceof AxiosError) {
    errorMessage = error?.response?.data?.response
      ? JSON.stringify(error.response.data.response)
      : `Something went wrong: ${error.message}`;
    if (error.response?.status && error.response?.status >= 500) console.log('Error 500');
    // toast.custom((props) => <Toast variant='error' {...props} />, {
    //   id: 'code-500-error',
    // });
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  console.error(errorMessage);
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 1000 * 60 * 5, //five minutes,
    },
  },
  queryCache: new QueryCache({ onError: errorHandler }),
  mutationCache: new MutationCache({ onError: errorHandler }),
});

const MyApp = ({
  Component,
  pageProps,
}: AppPropsWithLayout<{ dehydratedState: DehydratedState }>) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Hydrate state={pageProps.dehydratedState}>{getLayout(<Component {...pageProps} />)}</Hydrate>
    </QueryClientProvider>
  );
};

export default MyApp;
