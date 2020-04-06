<template>
  <div class="file-preview" v-if="data">
    <div>
      <!-- AUDIO -->
      <audio v-if="isAudioFile" controls>
        <source
          :src="getFileLink({ filename: data.attachment__uuid_filename })"
          :type="data.attachment__attachment_format__value"
        />
        Your browser does not support the audio element.
        <v-icon>far fa-file-audio</v-icon>
      </audio>

      <!-- VIDEO -->
      <video v-else-if="isVideoFile" type="video" controls>
        <source
          :src="getFileLink({ filename: data.attachment__uuid_filename })"
          :type="data.attachment__attachment_format__value"
        />
        Your browser does not support the video element.
        <v-icon>far fa-file-video</v-icon>
      </video>

      <!-- IMAGE -->
      <v-img
        v-else-if="isImageFile"
        alt="Image preview..."
        :src="getFileLink({ filename: data.attachment__uuid_filename })"
        :lazy-src="
          getFileLink({
            filename: data.attachment__uuid_filename,
            size: 'small'
          })
        "
        :title="getFileLink({ filename: data.attachment__uuid_filename })"
        max-height="130"
        max-width="175"
        class="link"
        @click="
          openUrl({
            url: getFileLink({ filename: data.attachment__uuid_filename })
          })
        "
      >
      </v-img>

      <!-- IF ABOVE FAILS THEN SHOW FILE ICON -->
      <v-btn
        v-else
        color="red darken-2 darken-1"
        icon
        :href="getFileLink({ filename: data.attachment__uuid_filename })"
        :title="getFileLink({ filename: data.attachment__uuid_filename })"
        target="FilePreviewWindow"
      >
        <v-icon large>far {{ getAttachmentIcon(data) }}</v-icon>
      </v-btn>
    </div>

    <div class="text-right mb-2" v-if="isAudioFile || isVideoFile">
      <v-btn
        color="red darken-2 darken-1"
        x-small
        icon
        :href="getFileLink({ filename: data.attachment__uuid_filename })"
        :title="getFileLink({ filename: data.attachment__uuid_filename })"
        target="FilePreviewWindow"
      >
        <v-icon>fas fa-external-link-alt</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilePreview",
  props: {
    data: {
      required: true
    }
  },
  computed: {
    isAudioFile() {
      return !!(
        this.data.attachment__attachment_format__value &&
        this.data.attachment__attachment_format__value.includes("audio")
      );
    },

    isVideoFile() {
      if (this.data.attachment__attachment_format__value) {
        return !!this.data.attachment__attachment_format__value.includes(
          "video"
        );
      } else {
        // As of 18.09.2019 total of 1508 attachments are without attachment_format__value and only 1 is webm
        return !!this.data.attachment__uuid_filename
          .split(".")[1]
          .includes("webm");
      }
    },

    isImageFile() {
      if (this.data.attachment__attachment_format__value) {
        return !!this.data.attachment__attachment_format__value.includes(
          "image"
        );
      } else {
        let fileType = this.data.attachment__uuid_filename.split(".")[1];
        // As of 18.09.2019 total of 1508 attachments are without attachment_format__value which 859 are jpg and 2 png
        return !!(fileType.includes("jpg") || fileType.includes("png"));
      }
    }
  },
  methods: {
    getAttachmentIcon(attachment) {
      if (attachment.attachment__attachment_format__value) {
        let fileType = attachment.attachment__attachment_format__value;
        if (fileType.includes("application")) {
          if (fileType.includes("docx")) return "fa-file-word";
          else if (fileType.includes("pdf")) return "fa-file-pdf";
          else if (fileType.includes("xlsx") || fileType.includes("ods"))
            return "fa-file-excel";
          else if (fileType.includes("zip")) return "fa-file-archive";
          else return "fa-file";
        } else if (fileType.includes("audio")) return "fa-file-audio";
        else if (fileType.includes("image")) return "fa-file-image";
        else if (fileType.includes("text")) return "fa-file-alt";
        else if (fileType.includes("video")) return "fa-file-video";
        else return "fa-file";
      } else {
        let fileType = attachment.attachment__uuid_filename.split(".")[1];
        // As of 18.09.2019 total of 1508 attachments are without attachment_format__value
        if (fileType.includes("jpg") || fileType.includes("png"))
          return "fa-file-image";
        // 859 jpg and 2 png
        else if (fileType.includes("pdf")) return "fa-file-pdf";
        // 635 pdf
        else if (fileType.includes("xls") || fileType.includes("ods"))
          return "fa-file-excel";
        // 4 xls and 2 ods
        else if (fileType.includes("txt")) return "fa-file-alt";
        // 1 txt
        else if (fileType.includes("webm")) return "fa-file-video";
        // 1 webm
        else return "fa-file"; // 4 hz1
      }
    },

    getFileLink(params) {
      if (params.size) {
        return (
          "https://files.geocollections.info/" +
          params.size +
          "/" +
          params.filename.substring(0, 2) +
          "/" +
          params.filename.substring(2, 4) +
          "/" +
          params.filename
        );
      } else {
        return (
          "https://files.geocollections.info/" +
          params.filename.substring(0, 2) +
          "/" +
          params.filename.substring(2, 4) +
          "/" +
          params.filename
        );
      }
    },

    openUrl(params) {
      window.open(params.url, "FilePreviewWindow");
    }
  }
};
</script>

<style scoped>
.link:hover {
  cursor: pointer;
  opacity: 0.85;
}
</style>
