import * as React from 'react';

import { SEO } from '../components';
import JonyDep from '../pages-components/jony-dep';

function JonyDepPage(props) {
  return (
    <>
      <SEO title="jony dep" />
      <JonyDep {...props} />
    </>
  );
}

export default JonyDepPage;
