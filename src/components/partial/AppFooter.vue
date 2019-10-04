<template>
  <v-footer
    class="footer justify-center flex-column pt-1 px-3 pb-2"
    color="#1db954"
    dark
  >
    <div class="footer-logos my-2">
      <a
        v-for="link in imageLinks"
        :key="link.url"
        :href="link.url"
        target="FooterLinkWindow"
      >
        <img
          class="footer-logo"
          :src="link.image"
          :alt="link.alt"
          :title="link.title"
        />
      </a>
    </div>

    <div class="footer-text mb-2">
      &copy; {{ new Date().getFullYear() }} Data contributors. Content on this
      site is licensed under the
      <a
        href="https://creativecommons.org/licenses/by-sa/3.0/"
        target="LicenceWindow"
        title="https://creativecommons.org/licenses/by-sa/3.0/"
        >CC BY-SA</a
      >
      Licence, if not indicated otherwise.<br />
      Developed as part of
      <a
        href="https://natarc.ut.ee"
        target="FooterLinkWindow"
        title="https://natarc.ut.ee"
        >NATARC</a
      >
      infrastructure and a component of
      <a
        href="https://geocollections.info"
        target="GeocollectionsWindow"
        title="https://geocollections.info"
        >SARV</a
      >. Hosted by the
      <a
        href="https://taltech.ee/geoloogia-instituut"
        target="FooterLinkWindow"
        title="https://taltech.ee/geoloogia-instituut"
        >Department of Geology, TalTech</a
      >
    </div>
  </v-footer>
</template>

<script>
export default {
  name: "AppFooter",
  data: () => ({
    imageLinks: [
      {
        image: require("../../assets/img/datacite_logo.png"),
        url: "https://datacite.org",
        alt: "DataCite",
        title: "DataCite"
      },
      {
        image: "https://files.geocollections.info/img/natarclogovalge1.png",
        url: "https://natarc.ut.ee",
        alt: "NATARC",
        title: "NATARC"
      },
      {
        image: "https://files.geocollections.info/img/tutaltech2.png",
        url: "https://taltech.ee/geoloogia-instituut",
        alt: "SARV",
        title: "TalTech Department of Geology"
      },
      {
        image:
          "https://files.geocollections.info/img/TY_logo_ring_jooneta_valge.png",
        url: "http://www.natmuseum.ut.ee/et/content/geoloogiakogud",
        alt:
          "University of Tartu Natural History Museum's geological collections",
        title:
          "University of Tartu Natural History Museum's geological collections"
      },
      {
        image: "https://files.geocollections.info/img/ELM_logo_white1.png",
        url: "https://loodusmuuseum.ee/geoloogilised-kogud",
        alt: "The Estonian Museum of Natural History's geological collections",
        title: "The Estonian Museum of Natural History's geological collections"
      }
    ]
  })
};
</script>

<style scoped>
.footer {
  min-height: 8.8rem;
  font-size: 0.7rem;
  border-top: 2px solid rgba(0, 68, 148, 0.1);
  text-align: center;
  position: absolute;
  bottom: 0;
  width: 100%;
}

.footer-logos {
  max-height: 3.8rem;
  overflow: hidden;
}
.footer-logo {
  height: 50px;
  padding: 0 8px;
}

.footer-text > a {
  color: #ffffff;
}
.footer-text > a:hover {
  opacity: 0.8;
}

@media (max-width: 650px) {
  .footer {
    font-size: 0.6rem;
  }
}

@media (max-width: 599px) {
  .footer-logo {
    height: 42px;
  }
}

@media (max-width: 549px) {
  .footer-logo {
    height: 38px;
  }
}

@media (max-width: 499px) {
  .footer-logo {
    height: 34px;
  }
}

@media (max-width: 449px) {
  .footer-logo {
    height: 30px;
  }
}

@media (max-width: 399px) {
  .footer-logo {
    height: 26px;
  }
}

@media (max-width: 349px) {
  .footer-logo {
    height: 22px;
  }
}
</style>
