/* Copyright (c) 2024, Oracle and/or its affiliates */

define([
  'vb/action/actionChain',
], ActionChain => {
  'use strict';

  class closeInnerBottomDrawerChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page } = context;

      if ($page.variables.innerBottomDrawerState === 'closed') {
        $page.variables.bottomOpenStatus = 'none';
      }
    }
  }

  return closeInnerBottomDrawerChain;
});