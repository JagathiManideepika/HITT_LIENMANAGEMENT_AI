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

  class ButtonActionChain1 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      if (!$variables.createDialogObj.condPar_DopcName) {

        await Actions.resetVariables(context, {
          variables: [
            '$page.variables.createDialogObj.condPar_Val',
          ],
        });

      }
      const condParDOCClose = await Actions.callComponentMethod(context, {
        selector: '#CondPar_DOC',
        method: 'close',
      });
    }
  }

  return ButtonActionChain1;
});
