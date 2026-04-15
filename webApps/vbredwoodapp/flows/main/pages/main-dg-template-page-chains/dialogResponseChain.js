/* Copyright (c) 2024, Oracle and/or its affiliates */

define([
  'vb/action/actionChain'
], ActionChain => {
  'use strict';

  class dialogResponseChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.response
     */
    async run(context, { response }) {
      const { $page } = context;

      $page.functions.userResponse(response);

      // Close dialog
      $page.variables.dirtyDialogOpen = false;
    }
  }

  return dialogResponseChain;
});