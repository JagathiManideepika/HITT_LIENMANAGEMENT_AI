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

  class TableSelectedChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any[]} params.keys 
     * @param {any} params.selected 
     */
    async run(context, { keys, selected }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;


      const filterData = await $functions.filterData(selected, $variables.collabration2ADP.data, keys);

      $variables.holdIdsArray = filterData;
    }
  }

  return TableSelectedChangeChain;
});
