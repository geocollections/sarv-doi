<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn color="cyan darken-2" dark v-on="on">
        <span>Export</span>
        <v-icon right>fas fa-file-export</v-icon>
      </v-btn>
    </template>
    <v-list color="cyan darken-2" dark dense>
      <v-list-item @click="exportToCSV">
        <v-list-item-title>
          Export to CSV
          <v-icon right>far fa-file</v-icon>
        </v-list-item-title>
      </v-list-item>

      <v-list-item @click="copyToClipboard">
        <v-list-item-title>
          Copy to clipboard
          <v-icon right>far fa-copy</v-icon>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import toastMixin from "../../mixins/toastMixin";

export default {
  name: "ExportButtons",
  mixins: [toastMixin],
  props: {
    filename: {
      type: String,
      default: "SARV_DOI"
    },
    tableData: {
      type: Array
    }
  },
  methods: {
    exportToCSV() {
      if (this.tableData) {
        let csvString = this.convertJsonToCsv(this.tableData);

        if (csvString.length === 0) {
          this.toastError({ text: "Download failed: Not enough data!" });
          return;
        }

        let file = new Blob([csvString], { type: "text/plain" });

        if (window.navigator.msSaveOrOpenBlob)
          // IE10+
          window.navigator.msSaveOrOpenBlob(file, this.filename + ".csv");
        else {
          // Others
          let a = document.createElement("a");
          let url = URL.createObjectURL(file);
          a.href = url;
          a.download = this.filename + ".csv";
          document.body.appendChild(a);
          a.click();
          setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          }, 0);
        }

        this.toastSuccess({ text: "Exported to <strong>CSV</strong>" });
      } else {
        this.toastError({ text: "Download failed: Not enough data!" });
      }
    },

    convertJsonToCsv(jsonArray) {
      const { Parser } = require("json2csv");

      // Possibility to export exact fields for each object
      const fields = Object.keys(jsonArray[0]);
      const opts = { fields };

      try {
        const parser = new Parser(opts);
        return parser.parse(jsonArray);
      } catch (err) {
        this.toastError({ text: err });
        return "";
      }
    },

    copyToClipboard() {
      if (this.tableData) {
        let el = document.getElementsByClassName("list-module-core-table");

        let body = document.body,
          range,
          sel;
        if (document.createRange && window.getSelection) {
          range = document.createRange();
          sel = window.getSelection();
          sel.removeAllRanges();
          try {
            range.selectNodeContents(el[0]);
            sel.addRange(range);
          } catch (e) {
            range.selectNode(el[0]);
            sel.addRange(range);
          }
        } else if (body.createTextRange) {
          range = body.createTextRange();
          range.moveToElementText(el[0]);
          range.select();
        }
        document.execCommand("Copy");
        sel.removeAllRanges();

        this.toastSuccess({ text: "Copied to <strong>clipboard!</strong>" });
      } else {
        this.toastError({ text: "Copying failed: Nothing to copy!" });
      }
    }
  }
};
</script>

<style scoped></style>
