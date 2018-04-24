import React from 'react';
import { routerRedux, Route, Switch, Redirect } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import { getRouterData } from './common/router';
import { getAuthority } from './utils/authority';
import styles from './index.less';

const { ConnectedRouter } = routerRedux;
dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className={styles.globalSpin} />;
});

const AuthorizedRoute = ({ component: BasicLayout, path, redirectPath, ...rest }) => {
  console.log(getAuthority())

  return (
    <Route
      path={path}
      render={
        props => getAuthority() ? <BasicLayout {...rest} {...props} /> : <Redirect to={{pathname: redirectPath, state: { from: props.location }}}  />
      }
    />
  )
}


function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  const UserLayout = routerData['/user'].component;
  const BasicLayout = routerData['/'].component;
  return (
    <LocaleProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/user" component={UserLayout} />
          <AuthorizedRoute
            path="/"
            component={BasicLayout}
            redirectPath="/user/login"
          />
        </Switch>
      </ConnectedRouter>
    </LocaleProvider>
  );
}

export default RouterConfig;
