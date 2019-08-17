(function() {

  if ( window.CSS && CSS.escape ) {
      let langs = navigator.languages || [ navigator.language ];
      langs.forEach( lang => {
        lang = lang.substring(0,2).toLowerCase();
        let elems = document.querySelectorAll("[data-langswitch^=\""+CSS.escape(lang)+"\"]");
        elems.forEach( e => { e.style.display = "block"; });  
      });
    }

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time
  function toLocaleDateStringSupportsLocales() {
    try {
      new Date().toLocaleDateString('i');
    } catch (e) {
      return e.name === 'RangeError';
    }
    return false;
  }
  if ( toLocaleDateStringSupportsLocales() ) {
    const styles = {
      "Jan 2, 2006" : { day: "numeric", month: "short", year: "numeric" }
    }
    const times = document.querySelectorAll("time[data-dateFormat]");
    times.forEach( e => {
      const lang_el = e.closest("[lang]");
      const lang = lang_el ? lang_el.lang : "en";
      if (lang !== "en") {
        const date = new Date(e.dateTime);
        const options = styles[e.dataset.dateFormat] || styles["Jan 2, 2006"];
        e.innerHTML = date.toLocaleDateString(lang, options);
      }
    });  
    }
})();
