import React from "react";
import { Checkbox, Input } from "antd";
import ErrorBoundary from "component/ErrorBoundary";
import AbstractPersistentState from "component/AbstractPersistentState";
import { updateLauncherArgs } from "./utils";


/*eslint no-empty: 0*/
const { TextArea } = Input;


export class ChromeArguments extends AbstractPersistentState {

  state = {
    launcherArgs: "",
    ignoreHTTPSErrors: false,
    maximized: true,
    fullscreen: false
  }

  constructor( props ) {
    super( props );
    this.inputLauncherArgsRef = React.createRef();
    this.chromeOptions = React.createRef();
  }

  onCheckMaximize = ( e ) => {
    this.setState({
      maximized: e.target.checked,
      launcherArgs: updateLauncherArgs( this.state.launcherArgs, `--start-maximized`, e.target.checked )
    });
  }

  onCheckFullscreen = ( e ) => {
    this.setState({
      fullscreen: e.target.checked,
      launcherArgs: updateLauncherArgs( this.state.launcherArgs, `--start-fullscreen`, e.target.checked )
    });
  }

  onCheckIgnoreHttps = ( e ) => {
    this.setState({
      ignoreHTTPSErrors: e.target.checked,
      launcherArgs: updateLauncherArgs( this.state.launcherArgs, `--ignore-certificate-errors`, e.target.checked )
    });
  }

  onChangeLauncherArgs = ( e ) => {
    this.setState({
      launcherArgs: e.target.value
    });
  }

  render() {

    return (
      <ErrorBoundary>

        <div className="browser-options-layout">
          <div>

            { " " } <Checkbox
              checked={ this.state.maximized }
              onChange={ this.onCheckMaximize }
            >
                  maximized
            </Checkbox>

            { " " } <Checkbox
              checked={ this.state.fullscreen }
              onChange={ this.onCheckFullscreen }
            >
                  fullscreen
            </Checkbox>

            { " " } <Checkbox
              checked={ this.state.ignoreHTTPSErrors }
              onChange={ this.onCheckIgnoreHttps }
            >
                  ignore HTTPS errors
            </Checkbox>
          </div>

          <div className="ant-form-item-label">
            <label htmlFor="target" title="Additional arguments">
              <a
                onClick={ this.onExtClick }
                href="http://peter.sh/experiments/chromium-command-line-switches/">Additional arguments</a>
              { " " }to pass to the browser instance</label>
          </div>

          <TextArea
            onChange={ this.onChangeLauncherArgs }
            ref={ this.inputLauncherArgsRef }
            value={ this.state.launcherArgs }
            placeholder="--start-maximized --ignore-certificate-errors --no-sandbox" />

        </div>


      </ErrorBoundary>
    );
  }
}