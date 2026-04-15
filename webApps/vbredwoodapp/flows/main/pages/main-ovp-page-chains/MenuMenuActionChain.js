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

  class MenuMenuActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.menuId 
     */
    async run(context, { menuId }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      switch (menuId) {
        case 'item1':

          await Actions.navigateToFlow(context, {
            target: 'parent',
            flow: 'collaboration',
            page: 'approvals-start',
            params: {},
          });
          break;

        case 'item2':
          const toMainDgTemplate = await Actions.navigateToPage(context, {
            page: 'main-dg-template',
          });
          break;
        case 'item3':
          const toDashboard = await Actions.navigateToPage(context, {
            page: 'dashboard',
          });
          break;

        default:
          console.warn('Invalid menuId: No matching navigation found');
          break;
      }
    }
  }

  return MenuMenuActionChain;
});
