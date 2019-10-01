/**
 *
 * Asynchronously loads the component for CrudTest
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
