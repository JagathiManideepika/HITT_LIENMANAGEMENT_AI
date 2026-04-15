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

  class DownloadFileAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const loadingDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'open',
      });
      await $functions.downloadBase64Files(current.row.unconditional_signed_doc, 'Supplier_Signed_UnConditonalLW');

      await $functions.downloadBase64Files(current.row.conditional_signed_doc, 'Supplier_Signed_ConditonalLW');

      const loadingDialogClose = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'close',
      });
    }
  }

  return DownloadFileAction;
});
