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

  class RejectBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.status = 'Rejected';
      $variables.pageName = "Approvals Page- Reject Button";

      await Actions.callChain(context, {
        chain: 'ApproveRejectAction',
      });

      await Actions.callComponentMethod(context, {
      });
    }
  }

  return RejectBtnAction;
});
