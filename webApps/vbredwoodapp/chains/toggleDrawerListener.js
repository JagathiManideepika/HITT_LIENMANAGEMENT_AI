define([
  'vb/action/actionChain',
  'vb/action/actions',
  'vb/action/actionUtils',
], (
  ActionChain,
  Actions,
  ActionUtils
) => {
  'use strict';

  class toggleDrawerListener extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $application, $constants, $variables } = context;
      $variables.navDrawer = $variables.navDrawer ? false:true;
    }
  }

  return toggleDrawerListener;
});
