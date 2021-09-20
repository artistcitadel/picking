import Vue from 'vue';
import Vuex from 'vuex';
import PickStore from './pick';
import Authentication from './authentication';
import GoodStore from './good';
import ManualStore from './manual';
import JangmanStore from './jangman';
import InspectionStore from './inspection';

Vue.use(Vuex)

export default new Vuex.Store({
  ...Authentication,
  ...PickStore,
  ...GoodStore,
  ...ManualStore,
  ...JangmanStore,
  ...InspectionStore,
  modules: {
    Authentication,
    PickStore,
    GoodStore,
    ManualStore,
    JangmanStore,
    InspectionStore
  }
})
