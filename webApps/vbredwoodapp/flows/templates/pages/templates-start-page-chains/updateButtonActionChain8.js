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

  class updateButtonActionChain8 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     * @param {any} params.key
     * @param {number} params.index
     * @param {any} params.current
     */
    async run(context, { event, originalEvent, key, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.dialogTitle = "Update Template";
      $variables.isDialogInitialized = false; 
     $variables.createDialogObj.stateVal = current.row.state_name;
      $variables.createDialogObj.condFin_docID = current.row.documentid_conditional_final;
      $variables.createDialogObj.condPar_docID = current.row.documentid_conditional_partial;
      $variables.createDialogObj.uncondFinal_docID = current.row.documentid_unconditional_final;
      $variables.createDialogObj.uncondPar_docID = current.row.documentid_conditional_partial;
      $variables.createDialogObj.condFinal_Val = current.row.conditional_final;
      $variables.createDialogObj.uncond_Final = current.row.unconditional_final;
      $variables.createDialogObj.uncond_Par = current.row.unconditional_partial;
      $variables.createDialogObj.condPar_Val = current.row.conditional_partial;

      const iUDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#IUDialog',
        method: 'open',
      });
    }
  }

  return updateButtonActionChain8;
});
