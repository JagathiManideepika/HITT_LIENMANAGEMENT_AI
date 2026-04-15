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

  class CancelDlgBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const addCriteriaModalClose = await Actions.callComponentMethod(context, {
        selector: '#Add-criteria-modal',
        method: 'close',
      });

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.createobj',
    '$page.variables.dialogLabel',
    '$page.variables.wavier_type_dtls',
  ],
      });
    }
  }

  return CancelDlgBtnAction;
});
