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

  class UpdateCOmmentsAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'PWP_ORDS/postGetaraplinkdetails',
        body: $variables.currentRow,
      });

      if (!response.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed to Update the record',
          displayMode: 'transient',
        });
      
        return;
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: 'Record Updated Successfully',
          displayMode: 'transient',
          type: 'confirmation',
        });

        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.comments',
  ],
        });

        await Actions.callChain(context, {
          chain: 'SearchBtnAction',
        });
      }
    }
  }

  return UpdateCOmmentsAction;
});
