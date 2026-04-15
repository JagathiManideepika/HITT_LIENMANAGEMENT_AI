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

  class statesLovActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.value 
     */
    async run(context, { value }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
      const pennsylvaniaInSet = await $functions.isPennsylvaniaInSet(value);

      if (pennsylvaniaInSet) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Conditional Lien waivers allowed only for residential contracts in Pennsylvania, please review.',
          type: 'warning',
          displayMode: 'transient',
        });
      }
 
    }
  }

  return statesLovActionChain;
});
