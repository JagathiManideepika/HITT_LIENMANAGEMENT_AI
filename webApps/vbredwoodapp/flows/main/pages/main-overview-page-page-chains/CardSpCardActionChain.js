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

  class CardSpCardActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const toMainDgTemplate = await Actions.navigateToPage(context, {
        page: 'main-dg-template',
      });
    }
  }

  return CardSpCardActionChain;
});
