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

  class CloseViewDlgAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.RowFileContent',
  ],
      });

      const viewdlgClose = await Actions.callComponentMethod(context, {
        selector: '#viewdlg',
        method: 'close',
      });
    }
  }

  return CloseViewDlgAction;
});
