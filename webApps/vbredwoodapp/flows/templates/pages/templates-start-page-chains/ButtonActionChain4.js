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

  class ButtonActionChain4 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      if (!$variables.createDialogObj.condFin_DocName) {

        const condFinDOCClose = await Actions.callComponentMethod(context, {
          selector: '#CondFin_DOC',
          method: 'close',
        });

        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.createDialogObj.condFinal_Val',
  ],
        });
        
      }
    }
  }

  return ButtonActionChain4;
});
