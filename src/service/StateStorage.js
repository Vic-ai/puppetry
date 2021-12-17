import { STORAGE_KEY_STATE } from "constant";
import { readProjectState, writeProjectState } from "service/io";

const defaultState = {
  "ConnectOptions": {
    browserWSEndpoint: ""
  },
  "BrowserOptions": {
    product: "headless",
    headless: true,
    incognito: true,
    devtools: false,
    chromeExtDirectory: "",
    browseDirectoryValidateStatus: "",
    browseDirectoryValidateMessage: "",
    chromeExtLauncherArgs: ""
  },
  "ChromeArguments": {
    launcherArgs: "",
    ignoreHTTPSErrors: false
  },
  "FirefoxArguments": {
    launcherArgs: "--kiosk",
    ignoreHTTPSErrors: false
  },
  "ChromeExecutablePath" : {
    executablePath: ""
  },
  "FirefoxExecutablePath" : {
    executablePath: ""
  },
  "TestReportModal": {
    incognito: true,
    "puppeteer.connect": {
      ignoreHTTPSErrors: true,
      browserWSEndpoint: null
    },
    "puppeteer.launch": {
      devtools: false,
      headless: true,
      args: [],
      slowMo: 30,
      ignoreHTTPSErrors: false
    }
  },
  "ExportProjectModal": {
    incognito: true,
    "puppeteer.connect": {
      ignoreHTTPSErrors: true,
      browserWSEndpoint: null
    },
    "puppeteer.launch": {
      devtools: false,
      headless: true,
      args: [],
      slowMo: 30,
      ignoreHTTPSErrors: false
    }
  }
};

function getProjectDirector() {
  const settings = JSON.parse( localStorage.getItem( "settings" ) );
  return settings.projectDirectory;
}

export default class StateStorage {

  constructor( ns, webStorage = localStorage )   {
    this.ns = ns;
    this.webStorage = webStorage;
    if ( typeof defaultState[ this.ns ] === "undefined" ) {
      throw new Error( `Namespace ${ this.ns } not available in the storage` );
    }
    readProjectState( getProjectDirector() ).then( state => this.webStorage.setItem( STORAGE_KEY_STATE, state ) );
  }

  set( update ) {
    const state = this.getAll();
    state[ this.ns ] = Object.assign({}, state[ this.ns ], update );
    this.webStorage.setItem( STORAGE_KEY_STATE, JSON.stringify( state ) );
    writeProjectState( getProjectDirector(), JSON.stringify( state ) );
  }

  getAll() {
    const jsonString = this.webStorage.getItem( STORAGE_KEY_STATE );
    return jsonString ? JSON.parse( jsonString ) : defaultState;
  }

  get() {
    const state = this.getAll();
    return typeof state[ this.ns ] !== "undefined" ? state[ this.ns ] : defaultState[ this.ns ];
  }
}