import { Component, VERSION } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;
  loadedfile;
  pdfSrc;
  pageVariable = 1;
  zoom = 1
  angle = 0

  // Call backs Monitor
  errorTriggeredCb = 0;
  afterpageLoadedCb = 0;
  pageRenderCb = 0;
  textLayerRenderedCb = 0;

  constructor(private domSanitizer: DomSanitizer) {

  }

  plusZoom() {
    this.zoom++;
  }

  minusZoom() {
    if(this.zoom > 1 ) {
    this.zoom--;
    }
  }

  download(blob?) {
    if (blob) {
      // Array Buffer scenario
      var dataView = new DataView(this.pdfSrc);
      const x = new Blob([dataView], { type: 'application/pdf' });
      var a = document.createElement("a");
      // Instead of X use blob if you have it
          a.href = URL.createObjectURL(x);
          a.setAttribute("download", "geoip.pdf");
          a.click()
    } else {
      // URL Scenario
      const url = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
      const filename = "geoip.pdf";
      fetch(url).then(function (t) {
        return t.blob().then((b) => {
          var a = document.createElement("a");
          a.href = URL.createObjectURL(b);
          a.setAttribute("download", filename);
          a.click();
        }
        );
      });
    }

  }

  /**
   * Print functionality not working as expected
   */
  print() {
    var dataView = new DataView(this.pdfSrc);
    const blob = new Blob([dataView], { type: 'application/pdf' });
    const element = document.createElement('iframe');   // Create an IFrame.
    element.style.visibility = "hidden";    // Hide the frame.
    element.src = URL.createObjectURL(blob); // Set source.
    document.body.appendChild(element);  // Add the frame to the web page.
    element.contentWindow.focus();       // Set focus.
    element.contentWindow.print();      // Print it.

    // var wnd = window.open(URL.createObjectURL(x));
    // wnd.print();
  }

  rotate() {
    console.log(this.angle);
    if (this.angle === 0) {
      this.angle = 90;
    } else if (this.angle === 90) {
      this.angle = 180;
    } else if (this.angle === 180) {
      this.angle = 0;
    } 
  }


  nextPage() {
    this.pageVariable++;
  }

  previousPage() {
    if(this.pageVariable > 1) {
          this.pageVariable--;
    }
  }

  afterLoadComplete(pdf: any) {
    this.afterpageLoadedCb++;
    console.log('after-load-complete');
  }

  pageRendered(e: CustomEvent) {
    this.pageRenderCb++;
    console.log('(page-rendered)');
  }

  textLayerRendered(e: CustomEvent) {
    // Callback Monitor variable
    this.textLayerRenderedCb++;

    // Finds anchors and sets hrefs void
    this.disableAnchorLinks();
    console.log('(text-layer-rendered)');

  }

  onFileSelected() {
    let $img: any = document.querySelector('#file');
    this.loadedfile = $img.files[0]

    if (typeof (FileReader) !== 'undefined') {
      let reader = new FileReader();

      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
      };

      reader.readAsArrayBuffer($img.files[0]);
    }
  }

  cleanup() {
    this.errorTriggeredCb = 0;
    this.afterpageLoadedCb = 0;
    this.pageRenderCb = 0;
    this.textLayerRenderedCb = 0;
  }

  errorTest(event) {
    this.errorTriggeredCb++;
    console.log(event, 'errorCalback')
  }

  disableAnchorLinks() {
    let externalLinks: HTMLCollectionOf<HTMLAnchorElement>;
    const pdfReport = document.getElementById('pdf-report-id');

    if (pdfReport) {
      externalLinks = pdfReport.getElementsByTagName('a');
    }
    for (let i = 0; i < externalLinks.length; i++) {
      externalLinks[i].href = "JavaScript:void(0);"
    }
  }
}


