<template>
  <v-btn
    v-if="egf && fileId"
    icon
    color="customRed"
    @click="downloadEgfFile(egf, fileId, filename)"
  >
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <div v-on="on">
          <v-icon v-if="loading">fas fa-spinner fa-spin</v-icon>
          <v-icon v-else color="customRed">fas fa-file-download</v-icon>
        </div>
      </template>
      <span>
        <span v-if="!loading"
          >Download file: <b>{{ filename }}</b></span
        >
        <span v-else>Downloading file<span class="loading-dots"></span></span>
      </span>
    </v-tooltip>
  </v-btn>
</template>

<script>
import { downloadEgfFile } from "@/middleware/api";
import toastMixin from "../../mixins/toastMixin";

export default {
  name: "EgfFileDownload",
  mixins: [toastMixin],
  props: {
    egf: {
      type: Number,
      required: true
    },
    fileId: {
      type: Number,
      required: true
    },
    filename: {
      type: String
    }
  },
  data() {
    return {
      egfFileUrl: "https://api.geoloogia.info/egf/get-file",
      loading: false
    };
  },
  methods: {
    downloadEgfFile(egf, fileId, filename) {
      if (!this.loading) {
        let url = this.getEgfFile(egf, fileId);
        if (url) {
          this.loading = true;
          this.toastInfo({
            text: `Started downloading file: <b>${filename}</b>`,
            timeout: 2000
          });

          downloadEgfFile(url)
            .then(blob => {
              let blobUrl = window.URL.createObjectURL(blob);
              let a = document.createElement("a");
              a.href = blobUrl;
              a.download = filename || "egf_file";
              a.click();
              window.URL.revokeObjectURL(blobUrl);
              a.remove();

              this.loading = false;
              this.toastSuccess({
                text: `File <b>${filename}</b> downloaded successfully!`
              });
            })
            .catch(err => {
              this.toastError({
                text: `Failed to download file: <b>${filename}</b><br>${err}`
              });
              this.loading = false;
            });
        } else this.toastError({ text: "Couldn't get file url!" });
      } else
        this.toastInfo({
          text: "Please wait until the file finished downloading!"
        });
    },

    getEgfFile(egf, fileId) {
      if (egf && fileId) {
        return `${this.egfFileUrl}/${egf}/${fileId}`;
      } else return "";
    }
  }
};
</script>

<style scoped>
.loading-dots:before {
  animation: dots 2s linear infinite;
  content: "";
}

@keyframes dots {
  0%,
  20% {
    content: ".";
  }
  40% {
    content: "..";
  }
  60% {
    content: "...";
  }
  90%,
  100% {
    content: "";
  }
}
</style>
