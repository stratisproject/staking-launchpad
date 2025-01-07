import React, { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch, withRouter } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { supportedLanguages } from './intl';
import {
  AcknowledgementPage,
  CongratulationsPage,
  ConnectWalletPage,
  SelectClientPage,
  GenerateKeysPage,
  LandingPage,
  NotFoundPage,
  SummaryPage,
  UploadValidatorPage,
  TransactionsPage,
  FAQ,
  Phishing,
  Checklist,
  TermsOfService,
  Languages,
  TopUpPage,
  Withdrawals,
  BtecGuide,
} from './pages';
import ScrollToTop from './utils/ScrollToTop';
import { Prysm } from './pages/Clients/Consensus/Prysm';
import { Geth } from './pages/Clients/Execution/Geth';
import { SelectModePage } from './pages/SelectMode';

type RouteType = {
  path: string;
  component: FunctionComponent;
  exact?: boolean;
};

export enum routesEnum {
  termsOfServicePage = '/terms-of-service',
  congratulationsPage = '/congratulations',
  connectWalletPage = '/connect-wallet',
  generateKeysPage = '/generate-keys',
  acknowledgementPage = '/overview',
  selectMode = '/select-mode',
  selectClient = '/select-client',
  summaryPage = '/summary',
  uploadValidatorPage = '/upload-deposit-data',
  transactionsPage = '/transactions',
  FaqPage = '/faq',
  besu = '/besu',
  erigon = '/erigon',
  geth = '/geth',
  lighthouse = '/lighthouse',
  nethermind = '/nethermind',
  nimbus = '/nimbus',
  prysm = '/prysm',
  teku = '/teku',
  lodestar = '/lodestar',
  phishingPage = '/phishing',
  checklistPage = '/checklist',
  topUpPage = '/top-up',
  landingPage = '/',
  notFoundPage = '/*',
  languagesPage = '/languages',
  withdrawals = '/withdrawals',
  btecGuide = '/btec',
}
const routes: RouteType[] = [
  {
    path: routesEnum.termsOfServicePage,
    exact: true,
    component: TermsOfService,
  },
  {
    path: routesEnum.congratulationsPage,
    exact: true,
    component: CongratulationsPage,
  },
  {
    path: routesEnum.connectWalletPage,
    exact: true,
    component: ConnectWalletPage,
  },
  { path: routesEnum.selectClient, exact: true, component: SelectClientPage },
  {
    path: routesEnum.generateKeysPage,
    exact: true,
    component: GenerateKeysPage,
  },
  {
    path: routesEnum.acknowledgementPage,
    exact: true,
    component: AcknowledgementPage,
  },
  {
    path: routesEnum.selectMode,
    exact: true,
    component: SelectModePage,
  },
  { path: routesEnum.summaryPage, exact: true, component: SummaryPage },
  {
    path: routesEnum.uploadValidatorPage,
    exact: true,
    component: UploadValidatorPage,
  },
  {
    path: routesEnum.transactionsPage,
    exact: true,
    component: TransactionsPage,
  },
  { path: routesEnum.FaqPage, exact: true, component: FAQ },
  { path: routesEnum.geth, exact: true, component: Geth },
  { path: routesEnum.prysm, exact: true, component: Prysm },
  { path: routesEnum.phishingPage, exact: true, component: Phishing },
  { path: routesEnum.checklistPage, exact: true, component: Checklist },
  { path: routesEnum.languagesPage, exact: true, component: Languages },
  { path: routesEnum.topUpPage, exact: true, component: TopUpPage },
  { path: routesEnum.withdrawals, exact: true, component: Withdrawals },
  { path: routesEnum.btecGuide, exact: true, component: BtecGuide },
  { path: routesEnum.landingPage, exact: true, component: LandingPage },
  // NOTE: this wildcard route must be the last index of the routes array
  { path: routesEnum.notFoundPage, component: NotFoundPage },
];

const localizeRoutes = (locale: String, routes: RouteType[]) => {
  return routes.map(route => {
    const languagePath = route.path.split('/')[1];
    const routeHasLangPath = supportedLanguages.includes(languagePath);
    if (routeHasLangPath || route.path === '/*') {
      return route;
    }
    const localizedRoute: RouteType = {
      path: `/${locale}${route.path}`,
      exact: route.exact,
      component: route.component,
    };
    return localizedRoute;
  });
};

const _Routes = () => {
  const { locale, formatMessage } = useIntl();
  const localizedRoutes = localizeRoutes(locale, routes);

  const title = formatMessage({ defaultMessage: 'Staking Launchpad' });
  const description = formatMessage({
    defaultMessage:
      'Become a validator and help secure the future of Stratis.',
  });
  return (
    <>
      <ScrollToTop>
        <Helmet>
          <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} />
          <title>{title}</title>
          <meta property="og:title" content={title} />
          <meta property="twitter:title" content={title} />
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <Switch>
          {localizedRoutes.map((route: RouteType) => (
            <Route
              onUpdate={() => window.scrollTo(0, 0)}
              {...route}
              key={route.path}
            />
          ))}
        </Switch>
      </ScrollToTop>
    </>
  );
};

export const Routes = withRouter(_Routes);
