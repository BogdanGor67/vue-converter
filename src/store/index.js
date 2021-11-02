
import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    currentDate: null,
    previousDate: null,
    valute: null,
    requestStatus: null,
    baseValute: {
      name: 'RUB',
      index: 1,
      nominal: 1,
      longName: 'Рубль'
    },
    baseConverterValuteName: '',
    resultValuteName: '',
  },
  getters: {
    date: state => state.currentDate,
    previousDate: state => state.previousDate,
    valute: state => state.valute,
    status: state => state.requestStatus,
    baseValute: state => state.baseValute,
    baseConverterValuteName: state => state.baseConverterValuteName,
    resultValuteName: state => state.resultValuteName,
  },
  mutations: {
    setDate(state, date) {
      state.currentDate = date;
    },
    setPreviousDate(state, prevDate) {
      state.previousDate = prevDate;
    },
    setValute(state, valute) {
      state.valute = valute;
    },
    setStatus(state, status) {
      state.requestStatus = status;
    },
    setBaseValute(state, baseValute) {
      state.baseValute = baseValute;
    },
    setBaseConverterValuteName(state, name) {
      state.baseConverterValuteName = name;
    },
    setResultValuteName(state, name) {
      state.resultValuteName = name;
    }
  },
  actions: {
    async loadState(store) {
      let response = await axios({
          method: 'get',
          url: 'https://www.cbr-xml-daily.ru/daily_json.js',
          validateStatus: (status) => {
            return status >= 200 && status < 300;
        }
      });
      let respData = response.data;
      store.commit('setDate', respData.Date);
      store.commit('setPreviousDate', respData.PreviousDate);
      store.commit('setValute', respData.Valute);
      store.commit('setStatus', response.status);
      store.commit('setBaseConverterValuteName', Object.values(respData.Valute)[0].CharCode);
      store.commit('setResultValuteName', Object.values(respData.Valute)[1].CharCode);
    },
    changeBaseValute(store, base) {
      store.commit('setBaseValute', base);
    },
    changeBaseConverterValuteName(store, name) {
      store.commit('setBaseConverterValuteName', name);
    },
    changeResultValuteName(store, name) {
      store.commit('setResultValuteName', name);
    }
  },
})
