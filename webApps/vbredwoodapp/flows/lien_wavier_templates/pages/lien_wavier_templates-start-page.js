define([], () => {
  'use strict';

  class PageModule {

    dataaddition(title) {
      document.querySelector(".title").textContent = title;
    }



    downloadWaiverAsWord(docname) {
      const element = document.getElementById('waiContainer');
      // const element = document.getElementById('waiverContainer');

      if (!element) {
        alert('waiverContainer not found!');
        return;
      }
      const html = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' 
          xmlns:w='urn:schemas-microsoft-com:office:word' 
          xmlns='http://www.w3.org/TR/REC-html40'>
    <head><title>Waiver Document</title>
      <style>
        body { font-family: Arial, sans-serif; font-size: 14px; }
        h1, h2, h3 { text-align: center; text-decoration: underline; }
        div { margin: 10px 0; }
      </style>
    </head>
    <body>
      ${element.innerHTML}
    </body>
    </html>
  `;
      const blob = new Blob(['\ufeff', html], {
        type: 'application/msword'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = docname + '.doc';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
    }


    releaseonprogresspaymentConditionalLienWaiver(data, project) {

      const waiverText = `
  <div style="font-family: Arial, sans-serif; font-size: 11pt; line-height: 1.5;">

  <p style="text-align: center;"text-decoration: underline;"><strong>CONDITIONAL WAIVER AND RELEASE ON PROGRESS PAYMENT</strong></p>

  <p><strong>Project</strong> <span style="text-decoration: underline;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></p>
  <p><strong>Job No.</strong> <span style="text-decoration: underline;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></p>

  <p>
    On receipt by the signer of this document of a check from 
    <span style="text-decoration: underline;">$_________</span> (maker of check) in the sum of 
    <span style="text-decoration: underline;">$_________</span> payable to 
    <span style="text-decoration: underline;">_______________</span> (payee or payees of check) and when the check has been properly endorsed and has been paid by the bank on which it is drawn, this document becomes effective to release any mechanic’s lien right, any right arising from a payment bond that complies with a state or federal statute, any common law payment bond right, any claim for payment, and any rights under any similar ordinance, rule, or statute related to claim or payment rights for persons in the signer’s position that the signer has on the property of 
    <span style="text-decoration: underline;">_______________</span> (owner) located at 
    <span style="text-decoration: underline;">__________</span> (location) to the following extent 
    <span style="text-decoration: underline;">____________</span> (job description).
  </p>

  <p>
    This release covers a progress payment for all labor, services, equipment, or materials furnished to the property or to 
    <span style="text-decoration: underline;">___________</span> (person with whom signer contracted) as indicated in the attached statement(s) or progress payment request(s), except for unpaid retention, pending modifications and changes, or other items furnished.
  </p>

  <p>
    Before any recipient of this document relies on this document, the recipient should verify evidence of payment to the signer.
  </p>

  <p>
    The signer warrants that the signer has already paid or will use the funds received from this progress payment to promptly pay in full all of the signer’s laborers, subcontractors, materialmen, and suppliers for all work, materials, equipment, or services provided for or to the above referenced project in regard to the attached statement(s) or progress payment request(s).
  </p>

  <p><strong>Date</strong> <span style="text-decoration: underline;">___________________</span></p>
  <p><span style="text-decoration: underline;">_______________________</span> (Company name)</p>
  <p><strong>By</strong> <span style="text-decoration: underline;">_____________________</span> (Signature)</p>

  <p style="margin-top: 20px; font-weight: bold;">
    NOTICE: <span style="font-weight: bold;">
      This document waives rights unconditionally and states that you have been paid for giving up those rights. 
      It is prohibited for a person to require you to sign this document if you have not been paid the payment amount set forth below. 
      If you have not been paid, use a conditional release form.
    </span>
  </p>
</div>
`;
      document.getElementById('waiverContainer').innerHTML = waiverText;
        document.getElementById('waiContainer').innerHTML = waiverText;
    }

    unconditionalDoc() {
      const unconditionalWaiverHtml = `
  <div style="font-family: Arial, sans-serif; font-size: 11pt; line-height: 1.5;">
    <p style="text-align: center;"text-decoration: underline;"><strong>UNCONDITIONAL WAIVER AND RELEASE ON PROGRESS PAYMENT</strong></p>

    <p><strong>Project</strong> <span style="text-decoration: underline;">_______________</span></p>
    <p><strong>Job No</strong> <span style="text-decoration: underline;">_______________</span></p>

    <p>
      This signer of this document has paid and has received a progress payment in the sum of 
      <span style="text-decoration: underline;">$__________</span> for all labor, services, equipment, or materials 
      furnished to the property or to 
      <span style="text-decoration: underline;">_________________</span> (person with whom signer contracted) on the 
      property of <span style="text-decoration: underline;">______________</span> (owner) located at 
      <span style="text-decoration: underline;">_______________</span> (location) to the following extent: 
      <span style="text-decoration: underline;">_____________</span> (job description). 
      The signer therefore waives and releases any mechanic’s lien right, any right arising from a payment bond that 
      complies with a state or federal statute, any common law payment bond right, any claim for payment, and any rights 
      under any similar ordinance, rule, or statute related to claim or payment rights for persons in the signer’s 
      position that the signer has on the above referenced project to the following extent:
    </p>

    <p>
      This release covers a progress payment for all labor, services, equipment, or materials furnished to the property or to 
      <span style="text-decoration: underline;">____________</span> (person with whom signer contracted) as indicated in 
      the attached statement(s) or progress payment request(s), except for unpaid retention, pending modifications and 
      changes, or other items furnished.
    </p>

    <p>
      The signer warrants that the signer has already paid or will use the funds received from this progress payment to 
      promptly pay in full all of the signer’s laborers, subcontractors, materialmen, and suppliers for all work, 
      materials, equipment, or services provided for or to the above referenced project in regard to the attached 
      statement(s) or progress payment request(s).
    </p>

    <p><strong>Date</strong> <span style="text-decoration: underline;">__________________</span></p>
    <p><span style="text-decoration: underline;">______________________</span> (Company name)</p>
    <p><strong>By</strong> <span style="text-decoration: underline;">____________________</span> (Signature)</p>

    <p style="margin-top: 20px; font-weight: bold;">
      NOTICE: 
      <span style="font-weight: normal;">
        This document waives rights unconditionally and states that you have been paid for giving up those rights. 
        It is prohibited for a person to require you to sign this document if you have not been paid the payment 
        amount set forth below. If you have not been paid, use a conditional release form.
      </span>
    </p>
  </div>
`;
      // document.getElementById("waiverContainer").innerHTML = unconditionalWaiverHtml;
      document.getElementById("waiContainer").innerHTML = unconditionalWaiverHtml;


    }




    finalConditionalDoc() {
      const finalConditionalText = `<div style="font-family: Arial, sans-serif; font-size: 11pt; line-height: 1.5;">

  <p style="text-align: center;"text-decoration: underline;""><strong>CONDITIONAL WAIVER AND RELEASE ON FINAL PAYMENT</strong></p>

  <p><strong>Project</strong> <span style="text-decoration: underline;">_____________</span></p>
  <p><strong>Job No.</strong> <span style="text-decoration: underline;">______________</span></p>

  <p>
    On receipt by the signer of this document of a check from 
    <span style="text-decoration: underline;">______________</span> (maker of check) in the sum of 
    <span style="text-decoration: underline;">$ _______________</span> payable to 
    <span style="text-decoration: underline;">______________________</span> (payee or payees of check) and when the check 
    has been properly endorsed and has been paid by the bank on which it is drawn, this document becomes effective to release 
    any mechanic’s lien right, any right arising from a payment bond that complies with a state or federal statute, any common 
    law payment bond right, any claim for payment, and any rights under any similar ordinance, rule, or statute related to 
    claim or payment rights for persons in the signer’s position that the signer has on the property of 
    <span style="text-decoration: underline;">_____________</span> (owner) located at 
    <span style="text-decoration: underline;">_________________</span> (location) to the following extent: 
    <span style="text-decoration: underline;">__________________</span> (job description).
  </p>

  <p>
    This release covers the final payment to the signer for all labor, services, equipment, or materials furnished to the 
    property or to <span style="text-decoration: underline;">________________</span> (person with whom signer contracted).
  </p>

  <p>
    Before any recipient of this document relies on this document, the recipient should verify evidence of payment to the signer.
  </p>

  <p>
    This signer warrants that the signer has already paid or will use the funds received from this final payment to promptly pay 
    in full all of the signer’s laborers, subcontractors, materialmen, and suppliers for all work, materials, equipment, or 
    services provided for or to the above referenced project up to the date of this waiver and release.
  </p>

  <p><strong>Date</strong> <span style="text-decoration: underline;">__________________</span></p>
  <p><span style="text-decoration: underline;">_______________________</span> (Company name)</p>
  <p><strong>By</strong> <span style="text-decoration: underline;">______________________</span> (Signature)</p>
  <p><span style="text-decoration: underline;">_________________________</span> (Title)</p>

</div>
`;
      // document.getElementById("waiverContainer").innerHTML = finalConditionalText;
        document.getElementById("waiContainer").innerHTML = finalConditionalText;
    }

    finalUnconditionalDoc() {
      const finalUnconditionalText = `<div style="font-family: Arial, sans-serif; font-size: 11pt; line-height: 1.5;">

  <p style="text-align: center;"text-decoration: underline;"><strong>UNCONDITIONAL WAIVER AND RELEASE ON FINAL PAYMENT</strong></p>

  <p><strong>Project</strong> <span style="text-decoration: underline;">______________</span></p>
  <p><strong>Job No.</strong> <span style="text-decoration: underline;">______________</span></p>

  <p>
    This signer of this document has been paid in full for all labor, services, equipment, or materials furnished to the 
    property or to <span style="text-decoration: underline;">____________</span> (person with whom signer contracted) on the 
    property of <span style="text-decoration: underline;">___________________</span> (owner) located at 
    <span style="text-decoration: underline;">________________</span> (location) to the following extent: 
    <span style="text-decoration: underline;">________________</span> (job description). 
    The signer therefore waives and releases any mechanic’s lien right, any right arising from a payment bond that complies 
    with a state or federal statute, any common law payment bond right, any claim for payment, and any rights under any 
    similar ordinance, rule, or statute related to claim or payment rights for persons in the signer’s position.
  </p>

  <p>
    The signer warrants that the signer has already paid or will use the funds received from this final payment to promptly 
    pay in full all of the signer’s laborers, subcontractors, materialmen, and suppliers for all work, materials, equipment, 
    or services provided for or to the above referenced project up to the date of this waiver and release.
  </p>

  <p><strong>Date</strong> <span style="text-decoration: underline;">___________________</span></p>
  <p><span style="text-decoration: underline;">________________________</span> (Company name)</p>
  <p><strong>By</strong> <span style="text-decoration: underline;">______________________</span> (Signature)</p>
  <p><span style="text-decoration: underline;">_________________________</span> (Title)</p>

</div>
`;
      // document.getElementById("waiverContainer").innerHTML = finalUnconditionalText;
       document.getElementById("waiContainer").innerHTML = finalUnconditionalText;
    }

    fileToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
          const base64String = reader.result.split(',')[1]; // Removes the data:*/*;base64, part
          resolve(base64String);
        };

        reader.onerror = (error) => {
          reject(error);
        };

        reader.readAsDataURL(file);
      });
    }
    checkBoxPayloadDtls(data) {

      if (data) {
        let lienwavierData = [];
        data.forEach((itm) => {
          let obj = {
            "template_name": itm.template_name,
            "template_text": itm.template_text
          };
          lienwavierData.push(obj);
        });
        return lienwavierData;
      }
    };
    getDateFormate(edate) {
      let wavedate;
      if (edate) {
        const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
          "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        const t1 = new Date(edate);
        let t1Date = t1.getDate() >= 10 ? t1.getDate() : "0" + t1.getDate();
        wavedate = t1Date + '-' + monthNames[t1.getMonth()] + '-' + t1.getFullYear();
      }
      return wavedate;
    };

    getWaveTemplatePayload(data, stateData, resultData, userLgn) {
      if (data) {
        let payLoad = {
          "p_template_name": data.templatename,
          "p_lien_waiver_type": data.lienwaviertype,
          "p_start_date": this.getDateFormate(data.startdate),
          "p_end_date": this.getDateFormate(data.enddate),
          "p_enable_flag": data.enableFlag === "True" ? "Y" : "N",
          "p_applicable_state": stateData,
          "p_file_name": data.templatename,
          "p_file_type": "html",
          "p_file_content": resultData,
          "p_created_by": userLgn,
          "p_last_updated_by": userLgn,
          "p_last_update_login": new Date(),
          "p_template_line_id": ''
        };
        return payLoad;

      }
    };
    getStateDetails(data) {
      let stateArray = [];
      if (data) {
        data.forEach((itm) => {
          stateArray.push(itm);
        });
      }
      return stateArray;
    };
    changeTimeStamp(data) {
      if (data) {
        let sfdate = data.split('T');
        let efdate = sfdate[0].split('-');
        return efdate[2] + '-' + efdate[1] + '-' + efdate[0];
      }
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
    };
    shouldProceed(stateSet, documentType) {
      const requiredStates = ["Indiana", "Tennessee", "Illinois"];
      const validDocuments = new Set([
        "Conditional Lien Waiver and Release For Progress Payment",
        "Conditional Lien Waiver and Release For Final Payment"
      ]);

      const allStatesPresent = requiredStates.every(state => stateSet.has(state));
      const isValidDocument = validDocuments.has(documentType);

      return !(allStatesPresent && isValidDocument);
    }
    isPennsylvaniaInSet(stateSet) {
      return stateSet.has("Pennsylvania");
    }


    formatDate(inputDate) {
      const date = new Date(inputDate);
      const day = String(date.getDate()).padStart(2, '0');
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };
  };


  return PageModule;
});
