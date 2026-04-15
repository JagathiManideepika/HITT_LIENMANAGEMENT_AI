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

  class ToggleBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $fragment, $application, $constants, $variables } = context;

      await Actions.callChain(context, {
        chain: 'application:toggleDrawerListener',
      });
    }
  }

  return ToggleBtnAction;
});
