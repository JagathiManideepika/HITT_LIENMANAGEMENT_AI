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

  class SelectValueItemChangeChain1 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.previousValue
     * @param {any} params.value
     * @param {string} params.updatedFrom
     * @param {any} params.key
     * @param {any} params.data
     * @param {any} params.metadata
     * @param {any} params.valueItem
     */
    async run(context, { event, previousValue, value, updatedFrom, key, data, metadata, valueItem }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      if ($variables.createDialogObj.condPar_Val === 'Yes') {

        // $variables.isDialogInitialized = true;

        // if ($variables.isDialogInitialized && previousValue.data!=null) {


        const condParDOCOpen = await Actions.callComponentMethod(context, {
          selector: '#CondPar_DOC',
          method: 'open',
        });
        // }

      }

    }
  }

  return SelectValueItemChangeChain1;
});
