class UTMStorage {
  constructor() {
    this.prefixToAvoidBuiltIns = '_utm_unique_';
    try {
      const ls = window.localStorage;
      this.setItem = (key, value) => ls.setItem(this.prefixToAvoidBuiltIns + key, value);
      this.getItem = (key) => ls.getItem(this.prefixToAvoidBuiltIns + key);
      this.removeItem = (key) => ls.removeItem(this.prefixToAvoidBuiltIns + key);
      this.setItem('test', 'test');
      this.removeItem('test');
    } catch(e) {
      this.localMockedStorage = {};
      this.setItem = this.setLocalItem;
      this.getItem = this.getLocalItem;
    }
  }

  setLocalItem(key, value) {
    this.localMockedStorage[this.prefixToAvoidBuiltIns + key] = value;
  }

  getLocalItem(key) {
    this.localMockedStorage[this.prefixToAvoidBuiltIns + key];
  }

}

export default UTMStorage;
