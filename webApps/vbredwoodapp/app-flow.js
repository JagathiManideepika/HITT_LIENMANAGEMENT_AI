/* Copyright (c) 2024, Oracle and/or its affiliates */

define(['oj-sp/spectra-shell/config/config'], function () {
  'use strict';

  class AppModule {

    

// used in templates page
     sendAsYearMonthDate(dateInput) {
  return new Date(dateInput).toISOString().slice(0, 10);
}

    validateGroup(id) {
      var tracker = document.getElementById(id);
      if (tracker.valid === "valid") {
      }
      else if (tracker.valid.startsWith("invalid")) {
        if (tracker.valid === "invalidHidden") {
          tracker.showMessages();
        }
        tracker.focusOn("@firstInvalidShown");
      }
      return tracker.valid;
    }

    downloadPDF(base64String, fileName = 'file.pdf') {
      const byteCharacters = atob(base64String);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });


      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();


      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    }



    // role based authentication Code starts


    getUsernameFromJwt(token) {
      try {
        if (token) {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(
            atob(base64).split('').map(c =>
              '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            ).join('')
          );
          const payload = JSON.parse(jsonPayload);
          return payload.sub || null;

        }

      } catch (e) {
        console.error("Invalid JWT token", e);
        return null;
      }
    }
    getMenuItems(menuList, accessFlagArray) {

      if (!Array.isArray(accessFlagArray) || accessFlagArray.length === 0) {
        return [];
      }

      // Extract all access_flag values → ["U"] or ["M", "U"]
      const flags = accessFlagArray.map(item => item.access_flag);

      // If flags contain ONLY "N" → return no menu
      if (flags.every(flag => flag === "N")) {
        return [];
      }

      // 1. If access contains 'M' → full access
      if (flags.includes("M")) {
        return [...menuList];
      }

      // 2. If access contains 'U' → workbench + templates
      if (flags.includes("U")) {
        return menuList.filter(item =>
          item.id === "shell/templates" ||
          item.id === "shell/collaboration" ||
          item.id === "shell/lien_wavier_templates" ||
          item.id === "shell/logscreen"
        );
      }

      // 3. If unknown access → no pages
      return [];
    }



    // role based authentication Code ends

  }

  return AppModule;
});
