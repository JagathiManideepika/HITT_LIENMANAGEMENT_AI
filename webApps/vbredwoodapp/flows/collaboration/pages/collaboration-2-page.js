define([], () => {
  'use strict';

  class PageModule {

    downloadBase64File(dataUrl, fileName) {
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    getAfterInvoiceInstallments(url) {
      const marker = "invoiceInstallments/";
      const index = url.indexOf(marker);
      if (index === -1) return ""; // return empty string if not found
      return url.substring(index + marker.length);
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




    fileToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function () {
          resolve(reader.result); // returns the full base64 string with MIME type prefix
        };

        reader.onerror = function (error) {
          reject(error);
        };

        reader.readAsDataURL(file);
      });
    }
    getButtonLabel(status, nextstatus) {
      switch (status) {
        case 'Rejected':
          return 'Unconditional LW sent to Supplier';

        case 'Generate Conditional LW':
          return 'Send Conditional LW to Supplier';

        case 'Generate Unconditional LW':
          return 'Send Unconditional LW to Supplier';

        case 'NEW':
          return nextstatus;

        case 'Conditional LW sent to Supplier':
          return 'Upload Supplier Signed Conditional LW';

        case 'Unconditional LW sent to Supplier':
          return 'Upload Supplier Signed Unconditional LW';

        case 'Hold Released':
          return 'Generate Unconditional LW';

        case 'Supplier Signed Conditional LW uploaded':
          return 'Release for Payment';

        default:
          return 'No Action Available';
      }
    };



    filterData(selected, mydata, selectedKeys) {
      let data = JSON.parse(JSON.stringify(mydata));
      var keys = [];
      var filteredData = [];
      if (selected.row.isAddAll()) {
        var iterator = selected.row.deletedValues();
        iterator.forEach(function (key) {
          keys.push(key);
        });
        filteredData = data.filter(function (obj) {
          return !keys.some(function (obj2) {
            return obj.workbench_pk == obj2;
          });
        });
      }
      else {
        filteredData = data.filter(function (obj) {
          return selectedKeys.some(function (obj2) {
            return obj.workbench_pk == obj2;
          });
        });
      }
      return filteredData;
    };

    formatDate(inputDate) {
      const date = new Date(inputDate);
      const day = String(date.getDate()).padStart(2, '0');
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }
    processFile(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          const fileContent = e.target.result;
          const fileName = file.name;
          const fileType = file.type;

          resolve({
            fileName: fileName,
            fileType: fileType,
            fileContent: fileContent
          });
        };

        reader.onerror = function (error) {
          reject(error);
        };

      });
    }
    getSelectedRowsStatus(keys, data) {
      if (keys && data) {
        let isRelease = true;
        keys.forEach((kitm) => {
          data.forEach((ditm) => {
            if (ditm.ap_invoice === kitm) {
              if (ditm.attchment_status !== "Approved")
                isRelease = false;
            }
          });
        });
        return isRelease;
      }
    }
    getSelectedRows(keys, data) {
      if (keys && data) {
        let selectedRows = [];
        keys.forEach((kitm) => {
          data.forEach((ditm) => {
            if (ditm.ap_invoice === kitm) {
              selectedRows.push(ditm);
            }
          });
        });
        return selectedRows;
      }
    }
    getAllSelectedRowsStatus(data) {
      let isRelease = true;
      data.forEach((ditm) => {
        if (ditm.attchment_status !== "Approved")
          isRelease = false;

      });

      return isRelease;

    }
    //this is temporary we need to remove once the actual data is mapped
    addPaymentTypeTemporarily(data) {
      data.forEach((element, index) => {
        if (index % 2 !== 0) {
          element.payment_type = "Progress";
        } else {
          element.payment_type = "Final";
        }
      });
      return data;

    }

    // added for resend functionality
    showResendButton(status) {
      return status === 'Conditional LW sent to Supplier' ||
        status === 'Unconditional LW sent to Supplier';
    }

  }

  return PageModule;
});
