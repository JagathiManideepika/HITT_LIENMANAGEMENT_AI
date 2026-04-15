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

  class CloseViewButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const dailogViewDocumentsClose = await Actions.callComponentMethod(context, {
        selector: '#dailogViewDocuments',
        method: 'close',
      });
    }
  }

  return CloseViewButtonActionChain;
});
