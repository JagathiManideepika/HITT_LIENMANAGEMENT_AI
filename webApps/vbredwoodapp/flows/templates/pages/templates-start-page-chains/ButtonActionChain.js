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

  class ButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, {  files  }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      
      $variables.createDialogObj.condPar_DopcName = files[0].name;

    }
  }

  return ButtonActionChain;
});
