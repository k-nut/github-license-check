import { LitElement, html, css } from 'lit'
import './components/LicenseCheck.js'

export class App extends LitElement {
  static get styles () {
    return css`
      :host {
        display: block;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
      }
    `
  }

  render () {
    return html`
      <div id="app">
        <license-check></license-check>
      </div>
    `
  }
}

customElements.define('app-root', App)
