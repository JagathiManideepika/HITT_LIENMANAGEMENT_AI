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

  class TemplateTblBeforeRowEditEnd extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.cancelEdit 
     * @param {any} params.rowKey 
     * @param {number} params.rowIndex 
     * @param {any} params.rowData 
     */
    async run(context, { cancelEdit, rowKey, rowIndex, rowData }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      rowData.enable_flag = $variables.rowData.enable_flag === true ? 'Y' : 'N';

      await Actions.fireDataProviderEvent(context, {
        target: $variables.waveTemplateADP,
        update: {
          data: $variables.rowData,
          keys: [rowKey],
        },
      });
    }
  }

  return TemplateTblBeforeRowEditEnd;
});
