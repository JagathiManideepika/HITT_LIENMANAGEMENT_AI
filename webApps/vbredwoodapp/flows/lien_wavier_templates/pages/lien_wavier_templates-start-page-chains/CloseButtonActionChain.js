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

  class CloseButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const ojDialog15339727531Close = await Actions.callComponentMethod(context, {
        selector: '#oj-dialog-1533972753-1',
        method: 'close',
      });

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.headerObj',
  ],
      });
    }
  }

  return CloseButtonActionChain;
});
