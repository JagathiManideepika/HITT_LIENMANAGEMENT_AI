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

  class navigationHandler extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.selection 
     * @param {any} params.currentFlow 
     */
    async run(context, { selection, currentFlow }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      $application.variables.navDrawer = false;

      const to = await Actions.navigateToPage(context, {
        page: selection,
      });
    }
  }

  return navigationHandler;
});
