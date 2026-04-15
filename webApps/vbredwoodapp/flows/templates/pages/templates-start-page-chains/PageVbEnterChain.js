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

  class PageVbEnterChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     */
    async run(context, { event }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'PWP_ORDS/getLM_HITT_TEMPLATES',
      });

      const addIds = await $functions.addIds(response.body.items);

      $variables.tableADP.data = addIds;
    }

  }

  return PageVbEnterChain;
});
