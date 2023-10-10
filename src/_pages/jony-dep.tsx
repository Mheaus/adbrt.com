import * as React from 'react';

import { SEO } from '../components';
import JonyDep from '../app/jony-dep/page';

function JonyDepPage(props) {
  return (
    <>
      <SEO title="jony dep" />
      {typeof window !== 'undefined' && <JonyDep {...props} />}
    </>
  );
}

export default JonyDepPage;
