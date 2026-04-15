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

  class addlineButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;


      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.createDialogObj',
  ],
      });

      $variables.dialogTitle = "Create Template";

      const iUDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#IUDialog',
        method: 'open',
      });

      // const insertUpdateRecDialogOpen = await Actions.callComponentMethod(context, {
      //   selector: '#insert_UpdateRecDialog',
      //   method: 'open',
      // });
    }
  }

  return addlineButtonActionChain;
});
