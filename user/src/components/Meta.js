import React from 'react';
import { Helmet } from 'react-helmet';
import props from './BreadCrumb';

const Meta = () => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{props.title}</title>
    </Helmet>
  );
};

export default Meta;
