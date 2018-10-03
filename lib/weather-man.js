'use babel';

import WeatherManView from './weather-man-view';
import { CompositeDisposable } from 'atom';

export default {

  weatherManView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.weatherManView = new WeatherManView(state.weatherManViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.weatherManView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'weather-man:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.weatherManView.destroy();
  },

  serialize() {
    return {
      weatherManViewState: this.weatherManView.serialize()
    };
  },

  toggle() {
    console.log('WeatherMan was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
