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

  class EditiconClickAction extends ActionChain {

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
   

      // $variables.createobj = current.row;
      $variables.createobj.enabled_flag_copy = current.row.enabled_flag === 'Y';
      $variables.dialogLabel = 'Edit';

      // const checkedLabels = await $functions.getCheckedLabels(current.row);  //commented because not using these templates in criteria page.
       
      $variables.createobj.top_task_id = current.row.top_task_id;
      $variables.createobj.criteria_id = current.row.criteria_id;
      $variables.createobj.task_id = current.row.task_id;
      $variables.createobj.project_id = current.row.project_id;
      $variables.createobj.criteria_name = current.row.criteria_name;
      $variables.createobj.project_name = current.row.project_name;
      $variables.createobj.top_task_name = current.row.top_task_name;
      $variables.createobj.task_name = current.row.task_name;
      $variables.createobj.expenditure_category = current.row.expenditure_category;
      $variables.createobj.expenditure_type = current.row.expenditure_type;
      $variables.createobj.supplier_name = current.row.supplier_name;
      $variables.createobj.supplier_site = current.row.supplier_site;
      $variables.createobj.start_dt_copy = current.row.start_dt;
      $variables.createobj.end_dt_copy = current.row.end_dt;
      $variables.createobj.wavier_type = current.row.weiver_type;
      $variables.createobj.invoice_amount_limit =current.row.invoice_amount_limit;
      // $variables.wavier_type_dtls = checkedLabels; //commented because not using these templates in criteria page.
       
      $variables.createobj.applicable_state = current.row.state;




      const loadingDialogClose = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'close',
      });

      await Actions.callComponentMethod(context, {
        selector: '#Add-criteria-modal',
        method: 'open',
      });
    }
  }

  return EditiconClickAction;
});
