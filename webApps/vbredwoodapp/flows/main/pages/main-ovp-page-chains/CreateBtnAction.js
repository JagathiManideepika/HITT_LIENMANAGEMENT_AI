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

  class CreateBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const addCriteriaModalOpen = await Actions.callComponentMethod(context, {
        selector: '#Add-criteria-modal',
        method: 'open',
      });

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.createobj',
  ],
      });
    }
  }

  return CreateBtnAction;
});
