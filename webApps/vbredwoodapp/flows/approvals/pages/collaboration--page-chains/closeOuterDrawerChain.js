/* Copyright (c) 2024, Oracle and/or its affiliates */

define([
  'vb/action/actionChain',
], ActionChain => {
  'use strict';

  class closeOuterDrawerChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page } = context;

      $page.variables.endOpenStatus = "none";
    }
  }

  return closeOuterDrawerChain;
});